"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "../app/styles/ecosystem.css";

const ecosystemData = [
    {
        id: "compliance",
        label: "Compliance Guidance",
        desc: "Navigate complex packaging regulations with confidence. We ensure your packaging meets all necessary industry standards.",
        content: ["Rules & Regulations", "Label Support"]
    },
    {
        id: "machinery",
        label: "Machinery Assistance",
        desc: "Need to automate your packaging line? We supply and support top-tier packaging machinery to streamline your operations.",
        content: ["Pouch & Labelling Machines", "Batch Coding Machines", "Convertors"]
    },
    {
        id: "packaging",
        label: "Complete Packaging Solutions",
        desc: "From initial concept to final shelf-ready product, we provide an extensive range of packaging formats to meet any brand requirement.",
        content: ["Pouches / Boxes", "Labels & Canisters"]
    },
    {
        id: "design",
        label: "Design Support",
        desc: "Our pre-press and design experts ensure your artwork is perfectly optimized for production, preventing costly printing errors.",
        content: ["Artworks", "Changes & Corrections", "KLDs"]
    }
];

const Ecosystem = ({ isOpen, onClose }) => {
    const [hoveredRow, setHoveredRow] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!isOpen) {
            document.body.classList.remove('ecosystem-open');
            document.body.style.overflow = '';
            return;
        }

        document.body.classList.add('ecosystem-open');
        document.body.style.overflow = 'hidden';

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            
            // Subtle fade in for the header and rows
            tl.fromTo(".eco-header", 
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
            );

            tl.fromTo(".eco-row",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
                "-=0.6"
            );
        }, containerRef);

        return () => {
            ctx.revert();
            document.body.classList.remove('ecosystem-open');
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <section className={`ecosystem-overlay ${isOpen ? 'open' : ''}`} ref={containerRef}>
            <button className="ecosystem-close" onClick={onClose}>
                ✕ Close
            </button>
            
            <div className="eco-container">
                <div className="eco-header">
                    <h2>WHY MPACK</h2>
                    <p>End-to-end packaging expertise.</p>
                </div>

                <div className="eco-accordion">
                    {ecosystemData.map((row, index) => {
                        const isHovered = hoveredRow === index;
                        const isDimmed = hoveredRow !== null && hoveredRow !== index;

                        return (
                            <div 
                                key={row.id}
                                className={`eco-row ${isHovered ? 'active' : ''} ${isDimmed ? 'dimmed' : ''}`}
                                onMouseEnter={() => setHoveredRow(index)}
                                onMouseLeave={() => setHoveredRow(null)}
                            >
                                <div className="eco-row-header">
                                    <span className="eco-row-num">0{index + 1}</span>
                                    <h3 className="eco-row-title">{row.label}</h3>
                                    <div className="eco-row-icon">
                                        <div className="icon-line horizontal"></div>
                                        <div className="icon-line vertical"></div>
                                    </div>
                                </div>
                                <div className="eco-row-content">
                                    <div className="eco-row-content-inner">
                                        <div className="eco-content-desc">
                                            <p>{row.desc}</p>
                                        </div>
                                        <div className="eco-content-list">
                                            {row.content.map((item, j) => (
                                                <span key={j} className="eco-tag">{item}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Ecosystem;
