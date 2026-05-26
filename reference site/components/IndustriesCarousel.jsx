'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const industries = [
    { name: "Spices", img: "/assets/images/hero_mockup_1779781205494.png" },
    { name: "Dry Fruits", img: "/assets/images/flexible_pouches_1779781222051.png" },
    { name: "Frozen Food", img: "/assets/images/hero_mockup_1779781205494.png" },
    { name: "Retort Food", img: "/assets/images/flexible_pouches_1779781222051.png" },
    { name: "Coffee", img: "/assets/images/coffee_industry_1779781275769.png" },
    { name: "Snacks", img: "/assets/images/hero_mockup_1779781205494.png" }
];

export default function IndustriesCarousel() {
    const containerRef = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const track = scrollRef.current;
            const amountToScroll = track.scrollWidth - window.innerWidth;

            if (amountToScroll > 0) {
                gsap.to(track, {
                    x: -amountToScroll,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: () => `+=${amountToScroll}`,
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="industries-section" ref={containerRef}>
            <div className="title-container" style={{ position: 'absolute', top: '50px', left: '40px', zIndex: 10 }}>
                <h2 className="main-title" style={{ fontSize: '3rem' }}>Industries <span className="italic-text">Served</span></h2>
            </div>
            <div className="industries-track" ref={scrollRef}>
                {industries.map((ind, i) => (
                    <div className="industry-card" key={i} data-cursor-text="Explore">
                        <img src={ind.img} alt={ind.name} className="industry-img" />
                        <div className="industry-overlay">
                            <h3>{ind.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
