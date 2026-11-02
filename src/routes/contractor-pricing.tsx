import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Field, PageHead, PageShell, PillGroup, Steps, controlCls } from "@/components/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CONTRACTOR_TYPES, submitContractor, type InquiryResult } from "@/lib/inquiries.functions";

export const Route = createFileRoute("/contractor-pricing")({
  head: () => ({
    meta: [
      { title: "Contractor Pricing — Apply With Home Connect" },
      {
        name: "description",
        content:
          "Apply for Home Connect contractor pricing. Every application is reviewed by our team — approval is never automatic. Serving Raleigh and the surrounding area.",
      },
      { property: "og:title", content: "Contractor Pricing | Home Connect" },
      {
        property: "og:description",
        content: "Application, review, approval. Professional pricing from Home Connect.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContractorPricingPage,
});

const EMPTY = {
  business_type: "",
  contact_name: "",
  business_name: "",
  email: "",
  phone: "",
  project_zip: "",
  website: "",
  notes: "",
};

function ContractorPricingPage() {
  const send = useServerFn(submitContractor);
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
    const res = await send({ data: form });
    setBusy(false);
    setResult(res);
    if (!res.ok && res.fieldErrors) setErrors(res.fieldErrors);
    if (res.ok) setForm(EMPTY);
  }

  return (
    <PageShell crumb="Contractor Pricing">
      <PageHead
        eyebrow="Professional pricing"
        title="CONTRACTOR PRICING"
        lead="Tell us who you are and what you build. Home Connect reviews every application and contacts you directly — professional pricing is never automatic."
      />

      <div className="mt-5">
        <Steps
          items={[
            {
              title: "Apply",
              body: "One short application with your business and contact details.",
            },
            {
              title: "Home Connect review",
              body: "We check your business and how you work before any pricing is set.",
            },
            {
              title: "Approval & contact",
              body: "If approved, we contact you with next steps and how to place project orders.",
            },
          ]}
        />
      </div>

      <form
        onSubmit={onSubmit}
        className="mt-6 grid gap-4 rounded-xl border bg-card p-5 shadow-card lg:max-w-3xl"
        noValidate
      >
        <PillGroup
          name="business_type"
          label="I am a…"
          options={CONTRACTOR_TYPES}
          value={form.business_type}
          onChange={(v) => {
            setForm((f) => ({ ...f, business_type: v }));
            setErrors((x) => ({ ...x, business_type: "" }));
          }}
        />
        {errors["business_type"] && (
          <p className="text-[11px] font-bold text-destructive">{errors["business_type"]}</p>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <Field id="cp-name" label="Contact name">
            <Input
              id="cp-name"
              value={form.contact_name}
              onChange={set("contact_name")}
              className={controlCls}
              autoComplete="name"
            />
            {errors["contact_name"] && (
              <p className="text-[11px] font-bold text-destructive">{errors["contact_name"]}</p>
            )}
          </Field>
          <Field id="cp-business" label="Business name" hint="Optional if you work solo.">
            <Input
              id="cp-business"
              value={form.business_name}
              onChange={set("business_name")}
              className={controlCls}
              autoComplete="organization"
            />
          </Field>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Field id="cp-email" label="Email">
            <Input
              id="cp-email"
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
          <Field id="cp-phone" label="Phone">
            <Input
              id="cp-phone"
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
          <Field id="cp-zip" label="Project ZIP" hint="Optional.">
            <Input
              id="cp-zip"
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

        <Field id="cp-site" label="Website or portfolio" hint="Optional — a URL is fine.">
          <Input
            id="cp-site"
            type="url"
            inputMode="url"
            value={form.website}
            onChange={set("website")}
            className={controlCls}
            placeholder="https://…"
          />
          {errors["website"] && (
            <p className="text-[11px] font-bold text-destructive">{errors["website"]}</p>
          )}
        </Field>

        <Field id="cp-notes" label="What do you install or build most?">
          <Textarea
            id="cp-notes"
            rows={4}
            value={form.notes}
            onChange={set("notes")}
            className={`${controlCls} h-auto resize-y py-2.5`}
            placeholder="Typical monthly volume, product mix, service area…"
          />
          {errors["notes"] && (
            <p className="text-[11px] font-bold text-destructive">{errors["notes"]}</p>
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
              Submit application
            </>
          )}
        </Button>

        {result?.ok && (
          <p
            role="status"
            className="flex items-start gap-2 rounded-lg bg-success-soft p-3 text-xs font-semibold text-navy"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
            Prototype application saved — reference {result.ref}. Production CRM integration is
            pending. No pricing is applied automatically.
          </p>
        )}
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          Design preview — prototype storage is not the production Home Connect CRM. Submitting does
          not approve anyone, set a discount, or place an order.
        </p>
      </form>
    </PageShell>
  );
}
