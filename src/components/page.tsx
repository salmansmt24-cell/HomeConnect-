import { Link } from "@tanstack/react-router";
import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { Header, SiteFooter } from "@/components/site";
import { Label } from "@/components/ui/label";

export const ADDRESS = "8816 Running Oak Dr, Unit D, Raleigh, NC 27617";

/* ---------------- PAGE SHELL ---------------- */
export function PageShell({ children, crumb }: { children: ReactNode; crumb?: string }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-12 pt-4 sm:px-6">
        {crumb && (
          <nav className="text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-gold-deep">
              Home
            </Link>
            <span aria-hidden="true"> / </span>
            <span className="font-semibold text-foreground">{crumb}</span>
          </nav>
        )}
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

export function PageHead({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="border-b pb-3">
      <p className="eyebrow text-gold-deep">{eyebrow}</p>
      <h1 className="text-[28px] font-black leading-tight text-navy sm:text-[32px]">{title}</h1>
      {lead && <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{lead}</p>}
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  aside,
}: {
  eyebrow: string;
  title: string;
  aside?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
      <div>
        <p className="eyebrow text-gold-deep">{eyebrow}</p>
        <h2 className="text-2xl font-black tracking-tight text-navy sm:text-3xl">{title}</h2>
      </div>
      {aside && <p className="max-w-md text-sm text-muted-foreground">{aside}</p>}
    </div>
  );
}

/* ---------------- CONTACT LINES ---------------- */
export function ContactLines({ compact = false }: { compact?: boolean }) {
  return (
    <ul className={compact ? "grid gap-2" : "grid gap-2.5"}>
      <li>
        <a
          href="tel:+19842009893"
          className="flex items-center gap-3 rounded-lg bg-surface p-3 hover:bg-gold-soft"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy text-navy-foreground">
            <Phone className="h-4 w-4" />
          </span>
          <span className="min-w-0">
            <span className="eyebrow block text-muted-foreground">Call</span>
            <b className="block truncate text-sm font-bold text-navy">+1 984 200 9893</b>
          </span>
        </a>
      </li>
      <li>
        <a
          href="mailto:info@homeconnect.shop"
          className="flex items-center gap-3 rounded-lg bg-surface p-3 hover:bg-gold-soft"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy text-navy-foreground">
            <Mail className="h-4 w-4" />
          </span>
          <span className="min-w-0">
            <span className="eyebrow block text-muted-foreground">Email</span>
            <b className="block truncate text-sm font-bold text-navy">info@homeconnect.shop</b>
          </span>
        </a>
      </li>
      <li className="flex items-center gap-3 rounded-lg border bg-card p-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold-soft text-navy">
          <MapPin className="h-4 w-4" />
        </span>
        <span className="min-w-0">
          <span className="eyebrow block text-muted-foreground">Showroom &amp; warehouse</span>
          <b className="block text-sm font-bold text-navy">{ADDRESS}</b>
        </span>
      </li>
    </ul>
  );
}

/* ---------------- FORM PRIMITIVES ---------------- */
export const controlCls =
  "flex h-11 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-ring";

export function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid min-w-0 gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {hint && <p className="text-[11px] leading-tight text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function PillGroup({
  name,
  label,
  options,
  value,
  onChange,
}: {
  name: string;
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="grid min-w-0 gap-1.5">
      <legend className="text-sm font-semibold text-navy">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o;
          return (
            <label
              key={o}
              className={`cursor-pointer rounded-full border px-3.5 py-2 text-xs font-bold uppercase tracking-wide transition ${
                active
                  ? "border-gold bg-gold-soft text-navy shadow-card"
                  : "border-input bg-card text-muted-foreground hover:border-gold"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={o}
                checked={active}
                onChange={() => onChange(o)}
                className="sr-only"
              />
              {o}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function Steps({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-3">
      {items.map((s, i) => (
        <li key={s.title} className="rounded-xl border bg-card p-4 shadow-card">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-navy text-xs font-black text-navy-foreground">
            {i + 1}
          </span>
          <b className="mt-2 block text-sm font-black uppercase text-navy">{s.title}</b>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function NextLink({
  to,
  title,
  note,
}: {
  to: "/lvp" | "/contact" | "/carpet" | "/deals";
  title: string;
  note: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between gap-3 rounded-xl border bg-card p-4 shadow-card hover:border-gold"
    >
      <span className="min-w-0">
        <span className="eyebrow block text-gold-deep">Next</span>
        <b className="block text-sm font-black uppercase text-navy">{title}</b>
        <span className="text-xs text-muted-foreground">{note}</span>
      </span>
      <ChevronRight className="h-5 w-5 shrink-0 text-gold-deep" />
    </Link>
  );
}
