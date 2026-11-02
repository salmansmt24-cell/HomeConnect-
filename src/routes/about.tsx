import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Hammer, Ruler, ShoppingCart, Store } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ContactLines, PageHead, PageShell, SectionTitle, Steps } from "@/components/page";
import cabinets from "@/assets/home-cabinets.jpg";
import stairs from "@/assets/home-stairs.jpg";
import room from "@/assets/room-1.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Home Connect — Raleigh Flooring, Carpet, Cabinets & Stairs" },
      {
        name: "description",
        content:
          "Home Connect is a Raleigh showroom and warehouse serving homeowners and contractors with flooring, carpet, cabinets, SnapCaps stair fabrication and online ordering.",
      },
      { property: "og:title", content: "About Home Connect" },
      {
        property: "og:description",
        content:
          "Raleigh showroom and warehouse for flooring, carpet, cabinets and custom stair parts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const PILLARS = [
  {
    icon: Store,
    title: "Raleigh showroom & warehouse",
    body: "A physical location where you can see, feel and compare flooring, carpet and cabinet samples before you order.",
  },
  {
    icon: Ruler,
    title: "Materials expertise",
    body: "Wear layers, plank formats, carpet fiber, pad and underlayment — we explain what actually matters for your room.",
  },
  {
    icon: Hammer,
    title: "SnapCaps fabrication",
    body: "Custom stair caps and transitions fabricated to match your floor, so stairs and floors finish as one.",
  },
  {
    icon: ShoppingCart,
    title: "Online shopping reach",
    body: "Browse, calculate and order online with the same team behind the counter confirming the details.",
  },
];

function AboutPage() {
  return (
    <PageShell crumb="About">
      <PageHead
        eyebrow="About Home Connect"
        title="ONE ADDRESS FOR THE WHOLE ROOM"
        lead="We are a Raleigh-based flooring, carpet, cabinet and stair-parts company that also lets you shop the same products online — with a real person confirming the details."
      />

      <div className="mt-5 grid gap-4 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border bg-surface">
          <img
            src={room}
            alt="Living room with new flooring"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent" />
          <p className="absolute bottom-3 left-4 right-4 font-display text-lg font-black uppercase text-navy-foreground [text-shadow:0_1px_10px_rgb(0_0_0/0.6)]">
            Floors, carpet, cabinets and stairs — from one team
          </p>
        </div>
        <div className="grid gap-4">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border bg-surface">
            <img
              src={cabinets}
              alt="Kitchen cabinets"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border bg-surface">
            <img
              src={stairs}
              alt="Carpeted staircase"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <section className="mt-9">
        <SectionTitle
          eyebrow="Who we serve"
          title="HOMEOWNERS AND CONTRACTORS"
          aside="The same pricing discipline and the same materials, whether it is one bedroom or a whole build."
        />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border bg-card p-5 shadow-card">
            <b className="text-sm font-black uppercase text-navy">Homeowners</b>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Room-by-room guidance, honest square-foot pricing, sample-first decisions, and
              delivery or local pickup arranged with the team.
            </p>
          </article>
          <article className="rounded-xl border bg-card p-5 shadow-card">
            <b className="text-sm font-black uppercase text-navy">Contractors &amp; builders</b>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Repeatable material supply, project-sized orders and professional pricing reviewed by
              Home Connect — applied for, never automatic.
            </p>
            <Link
              to="/contractor-pricing"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase text-gold-deep hover:underline"
            >
              Apply for contractor pricing
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </article>
        </div>
      </section>

      <section className="mt-9">
        <SectionTitle eyebrow="What we do" title="FOUR THINGS, DONE PROPERLY" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <article key={p.title} className="rounded-xl border bg-card p-4 shadow-card">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gold-soft text-navy">
                <p.icon className="h-4 w-4" />
              </span>
              <b className="mt-2.5 block text-sm font-black uppercase leading-tight text-navy">
                {p.title}
              </b>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-9">
        <SectionTitle eyebrow="How a project runs" title="ASK, REVIEW, ORDER" />
        <div className="mt-4">
          <Steps
            items={[
              {
                title: "Ask",
                body: "Send your room, budget and product questions by form, phone or email.",
              },
              {
                title: "Review",
                body: "Our team checks availability, compatibility and quantities — including SnapCaps fit.",
              },
              {
                title: "Order",
                body: "You order with the details confirmed, then pick up locally or have it delivered.",
              },
            ]}
          />
        </div>
      </section>

      <section className="mt-9 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <SectionTitle eyebrow="Find us" title="SHOWROOM &amp; WAREHOUSE" />
          <div className="mt-4">
            <ContactLines />
          </div>
        </div>
        <div className="grid gap-3 self-start rounded-xl border bg-card p-5 shadow-card">
          <b className="text-sm font-black uppercase text-navy">Start somewhere</b>
          <Link
            to="/lvp"
            className="btn-gold flex h-11 items-center justify-center gap-2 rounded-md text-xs font-extrabold uppercase tracking-[0.08em]"
          >
            Shop luxury vinyl plank
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/cabinets/get-started"
            className="flex h-11 items-center justify-center gap-2 rounded-md border-2 border-navy text-xs font-extrabold uppercase text-navy hover:bg-gold-soft"
          >
            Start a cabinet project
          </Link>
          <Link
            to="/contact"
            className="flex h-11 items-center justify-center gap-2 rounded-md border-2 border-navy text-xs font-extrabold uppercase text-navy hover:bg-gold-soft"
          >
            Contact the team
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
