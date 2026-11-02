import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CheckCircle2, CreditCard, Lock, MapPin, Truck, Undo2 } from "lucide-react";
import { Field, PageHead, PageShell, PillGroup, controlCls } from "@/components/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/components/cart-provider";
import { money } from "@/lib/flooring";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Home Connect" },
      {
        name: "description",
        content:
          "Home Connect checkout layout: contact details, delivery or pickup, address, order summary and secure payment area.",
      },
      { property: "og:title", content: "Checkout | Home Connect" },
      {
        property: "og:description",
        content: "A clean Home Connect checkout — reviewed before payment.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  address: "",
  unit: "",
  city: "",
  state: "",
  zip: "",
};

function CheckoutPage() {
  const cart = useCart();
  const [fulfillment, setFulfillment] = useState("Delivery");
  const [form, setForm] = useState(EMPTY);
  const [placed, setPlaced] = useState(false);

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  if (placed) {
    return (
      <PageShell crumb="Checkout">
        <div className="mx-auto mt-6 max-w-xl rounded-xl border bg-card p-6 text-center shadow-card sm:p-8">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-success-soft text-success">
            <CheckCircle2 className="h-6 w-6" />
          </span>
          <p className="eyebrow mt-3 text-gold-deep">Confirmation state</p>
          <h1 className="text-2xl font-black tracking-tight text-navy sm:text-3xl">
            THANK YOU — WE’LL BE IN TOUCH
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This is a design prototype of the confirmation screen. No order was created, no payment
            was taken, and no money moved.
          </p>
          <div className="mt-4 grid gap-1.5 rounded-lg bg-surface p-4 text-left text-xs text-muted-foreground">
            <p>
              <b className="text-navy">What the real confirmation will show:</b>
            </p>
            <p>· Order number and full itemised totals</p>
            <p>· Delivery window or pickup readiness, confirmed by Home Connect</p>
            <p>· Tax and shipping as charged by the store platform</p>
            <p>· Payment receipt from the secure payment processor</p>
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Link
              to="/cart"
              className="btn-gold inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-xs font-extrabold uppercase tracking-[0.08em]"
            >
              Back to cart
            </Link>
            <button
              type="button"
              onClick={() => setPlaced(false)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md border-2 border-navy px-4 text-xs font-extrabold uppercase text-navy hover:bg-gold-soft"
            >
              <Undo2 className="h-4 w-4" />
              Edit details
            </button>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell crumb="Checkout">
      <PageHead
        eyebrow="Secure checkout"
        title="CHECKOUT"
        lead="Confirm who you are and where the order goes. Delivery, tax and payment are finalised by the store platform — nothing here is charged."
      />

      {cart.items.length === 0 ? (
        <div className="mt-6 grid place-items-center gap-3 rounded-xl border border-dashed bg-card p-10 text-center shadow-card">
          <p className="text-sm text-muted-foreground">There is nothing to check out yet.</p>
          <Link
            to="/lvp"
            className="btn-gold inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-xs font-extrabold uppercase tracking-[0.08em]"
          >
            Browse floors
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPlaced(true);
          }}
          className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]"
        >
          <div className="grid gap-4">
            <section className="rounded-xl border bg-card p-5 shadow-card">
              <h2 className="flex items-center gap-2 text-sm font-black uppercase text-navy">
                <Lock className="h-4 w-4 text-gold-deep" />
                Contact information
              </h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Field id="co-name" label="Full name">
                  <Input
                    id="co-name"
                    required
                    value={form.name}
                    onChange={set("name")}
                    className={controlCls}
                    autoComplete="name"
                  />
                </Field>
                <Field id="co-phone" label="Phone">
                  <Input
                    id="co-phone"
                    required
                    type="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    className={controlCls}
                    autoComplete="tel"
                  />
                </Field>
              </div>
              <div className="mt-3">
                <Field id="co-email" label="Email">
                  <Input
                    id="co-email"
                    required
                    type="email"
                    inputMode="email"
                    value={form.email}
                    onChange={set("email")}
                    className={controlCls}
                    autoComplete="email"
                  />
                </Field>
              </div>
            </section>

            <section className="rounded-xl border bg-card p-5 shadow-card">
              <h2 className="flex items-center gap-2 text-sm font-black uppercase text-navy">
                <Truck className="h-4 w-4 text-gold-deep" />
                Delivery or pickup
              </h2>
              <div className="mt-3">
                <PillGroup
                  name="co-fulfillment"
                  label="How do you want it?"
                  options={["Delivery", "Local pickup"]}
                  value={fulfillment}
                  onChange={setFulfillment}
                />
              </div>
              <p className="mt-2 flex gap-2 rounded-lg bg-surface p-3 text-[11px] leading-relaxed text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-deep" />
                {fulfillment === "Delivery"
                  ? "Delivery is quoted for your address and order size by Home Connect. No shipping rate is estimated on this screen."
                  : "Local pickup at 8816 Running Oak Dr, Unit D, Raleigh, NC 27617. Pickup timing is confirmed by Home Connect."}
              </p>
            </section>

            <section className="rounded-xl border bg-card p-5 shadow-card">
              <h2 className="text-sm font-black uppercase text-navy">
                {fulfillment === "Delivery" ? "Shipping & billing address" : "Billing address"}
              </h2>
              <div className="mt-3 grid gap-3">
                <Field id="co-addr" label="Street address">
                  <Input
                    id="co-addr"
                    required
                    value={form.address}
                    onChange={set("address")}
                    className={controlCls}
                    autoComplete="address-line1"
                  />
                </Field>
                <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                  <Field id="co-unit" label="Unit / suite" hint="Optional">
                    <Input
                      id="co-unit"
                      value={form.unit}
                      onChange={set("unit")}
                      className={controlCls}
                      autoComplete="address-line2"
                    />
                  </Field>
                  <Field id="co-city" label="City">
                    <Input
                      id="co-city"
                      required
                      value={form.city}
                      onChange={set("city")}
                      className={controlCls}
                      autoComplete="address-level2"
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field id="co-state" label="State">
                    <Input
                      id="co-state"
                      required
                      value={form.state}
                      onChange={set("state")}
                      className={controlCls}
                      autoComplete="address-level1"
                      placeholder="NC"
                    />
                  </Field>
                  <Field id="co-zip" label="ZIP">
                    <Input
                      id="co-zip"
                      required
                      inputMode="numeric"
                      value={form.zip}
                      onChange={set("zip")}
                      className={controlCls}
                      autoComplete="postal-code"
                    />
                  </Field>
                </div>
              </div>
            </section>

            <section className="rounded-xl border bg-card p-5 shadow-card">
              <h2 className="flex items-center gap-2 text-sm font-black uppercase text-navy">
                <CreditCard className="h-4 w-4 text-gold-deep" />
                Payment area
              </h2>
              <div className="mt-3 grid gap-2 rounded-lg border border-dashed bg-surface p-4 text-xs text-muted-foreground">
                <p className="font-bold text-navy">
                  Payment is collected on the secure payment page.
                </p>
                <p>
                  Card, wallet and other accepted methods are provided by the payment processor. No
                  card fields, payment methods or charges are implemented on this design screen.
                </p>
              </div>
            </section>
          </div>

          <aside className="grid h-fit content-start gap-3 rounded-xl border bg-card p-5 shadow-card lg:sticky lg:top-40">
            <h2 className="text-lg font-black text-navy">Order summary</h2>
            <ul className="grid gap-2.5">
              {cart.items.map((item) => (
                <li
                  key={item.id}
                  className="grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-2.5"
                >
                  <span className="aspect-square overflow-hidden rounded-md bg-surface">
                    {item.image && (
                      <img src={item.image} alt="" className="h-full w-full object-cover" />
                    )}
                  </span>
                  <span className="min-w-0">
                    <b className="block truncate text-xs font-black text-navy">{item.name}</b>
                    <span className="text-[11px] text-muted-foreground">
                      {item.quantity} × {money(item.price)} / {item.unit}
                    </span>
                  </span>
                  <b className="text-xs font-black text-navy">
                    {money(item.price * item.quantity)}
                  </b>
                </li>
              ))}
            </ul>
            <dl className="grid gap-1.5 border-t pt-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-bold text-navy">{money(cart.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="text-xs font-semibold text-muted-foreground">
                  Quoted by Home Connect
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Tax</dt>
                <dd className="text-xs font-semibold text-muted-foreground">
                  Calculated by the store platform
                </dd>
              </div>
            </dl>
            <div className="flex items-baseline justify-between border-t pt-3">
              <span className="font-black uppercase text-navy">Total due</span>
              <b className="font-display text-2xl font-black text-navy">{money(cart.subtotal)}</b>
            </div>
            <Button
              type="submit"
              className="btn-gold mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-md text-xs font-extrabold uppercase tracking-[0.08em]"
            >
              Place order
              <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="flex gap-2 rounded-lg bg-surface p-3 text-[11px] leading-relaxed text-muted-foreground">
              <Lock className="h-3.5 w-3.5 shrink-0 text-gold-deep" />
              Design prototype: placing this order does not create an order, charge a card, or
              reserve stock.
            </p>
            <Link
              to="/cart"
              className="text-center text-[11px] font-bold uppercase text-muted-foreground hover:text-gold-deep"
            >
              Back to cart
            </Link>
          </aside>
        </form>
      )}
    </PageShell>
  );
}
