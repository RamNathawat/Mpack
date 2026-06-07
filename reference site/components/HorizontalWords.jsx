'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Ecosystem from './Ecosystem';
import '../app/styles/horizontal-words.css';

gsap.registerPlugin(ScrollTrigger);

const ComplianceIcon = () => (
    <div className="doodle-svg">
        <img src="/assets/stickers/compliance.png" alt="Compliance Sticker" style={{ width: '280px', height: '280px', objectFit: 'contain' }} />
    </div>
);

const MachineryIcon = () => (
    <div className="doodle-svg">
        <img src="/assets/stickers/machinery.png" alt="Machinery Sticker" style={{ width: '280px', height: '280px', objectFit: 'contain' }} />
    </div>
);

const PackagingIcon = () => (
    <div className="doodle-svg">
        <img src="/assets/stickers/packaging.png" alt="Packaging Sticker" style={{ width: '280px', height: '280px', objectFit: 'contain' }} />
    </div>
);

const DesignIcon = () => (
    <div className="doodle-svg">
        <img src="/assets/stickers/design.png" alt="Design Sticker" style={{ width: '280px', height: '280px', objectFit: 'contain' }} />
    </div>
);

const stickersData = [
    {
        id: "compliance",
        label: "Compliance Guidance",
        desc: "Navigate complex packaging regulations with confidence. We ensure your packaging meets all necessary industry standards.",
        content: ["Rules & Regulations", "Label Support"],
        LabelComponent: ComplianceIcon,
        style: { top: 'calc(12% - 50px)', left: '8%' }
    },
    {
        id: "machinery",
        label: "Machinery Assistance",
        desc: "Need to automate your packaging line? We supply and support top-tier packaging machinery to streamline your operations.",
        content: ["Pouch & Labelling Machines", "Batch Coding Machines", "Convertors"],
        LabelComponent: MachineryIcon,
        style: { top: 'calc(18% - 50px)', right: '8%' }
    },
    {
        id: "packaging",
        label: "Complete Packaging Solutions",
        desc: "From initial concept to final shelf-ready product, we provide an extensive range of packaging formats to meet any brand requirement.",
        content: ["Pouches / Boxes", "Labels & Canisters"],
        LabelComponent: PackagingIcon,
        style: { top: 'calc(60% - 50px)', left: '8%' }
    },
    {
        id: "design",
        label: "Design Support",
        desc: "Our pre-press and design experts ensure your artwork is perfectly optimized for production, preventing costly printing errors.",
        content: ["Artworks", "Changes & Corrections", "KLDs"],
        LabelComponent: DesignIcon,
        style: { top: 'calc(65% - 50px)', right: '8%' }
    }
];

const Badge = ({ data, isExpanded, onHover, onLeave }) => {
    const LabelComponent = data.LabelComponent;
    return (
        <div 
            className={`ecosystem-badge-wrapper ${isExpanded ? 'expanded' : ''} ${data.id}-badge`}
            style={data.style}
            data-cursor-text="why mpack"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            <div className="doodle-click-wrapper">
                <LabelComponent />
            </div>
            <div className="eco-badge-expanded">
                <div className="eco-badge-header">
                    <h4>{data.label}</h4>
                </div>
                <p>{data.desc}</p>
                <div className="eco-tags">
                    {data.content.map(tag => <span key={tag} className="eco-tag">{tag}</span>)}
                </div>
            </div>
        </div>
    );
};

const HorizontalWords = () => {
    const sectionRef = useRef(null);
    const [isEcosystemOpen, setIsEcosystemOpen] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const container = sectionRef.current;
            const letters = container.querySelectorAll('.typewriter-letter');

            // Initially hide all letters
            gsap.set(letters, { opacity: 0 });

            const scrollTween = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: "+=1500", // The duration of the scroll pin
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    invalidateOnRefresh: true
                }
            });

            // Make letters appear one by one with a bouncy pop-in
            scrollTween.fromTo(letters, {
                opacity: 0,
                y: 40,
                scale: 0.5
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                ease: "back.out(2.5)",
                stagger: 0.1
            });

            // Fade in subtle hover hint
            scrollTween.fromTo([".hover-hint"], {
                y: 15,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                ease: "power2.out",
                duration: 1,
                onComplete: () => {
                    gsap.to(".hover-hint", {
                        opacity: 0.4,
                        duration: 1.5,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut"
                    });
                }
            }, "+=0.5");

            // Parallax effect for the floating packaging mockups
            // Values dramatically reduced so they stay safely in their "negative space" gaps
            gsap.to(".parallax-bg-1", {
                y: 50,
                rotation: 20, // starts at 15
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });

            gsap.to(".parallax-bg-2", {
                y: 30,
                rotation: 190, // starts at 85
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5
                }
            });

            gsap.to(".parallax-bg-3", {
                y: 70,
                rotation: -15, // starts at -10
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.8
                }
            });

            gsap.to(".parallax-bg-4", {
                y: 40,
                rotation: -25, // starts at -20
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.2
                }
            });




            // Floating stickers bobbing animation - more subtle for physical labels
            gsap.utils.toArray('.ecosystem-badge-wrapper').forEach((badge, i) => {
                gsap.to(badge, {
                    y: "+=12",
                    rotation: () => gsap.utils.random(-4, 4),
                    duration: () => gsap.utils.random(3, 5),
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: () => gsap.utils.random(0, 2)
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const [expandedBadge, setExpandedBadge] = useState(null);

    // Split text into lines, then into words, then into letters
    const line1 = "end to end".split("");
    const line2 = "packaging".split("");
    const line3 = "expertise".split("");

    const renderLetters = (charArray) => {
        return charArray.map((char, i) => (
            <span key={i} className="typewriter-letter" style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
                {char}
            </span>
        ));
    };

    return (
        <section ref={sectionRef} className="horizontal-words-section content-section" style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '0 5vw', overflow: 'hidden', backgroundColor: 'var(--bg-color)' }}>
            
            {/* Depth of Field Parallax Packaging - Scaled & Placed in Negative Space Gaps */}
            <div className="parallax-bg-1" style={{ position: 'absolute', top: '35%', left: '-12%', width: '38vw', zIndex: 1, filter: 'blur(8px)', opacity: 0.85 }}>
                <img src="/assets/images/vibe_pouch_noshadow.png" alt="Pouch" style={{ width: '100%', height: 'auto', transform: 'rotate(15deg)' }} />
            </div>

            <div className="parallax-bg-2" style={{ position: 'absolute', bottom: '-15%', left: '35%', width: '28vw', zIndex: 1, filter: 'blur(3px)', opacity: 0.95 }}>
                <img src="/assets/images/mockup_canister_noshadow.png" alt="Canister" style={{ width: '100%', height: 'auto', transform: 'rotate(85deg)' }} />
            </div>

            <div className="parallax-bg-3" style={{ position: 'absolute', top: '-15%', left: '45%', width: '35vw', zIndex: 1, filter: 'blur(12px)', opacity: 0.7 }}>
                <img src="/assets/images/vibe_box.png" alt="Box" style={{ width: '100%', height: 'auto', transform: 'rotate(-10deg)' }} />
            </div>

            <div className="parallax-bg-4" style={{ position: 'absolute', top: '38%', right: '-12%', width: '42vw', zIndex: 3, filter: 'blur(5px)' }}>
                <img src="/assets/images/mockup_label.png" alt="Label" style={{ width: '100%', height: 'auto', transform: 'rotate(-20deg)' }} />
            </div>

            {stickersData.map(data => (
                <Badge 
                    key={data.id} 
                    data={data} 
                    isExpanded={expandedBadge === data.id}
                    onHover={() => setExpandedBadge(data.id)}
                    onLeave={() => setExpandedBadge(null)}
                />
            ))}

            <div style={{ position: 'relative', width: '100%', textAlign: 'center', zIndex: 10 }}>
                <h2 className="display" style={{ fontSize: '6vw', fontWeight: 1000, textTransform: 'lowercase', lineHeight: 1, margin: 0, color: 'var(--color-dark)', position: 'relative', zIndex: 10 }}>
                    <div>{renderLetters(line1)}</div>
                    <div>{renderLetters(line2)}</div>
                    <div>{renderLetters(line3)}</div>
                </h2>
                
                {/* Die-Cut Label Hover Hint */}
                <div 
                    className="hover-hint"
                    style={{
                        marginTop: '30px',
                        pointerEvents: 'none',
                        opacity: 0,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 24px',
                        border: '2px dashed var(--color-dark)',
                        borderRadius: '50px',
                        background: 'transparent'
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-dark)" stroke="none">
                        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                    </svg>
                    <span style={{ 
                        fontFamily: 'var(--font-primary), sans-serif', 
                        fontSize: '0.9rem', 
                        fontWeight: '800', 
                        color: 'var(--color-dark)', 
                        letterSpacing: '0.04em',
                        textTransform: 'lowercase'
                    }}>hover over stickers to explore</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-dark)" stroke="none">
                        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                    </svg>
                </div>
            </div>

            <Ecosystem isOpen={isEcosystemOpen} onClose={() => setIsEcosystemOpen(false)} />
        </section>
    );
};

export default HorizontalWords;
