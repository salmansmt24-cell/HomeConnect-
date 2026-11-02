// Presentation snapshot derived from reference/home-connect-storefront-catalog.json (read-only authority).
// WooCommerce stays authoritative at runtime; Codex rebinds these values when integrating.
import data from "@/data/catalog.json";

export type Group =
  "LVP" | "Hybrid Wood Plank" | "Carpet" | "Cabinets" | "SnapCaps" | "Accessories";
export type CatalogProduct = {
  slug: string;
  name: string;
  group: Group;
  collection: string | null;
  type: string;
  url: string;
  price: number | null;
  regular: number | null;
  sale: number | null;
  unit: string | null;
  coverage: number | null;
  perSqFt: number | null;
  regularPerSqFt: number | null;
  wear: string | null;
  thickness: string | null;
  plank: string | null;
  install: string | null;
  faceWeight: string | null;
  specStatus: string;
  options: { name: string; values: string[] }[];
  images: string[];
  imageStatus: string;
  onSale: boolean;
  snapcaps: string | null;
};

export const SNAPSHOT_DATE = data.generated_on;
export const CATALOG = data.products as CatalogProduct[];
export const byGroup = (g: Group) => CATALOG.filter((p) => p.group === g);
export const getProduct = (slug: string, groups?: Group[]) =>
  CATALOG.find((p) => p.slug === slug && (!groups || groups.includes(p.group)));

/** Only show an image when the authority does not flag an identity conflict or withhold it. */
export const usableImages = (p: CatalogProduct) =>
  p.imageStatus === "present_from_current_woo_record" ||
  p.imageStatus === "present_but_primary_resolution_is_weak"
    ? p.images
    : [];

export const UNIT_LABEL: Record<string, string> = {
  box: "box",
  square_yard: "sq yd",
  door_or_finish_sample: "sample",
  piece_or_selected_variation: "piece",
};
/** Returns null when the authority marks the unit unknown — never invent one. */
export const unitLabel = (p: CatalogProduct) => (p.unit ? (UNIT_LABEL[p.unit] ?? null) : null);

/** Sale treatment only when the snapshot shows a real sale (regular > current). */
export const hasSale = (p: CatalogProduct) =>
  p.onSale && p.price !== null && p.regular !== null && p.regular > p.price;
/** Per-sq-ft only where the authority supplies it or a governed box coverage exists. */
export const sqFtPrice = (p: CatalogProduct) =>
  p.perSqFt ??
  (p.price !== null && p.coverage ? Math.round((p.price / p.coverage) * 100) / 100 : null);
export const sqFtRegular = (p: CatalogProduct) =>
  p.regularPerSqFt ??
  (p.regular !== null && p.coverage ? Math.round((p.regular / p.coverage) * 100) / 100 : null);

/** Carpet: 9 sq ft = 1 sq yd (verified conversion). Rounds up to whole sq yd. */
export const carpetYards = (sqft: number) => (sqft > 0 ? Math.ceil(Math.max(0, sqft) / 9) : 0);

/** SnapCaps minimum quantity 2 applies to Stair Cap products only, not Full Treads. */
export const minQty = (p: CatalogProduct) =>
  p.group === "SnapCaps" && /stair cap/i.test(p.name) ? 2 : 1;

/** Purchasable in the prototype cart only with a known price AND known unit. */
export const canAddToCart = (p: CatalogProduct) => p.price !== null && unitLabel(p) !== null;

export const titleCase = (s: string) =>
  s === s.toUpperCase() ? s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()) : s;

export const CABINET_COLLECTIONS = ["Brooklyn", "Shaker", "Oslo", "Builder Essential"] as const;

/** Deals: every catalog product whose snapshot shows an active sale, minus Driftwood (owner rule + image conflict). */
export const catalogDeals = () => CATALOG.filter((p) => hasSale(p) && p.slug !== "driftwood");
