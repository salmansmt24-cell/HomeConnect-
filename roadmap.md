# Roadmap

## Final coordinated correction
- [x] P0: exact supplied logos/favicon, accessible mobile navigation, remove unsupported Colorado Spring matches, preserve factual authority.
- [x] P1: shared light storefront/PDP system, mobile catalog Load more, search facets and sorting, compact utility typography.
- [x] P2: interaction/focus/error checks; render and visually inspect all 22 routes at 1440px and 390px; populated cart/checkout evidence; owner-review report.
- Stopped for owner review. Missing/conflicting catalog imagery remains honestly labeled; production integrations belong to Codex.
- No new operational backend, notifications or real transactions. Existing CRM and WooCommerce remain operational authorities; no publish/deploy/production changes.

## Done this pass
- [x] Six non-catalog pages built in the approved Home Connect design system: /about, /contact, /contractor-pricing, /cabinets/get-started, /cart (visual prototype), /checkout (visual prototype).
- [x] Six new routes wired into header/footer navigation and the cart panel (Cabinets, About, Contact, View cart, Checkout).
- [x] All six verified at 1280px and 390px: no horizontal overflow, no page errors; contact, contractor and cabinet forms each stored a real row (then deleted); cart maths and checkout confirmation checked.
- [x] Shop by Category photo tint lightened to a soft vignette; card layout, titles and descriptions unchanged; links now use the pale gold token so they stay legible on every photo.
- [x] Inquiry tables (contact_submissions, contractor_applications, cabinet_projects) with visitor insert-only access, server-side validation, and five submissions per hour per email.
- [x] Built the new ecommerce homepage at `/` with compact hero, category shopping, verified deals, LVP quick paths, SnapCaps, cabinets, contractor pricing, benefits, and project help.
- [x] Verified the homepage at 1280px and 390px with no horizontal overflow; all tests pass and the build is clean.
- [x] Preserved the approved Colorado Spring page at `/floor/colorado-spring` so `/` can become the store homepage.
- [x] AI floor finder results now show real catalog photos, square-foot and box prices, box coverage, and direct product links.
- [x] Added one persistent quantity-aware cart shared by the LVP category, Colorado Spring page, all floor pages, and accessories.
- [x] Added dedicated `/floor/:slug` pages for all 14 LVP products and connected every VIEW FLOOR link.
- [x] Final LVP polish: hero reduced another 18%, images reduced 10%, and the grid now uses readable 1/2/3-column breakpoints.
- [x] In-app AI floor finder accepts room, budget, and flooring needs and recommends only verified catalog products.
- [x] Verified at 390px, 887px, and 1280px: no horizontal overflow, one/two/three columns, compact controls, live AI result, clean console.
- [x] Hero compacted, desktop only: 441px → 328px (−26%); phone hero 605px → 441px (−27%). Same image, headline, type sizes, colors, stats, buttons, composition.
- [x] At 1280×800 the first screen now reads header → compact hero → thin benefit strip → SHOP LUXURY VINYL PLANK + quick filters → products starting at 754px
- [x] "SHOP LUXURY VINYL PLANK" spacing checked: word gaps 4/4/5px, no words merged (earlier report was a misread)
- [x] Mobile Filter/Sort bar pinned flush under the header (139px), 1 column, no sideways scroll
- [x] Desktop 3-column grid intact: 14 cards, every CTA "View floor"
- [x] Driftwood now shows its real catalog photo
- [x] Product image height +11% (aspect 6/5), spec values 12px/extrabold, card gaps 20/24px
- [x] Global overflow-x switched to clip so sticky positioning works
- [x] 6 tests pass, build OK; review screenshots in /mnt/documents/lvp-v2/
- [x] Hot Pursuit carpet page (/carpet/hot-pursuit) with inquiry flow; homepage carpet buttons link to it
- [x] Deals page (/deals) showing only confirmed sales; View All Deals points to it
- [x] Add reference authority files; build Hybrid Planks, Carpet, Accessories, SnapCaps, Cabinets, Deals + reusable PDPs (awaiting owner review)
- [x] Category system correction: Carpet, Hybrid, Accessories and SnapCaps now use one compact header + quick picks + sort + filter sidebar/drawer + grid, matching LVP.
