# Runbook: ketl.in

**Current setup (Option C below):** ketl.in is its own GitHub Pages site in
the `kkedtech/ketl.in` repository, with copies of the India home page, `/aia`,
`/aiy` and `/gallery`. When any of those pages changes in this repository,
make the same change in `kkedtech/ketl.in` (its README lists which file maps
to which).

Options A and B are the alternative: send every ketl.in address to
**https://ketl.au/in/** with a permanent (301) redirect instead of keeping a
second copy of the pages.

## Option A: Cloudflare Redirect Rule

No code and free on every Cloudflare plan. ketl.au already runs on
Cloudflare (see `cloudflare/geo-redirect-worker.js`), so keep both domains
in the same account.

### 1. Add ketl.in to Cloudflare (skip if it's already there)

1. Cloudflare dashboard → **Add a domain** → `ketl.in` → Free plan.
2. Cloudflare shows two nameservers. At the registrar where ketl.in was
   bought, replace its nameservers with those two.
3. Wait until Cloudflare shows the domain as **Active** (usually minutes,
   occasionally up to 24 hours).

### 2. DNS records

ketl.in has no site of its own, so the records only need to exist and be
**Proxied** (orange cloud) for Cloudflare to catch the traffic.

**ketl.in → DNS → Records:**

| Type | Name | Content | Proxy status |
| --- | --- | --- | --- |
| A | `@` | `192.0.2.1` | Proxied |
| CNAME | `www` | `ketl.in` | Proxied |

`192.0.2.1` is a reserved placeholder address. It is never contacted
because the redirect rule answers first.

Remove any old A/AAAA/CNAME records for `@` or `www` that point at a
parked page or a previous host.

### 3. Redirect rule

**ketl.in → Rules → Redirect Rules → Create rule:**

- **Rule name:** `ketl.in to ketl.au/in`
- **If incoming requests match:** Custom filter expression → **Edit expression**:

  ```
  (http.host eq "ketl.in") or (http.host eq "www.ketl.in")
  ```

- **Then:** URL redirect
  - Type: **Static**
  - URL: `https://ketl.au/in/`
  - Status code: **301**
  - **Preserve query string:** ticked
- **Deploy.**

### 4. HTTPS

**ketl.in → SSL/TLS → Overview:** set the mode to **Full**.
**SSL/TLS → Edge Certificates:** turn on **Always Use HTTPS**.
Cloudflare issues the certificate for ketl.in and www.ketl.in automatically.

## Option B: registrar URL forwarding

Use this only if ketl.in can't be moved to Cloudflare. Most registrars
have a "Domain forwarding" or "URL redirect" setting:

- Forward `ketl.in` **and** `www.ketl.in` to `https://ketl.au/in/`.
- Choose **Permanent (301)**, not "masked" or "framed" forwarding, which
  hides the real address and breaks the Google Form and WhatsApp links.
- Check that the registrar supports HTTPS forwarding. Many only forward
  `http://`, so `https://ketl.in` fails with a certificate error. That is
  the main reason to prefer Option A.

## Option C: GitHub Pages copy of the India pages (current setup)

ketl.in is its own GitHub Pages site in the **`kkedtech/ketl.in`**
repository: copies of `docs/in`, `docs/aia`, `docs/aiy` and `docs/gallery`
that run from the site root (see that repo's README). Visitors stay on ketl.in rather than being redirected.
GitHub Pages allows only one custom domain per repository, which is why
ketl.in can't be served from this one.

1. `kkedtech/ketl.in` → **Settings → Pages**: Source **Deploy from a
   branch**, branch `main`, folder `/ (root)` → **Save**. Under **Custom
   domain** enter `ketl.in` → **Save**.
2. DNS at the ketl.in registrar (or Cloudflare, with the cloud **grey**):

   | Type | Name | Content |
   | --- | --- | --- |
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `kkedtech.github.io` |

3. Once the DNS check on the Pages settings screen goes green, tick
   **Enforce HTTPS** (the certificate can take up to an hour to appear).

**Keep the copies in sync:** when any of those pages changes here, make the
same change in `kkedtech/ketl.in`.

## Check it works

From any terminal:

```
curl -sI https://ketl.in            | grep -i -E "^HTTP|^location"
curl -sI https://www.ketl.in        | grep -i -E "^HTTP|^location"
curl -sI "https://ketl.in/x?a=1"    | grep -i -E "^HTTP|^location"
```

Each should show `HTTP/2 301` and a `location:` of `https://ketl.au/in/`
(the last one ending in `?a=1`). With Option C there is no redirect:
curl shows `HTTP/2 200` because ketl.in serves the page itself. Either way, just open ketl.in on a phone and
confirm it lands on the India page with the kangaroo + peacock logo.

## How it fits with the ketl.au geo-redirect

The worker in `cloudflare/geo-redirect-worker.js` only acts on the ketl.au
homepage (`/`). Visitors from ketl.in arrive straight at `/in/`, so the
worker leaves them alone. The "Not in India?" link on `/in` still takes
them to the Australian site.
