import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../app/styles/packaging-showcase.css';

gsap.registerPlugin(ScrollTrigger);

const techData = {
    "Digital Printing": { name: "Digital Printing", img: "/assets/mockups/tech_digital_same_1780305468051.png" },
    "Flexographic Printing": { name: "Flexographic Printing", img: "/assets/mockups/tech_flexo_consistent_1780305154097.png" }, // Source design
    "Rotogravure Printing": { name: "Rotogravure Printing", img: "/assets/mockups/tech_roto_same_1780305486698.png" },
    "Offset Printing": { name: "Offset Printing", img: "/assets/mockups/tech_offset_consistent_1780305189707.png" },
    "In-Mould Labelling": { name: "In-Mould Labelling", img: "/assets/mockups/tech_inmould_consistent_1780305208240.png" }
};

const showcaseData = {
    pouches: {
        title: "Pouches",
        technologies: ["Digital Printing", "Flexographic Printing", "Rotogravure Printing"],
        variants: [
            { id: 'p1', name: "Stand-Up Pouch", desc: "Versatile and prominent on shelves.", img: "/assets/mockups/pouches_mockup_1780303304206.png" },
            { id: 'p2', name: "Flat Bottom Pouch", desc: "Maximum volume and stability.", img: "/assets/mockups/pouches_mockup_1780303304206.png" },
            { id: 'p3', name: "Spout Pouch", desc: "Perfect for liquids and semi-solids.", img: "/assets/mockups/pouches_mockup_1780303304206.png" },
            { id: 'p4', name: "Three Side Seal Pouch", desc: "Economical and efficient for single-use.", img: "/assets/mockups/pouches_mockup_1780303304206.png" }
        ]
    },
    boxes: {
        title: "Boxes",
        technologies: ["Digital Printing", "Offset Printing"],
        variants: [
            { id: 'b1', name: "Folding Carton", desc: "Classic lightweight packaging.", img: "/assets/mockups/boxes_mockup_1780303320244.png" },
            { id: 'b2', name: "Rigid Box", desc: "Premium unboxing experience.", img: "/assets/mockups/boxes_mockup_1780303320244.png" },
            { id: 'b3', name: "Mailer Box", desc: "Durable and ecommerce ready.", img: "/assets/mockups/boxes_mockup_1780303320244.png" },
            { id: 'b4', name: "Corrugated Box", desc: "Heavy duty shipping protection.", img: "/assets/mockups/boxes_mockup_1780303320244.png" }
        ]
    },
    labels: {
        title: "Labels",
        technologies: ["Digital Printing", "Flexographic Printing", "In-Mould Labelling"],
        variants: [
            { id: 'l1', name: "Roll Labels", desc: "High volume automated application.", img: "/assets/mockups/labels_mockup_1780303339862.png" },
            { id: 'l2', name: "Sheet Labels", desc: "Perfect for small batch manual application.", img: "/assets/mockups/labels_mockup_1780303339862.png" },
            { id: 'l3', name: "In-Mould Labels", desc: "Seamless integration with containers.", img: "/assets/mockups/labels_mockup_1780303339862.png" },
            { id: 'l4', name: "Custom Product Labels", desc: "Bespoke shapes and finishes.", img: "/assets/mockups/labels_mockup_1780303339862.png" }
        ]
    },
    canisters: {
        title: "Canisters",
        technologies: ["Digital Printing", "Offset Printing"],
        variants: [
            { id: 'c1', name: "Tea Canister", desc: "Airtight and elegant.", img: "/assets/mockups/canisters_mockup_1780303355600.png" },
            { id: 'c2', name: "Snack Canister", desc: "Durable and resealable.", img: "/assets/mockups/canisters_mockup_1780303355600.png" },
            { id: 'c3', name: "Protein Canister", desc: "Large volume moisture protection.", img: "/assets/mockups/canisters_mockup_1780303355600.png" },
            { id: 'c4', name: "Premium Paper Canister", desc: "Eco-friendly luxury.", img: "/assets/mockups/canisters_mockup_1780303355600.png" }
        ]
    }
};

const categories = Object.keys(showcaseData);

export default function PackagingShowcase() {
    const [activeTab, setActiveTab] = useState('pouches');
    const [activeTech, setActiveTech] = useState("Digital Printing");
    const [isAnimating, setIsAnimating] = useState(false);
    
    const gridRef = useRef(null);
    const techImgRef = useRef(null);
    const sectionRef = useRef(null);

    // Initial scroll animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Top Section Animation
            const tlTop = gsap.timeline({
                scrollTrigger: {
                    trigger: ".showcase-top-section",
                    start: "top 75%",
                }
            });
            
            tlTop.fromTo(".showcase-title", 
                { opacity: 0, y: 40 }, 
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
            )
            .fromTo(".showcase-tab", 
                { opacity: 0, y: 20 }, 
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
                "-=0.6"
            )
            .fromTo(".showcase-item", 
                { opacity: 0, y: 50, scale: 0.95 }, 
                { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)" },
                "-=0.4"
            );

            // Bottom Section Animation
            const tlBottom = gsap.timeline({
                scrollTrigger: {
                    trigger: ".showcase-bottom-section",
                    start: "top 60%",
                }
            });

            tlBottom.fromTo(".showcase-tech-title",
                { opacity: 0, x: -30 },
                { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
            )
            .fromTo(".tech-menu-item",
                { opacity: 0, x: -50 },
                { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
                "-=0.4"
            )
            .fromTo(techImgRef.current,
                { opacity: 0, scale: 0.9, clipPath: "inset(100% 0 0 0)" },
                { opacity: 1, scale: 1, clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power4.inOut" },
                "-=0.6"
            );

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // Tab switching animation
    const handleTabChange = (newTab) => {
        if (newTab === activeTab || isAnimating) return;
        setIsAnimating(true);

        const tl = gsap.timeline({
            onComplete: () => {
                setActiveTab(newTab);
                
                // Animate new content in
                gsap.fromTo('.showcase-item',
                    { opacity: 0, y: 30, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.2)" }
                );
                
                gsap.fromTo('.tech-menu-item',
                    { opacity: 0, x: 15 },
                    { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: "power2.out", onComplete: () => setIsAnimating(false) }
                );
            }
        });

        // Fade current content out
        tl.to('.showcase-item', {
            opacity: 0,
            y: -20,
            scale: 0.98,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.in"
        }, 0);
        
        tl.to('.tech-menu-item', {
            opacity: 0,
            x: -20,
            duration: 0.2,
            stagger: 0.03,
            ease: "power2.in"
        }, 0);
    };

    const handleTechHover = (techName) => {
        if (techName === activeTech) return;
        
        // Morphing animation for image
        gsap.fromTo(techImgRef.current, 
            { clipPath: "inset(100% 0 0 0)", opacity: 0, scale: 1.1 },
            { clipPath: "inset(0% 0 0 0)", opacity: 1, scale: 1, duration: 0.5, ease: "power3.inOut" }
        );
        setActiveTech(techName);
    };

    const currentData = showcaseData[activeTab];

    const printingShowcaseList = ["Digital Printing", "Flexographic Printing", "Rotogravure Printing"];

    return (
        <div className="packaging-showcase-wrapper" ref={sectionRef}>
            <section className="showcase-top-section">
                <div className="showcase-header">
                    <h2 className="showcase-title">What we make</h2>
                <div className="showcase-tabs">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`showcase-tab ${activeTab === cat ? 'active' : ''}`}
                            onClick={() => handleTabChange(cat)}
                        >
                            {showcaseData[cat].title}
                        </button>
                    ))}
                </div>
            </div>

            <div className="showcase-content">
                <div className="showcase-grid" ref={gridRef}>
                    {currentData.variants.map((variant) => (
                        <div key={variant.id} className="showcase-item">
                            <div className="showcase-img-wrapper">
                                <img src={variant.img} alt={variant.name} className="showcase-img" />
                                <div className="showcase-overlay">
                                    <div className="showcase-overlay-content">
                                        <h3>{variant.name}</h3>
                                        <p>{variant.desc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

            <section className="showcase-bottom-section">
                <div className="tech-showcase-split">
                    <div className="tech-menu-left">
                        <h4 className="showcase-tech-title">Printing Technologies</h4>
                        <ul className="tech-menu-list">
                            {printingShowcaseList.map((techName, idx) => (
                                <li 
                                    key={idx} 
                                    className={`tech-menu-item ${activeTech === techName ? 'active' : ''}`}
                                    onMouseEnter={() => handleTechHover(techName)}
                                >
                                    {techName}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="tech-image-right">
                        {activeTech && (
                            <img 
                                ref={techImgRef}
                                src={techData[activeTech].img} 
                                alt={activeTech} 
                                className="morphing-image" 
                            />
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
