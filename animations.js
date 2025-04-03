/**
 * Animations JavaScript file for the portfolio website
 * Handles scroll-based animations and interactive effects
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Animations module loaded');

    // DOM Elements for animations
    const sections = document.querySelectorAll('.section');
    const projectCards = document.querySelectorAll('.project-card');
    const smallProjectCards = document.querySelectorAll('.small-project-card');
    const skillsList = document.querySelector('.skills-list');

    // Observer options
    const observerOptions = {
        root: null, // viewport
        threshold: 0.1, // at least 10% visible
        rootMargin: '0px 0px -10% 0px' // trigger slightly before element comes into view
    };

    // Create intersection observer for fade-in animations
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections for fade-in
    sections.forEach(section => {
        // Add initial class for CSS transition
        section.classList.add('fade-element');
        // Observe the section
        fadeInObserver.observe(section);
    });

    // Staggered animation for project cards
    const projectObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on index for staggered effect
                setTimeout(() => {
                    entry.target.classList.add('slide-up');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all project cards
    projectCards.forEach(card => {
        card.classList.add('slide-element');
        projectObserver.observe(card);
    });

    // Observer for small project cards with a different animation
    const smallProjectObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on index for staggered effect
                setTimeout(() => {
                    entry.target.classList.add('fade-in-up');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all small project cards
    smallProjectCards.forEach(card => {
        card.classList.add('fade-element-up');
        smallProjectObserver.observe(card);
    });

    // Skills list staggered animation
    if (skillsList) {
        const skillItems = skillsList.querySelectorAll('li');

        const skillsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('skill-appear');
                    }, index * 100);
                });
                skillsObserver.unobserve(skillsList);
            }
        }, observerOptions);

        // Add initial class and observe
        skillItems.forEach(item => item.classList.add('skill-hidden'));
        skillsObserver.observe(skillsList);
    }

    // Add hover effects for projects
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
    });

    // Add hover effects for small project cards
    smallProjectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
    });

    // Add CSS for animations
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
      /* Fade in animation */
      .fade-element {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }
      
      .fade-element.fade-in {
        opacity: 1;
        transform: translateY(0);
      }
      
      /* Slide up animation */
      .slide-element {
        opacity: 0;
        transform: translateY(40px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }
      
      .slide-element.slide-up {
        opacity: 1;
        transform: translateY(0);
      }
      
      /* Fade in up animation */
      .fade-element-up {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.4s ease-out, transform 0.4s ease-out;
      }
      
      .fade-element-up.fade-in-up {
        opacity: 1;
        transform: translateY(0);
      }
      
      /* Skills animation */
      .skill-hidden {
        opacity: 0;
        transform: translateX(-10px);
        transition: opacity 0.3s ease-out, transform 0.3s ease-out;
      }
      
      .skill-appear {
        opacity: 1;
        transform: translateX(0);
      }
      
      /* Card hover effects */
      .project-card.hover .project-description,
      .small-project-card.hover {
        transform: translateY(-5px);
        transition: transform 0.3s ease-out;
      }
      
      /* No scroll for body */
      body.no-scroll {
        overflow: hidden;
      }
      
      /* Page load transition */
      body {
        opacity: 0;
        transition: opacity 0.3s ease-in;
      }
      
      body.dom-loaded {
        opacity: 1;
      }
    `;

    document.head.appendChild(styleSheet);
});
