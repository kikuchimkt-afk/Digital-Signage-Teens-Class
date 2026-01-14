/**
 * ECCジュニア大学前 Digital Signage Slideshow
 * Slideshow Controller
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        slideDisplayTime: 2000,      // 2 seconds per slide
        transitionDuration: 400,     // 0.4 seconds transition
        totalSlides: 7
    };

    // State
    let currentSlide = 0;
    let slides = [];
    let isTransitioning = false;
    let autoPlayInterval = null;

    /**
     * Initialize the slideshow
     */
    function init() {
        slides = document.querySelectorAll('.slide');
        
        if (slides.length === 0) {
            console.error('No slides found');
            return;
        }

        // Ensure first slide is active
        slides[0].classList.add('active');
        
        // Start autoplay
        startAutoPlay();

        console.log(`Slideshow initialized with ${slides.length} slides`);
    }

    /**
     * Go to the next slide
     */
    function nextSlide() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        const prevSlide = currentSlide;
        currentSlide = (currentSlide + 1) % slides.length;

        // Remove active from previous slide and add exiting
        slides[prevSlide].classList.remove('active');
        slides[prevSlide].classList.add('exiting');

        // Add active to new slide
        slides[currentSlide].classList.add('active');

        // Clean up after transition
        setTimeout(() => {
            slides[prevSlide].classList.remove('exiting');
            isTransitioning = false;
        }, CONFIG.transitionDuration);
    }

    /**
     * Start automatic slideshow
     */
    function startAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
        
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, CONFIG.slideDisplayTime);
    }

    /**
     * Stop automatic slideshow
     */
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose controls for debugging (optional)
    window.slideshow = {
        next: nextSlide,
        start: startAutoPlay,
        stop: stopAutoPlay,
        getCurrentSlide: () => currentSlide
    };
})();
