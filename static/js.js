document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let lastScroll = 0;

    // Handle scroll
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Lazy loading images
    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => imageObserver.observe(img));

    // Application button interaction
    const applyBtns = document.querySelectorAll('.primary-btn');
    applyBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // Add loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            // Simulate processing
            setTimeout(() => {
                window.location.href = this.href;
            }, 1000);
        });
    });

    // Stats animation on scroll
    const stats = document.querySelectorAll('.stat-box');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));

    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            // Add your search functionality here
            alert('Search feature coming soon!');
        });
    }

    // Add Animation Classes on Scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.element, .stat-item');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < window.innerHeight * 0.8) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Button interactions
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // Detect elements in viewport and apply animation
    const scrollElements = document.querySelectorAll(".scroll-animate");

    const elementInView = (el, offset = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset;
    };

    const displayScrollElement = (element) => {
        element.classList.add("visible");
    };

    const hideScrollElement = (element) => {
        element.classList.remove("visible");
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });

        const serviceCards = document.querySelectorAll('.service-card');
        const testimonials = document.querySelectorAll('.testimonial');
        const triggerBottom = window.innerHeight * 0.8;

        // Animate service cards with delay
        serviceCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < triggerBottom) {
                setTimeout(() => {
                    card.classList.add('animate');
                }, index * 100); // 100ms delay between each card
            }
        });

        // Animate testimonials with delay
        testimonials.forEach((testimonial, index) => {
            const testimonialTop = testimonial.getBoundingClientRect().top;
            if (testimonialTop < triggerBottom) {
                setTimeout(() => {
                    testimonial.classList.add('animate');
                }, index * 150); // 150ms delay between each testimonial
            }
        });
    };

    // Add scroll event listener with throttle
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

    handleScrollAnimation(); // Trigger on load
});
