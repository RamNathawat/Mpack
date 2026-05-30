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
            // Continuous slow pan effect to simulate a video of moving packets
            gsap.to(bgRef.current, {
                xPercent: -5,
                yPercent: -5,
                duration: 20,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1
            });

            // React to cursor movement
            const onMouseMove = (e) => {
                const { clientX, clientY } = e;
                const xMove = (clientX / window.innerWidth - 0.5) * 30; // max 15px movement
                const yMove = (clientY / window.innerHeight - 0.5) * 30;
                
                gsap.to(bgRef.current, {
                    x: -xMove,
                    y: -yMove,
                    duration: 3.5,
                    ease: "power3.out"
                });
            };

            window.addEventListener('mousemove', onMouseMove);

            // Fade in text
            gsap.from(".hero-new__word", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.2
            });

            return () => {
                window.removeEventListener('mousemove', onMouseMove);
            };
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
