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
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true, // Enable native smooth wheel for standard scrolling
            touchMultiplier: 1.5,
        });

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);

        // Dynamic Tab Title Change
        const originalTitle = document.title;
        const handleVisibility = () => {
            document.title = document.hidden ? "Hey, over here!👋 - MPACK" : originalTitle;
        };
        document.addEventListener('visibilitychange', handleVisibility);

        window.__lenis = lenis;

        return () => {
            lenis.destroy();
            document.removeEventListener('visibilitychange', handleVisibility);
            delete window.__lenis;
        };
    }, []);

    return null;
}
