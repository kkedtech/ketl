# WhatsApp landing page design

_Started 2026-09-08 18:05 UTC_

---

## User

Similar to the attached files but a better design, a better landing page, other pages and service catalog files for WhatsApp and other digital platforms

## User

Similar to the attached files but a better design, a better landing page, other pages and service catalog files for WhatsApp and other digital platforms

## Assistant

I'll read the attached files first.

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

Read the landing page, both catalogues and both CSVs. Before building, a few calls that change the shape of the work.

_[tool: ask_user]_

Form's up — waiting on your answers, particularly the page list, which catalog files you need, and any real WhatsApp/booking links.

## User

Answered — Asked for follow-up questions; pages: Programs / the pathway, Individual service detail pages, For schools, Pricing & plans, About the method, Book / enquire, FAQ for parents, Free parent webinar signup; catalog_files: WhatsApp Business catalog CSV, Meta Commerce (Facebook/Instagram) CSV, Google Merchant Center CSV, WhatsApp broadcast / message copy blocks, A printable one-page service menu (PDF-ready), Square 1080…; markets: Both, with a switcher; services: Keep the same 5; audience: Both equally; copy: Keep verbatim; contact: https://wa.me/61470110227, info@ketl.au, https://ketl.…

## Assistant



## Assistant

_[tool: ask_user]_

Follow-up round is up — site structure, the AU/India switch, and what the Book button does.

## User

Answered — Asked for follow-up questions; nav_model: One long scrolling page; market_switch: Two separate landing pages; booking: WhatsApp deep link with prefilled message

## Assistant



## Assistant

_[tool: ask_user]_

Round three is up — scroll order, tile treatment, and any extras. Then I build.

## User

Answered — Asked for follow-up questions; page_order: Hero first, The five services high up; tiles_style: Redesign with the artwork bigger; extras: Testimonials / parent quotes, Trust row (schools, years running), A short pathway diagram, Comparison table of the 5 services, Sticky WhatsApp button

## Assistant



## Assistant

_[tool: ask_user]_

Waiting on the trust-row facts and comparison-table rows — then I build the whole set.

## User

Answered — Asked for follow-up questions; trust_facts: 10+ years practice, Programs successfully running in multiple progressive Community-Centric independent schools in Sydney.; comparison_axes: What they walk away with

## Assistant



## Assistant

_[tool: ask_user]_

Last round is up — the comparison format, testimonials, and webinar timing. I'll build straight through after this.

## User

Answered — testimonials: Use the school-programs fact instead

## Assistant

_[tool: list_files]_

_[tool: update_todos]_

_[tool: read_file]_

_[tool: grep]_

Building the AU landing page now (core deliverable), then deriving the India page from it.

_[tool: dc_write]_

_[tool: dc_html_str_replace]_

_[tool: show_html]_

_[tool: read_file]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: dc_write]_

_[tool: dc_html_str_replace]_

_[tool: copy_starter_component]_

_[tool: dc_write]_

_[tool: update_todos]_

_[tool: ready_for_verification]_

Built on the Organic system, out for review:

**Pages** — `KETL Australia.dc.html` and `KETL India.dc.html`: one long scroll each with hero, the five services high up, pathway, outcomes, full detail blocks per service (anchored to match the feed links), pricing table, method, schools, FAQ, webinar signup, book, sticky WhatsApp button. Every CTA is a WhatsApp deep link with a prefilled message. Tweaks let you change the WhatsApp number across all links at once, hide prices, or drop the sticky button.

**`KETL Service Tiles.dc.html`** — ten 1080×1080 squares, artwork full-bleed, filenames matching the feeds.

**`KETL Service Menu.dc.html`** — two-page printable menu (AU + India), ready for PDF export.

**`catalog/`** — WhatsApp Business, Meta Commerce and Google Merchant CSVs for both markets, plus nine WhatsApp copy blocks and a README.

Two things need your hand: upload the tile PNGs to `ketl.au/catalog/` (or find-and-replace that prefix in the feeds), and publish the India page at `ketl.au/india`. Both flagged in `catalog/README.md`, along with why the zero-price rows may get rejected.

## User

KETL Service Tiles - the image of the kangaroo logo is not showing the legs of the kangaroo. Probably the HTML file needs to be updated to resize the image to be visible fully.

## Assistant

_[tool: grep]_

_[tool: run_script]_

_[tool: ready_for_verification]_

The artwork now sits fully inside each tile — switched from a cropping fill to a contained fit on a light peach ground, with a slightly taller image band and the title, subtitle and price pill scaled down to keep everything inside the 1080 square. Applied to all ten tiles.

## User

Found issues — fixing…

## Assistant

_[tool: run_script]_

_[tool: ready_for_verification]_

Both fixed: price pills now hold their full height on one line (`flex:none`, `nowrap`, 42px), and the header wordmark dropped to 30px with `nowrap` so "Labs" fits beside `ketl.au`.

