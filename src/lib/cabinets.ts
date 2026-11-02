import { getProduct, type CatalogProduct } from "@/lib/catalog";

export type CabinetFinish = { name: string; image?: string };
export type CabinetCollection = {
  slug: string;
  name: string;
  scene: string;
  finishes: CabinetFinish[];
};

const image = (p: CatalogProduct, index: number) => p.images[index];

function collection(
  slug: string,
  name: string,
  finishImages: Record<string, number | undefined>,
): CabinetCollection {
  const p = getProduct(slug, ["Cabinets"]);
  if (!p || !p.images[0]) throw new Error(`Missing governed Cabinet record: ${slug}`);
  const names = p.options[0]?.values ?? [];
  return {
    slug,
    name,
    scene: p.images[0],
    finishes: names.map((finish) => {
      const index = finishImages[finish];
      return { name: finish, image: index === undefined ? undefined : image(p, index) };
    }),
  };
}

export const CABINET_COLLECTIONS: CabinetCollection[] = [
  collection("brooklyn-premier-series", "Brooklyn", {
    "Bright White": 5,
    Midnight: 6,
    Slate: 7,
    Fawn: 3,
  }),
  collection("shaker-premier-series", "Shaker", {
    "Designer White": 6,
    "Designer White, Slab": 7,
    Sand: 3,
    Espresso: 2,
    Kodiak: 1,
    Moss: 5,
  }),
  collection("oslo-premier-series", "Oslo", { White: 3, Oak: 2 }),
  collection("essential-builder-series", "Builder Essential", {
    "Essential White": 3,
    "Essential Gray": 2,
  }),
];

export function getCabinetCollection(slug: string) {
  return CABINET_COLLECTIONS.find((collection) => collection.slug === slug);
}
