(function () {
    function setMenuState(toggle, menu, isOpen) {
        toggle.setAttribute('aria-expanded', String(isOpen));
        menu.classList.toggle('nav-menu--open', isOpen);
    }

    function initMobileMenu() {
        var toggle = document.querySelector('.nav-toggle');
        var menu = document.getElementById('nav-menu');

        if (!toggle || !menu) {
            return;
        }

        toggle.addEventListener('click', function () {
            var isOpen = toggle.getAttribute('aria-expanded') === 'true';
            setMenuState(toggle, menu, !isOpen);
        });

        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                setMenuState(toggle, menu, false);
            });
        });
    }

    function initDropdowns() {
        document.querySelectorAll('.nav-dropdown-label').forEach(function (button) {
            button.addEventListener('click', function () {
                var parent = button.closest('.nav-dropdown');
                if (!parent) {
                    return;
                }

                var isExpanded = button.getAttribute('aria-expanded') === 'true';
                button.setAttribute('aria-expanded', String(!isExpanded));
                parent.classList.toggle('nav-dropdown--open', !isExpanded);
            });
        });
    }

    function buildTelephoneUri(phoneNumber) {
        var digits = phoneNumber.replace(/\D+/g, '');

        if (!digits) {
            return '';
        }

        if (digits.charAt(0) === '0') {
            return '+33' + digits.slice(1);
        }

        if (digits.indexOf('33') === 0) {
            return '+' + digits;
        }

        return '+' + digits;
    }

    function initPhoneReveal() {
        document.querySelectorAll('.phone-reveal').forEach(function (button) {
            button.addEventListener('click', function () {
                var phoneNumber = button.getAttribute('data-phone');
                if (!phoneNumber) {
                    return;
                }

                var link = document.createElement('a');
                link.href = 'tel:' + buildTelephoneUri(phoneNumber);
                link.textContent = phoneNumber;
                button.replaceWith(link);
            }, { once: true });
        });
    }

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (event) {
                var href = anchor.getAttribute('href');
                if (!href || href.length <= 1) {
                    return;
                }

                var target = document.getElementById(href.slice(1));
                if (!target) {
                    return;
                }

                event.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    function initSite() {
        initMobileMenu();
        initDropdowns();
        initPhoneReveal();
        initSmoothScroll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSite, { once: true });
    } else {
        initSite();
    }
})();