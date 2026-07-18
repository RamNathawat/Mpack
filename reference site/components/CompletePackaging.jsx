'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../app/styles/complete-packaging.css';

gsap.registerPlugin(ScrollTrigger);

/* Exact Lucide-style 22px White SVG Icons */
const BoxIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
);

const CylinderIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
);

const TagIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
);

const CATEGORY_TABS = [
    {
        id: 'boxes',
        label: 'BOXES',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
        )
    },
    {
        id: 'labels',
        label: 'LABELS',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
        )
    },
    {
        id: 'canisters',
        label: 'CANISTERS',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
        )
    }
];

const CATEGORY_DATA = {
    boxes: [
        {
            title: 'E-COMMERCE BOXES',
            desc: 'Durable and lightweight boxes designed for safe shipping and great unboxing.',
            img: '/boxes,labels,canisters section/E-commerce-boxes.png',
            bgClass: 'card-bg-0',
            iconComponent: <BoxIcon />,
            chips: ['Strong & Secure', 'Custom Printed', 'MOQ Friendly']
        },
        {
            title: 'CORRUGATED BOXES',
            desc: 'High-strength fluted boxes built for maximum protection in transit and storage.',
            img: '/boxes,labels,canisters section/Corrugated-boxes.png',
            bgClass: 'card-bg-1',
            iconComponent: <BoxIcon />,
            chips: ['High Strength', 'Recyclable Core', 'Bulk Orders']
        },
        {
            title: 'MONO CARTON BOXES',
            desc: 'Sleek, sustainable folding cartons ideal for cosmetics, personal care and retail products.',
            img: '/boxes,labels,canisters section/Mono-carton-box.png',
            bgClass: 'card-bg-2',
            iconComponent: <BoxIcon />,
            chips: ['Premium Finish', 'Custom Design', 'Eco-Friendly']
        },
        {
            title: 'RIGID GIFT BOXES',
            desc: 'Luxury rigid boxes that elevate your brand and make every gift and unboxing memorable.',
            img: '/boxes,labels,canisters section/Rigid-boxes.png',
            bgClass: 'card-bg-3',
            iconComponent: <BoxIcon />,
            chips: ['Luxury Look', 'Custom Inserts', 'Premium Quality']
        }
    ],
    canisters: [
        {
            title: 'COMPOSITE PAPER CANISTERS',
            desc: 'Hermetically sealed composite paper canisters engineered to preserve freshness, aroma and barrier integrity.',
            img: '/boxes,labels,canisters section/Composite paper canisters.png',
            bgClass: 'card-bg-0',
            iconComponent: <CylinderIcon />,
            chips: ['Hermetic Seal', 'Food Grade Lining', '360° Custom Wrap']
        }
    ],
    labels: [
        {
            title: 'PRODUCT ROLL LABELS',
            desc: 'Vibrant, high-adhesion roll and sheet labels engineered for glass, plastic and metallic containers.',
            img: '/boxes,labels,canisters section/Product-Labels.png',
            bgClass: 'card-bg-2',
            iconComponent: <TagIcon />,
            chips: ['High Adhesion', 'Water Resistant', 'CMYK Vibrant']
        },
        {
            title: 'SHRINK SLEEVE LABELS',
            desc: '360-degree contoured branding that conforms seamlessly to complex bottle curves and unique shapes.',
            img: '/boxes,labels,canisters section/Shrink-sleeve-labels.png',
            bgClass: 'card-bg-0',
            iconComponent: <TagIcon />,
            chips: ['360° Contoured', 'Perfect Bottle Fit', 'Gloss & Matte']
        }
    ]
};

function EditorialHeroStage({ card, index }) {
    if (card.bgClass === 'card-bg-0') {
        // Slot 0: Large Muted Olive Circle & Botanical Sanctuary (Aesop / Apple Inspired)
        return (
            <div className="cp-hero-stage cp-hero-stage-0">
                <div className="cp-hero-circle-0" />
                <div className="cp-hero-sunlight-0" />
                <svg className="cp-hero-leaves-0" viewBox="0 0 200 200" fill="none">
                    <path d="M10 180 C 50 110, 95 65, 155 10 C 145 55, 120 105, 70 160 Z" fill="#3F624D" />
                    <path d="M165 195 C 185 145, 195 100, 185 45 C 160 80, 135 125, 120 175 Z" fill="#3F624D" />
                </svg>
                <div className="cp-hero-product-wrapper-0">
                    <div className="cp-hero-shadow-0" />
                    <img src={card.img} alt={card.title} className="cp-hero-product-img-0" loading="lazy" />
                </div>
                <div className="cp-floating-icon">
                    {card.iconComponent}
                </div>
                <div className="cp-hero-fade-0" />
            </div>
        );
    }
    if (card.bgClass === 'card-bg-1') {
        // Slot 1: Vertical Architectural Ribbed Wall & Studio Floor (Stripe Sessions Inspired)
        return (
            <div className="cp-hero-stage cp-hero-stage-1">
                <div className="cp-hero-ribs-1" />
                <div className="cp-hero-floor-1" />
                <div className="cp-hero-skylight-1" />
                <svg className="cp-hero-leaves-1" viewBox="0 0 200 200" fill="none">
                    <path d="M185 5 C 120 35, 75 90, 30 165 C 55 120, 105 80, 175 45 Z" fill="#334155" />
                </svg>
                <div className="cp-hero-product-wrapper-1">
                    <div className="cp-hero-shadow-1" />
                    <img src={card.img} alt={card.title} className="cp-hero-product-img-1" loading="lazy" />
                </div>
                <div className="cp-floating-icon">
                    {card.iconComponent}
                </div>
                <div className="cp-hero-fade-1" />
            </div>
        );
    }
    if (card.bgClass === 'card-bg-2') {
        // Slot 2: Golden Hour Sunlight & Sculptural Studio Pedestal (Apple Pro Inspired)
        return (
            <div className="cp-hero-stage cp-hero-stage-2">
                <div className="cp-hero-side-light-2" />
                <div className="cp-hero-pedestal-2" />
                <svg className="cp-hero-leaves-2" viewBox="0 0 200 200" fill="none">
                    <path d="M5 15 C 45 55, 75 95, 115 185 C 85 140, 45 85, 15 55 Z" fill="#715A3E" />
                </svg>
                <div className="cp-hero-product-wrapper-2">
                    <div className="cp-hero-shadow-2" />
                    <img src={card.img} alt={card.title} className="cp-hero-product-img-2" loading="lazy" />
                </div>
                <div className="cp-floating-icon">
                    {card.iconComponent}
                </div>
                <div className="cp-hero-fade-2" />
            </div>
        );
    }
    // Slot 3: Luxury Roman Arch & Blush Horizon Sky (truus.co / High-End Editorial)
    return (
        <div className="cp-hero-stage cp-hero-stage-3">
            <div className="cp-hero-blush-sky-3" />
            <div className="cp-hero-arch-3" />
            <div className="cp-hero-softbox-3" />
            <svg className="cp-hero-leaves-3" viewBox="0 0 200 200" fill="none">
                <path d="M195 25 C 140 65, 95 120, 55 195 C 85 140, 135 90, 185 55 Z" fill="#503848" />
            </svg>
            <div className="cp-hero-product-wrapper-3">
                <div className="cp-hero-shadow-3" />
                <img src={card.img} alt={card.title} className="cp-hero-product-img-3" loading="lazy" />
            </div>
            <div className="cp-floating-icon">
                {card.iconComponent}
            </div>
            <div className="cp-hero-fade-3" />
        </div>
    );
}

export default function CompletePackaging() {
    const [activeTab, setActiveTab] = useState('boxes');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
    const sectionRef = useRef(null);
    const tabRefs = useRef({});

    const activeCards = CATEGORY_DATA[activeTab] || [];

    const updateSlider = useCallback(() => {
        const activeEl = tabRefs.current[activeTab];
        if (activeEl) {
            setSliderStyle({
                left: activeEl.offsetLeft,
                width: activeEl.offsetWidth
            });
        }
    }, [activeTab]);

    useEffect(() => {
        updateSlider();
        window.addEventListener('resize', updateSlider);
        return () => window.removeEventListener('resize', updateSlider);
    }, [updateSlider]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: '+=700',
                pin: true,
                pinSpacing: true,
                invalidateOnRefresh: true
            });

            gsap.utils.toArray('.cp-doodles svg').forEach((doodle, i) => {
                gsap.to(doodle, {
                    y: i % 2 === 0 ? '+=12' : '-=12',
                    rotation: () => gsap.utils.random(-6, 6),
                    duration: () => gsap.utils.random(3.2, 4.5),
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            });

            // Premium Section Entry Typography & Elements Reveal
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    end: 'top 30%',
                    toggleActions: 'play none none none'
                }
            });

            tl.fromTo(['.cp-main-title > span', '.cp-subtitle', '.cp-pills-container'], {
                y: 32,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.65,
                stagger: 0.08,
                ease: 'power3.out'
            })
            .fromTo('.cp-title-squiggle path', {
                strokeDasharray: 320,
                strokeDashoffset: 320
            }, {
                strokeDashoffset: 0,
                duration: 0.8,
                ease: 'power2.out'
            }, '-=0.4');

            gsap.fromTo('.cp-bento-card', {
                y: 35,
                opacity: 0,
                scale: 0.95
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power3.out',
                overwrite: true,
                scrollTrigger: {
                    trigger: '.cp-carousel-wrapper',
                    start: 'top 85%'
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleTabChange = (tabId) => {
        if (tabId === activeTab || isTransitioning) return;
        setIsTransitioning(true);

        gsap.to('.cp-bento-card', {
            opacity: 0,
            y: -18,
            scale: 0.96,
            duration: 0.22,
            stagger: 0.02,
            ease: 'power2.in',
            onComplete: () => {
                setActiveTab(tabId);
                setTimeout(() => {
                    gsap.fromTo('.cp-bento-card', {
                        opacity: 0,
                        y: 32,
                        scale: 0.95
                    }, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.48,
                        stagger: 0.07,
                        ease: 'power3.out',
                        onComplete: () => setIsTransitioning(false)
                    });
                }, 60);
            }
        });
    };

    return (
        <section ref={sectionRef} className="complete-packaging-section">
            <div className="cp-doodles">
                <svg style={{ position: 'absolute', top: '14%', left: '5%', width: '6vw' }} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 20 120 C 30 80, 80 60, 60 110 C 40 160, 110 140, 100 90 C 90 40, 140 20, 145 50" stroke="var(--color-slate, #64748b)" strokeWidth="3" strokeLinecap="round" opacity="0.45" />
                </svg>
                <svg style={{ position: 'absolute', top: '16%', right: '6%', width: '3.8vw' }} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 5 L56 42 L95 50 L56 58 L50 95 L44 58 L5 50 L44 42 Z" stroke="var(--color-slate, #64748b)" strokeWidth="2.5" strokeLinejoin="round" fill="none" opacity="0.55" />
                </svg>
            </div>

            <div className="cp-header">
                <h2 className="cp-main-title">
                    <span className="cp-title-top-bread">complete</span>
                    <span className="cp-title-meat">
                        packaging
                        <svg className="cp-title-squiggle" viewBox="0 0 320 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 14 C 60 3, 140 18, 220 7 C 260 3, 290 12, 316 8" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    </span>
                    <span className="cp-title-bottom-bread">range</span>
                </h2>

                <p className="cp-subtitle">
                    Thoughtfully crafted packaging for every product. Explore by category to find what fits your brand best.
                </p>
            </div>

            <div className="cp-pills-container">
                <div className="cp-pills-slider" style={{ left: sliderStyle.left, width: sliderStyle.width }} />
                {CATEGORY_TABS.map((tab) => (
                    <button
                        key={tab.id}
                        ref={(el) => (tabRefs.current[tab.id] = el)}
                        className={`cp-pill-btn ${activeTab === tab.id ? 'is-active' : ''}`}
                        onClick={() => handleTabChange(tab.id)}
                    >
                        <span className="cp-pill-icon">{tab.icon}</span>
                        <span>{tab.label}</span>
                        {activeTab === tab.id && <span className="cp-pill-green-dot" />}
                    </button>
                ))}
            </div>

            <div className="cp-carousel-wrapper">
                <div className="cp-cards-viewport">
                    <div
                        className="cp-cards-track"
                        style={{
                            gridTemplateColumns:
                                activeCards.length === 4
                                    ? 'repeat(4, 1fr)'
                                    : activeCards.length === 2
                                    ? 'repeat(2, minmax(310px, 365px))'
                                    : 'minmax(320px, 380px)',
                            justifyContent: 'center'
                        }}
                    >
                        {activeCards.map((card, index) => (
                            <div
                                key={index}
                                className={`cp-bento-card ${card.bgClass}`}
                            >
                                {/* Art-Directed Miniature Hero Section Composition */}
                                <EditorialHeroStage card={card} index={index} />

                                <div className="cp-card-text-box">
                                    <h4 className="cp-card-title">{card.title}</h4>
                                    <p className="cp-card-desc">{card.desc}</p>
                                </div>

                                <div className="cp-card-badges-row">
                                    {card.chips.map((c, i) => (
                                        <span key={i} className="cp-feature-chip">
                                            {c}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
