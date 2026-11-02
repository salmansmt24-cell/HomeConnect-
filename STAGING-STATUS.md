# Home Connect staging status

Date: 2026-11-02

## Scope and safety

- Work is limited to this local staging project.
- No Hostinger retrieval, SSH, password request, production change, or publication was performed.
- The production site and canonical WooCommerce data remain untouched.

## Completed design work

- Restored the latest verified storefront source into this staging workspace.
- Completed responsive home, collection, search, product, cabinet, inquiry, cart, checkout, and account presentation routes.
- Corrected mobile hero clipping.
- Added cabinet collection links and collection/finish context through the cabinet intake flow.
- Expanded search intent matching across product families.
- Removed 51 corrupt, unreferenced recovery artifacts so invalid media cannot enter a deployment package.
- Removed prototype language from the footer.
- Ensured one semantic H1 per product detail page.
- Added the cabinet finish field to validation, persistence types, tests, and migration.

## Verification

- Automated tests: passing.
- Production build: passing.
- Mobile route audit: no horizontal overflow or broken displayed images on the reviewed routes.
- Desktop and final regression status should be recorded after the final browser pass.

## Known build advisories

- TanStack reports a deprecated `createServerFn().inputValidator()` API that should be modernized in a future dependency upgrade.
- The production build reports a large main JavaScript chunk; route-level splitting is a later performance optimization, not a functional blocker.
- `vite-tsconfig-paths` reports that newer Vite versions provide native path support; cleanup can be scheduled separately.

## WooCommerce boundary

The local catalog is presentation data only. Real products, variations, SKUs, inventory, prices, promotions, customers, orders, tax, shipping, payment, cart, checkout, and account state must come from WooCommerce on the isolated staging site.

See `WOOCOMMERCE-LAUNCH-HANDOFF.md` for the exact load sequence and the single required access item.

## Verification

- Vitest: 9 files passed, 35 tests passed.
- Production build: passed.
- Responsive browser QA: 18 desktop routes and 9 mobile routes checked; no horizontal overflow or broken displayed images, and one visible H1 per tested page.
- ESLint: no errors; 11 existing Fast Refresh export-structure warnings remain.
