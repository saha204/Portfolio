/**
 * Main JavaScript file for the portfolio website
 * Handles navigation, scrolling effects, and mobile menu functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    // DOM Elements
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-item');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-item');
    const sections = document.querySelectorAll('.section');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        const bars = document.querySelectorAll('.bar');

        // Toggle the active class on the button
        mobileMenuBtn.classList.toggle('active');

        // Toggle the open class on the mobile menu
        mobileMenu.classList.toggle('open');

        // Toggle body scroll
        body.classList.toggle('no-scroll');

        // Animate the bars to form an X when active
        if (mobileMenuBtn.classList.contains('active')) {
            bars[0].style.transform = 'translateY(9px) rotate(45deg)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'translateY(-9px) rotate(-45deg)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking a navigation link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            mobileMenuBtn.classList.remove('active');
            body.classList.remove('no-scroll');

            // Reset the menu button appearance
            const bars = document.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // Handle scroll events to change header styling
    window.addEventListener('scroll', () => {
        const currentScrollPos = window.pageYOffset;

        // Add scrolled class to header when scrolled down
        if (currentScrollPos > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Highlight active section in navigation
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (currentScrollPos >= sectionTop && currentScrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        // Update active nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });

        // Update mobile nav links
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');

            // Skip if it's just a # link
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Get header height for offset
                const headerHeight = header.offsetHeight;

                // Calculate position to scroll to
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                // Smooth scroll to element
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add body class for CSS transitions to work after page load
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Add CSS class to body when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('dom-loaded');
});

// Add no-scroll class to body
function toggleBodyScroll(disableScroll) {
    if (disableScroll) {
        document.body.classList.add('no-scroll');
    } else {
        document.body.classList.remove('no-scroll');
    }
}

// Helper to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
