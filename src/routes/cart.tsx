import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Minus, Plus, ShoppingCart, Tag, Trash2 } from "lucide-react";
import { PageHead, PageShell, PillGroup } from "@/components/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/components/cart-provider";
import { money } from "@/lib/flooring";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Home Connect" },
      {
        name: "description",
        content:
          "Review your Home Connect cart: product, finish, selling unit, quantity, coverage and order summary.",
      },
      { property: "og:title", content: "Your Cart | Home Connect" },
      { property: "og:description", content: "Review what you are ordering before checkout." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const cart = useCart();
  const [fulfillment, setFulfillment] = useState("Local pickup");
  const [coupon, setCoupon] = useState("");
  const [couponNote, setCouponNote] = useState("");

  return (
    <PageShell crumb="Cart">
      <PageHead
        eyebrow="Review before checkout"
        title="YOUR CART"
        lead="Quantities, selling units and coverage are shown the way our team confirms them."
      />

      {cart.items.length === 0 ? (
        <div className="mt-6 grid place-items-center gap-3 rounded-xl border border-dashed bg-card p-10 text-center shadow-card">
          <ShoppingCart className="h-9 w-9 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Your cart is empty. Add flooring or trim to see it here.
          </p>
          <Link
            to="/lvp"
            className="btn-gold mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-xs font-extrabold uppercase tracking-[0.08em]"
          >
            Browse floors
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
          <section className="grid gap-3">
            {cart.items.map((item) => (
              <article
                key={item.id}
                className="grid grid-cols-[76px_minmax(0,1fr)] gap-3 rounded-xl border bg-card p-3 shadow-card sm:grid-cols-[96px_minmax(0,1fr)] sm:p-4"
              >
                <div className="aspect-square overflow-hidden rounded-lg bg-surface">
                  {item.image && (
                    <img src={item.image} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="eyebrow text-gold-deep">
                        {item.unit === "box"
                          ? "Sold by box"
                          : item.unit === "each"
                            ? "Sold each"
                            : `Sold by ${item.unit}`}
                      </p>
                      <h2 className="truncate text-base font-black text-navy sm:text-lg">
                        {item.name}
                      </h2>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {money(item.price)} / {item.unit}
                        {item.coverage ? ` · covers ${item.coverage} sq ft / box` : ""}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => cart.removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex h-9 items-center overflow-hidden rounded-md border">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-none"
                        onClick={() => cart.setQuantity(item.id, item.quantity - 1)}
                        aria-label={`Decrease ${item.name}`}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </Button>
                      <span className="w-10 text-center text-sm font-black text-navy">
                        {item.quantity}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-none"
                        onClick={() => cart.setQuantity(item.id, item.quantity + 1)}
                        aria-label={`Increase ${item.name}`}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                        Line total
                      </p>
                      <b className="font-display text-xl font-black text-navy">
                        {money(item.price * item.quantity)}
                      </b>
                    </div>
                  </div>

                  {item.coverage && (
                    <p className="mt-2 rounded-md bg-surface px-3 py-1.5 text-[11px] font-semibold text-navy">
                      {item.quantity} box{item.quantity === 1 ? "" : "es"} ≈{" "}
                      {Math.round(item.coverage * item.quantity)} sq ft of material
                    </p>
                  )}

                  <div className="mt-2 flex flex-wrap gap-3 text-[11px] font-bold uppercase">
                    {item.productSlug &&
                      (item.productSlug === "colorado-spring" ? (
                        <Link
                          to="/floor/colorado-spring"
                          className="text-gold-deep hover:underline"
                        >
                          Edit / change finish
                        </Link>
                      ) : (
                        <Link
                          to="/floor/$slug"
                          params={{ slug: item.productSlug }}
                          className="text-gold-deep hover:underline"
                        >
                          Edit / change finish
                        </Link>
                      ))}
                    <button
                      type="button"
                      onClick={() => cart.removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}

            <div className="rounded-xl border bg-card p-4 shadow-card">
              <PillGroup
                name="fulfillment"
                label="Fulfillment"
                options={["Local pickup", "Delivery"]}
                value={fulfillment}
                onChange={setFulfillment}
              />
              <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                {fulfillment === "Local pickup"
                  ? "Pickup options and timing are confirmed by Home Connect before payment."
                  : "Delivery is quoted by Home Connect for your address and order size before payment."}
              </p>
            </div>
          </section>

          <aside className="grid h-fit content-start gap-3 rounded-xl border bg-card p-5 shadow-card lg:sticky lg:top-40">
            <h2 className="text-lg font-black text-navy">Order summary</h2>
            <dl className="grid gap-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Items</dt>
                <dd className="font-bold text-navy">{cart.count}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-bold text-navy">{money(cart.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery / pickup</dt>
                <dd className="text-xs font-semibold text-muted-foreground">
                  Confirmed by Home Connect
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Tax</dt>
                <dd className="text-xs font-semibold text-muted-foreground">
                  Calculated at checkout
                </dd>
              </div>
            </dl>
            <div className="flex items-baseline justify-between border-t pt-3">
              <span className="font-black uppercase text-navy">Estimated total</span>
              <b className="font-display text-2xl font-black text-navy">{money(cart.subtotal)}</b>
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="coupon" className="text-sm font-semibold text-navy">
                Coupon code
              </label>
              <div className="flex gap-2">
                <Input
                  id="coupon"
                  value={coupon}
                  onChange={(e) => {
                    setCoupon(e.target.value);
                    setCouponNote("");
                  }}
                  className="h-10"
                  placeholder="Enter code"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 shrink-0 text-xs font-extrabold uppercase"
                  onClick={() =>
                    setCouponNote("Coupon codes are validated and applied at checkout.")
                  }
                >
                  Apply
                </Button>
              </div>
              {couponNote && (
                <p className="text-[11px] font-semibold text-muted-foreground">{couponNote}</p>
              )}
            </div>

            <Link
              to="/checkout"
              className="btn-gold mt-1 flex h-12 items-center justify-center gap-2 rounded-md text-xs font-extrabold uppercase tracking-[0.08em]"
            >
              Proceed to checkout
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={cart.clear}
              className="text-[11px] font-bold uppercase text-muted-foreground hover:text-destructive"
            >
              Clear cart
            </button>

            <p className="flex gap-2 rounded-lg bg-surface p-3 text-[11px] leading-relaxed text-muted-foreground">
              <Tag className="h-3.5 w-3.5 shrink-0 text-gold-deep" />
              This cart is a Home Connect design prototype. Live cart and checkout pricing are
              handled by the store platform.
            </p>
          </aside>
        </div>
      )}

      <section className="mt-8 rounded-xl border bg-gradient-navy p-5 text-navy-foreground">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="eyebrow text-gold">Complete your project</p>
            <b className="block text-lg font-black">Trim, transitions and stair parts</b>
            <p className="mt-1 max-w-xl text-xs text-navy-foreground/75">
              Need trim or stair parts? Ask our team to verify compatibility before ordering.
            </p>
          </div>
          <Link
            to="/lvp"
            className="btn-gold inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-xs font-extrabold uppercase tracking-[0.08em]"
          >
            Browse floors
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
