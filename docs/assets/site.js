(function () {
  // The header is sticky and its height varies (nav wraps to 2-3 rows on
  // narrow screens or larger font sizes), so reserve that much space
  // when scrolling to an in-page anchor — otherwise the header covers
  // the section heading it just jumped to.
  var header = document.querySelector('header');
  function applyScrollOffset() {
    if (!header) return;
    var h = Math.ceil(header.getBoundingClientRect().height);
    document.documentElement.style.scrollPaddingTop = (h + 16) + 'px';
  }
  applyScrollOffset();
  window.addEventListener('resize', applyScrollOffset);

  // A direct link to a hash (or a nav click) can land the browser's own
  // jump-to-fragment before this script has set the offset above —
  // re-align once it's in place so the heading is never hidden.
  function realignToHash() {
    if (!location.hash) return;
    var target = document.getElementById(location.hash.slice(1));
    // behavior:'auto' (instant) — this corrects a mis-scroll rather than
    // performing a user-facing scroll, and firing it twice (see below)
    // with the page's smooth-scroll default would otherwise race.
    if (target) target.scrollIntoView({ block: 'start', behavior: 'auto' });
  }
  requestAnimationFrame(realignToHash);
  // The header's height depends on custom webfonts (KETL's wordmark
  // font, the nav's body font); if those swap in after our first
  // measurement, the header can grow — re-measure and re-align once
  // they've actually loaded.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      applyScrollOffset();
      realignToHash();
    });
  }

  // Back-to-top button: fades in once the user has scrolled a little.
  var btn = document.getElementById('backToTop');
  if (btn) {
    var THRESHOLD = 150;
    var onScroll = function () {
      btn.classList.toggle('is-visible', window.scrollY > THRESHOLD);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
