"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "../app/styles/hero-new.css";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}



const Hero = () => {
    const wrapperRef = useRef(null);
    const pinnedRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const btnRef = useRef(null);
    
    // Pouches (Products)
    const pouchRef = useRef(null);
    const boxRef = useRef(null);
    const labelRef = useRef(null);
    const canisterRef = useRef(null);
    
    // Grid Elements
    const gridHeaderRef = useRef(null);
    
    // Pouch Inners (for 3D tilt)
    const innersRef = useRef([]);
    const imgsRef = useRef([]);
    
    // Labels
    const labelsRef = useRef([]);

    // Grid State tracking for 3D hover
    const isGridState = useRef(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Initial State Setting
            gsap.set([pouchRef.current, boxRef.current, labelRef.current, canisterRef.current], { 
                xPercent: -50, 
                yPercent: -50 
            });
            
            // --- 1. INITIAL EDITORIAL STATE (Framing the text) ---
            gsap.set(pouchRef.current, { x: '-32vw', y: '-30vh', rotation: -10, scale: 1.8 }); // Top Left
            gsap.set(boxRef.current, { x: '35vw', y: '-30vh', rotation: 12, scale: 1.45 }); // Top Right
            gsap.set(labelRef.current, { x: '-32vw', y: '25vh', rotation: -15, scale: 1.7 }); // Bottom Left
            gsap.set(canisterRef.current, { x: '32vw', y: '25vh', rotation: 10, scale: 1.75 }); // Bottom Right

            // Entrance Animation (Text)
            gsap.from(".hero-new__word", {
                y: 50,
                opacity: 0,
                duration: 1.4,
                stagger: 0.1,
                ease: "expo.out",
                delay: 0.2
            });
            
            // Fade in labels softly
            gsap.fromTo(".floating-product-label",
                { opacity: 0 },
                { opacity: 1, duration: 1.4, ease: "power2.out", delay: 0.8 }
            );
            
            // Entrance Animation (Products)
            gsap.from(innersRef.current, {
                scale: 0.4,
                opacity: 0,
                y: 100,
                duration: 1.8,
                stagger: 0.1,
                ease: "expo.out",
                delay: 0.6
            });

            // Continuous slow float effect removed to improve scroll performance and eliminate lag

            // 2. The Layout Morph Timeline (On Scroll)
            const morphTl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.2,
                    pin: pinnedRef.current,
                    onUpdate: (self) => {
                        // Enable 3D hover only when grid is mostly formed
                        isGridState.current = self.progress > 0.8;
                        
                        // No process indicator to update anymore
                        const p = self.progress;
                    }
                }
            });

            // Fade out the text content on scroll
            morphTl.fromTo(".hero-new__content", 
                { opacity: 1, y: 0 },
                { opacity: 0, y: -50, duration: 0.6, ease: "power2.in" }, 
                0
            );

            // Fade out labels on scroll
            morphTl.to(".floating-product-label", {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            }, 0);

            // Morph Products into Grid (Start large, smoothly scale down to grid size)
            const gridEase = "power3.inOut";
            
            morphTl.fromTo(pouchRef.current, 
                { x: '-32vw', y: '-30vh', rotation: -10, scale: 1.8 }, 
                { x: '-38vw', y: '-8vh', rotation: 0, scale: 1.4, duration: 1.5, ease: gridEase }, 0);
                
            morphTl.fromTo(boxRef.current,    
                { x: '35vw', y: '-30vh', rotation: 12, scale: 1.45 }, 
                { x: '-13vw', y: '-8vh', rotation: 0, scale: 1.2, duration: 1.5, ease: gridEase }, 0);
                
            morphTl.fromTo(labelRef.current,   
                { x: '-32vw', y: '25vh', rotation: -15, scale: 1.7 }, 
                { x: '13vw',  y: '-8vh', rotation: 0, scale: 1.4, duration: 1.5, ease: gridEase }, 0);
                
            morphTl.fromTo(canisterRef.current,  
                { x: '32vw', y: '25vh', rotation: 10, scale: 1.75 }, 
                { x: '38vw',  y: '-8vh', rotation: 0, scale: 1.4, duration: 1.5, ease: gridEase }, 0);

            // Minimize and fade out the blobs as the mockups move into the grid
            morphTl.to(".mockup-backdrop", {
                scale: 0,
                opacity: 0,
                duration: 1.2,
                ease: "power2.inOut"
            }, 0);

            // Dynamically add shadow as they reach the grid (position 2)
            morphTl.fromTo([imgsRef.current[1], imgsRef.current[2]],
                { filter: "drop-shadow(0 0px 0px rgba(0,0,0,0))" },
                { filter: "drop-shadow(0 40px 50px rgba(0,0,0,0.25))", duration: 1.5, ease: gridEase }, 0
            );

            // Set initial printing states for elegant soft mask reveal
            gsap.set(".printed-mockup", { 
                opacity: 1, 
                webkitMaskPosition: "100% 0%",
                maskPosition: "100% 0%"
            });

            const printDuration = 2.4; // Slightly slower, more luxurious

            // Elegant, feathered ink sweep animation
            morphTl.to(".printed-mockup", {
                webkitMaskPosition: "0% 0%",
                maskPosition: "0% 0%",
                duration: printDuration,
                ease: "power2.inOut",
                stagger: 0.15
            }, 0.3);

            // Fade in grid labels
            morphTl.fromTo(labelsRef.current, 
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "expo.out"
                }, 
                0.8
            );

            // Fade in grid title
            morphTl.fromTo(gridHeaderRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" },
                0.6 // Starts appearing as products settle into grid
            );

        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    // 3D Tilt Logic & Cursor Parallax
    useEffect(() => {
        // 3D Pouch Tilt
        const handlePouchMove = (e, index) => {
            if (!isGridState.current) return; // Only tilt when in grid mode
            const inner = innersRef.current[index];
            if (!inner) return;

            const rect = inner.getBoundingClientRect();
            const relX = e.clientX - rect.left - rect.width / 2;
            const relY = e.clientY - rect.top - rect.height / 2;
            
            // Calculate rotation (max 4 degrees for subtle feel)
            const rotY = (relX / (rect.width / 2)) * 4;
            const rotX = (relY / (rect.height / 2)) * -4;

            gsap.to(inner, {
                rotationY: rotY,
                rotationX: rotX,
                duration: 0.8,
                ease: "power3.out",
                transformPerspective: 1200
            });
        };

        const handlePouchLeave = (index) => {
            const inner = innersRef.current[index];
            if (!inner) return;
            gsap.to(inner, {
                rotationY: 0,
                rotationX: 0,
                duration: 1.2,
                ease: "elastic.out(1, 0.75)" // Satisfying, heavy snap back
            });
        };

        const wrappers = [pouchRef, boxRef, labelRef, canisterRef];
        wrappers.forEach((ref, i) => {
            if (ref.current) {
                ref.current.addEventListener("mousemove", (e) => handlePouchMove(e, i));
                ref.current.addEventListener("mouseleave", () => handlePouchLeave(i));
            }
        });

        // Chaotic Cursor Parallax (Hero State)
        const parallaxQuicks = [
            { x: gsap.quickTo(imgsRef.current[0], "x", { duration: 0.8, ease: "power3.out" }), y: gsap.quickTo(imgsRef.current[0], "y", { duration: 0.8, ease: "power3.out" }), factor: -0.04 },
            { x: gsap.quickTo(imgsRef.current[1], "x", { duration: 1.2, ease: "power3.out" }), y: gsap.quickTo(imgsRef.current[1], "y", { duration: 1.2, ease: "power3.out" }), factor: 0.03 },
            { x: gsap.quickTo(imgsRef.current[2], "x", { duration: 1.0, ease: "power3.out" }), y: gsap.quickTo(imgsRef.current[2], "y", { duration: 1.0, ease: "power3.out" }), factor: -0.06 },
            { x: gsap.quickTo(imgsRef.current[3], "x", { duration: 1.4, ease: "power3.out" }), y: gsap.quickTo(imgsRef.current[3], "y", { duration: 1.4, ease: "power3.out" }), factor: 0.05 },
        ];

        const handleHeroParallax = (e) => {
            if (isGridState.current) {
                // Return to neutral when in grid state
                parallaxQuicks.forEach(pq => { pq.x(0); pq.y(0); });
                return;
            }
            
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;

            parallaxQuicks.forEach(pq => {
                pq.x(dx * pq.factor);
                pq.y(dy * pq.factor);
            });

            // Dynamic Specular Glare for printed ink labels
            const pctX = e.clientX / window.innerWidth;
            const bgPos = pctX * 200 - 50; // Sweeps from -50% to 150%
            gsap.to(".floating-product-label", {
                backgroundPosition: `${bgPos}% 0%`,
                duration: 0.8,
                ease: "power3.out"
            });
        };

        window.addEventListener("mousemove", handleHeroParallax);

        return () => {
            wrappers.forEach((ref, i) => {
                if (ref.current) {
                    ref.current.removeEventListener("mousemove", (e) => handlePouchMove(e, i));
                    ref.current.removeEventListener("mouseleave", () => handlePouchLeave(i));
                }
            });
            window.removeEventListener("mousemove", handleHeroParallax);
        };
    }, []);

    const addToRefs = (arr) => (el) => {
        if (el && !arr.includes(el)) {
            arr.push(el);
        }
    };

    const handleScrollClick = (e) => {
        e.preventDefault();
        
        // Use slideshow logic if available
        if (window.__slideshowStops && window.__lenis) {
            const stops = window.__slideshowStops();
            const currentScroll = window.scrollY;
            const nextStop = stops.find(pos => pos > currentScroll + 50);
            if (nextStop !== undefined) {
                window.__lenis.scrollTo(nextStop, { duration: 4.5, lock: true });
                return;
            }
        }

        // Fallback
        if (wrapperRef.current) {
            const rect = wrapperRef.current.getBoundingClientRect();
            const targetScroll = rect.top + window.scrollY + rect.height - window.innerHeight;
            
            if (window.__lenis) {
                window.__lenis.scrollTo(targetScroll, { duration: 1.5 });
            } else {
                window.scrollTo({ top: targetScroll, behavior: 'smooth' });
            }
        }
    };

    return (
        <section className="hero-morph-wrapper" ref={wrapperRef}>
            <svg style={{ width: 0, height: 0, position: 'absolute' }}>
                <filter id="ink-bleed">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
                </filter>
            </svg>

            <div className="hero-morph-pinned" ref={pinnedRef}>
                <div className="hero-studio-background" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
                    <div className="hero-blueprint-master-bg"></div>
                </div>
                <div className="hero-products-container">
                    
                    {/* Grid Title that fades in */}
                    <div className="hero-grid-header" ref={gridHeaderRef}>
                        <h2 className="hero-grid-title">our <span className="hero-grid-title-italic">Primary</span> range</h2>
                    </div>

                    {/* Pouch */}
                    <div className="pouch-wrapper" ref={pouchRef}>
                        <div className="pouch-inner" ref={addToRefs(innersRef.current)}>
                            <div className="mockup-backdrop bubble-green"></div>
                            <div className="mockup-layer" ref={addToRefs(imgsRef.current)} style={{ WebkitMaskImage: 'url(/assets/hero-section/blank_pouch.png)', maskImage: 'url(/assets/hero-section/blank_pouch.png)', WebkitMaskSize: '100% 100%', maskSize: '100% 100%', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat' }}>

                                <div className="blank-mockup-container">
                                    <img src="/assets/hero-section/competitor_pouch.png" alt="Competitor Pouch" className="blank-mockup" style={{ mixBlendMode: 'darken' }} />
                                </div>
                                <img src="/assets/hero-section/emerald_pouch.png" alt="Flexible Pouches" className="printed-mockup" />
                            </div>
                        </div>
                        <div className="pouch-label-group" ref={addToRefs(labelsRef.current)}>
                            <div className="pouch-label">Flexible <span className="pouch-label-italic">Pouches</span></div>
                            <div className="pouch-desc">Serving food, beverage, nutraceutical, pet care, and home care brands.</div>
                        </div>
                    </div>
                    
                    {/* Box */}
                    <div className="pouch-wrapper box-wrapper" ref={boxRef}>
                        <div className="pouch-inner" ref={addToRefs(innersRef.current)}>
                            <div className="mockup-backdrop bubble-peach"></div>
                            <div className="mockup-layer" ref={addToRefs(imgsRef.current)} style={{ WebkitMaskImage: 'url(/assets/hero-section/blank_box.png)', maskImage: 'url(/assets/hero-section/blank_box.png)', WebkitMaskSize: '100% 100%', maskSize: '100% 100%', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat' }}>

                                <div className="blank-mockup-container">
                                    <img src="/assets/hero-section/competitor_box.png" alt="Competitor Box" className="blank-mockup" style={{ mixBlendMode: 'darken' }} />
                                </div>
                                <img src="/assets/hero-section/terracotta_box.png" alt="Rigid Boxes" className="printed-mockup" />
                            </div>
                        </div>
                        <div className="pouch-label-group" ref={addToRefs(labelsRef.current)}>
                            <div className="pouch-label">Customised <span className="pouch-label-italic">Boxes</span></div>
                            <div className="pouch-desc">Supporting retail, e-commerce, cosmetics, electronics, and premium gifting sectors.</div>
                        </div>
                    </div>
                    
                    {/* Label */}
                    <div className="pouch-wrapper label-wrapper" ref={labelRef}>
                        <div className="pouch-inner" ref={addToRefs(innersRef.current)}>
                            <div className="mockup-backdrop bubble-yellow"></div>
                            <div className="mockup-layer" ref={addToRefs(imgsRef.current)} style={{ WebkitMaskImage: 'url(/assets/hero-section/blank_label.png)', maskImage: 'url(/assets/hero-section/blank_label.png)', WebkitMaskSize: '100% 100%', maskSize: '100% 100%', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat' }}>

                                <div className="blank-mockup-container">
                                    <img src="/assets/hero-section/competitor_label.png" alt="Competitor Label" className="blank-mockup" style={{ mixBlendMode: 'darken' }} />
                                </div>
                                <img src="/assets/hero-section/mockup_label.png" alt="Custom Labels" className="printed-mockup" />
                            </div>
                        </div>
                        <div className="pouch-label-group" ref={addToRefs(labelsRef.current)}>
                            <div className="pouch-label">Bespoke <span className="pouch-label-italic">Labels</span></div>
                            <div className="pouch-desc">Tailored for FMCG, food, beverage, healthcare, and personal care industries.</div>
                        </div>
                    </div>
                    
                    {/* Canister */}
                    <div className="pouch-wrapper" ref={canisterRef}>
                        <div className="pouch-inner" ref={addToRefs(innersRef.current)}>
                            <div className="mockup-backdrop bubble-blue"></div>
                            <div className="mockup-layer" ref={addToRefs(imgsRef.current)} style={{ WebkitMaskImage: 'url(/assets/hero-section/blank_canister.png)', maskImage: 'url(/assets/hero-section/blank_canister.png)', WebkitMaskSize: '100% 100%', maskSize: '100% 100%', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat' }}>

                                <div className="blank-mockup-container">
                                    <img src="/assets/hero-section/competitor_canister.png" alt="Competitor Canister" className="blank-mockup" style={{ mixBlendMode: 'darken' }} />
                                </div>
                                <img src="/assets/hero-section/midnight_canister.png" alt="Paper Canisters" className="printed-mockup" />
                            </div>
                        </div>
                        <div className="pouch-label-group" ref={addToRefs(labelsRef.current)}>
                            <div className="pouch-label">Premium <span className="pouch-label-italic">Canisters</span></div>
                            <div className="pouch-desc">Perfect for coffee, tea, dry fruits, supplements, confectionery, and luxury products.</div>
                        </div>
                    </div>
                </div>

                <div className="hero-new__content">
                    <h1 className="hero-new__title" ref={titleRef} style={{ flexDirection: 'column', gap: 0 }}>
                        <span className="hero-new__word" style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#64748b', marginBottom: '1rem' }}>Premium</span>
                        <span className="hero-new__word" style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)', lineHeight: 0.9, position: 'relative', zIndex: 2 }}>Packaging</span>
                        <span className="hero-new__word is--relative" style={{ color: '#2e68f3' }}>
                            <span className="hero-new__hatch-text" style={{ position: 'relative', zIndex: 1 }}>Solutions</span>
                            <svg 
                                className="hero-new__underline" 
                                style={{ bottom: '-5px', overflow: 'visible', zIndex: 0 }} 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="120%" 
                                viewBox="0 0 608 100" 
                                fill="none"
                            >
                                <path 
                                    className="hero-new__underline-path"
                                    d="M322.902 98.9997C232.515 99.0422 140.637 94.7899 58.0275 80.853C31.532 76.3775 2.92086 69.1167 1.08733 58.1139C-0.222339 50.1514 13.3981 42.965 28.5701 37.4583C61.2714 25.5944 103.362 18.1423 146.239 12.7206C228.606 2.3131 316.878 -1.23755 403.155 2.36627C456.307 4.58809 509.519 9.62707 555.338 20.109C581.41 26.0728 606.777 35.279 606.999 46.8453C607.12 53.7659 597.831 60.3569 584.835 65.1939C571.839 70.0309 555.398 73.3158 538.675 76.0266C463.097 88.252 379.057 89.8891 297.011 91.3668" 
                                    stroke="#ffffff" 
                                    strokeWidth="3" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                />
                            </svg>
                        </span>
                    </h1>
                    
                    <p className="hero-new__subtitle hero-new__word" ref={subtitleRef}>
                        Your trusted partner for bespoke packaging, from concept to shelf-ready production.
                    </p>

                    <div className="hero-new__cta hero-new__word" ref={btnRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                        <a href="#explore" onClick={handleScrollClick} className="hero-btn" data-cursor-text="Scroll">Scroll to Interact</a>
                        
                        <div className="hero-scroll-arrows">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2e68f3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m7 6 5 5 5-5"/>
                                <path d="m7 13 5 5 5-5"/>
                            </svg>
                        </div>
                    </div>

                    {/* Floating Background Swatches */}
                    <div className="hero-floating-element element-blue-stripes"></div>
                    <div className="hero-floating-element element-green-solid"></div>
                </div>
                
            </div>
        </section>
    );
};

export default Hero;
