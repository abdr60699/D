// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // ===== Mobile Navigation Toggle =====
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

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

    // ===== Smooth Scrolling for Navigation Links =====
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Header Scroll Effect =====
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 0) {
            header.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        } else {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        }

        lastScroll = currentScroll;
    });

    // ===== Hero Buttons =====
    const getStartedBtn = document.getElementById('getStartedBtn');
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const aboutBtn = document.getElementById('aboutBtn');

    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            const offsetTop = contactSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    }

    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            const featuresSection = document.getElementById('features');
            const offsetTop = featuresSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    }

    if (aboutBtn) {
        aboutBtn.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            const offsetTop = contactSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    }

    // ===== Form Validation and Submission =====
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModal');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Real-time validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            validateName();
        });

        nameInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                clearError('nameError');
            }
        });
    }

    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            validateEmail();
        });

        emailInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                clearError('emailError');
            }
        });
    }

    if (messageInput) {
        messageInput.addEventListener('blur', function() {
            validateMessage();
        });

        messageInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                clearError('messageError');
            }
        });
    }

    function validateName() {
        const nameValue = nameInput.value.trim();
        const nameError = document.getElementById('nameError');

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
        const emailError = document.getElementById('emailError');

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
        const messageError = document.getElementById('messageError');

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
                // In a real application, you would send this data to a server
                // For now, we'll just show a success message

                // Clear form
                contactForm.reset();

                // Show success modal
                successModal.classList.add('active');

                // Log form data (in real app, this would be sent to server)
                console.log('Form submitted successfully!');
                console.log({
                    name: nameInput.value,
                    email: emailInput.value,
                    message: messageInput.value
                });
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

    // ===== Feature Cards Animation on Scroll =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        observer.observe(card);
    });

    // ===== Active Navigation Link Highlighting =====
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

    // ===== Prevent Form Resubmission on Page Reload =====
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }

    // ===== Accessibility: Keyboard Navigation for Modal =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successModal.classList.contains('active')) {
            successModal.classList.remove('active');
        }
    });

    // ===== Performance: Debounce Scroll Events =====
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

    // ===== Console Welcome Message =====
    console.log('%c Welcome to MyWebsite! ', 'background: #6366f1; color: white; font-size: 16px; padding: 10px;');
    console.log('%c Built with HTML, CSS, and JavaScript ', 'color: #6366f1; font-size: 12px;');
});
