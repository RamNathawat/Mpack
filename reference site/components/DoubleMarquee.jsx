'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clientLogos } from '@/lib/data';
import '../app/styles/marquee.css';

export default function DoubleMarquee() {
    const sectionRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            const media = window.matchMedia('(max-width: 768px)');
            setIsMobile(media.matches);

            const handleResize = (e) => setIsMobile(e.matches);
            media.addEventListener('change', handleResize);

            return () => media.removeEventListener('change', handleResize);
        }
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Scroll stop / pin at top of viewport exactly matching CompletePackaging & Industries
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: '+=650',
                pin: true,
                pinSpacing: true,
                invalidateOnRefresh: true
            });

            // Editorial layout stagger entrance
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    end: 'top 30%',
                    toggleActions: 'play none none none'
                }
            });

            tl.fromTo(
                [
                    '.client-editorial-eyebrow',
                    '.client-editorial-heading',
                    '.client-editorial-body',
                    '.client-pillar-card'
                ],
                {
                    y: 32,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.65,
                    stagger: 0.08,
                    ease: 'power3.out'
                }
            );

            // Subtle floating wobbly doodles
            gsap.utils.toArray('.client-doodles svg').forEach((doodle, i) => {
                gsap.to(doodle, {
                    y: i % 2 === 0 ? '+=14' : '-=14',
                    rotation: () => gsap.utils.random(-8, 8),
                    duration: () => gsap.utils.random(3.5, 4.8),
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Split clientLogos into two balanced tracks for dual column / dual row marquee
    const midIndex = Math.ceil(clientLogos.length / 2);
    const col1Logos = clientLogos.slice(0, midIndex);
    const col2Logos = clientLogos.slice(midIndex);

    // Triplicate for infinite seamless scroll
    const track1 = [...col1Logos, ...col1Logos, ...col1Logos, ...col1Logos];
    const track2 = [...col2Logos, ...col2Logos, ...col2Logos, ...col2Logos];

    return (
        <section ref={sectionRef} className="Double-marquee client-logos-section">
            {/* Ambient Lighting & Wobbly Doodles */}
            <div className="client-ambient-light" />
            <div className="client-doodles">
                <svg style={{ position: 'absolute', top: '24%', left: '28%', width: '5.5vw' }} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 20 120 C 30 80, 80 60, 60 110 C 40 160, 110 140, 100 90 C 90 40, 140 20, 145 50" stroke="var(--color-slate, #64748b)" strokeWidth="3" strokeLinecap="round" opacity="0.28" />
                </svg>
                <svg style={{ position: 'absolute', bottom: '15%', left: '42%', width: '3.5vw' }} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 5 L56 42 L95 50 L56 58 L50 95 L44 58 L5 50 L44 42 Z" stroke="var(--color-slate, #64748b)" strokeWidth="2.5" strokeLinejoin="round" fill="none" opacity="0.45" />
                </svg>
            </div>

            {/* Left: Fresh Editorial Typography & Value Pillars */}
            <div className="client-showcase-left">
                <div className="client-editorial-eyebrow">
                    <span className="client-editorial-bar" />
                    <span>OUR PARTNER NETWORK</span>
                </div>

                <h2 className="client-editorial-heading">
                    <span className="client-head-primary">Your end-to-end</span>
                    <div className="client-head-row">
                        <span className="client-head-serif">packaging partner</span>
                        <span className="client-head-pill">MOQ Flexible</span>
                    </div>
                    <span className="client-head-subprimary">from concept to shelf.</span>
                </h2>

                <p className="client-editorial-body">
                    MPACK bridges the gap between ambitious brands and world-class manufacturing. Whether you need custom flexible pouches, rigid boxes, sleeves, or specialized labels, our vetted converter network delivers precision printing and flexible MOQs without the sourcing friction.
                </p>

                <div className="client-pillars-grid">
                    <div className="client-pillar-card">
                        <span className="client-pillar-title">Vetted Converter Network</span>
                        <span className="client-pillar-sub">Access top-tier print &amp; structural capabilities nationwide.</span>
                    </div>
                    <div className="client-pillar-card">
                        <span className="client-pillar-title">Flexible MOQ &amp; Scaling</span>
                        <span className="client-pillar-sub">Agile batch runs for D2C brands up to commercial volume rolls.</span>
                    </div>
                    <div className="client-pillar-card">
                        <span className="client-pillar-title">End-to-End Guidance</span>
                        <span className="client-pillar-sub">Full structural DTP, barrier selection &amp; press-check support.</span>
                    </div>
                </div>
            </div>

            {/* Right: Dual Architectural Bento Logo Marquee (Purely Logos, Full Color) */}
            <div className="client-showcase-right">
                {/* Track 1: Scrolling Up on Desktop / Left on Mobile */}
                <div className="client-marquee-col client-col-1">
                    <div className="client-marquee-track track-up">
                        {track1.map((item, idx) => (
                            <div key={`t1-${idx}`} className="client-card">
                                <div className="client-card-inner">
                                    <img
                                        src={item.src}
                                        alt={item.name}
                                        className="client-logo-img"
                                        style={item.invert ? { filter: 'invert(0.88)' } : undefined}
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Track 2: Scrolling Down on Desktop / Right on Mobile */}
                <div className="client-marquee-col client-col-2">
                    <div className="client-marquee-track track-down">
                        {track2.map((item, idx) => (
                            <div key={`t2-${idx}`} className="client-card">
                                <div className="client-card-inner">
                                    <img
                                        src={item.src}
                                        alt={item.name}
                                        className="client-logo-img"
                                        style={item.invert ? { filter: 'invert(0.88)' } : undefined}
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
