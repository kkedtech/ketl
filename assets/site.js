(function () {
  var btn = document.getElementById('backToTop');
  if (!btn) return;
  var THRESHOLD = 150;
  function onScroll() {
    btn.classList.toggle('is-visible', window.scrollY > THRESHOLD);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
