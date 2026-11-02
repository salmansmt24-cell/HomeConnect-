import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageShell, PageHead, Field, controlCls } from "@/components/page";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Sign In — Home Connect Account" },
      {
        name: "description",
        content: "Sign in to your Home Connect account to view orders and saved projects.",
      },
      { property: "og:title", content: "Sign In | Home Connect" },
      { property: "og:description", content: "Access your Home Connect account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  return (
    <PageShell crumb="Sign in">
      <PageHead
        eyebrow="Your account"
        title="SIGN IN"
        lead="Design preview only — sign-in will connect to the live Home Connect store."
      />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-6 grid max-w-md gap-4 rounded-xl border bg-card p-5 shadow-card"
      >
        <Field id="email" label="Email">
          <input id="email" type="email" className={controlCls} />
        </Field>
        <Field id="pw" label="Password">
          <input id="pw" type="password" className={controlCls} />
        </Field>
        <Button
          type="submit"
          disabled
          className="btn-gold h-11 rounded-md text-xs font-extrabold uppercase tracking-[0.08em] disabled:opacity-60"
        >
          Sign in (preview)
        </Button>
        <p className="text-xs text-muted-foreground">
          Contractor?{" "}
          <Link to="/contractor-pricing" className="font-bold text-gold-deep underline">
            Apply for contractor pricing
          </Link>
        </p>
      </form>
    </PageShell>
  );
}
