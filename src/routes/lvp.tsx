import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ChevronRight,
  SlidersHorizontal,
  X,
  Layers,
  Shield,
  Store,
  Wrench,
  ArrowRight,
  Check,
  ImageOff,
  WandSparkles,
  LoaderCircle,
  Square,
  ShoppingCart,
} from "lucide-react";
import { Header, SiteFooter, HelpCompact } from "@/components/site";
import { CatalogResults } from "@/components/catalog-results";
import { CategoryHeader } from "@/components/category-shop";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  applyFilters,
  EMPTY,
  fullImg,
  LVP,
  PRICE_BANDS,
  type Filters,
  type Lvp,
  type Sort,
} from "@/lib/lvp";
import { money } from "@/lib/flooring";
import { useCart } from "@/components/cart-provider";
import hero from "@/assets/room-2.jpg";

export const Route = createFileRoute("/lvp")({
  head: () => ({
    meta: [
      { title: "Luxury Vinyl Plank Flooring – Shop LVP | Home Connect" },
      {
        name: "description",
        content:
          "Shop luxury vinyl plank flooring from $1.69/sq ft. Compare collections by price, wear layer, thickness and plank size.",
      },
      { property: "og:title", content: "Shop Luxury Vinyl Plank | Home Connect" },
      {
        property: "og:description",
        content: "Compare LVP collections side by side — priced by the square foot.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LvpPage,
});

const SORTS: { v: Sort; l: string }[] = [
  { v: "featured", l: "Featured" },
  { v: "price-asc", l: "Price: Low to High" },
  { v: "price-desc", l: "Price: High to Low" },
  { v: "name", l: "Name: A–Z" },
];

const uniq = <T,>(a: (T | undefined)[]) => [...new Set(a.filter((x): x is T => x !== undefined))];
const GROUPS: {
  key: keyof Omit<Filters, "sale">;
  title: string;
  opts: { id: string; label: string }[];
}[] = [
  {
    key: "price",
    title: "Price per sq ft",
    opts: PRICE_BANDS.map((b) => ({ id: b.id, label: b.label })),
  },
  {
    key: "install",
    title: "Installation",
    opts: uniq(LVP.map((p) => p.install)).map((v) => ({ id: v, label: v })),
  },
  {
    key: "wear",
    title: "Wear layer",
    opts: uniq(LVP.map((p) => p.wear))
      .sort((a, b) => a - b)
      .map((v) => ({ id: String(v), label: `${v} Mil` })),
  },
  {
    key: "thickness",
    title: "Thickness",
    opts: uniq(LVP.map((p) => p.thickness))
      .sort((a, b) => a - b)
      .map((v) => ({ id: String(v), label: `${v} mm` })),
  },
  {
    key: "plank",
    title: "Plank size",
    opts: uniq(LVP.map((p) => p.plank)).map((v) => ({ id: v, label: v })),
  },
];

function LvpPage() {
  const [f, setF] = useState<Filters>(EMPTY);
  const [sort, setSort] = useState<Sort>("featured");
  const [finderOpen, setFinderOpen] = useState(false);
  const results = useMemo(() => applyFilters(LVP, f, sort), [f, sort]);
  const activeCount = GROUPS.reduce((n, g) => n + f[g.key].length, 0) + (f.sale ? 1 : 0);
  const toggle = (k: keyof Omit<Filters, "sale">, id: string) =>
    setF((p) => ({ ...p, [k]: p[k].includes(id) ? p[k].filter((x) => x !== id) : [...p[k], id] }));
  const countFor = (k: keyof Omit<Filters, "sale">, id: string) =>
    applyFilters(LVP, { ...f, [k]: [id] }, "featured").length;
  const panel = (
    <FilterPanel f={f} setF={setF} toggle={toggle} countFor={countFor} activeCount={activeCount} />
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <CategoryHeader
          crumb="Luxury Vinyl Plank"
          eyebrow="Flooring · Luxury vinyl plank"
          title="SHOP LUXURY VINYL PLANK"
          image={hero}
          lead="Durable flooring priced by the square foot so you can compare collections side by side."
          facts={[
            { value: String(LVP.length), label: "Floors" },
            { value: money(1.69), label: "From / sq ft" },
            { value: "8–28", label: "Mil wear" },
          ]}
        >
          <Button
            type="button"
            variant="outline"
            onClick={() => setFinderOpen(true)}
            className="h-8 border-2 border-navy px-3 text-xs font-extrabold text-navy hover:bg-navy hover:text-navy-foreground"
          >
            Help me choose
          </Button>
        </CategoryHeader>

        {/* SHOP */}
        <section id="shop" className="mt-5 scroll-mt-40">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 border-b pb-3">
            <div className="min-w-0">
              <p className="eyebrow text-gold-deep">The collection</p>
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">ALL LVP FLOORS</h2>
              <p className="text-sm text-muted-foreground">
                <b className="text-foreground">{results.length}</b> of {LVP.length} floors
              </p>
            </div>
            <label className="hidden items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground sm:flex">
              Sort by
              <SortSelect sort={sort} setSort={setSort} />
            </label>
          </div>

          {/* mobile controls */}
          <div className="sticky top-[var(--header-height)] z-30 -mx-4 mt-3 grid grid-cols-2 gap-2 bg-background/95 px-4 py-2 backdrop-blur lg:hidden">
            <Sheet>
              <SheetTrigger className="flex h-11 items-center justify-center gap-2 rounded-md border border-input bg-card text-sm font-bold">
                <SlidersHorizontal className="h-4 w-4" />
                Filter
                {activeCount > 0 && (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[11px] text-gold-foreground">
                    {activeCount}
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
            <SortSelect sort={sort} setSort={setSort} full />
          </div>

          <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            <span className="eyebrow hidden self-center text-muted-foreground sm:inline">
              Quick picks
            </span>
            <Quick on={f.sale} onClick={() => setF((p) => ({ ...p, sale: !p.sale }))}>
              On sale
            </Quick>
            <Quick
              on={f.install.includes("Click-lock")}
              onClick={() => toggle("install", "Click-lock")}
            >
              Click-lock
            </Quick>
            <Quick
              on={f.install.includes("Glue down")}
              onClick={() => toggle("install", "Glue down")}
            >
              Glue down
            </Quick>
            {PRICE_BANDS.map((b) => (
              <Quick key={b.id} on={f.price.includes(b.id)} onClick={() => toggle("price", b.id)}>
                {b.label}
              </Quick>
            ))}
          </div>

          {activeCount > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {GROUPS.flatMap((g) =>
                f[g.key].map((id) => (
                  <Button
                    variant="ghost"
                    key={g.key + id}
                    onClick={() => toggle(g.key, id)}
                    className="flex items-center gap-1 rounded-full bg-navy px-3 py-1 text-xs font-semibold text-navy-foreground"
                  >
                    {g.opts.find((o) => o.id === id)?.label}
                    <X className="h-3 w-3" />
                  </Button>
                )),
              )}
              {f.sale && (
                <Button
                  variant="ghost"
                  onClick={() => setF((p) => ({ ...p, sale: false }))}
                  className="flex items-center gap-1 rounded-full bg-navy px-3 py-1 text-xs font-semibold text-navy-foreground"
                >
                  On sale
                  <X className="h-3 w-3" />
                </Button>
              )}
              <Button
                variant="ghost"
                onClick={() => setF(EMPTY)}
                className="text-xs font-bold uppercase tracking-wide text-gold-deep underline underline-offset-2"
              >
                Clear all
              </Button>
            </div>
          )}

          <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[230px_minmax(0,1fr)]">
            <aside className="hidden lg:block">
              <div className="sticky top-40 rounded-xl border bg-card p-4 shadow-card">{panel}</div>
            </aside>
            <div className="min-w-0">
              {results.length === 0 ? (
                <div className="rounded-xl border bg-card p-10 text-center">
                  <p className="font-display text-lg font-black">
                    No flooring matches those filters.
                  </p>
                  <Button
                    variant="ghost"
                    onClick={() => setF(EMPTY)}
                    className="btn-gold mt-4 h-10 rounded-md px-5 text-xs"
                  >
                    Clear all filters
                  </Button>
                </div>
              ) : (
                <CatalogResults
                  key={JSON.stringify(f) + sort}
                  items={results}
                  itemKey={(p) => p.slug}
                  render={(p) => <LvpCard p={p} />}
                  className="grid grid-cols-1 gap-x-5 gap-y-5 min-[600px]:grid-cols-2 min-[1180px]:grid-cols-3"
                />
              )}
              <p className="mt-3 text-[10px] text-muted-foreground">
                Prototype note: catalog snapshot from homeconnect.shop; all cards open the master
                product page template.
              </p>
            </div>
          </div>
        </section>

        {/* HELP ME CHOOSE */}
        <section className="mt-10 grid gap-4 rounded-2xl bg-gradient-navy p-5 text-navy-foreground sm:p-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div>
            <h2 className="text-xl font-black sm:text-2xl">NOT SURE WHICH FLOOR IS RIGHT?</h2>
            <p className="mt-1 max-w-2xl text-sm text-navy-foreground/80">
              Tell us what matters most — durability, color, budget or installation — and Home
              Connect can help you narrow it down.
            </p>
          </div>
          <Button
            type="button"
            onClick={() => setFinderOpen(true)}
            className="btn-gold h-11 px-5 text-sm"
          >
            Find my floor
          </Button>
        </section>

        {/* GUIDE */}
        <section className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            <p className="eyebrow text-gold-deep">Buying guide</p>
            <h2 className="text-2xl font-black tracking-tight">WHY CHOOSE LVP?</h2>
            <Accordion
              type="single"
              collapsible
              defaultValue="wear"
              className="mt-3 rounded-xl border bg-card px-4"
            >
              <AccordionItem value="wear">
                <AccordionTrigger className="text-sm font-bold">
                  What does wear layer mean?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  The wear layer is the clear protective top coat, measured in mil. Our collections
                  range from 8 mil to 28 mil — compare the wear layer on each card or filter by it
                  above.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="install">
                <AccordionTrigger className="text-sm font-bold">
                  Click-lock or glue-down?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Click-lock planks connect to each other as a floating floor. Glue-down planks are
                  adhered to the subfloor. Both options are available — use the Installation filter
                  to narrow your choice.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="price">
                <AccordionTrigger className="text-sm font-bold">
                  How is pricing shown?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Every floor is priced by the square foot so collections are easy to compare. Each
                  product page shows the box price and coverage, plus a calculator for how many
                  boxes you need.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="installers" className="border-b-0">
                <AccordionTrigger className="text-sm font-bold">Do you install?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Home Connect sells flooring materials. We may refer customers to independent
                  installers in the Raleigh, Cary, Apex, Garner and Wake County area. Availability
                  varies, and installers are not Home Connect employees.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <HelpCompact />
        </section>
        <FloorFinder open={finderOpen} onOpenChange={setFinderOpen} />
      </main>
      <SiteFooter />
    </div>
  );
}

type FinderResult = {
  intro: string;
  recommendations: { product: Lvp; reason: string }[];
  note: string;
};

function FloorFinder({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [room, setRoom] = useState("");
  const [budget, setBudget] = useState("");
  const [needs, setNeeds] = useState("");
  const [result, setResult] = useState<FinderResult>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const controller = useRef<AbortController | null>(null);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setResult(undefined);
    setLoading(true);
    const nextController = new AbortController();
    controller.current = nextController;
    try {
      const response = await fetch("/api/lvp-recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ room, budget, needs }),
        signal: nextController.signal,
      });
      const body = (await response.json()) as FinderResult & { error?: string };
      if (!response.ok)
        throw new Error(body.error ?? "The floor finder could not complete your recommendation.");
      setResult(body);
    } catch (cause) {
      if (cause instanceof DOMException && cause.name === "AbortError")
        setError("Recommendation stopped.");
      else
        setError(
          cause instanceof Error
            ? cause.message
            : "The floor finder could not complete your recommendation.",
        );
    } finally {
      setLoading(false);
      controller.current = null;
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) controller.current?.abort();
        onOpenChange(next);
      }}
    >
      <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto border-navy/20 bg-background p-5 sm:p-6">
        <DialogHeader className="pr-7 text-left">
          <p className="eyebrow flex items-center gap-2 text-gold-deep">
            <WandSparkles className="h-4 w-4" />
            Home Connect floor finder
          </p>
          <DialogTitle className="font-display text-2xl font-black text-navy sm:text-3xl">
            Find an LVP match
          </DialogTitle>
          <DialogDescription>
            Tell us about your space and priorities. We’ll compare only the floors in this
            collection.
          </DialogDescription>
        </DialogHeader>

        {!result ? (
          <form onSubmit={submit} className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="finder-room" className="font-bold">
                Room
              </Label>
              <Textarea
                id="finder-room"
                value={room}
                onChange={(event) => setRoom(event.target.value)}
                required
                minLength={3}
                maxLength={800}
                placeholder="Example: Busy kitchen and dining area with two dogs"
                className="min-h-20 bg-card"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="finder-budget" className="font-bold">
                Budget
              </Label>
              <Input
                id="finder-budget"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                required
                maxLength={120}
                placeholder="Example: Under $3 per sq ft"
                className="h-11 bg-card"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="finder-needs" className="font-bold">
                Flooring needs
              </Label>
              <Textarea
                id="finder-needs"
                value={needs}
                onChange={(event) => setNeeds(event.target.value)}
                required
                minLength={3}
                maxLength={800}
                placeholder="Example: Light oak look, thicker plank, click-lock installation"
                className="min-h-20 bg-card"
              />
            </div>
            {error && (
              <p
                role="alert"
                className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
              >
                {error}
              </p>
            )}
            {loading ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => controller.current?.abort()}
                className="h-11 border-navy font-bold text-navy"
              >
                <Square className="h-3.5 w-3.5 fill-current" />
                Stop
              </Button>
            ) : (
              <Button type="submit" className="btn-gold h-11 text-sm">
                <WandSparkles className="h-4 w-4" />
                Recommend floors
              </Button>
            )}
            {loading && (
              <p
                aria-live="polite"
                className="flex items-center justify-center gap-2 text-xs font-semibold text-muted-foreground"
              >
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Comparing {LVP.length} LVP floors…
              </p>
            )}
          </form>
        ) : (
          <div className="grid gap-4">
            <p className="text-sm leading-relaxed text-muted-foreground">{result.intro}</p>
            <ol className="grid gap-3">
              {result.recommendations.map(({ product, reason }, index) => (
                <li
                  key={product.slug}
                  className="overflow-hidden rounded-lg border bg-card shadow-card"
                >
                  {product.slug === "colorado-spring" ? (
                    <Link
                      to="/floor/colorado-spring"
                      onClick={() => onOpenChange(false)}
                      className="grid grid-cols-[112px_minmax(0,1fr)] sm:grid-cols-[150px_minmax(0,1fr)]"
                    >
                      <div className="relative min-h-36 bg-surface">
                        {product.img ? (
                          <img
                            src={fullImg(product.img)}
                            alt={product.name}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        ) : (
                          <span className="grid h-full place-items-center">
                            <ImageOff className="h-6 w-6 text-muted-foreground" />
                          </span>
                        )}
                        <span className="absolute left-2 top-2 grid h-7 w-7 place-items-center rounded-md bg-gold-soft font-display text-xs font-black text-gold-deep">
                          {index + 1}
                        </span>
                      </div>
                      <div className="min-w-0 p-3">
                        <p className="eyebrow truncate text-gold-deep">
                          {product.collection ?? "Luxury vinyl plank"}
                        </p>
                        <h3 className="text-lg font-black text-navy">{product.name}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                          {reason}
                        </p>
                        <div className="mt-2 flex flex-wrap items-end justify-between gap-2 border-t pt-2">
                          <p className="text-sm font-extrabold text-navy">
                            {money(product.price)} / sq ft
                            <br />
                            <span className="font-medium text-muted-foreground">
                              {money(product.boxPrice)} / box · {product.coverage} sq ft
                            </span>
                          </p>
                          <span className="text-xs font-extrabold uppercase text-gold-deep">
                            View floor →
                          </span>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to="/floor/$slug"
                      params={{ slug: product.slug }}
                      onClick={() => onOpenChange(false)}
                      className="grid grid-cols-[112px_minmax(0,1fr)] sm:grid-cols-[150px_minmax(0,1fr)]"
                    >
                      <div className="relative min-h-36 bg-surface">
                        {product.img ? (
                          <img
                            src={fullImg(product.img)}
                            alt={product.name}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        ) : (
                          <span className="grid h-full place-items-center">
                            <ImageOff className="h-6 w-6 text-muted-foreground" />
                          </span>
                        )}
                        <span className="absolute left-2 top-2 grid h-7 w-7 place-items-center rounded-md bg-gold-soft font-display text-xs font-black text-gold-deep">
                          {index + 1}
                        </span>
                      </div>
                      <div className="min-w-0 p-3">
                        <p className="eyebrow text-gold-deep">{product.collection}</p>
                        <h4 className="text-lg font-black text-navy">{product.name}</h4>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                          {reason}
                        </p>
                        <div className="mt-2 flex flex-wrap items-end justify-between gap-2 border-t pt-2">
                          <p className="text-sm font-extrabold text-navy">
                            {money(product.price)} / sq ft
                            <br />
                            <span className="font-medium text-muted-foreground">
                              {money(product.boxPrice)} / box · {product.coverage} sq ft
                            </span>
                          </p>
                          <span className="text-xs font-extrabold uppercase text-gold-deep">
                            View floor →
                          </span>
                        </div>
                      </div>
                    </Link>
                  )}
                </li>
              ))}
            </ol>
            <p className="text-xs leading-relaxed text-muted-foreground">{result.note}</p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setResult(undefined)}
                className="h-11 border-navy font-bold text-navy"
              >
                Adjust answers
              </Button>
              <Button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-gold h-11"
              >
                Browse floors
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function SortSelect({
  sort,
  setSort,
  full,
}: {
  sort: Sort;
  setSort: (s: Sort) => void;
  full?: boolean;
}) {
  return (
    <select
      aria-label="Sort by"
      value={sort}
      onChange={(e) => setSort(e.target.value as Sort)}
      className={`h-11 rounded-md border border-input bg-card px-3 text-sm font-bold normal-case tracking-normal text-foreground outline-none focus:ring-2 focus:ring-ring ${full ? "w-full" : "h-10"}`}
    >
      {SORTS.map((s) => (
        <option key={s.v} value={s.v}>
          {full ? `Sort: ${s.l}` : s.l}
        </option>
      ))}
    </select>
  );
}

function FilterPanel({
  f,
  setF,
  toggle,
  countFor,
  activeCount,
}: {
  f: Filters;
  setF: (u: (p: Filters) => Filters) => void;
  toggle: (k: keyof Omit<Filters, "sale">, id: string) => void;
  countFor: (k: keyof Omit<Filters, "sale">, id: string) => number;
  activeCount: number;
}) {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <span className="eyebrow text-foreground">Filters</span>
        {activeCount > 0 && (
          <Button
            variant="ghost"
            onClick={() => setF(() => EMPTY)}
            className="text-[11px] font-bold uppercase tracking-wide text-gold-deep underline underline-offset-2"
          >
            Clear all
          </Button>
        )}
      </div>
      <Button
        variant="ghost"
        onClick={() => setF((p) => ({ ...p, sale: !p.sale }))}
        className={`flex items-center justify-between rounded-md border px-3 py-2 text-sm font-bold transition ${f.sale ? "border-gold bg-gold-soft" : "bg-card hover:border-gold"}`}
      >
        On sale{" "}
        <span
          className={`grid h-4 w-4 place-items-center rounded-sm border ${f.sale ? "border-gold-deep bg-gold-deep text-navy-foreground" : "border-input"}`}
        >
          {f.sale && <Check className="h-3 w-3" />}
        </span>
      </Button>
      {GROUPS.map((g) => (
        <fieldset key={g.key} className="border-t pt-3">
          <legend className="eyebrow mb-2 text-muted-foreground">{g.title}</legend>
          <div
            className={
              g.key === "thickness" || g.key === "wear" ? "flex flex-wrap gap-1.5" : "grid gap-1"
            }
          >
            {g.opts.map((o) => {
              const on = f[g.key].includes(o.id);
              const n = countFor(g.key, o.id);
              if (g.key === "thickness" || g.key === "wear")
                return (
                  <Button
                    variant="ghost"
                    key={o.id}
                    onClick={() => toggle(g.key, o.id)}
                    disabled={!on && n === 0}
                    className={`rounded-full border px-2.5 py-1 text-xs font-bold transition disabled:opacity-40 ${on ? "border-navy bg-navy text-navy-foreground" : "bg-card hover:border-gold"}`}
                  >
                    {o.label}
                  </Button>
                );
              return (
                <Button
                  variant="ghost"
                  key={o.id}
                  onClick={() => toggle(g.key, o.id)}
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
}

function Quick({
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
      onClick={onClick}
      aria-pressed={on}
      className={`flex h-9 shrink-0 items-center gap-1 rounded-full border px-3.5 text-xs font-bold transition ${on ? "border-navy bg-navy text-navy-foreground" : "bg-card hover:border-gold"}`}
    >
      {on && <Check className="h-3.5 w-3.5" />}
      {children}
    </Button>
  );
}

function LvpCard({ p }: { p: Lvp }) {
  const cart = useCart();
  const [src, setSrc] = useState(p.img ? fullImg(p.img) : undefined);
  const specs: [string, string | undefined][] = [
    ["Install", p.install],
    ["Wear", p.wear ? `${p.wear} mil` : undefined],
    ["Thick", p.thickness ? `${p.thickness} mm` : undefined],
    ["Plank", p.plank],
  ];
  const hasSpecs = specs.some(([, v]) => v);
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
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card shadow-card transition hover:-translate-y-0.5 hover:border-gold">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        {src ? (
          <img
            src={src}
            alt={p.name}
            loading="lazy"
            onError={() => setSrc(src !== p.img ? p.img : undefined)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-muted-foreground">
            <span className="flex flex-col items-center gap-1 text-xs font-semibold">
              <ImageOff className="h-6 w-6" />
              Image coming soon
            </span>
          </div>
        )}

        {p.salePrice && (
          <span className="absolute left-3 top-3 rounded-md bg-destructive px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-destructive-foreground">
            Sale
          </span>
        )}
        {p.colors && (
          <span className="absolute bottom-3 left-3 rounded-full bg-card/95 px-2.5 py-0.5 text-[11px] font-bold">
            {p.colors} colors
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-3.5">
        <div className="min-w-0">
          <p className="eyebrow h-4 truncate text-gold-deep">
            {p.collection ?? "Luxury vinyl plank"}
          </p>
          <h3 className="truncate text-lg font-black tracking-tight">{p.name}</h3>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-2 rounded-lg bg-surface px-3 py-2.5">
          <p className="flex min-w-0 flex-wrap items-baseline gap-x-1.5">
            <span className="font-display text-2xl font-black text-navy">{money(p.price)}</span>
            <span className="text-xs font-semibold text-muted-foreground">/ sq ft</span>
            {p.salePrice && <s className="text-xs text-muted-foreground">{money(p.salePrice)}</s>}
          </p>
          <p className="text-right text-[11px] leading-tight">
            <b className="block text-sm">{money(p.boxPrice)}</b>
            <span className="text-muted-foreground">box · {p.coverage} sq ft</span>
          </p>
        </div>
        {hasSpecs && (
          <dl className="grid grid-cols-[1.3fr_0.9fr_0.9fr_1fr] divide-x rounded-lg border bg-card text-center">
            {specs.map(([l, v]) => (
              <div key={l} className="min-w-0 px-1 py-1.5">
                <dt className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                  {l}
                </dt>
                <dd className="truncate text-xs font-extrabold text-foreground">{v ?? "—"}</dd>
              </div>
            ))}
          </dl>
        )}
        {p.slug === "colorado-spring" ? (
          <Link
            to="/floor/colorado-spring"
            className="btn-gold mt-auto flex h-11 items-center justify-center gap-1.5 rounded-md text-xs font-extrabold uppercase tracking-[0.08em]"
          >
            View floor
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <Link
            to="/floor/$slug"
            params={{ slug: p.slug }}
            className="btn-gold mt-auto flex h-11 items-center justify-center gap-1.5 rounded-md text-xs font-extrabold uppercase tracking-[0.08em]"
          >
            View floor
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            cart.addItem({
              id: `lvp-${p.slug}`,
              name: p.name,
              price: p.boxPrice,
              quantity: 1,
              unit: "box",
              ...(p.img ? { image: fullImg(p.img) } : {}),
              coverage: p.coverage,
              productSlug: p.slug,
            })
          }
          className="h-10 border-navy text-xs font-extrabold uppercase text-navy"
        >
          <ShoppingCart className="h-4 w-4" />
          Add 1 box
        </Button>
      </div>
    </article>
  );
}
