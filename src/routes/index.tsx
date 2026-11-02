import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Box,
  Building2,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Layers,
  Mail,
  MapPin,
  PackageCheck,
  Phone,
  Ruler,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
  Users,
} from "lucide-react";
import { Header, SiteFooter } from "@/components/site";
import { Button } from "@/components/ui/button";
import { fullImg, getLvpBySlug, type Lvp } from "@/lib/lvp";
import { HOT_PURSUIT } from "@/lib/deals";
import { money } from "@/lib/flooring";
import hero from "@/assets/room-1.jpg";
import carpet from "@/assets/home-carpet.jpg";
import cabinets from "@/assets/home-cabinets.jpg";
import stairs from "@/assets/home-stairs.jpg";
import flooring from "@/assets/floor-close.jpg";
import accessories from "@/assets/acc-tmolding.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flooring, Carpet, Cabinets & Stairs | Home Connect" },
      {
        name: "description",
        content:
          "Shop flooring, carpet, cabinets, stair products and accessories from Home Connect, with a Raleigh showroom and warehouse.",
      },
      { property: "og:title", content: "Home Connect | Better Floors. Better Prices." },
      {
        property: "og:description",
        content:
          "Shop flooring and home materials, compare real prices, and get help with your project.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

// Homepage deals only show owner-verified promotions. Do not add products here
// unless their exact sale is verified (Driftwood is intentionally excluded).
const colorado = getLvpBySlug("colorado-spring");

const CATEGORIES = [
  {
    title: "Luxury vinyl plank",
    action: "Shop LVP",
    image: flooring,
    href: "/lvp" as const,
    note: "14 floors to compare",
  },
  {
    title: "Hybrid wood plank",
    action: "Explore flooring",
    image: hero,
    href: "/hybrid-planks" as const,
    note: "Real wood, waterproof core",
  },
  {
    title: "Carpet",
    action: "Explore carpet",
    image: carpet,
    href: "/carpet" as const,
    note: "For rooms that call for softness",
  },
  {
    title: "Cabinets",
    action: "Explore cabinets",
    image: cabinets,
    href: "/cabinets" as const,
    note: "Four current collections",
  },
  {
    title: "SnapCaps / stairs",
    action: "Explore SnapCaps",
    image: stairs,
    href: "/snapcaps" as const,
    note: "Coordinated stair components",
  },
  {
    title: "Accessories",
    action: "Shop accessories",
    image: accessories,
    href: "/accessories" as const,
    note: "Trim and finishing pieces",
  },
];

const QUICK_PATHS = [
  "Shop all LVP",
  "Click-lock",
  "Glue-down",
  "Under $2 / sq ft",
  "12 mil",
  "20 mil",
  "28 mil",
];

function HomePage() {
  return (
    <div className="min-h-screen bg-card">
      <Header />
      <main>
        <HomeHero />
        <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
          <CategorySection />
          <DealsSection />
          <CabinetSection />
          <FloorFinderSection />
          <SnapCapsSection />
          <ContractorSection />
          <WhySection />
          <HelpSection />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

type Slide = {
  eyebrow: string;
  title: [string, string];
  text: string;
  cta: string;
  image: string;
  alt: string;
  to?: "/lvp" | "/carpet" | "/deals";
  href?: string;
};
const SLIDES: Slide[] = [
  {
    eyebrow: "Flooring",
    title: ["BETTER FLOORS.", "BETTER PRICES."],
    text: "Compare luxury vinyl plank by price, wear layer and installation — with clear per-square-foot pricing.",
    cta: "Shop flooring",
    image: hero,
    alt: "Bright open-plan home with wood-look flooring",
    to: "/lvp",
  },
  {
    eyebrow: "Carpet",
    title: ["COMFORTABLE CARPET", "FOR EVERY ROOM."],
    text: "Soft, practical carpet for bedrooms, family rooms and more.",
    cta: "Shop carpet",
    image: carpet,
    alt: "Living room with soft carpet",
    to: "/carpet",
  },
  {
    eyebrow: "Cabinets",
    title: ["BUILD A KITCHEN", "THAT WORKS FOR YOU."],
    text: "Brooklyn, Shaker, Oslo and Builder Essential collections — with real project help.",
    cta: "Explore cabinets",
    image: cabinets,
    alt: "Kitchen with navy and wood cabinets",
    href: "/cabinets",
  },
  {
    eyebrow: "SnapCaps / Stairs",
    title: ["STAIRS THAT MATCH", "YOUR FLOOR."],
    text: "Finished stair components made from compatible luxury vinyl flooring.",
    cta: "Explore SnapCaps",
    image: stairs,
    alt: "Wood-look stair treads",
    href: "/snapcaps",
  },
];

function HomeHero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 6500);
    return () => clearInterval(t);
  }, [paused]);
  const go = (d: number) => setI((n) => (n + d + SLIDES.length) % SLIDES.length);
  const btn = "btn-gold inline-flex h-11 items-center gap-2 rounded-md px-5 text-sm";
  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      className="relative isolate min-h-[440px] overflow-hidden bg-surface sm:min-h-[360px]"
    >
      {SLIDES.map((s, n) => (
        <img
          key={s.eyebrow}
          src={s.image}
          alt={n === i ? s.alt : ""}
          width={1280}
          height={960}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${n === i ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="home-hero-scrim absolute inset-y-0 left-0 w-full sm:w-3/5" />
      {SLIDES.map((s, n) => (
        <div
          key={s.eyebrow}
          aria-hidden={n !== i}
          className={`absolute inset-0 transition-opacity duration-500 ${n === i ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          <div className="mx-auto grid h-full max-w-7xl content-center px-4 pb-10 pt-8 text-navy sm:px-6 sm:pl-16">
            <div className="max-w-xl">
              <p className="eyebrow text-gold-deep">{s.eyebrow}</p>
              <h2 className="mt-2 text-[2rem] font-black leading-[0.92] tracking-tight sm:text-[2.75rem] lg:text-[40px]">
                {s.title[0]}
                <br />
                <span className="text-gold">{s.title[1]}</span>
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-navy sm:text-base">
                {s.text}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {s.to ? (
                  <Link to={s.to} tabIndex={n === i ? 0 : -1} className={btn}>
                    {s.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <a href={s.href} tabIndex={n === i ? 0 : -1} className={btn}>
                    {s.cta}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                )}
                {s.href !== "#deals" && (
                  <a
                    href="/deals"
                    tabIndex={n === i ? 0 : -1}
                    className="inline-flex h-11 items-center gap-2 rounded-md border-2 border-gold bg-card/80 px-5 text-sm font-extrabold uppercase text-navy transition hover:border-gold hover:text-gold"
                  >
                    Shop deals
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      <h1 className="sr-only">Home Connect — better floors, better prices</h1>
      <Button
        variant="ghost"
        type="button"
        aria-label="Previous slide"
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-navy-foreground/30 bg-navy/40 text-navy-foreground backdrop-blur transition hover:border-gold hover:text-gold sm:grid"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        type="button"
        aria-label="Next slide"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-navy-foreground/30 bg-navy/40 text-navy-foreground backdrop-blur transition hover:border-gold hover:text-gold sm:grid"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
      <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
        <Button
          variant="ghost"
          type="button"
          aria-label="Previous slide"
          onClick={() => go(-1)}
          className="grid h-8 w-8 place-items-center text-navy sm:hidden"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {SLIDES.map((s, n) => (
          <Button
            variant="ghost"
            key={s.eyebrow}
            type="button"
            aria-label={`Show ${s.eyebrow}`}
            aria-current={n === i}
            onClick={() => setI(n)}
            className={`h-2 min-h-2 p-0 rounded-full transition-all ${n === i ? "w-7 bg-gold" : "w-2 bg-navy/40 hover:bg-navy"}`}
          />
        ))}
        <Button
          variant="ghost"
          type="button"
          aria-label="Next slide"
          onClick={() => go(1)}
          className="grid h-8 w-8 place-items-center text-navy sm:hidden"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  aside,
}: {
  eyebrow: string;
  title: string;
  aside?: string;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 border-b pb-3">
      <div className="min-w-0">
        <p className="eyebrow text-gold-deep">{eyebrow}</p>
        <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{title}</h2>
      </div>
      {aside && (
        <p className="hidden max-w-sm text-right text-sm text-muted-foreground md:block">{aside}</p>
      )}
    </div>
  );
}

function CategorySection() {
  return (
    <section className="mt-7">
      <SectionHeading
        eyebrow="Start here"
        title="SHOP BY CATEGORY"
        aside="Everything for the floor — and the room around it."
      />
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6 md:gap-4">
        {CATEGORIES.map((category) => {
          const content = (
            <>
              <img
                src={category.image}
                alt=""
                loading="lazy"
                width={1200}
                height={912}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent" />
              <div className="relative mt-auto p-3 text-navy-foreground sm:p-4">
                <h3 className="text-sm font-black uppercase leading-tight [text-shadow:0_1px_12px_rgb(0_0_0/0.65)] sm:text-base">
                  {category.title}
                </h3>
                <p className="mt-0.5 hidden text-xs text-navy-foreground/90 [text-shadow:0_1px_10px_rgb(0_0_0/0.6)] sm:block">
                  {category.note}
                </p>
                <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-extrabold uppercase text-gold-soft [text-shadow:0_1px_2px_rgb(0_0_0/0.9),0_0_12px_rgb(0_0_0/0.7)] sm:text-xs">
                  {category.action}
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </>
          );
          const cls =
            "group relative isolate flex aspect-[4/3] min-w-0 flex-col overflow-hidden rounded-xl border bg-navy shadow-card md:aspect-[4/3] lg:aspect-[3/4]";
          return category.href ? (
            <Link
              key={category.title}
              to={category.href}
              className={`${cls} transition hover:-translate-y-0.5 hover:border-gold`}
            >
              {content}
            </Link>
          ) : null;
        })}
      </div>
    </section>
  );
}

function DealsSection() {
  return (
    <section id="deals" className="mt-8 scroll-mt-40 border-y border-gold/40 py-5">
      <SectionHeading
        eyebrow="Flooring + carpet"
        title="THIS WEEK'S DEALS"
        aside="Real Home Connect pricing — shown by the square foot."
      />
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {colorado && <FloorDeal product={colorado} />}
        <CarpetDeal />
      </div>
      <div className="mt-4 flex justify-center">
        <Link
          to="/deals"
          className="btn-gold inline-flex h-11 items-center gap-2 rounded-md px-6 text-xs font-extrabold uppercase text-navy transition hover:border-gold hover:text-gold-deep"
        >
          View all deals
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function FloorDeal({ product: p }: { product: Lvp }) {
  return (
    <article className="grid min-w-0 overflow-hidden rounded-xl border bg-card shadow-card sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="relative min-h-[220px] overflow-hidden bg-surface">
        {p.img && (
          <img
            src={fullImg(p.img)}
            alt={p.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <span className="absolute left-3 top-3 rounded-md bg-navy px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide text-gold">
          Flooring
        </span>
        {p.salePrice && (
          <span className="absolute right-3 top-3 rounded-md bg-destructive px-2 py-1 text-[11px] font-extrabold uppercase text-destructive-foreground">
            Sale
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-col p-5">
        <p className="eyebrow text-gold-deep">{p.collection ?? "Luxury vinyl plank"}</p>
        <h3 className="mt-1 text-2xl font-black text-navy sm:text-3xl">{p.name}</h3>
        <div className="mt-4 flex flex-wrap items-baseline gap-x-2">
          <b className="font-display text-4xl font-black text-navy">{money(p.price)}</b>
          <span className="text-sm font-semibold text-muted-foreground">/ sq ft</span>
          {p.salePrice && <del className="text-sm text-muted-foreground">{money(p.salePrice)}</del>}
        </div>
        <p className="mt-1 text-sm">
          <b>{money(p.boxPrice)} / box</b>
          <span className="text-muted-foreground"> · {p.coverage} sq ft per box</span>
        </p>
        <Link
          to="/floor/colorado-spring"
          className="btn-gold mt-auto inline-flex h-11 items-center justify-center gap-2 rounded-md px-4 pt-0 text-xs font-extrabold uppercase tracking-[0.08em] max-sm:mt-5"
        >
          View floor
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function CarpetDeal() {
  return (
    <article className="grid min-w-0 overflow-hidden rounded-xl border bg-card shadow-card sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="relative min-h-[220px] overflow-hidden bg-surface">
        <img
          src={carpet}
          alt="Carpeted living room"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-md bg-navy px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide text-gold">
          Carpet
        </span>
        <span className="absolute inset-x-0 bottom-0 bg-navy/70 px-2 py-1 text-center text-[10px] font-bold uppercase text-navy-foreground">
          Room photo — not product
        </span>
      </div>
      <div className="flex min-w-0 flex-col p-5">
        <p className="eyebrow text-gold-deep">{HOT_PURSUIT.category}</p>
        <h3 className="mt-1 text-2xl font-black text-navy sm:text-3xl">{HOT_PURSUIT.name}</h3>
        <div className="mt-4 flex flex-wrap items-baseline gap-x-2">
          <b className="font-display text-4xl font-black text-navy">{money(HOT_PURSUIT.price)}</b>
          <span className="text-sm font-semibold text-muted-foreground">/ sq ft</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Estimate your room and request a quote.
        </p>
        <Link
          to="/carpet/$slug"
          params={{ slug: "hot-pursuit" }}
          className="btn-gold mt-auto inline-flex h-11 items-center justify-center gap-2 rounded-md px-4 text-xs font-extrabold uppercase tracking-[0.08em] max-sm:mt-5"
        >
          View carpet
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function FloorFinderSection() {
  return (
    <section className="mt-8 grid gap-3 rounded-xl border bg-card p-4 shadow-card sm:p-5 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-6">
      <div>
        <p className="eyebrow text-gold-deep">Quick picks</p>
        <h2 className="text-xl font-black text-navy sm:text-2xl">FIND YOUR FLOOR</h2>
      </div>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {QUICK_PATHS.map((path) => (
          <Link
            key={path}
            to="/lvp"
            className="shrink-0 rounded-full border bg-surface px-3 py-1.5 text-xs font-bold text-navy transition hover:border-gold hover:bg-gold-soft"
          >
            {path}
          </Link>
        ))}
      </div>
      <Link
        to="/lvp"
        className="btn-gold inline-flex h-10 items-center justify-center gap-2 rounded-md px-5 text-xs"
      >
        Shop all LVP
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}

function SnapCapsSection() {
  return (
    <section
      id="snapcaps"
      className="mt-8 scroll-mt-40 grid overflow-hidden rounded-xl border bg-surface md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
    >
      <div className="relative min-h-[220px] md:min-h-[290px]">
        <img
          src={stairs}
          alt="Coordinated wood-look stair components"
          loading="lazy"
          width={1200}
          height={912}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="grid content-center p-5 sm:p-7">
        <p className="eyebrow text-gold-deep">SnapCaps</p>
        <h2 className="mt-1 text-2xl font-black sm:text-3xl">STAIRS THAT MATCH YOUR FLOOR.</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Home Connect fabricates compatible luxury vinyl flooring into finished stair components
          designed to coordinate with the floor.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href="/snapcaps"
            className="btn-gold inline-flex h-10 items-center gap-2 rounded-md px-4 text-xs"
          >
            Explore SnapCaps
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="/contact"
            className="inline-flex h-10 items-center rounded-md border-2 border-navy px-4 text-xs font-extrabold uppercase text-navy"
          >
            Check compatibility
          </a>
        </div>
      </div>
    </section>
  );
}

function CabinetSection() {
  return (
    <section
      id="cabinets"
      className="mt-8 scroll-mt-40 grid overflow-hidden rounded-xl border bg-card shadow-card md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
    >
      <div className="grid content-center p-5 sm:p-7 lg:p-9">
        <p className="eyebrow text-gold-deep">Cabinets</p>
        <h2 className="mt-1 text-2xl font-black text-navy sm:text-3xl">MAKE THE KITCHEN WORK.</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Explore Brooklyn, Shaker, Oslo and Builder Essential — and get real help planning your
          project.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href="/cabinets"
            className="btn-gold inline-flex h-10 items-center gap-2 rounded-md px-4 text-xs"
          >
            Explore cabinets
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="/cabinets/get-started"
            className="inline-flex h-10 items-center rounded-md border-2 border-navy px-4 text-xs font-extrabold uppercase text-navy"
          >
            Start your project
          </a>
        </div>
      </div>
      <div className="relative min-h-[260px] md:min-h-[360px]">
        <img
          src={cabinets}
          alt="Modern kitchen with navy and wood cabinets"
          loading="lazy"
          width={1200}
          height={912}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
}

function ContractorSection() {
  return (
    <section className="mt-8 grid gap-4 rounded-xl border-2 border-gold bg-gold-soft p-4 sm:p-5 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center">
      <span className="grid h-11 w-11 place-items-center rounded-lg bg-navy text-gold">
        <Users className="h-5 w-5" />
      </span>
      <div>
        <p className="eyebrow text-gold-deep">For the trades</p>
        <h2 className="text-lg font-black text-navy sm:text-xl">
          PROFESSIONAL PRICING FOR CONTRACTORS
        </h2>
        <p className="mt-0.5 max-w-2xl text-sm text-navy/75">
          Contractors, remodelers, builders and other qualified professionals can apply for Home
          Connect contractor pricing.
        </p>
      </div>
      <a
        href="/contractor-pricing"
        className="btn-gold inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-xs"
      >
        Apply for contractor pricing
        <ArrowRight className="h-4 w-4" />
      </a>
    </section>
  );
}

function WhySection() {
  const benefits = [
    [CircleDollarSign, "Shop by the sq ft", "Compare flooring prices clearly."],
    [Store, "Raleigh showroom", "Shop locally or work with our team."],
    [Truck, "Pickup + delivery", "Options depend on the order and destination."],
    [Sparkles, "Real project help", "Flooring, cabinets, stairs, accessories."],
  ];
  return (
    <section className="mt-8 rounded-xl border bg-card">
      <h2 className="sr-only">Why Home Connect</h2>
      <ul className="grid grid-cols-2 divide-border lg:grid-cols-4 lg:divide-x">
        {benefits.map(([I, title, text]) => {
          const Icon = I as typeof Store;
          return (
            <li key={title as string} className="flex min-w-0 items-start gap-2.5 p-3 sm:p-4">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
              <div className="min-w-0">
                <h3 className="text-xs font-black uppercase text-navy sm:text-sm">
                  {title as string}
                </h3>
                <p className="text-[11px] leading-snug text-muted-foreground sm:text-xs">
                  {text as string}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function HelpSection() {
  return (
    <section
      id="help"
      className="mt-8 grid gap-4 rounded-xl border bg-surface p-4 sm:p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
    >
      <div>
        <p className="eyebrow text-gold-deep">Talk to our team</p>
        <h2 className="text-xl font-black sm:text-2xl">NEED HELP WITH YOUR PROJECT?</h2>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold">
          <a href="tel:+19842009893" className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gold-deep" />
            +1 984 200 9893
          </a>
          <a href="mailto:info@homeconnect.shop" className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-gold-deep" />
            info@homeconnect.shop
          </a>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <a
          href="mailto:info@homeconnect.shop"
          className="btn-gold inline-flex h-11 items-center gap-2 rounded-md px-5 text-xs"
        >
          <Mail className="h-4 w-4" />
          Contact Home Connect
        </a>
        <a
          href="tel:+19842009893"
          className="inline-flex h-11 items-center gap-2 rounded-md border-2 border-navy px-5 text-xs font-extrabold uppercase text-navy"
        >
          <MapPin className="h-4 w-4" />
          Visit Raleigh showroom
        </a>
      </div>
    </section>
  );
}
