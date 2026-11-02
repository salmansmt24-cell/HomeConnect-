import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AskPanel, BackLink, ProductPage } from "@/components/catalog";
import { byGroup, getProduct, titleCase, type CatalogProduct } from "@/lib/catalog";

export const Route = createFileRoute("/accessories/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug, ["Accessories"]);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData: p }) => {
    if (!p)
      return {
        meta: [
          { title: "Accessory unavailable | Home Connect" },
          { name: "robots", content: "noindex" },
        ],
      };
    const t = `${titleCase(p.name)} | Floor Accessories | Home Connect`;
    const d = `${titleCase(p.name)} from Home Connect. Our team confirms the match to your floor before you order.`;
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
        <h1 className="text-3xl font-black">Accessory not found</h1>
        <Link
          to="/accessories"
          className="btn-gold mt-4 inline-flex h-11 items-center rounded-md px-5"
        >
          Browse accessories
        </Link>
      </div>
    </div>
  ),
  component: AccessoryPdp,
});

function AccessoryPdp() {
  const p = Route.useLoaderData() as CatalogProduct;
  const sample = p.slug === "full-tread-sample";
  return (
    <ProductPage
      p={p}
      kind="accessory"
      related={{
        title: "MORE ACCESSORIES",
        eyebrow: "Same category",
        route: "accessories",
        items: byGroup("Accessories").filter((x) => x.slug !== p.slug && x.slug !== "driftwood"),
        all: (
          <Link to="/accessories" className="text-sm font-bold text-gold-deep">
            All accessories →
          </Link>
        ),
      }}
      eyebrow="Accessory"
      back={{
        label: "",
        node: <BackLink node={(c) => <Link to="/accessories">{c}</Link>}>All accessories</BackLink>,
      }}
      specs={p.options.map((o) => ({
        label: o.name,
        value: `${o.values.length} option${o.values.length === 1 ? "" : "s"}`,
      }))}
      purchase={<AskPanel p={p} />}
      about={
        <>
          {sample ? (
            <p>The Full Tread Sample is refundable against your first qualifying stair order.</p>
          ) : (
            <p>{titleCase(p.name)} helps finish your floor cleanly.</p>
          )}
          <p>
            Finish names are listed so you can tell us what you're matching. Photos show the product
            type and may not show your selected finish.
          </p>
        </>
      }
    />
  );
}
