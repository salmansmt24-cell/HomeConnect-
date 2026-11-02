import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { ContactLines, Field, PageHead, PageShell, PillGroup, controlCls } from "@/components/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_CATEGORIES, submitContact, type InquiryResult } from "@/lib/inquiries.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Home Connect — Flooring, Carpet, Cabinets & Stairs" },
      {
        name: "description",
        content:
          "Contact Home Connect in Raleigh: +1 984 200 9893, info@homeconnect.shop, 8816 Running Oak Dr Unit D. Send a question about flooring, carpet, cabinets, SnapCaps, accessories, contractor pricing or an existing order.",
      },
      { property: "og:title", content: "Contact Home Connect" },
      {
        property: "og:description",
        content: "Call, email or send a question — Home Connect, Raleigh NC.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const EMPTY = { category: "", name: "", email: "", phone: "", message: "" };

function ContactPage() {
  const send = useServerFn(submitContact);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<InquiryResult | null>(null);
  const [busy, setBusy] = useState(false);

  const set =
    (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [k]: e.target.value }));
      setErrors((x) => ({ ...x, [k]: "" }));
    };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setResult(null);
    const res = await send({ data: { ...form, website: "" } });
    setBusy(false);
    setResult(res);
    if (!res.ok && res.fieldErrors) setErrors(res.fieldErrors);
    if (res.ok) setForm(EMPTY);
  }

  return (
    <PageShell crumb="Contact">
      <PageHead
        eyebrow="Contact"
        title="CONTACT HOME CONNECT"
        lead="Call, email or send the form — the same team answers, whether it is a single room or a whole project."
      />

      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="grid content-start gap-4">
          <ContactLines />
          <p className="rounded-lg border bg-card p-3 text-[11px] leading-relaxed text-muted-foreground">
            Business hours are not listed here because they are not currently confirmed for this
            site. Call or email and we will tell you when we can help.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="grid gap-4 rounded-xl border bg-card p-5 shadow-card"
          noValidate
        >
          <PillGroup
            name="category"
            label="What is it about?"
            options={CONTACT_CATEGORIES}
            value={form.category}
            onChange={(v) => {
              setForm((f) => ({ ...f, category: v }));
              setErrors((x) => ({ ...x, category: "" }));
            }}
          />
          {errors["category"] && (
            <p className="text-[11px] font-bold text-destructive">{errors["category"]}</p>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            <Field id="c-name" label="Name">
              <Input
                id="c-name"
                value={form.name}
                onChange={set("name")}
                className={controlCls}
                autoComplete="name"
              />
              {errors["name"] && (
                <p className="text-[11px] font-bold text-destructive">{errors["name"]}</p>
              )}
            </Field>
            <Field id="c-phone" label="Phone" hint="Optional, but the fastest way back to you.">
              <Input
                id="c-phone"
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
          </div>

          <Field id="c-email" label="Email">
            <Input
              id="c-email"
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

          <Field id="c-message" label="How can we help?">
            <Textarea
              id="c-message"
              rows={5}
              value={form.message}
              onChange={set("message")}
              className={`${controlCls} h-auto resize-y py-2.5`}
              placeholder="Room size, product you have in mind, timing…"
            />
            {errors["message"] && (
              <p className="text-[11px] font-bold text-destructive">{errors["message"]}</p>
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
            className="btn-gold inline-flex h-11 items-center justify-center gap-2 rounded-md text-xs font-extrabold uppercase tracking-[0.08em]"
          >
            {busy ? (
              "Sending…"
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send message
              </>
            )}
          </Button>

          {result?.ok && (
            <p
              role="status"
              className="flex items-start gap-2 rounded-lg bg-success-soft p-3 text-xs font-semibold text-navy"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              Prototype message saved. Reference {result.ref}. This preview is not connected to the
              production Home Connect CRM.
            </p>
          )}
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            Design preview only — submissions use prototype storage, not the production Home Connect
            CRM. No order or quote is created.
          </p>
        </form>
      </div>
    </PageShell>
  );
}
