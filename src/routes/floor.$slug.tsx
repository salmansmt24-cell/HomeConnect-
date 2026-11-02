import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Box,
  Layers,
  Minus,
  Plus,
  Ruler,
  Shield,
  ShoppingCart,
  Store,
  Truck,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";
import { BackLink, Notice, ProductPage, StoreShell } from "@/components/catalog";
import { byGroup, getProduct } from "@/lib/catalog";
import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { calcFlooringForProduct, money } from "@/lib/flooring";
import { fullImg, getLvpBySlug, LVP, type Lvp } from "@/lib/lvp";

export const Route = createFileRoute("/floor/$slug")({
  loader: ({ params }) => {
    const product = getLvpBySlug(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => {
    const product = loaderData;
    const title = product
      ? `${product.name} LVP Flooring | Home Connect`
      : "LVP Floor Not Found | Home Connect";
    const description = product
      ? `Shop ${product.name} luxury vinyl plank at ${money(product.price)} per sq ft. Each box covers ${product.coverage} sq ft.`
      : "The requested luxury vinyl plank floor could not be found.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-background p-6 text-center">
      <div>
        <h1 className="text-3xl font-black">Floor not found</h1>
        <Link to="/lvp" className="btn-gold mt-4 inline-flex h-11 items-center rounded-md px-5">
          Browse LVP floors
        </Link>
      </div>
    </div>
  ),
  component: ProductRoute,
});

function ProductRoute() {
  const product = Route.useLoaderData();
  const p = getProduct(product.slug, ["LVP"]);
  if (!p || product.slug === "driftwood")
    return (
      <StoreShell>
        <h1 className="text-[28px] font-black text-navy">Design placeholder</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Product identity and image require verification before this floor can be ordered.
        </p>
        <Link to="/contact" className="mt-4 inline-flex text-sm font-bold text-gold-deep">
          Ask Home Connect
        </Link>
      </StoreShell>
    );
  const specs = [
    ...(product.install ? [{ label: "Install", value: product.install }] : []),
    ...(product.wear ? [{ label: "Wear layer", value: `${product.wear} mil` }] : []),
    ...(product.thickness ? [{ label: "Thickness", value: `${product.thickness} mm` }] : []),
    ...(product.plank ? [{ label: "Plank size", value: product.plank }] : []),
    { label: "Box coverage", value: `${product.coverage} sq ft` },
  ];
  return (
    <ProductPage
      p={{
        ...p,
        price: product.boxPrice,
        coverage: product.coverage,
        perSqFt: product.price,
        regularPerSqFt: product.salePrice ?? null,
      }}
      kind="plank"
      eyebrow={product.collection ?? "Luxury vinyl plank"}
      back={{
        label: "",
        node: <BackLink node={(c) => <Link to="/lvp">{c}</Link>}>Luxury vinyl plank</BackLink>,
      }}
      specs={specs}
      purchase={<LvpPurchase product={product} />}
      about={
        <p>
          {product.name} luxury vinyl plank. Compare the governed specifications above and confirm
          availability with our team before ordering.
        </p>
      }
      extra={
        <Notice>
          Matching trim is verified by our team; color names do not establish compatibility.
        </Notice>
      }
      related={{
        title: "COMPARE MORE FLOORS",
        eyebrow: "Luxury vinyl plank",
        route: "floor",
        items: byGroup("LVP").filter((p) => p.slug !== product.slug && p.slug !== "driftwood"),
        all: (
          <Link to="/lvp" className="text-sm font-bold text-gold-deep">
            All LVP →
          </Link>
        ),
      }}
    />
  );
}

function LvpPurchase({ product }: { product: Lvp }) {
  const cart = useCart();
  const [roomSqft, setRoomSqft] = useState(250);
  const [waste, setWaste] = useState(0);
  const [manual, setManual] = useState<number>();
  const estimate = calcFlooringForProduct(roomSqft, waste, product.coverage, product.boxPrice);
  const quantity = manual ?? estimate.boxes;
  return (
    <div className="grid gap-3">
      <label className="grid gap-1 text-xs font-bold text-muted-foreground">
        Room size (sq ft)
        <input
          type="number"
          min={0}
          value={roomSqft}
          onChange={(e) => {
            setRoomSqft(Math.max(0, Number(e.target.value)));
            setManual(undefined);
          }}
          className="h-11 rounded-md border bg-card px-3 text-sm text-foreground"
        />
      </label>
      <fieldset>
        <legend className="mb-1 text-xs font-bold text-muted-foreground">
          Cut / waste allowance
        </legend>
        <div className="grid grid-cols-4 gap-1 rounded-md bg-surface p-1">
          {[0, 5, 10, 15].map((n) => (
            <Button
              key={n}
              variant="ghost"
              aria-pressed={waste === n}
              onClick={() => {
                setWaste(n);
                setManual(undefined);
              }}
              className={waste === n ? "bg-card shadow-card" : "text-muted-foreground"}
            >
              {n === 0 ? "None" : `+${n}%`}
            </Button>
          ))}
        </div>
      </fieldset>
      <dl className="grid grid-cols-2 gap-2 rounded-lg bg-surface p-3 text-sm">
        <div>
          <dt>Boxes required</dt>
          <dd className="font-bold">{estimate.boxes}</dd>
        </div>
        <div>
          <dt>Coverage</dt>
          <dd className="font-bold">{estimate.coverage} sq ft</dd>
        </div>
      </dl>
      <div className="flex items-center justify-between gap-3">
        <div className="flex h-11 items-center rounded-md border">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Decrease boxes"
            onClick={() => setManual(Math.max(1, quantity - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-10 text-center font-bold">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Increase boxes"
            onClick={() => setManual(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <b className="text-xl text-navy">{money(quantity * product.boxPrice)}</b>
      </div>
      <Button
        disabled={quantity < 1}
        className="btn-gold h-12"
        onClick={() => {
          cart.addItem({
            id: `lvp-${product.slug}`,
            name: product.name,
            price: product.boxPrice,
            quantity,
            unit: "box",
            image: product.img ? fullImg(product.img) : undefined,
            coverage: product.coverage,
            productSlug: product.slug,
          });
          toast.success(`${quantity} boxes added to your preview cart`);
        }}
      >
        <ShoppingCart className="h-4 w-4" />
        Add {quantity} {quantity === 1 ? "box" : "boxes"} to cart
      </Button>
    </div>
  );
}
