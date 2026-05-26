'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../app/styles/hero-new.css';

export default function Hero() {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax effect for the background
            gsap.to(bgRef.current, {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Fade in text
            gsap.from(".hero-new__word", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.2
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="hero-new" ref={heroRef}>
            <div 
                className="hero-new__bg" 
                ref={bgRef}
                style={{ backgroundImage: `url('/assets/images/hero_mockup_1779781205494.png')` }}
            />
            <div className="hero-new__overlay" />

            <div className="hero-new__content">
                <h1 className="hero-new__title" ref={titleRef}>
                    <span className="hero-new__word">Premium </span>
                    <span className="hero-new__word">Packaging </span>
                    <br />
                    <span className="hero-new__word is--relative">
                        <em>Solutions</em>
                        <img src="/assets/VimeoHero SVG/oval-underline.svg" alt="" className="hero-new__underline" />
                    </span>
                </h1>
                
                <p className="hero-new__subtitle hero-new__word">
                    End-to-end packaging expertise. Flexible pouches, rigid boxes, labels, and more.
                </p>

                <div className="hero-new__cta hero-new__word">
                    <a href="#contact" className="hero-btn" data-cursor-text="Let's Talk">Get in touch</a>
                </div>
            </div>
        </div>
    );
}
