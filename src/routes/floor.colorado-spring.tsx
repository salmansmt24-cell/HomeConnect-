import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  ChevronRight as Crumb,
  Maximize2,
  Minus,
  Plus,
  Store,
  Truck,
  Phone,
  Mail,
  Layers,
  Ruler,
  Shield,
  Box,
  Package,
  Heart,
} from "lucide-react";
import { toast } from "sonner";
import { Header, SiteFooter } from "@/components/site";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calcFlooring, money, PRODUCT } from "@/lib/flooring";
import { useCart } from "@/components/cart-provider";
import room1 from "@/assets/room-1.jpg";
import room2 from "@/assets/room-2.jpg";
import close from "@/assets/floor-close.jpg";
import texture from "@/assets/texture.jpg";
import plank from "@/assets/plank.jpg";
import { Button } from "@/components/ui/button";
import { getProduct, usableImages, SNAPSHOT_DATE } from "@/lib/catalog";

export const Route = createFileRoute("/floor/colorado-spring")({
  head: () => ({
    meta: [
      { title: "Colorado Spring LVP Flooring – Empire 402 | Home Connect" },
      {
        name: "description",
        content:
          'Colorado Spring luxury vinyl plank from the Empire 402 collection. $1.99/sq ft, 12 mil wear layer, 4 mm, 7" × 48" planks.',
      },
      { property: "og:title", content: "Colorado Spring – Empire 402 | Home Connect" },
      {
        property: "og:description",
        content:
          "Compare governed Colorado Spring product facts and estimate material for your room.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductPage,
});

const colorado = getProduct("colorado-spring", ["LVP"]);
const GALLERY = (colorado ? usableImages(colorado) : []).map((src, i) => ({
  src,
  label: `Product photo ${i + 1}`,
}));

function ProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <nav className="flex items-center gap-1 overflow-x-auto py-3 text-xs text-muted-foreground no-scrollbar whitespace-nowrap">
          {["Home", "Flooring", "Luxury Vinyl Plank", "Empire 402"].map((c) => (
            <span key={c} className="flex items-center gap-1">
              <Link to={c === "Home" ? "/" : "/lvp"} className="hover:text-foreground">
                {c}
              </Link>
              <Crumb className="h-3 w-3" />
            </span>
          ))}
          <span className="font-semibold text-foreground">Colorado Spring</span>
        </nav>
        <ProductArea />
        <div className="mt-6 border-y py-4">
          <Button asChild variant="outline" className="border-gold font-bold">
            <Link to="/contact">Ask us to verify matching trim</Link>
          </Button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Design preview · Store snapshot {SNAPSHOT_DATE}. WooCommerce confirms final pricing,
          availability and fulfillment.
        </p>
        <InfoSection />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ---------------- PRODUCT AREA ---------------- */
function ProductArea() {
  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-10">
      <div className="grid gap-3 lg:col-start-2 lg:row-start-1">
        <Identity />
        <Price />
      </div>
      <div className="lg:col-start-1 lg:row-span-2 lg:row-start-1">
        <Gallery />
      </div>
      <div className="flex min-w-0 flex-col gap-4 lg:col-start-2 lg:row-start-2">
        <Specs />
        <Calculator />
      </div>
    </section>
  );
}

function Identity() {
  return (
    <div>
      <p className="eyebrow text-gold-deep">Empire 402</p>
      <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">Colorado Spring</h1>
    </div>
  );
}

function Gallery() {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const cur = GALLERY[i] ?? GALLERY[0];
  if (!cur)
    return <div className="grid aspect-[4/3] place-items-center bg-surface">Image coming soon</div>;
  const go = (d: number) => setI((p) => (p + d + GALLERY.length) % GALLERY.length);
  return (
    <div className="min-w-0 lg:sticky lg:top-40 lg:self-start">
      <div className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-muted shadow-card">
        <img
          key={i}
          src={cur.src}
          alt={`Colorado Spring – ${cur.label}`}
          width={1280}
          height={960}
          className="h-full w-full cursor-zoom-in object-cover animate-in fade-in duration-300 transition-transform group-hover:scale-[1.02]"
          onClick={() => setOpen(true)}
        />
        <span className="absolute bottom-3 left-3 rounded-md bg-navy/85 px-2.5 py-1 text-xs font-semibold text-navy-foreground">
          {cur.label}
        </span>
        <Button
          variant="ghost"
          onClick={() => setOpen(true)}
          className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-xs font-bold shadow-card backdrop-blur transition hover:bg-card"
        >
          <Maximize2 className="h-3.5 w-3.5" />
          View larger
        </Button>
        {[-1, 1].map((d) => (
          <Button
            variant="ghost"
            key={d}
            aria-label={d < 0 ? "Previous image" : "Next image"}
            onClick={() => go(d)}
            className={`absolute top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-card/90 shadow-card transition hover:bg-card ${d < 0 ? "left-3" : "right-3"}`}
          >
            {d < 0 ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </Button>
        ))}
        <span className="absolute bottom-3 right-3 rounded-full bg-card/90 px-2 py-0.5 text-[11px] font-bold">
          {i + 1} / {GALLERY.length}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-5 gap-2">
        {GALLERY.map((g, idx) => (
          <Button
            variant="ghost"
            key={g.label}
            onClick={() => setI(idx)}
            aria-label={g.label}
            className={`relative h-auto w-full aspect-square overflow-hidden rounded-lg border-2 p-0 transition ${idx === i ? "border-gold shadow-card" : "border-transparent opacity-70 hover:opacity-100"}`}
          >
            <img src={g.src} alt="" loading="lazy" className="h-full w-full object-cover" />
          </Button>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl border-0 bg-navy p-2">
          <DialogTitle className="sr-only">{cur.label}</DialogTitle>
          <img
            src={cur.src}
            alt={cur.label}
            className="max-h-[80vh] w-full rounded-md object-contain"
          />
          <div className="flex items-center justify-between px-2 pb-1 text-sm text-navy-foreground">
            <Button variant="ghost" onClick={() => go(-1)} className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              Prev
            </Button>
            <span>{cur.label}</span>
            <Button variant="ghost" onClick={() => go(1)} className="flex items-center gap-1">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Price() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 border-y py-3">
      <div>
        <p className="flex items-baseline gap-1.5">
          <span className="font-display text-4xl font-black text-navy">
            {money(PRODUCT.pricePerSqft)}
          </span>
          <span className="text-sm font-semibold text-muted-foreground">/ sq ft</span>
        </p>
        <p className="mt-0.5 text-sm">
          <b>{money(PRODUCT.boxPrice)} / box</b>{" "}
          <span className="text-muted-foreground">· {PRODUCT.sqftPerBox} sq ft per box</span>
        </p>
      </div>
      <div className="flex flex-col gap-1 text-xs font-semibold">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Store className="h-4 w-4" />
          Local pickup available where offered
        </span>
        <a
          href="#info"
          className="flex items-center gap-1.5 text-foreground underline-offset-2 hover:underline"
        >
          <Package className="h-4 w-4 text-gold-deep" />
          Ask about a sample
        </a>
      </div>
    </div>
  );
}

function Specs() {
  const specs = [
    { k: "Wear layer", v: "12 Mil", icon: Shield },
    { k: "Thickness", v: "4 mm", icon: Layers },
    { k: "Plank size", v: '7" × 48"', icon: Ruler },
    { k: "Coverage", v: "28.68 sq ft / box", icon: Box },
  ];
  return (
    <dl className="grid grid-cols-2 overflow-hidden rounded-lg border bg-card sm:grid-cols-4">
      {specs.map(({ k, v, icon: Icon }, idx) => (
        <div
          key={k}
          className={`flex min-w-0 items-start gap-2 p-3 ${idx % 2 ? "border-l" : "sm:border-l-0"} ${idx > 1 ? "border-t sm:border-t-0" : ""} ${idx > 0 ? "sm:border-l" : ""}`}
        >
          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
          <div className="min-w-0">
            <dt className="eyebrow text-[10px] text-muted-foreground">{k}</dt>
            <dd className="text-sm font-bold">{v}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}

function Stepper({
  value,
  onChange,
  min = 1,
  size = "md",
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  size?: "md" | "sm";
}) {
  const h = size === "md" ? "h-12" : "h-9";
  return (
    <div
      className={`flex ${h} shrink-0 items-center justify-between overflow-hidden rounded-md border border-input bg-card`}
    >
      <Button
        variant="ghost"
        aria-label="Decrease"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="grid h-full w-10 place-items-center hover:bg-muted"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <input
        aria-label="Quantity"
        value={value}
        inputMode="numeric"
        onChange={(e) => onChange(Math.max(min, parseInt(e.target.value) || min))}
        className="h-full w-11 border-x border-input bg-transparent text-center font-bold outline-none"
      />
      <Button
        variant="ghost"
        aria-label="Increase"
        onClick={() => onChange(value + 1)}
        className="grid h-full w-10 place-items-center hover:bg-muted"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}

const WASTE = [0, 5, 10, 15];

function Calculator() {
  const cart = useCart();
  const [sqft, setSqft] = useState(250);
  const [waste, setWaste] = useState(0);
  const r = calcFlooring(sqft, waste);
  const [qty, setQty] = useState(r.boxes);
  const [synced, setSynced] = useState(true);
  const boxes = synced ? r.boxes : qty;
  const update = (s: number, w: number) => {
    setSqft(s);
    setWaste(w);
    setSynced(true);
  };

  return (
    <div className="min-w-0 overflow-hidden rounded-xl border bg-card shadow-card">
      <div className="flex items-center justify-between gap-2 border-b bg-surface px-4 py-3 text-navy">
        <h2 className="text-base font-black tracking-wide">HOW MUCH DO I NEED?</h2>
        <span className="text-[11px] opacity-75">Live estimate</span>
      </div>
      <div className="grid min-w-0 grid-cols-1 gap-4 p-4">
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
          <label className="block min-w-0">
            <span className="eyebrow text-muted-foreground">Room size</span>
            <div className="mt-1 flex h-12 items-center rounded-md border border-input bg-surface px-3 focus-within:ring-2 focus-within:ring-ring">
              <input
                type="number"
                min={0}
                value={sqft || ""}
                onChange={(e) => update(Math.max(0, +e.target.value), waste)}
                className="min-w-0 flex-1 bg-transparent font-display text-xl font-black outline-none"
              />
              <span className="text-xs font-bold text-muted-foreground">SQ FT</span>
            </div>
          </label>
          <div>
            <span className="eyebrow text-muted-foreground">Cut / waste allowance</span>
            <div className="mt-1 grid h-12 grid-cols-4 gap-1 rounded-md bg-muted p-1">
              {WASTE.map((w) => (
                <Button
                  variant="ghost"
                  key={w}
                  onClick={() => update(sqft, w)}
                  className={`rounded px-2.5 text-xs font-bold transition ${waste === w ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {w === 0 ? "None" : `+${w}%`}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-4">
          <Result label="Boxes required" value={String(r.boxes)} strong />
          <Result label="Total coverage" value={`${r.coverage.toFixed(2)}`} unit="sq ft" />
          <Result label="Extra material" value={`${r.extra.toFixed(2)}`} unit="sq ft" />
          <Result label="Flooring total" value={money(r.total)} strong />
        </div>
        <p className="-mt-2 text-[11px] text-muted-foreground">
          {r.boxes} boxes × {money(PRODUCT.boxPrice)}.{" "}
          {waste === 0
            ? "Add a cut allowance if your installation needs extra material."
            : `Includes ${waste}% cut allowance.`}
        </p>

        <div className="grid grid-cols-1 gap-3 sm:flex">
          <Stepper
            value={boxes}
            onChange={(n) => {
              setQty(n);
              setSynced(false);
            }}
          />
          <Button
            variant="ghost"
            onClick={() => {
              cart.addItem({
                id: "lvp-colorado-spring",
                name: "Colorado Spring",
                price: PRODUCT.boxPrice,
                quantity: boxes,
                unit: "box",
                image: GALLERY[0]?.src,
                coverage: PRODUCT.sqftPerBox,
                productSlug: "colorado-spring",
              });
              toast.success(`${boxes} boxes of Colorado Spring added`, {
                description: money(boxes * PRODUCT.boxPrice),
              });
            }}
            className="btn-gold flex h-14 min-w-0 flex-1 items-center justify-center gap-2 rounded-md px-2 text-base sm:h-12 sm:text-sm"
          >
            <ShoppingCart className="h-5 w-5 shrink-0" />
            <span className="truncate">Add flooring to cart</span>
          </Button>
        </div>
        {!synced && (
          <Button
            variant="ghost"
            onClick={() => setSynced(true)}
            className="-mt-2 text-left text-xs font-semibold text-gold-deep underline"
          >
            Reset to calculated {r.boxes} boxes
          </Button>
        )}

        <div className="grid gap-2 border-t pt-4 sm:grid-cols-2">
          <Fulfil
            icon={<Store className="h-5 w-5" />}
            title="Local pickup"
            text="Pickup options are confirmed at checkout."
          />
          <Fulfil
            icon={<Truck className="h-5 w-5" />}
            title="Delivery / freight"
            text="Delivery is calculated for your destination at checkout when an authoritative rate is available."
          />
        </div>
      </div>
    </div>
  );
}

function Result({
  label,
  value,
  unit,
  strong,
}: {
  label: string;
  value: string;
  unit?: string;
  strong?: boolean;
}) {
  return (
    <div className={`min-w-0 p-3 ${strong ? "bg-gold-soft" : "bg-card"}`}>
      <p className="eyebrow text-[10px] text-muted-foreground">{label}</p>
      <p className="mt-0.5 truncate font-display text-xl font-black">
        {value}
        {unit && (
          <span className="ml-1 font-sans text-[11px] font-bold text-muted-foreground">
            {unit.toUpperCase()}
          </span>
        )}
      </p>
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

/* ---------------- INFO ---------------- */
function InfoSection() {
  const tabs = ["Description", "Specifications", "Installation", "Shipping & Pickup", "Help"];
  return (
    <section id="info" className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      <Tabs defaultValue="Description" className="min-w-0">
        <TabsList className="grid h-auto w-full grid-cols-2 gap-px rounded-none border-b bg-transparent p-0 sm:flex sm:justify-start sm:gap-1">
          {tabs.map((t) => (
            <TabsTrigger
              key={t}
              value={t}
              className="min-w-0 whitespace-normal rounded-none border-b-2 border-transparent px-2 py-2.5 text-center text-[11px] font-bold uppercase tracking-wide text-muted-foreground data-[state=active]:border-gold data-[state=active]:text-foreground data-[state=active]:shadow-none sm:shrink-0 sm:px-3 sm:text-xs"
            >
              {t}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="pt-5">
          <TabsContent value="Description">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-black">A modern look for any space</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Colorado Spring is part of the Empire 402 collection. Each 7" × 48" plank is 4 mm
                  thick with a 12 mil wear layer, and every box covers 28.68 sq ft.
                </p>
                <ul className="mt-4 grid gap-2 text-sm">
                  {[
                    ["Empire 402 collection", Layers],
                    ["12 mil wear layer", Shield],
                    ["4 mm thickness", Layers],
                    ['7" × 48" planks', Ruler],
                  ].map(([t, I]) => {
                    const Icon = I as typeof Layers;
                    return (
                      <li key={t as string} className="flex items-center gap-2">
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-gold-soft text-gold-deep">
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        {t as string}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <img
                src={GALLERY[0]?.src}
                alt="Colorado Spring floor"
                loading="lazy"
                className="aspect-[4/3] w-full rounded-xl object-cover"
              />
            </div>
          </TabsContent>
          <TabsContent value="Specifications">
            <table className="w-full text-sm">
              <tbody>
                {[
                  ["Collection", "Empire 402"],
                  ["Product", "Colorado Spring"],
                  ["Wear layer", "12 Mil"],
                  ["Thickness", "4 mm"],
                  ["Plank size", '7" × 48"'],
                  ["Coverage", "28.68 sq ft / box"],
                  ["Price per sq ft", money(PRODUCT.pricePerSqft)],
                  ["Price per box", money(PRODUCT.boxPrice)],
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
          <TabsContent value="Installation">
            <ol className="grid gap-3 sm:grid-cols-2">
              {[
                "Review the manufacturer's installation guide before you begin.",
                "Measure your rooms and use the calculator above to plan boxes.",
                "Order transitions and trim for doorways, stairs and edges.",
                "Questions? Contact Home Connect before installation.",
              ].map((s, i) => (
                <li key={s} className="flex gap-3 rounded-lg border bg-card p-3 text-sm">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-navy text-xs font-bold text-navy-foreground">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </TabsContent>
          <TabsContent value="Shipping & Pickup">
            <div className="grid gap-3 sm:grid-cols-2">
              <Fulfil
                icon={<Store className="h-5 w-5" />}
                title="Local pickup"
                text="Pickup options are confirmed at checkout."
              />
              <Fulfil
                icon={<Truck className="h-5 w-5" />}
                title="Delivery / freight"
                text="Delivery is calculated for your destination at checkout when an authoritative rate is available."
              />
            </div>
          </TabsContent>
          <TabsContent value="Help">
            <p className="text-sm text-muted-foreground">
              Not sure how much to order or which trim you need? Contact Home Connect at +1 984 200
              9893 or info@homeconnect.shop.
            </p>
          </TabsContent>
        </div>
      </Tabs>
      <HelpCard />
    </section>
  );
}

function HelpCard() {
  return (
    <aside className="h-fit rounded-xl border bg-card p-3.5">
      <h3 className="text-lg font-black">Need help?</h3>
      <div className="mt-3 grid gap-2">
        <a
          href="tel:+19842009893"
          className="flex items-center gap-3 rounded-lg bg-surface p-2.5 hover:bg-gold-soft"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy text-navy-foreground">
            <Phone className="h-4 w-4" />
          </span>
          <span className="text-sm font-bold">+1 984 200 9893</span>
        </a>
        <a
          href="mailto:info@homeconnect.shop"
          className="flex min-w-0 items-center gap-3 rounded-lg bg-surface p-2.5 hover:bg-gold-soft"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy text-navy-foreground">
            <Mail className="h-4 w-4" />
          </span>
          <span className="truncate text-sm font-bold">info@homeconnect.shop</span>
        </a>
      </div>
    </aside>
  );
}
