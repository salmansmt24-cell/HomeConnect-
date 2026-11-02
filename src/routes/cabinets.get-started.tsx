import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Send } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Field, PageHead, PageShell, PillGroup, controlCls } from "@/components/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CABINET_COLLECTIONS as CABINET_COLLECTION_NAMES,
  CABINET_PROJECT_TYPES,
  CABINET_ROLES,
  CABINET_STAGES,
  CABINET_TIMINGS,
  submitCabinet,
  type InquiryResult,
} from "@/lib/inquiries.functions";
import { CABINET_COLLECTIONS as CABINET_COLLECTION_DETAILS } from "@/lib/cabinets";

export const Route = createFileRoute("/cabinets/get-started")({
  validateSearch: z.object({ collection: z.string().optional(), finish: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Start a Cabinet Project — Home Connect" },
      {
        name: "description",
        content:
          "Tell Home Connect about your cabinet project: collection interest, project stage, timing and ZIP. Brooklyn, Shaker, Oslo and Builder Essential collections.",
      },
      { property: "og:title", content: "Start a Cabinet Project | Home Connect" },
      {
        property: "og:description",
        content: "One short form. Our team reviews it and gets back to you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CabinetGetStartedPage,
});

const EMPTY = {
  applicant_type: "",
  name: "",
  email: "",
  phone: "",
  project_zip: "",
  project_type: "",
  collection_interest: "",
  finish_interest: "",
  project_stage: "",
  timing: "",
  details: "",
};

function CabinetGetStartedPage() {
  const search = Route.useSearch();
  const initialCollection = CABINET_COLLECTION_NAMES.includes(
    search.collection as (typeof CABINET_COLLECTION_NAMES)[number],
  )
    ? (search.collection ?? "")
    : "";
  const initialFinishes =
    CABINET_COLLECTION_DETAILS.find((item) => item.name === initialCollection)?.finishes.map(
      (item) => item.name,
    ) ?? [];
  const initialFinish =
    search.finish && initialFinishes.includes(search.finish) ? search.finish : "";
  const send = useServerFn(submitCabinet);
  const [form, setForm] = useState(() => ({
    ...EMPTY,
    collection_interest: initialCollection,
    finish_interest: initialFinish,
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<InquiryResult | null>(null);
  const [busy, setBusy] = useState(false);

  const set =
    (k: keyof typeof EMPTY) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [k]: e.target.value }));
      setErrors((x) => ({ ...x, [k]: "" }));
    };
  const pick = (k: keyof typeof EMPTY) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((x) => ({ ...x, [k]: "" }));
  };
  const finishes =
    CABINET_COLLECTION_DETAILS.find((item) => item.name === form.collection_interest)?.finishes.map(
      (item) => item.name,
    ) ?? [];

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setResult(null);
    const res = await send({ data: form });
    setBusy(false);
    setResult(res);
    if (!res.ok && res.fieldErrors) setErrors(res.fieldErrors);
    if (res.ok) setForm(EMPTY);
  }

  return (
    <PageShell crumb="Cabinets">
      <div className="mx-auto max-w-3xl">
        <PageHead
          eyebrow="Cabinets"
          title="GET STARTED ON YOUR CABINET PROJECT"
          lead="Tell us who you are and where the project stands. The more you share now, the faster we can line up collections, samples and timing."
        />

        <form
          onSubmit={onSubmit}
          className="mt-5 grid gap-4 rounded-xl border bg-card p-5 shadow-card sm:p-6"
          noValidate
        >
          <PillGroup
            name="applicant_type"
            label="I'm a…"
            options={CABINET_ROLES}
            value={form.applicant_type}
            onChange={pick("applicant_type")}
          />
          {errors["applicant_type"] && (
            <p className="text-[11px] font-bold text-destructive">{errors["applicant_type"]}</p>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            <Field id="cg-name" label="Name">
              <Input
                id="cg-name"
                value={form.name}
                onChange={set("name")}
                className={controlCls}
                autoComplete="name"
              />
              {errors["name"] && (
                <p className="text-[11px] font-bold text-destructive">{errors["name"]}</p>
              )}
            </Field>
            <Field id="cg-email" label="Email">
              <Input
                id="cg-email"
                type="email"
                inputMode="email"
                value={form.email}
                onChange={set("email")}
                className={controlCls}
                autoComplete="email"
              />
              {errors["email"] && (
                <p className="text-[11px] font-bold text-destructive">{errors["email"]}</p>
              )}
            </Field>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field id="cg-phone" label="Phone">
              <Input
                id="cg-phone"
                type="tel"
                inputMode="tel"
                value={form.phone}
                onChange={set("phone")}
                className={controlCls}
                autoComplete="tel"
              />
              {errors["phone"] && (
                <p className="text-[11px] font-bold text-destructive">{errors["phone"]}</p>
              )}
            </Field>
            <Field id="cg-zip" label="Project ZIP">
              <Input
                id="cg-zip"
                inputMode="numeric"
                value={form.project_zip}
                onChange={set("project_zip")}
                className={controlCls}
                placeholder="27617"
              />
              {errors["project_zip"] && (
                <p className="text-[11px] font-bold text-destructive">{errors["project_zip"]}</p>
              )}
            </Field>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field id="cg-type" label="Project type">
              <select
                id="cg-type"
                value={form.project_type}
                onChange={set("project_type")}
                className={controlCls}
              >
                <option value="">Choose…</option>
                {CABINET_PROJECT_TYPES.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              {errors["project_type"] && (
                <p className="text-[11px] font-bold text-destructive">{errors["project_type"]}</p>
              )}
            </Field>
            <Field
              id="cg-collection"
              label="Cabinet collection interest"
              hint="Current collections: Brooklyn, Shaker, Oslo, Builder Essential."
            >
              <select
                id="cg-collection"
                value={form.collection_interest}
                onChange={(e) => {
                  setForm((f) => ({
                    ...f,
                    collection_interest: e.target.value,
                    finish_interest: "",
                  }));
                  setErrors((x) => ({ ...x, collection_interest: "", finish_interest: "" }));
                }}
                className={controlCls}
              >
                <option value="">Choose…</option>
                {CABINET_COLLECTION_NAMES.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field
            id="cg-finish"
            label="Finish interest"
            hint="Choose a collection first. Exact availability is confirmed by Home Connect."
          >
            <select
              id="cg-finish"
              value={form.finish_interest}
              onChange={set("finish_interest")}
              className={controlCls}
              disabled={!finishes.length}
            >
              <option value="">{finishes.length ? "Choose…" : "Choose a collection first"}</option>
              {finishes.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field id="cg-stage" label="Project stage">
              <select
                id="cg-stage"
                value={form.project_stage}
                onChange={set("project_stage")}
                className={controlCls}
              >
                <option value="">Choose…</option>
                {CABINET_STAGES.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              {errors["project_stage"] && (
                <p className="text-[11px] font-bold text-destructive">{errors["project_stage"]}</p>
              )}
            </Field>
            <Field id="cg-timing" label="Approximate timing">
              <select
                id="cg-timing"
                value={form.timing}
                onChange={set("timing")}
                className={controlCls}
              >
                <option value="">Choose…</option>
                {CABINET_TIMINGS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              {errors["timing"] && (
                <p className="text-[11px] font-bold text-destructive">{errors["timing"]}</p>
              )}
            </Field>
          </div>

          <Field id="cg-details" label="Tell us about your project">
            <Textarea
              id="cg-details"
              rows={5}
              value={form.details}
              onChange={set("details")}
              className={`${controlCls} h-auto resize-y py-2.5`}
              placeholder="Rooms, layout ideas, measurements, what's already decided…"
            />
            {errors["details"] && (
              <p className="text-[11px] font-bold text-destructive">{errors["details"]}</p>
            )}
          </Field>

          {result && !result.ok && (
            <p
              role="alert"
              className="rounded-lg bg-destructive/10 p-3 text-xs font-semibold text-destructive"
            >
              {result.message}
            </p>
          )}

          <Button
            type="submit"
            disabled={busy}
            className="btn-gold inline-flex h-12 items-center justify-center gap-2 rounded-md text-xs font-extrabold uppercase tracking-[0.08em]"
          >
            {busy ? (
              "Sending…"
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit my cabinet project
              </>
            )}
          </Button>

          {result?.ok && (
            <p
              role="status"
              className="flex items-start gap-2 rounded-lg bg-success-soft p-3 text-xs font-semibold text-navy"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              Prototype project saved — reference {result.ref}. This preview is not connected to the
              production Home Connect CRM.
            </p>
          )}
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            Design preview — prototype storage is not the production Home Connect CRM. This does not
            reserve materials, set pricing, or create an order.
          </p>
        </form>
      </div>
    </PageShell>
  );
}
