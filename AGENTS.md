<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep LVP recommendations behind the TanStack `/api/lvp-recommend` server route so catalog prompts and AI credentials never reach the browser.
- Keep shopping-cart state in the root `CartProvider` so category, product, accessory, and header quantity updates share one persisted source of truth.
- Serve LVP product details through the shared catalog PDP system; the static Colorado Spring route retains its accepted gallery/calculator and the dynamic route never duplicates that identity.
- Treat `reference/` files as read-only authority; new category/PDP routes read the trimmed snapshot `src/data/catalog.json` via `src/lib/catalog.ts` so presentation never invents facts and Codex can rebind to WooCommerce.
- Build non-LVP storefront pages from the shared `src/components/catalog.tsx` category and PDP shells so all categories stay one visual system.
- Shoppable category pages (Carpet, Hybrid, Accessories, SnapCaps) use the shared CategoryHeader/CategoryShop in src/components/category-shop.tsx with facets in src/lib/category-facets.ts — keeps every category on the LVP shopping rhythm and only data-backed filters.
- Use the shared CatalogResults window for mobile catalog pagination, resetting on filters/search/sort changes, so catalog behavior stays consistent.
- Render supplied logo asset pointers without styling transformations; keep a separately padded square favicon to preserve brand proportions.
- Keep form and cart/checkout preview limitations visible; no additional operational backend or notification systems, because the existing CRM and WooCommerce own production behavior.
