// Prototype snapshot of homeconnect.shop/lvp catalog data. Production reads from WooCommerce.
const WP = "https://homeconnect.shop/wp-content/uploads/";

export type Lvp = {
  slug: string;
  collection?: string;
  name: string;
  colors?: number;
  install?: "Glue down" | "Click-lock";
  wear?: number; // mil
  thickness?: number; // mm
  plank?: string;
  price: number;
  salePrice?: number; // regular price when on sale
  boxPrice: number;
  coverage: number;
  img?: string;
};

export const LVP: Lvp[] = [
  {
    slug: "gallatin",
    name: "Gallatin",
    colors: 11,
    install: "Glue down",
    wear: 8,
    thickness: 2,
    plank: '7" × 48"',
    price: 1.69,
    boxPrice: 86.59,
    coverage: 51.24,
    img:
      WP +
      "2024/12/V0212_0750__57025.1635168172.1280.1280__31661.1635168925.1280.1280__42407-1-150x150.jpg",
  },
  {
    slug: "ozark-2",
    name: "Ozark 2",
    colors: 11,
    install: "Glue down",
    wear: 12,
    thickness: 2,
    plank: '7" × 48"',
    price: 1.79,
    boxPrice: 91.71,
    coverage: 51.24,
    img:
      WP +
      "2024/12/V0212_0750__57025.1635168172.1280.1280__31661.1635168925.1280.1280__42407-1-150x150.jpg",
  },
  {
    slug: "colorado-spring",
    collection: "Empire 402",
    name: "Colorado Spring",
    colors: 16,
    install: "Click-lock",
    wear: 12,
    thickness: 4,
    plank: '7" × 48"',
    price: 1.99,
    salePrice: 2.49,
    boxPrice: 57.07,
    coverage: 28.68,
    img: WP + "2025/05/TB1631-pp-150x150.webp",
  },
  {
    slug: "cascade",
    name: "Cascade",
    colors: 11,
    install: "Glue down",
    wear: 20,
    thickness: 2.5,
    plank: '7" × 48"',
    price: 1.99,
    boxPrice: 83.56,
    coverage: 41.99,
    img:
      WP +
      "2024/12/V0212_0750__57025.1635168172.1280.1280__31661.1635168925.1280.1280__42407-1-150x150.jpg",
  },
  {
    slug: "winter-oak",
    collection: "Luxfloor",
    name: "Winter Oak",
    colors: 5,
    install: "Click-lock",
    wear: 12,
    thickness: 5,
    plank: '9" × 48"',
    price: 2.49,
    boxPrice: 74.67,
    coverage: 29.99,
    img: WP + "2023/07/image6-e1688492303288-272x300.webp",
  },
  {
    slug: "grey-canyon",
    collection: "Luxfloor Plus",
    name: "Grey Canyon",
    colors: 4,
    install: "Click-lock",
    wear: 20,
    thickness: 5,
    plank: '9" × 48"',
    price: 2.59,
    boxPrice: 74.69,
    coverage: 28.84,
    img: WP + "2023/07/205-1-300x225.webp",
  },
  {
    slug: "driftwood",
    name: "Driftwood",
    price: 2.59,
    salePrice: 3.29,
    boxPrice: 74.7,
    coverage: 28.84,
    img: WP + "2023/07/Driftwood-1-600x571.webp",
  },
  {
    slug: "5021-brushed-pine",
    collection: "Rigid Core Series",
    name: "5021 Brushed Pine",
    colors: 10,
    install: "Click-lock",
    wear: 20,
    thickness: 5,
    plank: '7" × 48"',
    price: 3.19,
    boxPrice: 74.08,
    coverage: 23.23,
    img: WP + "2025/03/32ad61_125b5e61b57648f8ad58ecfe958c7d5fmv2-1.avif",
  },
  {
    slug: "ash",
    collection: "New Parliament",
    name: "Ash",
    colors: 16,
    install: "Click-lock",
    wear: 20,
    thickness: 6,
    plank: '7" × 48"',
    price: 3.19,
    boxPrice: 90.48,
    coverage: 28.37,
    img: WP + "2025/04/WhatsApp-Image-2025-04-23-at-12.54.53-AM-300x300.jpeg",
  },
  {
    slug: "sand-breezed",
    collection: "Signature Series",
    name: "Sand Breezed",
    colors: 10,
    install: "Click-lock",
    wear: 20,
    thickness: 5.5,
    plank: '7" × 48"',
    price: 3.19,
    boxPrice: 90.48,
    coverage: 28.37,
    img: WP + "2023/07/sand-breezed-room-scnene-300x168.jpg",
  },
  {
    slug: "copper-dawn",
    collection: "Signature Series Wideplank",
    name: "Copper Dawn",
    colors: 6,
    install: "Click-lock",
    wear: 20,
    thickness: 5.5,
    plank: '9" × 48"',
    price: 3.39,
    boxPrice: 101.46,
    coverage: 29.93,
    img: WP + "2023/01/PL415-49CD5x-Copper-Dawn-1-scaled-1-600x450.jpg-1.webp",
  },
  {
    slug: "jungle-gray",
    collection: "Signature Deluxe",
    name: "Jungle Gray",
    colors: 2,
    install: "Click-lock",
    wear: 20,
    thickness: 6.5,
    plank: '7" × 48"',
    price: 3.49,
    boxPrice: 82.49,
    coverage: 23.64,
    img: WP + "2023/05/PL515-47JG2x-Jungle-Gray-600x450.jpg-1.webp",
  },
  {
    slug: "sandstone-path",
    collection: "Signature Longboard Series",
    name: "SandStone Path",
    colors: 2,
    install: "Click-lock",
    wear: 28,
    thickness: 7.5,
    plank: '9" × 60"',
    price: 3.85,
    boxPrice: 85.03,
    coverage: 22.09,
    img: WP + "2023/01/PL515-59SP3x-Sandstone-Path-scaled-1-600x450.jpg-1-300x300-1-1.jpg",
  },
  {
    slug: "golden-cork",
    collection: "EIR PRO Series",
    name: "Golden Cork",
    colors: 2,
    install: "Click-lock",
    wear: 28,
    thickness: 7.5,
    plank: '9" × 60"',
    price: 3.85,
    boxPrice: 99.21,
    coverage: 25.77,
    img: WP + "2023/10/EI515-59GC4x-Golden-Cork-1-scaled-1-300x225.webp",
  },
];

export const getLvpBySlug = (slug: string) => LVP.find((product) => product.slug === slug);

/** Strip WordPress thumbnail size suffix (e.g. -150x150) to request the full image. */
export const fullImg = (u: string) => u.replace(/-\d+x\d+(?=\.(jpe?g|png|webp|avif)(\.|$))/i, "");

export const PRICE_BANDS = [
  { id: "u2", label: "Under $2.00", test: (p: number) => p < 2 },
  { id: "2-3", label: "$2.00 – $2.99", test: (p: number) => p >= 2 && p < 3 },
  { id: "3-4", label: "$3.00 – $3.99", test: (p: number) => p >= 3 && p < 4 },
];

export type Filters = {
  price: string[];
  install: string[];
  wear: string[];
  thickness: string[];
  plank: string[];
  sale: boolean;
};
export const EMPTY: Filters = {
  price: [],
  install: [],
  wear: [],
  thickness: [],
  plank: [],
  sale: false,
};
export type Sort = "featured" | "price-asc" | "price-desc" | "name";

const has = (sel: string[], v: string | undefined) =>
  sel.length === 0 || (v !== undefined && sel.includes(v));

export function applyFilters(items: Lvp[], f: Filters, sort: Sort) {
  const out = items.filter(
    (p) =>
      (f.price.length === 0 ||
        f.price.some((id) => PRICE_BANDS.find((b) => b.id === id)?.test(p.price))) &&
      has(f.install, p.install) &&
      has(f.wear, p.wear?.toString()) &&
      has(f.thickness, p.thickness?.toString()) &&
      has(f.plank, p.plank) &&
      (!f.sale || (p.slug !== "driftwood" && p.salePrice !== undefined)),
  );
  if (sort === "price-asc") out.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") out.sort((a, b) => b.price - a.price);
  if (sort === "name") out.sort((a, b) => a.name.localeCompare(b.name));
  return out;
}
