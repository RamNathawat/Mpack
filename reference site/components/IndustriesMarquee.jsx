'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../app/styles/industries-worlds.css';

const industriesData = [
    { 
        name: "Food & Beverage", 
        src: "/assets/industries-section/sticker_trans_food_beverage.png",
        color: "#5a8a3c",
        tags: ["Stand-Up Pouch", "Side Gusset", "Composite Canister"]
    },
    { 
        name: "Nutraceuticals & Supplements", 
        src: "/assets/industries-section/sticker_trans_nutra.png",
        color: "#a855f7",
        tags: ["Composite Canister", "Stand-Up Pouch", "Shrink Sleeve"]
    },
    { 
        name: "Pharmaceuticals & Healthcare", 
        src: "/assets/industries-section/sticker_trans_pharma.png",
        color: "#2b7bb9",
        tags: ["Mono Carton Box", "3-Side Seal", "Roll Labels"]
    },
    { 
        name: "Personal Care & Cosmetics", 
        src: "/assets/industries-section/sticker_trans_personal.png",
        color: "#8c6bc4",
        tags: ["Mono Carton Box", "Spout Pouch", "Shrink Sleeve"]
    },
    { 
        name: "Pet Care & Animal Nutrition", 
        src: "/assets/industries-section/sticker_trans_pet.png",
        color: "#e07940",
        tags: ["Flat Bottom Pouch", "3-Side Seal Sachet"]
    },
    { 
        name: "Home Care & Household Products", 
        src: "/assets/industries-section/sticker_trans_home.png",
        color: "#2d8d9a",
        tags: ["Spout Pouch", "Shrink Sleeve Label"]
    },
    { 
        name: "Retail & E-Commerce", 
        src: "/assets/industries-section/sticker_trans_retail.png",
        color: "#4ab592",
        tags: ["E-Commerce Mailer", "Corrugated Carton"]
    },
    { 
        name: "Agriculture & Agro Products", 
        src: "/assets/industries-section/sticker_trans_agriculture.png",
        color: "#b8942d",
        tags: ["Heavy-Duty Pouch", "5-Panel Box Pouch"]
    }
];

export default function IndustriesMarquee() {
    const sectionRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            const ctx = gsap.context(() => {
                // Scroll stop / pin at top of viewport exactly matching CompletePackaging
                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=650',
                    pin: true,
                    pinSpacing: true,
                    invalidateOnRefresh: true
                });
            }, sectionRef);

            return () => ctx.revert();
        }
    }, []);

    return (
        <section ref={sectionRef} className="industries-worlds-section">
            <div className="industries-studio-header">
                <div className="studio-header-main centered">
                    <h2 className="studio-title centered">
                        Industries <span className="title-italic-gold">we serve.</span>
                    </h2>
                </div>
            </div>
            
            <div className="industries-marquee-container">
                <div className="industries-marquee-track">
                    {/* Triplicate the array for seamless infinite scrolling */}
                    {[...industriesData, ...industriesData, ...industriesData].map((industry, index) => (
                        <div 
                            className="industry-world-item" 
                            key={index}
                            style={{ '--hover-color': industry.color }}
                        >
                            <div className="industry-card-image-wrapper">
                                {industry.src ? (
                                    <img 
                                        src={industry.src} 
                                        alt={`${industry.name} Packaging World`} 
                                        className="industry-vector-sticker"
                                        loading="lazy" 
                                    />
                                ) : (
                                    <div className="industry-world-placeholder">
                                        <span>No Preview</span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="industry-world-content">
                                <div className="industry-name-row">
                                    <span className="industry-index">0{((index % industriesData.length) + 1)}</span>
                                    <h3 className="industry-world-name">{industry.name}</h3>
                                </div>
                                <div className="industry-world-tags">
                                    {industry.tags && industry.tags.map((tag, tIndex) => (
                                        <span key={tIndex} className="industry-world-tag" style={{ borderColor: `${industry.color}35` }}>
                                            <span className="tag-color-dot" style={{ backgroundColor: industry.color }} />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
