import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { catalogWindow } from "@/lib/catalog-window";

export function CatalogResults<T>({
  items,
  render,
  itemKey,
  className,
}: {
  items: T[];
  render: (item: T) => ReactNode;
  itemKey: (item: T) => string;
  className: string;
}) {
  const [pages, setPages] = useState(1);
  const visible = catalogWindow(items, pages);
  return (
    <>
      <div className={className}>
        {items.map((item, i) => (
          <div
            key={itemKey(item)}
            className={`min-w-0 [&>*]:h-full [&>*]:w-full ${i >= visible.length ? "hidden sm:block" : ""}`}
          >
            {render(item)}
          </div>
        ))}
      </div>
      {visible.length < items.length && (
        <div className="mt-5 grid justify-items-center gap-2 sm:hidden">
          <p className="text-xs text-muted-foreground">
            Showing {visible.length} of {items.length}
          </p>
          <Button
            variant="outline"
            className="h-11 w-full border-gold font-bold"
            onClick={() => setPages(pages + 1)}
          >
            Load more
          </Button>
        </div>
      )}
    </>
  );
}
