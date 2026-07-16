'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SOCIAL_ICONS, WIGGLE_CONFIG } from '@/lib/data';

function initWiggle(element, intensity) {
    const target = element.querySelector('[data-wiggle-target]') || element;
    gsap.set(target, { transformOrigin: 'center center' });
    let tween;
    const onEnter = () => { tween = gsap.to(target, { rotation: intensity, duration: 0.17, repeat: -1, yoyo: true, ease: 'steps(1)' }); };
    const onLeave = () => { if (tween) { tween.kill(); gsap.to(target, { rotation: 0, duration: 0.3, ease: 'power2.out' }); } };
    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);
    return () => { element.removeEventListener('mouseenter', onEnter); element.removeEventListener('mouseleave', onLeave); };
}

export default function Footer() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // ─── Map link underline draw/undraw ───
        const footerMapLink = document.querySelector('.footer-map-link');
        if (footerMapLink) {
            const mapSvgPaths = footerMapLink.querySelectorAll('.draw-btn__svg path');
            mapSvgPaths.forEach(path => {
                const length = path.getTotalLength();
                gsap.set(path, { strokeDasharray: length, strokeDashoffset: 0 });
            });
            const onEnter = () => gsap.fromTo(mapSvgPaths, { strokeDashoffset: (i, el) => el.getTotalLength() }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1, overwrite: true });
            const onLeave = () => gsap.to(mapSvgPaths, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out', overwrite: true });
            footerMapLink.addEventListener('mouseenter', onEnter);
            footerMapLink.addEventListener('mouseleave', onLeave);
        }

        // ─── Option 3: Dynamic Bottom Body Background Sync & Exact Limit Lock ───
        const handleRefresh = () => {
            if (window.__lenis) window.__lenis.resize();
        };
        ScrollTrigger.addEventListener('refresh', handleRefresh);
        const timer = setTimeout(() => {
            if (window.__lenis) window.__lenis.resize();
            ScrollTrigger.refresh();
        }, 300);

        const handleScrollSync = () => {
            const scrollPos = window.scrollY || document.documentElement.scrollTop;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (maxScroll > 0 && scrollPos >= maxScroll - 450) {
                document.body.style.backgroundColor = '#1D4ED8';
                document.documentElement.style.backgroundColor = '#1D4ED8';
            } else {
                document.body.style.backgroundColor = '';
                document.documentElement.style.backgroundColor = '';
            }
        };
        window.addEventListener('scroll', handleScrollSync, { passive: true });
        if (window.__lenis) window.__lenis.on('scroll', handleScrollSync);
        handleScrollSync();

        // ─── Wiggle on footer interactive elements ───
        const wiggleTargets = [
            { selector: '.footer-column:first-child h3', key: 'jobHeading' },
            { selector: '.footer-map-link span', key: 'googleMap' },
            { selector: '.footer-email', key: 'email' },
            { selector: '.footer-whatsapp', key: 'whatsapp' },
            { selector: '.credits-name', key: 'socials' }, // Added wiggle target for names using social intensity
        ];
        wiggleTargets.forEach(({ selector, key }) => {
            document.querySelectorAll(selector).forEach(el => initWiggle(el, WIGGLE_CONFIG[key]));
        });

        // ─── Social icon wiggle ───
        document.querySelectorAll('.single-social').forEach(el => initWiggle(el, WIGGLE_CONFIG.socials));

        return () => {
            ScrollTrigger.removeEventListener('refresh', handleRefresh);
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScrollSync);
            if (window.__lenis) window.__lenis.off('scroll', handleScrollSync);
            document.body.style.backgroundColor = '';
            document.documentElement.style.backgroundColor = '';
        };
    }, []);

    return (
        <div className="footer-inner">
            <div className="footer-top">
                {/* Column 1: Inquiries */}
                <div className="footer-column">
                    <span className="footer-badge">[ 01 — INQUIRIES ]</span>
                    <div className="footer-col-body">
                        <h3 className="footer-headline">let's talk</h3>
                        <p className="footer-subtext">Bridge the gap between your brand and world-class flexible packaging.</p>
                    </div>
                    <div className="footer-col-footer">
                        <svg className="footer-mpack-svg" width="180" height="52" viewBox="0 0 150 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <text x="0" y="44" fontFamily="var(--font-logo)" fontWeight="950" fontSize="50" fill="#FFFFFF" letterSpacing="-1px">MPACK</text>
                        </svg>
                    </div>
                </div>

                {/* Column 2: Headquarters */}
                <div className="footer-column">
                    <span className="footer-badge">[ 02 — HEADQUARTERS ]</span>
                    <div className="footer-col-body">
                        <a 
                            href="https://www.google.com/maps/search/?api=1&query=A-1201%2C+Sarvoday+Symphony%2C+90+Feet+Road%2C+Dombivli+East%2C+Thane%2C+Maharashtra+-+421201" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="footer-address-link"
                        >
                            <address className="footer-address">
                                <strong>MPACK Solutions</strong>
                                <span>A-1201, Sarvoday Symphony,</span>
                                <span>90 Feet Road, Dombivli East,</span>
                                <span>Thane, Maharashtra – 421201</span>
                            </address>
                        </a>
                    </div>
                    <div className="footer-col-footer">
                        <a 
                            href="https://www.google.com/maps/search/?api=1&query=A-1201%2C+Sarvoday+Symphony%2C+90+Feet+Road%2C+Dombivli+East%2C+Thane%2C+Maharashtra+-+421201" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="footer-map-link"
                        >
                            <span>VIEW ON GOOGLE MAPS ↗</span>
                        </a>
                    </div>
                </div>

                {/* Column 3: Direct Contact */}
                <div className="footer-column">
                    <span className="footer-badge">[ 03 — DIRECT CONTACT ]</span>
                    <div className="footer-col-body">
                        <a href="mailto:manaspackaging@gmail.com" className="footer-email">manaspackaging@gmail.com</a>
                        <div className="footer-whatsapp-row">
                            <a href="https://wa.me/919999999999?text=Hi%20Manas%2C%20I%27m%20interested%20in%20packaging%20solutions" target="_blank" rel="noopener noreferrer" className="footer-whatsapp">send us a whatsapp ↗</a>
                            <span className="footer-note">*we respond quickly.</span>
                        </div>
                    </div>
                    <div className="footer-col-footer">
                        <div className="footer-socials" id="footer-socials">
                            {SOCIAL_ICONS.map(({ href, label, svg }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="single-social w-inline-block"
                                    aria-label={label}
                                    dangerouslySetInnerHTML={{ __html: svg }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Full viewport bottom copyright bar */}
            <div className="footer-bottom">
                <div className="footer-copyright-text">
                    © 2026 MPACK SOLUTIONS. ALL RIGHTS RESERVED.
                </div>
                <div className="footer-copyright-subtext">
                    PRECISION CONVERTER NETWORK & PACKAGING PARTNER.
                </div>
            </div>
        </div>
    );
}
