'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
    {
        title: "Flexible Printed Pouches",
        description: "3 Side Sealed, Center Seal, Stand Up Pouch, Side Gusset, Spout Pouch, Retort Pouch, Flat Bottom.",
        img: "/assets/images/flexible_pouches_1779781222051.png"
    },
    {
        title: "Packaging Boxes",
        description: "Folding carton boxes, Rigid boxes, Corrugated boxes, Drawer/slide boxes.",
        img: "/assets/images/packaging_boxes_1779781241229.png"
    },
    {
        title: "Labels & Sleeves",
        description: "Self adhesive, Wrap around, Shrink sleeve, IML labels, Paper printed sleeves.",
        img: "/assets/images/canisters_1779781257624.png" // reusing canister image for now
    },
    {
        title: "Canisters",
        description: "Composite paper canisters, Tin canisters for premium dry goods.",
        img: "/assets/images/canisters_1779781257624.png"
    }
];

export default function ProductCategories() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".category-row", {
                x: -100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="categories-section" ref={sectionRef}>
            <div className="title-container" style={{ padding: '40px 20px', textAlign: 'center' }}>
                <h2 className="main-title" style={{ fontSize: '4rem', marginBottom: '10px' }}>What we <span className="italic-text">make</span></h2>
            </div>

            <div className="categories-container">
                {categories.map((cat, idx) => (
                    <div className="category-row" key={idx} data-cursor-text="View Gallery">
                        <div className="category-text">
                            <h3>{cat.title}</h3>
                            <p>{cat.description}</p>
                        </div>
                        <div className="category-img-wrapper">
                            <img src={cat.img} alt={cat.title} className="category-img" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
