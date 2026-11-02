import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/* ---------------- OPTION LISTS (owner-approved categories) ---------------- */
export const CONTACT_CATEGORIES = [
  "Flooring",
  "Carpet",
  "Cabinets",
  "SnapCaps / Stairs",
  "Accessories",
  "Contractor Pricing",
  "Existing Order",
  "Other",
] as const;

export const CABINET_ROLES = ["Homeowner", "Contractor / Builder", "Designer / Other Pro"] as const;
export const CABINET_COLLECTIONS = [
  "Brooklyn",
  "Shaker",
  "Oslo",
  "Builder Essential",
  "Not sure yet",
] as const;
export const CABINET_PROJECT_TYPES = ["Kitchen", "Bathroom", "Whole home", "Other"] as const;
export const CABINET_STAGES = [
  "Just exploring",
  "Planning / measuring",
  "Ready to order",
  "Other",
] as const;
export const CABINET_TIMINGS = [
  "As soon as possible",
  "In 1–3 months",
  "In 3–6 months",
  "Not sure yet",
] as const;
export const CONTRACTOR_TYPES = [
  "General contractor",
  "Flooring installer",
  "Remodeler",
  "Designer / Builder",
  "Other",
] as const;

/* ---------------- VALIDATION ---------------- */
const email = z.string().trim().min(3).max(255).email("Enter a valid email address");
const phone = z
  .string()
  .trim()
  .min(7)
  .max(30)
  .regex(/^[0-9+()\-.\s]+$/, "Phone can only contain numbers and + ( ) -");
const zip = z
  .string()
  .trim()
  .regex(/^\d{5}(-\d{4})?$/, "Enter a 5-digit ZIP code");
const short = (max = 100) => z.string().trim().min(2).max(max);

export const contactSchema = z.object({
  category: z.enum(CONTACT_CATEGORIES),
  name: short(),
  email,
  phone: phone.optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)").max(2000),
  website: z.string().max(0).optional(),
});

export const contractorSchema = z.object({
  business_type: z.enum(CONTRACTOR_TYPES),
  contact_name: short(),
  business_name: z.string().trim().max(120).optional().or(z.literal("")),
  email,
  phone,
  project_zip: zip.optional().or(z.literal("")),
  website: z.string().trim().url("Enter a valid website URL").max(200).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const cabinetSchema = z.object({
  applicant_type: z.enum(CABINET_ROLES),
  name: short(),
  email,
  phone,
  project_zip: zip,
  project_type: z.enum(CABINET_PROJECT_TYPES),
  collection_interest: z.enum(CABINET_COLLECTIONS).optional().or(z.literal("")),
  finish_interest: z.string().trim().max(80).optional().or(z.literal("")),
  project_stage: z.enum(CABINET_STAGES),
  timing: z.enum(CABINET_TIMINGS),
  details: z
    .string()
    .trim()
    .min(10, "Tell us about your project (at least 10 characters)")
    .max(2000),
});

/* ---------------- RESULT TYPE ---------------- */
export type InquiryResult =
  { ok: true; ref: string } | { ok: false; message: string; fieldErrors?: Record<string, string> };

const MAX_PER_HOUR = 5;
const TABLES = ["contact_submissions", "contractor_applications", "cabinet_projects"] as const;
type Table = (typeof TABLES)[number];

function fieldErrorsFrom(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

/** Loads the server-side inbox client and blocks an email address that has already sent MAX_PER_HOUR messages. */
async function openInbox(table: Table, emailValue: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await supabaseAdmin
    .from(table)
    .select("id", { count: "exact", head: true })
    .eq("email", emailValue.toLowerCase())
    .gte("created_at", since);
  if ((count ?? 0) >= MAX_PER_HOUR) {
    return {
      admin: null,
      blocked:
        "We already have several messages from this email address in the last hour. Please call +1 984 200 9893 so we can help you right away.",
    } as const;
  }
  return { admin: supabaseAdmin, blocked: null } as const;
}

const ref = (prefix: string) => `${prefix}-${Date.now().toString(36).toUpperCase()}`;
const FAILED =
  "We could not send that just now. Please call +1 984 200 9893 or email info@homeconnect.shop.";

/* ---------------- SERVER FUNCTIONS ---------------- */
export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: Record<string, unknown>) => input)
  .handler(async ({ data }): Promise<InquiryResult> => {
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success)
      return {
        ok: false,
        message: "Please check the highlighted fields.",
        fieldErrors: fieldErrorsFrom(parsed.error),
      };
    if (parsed.data.website) return { ok: true, ref: ref("SPAM") };
    const d = parsed.data;
    const { admin, blocked } = await openInbox("contact_submissions", d.email);
    if (!admin) return { ok: false, message: blocked ?? FAILED };
    const { error } = await admin.from("contact_submissions").insert({
      category: d.category,
      name: d.name,
      email: d.email.toLowerCase(),
      phone: d.phone || null,
      message: d.message,
    });
    if (error) {
      console.error("inquiry insert failed (contact_submissions)", error.code);
      return { ok: false, message: FAILED };
    }
    return { ok: true, ref: ref("INQ") };
  });

export const submitContractor = createServerFn({ method: "POST" })
  .inputValidator((input: Record<string, unknown>) => input)
  .handler(async ({ data }): Promise<InquiryResult> => {
    const parsed = contractorSchema.safeParse(data);
    if (!parsed.success)
      return {
        ok: false,
        message: "Please check the highlighted fields.",
        fieldErrors: fieldErrorsFrom(parsed.error),
      };
    const d = parsed.data;
    const { admin, blocked } = await openInbox("contractor_applications", d.email);
    if (!admin) return { ok: false, message: blocked ?? FAILED };
    const { error } = await admin.from("contractor_applications").insert({
      business_type: d.business_type,
      contact_name: d.contact_name,
      business_name: d.business_name || null,
      email: d.email.toLowerCase(),
      phone: d.phone,
      project_zip: d.project_zip || null,
      website: d.website || null,
      notes: d.notes || null,
    });
    if (error) {
      console.error("inquiry insert failed (contractor_applications)", error.code);
      return { ok: false, message: FAILED };
    }
    return { ok: true, ref: ref("APP") };
  });

export const submitCabinet = createServerFn({ method: "POST" })
  .inputValidator((input: Record<string, unknown>) => input)
  .handler(async ({ data }): Promise<InquiryResult> => {
    const parsed = cabinetSchema.safeParse(data);
    if (!parsed.success)
      return {
        ok: false,
        message: "Please check the highlighted fields.",
        fieldErrors: fieldErrorsFrom(parsed.error),
      };
    const d = parsed.data;
    const { admin, blocked } = await openInbox("cabinet_projects", d.email);
    if (!admin) return { ok: false, message: blocked ?? FAILED };
    const { error } = await admin.from("cabinet_projects").insert({
      applicant_type: d.applicant_type,
      name: d.name,
      email: d.email.toLowerCase(),
      phone: d.phone,
      project_zip: d.project_zip,
      project_type: d.project_type,
      collection_interest: d.collection_interest || null,
      finish_interest: d.finish_interest || null,
      project_stage: d.project_stage,
      timing: d.timing,
      details: d.details,
    });
    if (error) {
      console.error("inquiry insert failed (cabinet_projects)", error.code);
      return { ok: false, message: FAILED };
    }
    return { ok: true, ref: ref("CAB") };
  });
