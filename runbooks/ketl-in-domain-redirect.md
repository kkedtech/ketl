# Runbook: point ketl.in at ketl.au/in

Goal: anyone who types **ketl.in** or **www.ketl.in** (any path) lands on
**https://ketl.au/in/** with a permanent (301) redirect. Query strings such
as `?utm_source=...` are kept so campaign tracking still works.

| Visitor types | Lands on |
| --- | --- |
| `ketl.in` | `https://ketl.au/in/` |
| `www.ketl.in` | `https://ketl.au/in/` |
| `ketl.in/anything?utm_source=flyer` | `https://ketl.au/in/?utm_source=flyer` |

Every path goes to `/in/` because ketl.au has only one India page.

## Option A (recommended): Cloudflare Redirect Rule

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

## Check it works

From any terminal:

```
curl -sI https://ketl.in            | grep -i -E "^HTTP|^location"
curl -sI https://www.ketl.in        | grep -i -E "^HTTP|^location"
curl -sI "https://ketl.in/x?a=1"    | grep -i -E "^HTTP|^location"
```

Each should show `HTTP/2 301` and a `location:` of `https://ketl.au/in/`
(the last one ending in `?a=1`). Or just open ketl.in on a phone and
confirm it lands on the India page with the kangaroo + peacock logo.

## How it fits with the ketl.au geo-redirect

The worker in `cloudflare/geo-redirect-worker.js` only acts on the ketl.au
homepage (`/`). Visitors from ketl.in arrive straight at `/in/`, so the
worker leaves them alone. The "Not in India?" link on `/in` still takes
them to the Australian site.
