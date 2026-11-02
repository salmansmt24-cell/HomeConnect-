import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  CategoryHero,
  ProductImage,
  SectionBar,
  StoreShell,
  UnitPurchase,
} from "@/components/catalog";
import { byGroup, type CatalogProduct } from "@/lib/catalog";
import { money } from "@/lib/flooring";
import kitchen from "@/assets/home-cabinets.jpg";

export const Route = createFileRoute("/cabinets/")({
  head: () => ({
    meta: [
      { title: "Kitchen Cabinets — Brooklyn, Shaker, Oslo, Builder Essential | Home Connect" },
      {
        name: "description",
        content:
          "Four current Home Connect cabinet collections, $30 door samples and a paid 3D design service to plan your kitchen.",
      },
      { property: "og:title", content: "Cabinets | Home Connect" },
      {
        property: "og:description",
        content:
          "Brooklyn, Shaker, Oslo and Builder Essential cabinet collections with door samples and design help.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CabinetsPage,
});

const NAMES: Record<string, string> = {
  "brooklyn-premier-series": "Brooklyn",
  "shaker-premier-series": "Shaker",
  "oslo-premier-series": "Oslo",
  "essential-builder-series": "Builder Essential",
};
const ORDER = [
  "brooklyn-premier-series",
  "shaker-premier-series",
  "oslo-premier-series",
  "essential-builder-series",
];
const ALL = byGroup("Cabinets")
  .filter((p) => NAMES[p.slug])
  .sort((a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug));

function CabinetsPage() {
  return (
    <StoreShell>
      <CategoryHero
        eyebrow="Cabinets"
        title="FOUR COLLECTIONS. ONE KITCHEN THAT WORKS."
        image={kitchen}
        lead="Choose from Brooklyn, Shaker, Oslo and Builder Essential. Order a door sample, then plan your space with our design team."
        stats={[
          { value: "4", label: "Collections" },
          { value: "2–3 wks", label: "Typical lead time" },
        ]}
      >
        <Link
          to="/cabinets/get-started"
          className="btn-gold inline-flex h-11 items-center gap-1.5 rounded-md px-5 text-xs font-extrabold uppercase tracking-[0.08em]"
        >
          Start my cabinet project
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CategoryHero>
      <SectionBar title="THE COLLECTIONS" count={ALL.length} />
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {ALL.map((p) => (
          <CollectionCard key={p.slug} p={p} />
        ))}
      </div>
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          [
            "3D design service · $225",
            "We design your space in 3D. The fee is nonrefundable and isn't credited toward a cabinet purchase. In-home takeoffs cost extra.",
          ],
          [
            "Door samples · $30",
            "Shipping included, and refunded if you purchase cabinets. Samples aren't full cabinet pricing.",
          ],
          [
            "Lead time & install",
            "Lead time is typically 2–3 weeks — not a guaranteed date. Home Connect does not currently install cabinets.",
          ],
        ].map(([t, d]) => (
          <div key={t} className="rounded-xl border bg-card p-4">
            <h3 className="font-black text-navy">{t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
      <Link
        to="/cabinets/get-started"
        className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border-2 border-dashed border-gold/60 bg-gold-soft/50 p-5 hover:border-gold"
      >
        <span>
          <span className="eyebrow block text-gold-deep">Ready to plan?</span>
          <b className="text-lg font-black text-navy">Tell us about your kitchen or bath</b>
        </span>
        <span className="btn-gold inline-flex h-11 items-center rounded-md px-5 text-xs font-extrabold uppercase tracking-[0.08em]">
          Get started
        </span>
      </Link>
    </StoreShell>
  );
}

function CollectionCard({ p }: { p: CatalogProduct }) {
  const finishes = p.options[0]?.values ?? [];
  return (
    <article className="grid overflow-hidden rounded-xl border bg-card shadow-card sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
      <div className="relative aspect-[4/3] bg-surface sm:aspect-auto">
        <ProductImage p={p} className="absolute inset-0 h-full w-full" />
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div>
          <p className="eyebrow text-gold-deep">Cabinet collection</p>
          <h3 className="text-2xl font-black text-navy">{NAMES[p.slug]}</h3>
        </div>
        <ul className="flex flex-wrap gap-1.5">
          {finishes.map((f) => (
            <li
              key={f}
              className="rounded-full border bg-surface px-2.5 py-0.5 text-[11px] font-semibold"
            >
              {f}
            </li>
          ))}
        </ul>
        <Link
          to="/product/$slug"
          params={{ slug: p.slug }}
          className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-[0.08em] text-gold-deep hover:text-navy"
        >
          Explore {NAMES[p.slug]}
          <ArrowRight className="h-4 w-4" />
        </Link>
        {p.price !== null && (
          <p className="text-sm">
            <b className="font-display text-xl text-navy">{money(p.price)}</b>{" "}
            <span className="text-muted-foreground">door sample · shipping included</span>
          </p>
        )}
        <UnitPurchase p={{ ...p, options: p.options.map((o) => ({ ...o, name: "Finish" })) }} />
      </div>
    </article>
  );
}
