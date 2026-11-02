import type { CatalogProduct } from "@/lib/catalog";

export const SNAPCAPS_MATERIAL_SOURCES = [
  { value: "home-connect", label: "Purchase from Home Connect" },
  { value: "ship-in", label: "Customer ship-in" },
  { value: "approved-drop-off", label: "Approved drop-off" },
] as const;

export type SnapCapsFlooringDetails = {
  mode: "" | "home-connect" | "customer-supplied";
  homeConnectProduct: string;
  manufacturer: string;
  product: string;
  color: string;
  sku: string;
  materialSource: string;
};

export const isFullTread = (p: CatalogProduct) => /full tread/i.test(p.name);

/** Governed material formula: one plank per cap or two per Full Tread, plus two extras once per order. */
export function snapCapsMaterialPlan(p: CatalogProduct, quantity: number) {
  const safeQuantity = Math.max(0, Math.floor(quantity));
  const planksPerPiece = isFullTread(p) ? 2 : 1;
  const extrasPerOrder = safeQuantity > 0 ? 2 : 0;
  return {
    planksPerPiece,
    extrasPerOrder,
    totalPlanks: safeQuantity * planksPerPiece + extrasPerOrder,
  };
}

export function hasCompleteFlooringIdentity(details: SnapCapsFlooringDetails) {
  if (!details.materialSource) return false;
  if (details.mode === "home-connect") return Boolean(details.homeConnectProduct);
  if (details.mode === "customer-supplied") {
    return Boolean(details.manufacturer.trim() && details.product.trim() && details.color.trim());
  }
  return false;
}

/** Lovable has no governed approval reference, so the preview must never unlock a mutating cart action. */
export const hasGovernedSnapCapsApproval = () => false;
