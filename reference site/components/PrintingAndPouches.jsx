'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../app/styles/printing-pouches.css';

gsap.registerPlugin(ScrollTrigger);

// Clean, precision Line Art style stickers
const DigitalSticker = () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', overflow: 'visible', filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.1))' }}>
        {/* Clean geometric die-cut backing */}
        <rect x="10" y="15" width="80" height="70" rx="12" fill="#FFFFFF" transform="rotate(-4 50 50)" />
        
        {/* Subtle offset color highlight */}
        <rect x="25" y="30" width="50" height="35" rx="4" fill="#06B6D4" opacity="0.2" transform="rotate(2 50 50)" />

        <g stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Monitor Frame */}
            <rect x="20" y="25" width="60" height="40" rx="4" />
            {/* Screen */}
            <rect x="25" y="30" width="50" height="30" rx="2" />
            {/* Stand */}
            <path d="M 40 65 L 40 75" />
            <path d="M 60 65 L 60 75" />
            <path d="M 30 75 L 70 75" />
            {/* Minimal line art sparkle */}
            <path d="M 85 15 L 85 25 M 80 20 L 90 20" strokeWidth="2" />
        </g>
    </svg>
);

const FlexoSticker = () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', overflow: 'visible', filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.1))' }}>
        {/* Clean geometric die-cut backing */}
        <rect x="15" y="10" width="70" height="80" rx="12" fill="#FFFFFF" transform="rotate(4 50 50)" />
        
        {/* Subtle offset color highlight */}
        <rect x="30" y="20" width="45" height="25" rx="10" fill="#EC4899" opacity="0.15" transform="rotate(-6 50 50)" />

        <g stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Roller Cylinder */}
            <rect x="35" y="20" width="40" height="20" rx="6" />
            <line x1="45" y1="20" x2="45" y2="40" />
            <line x1="65" y1="20" x2="65" y2="40" />
            
            {/* Roller Arm */}
            <path d="M 25 65 L 25 35 C 25 30, 30 25, 35 25 L 75 25" />
            
            {/* Handle Base */}
            <rect x="20" y="65" width="10" height="20" rx="3" />
            <line x1="22" y1="70" x2="28" y2="70" strokeWidth="1.5" />
            <line x1="22" y1="75" x2="28" y2="75" strokeWidth="1.5" />
        </g>
    </svg>
);

const RotoSticker = () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', overflow: 'visible', filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.1))' }}>
        {/* Clean geometric die-cut backing */}
        <rect x="15" y="10" width="70" height="80" rx="12" fill="#FFFFFF" transform="rotate(-2 50 50)" />
        
        {/* Subtle offset color highlight */}
        <rect x="30" y="25" width="40" height="50" rx="4" fill="#F59E0B" opacity="0.2" transform="rotate(6 50 50)" />

        <g stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Cylinder Body */}
            <rect x="30" y="25" width="40" height="50" rx="2" />
            {/* Top/Bottom caps */}
            <ellipse cx="50" cy="25" rx="20" ry="6" />
            <ellipse cx="50" cy="75" rx="20" ry="6" />
            {/* Axis pins */}
            <path d="M 50 12 L 50 19" />
            <path d="M 50 81 L 50 88" />
            {/* Engraving lines */}
            <line x1="35" y1="40" x2="65" y2="40" strokeDasharray="4 4" />
            <line x1="35" y1="50" x2="65" y2="50" strokeDasharray="4 4" />
            <line x1="35" y1="60" x2="65" y2="60" strokeDasharray="4 4" />
        </g>
    </svg>
);

const FlameVector = ({ className }) => (
    <svg className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        {/* Outer Red Flame */}
        <path fill="#e3301c" d="M304.7 3.3c-2.4-4-8.2-4.6-11.4-1.2-44.5 47-97.1 113.8-97.1 184.9 0 3.3.4 6.5.9 9.6C153 176 112 216 112 268c0 79.5 64.5 144 144 144s144-64.5 144-144c0-82.5-62-156-83.8-243.6-.5-2.2-2.3-3.8-4.5-4.4-.3-.2-.6-.4-1-.4zM245.5 119.5c15.8-19.5 29.8-38 41.5-55.6 15.6 67.5 73.1 133 73.1 204.1 0 57.5-46.5 104-104 104s-104-46.5-104-104c0-37.4 20-72 51.5-91.5-1.9 11.2-2.5 22.8-.5 34.6 1.1 6.5 8.9 9.6 14.1 5.4 39.4-31.5 59.5-70.5 28.3-97z"/>
        {/* Middle Orange Flame */}
        <path fill="#fa8214" d="M256 168c-12.7 34.6-47.5 76-47.5 116 0 26.2 21.3 47.5 47.5 47.5S303.5 310.2 303.5 284c0-44.2-30.8-73.4-47.5-116z"/>
        {/* Inner Yellow Flame */}
        <path fill="#fddb33" d="M256 232c-6.8 18.2-24.5 40.8-24.5 60 0 13.5 11 24.5 24.5 24.5s24.5-11 24.5-24.5c0-23.2-15.9-38.3-24.5-60z"/>
    </svg>
);

const POUCHES = [
    { file: '3_side_seal-removebg-preview.png', name: '3 Side Seal' },
    { file: '5_panel_pouch-removebg-preview.png', name: '5 Panel Pouch' },
    { file: 'Center_Seal_Side_gusset_pouch-removebg-preview.png', name: 'Center Seal Side Gusset' },
    { file: 'Center_seal-removebg-preview.png', name: 'Center Seal' },
    { file: 'Retort_pouch_-_add_heat_vector_to_denote_that_you_can_heat_it-removebg-preview.png', name: 'Retort Pouch', isRetort: true },
    { file: 'Spout_pouch-removebg-preview.png', name: 'Spout Pouch' },
    { file: 'Stand_Up_Pouch-removebg-preview.png', name: 'Stand Up Pouch' }
];

const PRINTING_TYPES = [
    {
        id: 'digital',
        title: 'digital',
        cardClass: 'card-digital',
        StickerComponent: DigitalSticker,
        rotation: -6,
        zIndex: 1,
        subtitle: 'Best for Short Runs & Quick Turnaround',
        // Visible by default on card face (like Truus)
        bullets: ['No Printing Plates', 'Quick Turnaround', 'Ideal for Short Runs', 'Variable Data Printing', 'Vibrant Colors', 'Prototype-Friendly'],
        // Expanded panel data
        moq: '500 pcs',
        lead: '8–12 Days',
        cost: 'Higher/unit',
        pros: ['No plate costs', 'Fast turnaround', 'Perfect for testing'],
        cons: ['Costly at volume'],
        bestFor: 'New brands, product testing, seasonal designs.'
    },
    {
        id: 'flexo',
        title: 'flexographic',
        cardClass: 'card-flexo',
        StickerComponent: FlexoSticker,
        rotation: 5,
        zIndex: 3,
        subtitle: 'Best Balance of Cost, Quality & Versatility',
        bullets: ['Good Print Quality', 'Works on Various Materials', 'Lower Setup Costs', 'Moderate MOQ', 'Consistent Output', 'Wide Substrate Range'],
        moq: '3,000 pcs',
        lead: '14–17 Days',
        cost: 'Moderate/unit',
        pros: ['Versatile substrates', 'Good quality', 'Balanced cost'],
        cons: ['Not for tiny runs', 'Less detail than roto'],
        bestFor: 'Growing brands, regular SKUs, medium orders.'
    },
    {
        id: 'roto',
        title: 'rotogravure',
        cardClass: 'card-roto',
        StickerComponent: RotoSticker,
        rotation: -4,
        zIndex: 2,
        subtitle: 'Best for High Volumes & Premium Quality',
        bullets: ['Superior Print Quality', 'Ideal for High Volume', 'Consistent & Long-lasting', 'Rich Color Depth', 'Fine Detail Rendering', 'Lowest Unit Cost'],
        moq: '20,000 pcs',
        lead: '20–22 Days',
        cost: 'Lower/unit',
        pros: ['Best quality', 'High volume efficiency', 'Consistent results'],
        cons: ['High cylinder cost', 'Longer lead time'],
        bestFor: 'Established brands, large scale production.'
    }
];

export default function PrintingAndPouches() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const cardRefs = useRef([]);

    // Marquee State & Refs
    const marqueeContentRef = useRef(null);
    const [isMarqueeHovered, setIsMarqueeHovered] = useState(false);
    const marqueeAnimRef = useRef(null);
    const xPosRef = useRef(0);

    // Continuous Marquee Loop
    const animateMarquee = useCallback(() => {
        if (!isMarqueeHovered && marqueeContentRef.current) {
            xPosRef.current -= 1.0; // Speed adjustment
            
            const firstSet = marqueeContentRef.current.children[0];
            if (firstSet) {
                const firstSetWidth = firstSet.offsetWidth;
                const gap = window.innerWidth * 0.02; // 2vw gap
                const resetPoint = firstSetWidth + gap;

                if (Math.abs(xPosRef.current) >= resetPoint) {
                    xPosRef.current += resetPoint; // Seamless wrap
                }
                
                gsap.set(marqueeContentRef.current, { x: xPosRef.current });
            }
        }
        marqueeAnimRef.current = requestAnimationFrame(animateMarquee);
    }, [isMarqueeHovered]);

    useEffect(() => {
        marqueeAnimRef.current = requestAnimationFrame(animateMarquee);
        return () => cancelAnimationFrame(marqueeAnimRef.current);
    }, [animateMarquee]);

    const handleArrowClick = (direction) => {
        if (!marqueeContentRef.current) return;
        
        const firstSet = marqueeContentRef.current.children[0];
        const cardElement = firstSet.querySelector('.simple-card');
        if (!cardElement) return;

        const cardWidth = cardElement.offsetWidth;
        const gap = window.innerWidth * 0.02; // 2vw gap
        const shiftAmount = cardWidth + gap;
        
        const firstSetWidth = firstSet.offsetWidth;
        const resetPoint = firstSetWidth + gap;

        let targetX = direction === 'left' ? xPosRef.current + shiftAmount : xPosRef.current - shiftAmount;
        
        // Pause auto-scroll briefly
        setIsMarqueeHovered(true);
        setTimeout(() => setIsMarqueeHovered(false), 800);
        
        gsap.to(xPosRef, {
            current: targetX,
            duration: 0.6,
            ease: 'power2.out',
            onUpdate: () => {
                // Wrap logic during tween
                if (xPosRef.current <= -resetPoint) {
                    xPosRef.current += resetPoint;
                    targetX += resetPoint;
                } else if (xPosRef.current > 0) {
                    xPosRef.current -= resetPoint;
                    targetX -= resetPoint;
                }
                gsap.set(marqueeContentRef.current, { x: xPosRef.current });
            }
        });
    };

    // Header text
    const line1 = "types of".split("");
    const line2 = "printing".split("");
    const line3 = "technologies".split("");

    const renderLetters = (charArray) => {
        return charArray.map((char, i) => (
            <span key={i} className="typewriter-letter" style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
                {char}
            </span>
        ));
    };

    // Hover splay: hovered card straightens, scales, and shifts to stay on screen. Others push apart.
    const handleCardEnter = useCallback((index) => {
        // Configuration for shifts to prevent bleeding off screen
        // [hoverX (shift for active card), leftX (shift for cards to the left), rightX (shift for cards to the right)]
        const hoverOffsets = [
            { hoverX: -80,  leftX: 0,    rightX: 120 }, // Card 0 (Digital) hovered
            { hoverX: -60,  leftX: -80,  rightX: 140 }, // Card 1 (Flexo) hovered
            { hoverX: -120, leftX: -100, rightX: 0 }    // Card 2 (Roto) hovered
        ];

        const config = hoverOffsets[index];
        const cards = cardRefs.current;

        cards.forEach((card, i) => {
            if (!card) return;
            if (i === index) {
                gsap.to(card, {
                    x: config.hoverX,
                    rotation: 0,
                    scale: 1.05,
                    zIndex: 20,
                    duration: 0.85,
                    ease: 'elastic.out(1, 0.55)',
                    overwrite: true
                });
            } else {
                const pushX = i < index ? config.leftX : config.rightX;
                gsap.to(card, {
                    x: pushX,
                    rotation: PRINTING_TYPES[i].rotation * 1.2,
                    scale: 0.96,
                    zIndex: PRINTING_TYPES[i].zIndex,
                    duration: 0.9,
                    ease: 'elastic.out(1, 0.5)',
                    overwrite: true
                });
            }
        });
    }, []);

    const handleCardLeave = useCallback(() => {
        const cards = cardRefs.current;
        cards.forEach((card, i) => {
            if (!card) return;
            gsap.to(card, {
                x: 0,
                rotation: PRINTING_TYPES[i].rotation,
                scale: 1,
                zIndex: PRINTING_TYPES[i].zIndex,
                duration: 1.0,
                ease: 'elastic.out(1, 0.5)',
                overwrite: true
            });
        });
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const container = containerRef.current;
            const getScrollAmount = () => container.scrollWidth - window.innerWidth;

            // Horizontal scroll with an initial pause, then slide, then final pause (dead zone)
            const pauseDistance = 800; // Physical scroll distance to pause and let user read Slide 1
            const horizontalDistance = getScrollAmount();
            const finalPauseDistance = 1000; // "Hard stop" distance for Slide 2
            const totalScrollDistance = horizontalDistance + pauseDistance + finalPauseDistance;

            const pouchesSnapPoint = (pauseDistance + horizontalDistance) / totalScrollDistance;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${totalScrollDistance}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    snap: {
                        snapTo: [0, pouchesSnapPoint, 1],
                        duration: { min: 0.5, max: 1.0 },
                        delay: 0.05,
                        ease: "power2.inOut"
                    }
                }
            });

            // The duration values in a scrubbed timeline represent relative proportions of the total scroll distance.
            tl.addLabel("slide1")
              .to({}, { duration: pauseDistance }) // Pause on Slide 1
              .to(container, { x: () => -getScrollAmount(), duration: horizontalDistance, ease: "none" }) // Scroll horizontally
              .addLabel("slide2")
              .to({}, { duration: finalPauseDistance }); // "Second scroll" dead zone on Slide 2

            // Pre-animated Kinetic Entrance (time-based, not scrubbed)
            const entranceTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%", // Play when section enters the viewport
                    toggleActions: "play none none reverse"
                }
            });

            // Slide the three lines in from the right
            entranceTl.from('.printing-line', {
                x: "100vw",
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power3.out"
            }, 0);

            // Chaotic bouncy letter entrance (Truus style)
            entranceTl.from('.typewriter-letter', {
                yPercent: () => (Math.random() - 0.5) * 500,
                rotation: () => (Math.random() - 0.5) * 60,
                duration: 1.5,
                ease: "elastic.out(1.2, 1)",
                stagger: {
                    amount: 0.5,
                    from: "random"
                }
            }, 0.2);

            // Set initial rotations
            cardRefs.current.forEach((card, i) => {
                if (card) gsap.set(card, { rotation: PRINTING_TYPES[i].rotation });
            });

            // Sticker bobbing
            gsap.utils.toArray('.stack-sticker').forEach((sticker) => {
                gsap.to(sticker, {
                    y: "+=10",
                    rotation: () => gsap.utils.random(-4, 4),
                    duration: () => gsap.utils.random(2.5, 4),
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: () => gsap.utils.random(0, 1.5)
                });
            });

            // Doodle bobbing
            gsap.utils.toArray('.printing-doodles svg').forEach((doodle, i) => {
                gsap.to(doodle, {
                    y: i % 2 === 0 ? "+=15" : "-=15",
                    rotation: () => gsap.utils.random(-10, 10),
                    duration: () => gsap.utils.random(3, 5),
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            });


        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="printing-pouches-section">

            <div ref={containerRef} className="printing-pouches-container">
                <div className="pouches-track">

                    {/* Slide 1: Stacked Cards */}
                    <div className="printing-intro-slide">

                        {/* Background Doodles */}
                        <div className="printing-doodles" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }}>
                            {/* Starburst top right */}
                            <svg style={{ position: 'absolute', top: '20%', right: '12%', width: '6vw' }} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 5 L56 42 L95 50 L56 58 L50 95 L44 58 L5 50 L44 42 Z" stroke="var(--color-slate)" strokeWidth="3" strokeLinejoin="round" fill="none" />
                            </svg>
                            {/* Wobbly Arrow pointing toward the cards */}
                            <svg style={{ position: 'absolute', top: '25%', left: '12%', width: '10vw', transform: 'rotate(20deg)' }} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M 40 20 C 70 80, 100 120, 150 160" stroke="var(--color-slate)" strokeWidth="4" strokeLinecap="round" />
                                <path d="M 110 165 L 155 165 L 140 120" stroke="var(--color-slate)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        {/* Header */}
                        <div className="printing-header" style={{ width: '100%', marginTop: '0vh', paddingLeft: '0' }}>
                            <h2 className="display" style={{ 
                                display: 'flex', 
                                flexDirection: 'column',
                                alignItems: 'center', // Center it!
                                justifyContent: 'center',
                                margin: 0, 
                                position: 'relative', 
                                zIndex: 10
                            }}>
                                <div className="printing-line" style={{
                                    fontFamily: "'Epilogue', sans-serif",
                                    fontWeight: 700,
                                    fontSize: '1.5vw', // Increased for better legibility
                                    letterSpacing: '0.25em',
                                    textTransform: 'uppercase',
                                    color: '#000000',
                                    opacity: 0.6,
                                    marginRight: '38vw', // Adjusted since text is wider now
                                    marginBottom: '-1vw',
                                    zIndex: 4 
                                }}>
                                    {renderLetters(line1)}
                                </div>
                                <div className="printing-line" style={{
                                    fontFamily: "'Epilogue', sans-serif",
                                    fontWeight: 800,
                                    fontSize: '11.5vw', 
                                    letterSpacing: '-0.03em',
                                    textTransform: 'lowercase',
                                    color: '#f5eedf',
                                    WebkitTextStroke: '2px var(--color-slate)',
                                    textShadow: '5px 5px 0px #FFD700',
                                    lineHeight: '0.8',
                                    marginLeft: '0vw', 
                                    zIndex: 2
                                }}>
                                    {renderLetters(line2)}
                                </div>
                                <div className="printing-line" style={{
                                    fontFamily: "var(--font-serif), serif",
                                    fontStyle: 'italic',
                                    fontWeight: 400,
                                    fontSize: '6vw', 
                                    letterSpacing: '0.01em',
                                    color: '#000000',
                                    marginLeft: '20vw', // Tighter center
                                    marginTop: '-3vw', 
                                    zIndex: 3
                                }}>
                                    {renderLetters(line3)}
                                </div>
                            </h2>
                        </div>

                        {/* Stacked Card Pile */}
                        <div className="stacked-cards-area" onMouseLeave={handleCardLeave}>
                            {PRINTING_TYPES.map((type, index) => (
                                <div
                                    key={type.id}
                                    ref={el => cardRefs.current[index] = el}
                                    className={`stack-card ${type.cardClass}`}
                                    onMouseEnter={() => handleCardEnter(index)}
                                >
                                    {/* Sticker protruding above card */}
                                    <div className="stack-sticker">
                                        <div className="stack-sticker-svg">
                                            <type.StickerComponent />
                                        </div>
                                    </div>

                                    {/* Card Title (Truus-style: top-aligned) */}
                                    <h3 className="stack-card-title">{type.title}</h3>

                                    {/* Hand-drawn marker divider */}
                                    <svg className="stack-card-divider" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                        <path d="M 0 6 Q 50 2 100 8 T 200 4 T 300 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                    </svg>

                                    {/* Bullet List (Visible by Default) */}
                                    <ul className="stack-card-list">
                                        {type.bullets.map((item, j) => (
                                            <li key={j}>
                                                <span className="stack-bullet">✦</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Expanded Panel (Slides in on Hover) */}
                                    <div className="stack-expanded-panel">
                                        <div className="exp-panel-heading">Specifications</div>

                                        <div className="exp-data-row">
                                            <span className="exp-data-label">MOQ</span>
                                            <span className="exp-data-value">{type.moq}</span>
                                        </div>
                                        <div className="exp-data-row">
                                            <span className="exp-data-label">Lead Time</span>
                                            <span className="exp-data-value">{type.lead}</span>
                                        </div>
                                        <div className="exp-data-row">
                                            <span className="exp-data-label">Costs</span>
                                            <span className="exp-data-value">{type.cost}</span>
                                        </div>

                                        <div className="exp-spec-title">Pros</div>
                                        <ul className="exp-spec-list">
                                            {type.pros.map((p, i) => <li key={i}>{p}</li>)}
                                        </ul>

                                        <div className="exp-spec-title">Cons</div>
                                        <ul className="exp-spec-list">
                                            {type.cons.map((c, i) => <li key={i}>{c}</li>)}
                                        </ul>

                                        <div className="exp-best-for">{type.bestFor}</div>
                                    </div>
                                </div>
                            ))}
                        </div>



                    </div>

                    {/* Slide 2: Single-Page Simple Card Grid */}
                    <div className="pouches-simple-slide">
                        {/* Background Doodles */}
                        <div className="printing-doodles" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }}>
                            {/* Hand-drawn swirl top left */}
                            <svg style={{ position: 'absolute', top: '15%', left: '8%', width: '8vw', transform: 'rotate(-15deg)' }} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M 100 150 C 40 150, 40 50, 100 50 C 160 50, 160 120, 120 120 C 80 120, 80 80, 100 80" stroke="var(--color-slate)" strokeWidth="4" strokeLinecap="round" />
                            </svg>
                            {/* Small Star bottom right */}
                            <svg style={{ position: 'absolute', bottom: '12%', right: '10%', width: '4vw' }} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 5 L56 42 L95 50 L56 58 L50 95 L44 58 L5 50 L44 42 Z" stroke="var(--color-slate)" strokeWidth="3" strokeLinejoin="round" fill="none" />
                            </svg>
                        </div>

                        {/* Huge Truus-style Typography */}
                        <div className="printing-header" style={{ width: '100%', marginBottom: '4vh', paddingLeft: '0' }}>
                            <h2 className="display" style={{ 
                                display: 'flex', 
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: 0, 
                                position: 'relative', 
                                zIndex: 10
                            }}>
                                <div className="printing-line" style={{
                                    fontFamily: "'Epilogue', sans-serif",
                                    fontWeight: 700,
                                    fontSize: '2.5vw',
                                    letterSpacing: '0.25em',
                                    textTransform: 'uppercase',
                                    color: '#000000',
                                    opacity: 0.6,
                                    marginRight: '22vw', // Push to the left of pouches
                                    marginBottom: '-1vw',
                                    zIndex: 4 
                                }}>
                                    {renderLetters('OUR '.split(''))}
                                </div>
                                <div className="printing-line" style={{
                                    fontFamily: "'Epilogue', sans-serif",
                                    fontWeight: 800,
                                    fontSize: '11.5vw', 
                                    letterSpacing: '-0.03em',
                                    textTransform: 'lowercase',
                                    color: '#f5eedf',
                                    WebkitTextStroke: '2px var(--color-slate)',
                                    textShadow: '5px 5px 0px #FFD700', // Yellow matching the first slide
                                    lineHeight: '0.8',
                                    marginLeft: '0vw', 
                                    zIndex: 2
                                }}>
                                    {renderLetters('pouches'.split(''))}
                                </div>
                            </h2>
                        </div>
                        
                        <div 
                            className="pouches-marquee-wrapper"
                            onMouseEnter={() => setIsMarqueeHovered(true)}
                            onMouseLeave={() => setIsMarqueeHovered(false)}
                        >
                            <div ref={marqueeContentRef} style={{ display: 'flex', width: 'max-content', gap: '2vw' }}>
                                {/* Set 1 */}
                                <div className="pouches-simple-grid">
                                    {POUCHES.map((pouch, idx) => (
                                        <div key={`p1-${idx}`} className="simple-card">
                                            <div className="simple-img-wrapper">
                                                <img src={`/pouches section/${pouch.file}`} alt={pouch.name} className="simple-img" loading="lazy" />
                                                {pouch.isRetort && (
                                                    <>
                                                        <FlameVector className="pouch-flame flame-left" />
                                                        <FlameVector className="pouch-flame flame-right" />
                                                        <span className="simple-heat-badge" title="You can heat this pouch">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M11.666 1.004C11.666 1.004 8.652 4.417 8.358 8.01c-.147 1.782.593 3.42 1.94 4.502.83.666 1.34 1.636 1.34 2.673 0 1.947-1.631 3.525-3.642 3.525-2.01 0-3.642-1.578-3.642-3.525 0-1.127.56-2.186 1.5-2.859V9.923c-1.898.814-3.327 2.508-3.743 4.498-.553 2.66.425 5.485 2.503 7.159C6.46 23.085 8.783 24 11.238 24c4.321 0 7.828-3.411 7.828-7.614 0-1.688-.567-3.265-1.575-4.524-.877-1.092-1.353-2.434-1.353-3.829 0-2.482 1.488-4.639 3.65-5.586-1.748-1.077-3.95-1.554-6.122-1.443zm2.544 6.78c.844.757 1.332 1.83 1.332 2.96 0 1.517-1.042 2.87-2.522 3.328-1.503.465-3.15-.175-3.856-1.583-.178-.356-.254-.746-.254-1.144 0-1.107.566-2.15 1.51-2.825.862-.614 1.39-1.6 1.39-2.65 0-.585-.145-1.155-.42-1.65.65.657 1.488 1.996 2.82 3.564z"/>
                                                            </svg>
                                                            Heatable
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            <div className="simple-label">{pouch.name}</div>
                                        </div>
                                    ))}
                                </div>
                                {/* Set 2 */}
                                <div className="pouches-simple-grid">
                                    {POUCHES.map((pouch, idx) => (
                                        <div key={`p2-${idx}`} className="simple-card">
                                            <div className="simple-img-wrapper">
                                                <img src={`/pouches section/${pouch.file}`} alt={pouch.name} className="simple-img" loading="lazy" />
                                                {pouch.isRetort && (
                                                    <>
                                                        <FlameVector className="pouch-flame flame-left" />
                                                        <FlameVector className="pouch-flame flame-right" />
                                                        <span className="simple-heat-badge" title="You can heat this pouch">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M11.666 1.004C11.666 1.004 8.652 4.417 8.358 8.01c-.147 1.782.593 3.42 1.94 4.502.83.666 1.34 1.636 1.34 2.673 0 1.947-1.631 3.525-3.642 3.525-2.01 0-3.642-1.578-3.642-3.525 0-1.127.56-2.186 1.5-2.859V9.923c-1.898.814-3.327 2.508-3.743 4.498-.553 2.66.425 5.485 2.503 7.159C6.46 23.085 8.783 24 11.238 24c4.321 0 7.828-3.411 7.828-7.614 0-1.688-.567-3.265-1.575-4.524-.877-1.092-1.353-2.434-1.353-3.829 0-2.482 1.488-4.639 3.65-5.586-1.748-1.077-3.95-1.554-6.122-1.443zm2.544 6.78c.844.757 1.332 1.83 1.332 2.96 0 1.517-1.042 2.87-2.522 3.328-1.503.465-3.15-.175-3.856-1.583-.178-.356-.254-.746-.254-1.144 0-1.107.566-2.15 1.51-2.825.862-.614 1.39-1.6 1.39-2.65 0-.585-.145-1.155-.42-1.65.65.657 1.488 1.996 2.82 3.564z"/>
                                                            </svg>
                                                            Heatable
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            <div className="simple-label">{pouch.name}</div>
                                        </div>
                                    ))}
                                </div>
                                {/* Set 3 */}
                                <div className="pouches-simple-grid">
                                    {POUCHES.map((pouch, idx) => (
                                        <div key={`p3-${idx}`} className="simple-card">
                                            <div className="simple-img-wrapper">
                                                <img src={`/pouches section/${pouch.file}`} alt={pouch.name} className="simple-img" loading="lazy" />
                                                {pouch.isRetort && (
                                                    <>
                                                        <FlameVector className="pouch-flame flame-left" />
                                                        <FlameVector className="pouch-flame flame-right" />
                                                        <span className="simple-heat-badge" title="You can heat this pouch">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M11.666 1.004C11.666 1.004 8.652 4.417 8.358 8.01c-.147 1.782.593 3.42 1.94 4.502.83.666 1.34 1.636 1.34 2.673 0 1.947-1.631 3.525-3.642 3.525-2.01 0-3.642-1.578-3.642-3.525 0-1.127.56-2.186 1.5-2.859V9.923c-1.898.814-3.327 2.508-3.743 4.498-.553 2.66.425 5.485 2.503 7.159C6.46 23.085 8.783 24 11.238 24c4.321 0 7.828-3.411 7.828-7.614 0-1.688-.567-3.265-1.575-4.524-.877-1.092-1.353-2.434-1.353-3.829 0-2.482 1.488-4.639 3.65-5.586-1.748-1.077-3.95-1.554-6.122-1.443zm2.544 6.78c.844.757 1.332 1.83 1.332 2.96 0 1.517-1.042 2.87-2.522 3.328-1.503.465-3.15-.175-3.856-1.583-.178-.356-.254-.746-.254-1.144 0-1.107.566-2.15 1.51-2.825.862-.614 1.39-1.6 1.39-2.65 0-.585-.145-1.155-.42-1.65.65.657 1.488 1.996 2.82 3.564z"/>
                                                            </svg>
                                                            Heatable
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            <div className="simple-label">{pouch.name}</div>
                                        </div>
                                    ))}
                                </div>
                                {/* Set 4 */}
                                <div className="pouches-simple-grid">
                                    {POUCHES.map((pouch, idx) => (
                                        <div key={`p4-${idx}`} className="simple-card">
                                            <div className="simple-img-wrapper">
                                                <img src={`/pouches section/${pouch.file}`} alt={pouch.name} className="simple-img" loading="lazy" />
                                                {pouch.isRetort && (
                                                    <>
                                                        <FlameVector className="pouch-flame flame-left" />
                                                        <FlameVector className="pouch-flame flame-right" />
                                                        <span className="simple-heat-badge" title="You can heat this pouch">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M11.666 1.004C11.666 1.004 8.652 4.417 8.358 8.01c-.147 1.782.593 3.42 1.94 4.502.83.666 1.34 1.636 1.34 2.673 0 1.947-1.631 3.525-3.642 3.525-2.01 0-3.642-1.578-3.642-3.525 0-1.127.56-2.186 1.5-2.859V9.923c-1.898.814-3.327 2.508-3.743 4.498-.553 2.66.425 5.485 2.503 7.159C6.46 23.085 8.783 24 11.238 24c4.321 0 7.828-3.411 7.828-7.614 0-1.688-.567-3.265-1.575-4.524-.877-1.092-1.353-2.434-1.353-3.829 0-2.482 1.488-4.639 3.65-5.586-1.748-1.077-3.95-1.554-6.122-1.443zm2.544 6.78c.844.757 1.332 1.83 1.332 2.96 0 1.517-1.042 2.87-2.522 3.328-1.503.465-3.15-.175-3.856-1.583-.178-.356-.254-.746-.254-1.144 0-1.107.566-2.15 1.51-2.825.862-.614 1.39-1.6 1.39-2.65 0-.585-.145-1.155-.42-1.65.65.657 1.488 1.996 2.82 3.564z"/>
                                                            </svg>
                                                            Heatable
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            <div className="simple-label">{pouch.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Navigation Arrows */}
                            <div className="marquee-nav-container">
                                <button className="marquee-arrow-btn" onClick={() => handleArrowClick('left')} aria-label="Previous">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                                </button>
                                <button className="marquee-arrow-btn" onClick={() => handleArrowClick('right')} aria-label="Next">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
