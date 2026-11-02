import { useState } from "react";
import logoDark from "@/assets/homeconnect-logo-dark-background.png";
import logoLight from "@/assets/homeconnect-logo-light-background.png";
import { Link } from "@tanstack/react-router";
import {
  Search,
  User,
  ShoppingCart,
  ChevronDown,
  Menu,
  Phone,
  Mail,
  Tag,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { money } from "@/lib/flooring";

export const NAV = [
  "Flooring",
  "Carpet",
  "Cabinets",
  "SnapCaps",
  "Accessories",
  "Deals",
  "About",
  "Contact",
];

const NAV_HREFS: Record<string, string> = {
  Flooring: "/lvp",
  "Hybrid Planks": "/hybrid-planks",
  Carpet: "/carpet",
  Cabinets: "/cabinets",
  SnapCaps: "/snapcaps",
  Accessories: "/accessories",
  Deals: "/deals",
  About: "/about",
  Contact: "/contact",
  "Contractor Pricing": "/contractor-pricing",
};
const navHref = (n: string) => NAV_HREFS[n] ?? "#";

/* ---------------- HEADER ---------------- */
export function Header() {
  const cart = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-card shadow-card">
      <div className="border-b border-navy-foreground/10 bg-navy text-navy-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-[11px] font-semibold sm:px-6">
          <span className="flex items-center gap-1.5 truncate">
            <Tag className="h-3.5 w-3.5 shrink-0 text-gold" />
            Quality floors. Better prices.
          </span>
          <a href="mailto:info@homeconnect.shop" className="hidden items-center gap-1.5 md:flex">
            <Mail className="h-3.5 w-3.5 text-gold" />
            info@homeconnect.shop
          </a>
          <a href="tel:+19842009893" className="flex shrink-0 items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 text-gold" />
            +1 984 200 9893
          </a>
        </div>
      </div>
      <div className="bg-navy text-navy-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:gap-6 sm:px-6">
          <Logo />
          <form
            action="/search"
            method="get"
            role="search"
            className="order-last col-span-2 flex h-10 min-w-0 items-center rounded-md sm:order-none sm:col-span-1 border border-input bg-card pl-4 pr-1 text-foreground focus-within:ring-2 focus-within:ring-ring"
          >
            <input
              name="q"
              aria-label="Search"
              placeholder="Search flooring, carpet, cabinets, SnapCaps…"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <Button
              type="submit"
              aria-label="Search"
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-gold text-gold-foreground"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
          <div className="flex shrink-0 items-center gap-4 text-sm font-semibold">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation"
                  className="sm:hidden"
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto bg-card p-5">
                <SheetHeader className="border-b pb-4">
                  <SheetTitle className="sr-only">Shop Home Connect</SheetTitle>
                  <SheetDescription className="sr-only">
                    Shopping and store navigation
                  </SheetDescription>
                  <Logo light />
                </SheetHeader>
                <nav aria-label="Mobile navigation" className="mt-4 grid divide-y">
                  {[...NAV.slice(0, 1), "Hybrid Planks", ...NAV.slice(1), "Contractor Pricing"].map(
                    (n) => (
                      <a
                        key={n}
                        href={navHref(n)}
                        onClick={() => setMenuOpen(false)}
                        className={`flex min-h-11 items-center justify-between py-2 text-sm font-bold ${n === "Deals" ? "text-destructive" : "text-navy"}`}
                      >
                        {n}
                        <ArrowRight className="h-4 w-4 text-gold-deep" />
                      </a>
                    ),
                  )}
                </nav>
              </SheetContent>
            </Sheet>
            <Link to="/account" className="flex items-center gap-1.5" aria-label="Sign in">
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
            <Sheet>
              <SheetTrigger
                className="relative flex items-center gap-1.5"
                aria-label={`Open cart with ${cart.count} items`}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="hidden sm:inline">Cart</span>
                <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-gold-foreground">
                  {cart.count}
                </span>
              </SheetTrigger>
              <SheetContent className="flex w-[92vw] max-w-md flex-col bg-background p-0">
                <SheetHeader className="border-b p-5 text-left">
                  <SheetTitle className="font-display text-2xl font-black text-navy">
                    Your cart
                  </SheetTitle>
                  <SheetDescription>
                    {cart.count
                      ? `${cart.count} item${cart.count === 1 ? "" : "s"} ready for checkout`
                      : "Your cart is empty."}
                  </SheetDescription>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto p-4">
                  {cart.items.length === 0 ? (
                    <div className="grid place-items-center gap-3 py-16 text-center text-muted-foreground">
                      <ShoppingCart className="h-9 w-9" />
                      <p className="text-sm">Add flooring or trim to see it here.</p>
                    </div>
                  ) : (
                    <ul className="grid gap-3">
                      {cart.items.map((item) => (
                        <li
                          key={item.id}
                          className="grid grid-cols-[64px_minmax(0,1fr)] gap-3 rounded-lg border bg-card p-3"
                        >
                          <div className="aspect-square overflow-hidden rounded-md bg-surface">
                            {item.image && (
                              <img src={item.image} alt="" className="h-full w-full object-cover" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="font-bold text-navy">{item.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {money(item.price)} / {item.unit}
                                  {item.coverage ? ` · ${item.coverage} sq ft` : ""}
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
                            <div className="mt-2 flex items-center justify-between">
                              <div className="flex h-8 items-center overflow-hidden rounded-md border">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-none"
                                  onClick={() => cart.setQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center text-sm font-bold">
                                  {item.quantity}
                                </span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-none"
                                  onClick={() => cart.setQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <b className="text-sm">{money(item.price * item.quantity)}</b>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {cart.items.length > 0 && (
                  <div className="border-t bg-card p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-bold">Subtotal</span>
                      <span className="font-display text-2xl font-black text-navy">
                        {money(cart.subtotal)}
                      </span>
                    </div>
                    <Link
                      to="/checkout"
                      className="btn-gold flex h-11 w-full items-center justify-center gap-2 rounded-md text-xs font-extrabold uppercase tracking-[0.08em]"
                    >
                      Checkout
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/cart"
                      className="mt-1 block py-1 text-center text-xs font-bold uppercase text-muted-foreground hover:text-gold-deep"
                    >
                      View full cart
                    </Link>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={cart.clear}
                      className="mt-1 w-full text-xs"
                    >
                      Clear cart
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <nav aria-label="Main navigation" className="hidden border-b bg-card sm:block">
        <ul className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-6 text-xs font-bold uppercase lg:text-[13px]">
          {NAV.map((n) => (
            <li key={n} className="relative shrink-0">
              {n === "Flooring" ? (
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center gap-1 border-b-2 border-gold py-2.5">
                    Flooring
                    <ChevronDown className="h-3.5 w-3.5" />
                  </summary>
                  <div className="absolute left-0 top-full z-50 grid w-52 rounded-md border bg-card p-2 shadow-card">
                    <Link to="/lvp" className="p-3 hover:bg-surface">
                      Luxury vinyl plank
                    </Link>
                    <Link to="/hybrid-planks" className="p-3 hover:bg-surface">
                      Hybrid wood plank
                    </Link>
                  </div>
                </details>
              ) : (
                <a
                  href={navHref(n)}
                  className={`block border-b-2 border-transparent py-2.5 hover:border-gold ${n === "Deals" ? "text-destructive" : "text-navy"}`}
                >
                  {n}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="block shrink-0" aria-label="Home Connect home">
      <img
        src={light ? logoLight : logoDark}
        alt="Home Connect"
        width={201}
        height={74}
        className="h-auto w-[122px] object-contain sm:w-[142px]"
      />
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-4 bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="grid gap-3">
          <Logo />
          <p className="text-xs text-navy-foreground/70">
            Better floors. Better prices. Easier shopping.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold">
            <a href="tel:+19842009893" className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-gold" />
              +1 984 200 9893
            </a>
            <a href="mailto:info@homeconnect.shop" className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-gold" />
              info@homeconnect.shop
            </a>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-x-8 gap-y-1.5 text-xs font-semibold uppercase tracking-wide sm:grid-cols-3">
          {[...NAV, "Hybrid Planks", "Contractor Pricing"].map((n) => (
            <li key={n}>
              <a
                href={navHref(n)}
                className={`hover:text-gold ${n === "Contractor Pricing" ? "text-gold" : "text-navy-foreground/80"}`}
              >
                {n}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-navy-foreground/10 py-3 text-center text-[11px] text-navy-foreground/60">
        © 2026 Home Connect Shop LLC
      </div>
    </footer>
  );
}

export function HelpCompact({ title = "Need help?" }: { title?: string }) {
  return (
    <aside className="h-fit rounded-xl border bg-card p-3.5">
      <h3 className="text-lg font-black">{title}</h3>
      <div className="mt-3 grid gap-2">
        <a
          href="tel:+19842009893"
          className="flex items-center gap-3 rounded-lg bg-surface p-2.5 hover:bg-gold-soft"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy text-navy-foreground">
            <Phone className="h-4 w-4" />
          </span>
          <span className="text-sm font-bold">+1 984 200 9893</span>
        </a>
        <a
          href="mailto:info@homeconnect.shop"
          className="flex min-w-0 items-center gap-3 rounded-lg bg-surface p-2.5 hover:bg-gold-soft"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy text-navy-foreground">
            <Mail className="h-4 w-4" />
          </span>
          <span className="truncate text-sm font-bold">info@homeconnect.shop</span>
        </a>
      </div>
    </aside>
  );
}
