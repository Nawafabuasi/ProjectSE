// Nursil landing page interactions: 3D pointer tilt + scroll reveal

(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- 3D tilt on hero card ----
    var tiltWrap = document.getElementById('tiltCard');
    if (tiltWrap && !reduceMotion) {
        var bounds = null;

        var updateBounds = function () {
            bounds = tiltWrap.getBoundingClientRect();
        };
        updateBounds();
        window.addEventListener('resize', updateBounds);

        var onMove = function (clientX, clientY) {
            if (!bounds) updateBounds();
            var relX = (clientX - bounds.left) / bounds.width;
            var relY = (clientY - bounds.top) / bounds.height;
            var rotateY = (relX - 0.5) * 26;
            var rotateX = (0.5 - relY) * 22;
            tiltWrap.style.transform =
                'rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)';
        };

        var reset = function () {
            tiltWrap.style.transform = 'rotateY(0deg) rotateX(0deg)';
        };

        window.addEventListener('mousemove', function (e) {
            var heroVisual = document.querySelector('.hero-visual');
            if (!heroVisual) return;
            var rect = heroVisual.getBoundingClientRect();
            var inside =
                e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom;
            if (inside) {
                onMove(e.clientX, e.clientY);
            } else {
                reset();
            }
        });

        tiltWrap.addEventListener('mouseleave', reset);
    }

    // ---- Scroll reveal ----
    var revealEls = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window && revealEls.length) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
        );
        revealEls.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        revealEls.forEach(function (el) {
            el.classList.add('is-visible');
        });
    }

    // ---- Parallax orbs on scroll ----
    if (!reduceMotion) {
        var orbs = document.querySelectorAll('.orb');
        var ticking = false;

        window.addEventListener('scroll', function () {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(function () {
                var y = window.scrollY;
                orbs.forEach(function (orb, i) {
                    var speed = 0.05 + i * 0.03;
                    orb.style.translate = '0 ' + y * speed + 'px';
                });
                ticking = false;
            });
        });
    }
})();
