export const PRODUCT = {
  pricePerSqft: 1.99,
  boxPrice: 57.07,
  sqftPerBox: 28.68,
};

export function calcFlooringForProduct(
  roomSqft: number,
  wastePct: number,
  sqftPerBox: number,
  boxPrice: number,
) {
  const area = Math.max(0, roomSqft) * (1 + wastePct / 100);
  const boxes = area > 0 ? Math.ceil(area / sqftPerBox - 1e-9) : 0;
  const coverage = +(boxes * sqftPerBox).toFixed(2);
  return {
    boxes,
    coverage,
    extra: +Math.max(0, coverage - Math.max(0, roomSqft)).toFixed(2),
    total: +(boxes * boxPrice).toFixed(2),
  };
}

export function calcFlooring(roomSqft: number, wastePct: number) {
  return calcFlooringForProduct(roomSqft, wastePct, PRODUCT.sqftPerBox, PRODUCT.boxPrice);
}

export const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });
