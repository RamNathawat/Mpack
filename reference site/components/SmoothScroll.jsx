'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

export default function SmoothScroll() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, Observer);

        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: false, // Disable native smooth wheel for slideshow
            touchMultiplier: 1.5,
        });

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);

        // --- SLIDESHOW SCROLL HIJACK LOGIC ---
        let isAnimating = false;
        let stops = [];
        
        const updateStops = () => {
            const elements = gsap.utils.toArray('.slideshow-stop');
            stops = [];
            
            elements.forEach((el, index) => {
                const st = ScrollTrigger.create({
                    trigger: el,
                    start: "top top"
                });
                const startPos = st.start;
                stops.push(startPos);
                st.kill();
                
                // For the Hero component, add a stop at the end of its pin
                if (index === 0 && el.querySelector('.hero-morph-wrapper')) {
                    // Estimate the end of the Hero scrub animation.
                    // The pin ends when the wrapper's bottom reaches the bottom.
                    // Another way is to just find the trigger end.
                    const heroTriggers = ScrollTrigger.getAll().filter(t => t.trigger === el.querySelector('.hero-morph-wrapper'));
                    if (heroTriggers.length > 0) {
                        stops.push(heroTriggers[0].end);
                    } else {
                        // Fallback
                        stops.push(startPos + window.innerHeight * 1.2); 
                    }
                }
            });
            
            stops = [...new Set(stops)].sort((a, b) => a - b);
        };

        // Update stops after layout settles
        const refreshTimeout = setTimeout(updateStops, 1000);
        window.addEventListener('resize', updateStops);

        const handleWheel = (direction) => {
            if (isAnimating || stops.length === 0) return;
            
            const currentScroll = window.scrollY;
            let targetScroll = -1;
            
            if (direction === 1) { // Down
                const idx = stops.findIndex(pos => pos > currentScroll + 50);
                if (idx !== -1) targetScroll = stops[idx];
                else {
                    // Try to scroll to absolute bottom if we are near the end
                    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                    if (currentScroll < maxScroll - 10) targetScroll = maxScroll;
                }
            } else { // Up
                let idx = stops.slice().reverse().findIndex(pos => pos < currentScroll - 50);
                if (idx !== -1) {
                    targetScroll = stops[stops.length - 1 - idx];
                } else if (currentScroll > 50) {
                    targetScroll = 0;
                }
            }
            
            if (targetScroll !== -1) {
                isAnimating = true;
                
                // Determine duration: slow down the Hero -> Grid transition
                let scrollDuration = 2.0; // Slower default slide transition
                
                // If transitioning between the very top (start of Hero) and the end of the Hero pin
                if (stops.length > 1) {
                    const isHeroMorphDown = currentScroll < 50 && targetScroll === stops[1];
                    const isHeroMorphUp = currentScroll > stops[1] - 50 && currentScroll < stops[1] + 50 && targetScroll === stops[0];
                    
                    if (isHeroMorphDown || isHeroMorphUp) {
                        scrollDuration = 4.5; // Very paced out, cinematic transition for the Hero morph
                    }
                }
                
                lenis.scrollTo(targetScroll, {
                    duration: scrollDuration,
                    lock: true,
                    onComplete: () => { isAnimating = false; }
                });
            }
        };

        const observer = Observer.create({
            target: window,
            type: "wheel,touch",
            tolerance: 10,
            preventDefault: true,
            onUp: () => handleWheel(1),   // Swipe up -> page goes up -> see next section
            onDown: () => handleWheel(-1), // Swipe down -> page goes down -> see previous section
        });

        // Dynamic Tab Title Change
        const originalTitle = document.title;
        const handleVisibility = () => {
            document.title = document.hidden ? "Hey, over here!👋 - MPACK" : originalTitle;
        };
        document.addEventListener('visibilitychange', handleVisibility);

        window.__lenis = lenis;
        window.__slideshowStops = () => stops;

        return () => {
            clearTimeout(refreshTimeout);
            window.removeEventListener('resize', updateStops);
            observer.kill();
            lenis.destroy();
            document.removeEventListener('visibilitychange', handleVisibility);
            delete window.__lenis;
            delete window.__slideshowStops;
        };
    }, []);

    return null;
}
