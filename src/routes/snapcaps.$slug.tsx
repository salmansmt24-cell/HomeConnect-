import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BackLink, Notice, ProductPage, UnitPurchase } from "@/components/catalog";
import { byGroup, getProduct, minQty, titleCase, type CatalogProduct } from "@/lib/catalog";

export const Route = createFileRoute("/snapcaps/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug, ["SnapCaps"]);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData: p }) => {
    if (!p)
      return {
        meta: [
          { title: "SnapCaps product unavailable | Home Connect" },
          { name: "robots", content: "noindex" },
        ],
      };
    const t = `${titleCase(p.name)} | SnapCaps | Home Connect`;
    const d = `${titleCase(p.name)} fabricated in-house by Home Connect from compatible flooring material.`;
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
        <h1 className="text-3xl font-black">Product not found</h1>
        <Link
          to="/snapcaps"
          className="btn-gold mt-4 inline-flex h-11 items-center rounded-md px-5"
        >
          Browse SnapCaps
        </Link>
      </div>
    </div>
  ),
  component: SnapPdp,
});

function SnapPdp() {
  const p = Route.useLoaderData() as CatalogProduct;
  const tread = /full tread/i.test(p.name);
  return (
    <ProductPage
      p={p}
      kind="snapcaps"
      related={{
        title: "MORE SNAPCAPS",
        eyebrow: "Same category",
        route: "snapcaps",
        items: byGroup("SnapCaps").filter((x) => x.slug !== p.slug && x.slug !== "driftwood"),
        all: (
          <Link to="/snapcaps" className="text-sm font-bold text-gold-deep">
            All SnapCaps →
          </Link>
        ),
      }}
      eyebrow="SnapCaps"
      back={{
        label: "",
        node: <BackLink node={(c) => <Link to="/snapcaps">{c}</Link>}>All SnapCaps</BackLink>,
      }}
      specs={[
        ...p.options.map((o) => ({ label: o.name, value: o.values.join(" · ") })),
        { label: "Compatibility", value: "Needs review" },
        ...(minQty(p) > 1 ? [{ label: "Minimum", value: `${minQty(p)} pieces` }] : []),
      ]}
      purchase={
        <UnitPurchase
          p={p}
          note={
            <Notice>
              We confirm your floor is compatible before fabrication. Plan on{" "}
              {tread ? "two planks per Full Tread" : "one plank per Stair Cap"}, plus two extra
              planks per order.
            </Notice>
          }
        />
      }
      about={
        <>
          <p>
            {titleCase(p.name)} is fabricated in-house by Home Connect from compatible flooring
            material you ship or drop off.
          </p>
          <p>
            Typical fabrication is under seven days after compatible material is received. That's a
            fabrication time, not a delivery date.
          </p>
        </>
      }
    />
  );
}
