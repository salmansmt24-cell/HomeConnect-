import { Link } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ImageOff,
  Info,
  Minus,
  Plus,
  ShoppingCart,
  Store,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import { Header, HelpCompact, SiteFooter } from "@/components/site";
import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { money } from "@/lib/flooring";
import {
  canAddToCart,
  carpetYards,
  hasSale,
  minQty,
  sqFtPrice,
  sqFtRegular,
  titleCase,
  unitLabel,
  usableImages,
  SNAPSHOT_DATE,
  type CatalogProduct,
} from "@/lib/catalog";

/* ---------- shell ---------- */
export function StoreShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-10 pt-5 sm:px-6">{children}</main>
      <SiteFooter />
    </div>
  );
}

/** Compact, light photographic intro — photo stays clearly visible, no navy wash. */
export function CategoryHero({
  eyebrow,
  title,
  lead,
  image,
  imageNote = "Illustrative photo",
  stats,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  image: string;
  imageNote?: string;
  stats?: { value: string; label: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="grid overflow-hidden rounded-2xl border bg-card shadow-card md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="flex flex-col justify-center gap-3 p-5 sm:p-7">
        <p className="eyebrow text-gold-deep">{eyebrow}</p>
        <h1 className="text-3xl font-black leading-[1.05] tracking-tight text-navy sm:text-4xl">
          {title}
        </h1>
        <p className="max-w-md text-sm text-muted-foreground sm:text-base">{lead}</p>
        {stats && (
          <dl className="mt-1 flex flex-wrap gap-x-6 gap-y-2">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="font-display text-xl font-black text-navy">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {children && <div className="mt-1 flex flex-wrap gap-2">{children}</div>}
      </div>
      <div className="relative order-first aspect-[16/9] md:order-none md:aspect-auto md:min-h-[260px]">
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <span className="absolute bottom-2 right-2 rounded bg-card/85 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
          {imageNote}
        </span>
      </div>
    </section>
  );
}

export function SectionBar({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children?: ReactNode;
}) {
  return (
    <div className="mt-6 flex flex-wrap items-end justify-between gap-3 border-b pb-3">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-navy sm:text-3xl">{title}</h2>
        <p className="text-xs text-muted-foreground">
          {count} {count === 1 ? "product" : "products"}
        </p>
      </div>
      {children}
    </div>
  );
}

export function SortSelect<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string }[];
}) {
  return (
    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
      Sort
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="h-10 rounded-md border bg-card px-3 text-sm font-semibold normal-case tracking-normal text-foreground"
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Chips<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string }[];
}) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar">
      {options.map((o) => (
        <Button
          variant="ghost"
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          aria-pressed={value === o.id}
          className={`h-9 shrink-0 rounded-full border px-4 text-xs font-bold ${value === o.id ? "border-gold bg-gold-soft text-navy" : "bg-card hover:border-gold"}`}
        >
          {o.label}
        </Button>
      ))}
    </div>
  );
}

export function ProductImage({
  p,
  className = "",
  idx = 0,
}: {
  p: CatalogProduct;
  className?: string;
  idx?: number;
}) {
  const src = usableImages(p)[idx];
  if (!src)
    return (
      <div className={`grid place-items-center bg-surface text-muted-foreground ${className}`}>
        <span className="flex flex-col items-center gap-1 text-xs font-semibold">
          <ImageOff className="h-6 w-6" />
          Image coming soon
        </span>
      </div>
    );
  return (
    <img
      src={src}
      alt={`${titleCase(p.name)}`}
      loading="lazy"
      className={`object-cover ${className}`}
    />
  );
}

/* ---------- price ---------- */
export function PriceLine({ p, size = "md" }: { p: CatalogProduct; size?: "md" | "lg" }) {
  const big = size === "lg" ? "text-4xl" : "text-2xl";
  if (p.price === null)
    return (
      <p
        className={`font-display font-black uppercase text-navy ${size === "lg" ? "text-2xl" : "text-lg"}`}
      >
        Price coming soon
      </p>
    );
  const sq = sqFtPrice(p);
  const unit = unitLabel(p);
  const sale = hasSale(p);
  if (sq !== null) {
    const reg = sqFtRegular(p);
    return (
      <p className="flex flex-wrap items-baseline gap-x-1.5">
        <span className={`font-display ${big} font-black text-navy`}>{money(sq)}</span>
        <span className="text-xs font-semibold text-muted-foreground">/ sq ft</span>
        {sale && reg !== null && <s className="text-xs text-muted-foreground">{money(reg)}</s>}
        <span className="basis-full text-[11px] text-muted-foreground">
          {money(p.price)}
          {unit ? ` / ${unit}` : ""}
          {sale && p.regular ? (
            <>
              {" "}
              · reg. <s>{money(p.regular)}</s>
            </>
          ) : null}
        </span>
      </p>
    );
  }
  return (
    <p className="flex flex-wrap items-baseline gap-x-1.5">
      <span className={`font-display ${big} font-black text-navy`}>{money(p.price)}</span>
      {unit ? (
        <span className="text-xs font-semibold text-muted-foreground">/ {unit}</span>
      ) : (
        <span className="text-[11px] text-muted-foreground">
          selling unit confirmed at checkout
        </span>
      )}
      {sale && p.regular && <s className="text-xs text-muted-foreground">{money(p.regular)}</s>}
    </p>
  );
}

/* ---------- card ---------- */
export function ProductCard({
  p,
  to,
  eyebrow,
  facts,
  cta = "View product",
}: {
  p: CatalogProduct;
  to: { href: string } | { route: "flooring" | "carpet" | "accessories" | "snapcaps" | "floor" };
  eyebrow: string;
  facts?: string[];
  cta?: string;
}) {
  if (p.slug === "driftwood")
    return (
      <article className="flex flex-col gap-3 rounded-xl border bg-card p-4">
        <div className="grid aspect-[4/3] place-items-center bg-surface text-sm text-muted-foreground">
          Image awaiting verification
        </div>
        <h3 className="text-lg font-black">Design placeholder</h3>
        <p className="text-xs text-muted-foreground">Product identity requires verification.</p>
        <Link to="/contact" className="mt-auto text-sm font-bold text-gold-deep">
          Ask Home Connect
        </Link>
      </article>
    );
  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card shadow-card transition-colors hover:border-gold">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <ProductImage
          p={p}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        {hasSale(p) && (
          <span className="absolute left-3 top-3 rounded-md bg-destructive px-2 py-0.5 text-[11px] font-bold uppercase text-destructive-foreground">
            Sale
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-3.5">
        <div>
          <p className="eyebrow text-gold-deep">{eyebrow}</p>
          <h3 className="text-lg font-black leading-tight">{titleCase(p.name)}</h3>
        </div>
        {facts && facts.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {facts.map((f) => (
              <li
                key={f}
                className="rounded bg-surface px-2 py-0.5 text-[11px] font-semibold text-foreground/80"
              >
                {f}
              </li>
            ))}
          </ul>
        )}
        <div className="rounded-lg bg-surface px-3 py-2.5">
          <PriceLine p={p} />
        </div>
        <ProductLink
          p={p}
          target={to}
          className="btn-gold mt-auto flex h-11 items-center justify-center gap-1.5 rounded-md text-xs font-extrabold uppercase tracking-[0.08em]"
        >
          {cta}
          <ArrowRight className="h-4 w-4" />
        </ProductLink>
      </div>
    </article>
  );
}

export function ProductLink({
  p,
  target,
  className,
  children,
}: {
  p: CatalogProduct;
  target: { href: string } | { route: string };
  className?: string;
  children: ReactNode;
}) {
  if ("href" in target)
    return (
      <a href={target.href} className={className}>
        {children}
      </a>
    );
  const params = { slug: p.slug };
  switch (target.route) {
    case "floor":
      return p.slug === "colorado-spring" ? (
        <Link to="/floor/colorado-spring" className={className}>
          {children}
        </Link>
      ) : (
        <Link to="/floor/$slug" params={params} className={className}>
          {children}
        </Link>
      );
    case "carpet":
      return (
        <Link to="/carpet/$slug" params={params} className={className}>
          {children}
        </Link>
      );
    case "accessories":
      return (
        <Link to="/accessories/$slug" params={params} className={className}>
          {children}
        </Link>
      );
    case "snapcaps":
      return (
        <Link to="/snapcaps/$slug" params={params} className={className}>
          {children}
        </Link>
      );
    default:
      return (
        <Link to="/flooring/$slug" params={params} className={className}>
          {children}
        </Link>
      );
  }
}

export const Grid = ({ children }: { children: ReactNode }) => (
  <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
);

export function Notice({ children }: { children: ReactNode }) {
  return (
    <p className="flex gap-2 rounded-lg border border-gold/40 bg-gold-soft/60 p-3 text-xs text-foreground/80">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
      <span>{children}</span>
    </p>
  );
}

/* ---------- PDP shell (mirrors the approved Colorado Spring page) ---------- */
export type PdpKind = "plank" | "carpet" | "accessory" | "snapcaps";

const PANEL_TITLE: Record<PdpKind, [string, string]> = {
  plank: ["ORDER BY THE BOX", "Store pricing"],
  carpet: ["HOW MUCH DO I NEED?", "Live estimate"],
  accessory: ["ORDER & FIT", "Confirmed by our team"],
  snapcaps: ["CONFIGURE YOUR STAIR PARTS", "Compatibility reviewed"],
};

export function ProductPage({
  p,
  kind,
  back,
  eyebrow,
  specs,
  about,
  purchase,
  extra,
  related,
}: {
  p: CatalogProduct;
  kind: PdpKind;
  back: { label: string; node: ReactNode };
  eyebrow: string;
  specs: { label: string; value: string }[];
  about: ReactNode;
  purchase?: ReactNode;
  extra?: ReactNode;
  related?: {
    title: string;
    eyebrow: string;
    items: CatalogProduct[];
    route: "floor" | "flooring" | "carpet" | "accessories" | "snapcaps";
    all: ReactNode;
  };
}) {
  const identity = (
    <div>
      <p className="eyebrow text-gold-deep">{eyebrow}</p>
      <h1 className="mt-1 text-3xl font-black tracking-tight text-navy sm:text-4xl">
        {titleCase(p.name)}
      </h1>
    </div>
  );
  const price = (
    <div className="flex flex-wrap items-end justify-between gap-3 border-y py-3">
      <PriceLine p={p} size="lg" />
      {hasSale(p) && (
        <span className="rounded-md bg-destructive px-2 py-1 text-xs font-bold uppercase text-destructive-foreground">
          Sale
        </span>
      )}
    </div>
  );
  const [title, note] = PANEL_TITLE[kind];
  return (
    <StoreShell>
      <nav className="-mt-2 mb-3 text-xs font-semibold text-muted-foreground">{back.node}</nav>
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-10">
        <div className="grid gap-3 lg:col-start-2 lg:row-start-1">
          {identity}
          {price}
        </div>
        <div className="lg:col-start-1 lg:row-span-2 lg:row-start-1">
          <PdpGallery p={p} />
        </div>
        <div className="flex min-w-0 flex-col gap-4 lg:col-start-2 lg:row-start-2">
          {specs.length > 0 && (
            <dl
              className={`grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border ${["sm:grid-cols-1", "sm:grid-cols-1", "sm:grid-cols-2", "sm:grid-cols-3", "sm:grid-cols-4", "sm:grid-cols-3"][Math.min(specs.length, 5)]}`}
            >
              {specs.map((sp) => (
                <div key={sp.label} className="min-w-0 bg-card p-3">
                  <dt className="eyebrow text-[10px] text-muted-foreground">{sp.label}</dt>
                  <dd className="text-sm font-bold">{sp.value}</dd>
                </div>
              ))}
              {specs.length % 2 === 1 && <div className="bg-card sm:hidden" />}
              {specs.length === 5 && <div className="hidden bg-card sm:block" />}
            </dl>
          )}
          <div className="min-w-0 overflow-hidden rounded-xl border bg-card shadow-card">
            <div className="flex items-center justify-between gap-2 border-b bg-surface px-4 py-3 text-navy">
              <h2 className="text-base font-black tracking-wide">{title}</h2>
              <span className="text-[11px] opacity-75">{note}</span>
            </div>
            <div className="grid gap-4 p-4">
              {purchase}
              <Fulfillment kind={kind} />
            </div>
          </div>
        </div>
      </section>

      {related && related.items.length > 0 && (
        <section className="mt-10 border-t pt-5">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="eyebrow text-gold-deep">{related.eyebrow}</p>
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{related.title}</h2>
            </div>
            {related.all}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {related.items.slice(0, 4).map((r) => (
              <ProductLink
                key={r.slug}
                p={r}
                target={{ route: related.route }}
                className="group min-w-0 overflow-hidden rounded-xl border bg-card shadow-card transition hover:border-gold"
              >
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  <ProductImage
                    p={r}
                    className="h-full w-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-2.5">
                  <p className="truncate text-sm font-bold">{titleCase(r.name)}</p>
                  <div className="text-sm">
                    <PriceLine p={r} />
                  </div>
                </div>
              </ProductLink>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <Tabs defaultValue="desc" className="min-w-0">
          <TabsList className="h-auto w-full justify-start gap-1 overflow-x-auto rounded-none border-b bg-transparent p-0 no-scrollbar">
            {[
              ["desc", "Description"],
              ["spec", "Specifications"],
              ["ship", "Shipping & Pickup"],
              ["help", "Help"],
            ].map(([v, l]) => (
              <TabsTrigger
                key={v}
                value={v ?? "desc"}
                className="shrink-0 rounded-none border-b-2 border-transparent px-3 py-2.5 text-xs font-bold uppercase tracking-wide text-muted-foreground data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                {l}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="pt-5">
            <TabsContent value="desc">
              <div className="grid gap-2 text-sm leading-relaxed text-muted-foreground">
                {about}
              </div>
              {extra}
            </TabsContent>
            <TabsContent value="spec">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ["Product", titleCase(p.name)],
                    ...(p.collection ? [["Collection", p.collection]] : []),
                    ...specs.map((sp) => [sp.label, sp.value]),
                  ].map(([k, v], i) => (
                    <tr key={k} className={i % 2 ? "" : "bg-surface"}>
                      <th className="w-1/3 px-3 py-2 text-left font-semibold text-muted-foreground">
                        {k}
                      </th>
                      <td className="px-3 py-2 font-bold">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>
            <TabsContent value="ship">
              <Fulfillment kind={kind} />
            </TabsContent>
            <TabsContent value="help">
              <p className="text-sm text-muted-foreground">
                Not sure what to order? Contact Home Connect at +1 984 200 9893 or
                info@homeconnect.shop.
              </p>
            </TabsContent>
          </div>
        </Tabs>
        <HelpCompact />
      </section>
      <p className="mt-6 text-center text-[11px] text-muted-foreground">
        Prices and options shown from the Home Connect store snapshot of {SNAPSHOT_DATE}. Final
        price, sale status and availability are confirmed by our store at checkout.
      </p>
    </StoreShell>
  );
}

function PdpGallery({ p }: { p: CatalogProduct }) {
  const imgs = usableImages(p);
  const [i, setI] = useState(0);
  const go = (d: number) => setI((x) => (x + d + imgs.length) % imgs.length);
  return (
    <div className="min-w-0 lg:sticky lg:top-40 lg:self-start">
      <div className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-muted shadow-card">
        <ProductImage
          p={p}
          idx={i}
          className="h-full w-full transition-transform group-hover:scale-[1.02]"
        />
        {imgs.length > 1 && (
          <>
            {[-1, 1].map((d) => (
              <Button
                variant="ghost"
                key={d}
                type="button"
                aria-label={d < 0 ? "Previous image" : "Next image"}
                onClick={() => go(d)}
                className={`absolute top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-card/90 shadow-card hover:bg-card ${d < 0 ? "left-3" : "right-3"}`}
              >
                {d < 0 ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </Button>
            ))}
            <span className="absolute bottom-3 right-3 rounded-full bg-card/90 px-2 py-0.5 text-[11px] font-bold">
              {i + 1} / {imgs.length}
            </span>
          </>
        )}
      </div>
      {imgs.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {imgs.slice(0, 5).map((src, idx) => (
            <Button
              variant="ghost"
              key={src}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Show photo ${idx + 1}`}
              className={`h-auto w-full aspect-square overflow-hidden rounded-lg border-2 p-0 transition ${idx === i ? "border-gold shadow-card" : "border-transparent opacity-70 hover:opacity-100"}`}
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </Button>
          ))}
        </div>
      )}
      {p.imageStatus === "present_but_primary_resolution_is_weak" && (
        <p className="mt-2 text-[11px] text-muted-foreground">
          Store photo shown at the resolution currently available.
        </p>
      )}
    </div>
  );
}

function Fulfil({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-3 rounded-lg bg-surface p-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-card text-navy shadow-card">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="eyebrow text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}

function Fulfillment({ kind }: { kind: PdpKind }) {
  return (
    <div className="grid gap-2 border-t pt-4 sm:grid-cols-2">
      <Fulfil
        icon={<Store className="h-5 w-5" />}
        title="Local pickup"
        text="Raleigh showroom & warehouse — pickup options confirmed at checkout."
      />
      <Fulfil
        icon={<Truck className="h-5 w-5" />}
        title="Delivery / freight"
        text="Calculated for your destination at checkout where available."
      />
      {kind === "snapcaps" && (
        <div className="sm:col-span-2">
          <Fulfil
            icon={<Info className="h-5 w-5" />}
            title="Fabrication"
            text="Typically under seven days after compatible material is received. Not a delivery date."
          />
        </div>
      )}
    </div>
  );
}

/* ---------- purchase panels ---------- */
function Qty({ value, set, min }: { value: number; set: (n: number) => void; min: number }) {
  return (
    <div className="flex h-11 items-center overflow-hidden rounded-md border bg-card">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-11 w-11 rounded-none"
        onClick={() => set(Math.max(min, value - 1))}
        aria-label="Decrease"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <input
        aria-label="Quantity"
        inputMode="numeric"
        value={value}
        onChange={(e) => set(Math.max(min, parseInt(e.target.value) || min))}
        className="w-12 bg-transparent text-center font-bold outline-none"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-11 w-11 rounded-none"
        onClick={() => set(value + 1)}
        aria-label="Increase"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function OptionPicker({
  options,
  value,
  set,
}: {
  options: { name: string; values: string[] }[];
  value: Record<string, string>;
  set: (v: Record<string, string>) => void;
}) {
  return (
    <div className="grid gap-3">
      {options.map((o) => (
        <label
          key={o.name}
          className="grid gap-1 text-xs font-bold uppercase tracking-wide text-muted-foreground"
        >
          {o.name}
          <select
            value={value[o.name] ?? ""}
            onChange={(e) => set({ ...value, [o.name]: e.target.value })}
            className="h-11 rounded-md border bg-card px-3 text-sm font-semibold normal-case tracking-normal text-foreground"
          >
            <option value="">Choose {o.name.toLowerCase()}</option>
            {o.values.map((v, idx) => (
              <option key={`${o.name}-${v}-${idx}`} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  );
}

export function useAdd(p: CatalogProduct) {
  const cart = useCart();
  return (qty: number, choice: Record<string, string>) => {
    const unit = unitLabel(p);
    if (p.price === null || !unit) return;
    const desc = Object.values(choice).filter(Boolean).join(" · ");
    cart.addItem({
      id: `${p.slug}${desc ? `:${desc}` : ""}`,
      name: `${titleCase(p.name)}${desc ? ` — ${desc}` : ""}`,
      price: p.price,
      quantity: qty,
      unit,
      ...(p.coverage ? { coverage: p.coverage } : {}),
      image: usableImages(p)[0],
      productSlug: p.slug,
    });
    toast.success(`Added ${qty} ${unitLabel(p)} to your cart`);
  };
}

/** Box / sample / piece purchase with options. Used by plank, snapcaps and cabinet samples. */
export function UnitPurchase({ p, note }: { p: CatalogProduct; note?: ReactNode }) {
  const min = minQty(p);
  const [qty, setQty] = useState(min);
  const [choice, setChoice] = useState<Record<string, string>>({});
  const add = useAdd(p);
  const ready = p.options.every((o) => choice[o.name]);
  if (!canAddToCart(p) || p.price === null) return <AskPanel p={p} />;
  return (
    <div className="grid gap-3">
      {p.options.length > 0 && <OptionPicker options={p.options} value={choice} set={setChoice} />}
      {note}
      <div className="flex flex-wrap items-center gap-3">
        <Qty value={qty} set={setQty} min={min} />
        <span className="text-xs text-muted-foreground">
          {unitLabel(p)}
          {qty === 1 ? "" : "s"}
          {min > 1 ? ` · minimum ${min}` : ""}
        </span>
        <b className="ml-auto font-display text-xl text-navy">{money(p.price * qty)}</b>
      </div>
      <Button
        type="button"
        disabled={!ready}
        onClick={() => add(qty, choice)}
        className="btn-gold h-12 w-full text-xs font-extrabold uppercase tracking-[0.08em]"
      >
        <ShoppingCart className="h-4 w-4" />
        {ready ? "Add to cart" : "Choose options to add"}
      </Button>
    </div>
  );
}

/** Carpet: sq ft → sq yd (9 sq ft = 1 sq yd), priced per sq yd. Disabled when price is withheld. */
export function CarpetPurchase({ p }: { p: CatalogProduct }) {
  const [sqft, setSqft] = useState(200);
  const [choice, setChoice] = useState<Record<string, string>>({});
  const add = useAdd(p);
  const yards = carpetYards(sqft);
  const ready = p.options.every((o) => choice[o.name]) && yards > 0;
  if (p.price === null)
    return (
      <div className="grid gap-3">
        <p className="text-sm font-semibold">
          Pricing for this style is being finalized, so online ordering and the estimator are
          paused.
        </p>
        <Link
          to="/contact"
          className="btn-gold flex h-12 items-center justify-center rounded-md text-xs font-extrabold uppercase tracking-[0.08em]"
        >
          Ask about this carpet
        </Link>
      </div>
    );
  return (
    <div className="grid gap-3">
      {p.options.length > 0 && <OptionPicker options={p.options} value={choice} set={setChoice} />}
      <label className="grid gap-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
        Room size (sq ft)
        <input
          type="number"
          min={0}
          value={sqft}
          onChange={(e) => setSqft(Math.max(0, Number(e.target.value)))}
          className="h-11 rounded-md border bg-card px-3 text-sm font-semibold text-foreground"
        />
      </label>
      <div className="grid grid-cols-2 gap-2 rounded-lg bg-surface p-3 text-sm">
        <span>
          You need <b>{yards} sq yd</b>
          <span className="block text-[11px] text-muted-foreground">
            9 sq ft = 1 sq yd, rounded up
          </span>
        </span>
        <b className="text-right font-display text-2xl text-navy">{money(yards * p.price)}</b>
      </div>
      <p className="text-[11px] text-muted-foreground">
        Estimate covers the room area only. Confirm seams and cuts with our team before ordering.
      </p>
      <Button
        type="button"
        disabled={!ready}
        onClick={() => add(yards, choice)}
        className="btn-gold h-12 w-full text-xs font-extrabold uppercase tracking-[0.08em]"
      >
        <ShoppingCart className="h-4 w-4" />
        {ready ? `Add ${yards} sq yd to cart` : "Choose a color to add"}
      </Button>
      <Link
        to="/contact"
        className="text-center text-xs font-bold uppercase text-muted-foreground hover:text-gold-deep"
      >
        Prefer a quote? Contact us
      </Link>
    </div>
  );
}

/** Accessories with no reliable unit: show options for reference, route to help rather than invent a unit. */
export function AskPanel({ p }: { p: CatalogProduct }) {
  const [choice, setChoice] = useState<Record<string, string>>({});
  return (
    <div className="grid gap-3">
      {p.options.length > 0 && <OptionPicker options={p.options} value={choice} set={setChoice} />}
      <Notice>
        The selling unit for this item is confirmed by our team before ordering. Matching to your
        floor is checked by hand — we don't assume a match from a color name.
      </Notice>
      <Link
        to="/contact"
        className="btn-gold flex h-12 items-center justify-center gap-1.5 rounded-md text-xs font-extrabold uppercase tracking-[0.08em]"
      >
        Check fit &amp; order
        <ArrowRight className="h-4 w-4" />
      </Link>
      <a
        href="tel:+19842009893"
        className="text-center text-xs font-bold uppercase text-muted-foreground hover:text-gold-deep"
      >
        Or call +1 984 200 9893
      </a>
    </div>
  );
}

export function BackLink({
  children,
  node,
}: {
  children: ReactNode;
  node: (c: ReactNode) => ReactNode;
}) {
  return (
    <>
      {node(
        <span className="inline-flex items-center gap-1 hover:text-gold-deep">
          <ArrowLeft className="h-3.5 w-3.5" />
          {children}
        </span>,
      )}
    </>
  );
}

export function useSorted<T extends string>(
  items: CatalogProduct[],
  initial: T,
  fn: (s: T, list: CatalogProduct[]) => CatalogProduct[],
) {
  const [sort, setSort] = useState<T>(initial);
  const list = useMemo(() => fn(sort, [...items]), [sort, items, fn]);
  return { sort, setSort, list };
}

export const byPrice = (dir: 1 | -1) => (a: CatalogProduct, b: CatalogProduct) => {
  if (a.price === null) return 1;
  if (b.price === null) return -1;
  return dir * ((sqFtPrice(a) ?? a.price) - (sqFtPrice(b) ?? b.price));
};
export const byName = (a: CatalogProduct, b: CatalogProduct) => a.name.localeCompare(b.name);
