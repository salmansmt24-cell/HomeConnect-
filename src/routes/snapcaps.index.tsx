import { createFileRoute, Link } from "@tanstack/react-router";
import { Notice, ProductCard } from "@/components/catalog";
import { CategoryHeader, CategoryPage, CategoryShop } from "@/components/category-shop";
import { byGroup, getProduct } from "@/lib/catalog";
import { SORT_HIGH, SORT_LOW, SORT_NAME, snapcapsFacets } from "@/lib/category-facets";
import { money } from "@/lib/flooring";
import stairs from "@/assets/home-stairs.jpg";

export const Route = createFileRoute("/snapcaps/")({
  head: () => ({
    meta: [
      { title: "SnapCaps Stair Caps & Full Treads | Home Connect" },
      {
        name: "description",
        content:
          "Stair caps and full treads fabricated in-house by Home Connect from compatible flooring material.",
      },
      { property: "og:title", content: "SnapCaps Stair Products | Home Connect" },
      {
        property: "og:description",
        content: "Stairs that match your floor — fabricated in-house from compatible material.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SnapCapsPage,
});

const ALL = byGroup("SnapCaps");
const FACETS = snapcapsFacets(ALL);
const SAMPLE = getProduct("full-tread-sample");
const STEPS = [
  "Check your floor",
  "Send your material",
  "We fabricate (typically under 7 days)",
  "Finished & shipped",
];

function SnapCapsPage() {
  return (
    <CategoryPage>
      <CategoryHeader
        crumb="SnapCaps"
        eyebrow="SnapCaps · Stairs"
        title="SHOP SNAPCAPS"
        image={stairs}
        lead="Stair caps and full treads fabricated in-house by Home Connect from your compatible flooring material."
      >
        <ol className="flex flex-wrap gap-1.5 text-[11px] font-bold text-navy">
          {STEPS.map((s, i) => (
            <li key={s} className="rounded-md bg-gold-soft px-2 py-1">
              {i + 1}. {s}
            </li>
          ))}
        </ol>
        <Link
          to="/contact"
          className="btn-gold inline-flex h-9 items-center rounded-md px-4 text-[11px] font-extrabold uppercase tracking-[0.08em]"
        >
          Check my floor
        </Link>
      </CategoryHeader>
      <CategoryShop
        title="ALL SNAPCAPS"
        items={ALL}
        facets={FACETS}
        quick={[
          { facet: "kind", option: "cap" },
          { facet: "kind", option: "tread" },
        ]}
        sorts={[SORT_NAME, SORT_LOW, SORT_HIGH]}
        notice={
          <Notice>
            Compatibility is reviewed for every order — there is no universal LVP match list. Stair
            Caps have a minimum order of 2. Plan on one plank per Stair Cap, two per Full Tread,
            plus two extra per order.
          </Notice>
        }
        renderCard={(p) => (
          <ProductCard
            p={p}
            to={{ route: "snapcaps" }}
            eyebrow="SnapCaps"
            cta="View SnapCaps"
            facts={p.options.map((o) => `${o.values.length} ${o.name.toLowerCase()} options`)}
          />
        )}
      >
        {SAMPLE && SAMPLE.price !== null && (
          <Link
            to="/accessories/$slug"
            params={{ slug: SAMPLE.slug }}
            className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border-2 border-dashed border-gold/60 bg-gold-soft/50 p-4 hover:border-gold"
          >
            <span>
              <span className="eyebrow block text-gold-deep">Try it first</span>
              <b className="text-lg font-black text-navy">
                Full Tread Sample · {money(SAMPLE.price)}
              </b>
              <span className="block text-xs text-muted-foreground">
                Refundable against your first qualifying stair order.
              </span>
            </span>
            <span className="btn-gold inline-flex h-10 items-center rounded-md px-5 text-xs font-extrabold uppercase tracking-[0.08em]">
              View sample
            </span>
          </Link>
        )}
      </CategoryShop>
    </CategoryPage>
  );
}
