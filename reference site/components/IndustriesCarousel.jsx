'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import '../app/styles/industries-marquee.css';

const industries = [
    { name: "Pet Care", icon: <img src="/assets/stickers/pet_care_sticker.png" alt="Pet Care" className="industry-sticker-img" />, color: "#e07940", lightColor: "rgba(255, 179, 155, 0.45)" }, 
    { name: "Food & Beverage", icon: <img src="/assets/stickers/food_bev_sticker.png" alt="Food & Beverage" className="industry-sticker-img" />, color: "#5a8a3c", lightColor: "rgba(210, 228, 196, 0.5)" }, 
    { name: "Pharma & Healthcare", icon: <img src="/assets/stickers/pharma_sticker.png" alt="Pharma & Healthcare" className="industry-sticker-img" />, color: "#c25a7a", lightColor: "rgba(240, 190, 250, 0.4)" }, 
    { name: "Personal Care", icon: <img src="/assets/stickers/personal_care_sticker.png" alt="Personal Care" className="industry-sticker-img" />, color: "#7c6bc4", lightColor: "rgba(200, 185, 245, 0.4)" }, 
    { name: "Home Care", icon: <img src="/assets/stickers/home_care_sticker.png" alt="Home Care" className="industry-sticker-img" />, color: "#2d7d9a", lightColor: "rgba(180, 225, 240, 0.45)" }, 
    { name: "Agriculture", icon: <img src="/assets/stickers/agriculture_sticker.png" alt="Agriculture" className="industry-sticker-img" />, color: "#b8942d", lightColor: "rgba(255, 243, 176, 0.5)" }, 
];

export default function IndustriesCarousel() {
    const sectionRef = useRef(null);
    const trackWrapperRef = useRef(null);
    const trackRef = useRef(null);
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        let ctx = gsap.context(() => {
            // 1. Cinematic Entrance Animations
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                    onEnter: () => {
                        if (trackRef.current) {
                            trackRef.current.classList.add('is-visible');
                        }
                    }
                }
            });

            tl
              .fromTo(".reveal-text", 
                  { y: "110%", opacity: 0 }, 
                  { y: "0%", opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" }, 
                  "-=0.6"
              )
              .fromTo(".industries-header p", 
                  { opacity: 0, y: 20 }, 
                  { opacity: 0.8, y: 0, duration: 1, ease: "power3.out" }, 
                  "-=0.6"
              )
              .fromTo(".industry-card-container", 
                  { opacity: 0, x: 50 }, 
                  { opacity: 1, x: 0, duration: 1, stagger: 0.1, ease: "power3.out" }, 
                  "-=0.8"
              );

            // 2. Horizontal Scroll with Parallax Momentum
            if (window.innerWidth > 768) {
                const track = trackRef.current;
                
                // Safely calculate scroll amount
                const getScrollAmount = () => {
                    const scrollWidth = track.scrollWidth;
                    const viewportWidth = window.innerWidth;
                    // If content fits in screen, don't scroll
                    if (scrollWidth <= viewportWidth) return 0;
                    return -(scrollWidth - viewportWidth + 100);
                };

                const scrollTween = gsap.to(track, {
                    x: getScrollAmount,
                    ease: "none"
                });

                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: "top top",
                    // Use only the overflow distance, not the full scrollWidth
                    end: () => {
                        const overflow = track.scrollWidth - window.innerWidth;
                        return `+=${Math.max(overflow + 100, 0)}`;
                    }, 
                    pin: true,
                    animation: scrollTween,
                    scrub: 0.5, 
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const velocity = self.getVelocity();
                        let skew = velocity / 300; 
                        skew = Math.max(-5, Math.min(5, skew));
                        
                        gsap.to(".industry-card", {
                            skewX: -skew,
                            duration: 0.4,
                            ease: "power1.out",
                            overwrite: "auto"
                        });
                        
                        clearTimeout(track.scrollTimeout);
                        track.scrollTimeout = setTimeout(() => {
                            gsap.to(".industry-card", { skewX: 0, duration: 0.6, ease: "back.out(1.5)" });
                        }, 50);
                    }
                });
            }
        }, sectionRef);

        // Crucial fix: Force a refresh after a small delay.
        // This ensures ScrollTrigger recalibrates if images in the *previous* sections
        // loaded late and pushed the layout down, causing early pinning overlap.
        const refreshTimeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);

        return () => {
            clearTimeout(refreshTimeout);
            ctx.revert();
        };
    }, []);

    // Also listen for window resize / image load events globally to refresh triggers
    useEffect(() => {
        const handleLoad = () => ScrollTrigger.refresh();
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
    }, []);

    const headerWords = "industries we work with".split(' ');

    return (
        <section className="industries-grid-section" ref={sectionRef}>
            <div className="industries-pin-container">
                <div className="industries-header">
                    <h2>
                        {headerWords.map((word, i) => (
                            <span className="reveal-mask" key={i}>
                                <span className="reveal-text">{word}&nbsp;</span>
                            </span>
                        ))}
                    </h2>
                    <p>We provide specialized end-to-end packaging solutions tailored to the unique demands of these core industries.</p>
                </div>
                
                <div className="industries-track-wrapper" ref={trackWrapperRef}>
                    <div className="industries-track" ref={trackRef}>
                        {industries.map((ind, i) => (
                            <div className="industry-card-container" key={i}>
                                <div className="industry-card" style={{ '--hover-color': ind.color, '--hover-color-light': ind.lightColor }}>
                                    <div className="industry-icon-wrapper">
                                        {ind.icon}
                                    </div>
                                    <h3>{ind.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
