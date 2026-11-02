import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { StoreShell } from "@/components/catalog";
import { getCabinetCollection } from "@/lib/cabinets";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const collection = getCabinetCollection(params.slug);
    if (!collection) throw notFound();
    return collection;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.name ?? "Cabinet"} Collection | Home Connect` }],
  }),
  component: CabinetCollectionPage,
});

function CabinetCollectionPage() {
  const collection = Route.useLoaderData();
  const firstAvailable = collection.finishes.find((finish) => finish.image);
  const [selected, setSelected] = useState(
    firstAvailable?.name ?? collection.finishes[0]?.name ?? "",
  );
  const selectedFinish = collection.finishes.find((finish) => finish.name === selected);
  const mainImage = selectedFinish?.image ?? collection.scene;
  return (
    <StoreShell>
      <Link
        to="/cabinets"
        className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-gold-deep"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All cabinets
      </Link>
      <section className="mt-3 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <img
          src={mainImage}
          alt={`${collection.name}${selected ? ` — ${selected}` : ""}`}
          className="aspect-[4/3] w-full rounded-xl border bg-surface object-cover shadow-card"
        />
        <div className="flex flex-col justify-center">
          <p className="eyebrow text-gold-deep">Cabinet collection</p>
          <h1 className="mt-1 text-3xl font-black text-navy sm:text-4xl">{collection.name}</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Choose from the governed finishes below. Where an exact finish image is available,
            selecting it updates the collection image. Unmapped finish imagery stays unavailable
            rather than being guessed.
          </p>
          <Link
            to="/cabinets/get-started"
            search={{ collection: collection.name, finish: selected }}
            className="btn-gold mt-5 inline-flex h-12 w-fit items-center gap-2 rounded-md px-5 text-xs font-extrabold uppercase"
          >
            Start your cabinet project
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <section className="mt-7">
        <p className="eyebrow text-gold-deep">Current finishes</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {collection.finishes.map((finish) => (
            <button
              key={finish.name}
              type="button"
              disabled={!finish.image}
              onClick={() => finish.image && setSelected(finish.name)}
              aria-pressed={selected === finish.name}
              className={`overflow-hidden rounded-xl border text-left ${selected === finish.name ? "border-gold ring-2 ring-gold/40" : "bg-card"} disabled:cursor-not-allowed disabled:opacity-70`}
            >
              {finish.image ? (
                <img
                  src={finish.image}
                  alt={`${collection.name} ${finish.name} cabinet finish`}
                  className="aspect-[16/9] w-full object-cover"
                />
              ) : (
                <div className="grid aspect-[16/9] place-items-center bg-surface px-4 text-center text-xs text-muted-foreground">
                  Exact finish image not available
                </div>
              )}
              <span className="flex items-center justify-between p-3 text-sm font-black text-navy">
                {finish.name}
                {selected === finish.name && <CheckCircle2 className="h-4 w-4 text-success" />}
              </span>
            </button>
          ))}
        </div>
      </section>
      <section className="mt-7 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <article className="rounded-xl border bg-card p-5 shadow-card">
          <h2 className="text-lg font-black text-navy">Plan the room first</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Typical lead time is 2–3 weeks and is not guaranteed. Home Connect does not currently
            install cabinets. In-home takeoffs cost extra.
          </p>
          <p className="mt-3 text-sm font-semibold text-navy">
            3D design is $225 paid upfront, nonrefundable and not credited toward a cabinet
            purchase.
          </p>
        </article>
        <article className="rounded-xl border bg-surface p-5">
          <p className="eyebrow text-gold-deep">Secondary option</p>
          <h2 className="text-lg font-black text-navy">$30 door sample</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Shipping included and refunded with a cabinet purchase.
          </p>
          <button
            type="button"
            disabled
            className="mt-4 h-10 w-full rounded-md border-2 border-navy text-xs font-extrabold uppercase text-navy opacity-60"
          >
            Order through WooCommerce
          </button>
        </article>
      </section>
    </StoreShell>
  );
}
