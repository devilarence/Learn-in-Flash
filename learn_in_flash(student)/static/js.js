document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const scrollElements = document.querySelectorAll(".scroll-animate");
    const stats = document.querySelectorAll('.stat-box');

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        header.style.background = currentScroll > 50 ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = currentScroll > 50 ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none';
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Handle dropdowns
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const menu = this.nextElementSibling;
            const isMobile = window.innerWidth <= 768;

            if (isMobile) {
                // Close other dropdowns
                dropdownToggles.forEach(otherToggle => {
                    if (otherToggle !== this) {
                        otherToggle.nextElementSibling.classList.remove('active');
                    }
                });
                menu.classList.toggle('active');
            }
        });
    });

    // Close all dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown') && !e.target.closest('.mobile-menu-btn') && !e.target.closest('.nav-links')) {
            dropdowns.forEach(dropdown => {
                const menu = dropdown.querySelector('.dropdown-menu');
                const toggle = dropdown.querySelector('.dropdown-toggle');
                menu?.classList.remove('active', 'd-none');
                toggle?.setAttribute('aria-expanded', 'false');
                toggle?.querySelector('i')?.style && (toggle.querySelector('i').style.transform = 'rotate(0deg)');
            });
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, { threshold: 0, rootMargin: '0px 0px 50px 0px' });

    images.forEach(img => imageObserver.observe(img));

    // Button animation on click
    document.querySelectorAll('.primary-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            setTimeout(() => {
                window.location.href = this.href;
            }, 1000);
        });
    });

    // Animate stats on scroll
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('animate');
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statObserver.observe(stat));

    // Search button
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            alert('Search feature coming soon!');
        });
    }

    // Element animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.element, .stat-item');
        elements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.8) {
                el.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Button tap effect
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', function () {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => this.style.transform = '', 200);
        });
    });

    // Scroll-triggered animation
    const elementInView = (el, offset = 100) =>
        el.getBoundingClientRect().top <= window.innerHeight - offset;

    const handleScrollAnimation = () => {
        scrollElements.forEach(el => {
            elementInView(el) ? el.classList.add("visible") : el.classList.remove("visible");
        });

        const triggerBottom = window.innerHeight * 0.8;

        document.querySelectorAll('.service-card').forEach((card, index) => {
            if (card.getBoundingClientRect().top < triggerBottom && !card.classList.contains('animate')) {
                setTimeout(() => card.classList.add('animate'), index * 100);
            }
        });

        document.querySelectorAll('.testimonial').forEach((testimonial, index) => {
            if (testimonial.getBoundingClientRect().top < triggerBottom && !testimonial.classList.contains('animate')) {
                setTimeout(() => testimonial.classList.add('animate'), index * 150);
            }
        });
    };

    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                handleScrollAnimation();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    handleScrollAnimation();

    // Auth toggle
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const authBox = document.getElementById('authBox');

    if (signUpButton && signInButton && authBox) {
        signUpButton.addEventListener('click', () => {
            authBox.classList.add('right-panel-active');
        });
        signInButton.addEventListener('click', () => {
            authBox.classList.remove('right-panel-active');
        });
    }
});
