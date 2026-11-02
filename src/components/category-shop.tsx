import { Link } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { Check, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Header, SiteFooter } from "@/components/site";
import { Button } from "@/components/ui/button";
import { CatalogResults } from "@/components/catalog-results";
import type { CatalogProduct } from "@/lib/catalog";

/**
 * Shared shopping-category system, modelled on the approved LVP page:
 * compact header → quick picks → sort → filter sidebar (desktop) / drawer (mobile) → product grid.
 */
export type FacetOption = { id: string; label: string; test: (p: CatalogProduct) => boolean };
export type Facet = { id: string; title: string; options: FacetOption[] };
export type SortOption = {
  id: string;
  label: string;
  fn: (a: CatalogProduct, b: CatalogProduct) => number;
};

export function CategoryHeader({
  crumb,
  eyebrow,
  title,
  lead,
  image,
  facts,
  children,
}: {
  crumb: string;
  eyebrow: string;
  title: string;
  lead: string;
  image?: string;
  facts?: { value: string; label: string }[];
  children?: ReactNode;
}) {
  return (
    <>
      <nav
        className="flex items-center gap-1 py-3 text-xs text-muted-foreground"
        aria-label="Breadcrumb"
      >
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-semibold text-foreground">{crumb}</span>
      </nav>
      <section className="flex overflow-hidden border-b bg-card">
        <div className="grid min-w-0 flex-1 content-center gap-1.5 py-3 sm:py-4">
          <p className="eyebrow text-gold-deep">{eyebrow}</p>
          <h1 className="text-[28px] font-black leading-tight text-navy sm:text-[32px]">{title}</h1>
          <p className="max-w-2xl text-sm leading-snug text-muted-foreground">{lead}</p>
          {(facts?.length || children) && (
            <div className="mt-1 flex flex-wrap items-center gap-2">
              {facts?.map((f) => (
                <span
                  key={f.label}
                  className="inline-flex items-baseline gap-1.5 rounded-md border bg-surface px-2.5 py-1"
                >
                  <b className="font-display text-sm font-black text-navy">{f.value}</b>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                    {f.label}
                  </span>
                </span>
              ))}
              {children}
            </div>
          )}
        </div>
        {image && (
          <div className="relative hidden w-[25%] max-w-[300px] shrink-0 md:block">
            <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        )}
      </section>
    </>
  );
}

export function QuickPick({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Button
      variant="ghost"
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`flex h-9 shrink-0 items-center gap-1 rounded-full border px-3.5 text-xs font-bold transition ${on ? "border-navy bg-navy text-navy-foreground" : "bg-card hover:border-gold"}`}
    >
      {on && <Check className="h-3.5 w-3.5" />}
      {children}
    </Button>
  );
}

type Sel = Record<string, string[]>;
const matches = (p: CatalogProduct, facets: Facet[], sel: Sel) =>
  facets.every(
    (f) => !sel[f.id]?.length || f.options.some((o) => sel[f.id]?.includes(o.id) && o.test(p)),
  );

export function CategoryShop({
  title,
  items,
  facets = [],
  quick = [],
  sorts,
  noun = "products",
  notice,
  renderCard,
  children,
}: {
  title: string;
  items: CatalogProduct[];
  facets?: Facet[];
  quick?: { facet: string; option: string }[];
  sorts: SortOption[];
  noun?: string;
  notice?: ReactNode;
  renderCard: (p: CatalogProduct) => ReactNode;
  children?: ReactNode;
}) {
  const [sel, setSel] = useState<Sel>({});
  const [sort, setSort] = useState(sorts[0]?.id ?? "name");
  const usable = facets.filter((f) => f.options.filter((o) => items.some(o.test)).length > 1);
  const results = useMemo(
    () => items.filter((p) => matches(p, usable, sel)).sort(sorts.find((s) => s.id === sort)?.fn),
    [items, usable, sel, sort, sorts],
  );
  const toggle = (f: string, o: string) =>
    setSel((s) => ({
      ...s,
      [f]: s[f]?.includes(o) ? s[f].filter((x) => x !== o) : [...(s[f] ?? []), o],
    }));
  const active = Object.values(sel).reduce((n, a) => n + a.length, 0);
  const countFor = (f: string, o: string) =>
    items.filter((p) => matches(p, usable, { ...sel, [f]: [o] })).length;
  const hasFilters = usable.length > 0;
  const label = (f: string, o: string) =>
    facets.find((x) => x.id === f)?.options.find((x) => x.id === o)?.label ?? o;

  const sortEl = (full?: boolean) => (
    <select
      aria-label="Sort by"
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      className={`h-11 rounded-md border border-input bg-card px-3 text-sm font-bold text-foreground outline-none focus:ring-2 focus:ring-ring ${full ? "w-full" : "h-10"}`}
    >
      {sorts.map((s) => (
        <option key={s.id} value={s.id}>
          {full ? `Sort: ${s.label}` : s.label}
        </option>
      ))}
    </select>
  );

  const panel = (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <span className="eyebrow text-foreground">Filters</span>
        {active > 0 && (
          <Button
            variant="ghost"
            type="button"
            onClick={() => setSel({})}
            className="text-[11px] font-bold uppercase tracking-wide text-gold-deep underline underline-offset-2"
          >
            Clear all
          </Button>
        )}
      </div>
      {usable.map((f) => (
        <fieldset key={f.id} className="border-t pt-3">
          <legend className="eyebrow mb-2 text-muted-foreground">{f.title}</legend>
          <div className="grid gap-1">
            {f.options
              .filter((o) => items.some(o.test))
              .map((o) => {
                const on = !!sel[f.id]?.includes(o.id);
                const n = countFor(f.id, o.id);
                return (
                  <Button
                    variant="ghost"
                    key={o.id}
                    type="button"
                    onClick={() => toggle(f.id, o.id)}
                    disabled={!on && n === 0}
                    className="group flex items-center gap-2 rounded px-1 py-1 text-left text-sm disabled:opacity-40"
                  >
                    <span
                      className={`grid h-4 w-4 shrink-0 place-items-center rounded-sm border transition ${on ? "border-navy bg-navy text-navy-foreground" : "border-input bg-card group-hover:border-gold"}`}
                    >
                      {on && <Check className="h-3 w-3" />}
                    </span>
                    <span className={`flex-1 ${on ? "font-bold" : ""}`}>{o.label}</span>
                    <span className="text-[11px] text-muted-foreground">{n}</span>
                  </Button>
                );
              })}
          </div>
        </fieldset>
      ))}
    </div>
  );

  const quickUsable = quick.filter((q) => usable.some((f) => f.id === q.facet));

  return (
    <section id="shop" className="mt-5 scroll-mt-40">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 border-b pb-3">
        <div className="min-w-0">
          <h2 className="text-xl font-black tracking-tight text-navy sm:text-2xl">{title}</h2>
          <p className="text-sm text-muted-foreground">
            <b className="text-foreground">{results.length}</b> of {items.length} {noun}
          </p>
        </div>
        <label
          className={`${hasFilters ? "hidden sm:flex" : "flex"} items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground`}
        >
          <span className="hidden sm:inline">Sort by</span>
          {sortEl()}
        </label>
      </div>

      {hasFilters && (
        <div className="sticky top-[var(--header-height)] z-30 -mx-4 mt-3 grid grid-cols-2 gap-2 bg-background/95 px-4 py-2 backdrop-blur sm:hidden lg:hidden">
          <Sheet>
            <SheetTrigger className="flex h-11 items-center justify-center gap-2 rounded-md border border-input bg-card text-sm font-bold">
              <SlidersHorizontal className="h-4 w-4" />
              Filter
              {active > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[11px] text-gold-foreground">
                  {active}
                </span>
              )}
            </SheetTrigger>
            <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto p-4">
              <SheetHeader className="p-0">
                <SheetTitle className="font-display text-xl font-black">Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-3">{panel}</div>
              <SheetTrigger className="btn-gold sticky bottom-0 mt-4 h-12 w-full rounded-md text-sm">
                Show {results.length} results
              </SheetTrigger>
            </SheetContent>
          </Sheet>
          {sortEl(true)}
        </div>
      )}
      {hasFilters && (
        <div className="mt-3 hidden sm:block lg:hidden">
          <Sheet>
            <SheetTrigger className="flex h-10 items-center gap-2 rounded-md border border-input bg-card px-4 text-sm font-bold">
              <SlidersHorizontal className="h-4 w-4" />
              Filter{active > 0 && ` (${active})`}
            </SheetTrigger>
            <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto p-4">
              <SheetHeader className="p-0">
                <SheetTitle className="font-display text-xl font-black">Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-3">{panel}</div>
            </SheetContent>
          </Sheet>
        </div>
      )}

      {quickUsable.length > 0 && (
        <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          <span className="eyebrow hidden self-center text-muted-foreground sm:inline">
            Quick picks
          </span>
          {quickUsable.map((q) => (
            <QuickPick
              key={q.facet + q.option}
              on={!!sel[q.facet]?.includes(q.option)}
              onClick={() => toggle(q.facet, q.option)}
            >
              {label(q.facet, q.option)}
            </QuickPick>
          ))}
        </div>
      )}

      {active > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {Object.entries(sel).flatMap(([f, ids]) =>
            ids.map((o) => (
              <Button
                variant="ghost"
                key={f + o}
                type="button"
                onClick={() => toggle(f, o)}
                className="flex items-center gap-1 rounded-full bg-navy px-3 py-1 text-xs font-semibold text-navy-foreground"
              >
                {label(f, o)}
                <X className="h-3 w-3" />
              </Button>
            )),
          )}
          <Button
            variant="ghost"
            type="button"
            onClick={() => setSel({})}
            className="text-xs font-bold uppercase tracking-wide text-gold-deep underline underline-offset-2"
          >
            Clear all
          </Button>
        </div>
      )}

      {notice && <div className="mt-3">{notice}</div>}

      <div
        className={`mt-4 grid grid-cols-1 gap-6 ${hasFilters ? "lg:grid-cols-[230px_minmax(0,1fr)]" : ""}`}
      >
        {hasFilters && (
          <aside className="hidden lg:block">
            <div className="sticky top-40 rounded-xl border bg-card p-4 shadow-card">{panel}</div>
          </aside>
        )}
        <div className="min-w-0">
          {results.length === 0 ? (
            <div className="rounded-xl border bg-card p-10 text-center">
              <p className="font-display text-lg font-black">Nothing matches those filters.</p>
              <Button
                variant="ghost"
                type="button"
                onClick={() => setSel({})}
                className="btn-gold mt-4 h-10 rounded-md px-5 text-xs"
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <CatalogResults
              key={JSON.stringify(sel) + sort + title}
              items={results}
              itemKey={(p) => p.slug}
              render={renderCard}
              className={`grid grid-cols-1 gap-x-5 gap-y-5 min-[600px]:grid-cols-2 ${hasFilters ? "min-[1180px]:grid-cols-3" : "lg:grid-cols-3 xl:grid-cols-4"}`}
            />
          )}
          {children}
        </div>
      </div>
    </section>
  );
}

export function CategoryPage({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">{children}</main>
      <SiteFooter />
    </div>
  );
}
