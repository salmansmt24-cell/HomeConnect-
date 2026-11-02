# Home Connect — WooCommerce staging handoff

Date: 2026-11-02

## What is ready

The updated storefront is complete as a staging presentation build. It includes the Home Connect product families, responsive collection and product pages, search, cabinet collection/finish handoff, cart/checkout/account presentation routes, inquiry validation, and local production build output.

This React build is the approved visual and interaction reference. It is **not** a WordPress theme and must not be uploaded to WordPress as one. WooCommerce remains the authority for products, variations, inventory, prices, promotions, customers, orders, tax, shipping, cart, checkout, and account data.

## Run and verify locally

Open PowerShell and run:

```powershell
Set-Location -LiteralPath 'C:\Users\USER\Documents\ChatGPT\Home Connect — Website Design & Conversion'
node node_modules/vite/bin/vite.js dev --host 127.0.0.1 --port 4180
```

Review at <http://localhost:4180/>.

Tests and production build:

```powershell
node node_modules/vitest/vitest.mjs run
node node_modules/vite/bin/vite.js build
```

## Exact staging load sequence

1. Sign in to the isolated WordPress staging site as an administrator. Confirm its URL is not the production domain, indexing is disabled, outgoing customer email is suppressed, and payment gateways are in sandbox/test mode or disabled.
2. Take a staging backup before changing the theme or plugins.
3. Install or activate WooCommerce and the existing Home Connect child theme on staging. Do not replace the child theme with the React `dist` folder.
4. Clone the current production catalog and media into staging through the normal WordPress/WooCommerce migration process. Preserve Woo product IDs, variation IDs, SKUs, slugs, categories, attributes, inventory, sale schedules, and image attachment IDs. Do not import the sample catalog in this repository as live inventory.
5. Apply the updated visual system and page templates from this staging build to the child theme in this order: global header/footer and tokens; home; category archives; search; product detail; cabinet collections and intake; SnapCaps configurator; cart; checkout; account; informational and inquiry pages.
6. Map each presentation route to WooCommerce or WordPress:
   - `/lvp`, `/carpet`, `/accessories`, `/deals` → product-category or curated Woo archive templates.
   - `/floor/{slug}`, `/carpet/{slug}`, `/product/{slug}` → Woo single-product template using the real product/variation object.
   - `/cart`, `/checkout`, `/account` → native Woo endpoints and blocks/templates.
   - `/cabinets`, the four cabinet collection pages, and `/cabinets/get-started` → WordPress pages/templates; carry both collection and finish into the submitted lead.
   - `/snapcaps` and its product flow → Woo products/variations plus compatibility fields stored as validated line-item metadata.
7. Replace the staging-only Supabase inquiry transport with the existing WordPress form/CRM/email workflow. Map cabinet `collection_interest` and `finish_interest` fields explicitly. Keep the $225 3D design fee non-refundable and not credited; keep $30 samples as a separate secondary option.
8. Configure tax, shipping zones, local pickup, transactional email, privacy/terms, and inventory behavior on staging. Keep Priority1 and any live Authorize.Net credentials disabled until separately authorized. Never place credentials in source files.
9. Validate with at least one test product per family and one variable product: archive filtering, variation selection, sale pricing, stock state, media, add-to-cart, cart quantity updates, coupons, tax, shipping/pickup, checkout validation, test payment, confirmation email, order creation, account history, cabinet lead, and SnapCaps metadata.
10. Repeat desktop and mobile visual QA on the staging URL. Confirm no production URLs receive writes and no production order is created.
11. Export a staging backup and a release manifest listing the child-theme files, plugin/version changes, database migrations, Woo settings, and verification results. Production deployment requires a separate explicit go-live approval.

## Field handoff

Cabinet project submissions now support:

- `collection_interest`
- `finish_interest`

For the staging Supabase prototype, apply `supabase/migrations/20261102170000_add_cabinet_finish_interest.sql`. In WooCommerce/WordPress, map these fields to the approved form/CRM destination instead of retaining Supabase as the runtime.

## One access item still needed

Provide an authenticated **administrator session for the isolated WordPress/WooCommerce staging site with theme and plugin upload/activation permission**. That single staging-only access item is sufficient to begin the real Woo catalog binding and child-theme installation; Hostinger, SSH, and production credentials are not required for this step.

