import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { PageShell, PageHead } from "@/components/page";
import { CategoryShop, type Facet } from "@/components/category-shop";
import { SORT_LOW, SORT_HIGH, SORT_NAME } from "@/lib/category-facets";
import { ProductCard } from "@/components/catalog";
import { CATALOG, type CatalogProduct } from "@/lib/catalog";

export const Route = createFileRoute("/search")({
  validateSearch: z.object({ q: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Search Home Connect — Flooring, Carpet, SnapCaps" },
      {
        name: "description",
        content: "Search Home Connect flooring, carpet, SnapCaps and accessories.",
      },
      { property: "og:title", content: "Search | Home Connect" },
      {
        property: "og:description",
        content: "Find flooring, carpet, SnapCaps and accessories at Home Connect.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SearchPage,
});

const ROUTE: Record<string, "flooring" | "carpet" | "accessories" | "snapcaps" | "cabinets"> = {
  LVP: "flooring",
  "Hybrid Wood Plank": "flooring",
  Carpet: "carpet",
  Cabinets: "cabinets",
  Accessories: "accessories",
  SnapCaps: "snapcaps",
};

const CATEGORY_TERMS: Record<string, string[]> = {
  flooring: ["LVP", "Hybrid Wood Plank"],
  floor: ["LVP", "Hybrid Wood Plank"],
  vinyl: ["LVP"],
  lvp: ["LVP"],
  hybrid: ["Hybrid Wood Plank"],
  carpet: ["Carpet"],
  cabinet: ["Cabinets"],
  cabinets: ["Cabinets"],
  snapcaps: ["SnapCaps"],
  stairs: ["SnapCaps"],
  accessories: ["Accessories"],
};

function searchFacets(items: CatalogProduct[]): Facet[] {
  const groups = [...new Set(items.map((p) => p.group))];
  const collections = [
    ...new Set(items.map((p) => p.collection).filter((v): v is string => !!v)),
  ].sort();
  const installs = [...new Set(items.map((p) => p.install).filter((v): v is string => !!v))].sort();
  const installLabel: Record<string, string> = { click_lock: "Click-lock", glue_down: "Glue-down" };
  return [
    {
      id: "category",
      title: "Category",
      options: groups.map((group) => ({ id: group, label: group, test: (p) => p.group === group })),
    },
    {
      id: "collection",
      title: "Collection",
      options: collections.map((collection) => ({
        id: collection,
        label: collection,
        test: (p) => p.collection === collection,
      })),
    },
    {
      id: "installation",
      title: "Installation",
      options: installs.map((install) => ({
        id: install,
        label: installLabel[install] ?? install,
        test: (p) => p.install === install,
      })),
    },
  ];
}

function SearchPage() {
  const { q = "" } = Route.useSearch();
  const term = q.trim().toLowerCase();
  const categoryGroups = CATEGORY_TERMS[term];
  const hits = term
    ? CATALOG.filter(
        (p: CatalogProduct) =>
          ROUTE[p.group] &&
          (categoryGroups?.includes(p.group) ||
            `${p.name} ${p.collection ?? ""} ${p.group}`.toLowerCase().includes(term)),
      )
    : [];
  return (
    <PageShell crumb="Search">
      <PageHead
        eyebrow="Search"
        title={term ? `RESULTS FOR “${q.toUpperCase()}”` : "SEARCH THE STORE"}
        lead={
          term
            ? `${hits.length} product${hits.length === 1 ? "" : "s"} found in the staging catalog. WooCommerce remains the live product authority.`
            : "Type a floor, color or product in the search bar above."
        }
      />
      {term && hits.length === 0 && (
        <p className="mt-6 text-sm">
          Nothing matched. Try{" "}
          <Link to="/lvp" className="font-bold text-gold-deep underline">
            LVP
          </Link>{" "}
          or{" "}
          <Link to="/contact" className="font-bold text-gold-deep underline">
            ask us
          </Link>
          .
        </p>
      )}
      {hits.length > 0 && (
        <CategoryShop
          key={term}
          title="MATCHING PRODUCTS"
          items={hits}
          facets={searchFacets(hits)}
          sorts={[SORT_NAME, SORT_LOW, SORT_HIGH]}
          renderCard={(p) => (
            <ProductCard
              p={p}
              to={
                p.group === "Cabinets"
                  ? { href: `/product/${p.slug}` }
                  : {
                      route:
                        p.group === "LVP"
                          ? "floor"
                          : p.group === "Carpet"
                            ? "carpet"
                            : p.group === "Accessories"
                              ? "accessories"
                              : p.group === "SnapCaps"
                                ? "snapcaps"
                                : "flooring",
                    }
              }
              eyebrow={p.group}
              cta={
                p.group === "LVP" || p.group === "Hybrid Wood Plank" ? "View floor" : "View product"
              }
            />
          )}
        />
      )}
    </PageShell>
  );
}
