import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BackLink, Notice, ProductPage, UnitPurchase } from "@/components/catalog";
import { byGroup, getProduct, titleCase, type CatalogProduct } from "@/lib/catalog";

export const Route = createFileRoute("/flooring/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug, ["LVP", "Hybrid Wood Plank"]);
    if (!p || p.slug === "driftwood") throw notFound();
    return p;
  },
  head: ({ loaderData: p }) => {
    if (!p)
      return {
        meta: [
          { title: "Floor unavailable | Home Connect" },
          { name: "robots", content: "noindex" },
        ],
      };
    const kind = p.group === "Hybrid Wood Plank" ? "Hybrid Wood Plank" : "Luxury Vinyl Plank";
    const t = `${titleCase(p.name)} ${kind} | Home Connect`;
    const d = `Shop ${titleCase(p.name)} ${kind.toLowerCase()} from Home Connect, sold by the box.`;
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center p-6 text-center">
      <div>
        <h1 className="text-3xl font-black">Floor not found</h1>
        <Link to="/lvp" className="btn-gold mt-4 inline-flex h-11 items-center rounded-md px-5">
          Browse flooring
        </Link>
      </div>
    </div>
  ),
  component: PlankPdp,
});

const INSTALL: Record<string, string> = { click_lock: "Click-lock", glue_down: "Glue down" };

function PlankPdp() {
  const p = Route.useLoaderData() as CatalogProduct;
  const hybrid = p.group === "Hybrid Wood Plank";
  const specs = [
    p.wear && { label: "Wear layer", value: p.wear },
    p.thickness && { label: "Thickness", value: p.thickness },
    p.plank && { label: "Plank", value: `${p.plank.replace("x", '" × ')}"` },
    p.install && INSTALL[p.install] && { label: "Install", value: INSTALL[p.install] },
    p.coverage && { label: "Box covers", value: `${p.coverage} sq ft` },
  ].filter(Boolean) as { label: string; value: string }[];
  // Hybrid Woo variations are sample/strap types without verified per-option prices — choose those in-store, not here.
  const buyable = hybrid ? { ...p, options: [] } : p;
  return (
    <ProductPage
      p={p}
      kind="plank"
      related={{
        title: hybrid ? "MORE HYBRID COLORS" : "COMPARE MORE FLOORS",
        eyebrow: "Same category",
        route: "flooring",
        items: byGroup(p.group).filter((x) => x.slug !== p.slug && x.slug !== "driftwood"),
        all: (
          <Link
            to={hybrid ? "/hybrid-planks" : "/lvp"}
            className="text-sm font-bold text-gold-deep"
          >
            View all →
          </Link>
        ),
      }}
      eyebrow={hybrid ? "Hybrid wood plank" : (p.collection ?? "Luxury vinyl plank")}
      back={{
        label: "",
        node: hybrid ? (
          <BackLink node={(c) => <Link to="/hybrid-planks">{c}</Link>}>Hybrid wood plank</BackLink>
        ) : (
          <BackLink node={(c) => <Link to="/lvp">{c}</Link>}>Luxury vinyl plank</BackLink>
        ),
      }}
      specs={specs}
      purchase={
        <UnitPurchase
          p={buyable}
          note={
            !p.coverage ? (
              <Notice>
                Box coverage for this color is being confirmed, so we can't calculate boxes per room
                yet. Call us and we'll estimate it with you.
              </Notice>
            ) : undefined
          }
        />
      }
      about={
        hybrid ? (
          <>
            <p>
              Real wood. Waterproof core. {titleCase(p.name)} pairs a real-wood surface with a
              waterproof core.
            </p>
            <p>
              Thickness, wear layer and plank size for this color are confirmed by our team on
              request. Sample and strap-set options are available through our store.
            </p>
          </>
        ) : (
          <>
            <p>
              {titleCase(p.name)}
              {p.collection ? ` from the ${titleCase(p.collection)} collection` : ""}.
            </p>
            {specs.length === 0 && (
              <p>Specifications for this color are confirmed by our team on request.</p>
            )}
          </>
        )
      }
      extra={
        <div className="mt-4">
          <Notice>
            Matching trim and stair pieces are checked by hand for each floor. Ask us before
            ordering accessories.
          </Notice>
        </div>
      }
    />
  );
}
