// Well Spoken v3 — shared behavior
(function(){
  // Scroll reveal
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, {threshold:.12});
    els.forEach(function(el){ io.observe(el); });
  } else {
    els.forEach(function(el){ el.classList.add('visible'); });
  }

  // Mark current nav link
  var path = location.pathname.replace(/\/index\.html$/,'/');
  document.querySelectorAll('.nav-links a').forEach(function(a){
    var href = a.getAttribute('href');
    if (!href) return;
    var resolved = new URL(href, location.href).pathname.replace(/\/index\.html$/,'/');
    if (resolved === path) a.setAttribute('aria-current','page');
  });
})();
