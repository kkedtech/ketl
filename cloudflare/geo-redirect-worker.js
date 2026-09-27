/**
 * Cloudflare Worker: route ketl.au visitors by country.
 *
 * - India (cf.country === 'IN') visiting the homepage -> redirected to /in/
 * - Everyone else -> served the normal Australia homepage, untouched
 * - Only the exact homepage path ("/") is affected; every other URL
 *   (e.g. /aia, /gallery, /camps, static assets) passes straight through.
 * - A visitor's explicit choice is remembered for a year via a
 *   ketl_region cookie, and can be forced with ?region=in or ?region=au
 *   (used by the "Not in India?" link on /in and for manual testing).
 *
 * Deploy: Cloudflare dashboard -> Workers & Pages -> Create Worker ->
 * paste this file -> Deploy. Then on the ketl.au zone: Workers Routes ->
 * add route "ketl.au/*" pointing at this worker.
 */

const REGION_COOKIE = 'ketl_region';
const ONE_YEAR = 60 * 60 * 24 * 365;

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname !== '/') {
      return fetch(request);
    }

    const forced = url.searchParams.get('region');
    if (forced === 'in') {
      return withRegionCookie(Response.redirect(`${url.origin}/in/`, 302), 'in');
    }
    if (forced === 'au') {
      return withRegionCookie(await fetch(request), 'au');
    }

    const cookieHeader = request.headers.get('Cookie') || '';
    const remembered = cookieHeader.match(/(?:^|;\s*)ketl_region=(in|au)/);
    if (remembered) {
      return remembered[1] === 'in'
        ? Response.redirect(`${url.origin}/in/`, 302)
        : fetch(request);
    }

    const country = request.cf ? request.cf.country : null;
    if (country === 'IN') {
      return withRegionCookie(Response.redirect(`${url.origin}/in/`, 302), 'in');
    }

    return fetch(request);
  },
};

function withRegionCookie(response, region) {
  const res = new Response(response.body, response);
  res.headers.append(
    'Set-Cookie',
    `${REGION_COOKIE}=${region}; Max-Age=${ONE_YEAR}; Path=/; Secure; SameSite=Lax`
  );
  return res;
}
