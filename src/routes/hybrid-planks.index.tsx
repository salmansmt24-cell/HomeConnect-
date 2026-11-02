import { createFileRoute } from "@tanstack/react-router";
import { Notice, ProductCard } from "@/components/catalog";
import { CategoryHeader, CategoryPage, CategoryShop } from "@/components/category-shop";
import { byGroup } from "@/lib/catalog";
import { SORT_HIGH, SORT_LOW, SORT_NAME } from "@/lib/category-facets";
import { money } from "@/lib/flooring";
import plank from "@/assets/plank.jpg";

export const Route = createFileRoute("/hybrid-planks/")({
  head: () => ({
    meta: [
      { title: "Hybrid Wood Plank Flooring | Home Connect" },
      {
        name: "description",
        content:
          "Real wood look with a waterproof core. Shop Home Connect hybrid wood plank colors by the box.",
      },
      { property: "og:title", content: "Hybrid Wood Plank | Home Connect" },
      {
        property: "og:description",
        content: "Real wood. Waterproof core. Compare hybrid wood plank colors from Home Connect.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HybridPage,
});

const ALL = byGroup("Hybrid Wood Plank");
const LOW = Math.min(...ALL.map((p) => p.price ?? Infinity));

function HybridPage() {
  return (
    <CategoryPage>
      <CategoryHeader
        crumb="Hybrid Wood Plank"
        eyebrow="Flooring · Hybrid wood plank"
        title="SHOP HYBRID WOOD PLANK"
        image={plank}
        lead="A real-wood surface over a waterproof core — the look of wood with everyday practicality."
        facts={[
          { value: String(ALL.length), label: "Colors" },
          { value: money(LOW), label: "From / box" },
        ]}
      />
      <CategoryShop
        title="ALL HYBRID COLORS"
        items={ALL}
        noun="colors"
        facets={[]}
        sorts={[SORT_NAME, SORT_LOW, SORT_HIGH]}
        notice={
          <Notice>
            Hybrid plank is priced by the box. Box coverage, thickness and wear layer are confirmed
            color by color — call us for a room estimate.
          </Notice>
        }
        renderCard={(p) => (
          <ProductCard
            p={p}
            to={{ route: "flooring" }}
            eyebrow="Hybrid wood plank"
            cta="View floor"
          />
        )}
      />
    </CategoryPage>
  );
}
