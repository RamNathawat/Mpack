'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Ecosystem from './Ecosystem';
import '../app/styles/horizontal-words.css';

gsap.registerPlugin(ScrollTrigger);

const ComplianceIcon = () => (
    <div className="doodle-svg">
        <img src="/assets/end-to-end-section/compliance.png" alt="Compliance Sticker" style={{ width: '280px', height: '280px', objectFit: 'contain' }} />
    </div>
);

const MachineryIcon = () => (
    <div className="doodle-svg">
        <img src="/assets/end-to-end-section/machinery_new.png" alt="Machinery Sticker" style={{ width: '360px', height: '360px', objectFit: 'contain', transform: 'translate(20px, -20px)' }} />
    </div>
);

const PackagingIcon = () => (
    <div className="doodle-svg">
        <img src="/assets/end-to-end-section/packaging_new.png" alt="Packaging Sticker" style={{ width: '280px', height: '280px', objectFit: 'contain' }} />
    </div>
);

const DesignIcon = () => (
    <div className="doodle-svg">
        <img src="/assets/end-to-end-section/design_new.png" alt="Design Sticker" style={{ width: '280px', height: '280px', objectFit: 'contain' }} />
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
            <div className="permanent-sticker-title">
                <span>{data.label}</span>
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

            // 1. The Main Pinning Trigger to "Stop" the section
            ScrollTrigger.create({
                trigger: container,
                start: "top top",
                end: "+=1000", // Pin for 1000px of scrolling
                pin: true,
                snap: {
                    snapTo: [0, 1], // Snap to the start or end of the pin
                    duration: { min: 0.5, max: 1.0 },
                    delay: 0.1,
                    ease: "power2.inOut"
                }
            });

            // 2. The Text Entrance Animation
            const scrollTween = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top 60%", // Play the bouncy text just as it comes into full view
                    toggleActions: "play none none reverse"
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
            // Scrubbed specifically while the section is pinned
            gsap.to(".parallax-bg-1", {
                y: 50,
                rotation: 20, // starts at 15
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: "+=1000",
                    scrub: 1
                }
            });

            gsap.to(".parallax-bg-2", {
                y: 120,
                rotation: 210, // starts at 85
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: "+=1000",
                    scrub: 1.5
                }
            });

            gsap.to(".parallax-bg-3", {
                y: 70,
                rotation: -15, // starts at -10
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: "+=1000",
                    scrub: 0.8
                }
            });

            gsap.to(".parallax-bg-4", {
                y: 40,
                rotation: -25, // starts at -20
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: "+=1000",
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
    const line3 = "solutions".split("");

    const renderLetters = (charArray) => {
        return charArray.map((char, i) => (
            <span key={i} className="typewriter-letter" style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
                {char}
            </span>
        ));
    };

    return (
        <section ref={sectionRef} className="horizontal-words-section content-section" style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '0 5vw', overflow: 'hidden', backgroundColor: '#f5eedf' }}>
            
            {/* Depth of Field Parallax Packaging - Scaled & Placed in Negative Space Gaps */}
            <div className="parallax-bg-1" style={{ position: 'absolute', top: '35%', left: '-12%', width: '38vw', zIndex: 1, filter: 'blur(8px)', opacity: 0.85 }}>
                <img src="/assets/hero-section/emerald_pouch.png" alt="Pouch" style={{ width: '100%', height: 'auto', transform: 'rotate(15deg)', WebkitMaskImage: 'url(/assets/hero-section/blank_pouch.png)', maskImage: 'url(/assets/hero-section/blank_pouch.png)', WebkitMaskSize: '100% 100%', maskSize: '100% 100%', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat' }} />
            </div>

            <div className="parallax-bg-2" style={{ position: 'absolute', bottom: '-15%', left: '35%', width: '28vw', zIndex: 1, filter: 'blur(3px)', opacity: 0.95 }}>
                <img src="/assets/hero-section/midnight_canister.png" alt="Canister" style={{ width: '100%', height: 'auto', transform: 'rotate(85deg)', WebkitMaskImage: 'url(/assets/hero-section/blank_canister.png)', maskImage: 'url(/assets/hero-section/blank_canister.png)', WebkitMaskSize: '100% 100%', maskSize: '100% 100%', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat' }} />
            </div>

            <div className="parallax-bg-3" style={{ position: 'absolute', top: '-15%', left: '45%', width: '35vw', zIndex: 1, filter: 'blur(12px)', opacity: 0.7 }}>
                <img src="/assets/hero-section/terracotta_box.png" alt="Box" style={{ width: '100%', height: 'auto', transform: 'rotate(-10deg)', WebkitMaskImage: 'url(/assets/hero-section/blank_box.png)', maskImage: 'url(/assets/hero-section/blank_box.png)', WebkitMaskSize: '100% 100%', maskSize: '100% 100%', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat' }} />
            </div>

            <div className="parallax-bg-4" style={{ position: 'absolute', top: '38%', right: '-12%', width: '42vw', zIndex: 3, filter: 'blur(5px)' }}>
                <img src="/assets/hero-section/mockup_label.png" alt="Label" style={{ width: '100%', height: 'auto', transform: 'rotate(-20deg)', WebkitMaskImage: 'url(/assets/hero-section/blank_label.png)', maskImage: 'url(/assets/hero-section/blank_label.png)', WebkitMaskSize: '100% 100%', maskSize: '100% 100%', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat' }} />
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
                <h2 className="display" style={{ 
                    lineHeight: 0.85, 
                    margin: 0, 
                    position: 'relative', 
                    zIndex: 10
                }}>
                    <div style={{
                        fontFamily: "var(--font-serif), serif",
                        fontStyle: 'italic',
                        fontWeight: 600,
                        fontSize: '3vw',
                        letterSpacing: '0.02em',
                        marginBottom: '-0.5vw',
                        marginRight: '25vw',
                        color: '#000000'
                    }}>
                        {renderLetters(line1)}
                    </div>
                    <div style={{
                        fontFamily: "'Epilogue', sans-serif",
                        fontWeight: 800,
                        fontSize: '9vw',
                        letterSpacing: '-0.05em',
                        textTransform: 'lowercase',
                        color: 'var(--color-maroon)'
                    }}>
                        {renderLetters(line2)}
                    </div>
                    <div style={{
                        fontFamily: "var(--font-serif), serif",
                        fontStyle: 'italic',
                        fontWeight: 400,
                        fontSize: '6.5vw',
                        letterSpacing: '0.01em',
                        marginTop: '-1.5vw',
                        marginLeft: '15vw',
                        color: '#000000'
                    }}>
                        {renderLetters(line3)}
                    </div>
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
                        border: '1.5px dashed #000000',
                        borderRadius: '50px',
                        background: 'transparent'
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#000000" stroke="none">
                        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                    </svg>
                    <span style={{ 
                        fontFamily: "'Epilogue', sans-serif", 
                        fontSize: '0.95rem', 
                        fontWeight: '600', 
                        color: '#000000', 
                        letterSpacing: '-0.02em',
                    }}>hover over stickers to explore</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#000000" stroke="none">
                        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                    </svg>
                </div>
            </div>

            <Ecosystem isOpen={isEcosystemOpen} onClose={() => setIsEcosystemOpen(false)} />
        </section>
    );
};

export default HorizontalWords;
