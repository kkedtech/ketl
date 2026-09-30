# Runbook: Temporarily taking sensitive static content offline

First used: 2026-09-30 for `/gallery` (Coding Club photos of children).
Takedown commit: `b0b7cb2`.

## Why this needs a runbook
ketl.au is static hosting (GitHub Pages behind Cloudflare). There is no login or
access control. Hiding a page does NOT hide the files it links to: anything under
`docs/` is publicly fetchable by direct URL, and crawlers/AI scrapers can find
it. The only true "off switch" is to stop publishing the files.

## Takedown procedure (what we did)
1. `git rm` the sensitive files from the published tree (`docs/uploads/<folder>/*`).
2. Replace the page with a placeholder that keeps header/nav/footer, has
   `<meta name="robots" content="noindex">`, and references no removed files.
3. Add `docs/robots.txt` disallowing the page and the asset folder
   (honour-system only; stops compliant crawlers, not hostile ones).
4. Push to `main`. Allow a few minutes for the GitHub CDN to drop cached copies.

Nothing is destroyed: everything remains in git history.

## Restore procedure
- Full restore: `git revert b0b7cb2` and push.
- Partial restore (e.g. only reviewed/approved photos): revert, then `git rm`
  only the images that failed review, then push.
- Remove the `Disallow` lines from `docs/robots.txt` when the page is live again.

## Known limits
- Cannot purge copies already in Google/Bing caches, Wayback Machine, or
  downloaded by others. Use each provider's removal tool if needed.
- Anything in git history stays readable by anyone with repo access; if the
  repo is public, historical photo URLs on raw.githubusercontent.com may still
  resolve. Consider making the repo private, or rewriting history, if photos
  must be truly unrecoverable.
- robots.txt does not stop scrapers that ignore it.

## Planned improvement: dev / test / main flow
Goal: review sensitive content before it ever reaches production.
- `main` = production (ketl.au). Only reviewed content merges here.
- `dev` / `test` branches (or PR preview deploys) hold unreviewed content.
  Serve them from a non-indexed, access-controlled URL, e.g. a separate
  Cloudflare Pages project or a Cloudflare Access-protected subdomain such as
  `test.ketl.au`, with `X-Robots-Tag: noindex`.
- Content checklist before merge to `main`:
  - [ ] Parent/guardian consent confirmed for every photo
  - [ ] No names, uniforms, school logos, or location cues visible
  - [ ] Filenames and EXIF stripped (GPS, device, timestamps)
  - [ ] Images downscaled/watermarked to reduce reuse value
  - [ ] `robots.txt` / `noindex` policy decided for the page
- Option for stronger protection: put `/gallery` behind Cloudflare Access
  (login required) so files can stay deployed but are not publicly scrapeable.
  Needs Cloudflare dashboard setup by the site owner.
- Consider adding AI-crawler blocks (GPTBot, CCBot, Google-Extended, etc.) in
  `robots.txt` and Cloudflare "Block AI bots" rule.

## Open items
- The repo root also contains legacy copies (`index.html`, `aia/`, `aiy/`,
  `india/`, `uploads/`). Confirm which folder GitHub Pages actually publishes
  (root vs `/docs`); root `india/` was not renamed to `/in` and may be stale.
  No photos exist outside `docs/` in the current tree.
