// =========================================================
// CV M. Riko Haryadi — script.js (versi baru)
// =========================================================

document.documentElement.classList.remove('no-js');

// ---------- Menu mobile (hamburger) ----------
var tombolMenu = document.getElementById('tombolMenu');
var menu = document.getElementById('menu');

function setMenu(open) {
    menu.classList.toggle('active', open);
    tombolMenu.classList.toggle('open', open);
    tombolMenu.setAttribute('aria-expanded', open ? 'true' : 'false');
}

tombolMenu.addEventListener('click', function () {
    setMenu(!menu.classList.contains('active'));
});

// Tutup menu setelah link diklik (di HP)
menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
});

// ---------- Accordion riwayat pekerjaan ----------
document.querySelectorAll('.tl-head').forEach(function (btn) {
    btn.addEventListener('click', function () {
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });
});

// ---------- Navbar: bayangan saat scroll + tombol ke atas ----------
var nav = document.getElementById('nav');
var toTop = document.getElementById('toTop');

function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle('scrolled', y > 10);
    toTop.classList.toggle('show', y > 500);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- Animasi muncul + counter + menu aktif ----------
var revealEls = document.querySelectorAll('.reveal');
var counters = document.querySelectorAll('.stat-num');
var navLinks = document.querySelectorAll('.nav-link');

function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var duration = 1200;
    var start = null;
    function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

if ('IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { revealObs.observe(el); });

    var countObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                countObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { countObs.observe(el); });

    var sectionObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var id = entry.target.id;
                navLinks.forEach(function (a) {
                    a.classList.toggle('active', a.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('section[id], footer[id]').forEach(function (s) { sectionObs.observe(s); });
} else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
    counters.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
}

// ---------- Tahun otomatis di copyright ----------
document.getElementById('tahun').textContent = new Date().getFullYear();
