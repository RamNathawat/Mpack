'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../app/styles/printing-pouches.css';

gsap.registerPlugin(ScrollTrigger);

// Ultra-Sincere, Photorealistic Industrial Engineering Artwork (Clean Reference Circular Framing)
const DigitalSticker = () => (
    <div style={{ filter: 'drop-shadow(0px 14px 28px rgba(0,0,0,0.25))', width: '100%' }}>
        <img 
            src="/assets/printing-technologies/digital_icon.png" 
            alt="Digital Printing Press" 
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '50%', clipPath: 'circle(49.5% at 50% 50%)' }} 
        />
    </div>
);

const FlexoSticker = () => (
    <div style={{ filter: 'drop-shadow(0px 14px 28px rgba(0,0,0,0.25))', width: '100%' }}>
        <img 
            src="/assets/printing-technologies/flexo_icon.png" 
            alt="Flexographic Printing Press" 
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '50%', clipPath: 'circle(49.5% at 50% 50%)' }} 
        />
    </div>
);

const RotoSticker = () => (
    <div style={{ filter: 'drop-shadow(0px 14px 28px rgba(0,0,0,0.25))', width: '100%' }}>
        <img 
            src="/assets/printing-technologies/roto_icon.png" 
            alt="Rotogravure Printing Cylinder" 
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '50%', clipPath: 'circle(49.5% at 50% 50%)' }} 
        />
    </div>
);

const UpgradedHeatVector = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
        {/* Sleek dynamic rising heat steam waves */}
        <path d="M 20 85 C 20 55, 40 40, 20 5" stroke="url(#heatWaveGrad1)" strokeWidth="6" strokeLinecap="round" />
        <path d="M 50 95 C 50 65, 70 50, 50 10" stroke="url(#heatWaveGrad2)" strokeWidth="7.5" strokeLinecap="round" />
        <path d="M 80 85 C 80 55, 60 40, 80 15" stroke="url(#heatWaveGrad1)" strokeWidth="5.5" strokeLinecap="round" />
        <defs>
            <linearGradient id="heatWaveGrad1" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#ea580c" stopOpacity="0" />
                <stop offset="50%" stopColor="#f97316" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="heatWaveGrad2" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#c2410c" stopOpacity="0" />
                <stop offset="55%" stopColor="#fbbf24" stopOpacity="1" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </linearGradient>
        </defs>
    </svg>
);

const IceVector = ({ className }) => (
    <svg className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        {/* Main large ice cube */}
        <path fill="#0284c7" d="M256 100L100 180v150l156 80 156-80V180L256 100z"/>
        <path fill="#38bdf8" d="M256 250L100 180v150l156 80V250z"/>
        <path fill="#0ea5e9" d="M256 250l156-70v150l-156 80V250z"/>
        <path fill="#bae6fd" d="M256 100L100 180l156 70 156-70L256 100z"/>
        {/* Floating ice cube top left */}
        <g transform="translate(-40, -40) scale(0.5)">
            <path fill="#0284c7" d="M256 100L100 180v150l156 80 156-80V180L256 100z"/>
            <path fill="#38bdf8" d="M256 250L100 180v150l156 80V250z"/>
            <path fill="#0ea5e9" d="M256 250l156-70v150l-156 80V250z"/>
            <path fill="#bae6fd" d="M256 100L100 180l156 70 156-70L256 100z"/>
        </g>
        {/* Floating ice cube bottom right */}
        <g transform="translate(140, 140) scale(0.4)">
            <path fill="#0284c7" d="M256 100L100 180v150l156 80 156-80V180L256 100z"/>
            <path fill="#38bdf8" d="M256 250L100 180v150l156 80V250z"/>
            <path fill="#0ea5e9" d="M256 250l156-70v150l-156 80V250z"/>
            <path fill="#bae6fd" d="M256 100L100 180l156 70 156-70L256 100z"/>
        </g>
    </svg>
);

const POUCHES = [
    { file: '3_side_seal-removebg-preview.png', name: '3 Side Seal', subtitle: 'Spices, powders & dry ingredients.' },
    { file: 'Center_seal-removebg-preview.png', name: 'Center Seal', subtitle: 'Balanced sealing for maximum protection.' },
    { file: 'Stand_Up_Pouch-removebg-preview.png', name: 'Stand Up Pouch', subtitle: 'Perfect for liquids, powders & everyday essentials.' },
    { file: 'Center_Seal_Side_gusset_pouch-removebg-preview.png', name: 'Center Seal Side Gusset', subtitle: 'Expandable sides for bulk volume & coffee.' },
    { file: '5_panel_pouch-removebg-preview.png', name: '5 Panel Pouch', subtitle: 'Box-like structure with 5 printable panels.' },
    { file: 'Spout_pouch-removebg-preview.png', name: 'Spout Pouch', subtitle: 'Easy pour. Mess-free liquid dispensing.' },
    { file: 'Gemini_Generated_Image_s7b4xls7b4xls7b4-removebg-preview.png', name: 'Freezable Pouch', subtitle: 'Extra stability. Maximum shelf impact.', isFreezable: true, customStyle: { transform: 'scale(1.75)' } },
    { file: 'Retort_pouch_-_add_heat_vector_to_denote_that_you_can_heat_it-removebg-preview.png', name: 'Retort Pouch', subtitle: 'Heat resistant up to 130°C. Ready-to-cook.', isRetort: true }
];

const PRINTING_TYPES = [
    {
        id: 'digital',
        title: 'digital',
        cardClass: 'card-digital',
        StickerComponent: DigitalSticker,
        rotation: 0,
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
        rotation: 0,
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
        rotation: 0,
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

const FrostWipeCanvas = ({ isActive }) => {
    const canvasRef = useRef(null);
    const hasWipedRef = useRef(false);
    const [showHint, setShowHint] = useState(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const parent = canvas.parentElement;
        const width = parent?.clientWidth || 300;
        const height = parent?.clientHeight || 400;
        canvas.width = width;
        canvas.height = height;

        // Draw frosted translucent layer
        ctx.globalCompositeOperation = 'source-over';
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        grad.addColorStop(0.5, 'rgba(224, 242, 254, 0.94)');
        grad.addColorStop(1, 'rgba(186, 230, 253, 0.96)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Draw frost specks
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        for (let i = 0; i < 150; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2.5 + 1, 0, Math.PI * 2);
            ctx.fill();
        }

        hasWipedRef.current = false;
        setShowHint(true);
    }, [isActive]);

    const handlePointerMove = (e) => {
        if (!isActive) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Erase frost permanently along brush path
        ctx.globalCompositeOperation = 'destination-out';
        const grad = ctx.createRadialGradient(x, y, 5, x, y, 65);
        grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
        grad.addColorStop(0.6, 'rgba(0, 0, 0, 0.85)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, 65, 0, Math.PI * 2);
        ctx.fill();

        if (!hasWipedRef.current) {
            hasWipedRef.current = true;
            setShowHint(false);
        }
    };

    return (
        <div className="frost-wipe-container" style={{ position: 'absolute', inset: 0, zIndex: 3, borderRadius: '20px', overflow: 'hidden', pointerEvents: isActive ? 'auto' : 'none', opacity: isActive ? 1 : 0, transition: 'opacity 0.5s ease' }}>
            <canvas 
                ref={canvasRef}
                onPointerMove={handlePointerMove}
                style={{ width: '100%', height: '100%', display: 'block', cursor: 'pointer' }}
            />
            {showHint && isActive && (
                <div className="frost-wipe-hint" style={{ pointerEvents: 'none' }}>❄️ Scratch cursor to wipe frost</div>
            )}
        </div>
    );
};

export default function PrintingAndPouches() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const cardRefs = useRef([]);
    const [activePouchIdx, setActivePouchIdx] = useState(0); // Default to 3 Side Seal
    const isHoverLockRef = useRef(false);
    const isAutoPlayingRef = useRef(true);
    const lastMousePosRef = useRef({ x: 0, y: 0 });
    const dragStartXRef = useRef(null);

    // Auto-rotating marquee: moves left every 1.5 seconds and loops after 8th product (index 7 -> 0)
    useEffect(() => {
        const interval = setInterval(() => {
            if (isAutoPlayingRef.current && dragStartXRef.current === null && !isHoverLockRef.current) {
                setActivePouchIdx(prev => (prev + 1) % POUCHES.length);
            }
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const handleCardMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;

        gsap.to(card, {
            rotateX,
            rotateY,
            z: 30,
            boxShadow: "0 25px 40px rgba(234, 88, 12, 0.18)",
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleCardMouseLeave = (e) => {
        const card = e.currentTarget;
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            z: 0,
            boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
            duration: 0.6,
            ease: "elastic.out(1.2, 0.4)"
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

    // Hover splay: hovered card pops instantly on top without collision, then bounces with charming elastic ease
    const handleCardEnter = useCallback((index) => {
        const cards = cardRefs.current;
        cards.forEach((card, i) => {
            if (!card) return;
            if (i === index) {
                gsap.set(card, { zIndex: 30 });
                gsap.to(card, {
                    rotation: 0,
                    scale: 1.03,
                    x: 0,
                    y: -14,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.55)',
                    overwrite: true
                });
            } else {
                gsap.set(card, { zIndex: PRINTING_TYPES[i].zIndex });
                gsap.to(card, {
                    rotation: 0,
                    scale: 0.98,
                    x: 0,
                    y: 2,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.55)',
                    overwrite: true
                });
            }
        });
    }, []);

    const handleCardLeave = useCallback(() => {
        const cards = cardRefs.current;
        cards.forEach((card, i) => {
            if (!card) return;
            gsap.set(card, { zIndex: PRINTING_TYPES[i].zIndex });
            gsap.to(card, {
                rotation: 0,
                scale: 1,
                x: 0,
                y: 0,
                duration: 0.9,
                ease: 'elastic.out(1, 0.55)',
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
                    invalidateOnRefresh: true
                }
            });

            // The duration values in a scrubbed timeline represent relative proportions of the total scroll distance.
            tl.addLabel("slide1")
              .to({}, { duration: pauseDistance }) // Pause on Slide 1
              .to(container, { x: () => -getScrollAmount(), duration: horizontalDistance, ease: "none" }) // Scroll horizontally
              .addLabel("slide2")
              .from('.apple-card-deck .apple-pouch-card', {
                  scale: 0.6,
                  y: 80,
                  opacity: 0,
                  rotation: () => gsap.utils.random(-12, 12),
                  duration: finalPauseDistance * 0.45,
                  stagger: finalPauseDistance * 0.04,
                  ease: "back.out(1.5)"
              }, "slide2-=0.15")
              .to({}, { duration: finalPauseDistance * 0.55 });

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
                        <div className="printing-doodles" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 15 }}>
                            {/* Starburst top right */}
                            <svg style={{ position: 'absolute', top: '20%', right: '12%', width: '6vw' }} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 5 L56 42 L95 50 L56 58 L50 95 L44 58 L5 50 L44 42 Z" stroke="var(--color-slate)" strokeWidth="3" strokeLinejoin="round" fill="none" />
                            </svg>
                            {/* Wobbly Arrow pointing toward the cards (adjusted for zero overlap with digital sticker) */}
                            <svg style={{ position: 'absolute', top: '14%', left: '5%', width: '5.5vw', transform: 'rotate(-8deg)' }} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M 20 20 C 45 60, 70 95, 110 120" stroke="var(--color-slate)" strokeWidth="4" strokeLinecap="round" />
                                <path d="M 75 125 L 115 122 L 105 85" stroke="var(--color-slate)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
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
                                    fontSize: '1.3vw', // Increased for better legibility
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
                                    onMouseLeave={handleCardLeave}
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

                                    {/* Expanded Panel (Permanently Visible on Right) */}
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
                            <svg style={{ position: 'absolute', bottom: '8%', right: '5%', width: '3vw' }} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 5 L56 42 L95 50 L56 58 L50 95 L44 58 L5 50 L44 42 Z" stroke="var(--color-slate)" strokeWidth="3" strokeLinejoin="round" fill="none" />
                            </svg>
                        </div>

                        {/* Apple-Style Rotating Card Picker */}
                        <div className="apple-carousel-wrapper">
                            <div 
                                className="apple-carousel-container"
                                onPointerDown={(e) => {
                                    dragStartXRef.current = e.clientX;
                                    isAutoPlayingRef.current = false;
                                }}
                                onPointerMove={(e) => {
                                    if (dragStartXRef.current !== null) {
                                        const deltaX = e.clientX - dragStartXRef.current;
                                        if (Math.abs(deltaX) > 45) {
                                            isHoverLockRef.current = true;
                                            if (deltaX > 0) {
                                                setActivePouchIdx(prev => (prev - 1 + POUCHES.length) % POUCHES.length);
                                            } else {
                                                setActivePouchIdx(prev => (prev + 1) % POUCHES.length);
                                            }
                                            dragStartXRef.current = e.clientX;
                                            setTimeout(() => { isHoverLockRef.current = false; }, 350);
                                        }
                                    }
                                }}
                                onPointerUp={() => { dragStartXRef.current = null; }}
                                onPointerLeave={() => { dragStartXRef.current = null; }}
                            >
                                <div className="apple-carousel-header">
                                    <h2 className="display" style={{ 
                                        display: 'flex', 
                                        justifyContent: 'center',
                                        margin: '0vh 0 0.5vh', 
                                        position: 'relative', 
                                        zIndex: 10
                                    }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                            <div className="printing-line" style={{
                                                fontFamily: "'Epilogue', sans-serif",
                                                fontWeight: 700,
                                                fontSize: '1.5vw',
                                                letterSpacing: '0.35em',
                                                textTransform: 'uppercase',
                                                color: '#000000',
                                                opacity: 0.6,
                                                marginLeft: '0.8vw',
                                                marginBottom: '-0.5vw',
                                                zIndex: 4
                                            }}>
                                                {renderLetters('our'.split(''))}
                                            </div>
                                            <div className="printing-line" style={{
                                                fontFamily: "'Epilogue', sans-serif",
                                                fontWeight: 800,
                                                fontSize: '10.5vw', 
                                                letterSpacing: '-0.03em',
                                                textTransform: 'lowercase',
                                                color: '#f5eedf',
                                                WebkitTextStroke: '2px var(--color-slate)',
                                                textShadow: '5px 5px 0px #FFD700',
                                                lineHeight: '0.8',
                                                zIndex: 2
                                            }}>
                                                {renderLetters('pouches'.split(''))}
                                            </div>
                                        </div>
                                    </h2>
                                    <p className="apple-sub-title">Premium packaging. Every shape. Every need.</p>
                                </div>

                                <div 
                                    className="apple-card-deck"
                                    onMouseEnter={() => { isAutoPlayingRef.current = false; }}
                                    onMouseLeave={() => { isAutoPlayingRef.current = true; }}
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    {POUCHES.map((pouch, idx) => {
                                        let offset = idx - activePouchIdx;
                                        if (offset > POUCHES.length / 2) offset -= POUCHES.length;
                                        if (offset < -POUCHES.length / 2) offset += POUCHES.length;
                                        const isActive = offset === 0;
                                        
                                        let translateX = offset * 75;
                                        let translateZ = offset === 0 ? 40 : -60 - Math.abs(offset) * 150;
                                        let rotateY = offset === 0 ? 0 : (offset < 0 ? 28 : -28);
                                        let scale = isActive ? 1.05 : 0.95;
                                        let opacity = Math.abs(offset) >= 4 ? 0 : 1;
                                        let zIndex = 50 - Math.abs(offset) * 5;

                                        if (offset < 0) translateX -= 18;
                                        if (offset > 0) translateX += 18;
                                        if (offset === 0) translateX = 0;

                                        return (
                                            <div 
                                                key={`apple-${idx}`}
                                                className={`apple-pouch-card ${isActive ? 'is-active' : ''} ${pouch.isRetort ? 'is-thermal' : ''} ${pouch.isFreezable ? 'is-arctic' : ''}`}
                                                style={{
                                                    transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                                                    opacity,
                                                    zIndex
                                                }}
                                                onClick={() => {
                                                    isHoverLockRef.current = true;
                                                    setActivePouchIdx(idx);
                                                    setTimeout(() => { isHoverLockRef.current = false; }, 350);
                                                }}
                                            >
                                                <div className="apple-card-inner">
                                                    <div className="apple-card-media">
                                                        {pouch.isRetort && (
                                                            <div className="heat-glow-background">
                                                                <div className="heat-haze-wave wave-1"></div>
                                                                <div className="heat-haze-wave wave-2"></div>
                                                                <div className="heat-haze-wave wave-3"></div>
                                                                <div className="heat-ember ember-1"></div>
                                                                <div className="heat-ember ember-2"></div>
                                                            </div>
                                                        )}
                                                        <img 
                                                            src={`/pouches section/${pouch.file}`} 
                                                            alt={pouch.name} 
                                                            className="apple-pouch-img" 
                                                            style={pouch.customStyle || {}} 
                                                            loading="lazy" 
                                                        />
                                                        {pouch.isFreezable && (
                                                            <FrostWipeCanvas isActive={isActive} />
                                                        )}
                                                        {pouch.isRetort && (
                                                            <div className="bento-hanging-badge badge-heat" title="Heatable Pouch">
                                                                <span className="bento-badge-icon">🔥</span>
                                                                <span className="bento-badge-text">HEATABLE</span>
                                                            </div>
                                                        )}
                                                        {pouch.isFreezable && (
                                                            <div className="bento-hanging-badge badge-freeze" title="Freezable Pouch">
                                                                <span className="bento-badge-icon">❄️</span>
                                                                <span className="bento-badge-text">FREEZABLE</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                    <div className="apple-card-info">
                                                        <h3 className="apple-card-title">{pouch.name}</h3>
                                                        <p className="apple-card-subtitle">{pouch.subtitle}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="apple-carousel-footer">
                                    <div className="apple-nav-row" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <button 
                                            className="apple-arrow-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                isHoverLockRef.current = true;
                                                setActivePouchIdx(prev => (prev - 1 + POUCHES.length) % POUCHES.length);
                                                setTimeout(() => { isHoverLockRef.current = false; }, 350);
                                            }}
                                            aria-label="Previous pouch"
                                        >
                                            ←
                                        </button>
                                        <div className="apple-pagination-dots">
                                            {POUCHES.map((_, dotIdx) => (
                                                <button 
                                                    key={`dot-${dotIdx}`}
                                                    className={`apple-dot ${dotIdx === activePouchIdx ? 'is-active' : ''}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        isHoverLockRef.current = true;
                                                        setActivePouchIdx(dotIdx);
                                                        setTimeout(() => { isHoverLockRef.current = false; }, 350);
                                                    }}
                                                    aria-label={`Go to ${POUCHES[dotIdx].name}`}
                                                />
                                            ))}
                                        </div>
                                        <button 
                                            className="apple-arrow-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                isHoverLockRef.current = true;
                                                setActivePouchIdx(prev => (prev + 1) % POUCHES.length);
                                                setTimeout(() => { isHoverLockRef.current = false; }, 350);
                                            }}
                                            aria-label="Next pouch"
                                        >
                                            →
                                        </button>
                                    </div>
                                    <div className="apple-swipe-hint">
                                        <span className="swipe-icon">👆</span>
                                        <span>Swipe or drag to explore</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
