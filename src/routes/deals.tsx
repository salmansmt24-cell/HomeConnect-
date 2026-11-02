import { createFileRoute } from "@tanstack/react-router";
import { HelpCompact } from "@/components/site";
import { CategoryShop } from "@/components/category-shop";
import { SORT_LOW, SORT_HIGH, SORT_NAME } from "@/lib/category-facets";
import { ProductCard, StoreShell } from "@/components/catalog";
import { catalogDeals, SNAPSHOT_DATE, type CatalogProduct } from "@/lib/catalog";

export const Route = createFileRoute("/deals")({
  head: () => ({
    meta: [
      { title: "This Week's Flooring & Carpet Deals | Home Connect" },
      {
        name: "description",
        content:
          "Current Home Connect sale prices on flooring and carpet, shown only where our store confirms a sale.",
      },
      { property: "og:title", content: "This Week's Deals | Home Connect" },
      {
        property: "og:description",
        content: "Confirmed sale prices on Home Connect flooring and carpet.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DealsPage,
});

const rank = (p: CatalogProduct) =>
  p.slug === "colorado-spring" ? 0 : p.slug === "hot-pursuit" ? 1 : 2;

function DealsPage() {
  const deals = catalogDeals().sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name));
  return (
    <StoreShell>
      <div className="border-b pb-3">
        <p className="eyebrow text-gold-deep">Confirmed sale prices only</p>
        <h1 className="text-3xl font-black tracking-tight text-navy sm:text-4xl">
          THIS WEEK'S DEALS
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {deals.length} products on sale in flooring and carpet. Sale prices are confirmed by our
          store at checkout.
        </p>
      </div>
      <CategoryShop
        title="SALE PRODUCTS"
        items={deals}
        facets={[
          {
            id: "category",
            title: "Category",
            options: ["LVP", "Carpet"].map((group) => ({
              id: group,
              label: group === "LVP" ? "Luxury vinyl plank" : group,
              test: (p) => p.group === group,
            })),
          },
        ]}
        sorts={[
          { id: "featured", label: "Featured", fn: (a, b) => rank(a) - rank(b) },
          SORT_LOW,
          SORT_HIGH,
          SORT_NAME,
        ]}
        renderCard={(p) => (
          <ProductCard
            p={p}
            to={p.group === "Carpet" ? { route: "carpet" } : { route: "floor" }}
            eyebrow={p.group === "Carpet" ? "Carpet" : (p.collection ?? "Luxury vinyl plank")}
            cta={p.group === "Carpet" ? "View carpet" : "View floor"}
          />
        )}
      />
      <p className="mt-4 text-center text-[11px] text-muted-foreground">
        Sale state from the Home Connect store snapshot of {SNAPSHOT_DATE}. No promotion end dates
        are set.
      </p>
      <div className="mt-8">
        <HelpCompact />
      </div>
    </StoreShell>
  );
}
