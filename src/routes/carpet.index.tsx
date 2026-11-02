import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/catalog";
import { CategoryHeader, CategoryPage, CategoryShop } from "@/components/category-shop";
import { byGroup } from "@/lib/catalog";
import { CARPET_FACETS, SORT_HIGH, SORT_LOW, SORT_NAME } from "@/lib/category-facets";
import carpet from "@/assets/home-carpet.jpg";

export const Route = createFileRoute("/carpet/")({
  head: () => ({
    meta: [
      { title: "Carpet by the Square Yard | Home Connect" },
      {
        name: "description",
        content:
          "Compare Home Connect carpet styles by price per square foot and face weight, with colors for every room.",
      },
      { property: "og:title", content: "Shop Carpet | Home Connect" },
      {
        property: "og:description",
        content: "Carpet styles priced clearly per sq ft and sq yd, with face weight shown.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CarpetPage,
});

const ALL = byGroup("Carpet");
const oz = (s: string | null) => (s ? parseFloat(s) : 0);

function CarpetPage() {
  return (
    <CategoryPage>
      <CategoryHeader
        crumb="Carpet"
        eyebrow="Carpet"
        title="SHOP CARPET"
        image={carpet}
        lead="Sold by the square yard, shown per square foot so styles are easy to compare. Pick a style, then your color."
        facts={[
          { value: String(ALL.length), label: "Styles" },
          { value: "9 sq ft", label: "= 1 sq yd" },
        ]}
      />
      <CategoryShop
        title="ALL CARPET STYLES"
        items={ALL}
        noun="styles"
        facets={CARPET_FACETS}
        quick={[
          { facet: "sale", option: "sale" },
          { facet: "weight", option: "light" },
          { facet: "weight", option: "mid" },
          { facet: "weight", option: "heavy" },
        ]}
        sorts={[
          SORT_LOW,
          SORT_HIGH,
          {
            id: "weight",
            label: "Heaviest face weight",
            fn: (a, b) => oz(b.faceWeight) - oz(a.faceWeight),
          },
          SORT_NAME,
        ]}
        renderCard={(p) => {
          const colors = p.options.find((o) => /color/i.test(o.name))?.values.length;
          return (
            <ProductCard
              p={p}
              to={{ route: "carpet" }}
              eyebrow="Carpet"
              cta="View carpet"
              facts={
                [
                  p.faceWeight && `Face weight ${p.faceWeight}`,
                  colors && `${colors} colors`,
                ].filter(Boolean) as string[]
              }
            />
          );
        }}
      />
    </CategoryPage>
  );
}
