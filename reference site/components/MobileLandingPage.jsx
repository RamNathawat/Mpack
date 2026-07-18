'use client';
import React, { useState, useEffect } from 'react';
import '../app/styles/mobile-landing.css';
import IndustriesMarquee from './IndustriesMarquee';
import { PRINTING_TYPES } from './PrintingAndPouches';

export default function MobileLandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('ml-fade-in-up');
                    entry.target.classList.remove('ml-invisible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.ml-anim-trigger').forEach(card => {
            observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="ml-wrapper">
            {/* Top Navigation */}
            <header className="ml-header">
                <div className="ml-header-left">
                    <img alt="MPACK Logo" className="ml-logo-img" src="/assets/hero-section/logo_mpack-removebg.png" />
                    <span className="ml-logo-text" style={{ fontFamily: "var(--ml-font-headline)", fontWeight: 800 }}>MPACK</span>
                </div>
                <div className="ml-header-right">
                    <button className="ml-menu-btn" onClick={toggleMenu}>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                            <path d="M3 18v-2h18v2H3Zm0-5v-2h18v2H3Zm0-5V6h18v2H3Z"/>
                        </svg>
                    </button>
                </div>
            </header>

            {/* Mobile Drawer */}
            <div className={`ml-drawer ${isMenuOpen ? 'ml-drawer-open' : ''}`}>
                <div className="ml-drawer-backdrop" onClick={toggleMenu}></div>
                <nav className="ml-drawer-nav">
                    <div className="ml-drawer-header">
                        <span className="ml-drawer-title">MPACK MENU</span>
                        <button className="ml-drawer-close" onClick={toggleMenu}>
                            <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"/>
                            </svg>
                        </button>
                    </div>
                    <ul className="ml-drawer-list">
                        <li><a className="ml-drawer-link ml-drawer-link-active" href="#home" onClick={toggleMenu}>Home</a></li>
                        <li><a className="ml-drawer-link" href="#pouches" onClick={toggleMenu}>Pouches</a></li>
                        <li><a className="ml-drawer-link" href="#boxes" onClick={toggleMenu}>Boxes</a></li>
                        <li><a className="ml-drawer-link" href="#labels" onClick={toggleMenu}>Labels</a></li>
                        <li><a className="ml-drawer-link" href="#canisters" onClick={toggleMenu}>Canisters</a></li>
                        <li><a className="ml-drawer-link" href="#solutions" onClick={toggleMenu}>Solutions</a></li>
                        <li><a className="ml-drawer-link" href="#tech" onClick={toggleMenu}>Printing Tech</a></li>
                        <li><a className="ml-drawer-link" href="#industries" onClick={toggleMenu}>Industries</a></li>
                    </ul>
                </nav>
            </div>

            <main className="ml-main">
                {/* Hero Section */}
                <section className="ml-hero" id="home">
                    <div className="ml-hero-bg">
                        <img 
                            alt="Hero Blueprint" 
                            className="ml-hero-bg-img" 
                            src="/assets/images/hero-background-new.png" 
                            style={{ opacity: 0.35, mixBlendMode: 'multiply', filter: 'none' }}
                        />
                        <div className="ml-hero-bg-gradient"></div>
                    </div>
                    <div className="ml-hero-content">
                        <div className="ml-hero-badge">♻️ PREMIUM PACKAGING SOLUTIONS</div>
                        <h1 className="ml-hero-title">
                            PREMIUM PACKAGING <span className="ml-hero-title-italic" style={{ fontFamily: "Georgia, serif" }}>Solutions</span>
                        </h1>
                        <p className="ml-hero-subtitle">
                            Your trusted partner for bespoke packaging, from concept to shelf-ready product.
                        </p>
                        <div className="ml-hero-actions">
                            <a className="ml-btn-primary" href="#pouches" style={{ textAlign: 'center', textDecoration: 'none' }}>EXPLORE SOLUTIONS</a>
                            <a className="ml-btn-secondary" href="https://wa.me/919769098018">WHATSAPP US</a>
                        </div>
                    </div>
                </section>

                {/* Pouches Range */}
                <section className="ml-section ml-bg-white ml-padding-bottom-0" id="pouches">
                    <div className="ml-section-header ml-text-left">
                        <p className="ml-section-subtitle">Flexible Packaging</p>
                        <h2 className="ml-section-title">Pouches</h2>
                    </div>
                    <div className="ml-swipe-carousel">
                        {[
                            { img: '3_side_seal-removebg-preview.png', title: '3 Side Seal', desc: 'Spices, powders & dry ingredients.' },
                            { img: 'Center_seal-removebg-preview.png', title: 'Center Seal', desc: 'Balanced sealing for maximum protection.' },
                            { img: 'Stand_Up_Pouch-removebg-preview.png', title: 'Stand Up Pouch', desc: 'Perfect for liquids, powders & everyday essentials.' },
                            { img: 'Center_Seal_Side_gusset_pouch-removebg-preview.png', title: 'Center Seal Side Gusset', desc: 'Expandable sides for bulk volume & coffee.' },
                            { img: '5_panel_pouch-removebg-preview.png', title: '5 Panel Pouch', desc: 'Box-like structure with 5 printable panels.' },
                            { img: 'Spout_pouch-removebg-preview.png', title: 'Spout Pouch', desc: 'Easy pour. Mess-free liquid dispensing.' },
                            { img: 'Gemini_Generated_Image_s7b4xls7b4xls7b4-removebg-preview.png', title: 'Freezable Pouch', desc: 'Extra stability. Maximum shelf impact.' },
                            { img: 'Retort_pouch_-_add_heat_vector_to_denote_that_you_can_heat_it-removebg-preview.png', title: 'Retort Pouch', desc: 'Heat resistant up to 130°C. Ready-to-cook.' },
                        ].map((item, i) => (
                            <div key={i} className="ml-card ml-anim-trigger ml-invisible" style={{ scrollSnapAlign: 'start', minWidth: '280px', width: '80vw', flexShrink: 0 }}>
                                <div className="ml-card-img-wrap" style={{ backgroundColor: '#f0f3f6' }}>
                                    <img alt={item.title} className="ml-card-img" src={`/pouches section/${item.img}`} />
                                </div>
                                <div className="ml-card-body">
                                    <span className="ml-card-badge">[ {String(i+1).padStart(2, '0')} ] POUCHES</span>
                                    <h3 className="ml-card-title">{item.title}</h3>
                                    <p className="ml-card-text">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Boxes Range */}
                <section className="ml-section ml-bg-white ml-padding-bottom-0" id="boxes">
                    <div className="ml-section-header ml-text-left">
                        <p className="ml-section-subtitle">Rigid & Corrugated</p>
                        <h2 className="ml-section-title">Boxes</h2>
                    </div>
                    <div className="ml-swipe-carousel">
                        {[
                            { img: 'E-commerce-boxes.png', title: 'E-Commerce Boxes', desc: 'Durable and lightweight boxes designed for safe shipping and great unboxing.' },
                            { img: 'Corrugated-boxes.png', title: 'Corrugated Boxes', desc: 'High-strength fluted boxes built for maximum protection in transit and storage.' },
                            { img: 'Mono-carton-box.png', title: 'Mono Carton Boxes', desc: 'Sleek, sustainable folding cartons ideal for cosmetics, personal care and retail products.' },
                            { img: 'Rigid-boxes.png', title: 'Rigid Gift Boxes', desc: 'Luxury rigid boxes that elevate your brand and make every gift and unboxing memorable.' },
                        ].map((item, i) => (
                            <div key={i} className="ml-card ml-anim-trigger ml-invisible" style={{ scrollSnapAlign: 'start', minWidth: '280px', width: '80vw', flexShrink: 0 }}>
                                <div className="ml-card-img-wrap" style={{ backgroundColor: '#fcf3eb' }}>
                                    <img alt={item.title} className="ml-card-img" src={`/boxes,labels,canisters section/${item.img}`} />
                                </div>
                                <div className="ml-card-body">
                                    <span className="ml-card-badge">[ {String(i+1).padStart(2, '0')} ] BOXES</span>
                                    <h3 className="ml-card-title">{item.title}</h3>
                                    <p className="ml-card-text">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Labels & Canisters Range */}
                <section className="ml-section ml-bg-white" id="labels">
                    <div className="ml-section-header ml-text-left">
                        <p className="ml-section-subtitle">Bespoke & Premium</p>
                        <h2 className="ml-section-title">Labels & Canisters</h2>
                    </div>
                    <div className="ml-swipe-carousel">
                        {[
                            { badge: 'LABELS', img: 'Product-Labels.png', title: 'Product Roll Labels', desc: 'Vibrant, high-adhesion roll and sheet labels engineered for glass, plastic and metallic containers.', bg: '#fbf5e6' },
                            { badge: 'LABELS', img: 'Shrink-sleeve-labels.png', title: 'Shrink Sleeve Labels', desc: '360-degree contoured branding that conforms seamlessly to complex bottle curves and unique shapes.', bg: '#f0f3f6' },
                            { badge: 'CANISTERS', img: 'Composite paper canisters.png', title: 'Composite Paper Canisters', desc: 'Hermetically sealed composite paper canisters engineered to preserve freshness, aroma and barrier integrity.', bg: '#f5ebeb' },
                        ].map((item, i) => (
                            <div key={i} className="ml-card ml-anim-trigger ml-invisible" style={{ scrollSnapAlign: 'start', minWidth: '280px', width: '80vw', flexShrink: 0 }}>
                                <div className="ml-card-img-wrap" style={{ backgroundColor: item.bg }}>
                                    <img alt={item.title} className="ml-card-img" src={`/boxes,labels,canisters section/${item.img}`} />
                                </div>
                                <div className="ml-card-body" id={item.badge === 'CANISTERS' ? 'canisters' : ''}>
                                    <span className="ml-card-badge" style={{ color: item.badge === 'CANISTERS' ? '#1A3A5F' : 'var(--ml-color-status-green)' }}>[ {String(i+1).padStart(2, '0')} ] {item.badge}</span>
                                    <h3 className="ml-card-title">{item.title}</h3>
                                    <p className="ml-card-text">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Solutions Section (Service Cards Bento) */}
                <section className="ml-section ml-bg-cream" id="solutions">
                    <div className="ml-section-header ml-text-left ml-margin-bottom">
                        <span className="ml-section-subtitle" style={{ color: 'var(--ml-color-industrial-blue)' }}>END TO END</span>
                        <h2 className="ml-section-title" style={{ color: 'var(--ml-color-industrial-blue)' }}>Call us if you<br/><span className="ml-section-title-italic" style={{ fontFamily: "Georgia, serif" }}>need:</span></h2>
                    </div>

                    <div className="ml-bento-grid">
                        {[
                            { color: '#e8a335', icon: '🤝', title: 'Consultation', items: ['Packaging consultation', 'End-to-end solutions', 'Material guidance', 'Sustainability advice'] },
                            { color: '#96a1f0', icon: '🎨', title: 'Design', items: ['Designing help', 'Artwork creation', 'DTP', '3D Mockups'] },
                            { color: '#d16666', icon: '🏭', title: 'Sourcing', items: ['Supplier matchmaking', 'Quality audits', 'Vendor management', 'Cost optimization'] },
                            { color: '#4bcabf', icon: '⚙️', title: 'Technical', items: ['Machinery assistance', 'Compliance guidance', 'Material specs', 'Troubleshooting'] }
                        ].map((box, i) => (
                            <div key={i} className="ml-bento-box ml-anim-trigger ml-invisible" style={{ 
                                backgroundColor: box.color,
                                border: '3px solid #ffffff',
                                borderRadius: '1.5rem',
                                padding: '1.5rem',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                            }}>
                                <div className="ml-bento-icon" style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', color: '#ffffff' }}>{box.icon}</div>
                                <h3 className="ml-bento-title" style={{ color: '#ffffff' }}>{box.title}</h3>
                                
                                <div className="ml-bento-tags" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                                    {box.items.map((item, j) => (
                                        <span key={j} className="ml-bento-tag" style={{ 
                                            backgroundColor: 'transparent', 
                                            color: '#ffffff', 
                                            border: '1.5px solid rgba(255, 255, 255, 0.8)',
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '8px',
                                            fontSize: '0.85rem'
                                        }}>
                                            ✦ {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Printing Technologies (Vertical Flow Stack Cards) */}
                <section className="ml-section ml-bg-cream ml-padding-bottom-0" id="tech">
                    <div className="ml-section-header ml-text-left" style={{ marginBottom: '60px' }}>
                        <h2 className="ml-section-title">Printing Tech</h2>
                        <p className="ml-card-text">Scaled solutions for every stage.</p>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '80px', paddingBottom: '40px' }}>
                        {PRINTING_TYPES.map((type, index) => (
                            <div key={type.id} className={`stack-card ${type.cardClass}`} style={{ 
                                position: 'relative', 
                                width: '90vw', 
                                maxWidth: '360px', 
                                height: 'auto',
                                minHeight: 'auto',
                                left: 'auto', 
                                top: 'auto',
                                padding: '3.5rem 1.5rem 2rem 1.5rem'
                            }}>
                                {/* Sticker protruding top-left like desktop */}
                                <div className="stack-sticker" style={{ 
                                    position: 'absolute', 
                                    top: '-40px',
                                    left: '-10px',
                                    transform: `scale(0.85) rotate(${type.id === 'flexo' ? -6 : 5}deg)`,
                                    margin: '0',
                                    width: '120px'
                                }}>
                                    <div className="stack-sticker-svg">
                                        <type.StickerComponent />
                                    </div>
                                </div>

                                {/* Card Title */}
                                <h3 className="stack-card-title" style={{ textAlign: 'left', margin: '10px 0' }}>{type.title}</h3>

                                {/* Divider */}
                                <svg className="stack-card-divider" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ margin: '0 0 15px 0' }}>
                                    <path d="M 0 6 Q 50 2 100 8 T 200 4 T 300 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                </svg>

                                {/* Bullet List */}
                                <ul className="stack-card-list" style={{ maxWidth: '100%' }}>
                                    {type.bullets.map((item, j) => (
                                        <li key={j}>
                                            <span className="stack-bullet">✦</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                {/* Mobile Specific Mini-Spec */}
                                <div style={{ 
                                    marginTop: '20px', 
                                    paddingTop: '15px', 
                                    borderTop: '1px dashed rgba(0,0,0,0.15)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '0.85rem',
                                    fontWeight: 700
                                }}>
                                    <span>MOQ: {type.moq}</span>
                                    <span>Lead: {type.lead}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Industries Marquee */}
                <IndustriesMarquee />

                {/* Footer */}
                <footer className="ml-footer" id="footer">
                    <div className="ml-footer-section">
                        <span className="ml-footer-badge">[ 01 — INQUIRIES ]</span>
                        <h3 className="ml-footer-title">let's talk</h3>
                        <p className="ml-footer-text">Bridge the gap between your brand and world-class flexible packaging.</p>
                        <a className="ml-footer-link" href="mailto:manaspackaging@gmail.com">manaspackaging@gmail.com</a>
                    </div>
                    <div className="ml-footer-section">
                        <span className="ml-footer-badge">[ 02 — OFFICE ADDRESS ]</span>
                        <p className="ml-footer-address">
                            <strong>MPACK</strong><br/>
                            A-1201, Sarvoday Symphony,<br/>
                            90 Feet Road, Dombivli East,<br/>
                            Thane, Maharashtra – 421201
                        </p>
                    </div>
                    <div className="ml-footer-bottom">
                        <p>© 2026 MPACK. ALL RIGHTS RESERVED.</p>
                        <p>PRECISION CONVERTER NETWORK & PACKAGING PARTNER.</p>
                    </div>
                </footer>
            </main>

        </div>
    );
}
