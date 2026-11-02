import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BackLink, CarpetPurchase, Notice, ProductPage } from "@/components/catalog";
import { byGroup, getProduct, titleCase, type CatalogProduct } from "@/lib/catalog";

export const Route = createFileRoute("/carpet/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug, ["Carpet"]);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData: p }) => {
    if (!p)
      return {
        meta: [
          { title: "Carpet unavailable | Home Connect" },
          { name: "robots", content: "noindex" },
        ],
      };
    const t = `${titleCase(p.name)} Carpet | Home Connect`;
    const d = `Shop ${titleCase(p.name)} carpet from Home Connect${p.faceWeight ? `, face weight ${p.faceWeight}` : ""}. Estimate square yards for your room.`;
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
        <h1 className="text-3xl font-black">Carpet not found</h1>
        <Link to="/carpet" className="btn-gold mt-4 inline-flex h-11 items-center rounded-md px-5">
          Browse carpet
        </Link>
      </div>
    </div>
  ),
  component: CarpetPdp,
});

function CarpetPdp() {
  const p = Route.useLoaderData() as CatalogProduct;
  const colors = p.options.find((o) => /color/i.test(o.name))?.values ?? [];
  return (
    <ProductPage
      p={p}
      kind="carpet"
      related={{
        title: "MORE CARPET STYLES",
        eyebrow: "Same category",
        route: "carpet",
        items: byGroup("Carpet").filter((x) => x.slug !== p.slug && x.slug !== "driftwood"),
        all: (
          <Link to="/carpet" className="text-sm font-bold text-gold-deep">
            All carpet →
          </Link>
        ),
      }}
      eyebrow="Carpet"
      back={{
        label: "",
        node: <BackLink node={(c) => <Link to="/carpet">{c}</Link>}>All carpet</BackLink>,
      }}
      specs={
        [
          p.faceWeight && { label: "Face weight", value: p.faceWeight },
          { label: "Sold by", value: "Square yard" },
          colors.length > 0 && { label: "Colors", value: String(colors.length) },
        ].filter(Boolean) as { label: string; value: string }[]
      }
      purchase={<CarpetPurchase p={p} />}
      about={
        <>
          <p>
            {titleCase(p.name)} is sold by the square yard. We show the price per square foot too,
            using 9 sq ft = 1 sq yd.
          </p>
          <p>
            Photos show the style; your chosen color may differ from the room scene. Ask for a
            sample before you order.
          </p>
        </>
      }
      extra={
        colors.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-black uppercase tracking-wide text-navy">
              Available colors
            </h3>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {colors.map((c) => (
                <li
                  key={c}
                  className="rounded-full border bg-surface px-3 py-1 text-xs font-semibold"
                >
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <Notice>Carpet pad is sold separately — see Accessories.</Notice>
            </div>
          </div>
        )
      }
    />
  );
}
