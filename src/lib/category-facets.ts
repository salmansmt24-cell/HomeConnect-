import { byName, byPrice } from "@/components/catalog";
import type { Facet, SortOption } from "@/components/category-shop";
import { hasSale, sqFtPrice, type CatalogProduct } from "@/lib/catalog";

export const SORT_NAME: SortOption = { id: "name", label: "Name: A–Z", fn: byName };
export const SORT_LOW: SortOption = {
  id: "price-asc",
  label: "Price: Low to High",
  fn: byPrice(1),
};
export const SORT_HIGH: SortOption = {
  id: "price-desc",
  label: "Price: High to Low",
  fn: byPrice(-1),
};

export const SALE_FACET: Facet = {
  id: "sale",
  title: "Offers",
  options: [
    { id: "sale", label: "On sale", test: hasSale },
    { id: "reg", label: "Regular price", test: (p) => !hasSale(p) },
  ],
};

const oz = (p: CatalogProduct) => (p.faceWeight ? parseFloat(p.faceWeight) : NaN);
export const CARPET_FACETS: Facet[] = [
  SALE_FACET,
  {
    id: "price",
    title: "Price per sq ft",
    options: [
      { id: "u125", label: "Under $1.25", test: (p) => (sqFtPrice(p) ?? 99) < 1.25 },
      {
        id: "125-2",
        label: "$1.25 – $2.00",
        test: (p) => {
          const s = sqFtPrice(p);
          return s !== null && s >= 1.25 && s <= 2;
        },
      },
      { id: "o2", label: "Over $2.00", test: (p) => (sqFtPrice(p) ?? 0) > 2 },
    ],
  },
  {
    id: "weight",
    title: "Face weight",
    options: [
      { id: "light", label: "Under 30 oz", test: (p) => oz(p) < 30 },
      { id: "mid", label: "30 – 50 oz", test: (p) => oz(p) >= 30 && oz(p) <= 50 },
      { id: "heavy", label: "Over 50 oz", test: (p) => oz(p) > 50 },
    ],
  },
];

const n = (p: CatalogProduct) => p.name.toLowerCase();
export const ACCESSORY_FACETS: Facet[] = [
  {
    id: "type",
    title: "Product type",
    options: [
      { id: "stairs", label: "Stair parts", test: (p) => /tread|stair/.test(n(p)) },
      { id: "trim", label: "Transitions & trim", test: (p) => /reducer|molding/.test(n(p)) },
      { id: "under", label: "Underlayment & pad", test: (p) => /underlayment|pad/.test(n(p)) },
    ],
  },
  {
    id: "price",
    title: "Price",
    options: [
      { id: "u50", label: "Under $50", test: (p) => (p.price ?? 999) < 50 },
      {
        id: "50-70",
        label: "$50 – $70",
        test: (p) => p.price !== null && p.price >= 50 && p.price <= 70,
      },
      { id: "o70", label: "Over $70", test: (p) => (p.price ?? 0) > 70 },
    ],
  },
];

const optHas = (name: RegExp, value: string) => (p: CatalogProduct) =>
  p.options.some(
    (o) => name.test(o.name) && o.values.some((v) => v.toLowerCase() === value.toLowerCase()),
  );

export function snapcapsFacets(items: CatalogProduct[]): Facet[] {
  const noses = [
    ...new Set(
      items.flatMap((p) => p.options.filter((o) => /nose/i.test(o.name)).flatMap((o) => o.values)),
    ),
  ];
  const sizes = [
    ...new Set(
      items.flatMap((p) => p.options.filter((o) => /plank/i.test(o.name)).flatMap((o) => o.values)),
    ),
  ];
  return [
    {
      id: "kind",
      title: "Stair component",
      options: [
        { id: "cap", label: "Stair Cap", test: (p) => /stair cap/i.test(p.name) },
        { id: "tread", label: "Full Tread", test: (p) => /full tread/i.test(p.name) },
      ],
    },
    {
      id: "nose",
      title: "Nose type",
      options: noses.map((v) => ({ id: v, label: v, test: optHas(/nose/i, v) })),
    },
    {
      id: "size",
      title: "Supported plank size",
      options: sizes.map((v) => ({ id: v, label: v, test: optHas(/plank/i, v) })),
    },
  ];
}
