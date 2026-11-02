export const CATALOG_PAGE_SIZE = 6;
export function catalogWindow<T>(items: T[], pages: number) {
  return items.slice(0, CATALOG_PAGE_SIZE * Math.max(1, pages));
}
