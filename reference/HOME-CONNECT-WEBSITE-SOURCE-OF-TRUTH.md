# Home Connect website source of truth for Lovable

Status: **READ-ONLY-DERIVED REFERENCE — OWNER REVIEW REQUIRED**  
Prepared: 6 October 2026  
Lovable repository target after owner approval: `progreemcompany5-cell/pixel-perfect`, branch `main`  
This task did not push, publish, deploy or change either repository's runtime.

> **LOVABLE MAY INVENT PRESENTATION. LOVABLE MAY NOT INVENT BUSINESS FACTS.**

Lovable may create layout, visual hierarchy, typography treatment, spacing, cards, responsive composition and decorative presentation. Lovable may not invent products, prices, regular prices, sale prices, discounts, product specifications, availability, compatibility, shipping promises, lead times, warranty facts, installation services or product photography presented as an actual product.

If real product photography is unavailable, Lovable may use lifestyle imagery only when it is clearly treated as illustrative and is not presented as the authoritative image of a named product, color or finish.

## 1. Identity and storefront purpose

Home Connect is a Raleigh-based showroom, warehouse and online materials store for flooring, carpet, cabinets, SnapCaps/stair products and floor accessories. It serves homeowners and trade professionals locally and sells supported products online beyond the Raleigh market.

The storefront exists to help customers discover real products, compare governed facts, choose legitimate options, calculate material where supported, and enter the existing WordPress/WooCommerce buying path. It is not a brochure-only site and must not create a parallel catalog, cart, checkout, pricing engine, inventory system or customer database.

Verified contact facts:

- Address: 8816 Running Oak Dr, Unit D, Raleigh, NC 27617.
- Phone: +1 984 200 9893.
- Email: info@homeconnect.shop.
- Public hours are not verified. Use `Please call before visiting`; do not invent hours or response times.

## 2. Approved navigation and categories

Primary navigation:

1. Flooring — `/lvp/`
   - LVP — `/lvp/`
   - Hybrid Wood Planks — `/product-category/hybrid-planks/`
2. Carpet — `/carpet/`
3. Cabinets — `/cabinets/`
4. SnapCaps — `/snap-caps/`
5. Accessories — `/floor-accessories/`
6. Deals — `/deals/`
7. About — `/about/`
8. Contact — `/contact/`

Only Flooring has a primary-navigation dropdown. Current supporting destinations include Contractor Pricing, Kitchen & Bath Design, samples, shipping, returns, account, reviews and blog, but these must not displace the approved primary structure.

Approved merchandise families are LVP, Hybrid Wood Plank, Carpet, the four current cabinet collections, SnapCaps/stair products and Accessories. Roofing is not sold.

## 3. Current storefront product/category structure

The accompanying JSON is a governed design snapshot derived from 138 products returned by the current public WooCommerce Store API and current project governance. It exports 116 storefront-relevant products across 18 Woo category terms:

| Storefront group | Exported products |
|---|---:|
| LVP | 77 |
| Hybrid Wood Plank | 12 |
| Carpet | 11 |
| Cabinets | 4 |
| SnapCaps | 3 |
| Accessories | 9 |
| **Total** | **116** |

The export deliberately excludes Napa, four owner-retired flooring colorways, two legacy floor-sample records, and 15 unclassified display/sample/legacy records. The exported count is a snapshot, not a design target. WooCommerce remains authoritative when membership changes.

The accepted isolated LVP proof displayed six eligible fixture products. That remains valid proof evidence for the local proof environment; it is not the full current public-catalog count.

## 4. Current cabinet collections

Only these collections are current:

- Brooklyn — finishes currently verified in Home Connect: Bright White, Midnight, Modern Gray, Slate and Fawn.
- Shaker — Designer White, Designer White Slab, Sand, Espresso, Kodiak and Moss.
- Oslo — White and Oak.
- Builder Essential — Essential White and Essential Gray.

Napa is discontinued and must not appear in current merchandising, even though a legacy public Woo record still exists.

Do not market the offer as `custom cabinets`. Home Connect offers cabinet products, paid design help and project intake. Full cabinet pricing is not represented by the $30 door-sample products.

## 5. Flooring, LVP, Hybrid and Carpet merchandising

### LVP

- Merchandise real Woo products under their governed collections; do not copy Lovable prototype products.
- Category cards may group colors under a collection, but each selected color retains its real product identity, destination, price and imagery.
- Driftwood is presentation-grouped under Luxfloor Plus, while its Woo category assignment remains unresolved and must not be rewritten from this reference.
- Wear layer, thickness and plank dimensions may be shown only where the JSON carries a supported value.
- Glue Down is a supported installation classification only for the explicit Glue Down category. Other installation values may appear as product facts when supported, but must not be turned into a normalized storefront filter merely because prose mentions them.
- Box coverage is unknown through the public API for most LVP records. Do not calculate or guess it. Colorado Spring's accepted governed coverage is 28.68 sq ft per box.

### Hybrid Wood Plank

- Approved direction: `REAL WOOD. WATERPROOF CORE.` Use benefit-led merchandising, with technical detail on category and product pages.
- Manufacturer facts and imagery require an exact Home Connect product/color mapping. Never fuzzy-match.
- SuperOak Plus-specific facts, including 0.6 mm true-wood veneer and mineral core, must not be assigned to SuperOak Select products.
- Light Canoy/Light Canopy identity and Empire/Parliament manufacturer mapping remain unresolved.

### Carpet

- There are 11 governed carpet styles. A style is generally a Woo variable product with governed color variations.
- Carpet is sold by the square yard in WooCommerce and may be displayed per square foot using the verified 9 sq ft = 1 sq yd conversion.
- Tracker remains visible only as `PRICE COMING SOON`; its stored calculated price is invalid and must not drive a calculator, quantity or Add to Cart.
- Hot Pursuit's current verified customer price is $1.09/sq ft ($9.81/sq yd). Current Woo also reports $1.39/sq ft ($12.51/sq yd) as the regular value; this may be displayed only while the Woo runtime confirms an active sale. Never hard-code the crossed-out price from this document.
- Hot Pursuit has 18 governed Woo colors while the current manufacturer record lists 12. Cameo, Sandlot, Bronzite, Fossil, Taupe and Barnwood remain manufacturer-unresolved; do not delete or relabel them.
- Official room scenes may be used only for the mapped style/color state they actually support. A style-level scene is not proof of a unique scene for every color.

## 6. SnapCaps and stair-product rules

- SnapCaps compatibility must be verified. Not every LVP works, and no universal compatibility matrix currently exists.
- Customers may ship or drop off compatible material where supported by the governed product workflow.
- Typical fabrication is under seven days after compatible material is received. This is a fabrication statement, not a shipping/delivery promise.
- Finished supported products can ship within the USA through normal checkout shipping.
- SnapCaps minimum quantity is 2. Do not extend that minimum to Full Treads without evidence.
- Material guidance: generally one compatible plank per Stair Cap, two per Full Tread, plus two extra planks once per fabrication order, as governed by the current product flow.
- Full Tread Sample is $40 and refundable against the first qualifying stair order.
- Two separate Floor Accessories records named Full Tread (Woo IDs 17782 and 17068) remain unresolved. Do not merge, rename or present them as extra options without a catalog-authority decision.
- Do not use stock stair photography as evidence of a Home Connect finished installation. Product renders are acceptable when accurately labeled.

## 7. Accessories rules

- Accessories may include transitions, stair components, underlayment, carpet pad and other project essentials actually present in WooCommerce.
- A matching accessory may be shown only when compatibility is explicitly verified. Name similarity, shared color wording or a Lovable prototype relationship is not proof.
- The accepted Colorado Spring proof found no published compatible accessory match. Show an honest no-match/help state unless Woo authority later supplies one.
- T Molding exposes governed finish names but lacks a verified exact image for each finish. Do not imply that a generic gallery image is the selected finish.
- Accessory pricing units are not consistently reliable in the public Store API. Use runtime Woo presentation or mark the unit unknown.

## 8. Deals and sale-state rules

- Sale badges, regular prices, crossed-out prices and savings claims appear only when current WooCommerce data supports them.
- Colorado Spring / EMPIRE 402 currently reports $57.07 per 28.68 sq ft box, derived as $1.99/sq ft, with Woo regular price $71.41 per box / $2.49 per sq ft. Bind this state to Woo at runtime; do not encode it as permanent Lovable data.
- Driftwood must not receive sale treatment unless authoritative current Woo data proves it. The 6 October public Store API snapshot does report $74.70 current versus $94.89 regular per box, but the image/category authority is conflicted. Lovable must still bind the sale state to runtime Woo data rather than hard-coding it.
- Hot Pursuit current price is $1.09/sq ft. A regular/crossed-out price is allowed only when current Woo runtime continues to prove it.
- Never restore `SAVE 20–40%`, Price Match Guarantee or Price Match + Extra 5%.
- Do not manufacture discount percentages or promotion end dates.

## 9. Contractor pricing

- Contractor/bulk pricing is application- and approval-based.
- Submitting an application does not automatically grant special pricing.
- Approved logged-in accounts may receive explicitly configured special prices where available.
- Do not use `Trade Plus`.
- Do not invent discount percentages, automatic eligibility or guaranteed approval.
- The website-to-CRM application handoff is not fully verified. Lovable may design the form and its states, but must not imply that an unverified CRM submission occurred.

## 10. Cabinet project and design rules

- Cabinet 3D design service: $225.
- The $225 fee is nonrefundable and is not credited toward a cabinet purchase.
- The paid service may design/customize the customer's space; this does not make the cabinets `custom cabinets`.
- In-home takeoffs cost extra.
- Current governed lead-time wording is typically 2–3 weeks. Do not convert this into a guaranteed completion or delivery date.
- Home Connect does not currently install cabinets.
- The project-intake form may be designed, but no CRM delivery or lead creation may be claimed until the existing handoff is verified.

## 11. Samples

- Current cabinet door/finish sample: $30, shipping included, refunded if cabinets are purchased.
- The four current collection-specific Woo sample records are the legitimate ecommerce next step; they are not full cabinet prices.
- Legacy `Cabinet Doors` ($35) and `Cabinet Sample Bags` ($200) records conflict with the current policy and are excluded from this package.
- Full Tread Sample: $40, refundable against the first qualifying stair order.
- Do not claim free sample shipping generally. The included-shipping statement applies only where explicitly governed, such as the current $30 cabinet sample policy.

## 12. Pickup, delivery and shipping wording

Defensible wording:

- `Shipping is calculated at checkout where available.`
- `Home Connect ships supported products throughout the United States.`
- `Pickup at our Raleigh showroom` may be shown only when WooCommerce offers a pickup method for the current cart.
- If no pickup method or delivery rate exists, show the honest unavailable/calculated-at-checkout state.

Priority1 freight quoting remains disabled/unapproved. Do not promise a freight rate, free shipping, delivery timing, carrier, shipment or availability. Never restore `98% of orders ship within 24 hours`.

## 13. Installation and service-area rules

- Home Connect is materials-first and does not currently provide flooring, carpet or cabinet installation.
- Independent flooring installers may be available by referral in Raleigh, Cary, Apex, Garner and Wake County.
- Referred installers are independent, are not Home Connect employees, and availability varies.
- Do not represent the referral area as a Home Connect installation territory.
- Do not invent broader service areas.

## 14. Contact and showroom facts

- Raleigh showroom and warehouse: 8816 Running Oak Dr, Unit D, Raleigh, NC 27617.
- Phone: +1 984 200 9893.
- Email: info@homeconnect.shop.
- Use `Please call before visiting` until owner-confirmed hours exist.
- The Contact form may be designed around flooring, carpet, cabinets, SnapCaps, accessories and existing-order questions. Do not invent routing, response-time promises or CRM completion.

## 15. Current approved claims

These are defensible within their stated boundaries:

- Raleigh-based showroom, warehouse and online materials store.
- Flooring, carpet, cabinets, stair products and floor accessories.
- Shop supported products online beyond the Raleigh market / shipping throughout the USA where supported.
- Materials-first product guidance.
- Independent installer referrals may be available locally, with the required independence disclaimer.
- In-house SnapCaps fabrication.
- Paid cabinet 3D design service.
- Current authoritative product prices, specifications, imagery and sale states only when supplied by Woo/governed records.

## 16. Retired and prohibited claims/terminology

Never use or restore:

- `98% of orders ship within 24 hours`.
- `SAVE 20–40%`.
- Price Match Guarantee.
- Price Match + Extra 5%.
- Trade Plus.
- Free cabinet design.
- Free sample shipping as a general claim.
- Home Connect flooring, carpet or cabinet installation.
- Roofing sales.
- `Custom cabinets` as the cabinet product description.
- Raleigh-only fulfillment.
- Invented hours, response times, warranties, ratings, reviews, service areas, shipping rates, delivery times or availability.
- Prototype-only products, prices, accessories, galleries or calculator results.

## 17. Product-data authority hierarchy

Use this order when facts conflict:

1. Explicit current owner decisions.
2. Current Home Connect project governance and accepted proof findings.
3. Current public WooCommerce/Home Connect product records and transactional behavior.
4. Verified manufacturer sources with an exact Home Connect identity mapping.
5. Historical records, only as conflict evidence—not as current truth.

Lovable prototypes and mockups are never product authority. This package is read-only-derived reference material and must not become a second operational catalog. Codex must reconnect designs to WooCommerce at implementation time.

## 18. Image and placeholder rules

- Use current Woo product images where the product/color mapping is trustworthy.
- Do not borrow an image from a sibling product, collection or manufacturer page merely because it looks similar.
- Do not enhance, generate or substitute a named product image to manufacture parity.
- If imagery is missing, use an explicit neutral placeholder such as `Image coming soon`.
- Lifestyle imagery may support a category or editorial composition only when clearly illustrative.
- Driftwood imagery is withheld from the JSON export because the accepted proof and current public record conflict over usable authority.
- Several Carpet records have known weak or cross-style mappings; the JSON flags these records.

## 19. Unknown and unverified data

- Use JSON `null`, an explicit status, or customer-facing omission.
- Never convert `null` into a plausible value.
- Never infer specifications from a category name, filename, visual appearance or neighboring product.
- Unknown price means no sale badge, calculator, total or purchase CTA that depends on that price.
- Unknown unit means do not append `/ box`, `/ piece`, `/ sq ft` or similar.
- Unknown compatibility means `Needs review`, not `Compatible`.
- Unknown availability means do not say `In stock`, `Ready to ship` or give a delivery date merely because a product page exists.

## 20. Lovable design role versus WooCommerce runtime role

Lovable is the approved presentation/design source. It may design the remaining storefront as one coherent desktop/mobile system using the approved Colorado Spring PDP, accepted LVP category pattern and owner-approved homepage language as template references.

WordPress/WooCommerce remains authoritative for products, collections, prices, sale states, coverage, specifications, variations, imagery, availability, routing, calculators, cart, tax, payment, shipping, accounts, orders and checkout. The real checkout must remain a WooCommerce implementation. Lovable may visually design Cart/Checkout, but may not define the final tax, payment, Priority1, cart, order or checkout behavior.

## Structured package validation

File: `PROJECT-CONTEXT/LOVABLE/home-connect-storefront-catalog.json`

- JSON syntax: validated locally.
- Public Woo records inspected: 138.
- Exported governed products: 116.
- Exported Woo category terms: 18.
- Products missing usable authoritative imagery: 1 (Driftwood, withheld pending reconciliation).
- Products with unknown effective price: 1 (Tracker).
- Products with unknown pricing unit: 9 (Accessories).
- Products with unknown or partial relevant specifications: 36.
- Credentials/secrets included: none detected.
- Customer/private CRM data included: none.

## Conflicts encountered

1. Public Woo still returns discontinued Napa and four owner-retired flooring colorways. They are excluded by current governance.
2. Public Woo returns a Driftwood image and sale state, while the accepted local LVP proof found no usable Driftwood image. The package withholds the image, records the current runtime sale evidence, and requires reconciliation before Lovable treats the image as authoritative.
3. Public Woo proves a current Hot Pursuit regular/current pair, while governance warns against invented crossed-out pricing. The pair is recorded with a runtime-binding rule; it is not a permanent marketing claim.
4. Tracker is published with an invalid stored pricing/unit result. Its customer price remains withheld.
5. Woo exposes two separate Full Tread records whose distinction is unresolved.
6. The local accepted LVP proof had six eligible fixture products; the current public export has a broader catalog. The counts describe different environments.
7. Installation data is not normalized across LVP. Only explicit Glue Down categorization is filter-safe in this package.
8. Woo category counts and returned membership disagree in places, notably the discontinued fifth Cabinet record.

## Material unresolved gaps for Lovable

- Driftwood image authority and Woo category assignment.
- Coverage per box for most LVP products in the public Store API.
- Tracker price.
- Exact accessory compatibility for most flooring products.
- A governed SnapCaps compatibility matrix.
- Full Tread duplicate/distinction decision.
- Light Canoy/Light Canopy and Empire/Parliament manufacturer mappings.
- Palmetto II/III manufacturer mapping and several Carpet image-quality/identity issues.
- Consistent Accessories pricing units.
- Priority1 delivery rates and delivery-time facts.
- Verified public showroom hours.
- Verified website-to-CRM contact, contractor and cabinet-lead handoffs.

## Provenance

Primary sources used:

- Current public Home Connect WooCommerce Store API, read-only on 6 October 2026.
- `PROJECT-CONTEXT/MASTER-SPEC.md`.
- `PROJECT-CONTEXT/BUSINESS-RULES.md`.
- `PROJECT-CONTEXT/CATALOG-AUTHORITY.md`.
- `PROJECT-CONTEXT/OWNER-DECISIONS.md`.
- `PROJECT-CONTEXT/KNOWN-ISSUES.md`.
- `PROJECT-CONTEXT/CABINETS-KCD-ASSET-RECONCILIATION-2026-10-06.md`.
- `PROJECT-CONTEXT/CARPET-RECONCILIATION-2026-10-06.md`.
- `PROJECT-CONTEXT/CARPET-FACE-WEIGHT-RECONCILIATION-2026-10-06.md`.
- Accepted Colorado Spring and LVP proof evidence under `PROJECT-CONTEXT/OWNER-REVIEW-EVIDENCE/2026-10-06/`.

This reference must be owner-reviewed before copying into Lovable. After approval, copy both files unchanged into the Lovable repository, instruct Lovable to treat them as read-only authority, and require it to return designs without publishing.
