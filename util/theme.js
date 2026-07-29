// Dark/light toggle — the saved theme is applied pre-paint by an inline snippet
// in each page's <head>; this only wires up the button and the visit-tracker image.
(function () {
  var btn = document.querySelector('.theme-toggle');
  var img = document.getElementById('visit-img');

  function syncTrackerImg() {
    if (!img) return;
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var next = isDark ? img.getAttribute('data-src-dark') : img.getAttribute('data-src-light');
    if (next && img.getAttribute('src') !== next) img.setAttribute('src', next);
  }

  // initial — single fetch for whichever theme is active
  syncTrackerImg();

  if (btn) {
    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      if (next === 'light') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
      try { localStorage.setItem('theme', next); } catch (e) {}
      syncTrackerImg();
    });
  }
})();
