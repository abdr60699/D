// ===== DOM Content Loaded =====
document.addEventListener('DOMContentLoaded', function() {

    // ===== Navigation =====
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = navMenu.contains(event.target) || navToggle.contains(event.target);
        if (!isClickInside && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // ===== Navbar Scroll Effect =====
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Don't prevent default for links that are just "#"
            if (href === '#') return;

            e.preventDefault();
            const targetId = href;
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Active Nav Link Highlighting =====
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ===== Testimonials Slider =====
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            if (i === index) {
                card.classList.add('active');
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        });
    }

    // Auto-advance testimonials
    setInterval(function() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // ===== Form Validation =====
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModal');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Form inputs
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Real-time validation
    if (nameInput) {
        nameInput.addEventListener('blur', validateName);
        nameInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                clearError('nameError');
            }
        });
    }

    if (emailInput) {
        emailInput.addEventListener('blur', validateEmail);
        emailInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                clearError('emailError');
            }
        });
    }

    if (messageInput) {
        messageInput.addEventListener('blur', validateMessage);
        messageInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                clearError('messageError');
            }
        });
    }

    function validateName() {
        const nameValue = nameInput.value.trim();

        if (nameValue === '') {
            showError('nameError', 'Name is required');
            return false;
        } else if (nameValue.length < 2) {
            showError('nameError', 'Name must be at least 2 characters');
            return false;
        } else {
            clearError('nameError');
            return true;
        }
    }

    function validateEmail() {
        const emailValue = emailInput.value.trim();

        if (emailValue === '') {
            showError('emailError', 'Email is required');
            return false;
        } else if (!emailRegex.test(emailValue)) {
            showError('emailError', 'Please enter a valid email address');
            return false;
        } else {
            clearError('emailError');
            return true;
        }
    }

    function validateMessage() {
        const messageValue = messageInput.value.trim();

        if (messageValue === '') {
            showError('messageError', 'Message is required');
            return false;
        } else if (messageValue.length < 10) {
            showError('messageError', 'Message must be at least 10 characters');
            return false;
        } else {
            clearError('messageError');
            return true;
        }
    }

    function showError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function clearError(errorId) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate all fields
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();

            if (isNameValid && isEmailValid && isMessageValid) {
                // Log form data (in production, send to server)
                console.log('Form submitted successfully!');
                console.log({
                    name: nameInput.value,
                    email: emailInput.value,
                    company: document.getElementById('company').value,
                    message: messageInput.value
                });

                // Clear form
                contactForm.reset();

                // Show success modal
                successModal.classList.add('active');
            }
        });
    }

    // Close modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            successModal.classList.remove('active');
        });
    }

    // Close modal when clicking outside
    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successModal.classList.contains('active')) {
            successModal.classList.remove('active');
        }
    });

    // ===== Intersection Observer for Animations =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';

                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);

                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        fadeInObserver.observe(card);
    });

    // Observe work items
    document.querySelectorAll('.work-item').forEach(item => {
        fadeInObserver.observe(item);
    });

    // ===== Parallax Effect for Hero =====
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / 800);
        }
    });

    // ===== Cursor Trail Effect (Optional) =====
    let cursorX = 0;
    let cursorY = 0;
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // ===== Stats Counter Animation =====
    const stats = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (stats.length > 0) {
        statsObserver.observe(stats[0].parentElement);
    }

    function animateStats() {
        stats.forEach(stat => {
            const text = stat.textContent;
            const numberMatch = text.match(/\d+/);

            if (numberMatch) {
                const targetNumber = parseInt(numberMatch[0]);
                const suffix = text.replace(numberMatch[0], '').trim();
                let currentNumber = 0;
                const increment = targetNumber / 50;
                const duration = 2000;
                const stepTime = duration / 50;

                const timer = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= targetNumber) {
                        stat.textContent = targetNumber + suffix;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(currentNumber) + suffix;
                    }
                }, stepTime);
            }
        });
    }

    // ===== Work Filter (if you want to add filtering) =====
    const workItems = document.querySelectorAll('.work-item');

    workItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });

        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // ===== Debounce Function for Performance =====
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll events
    const debouncedHighlight = debounce(highlightNavLink, 10);
    window.addEventListener('scroll', debouncedHighlight);

    // ===== Prevent Form Resubmission =====
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }

    // ===== Loading Animation =====
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });

    // ===== Console Branding =====
    console.log('%c Stellar Design Studio ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 15px; border-radius: 8px; font-weight: bold;');
    console.log('%c We craft digital experiences that inspire ✨ ', 'color: #667eea; font-size: 14px; padding: 5px;');
    console.log('%c Interested in working with us? Email: hello@stellar.design ', 'color: #666; font-size: 12px;');

    // ===== Easter Egg: Konami Code =====
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);

        if (konamiCode.join('').includes(konamiSequence.join(''))) {
            activateEasterEgg();
        }
    });

    function activateEasterEgg() {
        document.body.style.animation = 'rainbow 3s linear infinite';
        console.log('%c 🎉 You found the secret! 🎉 ', 'background: #FF6B6B; color: white; font-size: 16px; padding: 10px;');

        setTimeout(() => {
            document.body.style.animation = '';
        }, 3000);
    }

    // ===== Accessibility: Skip to Content =====
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--primary);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
    `;

    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });

    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    // ===== Service Worker Registration (for PWA support) =====
    if ('serviceWorker' in navigator) {
        // Uncomment to enable PWA
        // navigator.serviceWorker.register('/sw.js').then(function() {
        //     console.log('Service Worker Registered');
        // });
    }

    // ===== Dark Mode Toggle (Optional Feature) =====
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (prefersDarkScheme.matches) {
        // Auto dark mode can be implemented here
        // document.body.classList.add('dark-mode');
    }

    // ===== Performance Monitoring =====
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
            }, 0);
        });
    }

});

// ===== Add rainbow animation for easter egg =====
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);
