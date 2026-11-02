import { createFileRoute } from "@tanstack/react-router";
import { Notice, ProductCard } from "@/components/catalog";
import { CategoryHeader, CategoryPage, CategoryShop } from "@/components/category-shop";
import { byGroup } from "@/lib/catalog";
import { ACCESSORY_FACETS, SORT_HIGH, SORT_LOW, SORT_NAME } from "@/lib/category-facets";
import trim from "@/assets/acc-tmolding.jpg";

export const Route = createFileRoute("/accessories/")({
  head: () => ({
    meta: [
      { title: "Floor Accessories, Trim & Stair Parts | Home Connect" },
      {
        name: "description",
        content:
          "Transitions, stair parts, underlayment and carpet pad from Home Connect — matched to your floor by our team.",
      },
      { property: "og:title", content: "Floor Accessories | Home Connect" },
      {
        property: "og:description",
        content: "Trim, stair parts, underlayment and carpet pad to finish your project.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AccessoriesPage,
});

const ALL = byGroup("Accessories");

function AccessoriesPage() {
  return (
    <CategoryPage>
      <CategoryHeader
        crumb="Accessories"
        eyebrow="Accessories"
        title="SHOP ACCESSORIES"
        image={trim}
        lead="Transitions, stair parts, underlayment and carpet pad — the essentials that complete a floor."
        facts={[{ value: String(ALL.length), label: "Accessories" }]}
      />
      <CategoryShop
        title="ALL ACCESSORIES"
        items={ALL}
        noun="accessories"
        facets={ACCESSORY_FACETS}
        quick={[
          { facet: "type", option: "stairs" },
          { facet: "type", option: "trim" },
          { facet: "type", option: "under" },
        ]}
        sorts={[SORT_NAME, SORT_LOW, SORT_HIGH]}
        notice={
          <Notice>
            We match trim to your floor by hand — a similar color name isn't proof of a match.
            Selling units are confirmed with you before ordering. Our store lists two separate Full
            Tread items; ask us which one fits your stairs.
          </Notice>
        }
        renderCard={(p) => (
          <ProductCard
            p={p}
            to={{ route: "accessories" }}
            eyebrow="Accessory"
            cta="View accessory"
            facts={p.options.map(
              (o) =>
                `${o.values.length} ${o.name.toLowerCase()}${o.values.length === 1 ? "" : " options"}`,
            )}
          />
        )}
      />
    </CategoryPage>
  );
}
