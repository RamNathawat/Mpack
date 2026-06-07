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
            gsap.set(pouchRef.current, { x: '-28vw', y: '-35vh', rotation: -10, scale: 1.85 }); // Top Left
            gsap.set(boxRef.current, { x: '28vw', y: '-35vh', rotation: 12, scale: 1.75 }); // Top Right
            gsap.set(labelRef.current, { x: '-28vw', y: '20vh', rotation: -15, scale: 1.7 }); // Bottom Left
            gsap.set(canisterRef.current, { x: '28vw', y: '20vh', rotation: 10, scale: 1.75 }); // Bottom Right

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
                { x: '-28vw', y: '-35vh', rotation: -10, scale: 1.85 }, 
                { x: '-38vw', y: '-8vh', rotation: 0, scale: 1.2, duration: 1.5, ease: gridEase }, 0);
                
            morphTl.fromTo(boxRef.current,    
                { x: '28vw', y: '-35vh', rotation: 12, scale: 1.75 }, 
                { x: '-13vw', y: '-8vh', rotation: 0, scale: 1.2, duration: 1.5, ease: gridEase }, 0);
                
            morphTl.fromTo(labelRef.current,   
                { x: '-28vw', y: '20vh', rotation: -15, scale: 1.7 }, 
                { x: '13vw',  y: '-8vh', rotation: 0, scale: 1.2, duration: 1.5, ease: gridEase }, 0);
                
            morphTl.fromTo(canisterRef.current,  
                { x: '28vw', y: '20vh', rotation: 10, scale: 1.75 }, 
                { x: '38vw',  y: '-8vh', rotation: 0, scale: 1.2, duration: 1.5, ease: gridEase }, 0);

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
            
            // Calculate rotation (max 15 degrees)
            const rotY = (relX / (rect.width / 2)) * 15;
            const rotX = (relY / (rect.height / 2)) * -15;

            gsap.to(inner, {
                rotationY: rotY,
                rotationX: rotX,
                duration: 0.4,
                ease: "power2.out",
                transformPerspective: 900
            });
        };

        const handlePouchLeave = (index) => {
            const inner = innersRef.current[index];
            if (!inner) return;
            gsap.to(inner, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.5)" // Satisfying snap back
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
        if (wrapperRef.current) {
            const rect = wrapperRef.current.getBoundingClientRect();
            // Calculate absolute scroll position of the end of the pinned section
            const targetScroll = rect.top + window.scrollY + rect.height - window.innerHeight;
            
            // Native smooth scroll is too fast. Let's use GSAP to animate a proxy object 
            // for a slow, 2.5-second cinematic scroll timeline.
            const scrollProxy = { y: window.scrollY };
            gsap.to(scrollProxy, {
                y: targetScroll,
                duration: 2.8,
                ease: "power3.inOut",
                onUpdate: () => {
                    window.scrollTo(0, scrollProxy.y);
                }
            });
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
                
                {/* Clean Background Image Layer */}
                <div 
                    className="hero-new__bg" 
                    style={{ backgroundImage: `url('/assets/images/clean_hero_bg.png')` }}
                />
                
                <div className="hero-new__overlay" />

                <div className="hero-products-container">
                    {/* Pouch */}
                    <div className="pouch-wrapper" ref={pouchRef}>
                        <div className="pouch-inner" ref={addToRefs(innersRef.current)}>
                            <div className="mockup-layer" ref={addToRefs(imgsRef.current)}>
                                <div className="floating-product-label" style={{ top: '42%', left: '50%', transform: 'translate(-50%, -50%) rotate(-8deg)' }}>
                                    <span className="ink-serial">01 — FLX-STD</span>
                                    <span className="ink-title">Pouch</span>
                                    <span className="ink-meta">MATTE / 100% REC</span>
                                </div>
                                <div className="blank-mockup-container">
                                    <img src="/assets/images/blank_pouch.png" alt="Blank Pouch" className="blank-mockup" />
                                </div>
                                <img src="/assets/images/vibe_pouch_noshadow.png" alt="Flexible Pouches" className="printed-mockup" />
                            </div>
                        </div>
                        <div className="pouch-label-group" ref={addToRefs(labelsRef.current)}>
                            <div className="pouch-label">Flexible Pouches</div>
                            <div className="pouch-desc">Stand-up, flat bottom, and spout pouches.</div>
                        </div>
                    </div>
                    
                    {/* Box */}
                    <div className="pouch-wrapper" ref={boxRef}>
                        <div className="pouch-inner" ref={addToRefs(innersRef.current)}>
                            <div className="mockup-layer" ref={addToRefs(imgsRef.current)}>
                                <div className="floating-product-label" style={{ top: '45%', left: '50%', transform: 'translate(-50%, -50%) rotate(12deg)' }}>
                                    <span className="ink-serial">02 — RGD-PRM</span>
                                    <span className="ink-title">Box</span>
                                    <span className="ink-meta">EMBOSSED / LUX</span>
                                </div>
                                <div className="blank-mockup-container">
                                    <img src="/assets/images/blank_box.png" alt="Blank Box" className="blank-mockup" />
                                </div>
                                <img src="/assets/images/vibe_box.png" alt="Rigid Boxes" className="printed-mockup" />
                            </div>
                        </div>
                        <div className="pouch-label-group" ref={addToRefs(labelsRef.current)}>
                            <div className="pouch-label">Rigid Boxes</div>
                            <div className="pouch-desc">Premium custom boxes for retail and e-commerce.</div>
                        </div>
                    </div>
                    
                    {/* Label */}
                    <div className="pouch-wrapper" ref={labelRef}>
                        <div className="pouch-inner" ref={addToRefs(innersRef.current)}>
                            <div className="mockup-layer" ref={addToRefs(imgsRef.current)}>
                                <div className="floating-product-label" style={{ top: '40%', left: '37%', transform: 'translate(-50%, -50%) rotate(-28deg)' }}>
                                    <span className="ink-serial">03 — RLL-ADH</span>
                                    <span className="ink-title">Label</span>
                                    <span className="ink-meta">GLOSS / DIE-CUT</span>
                                </div>
                                <div className="blank-mockup-container">
                                    <img src="/assets/images/blank_label.png" alt="Blank Label" className="blank-mockup" />
                                </div>
                                <img src="/assets/images/mockup_label.png" alt="Custom Labels" className="printed-mockup" />
                            </div>
                        </div>
                        <div className="pouch-label-group" ref={addToRefs(labelsRef.current)}>
                            <div className="pouch-label">Custom Labels</div>
                            <div className="pouch-desc">High-quality roll and sheet labels for any product.</div>
                        </div>
                    </div>
                    
                    {/* Canister */}
                    <div className="pouch-wrapper" ref={canisterRef}>
                        <div className="pouch-inner" ref={addToRefs(innersRef.current)}>
                            <div className="mockup-layer" ref={addToRefs(imgsRef.current)}>
                                <div className="floating-product-label" style={{ top: '55%', left: '50%', transform: 'translate(-50%, -50%) rotate(-32deg)' }}>
                                    <span className="ink-serial">04 — CYL-ECO</span>
                                    <span className="ink-title">Canister</span>
                                    <span className="ink-meta">KRAFT / FOOD SAFE</span>
                                </div>
                                <div className="blank-mockup-container">
                                    <img src="/assets/images/blank_canister.png" alt="Blank Canister" className="blank-mockup" />
                                </div>
                                <img src="/assets/images/mockup_canister_noshadow.png" alt="Paper Canisters" className="printed-mockup" />
                            </div>
                        </div>
                        <div className="pouch-label-group" ref={addToRefs(labelsRef.current)}>
                            <div className="pouch-label">Paper Canisters</div>
                            <div className="pouch-desc">Eco-friendly cylindrical packaging for powders and snacks.</div>
                        </div>
                    </div>
                </div>

                <div className="hero-new__content">
                    <h1 className="hero-new__title" ref={titleRef}>
                        <span className="hero-new__word">Premium </span>
                        <br />
                        <span className="hero-new__word">Packaging </span>
                        <br />
                        <span className="hero-new__word is--relative">
                            <em>Solutions</em>
                            <img src="/assets/VimeoHero SVG/oval-underline.svg" alt="" className="hero-new__underline" />
                        </span>
                    </h1>
                    
                    <p className="hero-new__subtitle hero-new__word" ref={subtitleRef}>
                        Your trusted partner for bespoke packaging, from concept to shelf-ready production.
                    </p>

                    <div className="hero-new__cta hero-new__word" ref={btnRef}>
                        <a href="#explore" onClick={handleScrollClick} className="hero-btn" data-cursor-text="Scroll">Scroll to Interact</a>
                    </div>
                </div>
                
            </div>
        </section>
    );
};

export default Hero;
