import { getLvpBySlug, type Lvp } from "@/lib/lvp";

/** Owner-confirmed carpet facts only. Add fields here once verified. */
export const HOT_PURSUIT = {
  slug: "hot-pursuit",
  name: "Hot Pursuit",
  category: "Carpet",
  price: 1.09, // per sq ft — confirmed by owner
} as const;

/** Slugs whose sale price is confirmed by the owner. Driftwood is NOT confirmed. */
export const CONFIRMED_SALE_SLUGS = ["colorado-spring"] as const;

export const confirmedFloorDeals = (): Lvp[] =>
  CONFIRMED_SALE_SLUGS.map((s) => getLvpBySlug(s)).filter(
    (p): p is Lvp => !!p && p.salePrice !== undefined && p.salePrice > p.price,
  );

export const carpetEstimate = (sqft: number) =>
  Math.round(Math.max(0, sqft) * HOT_PURSUIT.price * 100) / 100;
