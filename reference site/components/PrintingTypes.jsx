'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../app/styles/mpack.css';

gsap.registerPlugin(ScrollTrigger);

export default function PrintingTypes() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.printing-card');
            const grid = sectionRef.current.querySelector('.printing-types-grid');

            // Forcefully clear any stuck styles from Hot Reloading on cards
            gsap.set(cards, { clearProps: "all" });

            // Create a scrubbed timeline that perfectly reverses when scrolling up
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 90%", // Start animating when section just enters
                    end: "bottom 10%", // End animating when section is leaving
                    scrub: 1, // Smoothly link to scrollbar
                }
            });

            // 1) Slide in from right to center
            tl.fromTo(grid, 
                { x: '50vw', opacity: 0 }, 
                { x: 0, opacity: 1, duration: 1, ease: "power1.out" }
            )
            // 2) Hold in the center while user scrolls through the middle of the section
            .to(grid, { x: 0, duration: 1 })
            // 3) Slide out to the left as user leaves the section
            .to(grid, { x: '-50vw', opacity: 0, duration: 1, ease: "power1.in" });

            // Hover interactions
            cards.forEach((card, index) => {
                const onEnter = () => {
                    // Lift and cast shadow straight up
                    gsap.to(card, { y: -20, scale: 1.05, duration: 0.5, ease: 'back.out(1.5)', boxShadow: '0 30px 60px rgba(0,0,0,0.12)', zIndex: 10 });
                    
                    // Dim others to focus on hovered card
                    const others = cards.filter((_, i) => i !== index);
                    gsap.to(others, { opacity: 0.5, scale: 0.96, duration: 0.4, ease: 'power2.out' });
                };
                
                const onLeave = () => {
                    // Return to original position
                    gsap.to(card, { y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.5)', boxShadow: 'none', zIndex: 1 });
                    
                    // Restore others
                    const others = cards.filter((_, i) => i !== index);
                    gsap.to(others, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' });
                };
                
                card.addEventListener('mouseenter', onEnter);
                card.addEventListener('mouseleave', onLeave);
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="printing-types-section" ref={sectionRef} style={{ padding: '80px 5%' }}>
            <div className="title-container" style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h2 className="main-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '15px' }}>Our <span className="italic-text">Printing</span> Types</h2>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-dark)', maxWidth: '600px', margin: '0 auto' }}>
                    We offer multiple printing solutions to suit your scale, budget, and design complexity.
                </p>
            </div>

            <div className="printing-types-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', maxWidth: '1200px', margin: '0 auto' }}>
                <div className="printing-card card-blue" data-cursor-text="explore" style={{ position: 'relative', overflow: 'hidden' }}>
                    <span className="card-bg-number" style={{ position: 'absolute', right: '-15px', bottom: '-45px', fontSize: '14rem', fontWeight: 900, opacity: 0.06, lineHeight: 1, pointerEvents: 'none' }}>01</span>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <h3 style={{ fontSize: '2.5rem', marginBottom: '15px', fontWeight: 800 }}>Digital</h3>
                        <ul style={{ fontSize: '1.15rem', lineHeight: 1.6, opacity: 0.9, paddingLeft: '20px', margin: 0 }}>
                            <li>Low MOQ</li>
                            <li>Fast turnaround</li>
                            <li>Multiple SKUs</li>
                            <li>Short runs</li>
                        </ul>
                    </div>
                </div>
                <div className="printing-card card-orange" data-cursor-text="explore" style={{ position: 'relative', overflow: 'hidden' }}>
                    <span className="card-bg-number" style={{ position: 'absolute', right: '-15px', bottom: '-45px', fontSize: '14rem', fontWeight: 900, opacity: 0.06, lineHeight: 1, pointerEvents: 'none' }}>02</span>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <h3 style={{ fontSize: '2.5rem', marginBottom: '15px', fontWeight: 800 }}>Flexo</h3>
                        <ul style={{ fontSize: '1.15rem', lineHeight: 1.6, opacity: 0.9, paddingLeft: '20px', margin: 0 }}>
                            <li>Cost efficient</li>
                            <li>Bulk production</li>
                            <li>Consistent quality</li>
                        </ul>
                    </div>
                </div>
                <div className="printing-card card-green" data-cursor-text="explore" style={{ position: 'relative', overflow: 'hidden' }}>
                    <span className="card-bg-number" style={{ position: 'absolute', right: '-15px', bottom: '-45px', fontSize: '14rem', fontWeight: 900, opacity: 0.06, lineHeight: 1, pointerEvents: 'none' }}>03</span>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <h3 style={{ fontSize: '2.5rem', marginBottom: '15px', fontWeight: 800 }}>Rotogravure</h3>
                        <ul style={{ fontSize: '1.15rem', lineHeight: 1.6, opacity: 0.9, paddingLeft: '20px', margin: 0 }}>
                            <li>Premium print quality</li>
                            <li>High volume production</li>
                            <li>Rich colors & details</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
