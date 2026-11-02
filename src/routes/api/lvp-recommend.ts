import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { APICallError, NoObjectGeneratedError, Output, streamText } from "ai";
import { z } from "zod";
import { LVP } from "@/lib/lvp";
import { createLovableAiGatewayRunIdFetch, withLovableAiGatewayRunIdHeader } from "@/lib/ai/run-id";

const requestSchema = z.object({
  room: z.string().trim().min(3).max(800),
  budget: z.string().trim().min(1).max(120),
  needs: z.string().trim().min(3).max(800),
});

const recommendationSchema = z.object({
  intro: z.string(),
  recommendations: z.array(
    z.object({
      slug: z.string(),
      reason: z.string(),
    }),
  ),
  note: z.string(),
});

function safeGatewayMessage(error: unknown) {
  if (!APICallError.isInstance(error))
    return "The floor finder could not finish this recommendation. Please try again.";

  try {
    const body = error.responseBody
      ? (JSON.parse(error.responseBody) as { message?: string; error?: { message?: string } })
      : undefined;
    return body?.message ?? body?.error?.message ?? "The floor finder is temporarily unavailable.";
  } catch {
    return "The floor finder is temporarily unavailable.";
  }
}

export const Route = createFileRoute("/api/lvp-recommend")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const input = requestSchema.safeParse(await request.json());
          if (!input.success)
            return Response.json(
              { error: "Please describe your room, budget, and flooring needs." },
              { status: 400 },
            );

          const apiKey = process.env["LOVABLE_API_KEY"];
          if (!apiKey)
            return Response.json(
              { error: "The floor finder is not configured yet." },
              { status: 503 },
            );

          const runIdFetch = createLovableAiGatewayRunIdFetch(
            request.headers.get("X-Lovable-AIG-Run-ID") ?? undefined,
          );
          const openai = createOpenAI({
            baseURL: "https://ai.gateway.lovable.dev/v1",
            apiKey,
            headers: {
              "Lovable-API-Key": apiKey,
              "X-Lovable-AIG-SDK": "vercel-ai-sdk",
            },
            fetch: runIdFetch.fetch,
          });
          const catalog = LVP.map(
            ({
              slug,
              collection,
              name,
              install,
              wear,
              thickness,
              plank,
              price,
              boxPrice,
              coverage,
            }) => ({
              slug,
              collection: collection ?? null,
              name,
              install: install ?? null,
              wear: wear ?? null,
              thickness: thickness ?? null,
              plank: plank ?? null,
              price,
              boxPrice,
              coverage,
            }),
          );

          const result = streamText({
            model: openai.responses("openai/gpt-6-astra"),
            abortSignal: request.signal,
            maxRetries: 0,
            output: Output.object({ schema: recommendationSchema }),
            providerOptions: {
              openai: {
                forceReasoning: true,
                reasoningEffort: "medium",
                reasoningSummary: "auto",
                store: false,
                include: ["reasoning.encrypted_content"],
              },
            },
            system:
              "You are Home Connect's LVP floor finder. Recommend only products in the supplied catalog. Never invent performance claims, ratings, availability, colors, warranties, water resistance, or installation suitability. Treat missing specifications as unknown. Budget means the shopper's stated preference; compare it to listed price per square foot and box price without estimating room totals unless dimensions and waste are fully known. Return 1 to 3 recommendations, ordered best-first. Keep each reason to two concise sentences and the intro and note to one concise sentence each. Slugs must exactly match the catalog.",
            prompt: `Shopper room: ${input.data.room}\nBudget: ${input.data.budget}\nFlooring needs: ${input.data.needs}\n\nCatalog JSON:\n${JSON.stringify(catalog)}`,
          });

          let output: z.infer<typeof recommendationSchema>;
          try {
            output = await result.output;
          } catch (error) {
            if (!NoObjectGeneratedError.isInstance(error)) throw error;
            try {
              output = recommendationSchema.parse(JSON.parse(error.text ?? ""));
            } catch {
              return Response.json(
                {
                  error:
                    "The floor finder returned an incomplete recommendation. Please try again.",
                },
                { status: 502 },
              );
            }
          }

          const catalogBySlug = new Map(LVP.map((product) => [product.slug, product]));
          const recommendations = output.recommendations.slice(0, 3).flatMap((item) => {
            const product = catalogBySlug.get(item.slug);
            return product ? [{ product, reason: item.reason }] : [];
          });
          if (recommendations.length === 0)
            return Response.json(
              {
                error: "No catalog matches were returned. Please adjust your needs and try again.",
              },
              { status: 502 },
            );

          return Response.json(
            { intro: output.intro, recommendations, note: output.note },
            { headers: withLovableAiGatewayRunIdHeader(runIdFetch.getRunId()) },
          );
        } catch (error) {
          if (error instanceof DOMException && error.name === "AbortError")
            return new Response(null, { status: 499 });
          const status =
            APICallError.isInstance(error) && error.statusCode ? error.statusCode : 500;
          return Response.json({ error: safeGatewayMessage(error) }, { status });
        }
      },
    },
  },
});
