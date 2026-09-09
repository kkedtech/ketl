# KETL catalog feeds

Six feeds, three platforms, two markets. All five services, same ids across every file
so analytics line up.

| File | Platform | Market |
| --- | --- | --- |
| ketl-whatsapp-catalog-australia.csv | WhatsApp Business catalog | AU |
| ketl-whatsapp-catalog-india.csv | WhatsApp Business catalog | IN |
| ketl-meta-commerce-australia.csv | Meta Commerce (Facebook + Instagram Shop) | AU |
| ketl-meta-commerce-india.csv | Meta Commerce (Facebook + Instagram Shop) | IN |
| ketl-google-merchant-australia.csv | Google Merchant Center | AU |
| ketl-google-merchant-india.csv | Google Merchant Center | IN |

## Before you upload

**1. Host the tile images.** Every row points at
`https://ketl.au/catalog/<market>-<slug>.png` — for example
`https://ketl.au/catalog/au-1-unplugged-single-session.png`. Export the squares from
`KETL Service Tiles.dc.html`, upload them to that path, and the feeds work as written.
If you host them somewhere else, find-and-replace the `https://ketl.au/catalog/` prefix.

**2. Fix the India URLs.** India rows link to `https://ketl.au/india#…`. Publish
`KETL India.dc.html` at that path, or replace the prefix with wherever it lands.

**3. Zero-price rows.** The free webinar and the 1:1 sessions are listed at `0.00`.
Meta and Google both reject 0.00 in some catalog types. If a row is rejected, either
list it at your minimum bookable amount or drop it from the feed and keep it as a
WhatsApp quick-reply instead.

**4. Google Merchant Center caveat.** Shopping ads do not accept service listings.
This feed is included for completeness — for free listings, internal use, or any
platform that takes the Google feed shape. `google_product_category` is deliberately
omitted because Google's product taxonomy has no education-services branch;
`product_type` carries KETL's own taxonomy instead.

**5. Coding Club pricing.** The feed carries the lowest per-session price
($35 AUD / ₹600) because feeds need a single number. The range is stated in the
description and on the site.
