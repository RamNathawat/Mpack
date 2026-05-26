'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { WIGGLE_CONFIG } from '@/lib/data';

function initWiggle(element, intensity) {
    const target = element.querySelector('[data-wiggle-target]') || element;
    gsap.set(target, { transformOrigin: 'center center' });
    let tween;
    const onEnter = () => {
        tween = gsap.to(target, { rotation: intensity, duration: 0.17, repeat: -1, yoyo: true, ease: 'steps(1)' });
    };
    const onLeave = () => {
        if (tween) { tween.kill(); gsap.to(target, { rotation: 0, duration: 0.3, ease: 'power2.out' }); }
    };
    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);
    return () => {
        element.removeEventListener('mouseenter', onEnter);
        element.removeEventListener('mouseleave', onLeave);
    };
}

export default function Navbar() {
    useEffect(() => {
        const navbar = document.querySelector('.navbar');
        const contentSection = document.querySelector('.content-section');
        const footerEl = document.querySelector('.main-footer');

        // ② Start white (on-dark) — video is dark background
        if (navbar) { navbar.classList.add('on-dark'); navbar.classList.remove('on-light'); }

        const updateNavbarColor = () => {
            if (!navbar || !contentSection || !footerEl) return;
            const scrollPos = window.scrollY + navbar.offsetHeight / 2;
            const contentTop = contentSection.getBoundingClientRect().top + window.scrollY;

            const showreelSection = document.querySelector('#showreel-section');
            const showreelTop = showreelSection ? showreelSection.getBoundingClientRect().top + window.scrollY : Infinity;

            const serviceCardsSection = document.querySelector('.service-cards-wrapper');
            const serviceCardsTop = serviceCardsSection ? serviceCardsSection.getBoundingClientRect().top + window.scrollY : Infinity;

            const doubleMarquee = document.querySelector('.Double-marquee');
            const doubleMarqueeTop = doubleMarquee ? doubleMarquee.getBoundingClientRect().top + window.scrollY : Infinity;
            const footerTop = footerEl.getBoundingClientRect().top + window.scrollY;

            if (scrollPos >= footerTop) {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            } else if (scrollPos >= doubleMarqueeTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else if (scrollPos >= serviceCardsTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else if (scrollPos >= showreelTop) {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            } else if (scrollPos >= contentTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            }
        };

        window.addEventListener('scroll', updateNavbarColor);
        updateNavbarColor();

        // Wiggle on logo and whatsapp
        const cleanups = [];
        const logoMpack = document.querySelector('.logo-mpack');
        if (logoMpack) cleanups.push(initWiggle(logoMpack, WIGGLE_CONFIG.logoMpack));

        const overlay = document.querySelector('.nav-overlay');
        if (overlay) {
            gsap.set(overlay, { opacity: 0, visibility: 'hidden' });
        }
        const showOverlay = () => {
            if (overlay) {
                gsap.set(overlay, { visibility: 'visible' });
                gsap.to(overlay, { opacity: 1, duration: 0.35, ease: 'power2.out' });
            }
        };
        const hideOverlay = () => {
            if (overlay) {
                gsap.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => gsap.set(overlay, { visibility: 'hidden' }) });
            }
        };

        // ─── Navbar Left (Work) Hover ───
        const navLeft = document.querySelector('.nav-left');
        const workBox = document.querySelector('.nav-work-box');
        const workBlob = document.querySelector('.nav-bar__work-blob-svg');

        if (navLeft && workBox && workBlob) {
            const workInner = workBox.querySelector('.nav-popout-inner');
            const workItems = workInner ? Array.from(workInner.children) : [];

            // Temporarily show to measure both the box AND the blob icon center
            gsap.set(workBox, { visibility: 'visible', scale: 1, opacity: 1 });
            const boxRect = workBox.getBoundingClientRect();
            const blobRect = workBlob.getBoundingClientRect();
            // Icon center relative to the box's own top-left
            const originX = (blobRect.left + blobRect.width / 2) - boxRect.left;
            const originY = (blobRect.top + blobRect.height / 2) - boxRect.top;
            const workOrigin = `${originX}px ${originY}px`;

            // Start collapsed, scaling FROM the icon center
            gsap.set(workBox, {
                visibility: 'hidden',
                scale: 0,
                opacity: 0,
                transformOrigin: workOrigin
            });
            gsap.set(workItems, { y: 10, opacity: 0 });
            gsap.set(workBlob, { transformOrigin: 'center center' });

            const onEnterLeft = () => {
                gsap.killTweensOf(workBox);
                gsap.killTweensOf(workItems);
                gsap.killTweensOf(workBlob);
                showOverlay();

                // Fast 360 blob spin — like it's spinning then releasing the box
                gsap.to(workBlob, { rotation: '+=360', duration: 0.7, ease: 'power3.inOut' });

                gsap.set(workBox, { visibility: 'visible' });
                // Box grows out smoothly from the icon center
                gsap.fromTo(workBox,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }
                );
                // Items emerge while box is growing
                gsap.to(workItems, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.18 });
            };

            const onLeaveLeft = () => {
                gsap.killTweensOf(workBox);
                gsap.killTweensOf(workItems);
                gsap.killTweensOf(workBlob);
                hideOverlay();

                gsap.to(workBlob, { rotation: 0, duration: 0.5, ease: 'power2.out' });

                // Items fade quickly
                gsap.to(workItems, { y: 10, opacity: 0, duration: 0.15, ease: 'power2.in' });
                // Box shrinks back into icon smoothly
                gsap.to(workBox, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'expo.in',
                    delay: 0.05,
                    onComplete: () => gsap.set(workBox, { visibility: 'hidden' })
                });
            };

            navLeft.addEventListener('mouseenter', onEnterLeft);
            navLeft.addEventListener('mouseleave', onLeaveLeft);
            cleanups.push(() => {
                navLeft.removeEventListener('mouseenter', onEnterLeft);
                navLeft.removeEventListener('mouseleave', onLeaveLeft);
            });
        }

        // ─── Navbar Right (WhatsApp) Hover ───
        const navRight = document.querySelector('.nav-right');
        const waBox = document.querySelector('.nav-wa-box');
        const waSvgPath = document.querySelector('.nav-bar__whatsapp-svg path');

        if (navRight && waBox) {
            const waInner = waBox.querySelector('.nav-popout-inner');
            const waItems = waInner ? Array.from(waInner.children) : [];
            const waIcon = document.querySelector('.nav-bar__whatsapp-svg');

            // Temporarily show to measure both the box AND the WA icon center
            gsap.set(waBox, { visibility: 'visible', scale: 1, opacity: 1 });
            const waBoxRect = waBox.getBoundingClientRect();
            const waIconRect = waIcon ? waIcon.getBoundingClientRect() : waBoxRect;
            // Icon center relative to the box's own top-left
            const waOriginX = (waIconRect.left + waIconRect.width / 2) - waBoxRect.left;
            const waOriginY = (waIconRect.top + waIconRect.height / 2) - waBoxRect.top;
            const waOrigin = `${waOriginX}px ${waOriginY}px`;

            // Start collapsed, scaling FROM the WA icon center
            gsap.set(waBox, {
                visibility: 'hidden',
                scale: 0,
                opacity: 0,
                transformOrigin: waOrigin
            });
            gsap.set(waItems, { y: 10, opacity: 0 });

            const onEnterRight = () => {
                gsap.killTweensOf(waBox);
                gsap.killTweensOf(waItems);
                showOverlay();
                if (waSvgPath) gsap.to(waSvgPath, { fill: '#0e6634ff', duration: 0.3 }); // Darker WA green

                gsap.set(waBox, { visibility: 'visible' });
                // Box grows out smoothly from the WA icon center
                gsap.fromTo(waBox,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }
                );
                // Items emerge while box is growing
                gsap.to(waItems, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.18 });
            };

            const onLeaveRight = () => {
                gsap.killTweensOf(waBox);
                gsap.killTweensOf(waItems);
                hideOverlay();
                if (waSvgPath) gsap.to(waSvgPath, { fill: 'currentColor', duration: 0.3 });

                // Items fade quickly
                gsap.to(waItems, { y: 10, opacity: 0, duration: 0.15, ease: 'power2.in' });
                // Box shrinks back into WA icon smoothly
                gsap.to(waBox, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'expo.in',
                    delay: 0.05,
                    onComplete: () => gsap.set(waBox, { visibility: 'hidden' })
                });
            };

            navRight.addEventListener('mouseenter', onEnterRight);
            navRight.addEventListener('mouseleave', onLeaveRight);
            cleanups.push(() => {
                navRight.removeEventListener('mouseenter', onEnterRight);
                navRight.removeEventListener('mouseleave', onLeaveRight);
            });
        }

        // ─── Work Item: badge wiggle + image tilt on hover ───
        const workItems = document.querySelectorAll('.nav-work-item');
        workItems.forEach(item => {
            const badge = item.querySelector('.nav-work-badge');
            const img = item.querySelector('.nav-work-item__img');
            let wiggleTween;

            const onItemEnter = () => {
                // Wiggle badge intensity 2
                if (badge) {
                    gsap.set(badge, { transformOrigin: 'center center' });
                    wiggleTween = gsap.to(badge, { rotation: 5, duration: 0.15, repeat: -1, yoyo: true, ease: 'steps(1)' });
                }
                // Tilt image slightly right
                if (img) gsap.to(img, { rotation: 16, scale: 1.15, duration: 0.25, ease: 'power2.out' });
            };
            const onItemLeave = () => {
                if (wiggleTween) { wiggleTween.kill(); }
                if (badge) gsap.to(badge, { rotation: 0, duration: 0.3, ease: 'power2.out' });
                if (img) gsap.to(img, { rotation: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
            };
            item.addEventListener('mouseenter', onItemEnter);
            item.addEventListener('mouseleave', onItemLeave);
            cleanups.push(() => {
                item.removeEventListener('mouseenter', onItemEnter);
                item.removeEventListener('mouseleave', onItemLeave);
            });
        });

        // ─── All Our Work btn: wiggle intensity 4 (bubble handled by CursorBubble) ───
        const workBtn = document.querySelector('.nav-work-btn');
        if (workBtn) {
            let btnWiggle;
            const onBtnEnter = () => {
                const btnText = workBtn.querySelector('.nav-work-btn__text');
                if (btnText) {
                    gsap.set(btnText, { transformOrigin: 'center center', display: 'inline-block' });
                    btnWiggle = gsap.to(btnText, { rotation: 4, duration: 0.12, repeat: -1, yoyo: true, ease: 'steps(1)' });
                }
            };
            const onBtnLeave = () => {
                const btnText = workBtn.querySelector('.nav-work-btn__text');
                if (btnWiggle) { btnWiggle.kill(); }
                if (btnText) gsap.to(btnText, { rotation: 0, duration: 0.3, ease: 'power2.out' });
            };
            workBtn.addEventListener('mouseenter', onBtnEnter);
            workBtn.addEventListener('mouseleave', onBtnLeave);
            cleanups.push(() => {
                workBtn.removeEventListener('mouseenter', onBtnEnter);
                workBtn.removeEventListener('mouseleave', onBtnLeave);
            });
        }

        return () => {
            window.removeEventListener('scroll', updateNavbarColor);
            cleanups.forEach(fn => fn && fn());
        };
    }, []);

    return (
        <>
            <div className="nav-overlay"></div>
            <nav className="navbar">
                <div className="nav-left"></div>
                <div className="nav-center" style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer" }}>
                    <svg className="logo-mpack" data-cursor-text="Back to Top" width="150" height="42" viewBox="0 0 150 55" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
                        <path fill="currentColor" d="M32.74 25.41Q32.74 23.82 30.92 23.82Q29.67 23.82 28.14 26.25Q26.60 28.67 25.93 31.46L25.93 31.55Q25.93 33.18 26.43 34.91Q26.94 36.64 26.94 37.31Q26.94 38.94 22.86 40.53Q22.23 40.77 21.75 40.77Q20.55 40.77 20.10 39.52Q19.64 38.27 19.64 36.14Q19.64 34 19.76 32.10Q19.88 30.21 20 28.60Q20.12 26.99 20.24 25.77Q20.36 24.54 20.36 23.78Q20.36 22.14 18.87 22.14Q17.38 22.14 15.42 25.62Q13.45 29.10 13.45 31.14Q13.45 33.18 13.95 34.91Q14.46 36.64 14.46 37.31Q14.46 38.94 10.38 40.53Q9.75 40.77 9.27 40.77Q8.07 40.77 7.62 39.52Q7.16 38.27 7.16 35.68Q7.16 28.86 7.69 25.84Q8.41 21.38 10.95 17.39Q11.82 16.05 12.82 16.05Q14.41 16.05 15.75 18.64Q16.14 19.31 16.33 19.89Q18.63 17.01 21.75 17.01Q23.82 17.01 25.45 18.38Q27.08 19.74 27.08 21.81L27.08 22.34Q30.01 18.69 34.23 18.69Q36.82 18.69 38.17 20.03Q39.51 21.38 39.51 23.34Q39.51 25.31 39.22 26.90Q38.94 28.48 38.58 29.87Q38.22 31.26 37.93 32.34Q37.64 33.42 37.64 34.02Q37.64 34.62 38.02 34.62Q38.74 34.62 39.80 33.71Q40.86 32.80 41.91 31.72Q42.97 30.64 43.86 29.73Q44.74 28.82 45.08 28.82Q45.75 28.82 45.75 30.45Q45.75 33.81 42.37 36.98Q38.98 40.14 35.14 40.14Q31.69 40.14 31.69 33.86Q31.69 32.27 32.22 29.49Q32.74 26.70 32.74 25.41M52.42 19.89Q54.92 17.06 58.81 17.06Q64.38 17.06 65.86 21.57Q66.30 22.91 66.30 24.54Q66.30 28.19 63.92 31.74Q61.54 35.30 58.18 36.54L58.76 36.54Q62.26 36.54 65.86 33.95Q68.17 32.32 69.49 30.57Q70.81 28.82 71.48 28.82Q72.15 28.82 72.15 30.35Q72.15 33.04 69.85 35.78Q66.39 39.71 61.02 40.38Q57.13 40.82 55.50 40.53Q53.86 40.24 53 39.81Q51.13 38.85 51.13 36.93Q51.13 35.87 51.56 35.01Q55.35 35.01 57.32 32.13Q59.29 29.25 59.29 24.93Q59.29 23.87 58.52 23.03Q57.75 22.19 56.48 22.19Q55.21 22.19 53.72 23.30Q52.23 24.40 51.34 26.06Q50.46 27.71 49.74 29.32Q49.02 30.93 48.58 33.38Q47.82 37.79 46.83 44.54Q45.85 51.28 45.61 51.78Q45.37 52.29 44.89 52.72Q44.41 53.15 43.88 53.15Q42.92 53.15 42.30 52.58Q40.57 51.09 40.28 50.30Q39.99 49.50 39.99 48.26Q39.99 43.55 41.58 35.06Q43.16 26.56 47.05 17.39Q47.62 16.05 49.09 16.05Q50.55 16.05 51.90 18.64Q52.28 19.31 52.42 19.89M99.22 28.67Q100.09 28.67 100.09 30.88Q100.09 32.08 99.08 33.78Q98.07 35.49 96.46 36.90Q94.86 38.32 92.89 39.23Q90.92 40.14 89.05 40.14Q86.50 40.14 85.64 35.68Q84.39 37.74 82.38 39.06Q80.36 40.38 76.98 40.38Q73.59 40.38 71.53 38.27Q69.46 36.16 69.51 33.14Q69.51 24.98 74.94 20.27Q77.24 18.30 79.23 17.68Q81.22 17.06 83.43 17.06Q85.64 17.06 87.03 17.82Q87.70 16.43 88.57 16.43Q90.25 16.43 91.76 17.90Q93.27 19.36 93.27 20.66Q92.60 22.24 91.30 24.45Q90.92 26.66 90.92 30.64Q90.92 34.62 91.93 34.62Q93.18 34.62 97.98 29.63Q98.84 28.67 99.22 28.67M76.57 31.55Q76.57 35.25 79.30 35.25Q82.23 35.20 84.15 32.13Q84.82 31.07 85.26 29.54Q85.26 24.16 86.22 20.32Q82.33 21.09 79.45 24.06Q76.57 27.04 76.57 31.55M116.74 28.67Q117.61 28.67 117.61 30.14Q117.61 31.60 116.86 33.28Q116.12 34.96 114.61 36.52Q113.10 38.08 110.74 39.18Q108.39 40.29 105.20 40.29Q102.01 40.29 99.61 38.39Q97.21 36.50 97.21 32.92Q97.21 29.34 98.34 26.44Q99.46 23.54 101.31 21.42Q103.16 19.31 105.51 18.14Q107.86 16.96 109.98 16.96Q113.67 16.96 113.67 19.89Q113.67 21.57 112.98 22.58Q112.28 23.58 111.56 23.58Q110.60 23.58 109.88 22.91Q109.16 22.24 108.30 22.22Q107.43 22.19 106.64 23.06Q105.85 23.92 105.32 25.26Q104.26 27.95 104.26 31.55Q104.31 33.28 105.85 34.14Q106.90 34.72 108.34 34.74Q109.78 34.77 111.10 33.81Q112.42 32.85 113.53 31.72Q114.63 30.59 115.47 29.63Q116.31 28.67 116.74 28.67M129.22 29.49Q130.52 34.62 133.59 34.62Q135.08 34.62 136.28 33.71Q137.48 32.80 138.44 31.72Q139.40 30.64 140.12 29.73Q140.84 28.82 141.46 28.82Q142.09 28.82 142.09 30.45Q142.09 33.86 138.92 37.02Q135.75 40.19 131.84 40.17Q127.93 40.14 124.86 33.28Q123.99 31.36 123.22 29.39L122.89 35.97Q122.89 36.88 122.79 37.77Q122.70 38.66 121.98 39.23Q120.10 40.72 118.18 40.72Q115.93 40.72 115.93 36.06Q115.93 29.34 117.51 22Q119.10 14.66 120.61 10.94Q122.12 7.22 122.96 5.97Q123.80 4.72 124.28 4.43Q124.76 4.14 125.36 4.14Q125.96 4.14 126.63 4.74Q127.30 5.34 128.07 6.57Q128.84 7.79 128.86 8.97Q128.89 10.14 128.48 11.27Q128.07 12.40 127.40 13.48Q126.73 14.56 125.91 15.69Q125.10 16.82 124.28 18.11L123.80 22.14Q125.48 18.64 128.74 17.44Q129.90 17.01 131.43 17.01Q134.50 17.01 136.14 18.47Q137.77 19.94 137.77 22.77Q137.77 25.60 134.94 27.57Q132.10 29.54 129.22 29.49M131.05 23.87Q131.05 22.14 129.08 22.14Q127.11 22.14 124.81 25.94Q124.14 27.04 123.66 28.19Q128.65 27.90 130.47 25.50Q131.05 24.74 131.05 23.87" />
                    </svg>
                </div>
                <div className="nav-right" style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer" }}>
                    <div className="nav-hover-trigger">
                        <div className="logo-whatsapp">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 25 27" fill="none" className="nav-bar__whatsapp-svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.601 0.986335C11.8021 1.01421 11.8112 1.04366 12.0483 1.04591C12.4513 1.04943 12.8582 1.03181 13.2602 1.04591C14.7297 1.09749 16.3092 1.56281 17.684 2.0713C18.1173 2.2315 18.4074 2.52491 18.7836 2.75782C18.9541 2.86323 19.1764 2.93811 19.3335 3.03712C19.5277 3.15943 19.7215 3.30714 19.9233 3.43555C20.3796 3.7252 20.7523 4.04895 21.1381 4.42383C21.197 4.48126 21.2369 4.59395 21.2729 4.62403C21.314 4.65863 21.388 4.65528 21.4399 4.6963C21.7068 4.90722 22.4207 5.74735 22.6147 6.04298C22.7185 6.20149 22.7985 6.47832 22.9067 6.61329C23.0415 6.7815 23.1644 6.86231 23.2963 7.08692C23.7885 7.92434 24.1902 8.84837 24.4702 9.7793C24.6279 10.304 24.8111 10.9219 24.8608 11.4668C24.9707 12.6708 25.0812 13.7784 24.9155 14.9785C24.8495 15.4578 24.7632 15.9691 24.6469 16.4365C24.4028 17.4173 23.9978 18.3669 23.5952 19.3125L23.5942 19.3154C23.2319 20.1653 22.4331 20.9908 21.8686 21.71C21.6788 21.9518 21.5246 22.1892 21.2797 22.3965C21.0348 22.6037 20.7282 22.768 20.4858 22.9746C20.3515 23.0889 20.2324 23.2615 20.0844 23.3711C19.9297 23.4854 19.7093 23.5536 19.5795 23.6641C18.8674 24.2709 18.4307 24.4852 17.5708 24.8457C16.3894 25.341 15.3983 25.5527 14.143 25.8154C14.0198 25.8414 13.6705 25.8663 13.5473 25.8525C12.9146 25.7827 12.2271 25.9044 11.5727 25.8545C10.0414 25.7376 8.57578 25.2528 7.1401 24.7734C7.00809 24.7291 6.84411 24.5744 6.72701 24.5498C6.36124 24.4742 5.86748 24.7318 5.5151 24.8535C4.11582 25.337 2.69086 25.7679 1.29732 26.2774C1.16321 26.3264 1.01916 26.4488 0.862752 26.4805C0.562812 26.5413 0.382276 26.4893 0.175252 26.2725C-0.0110214 26.0774 -0.0238393 25.8442 0.0414625 25.5899C0.195974 24.988 0.457528 24.3357 0.623494 23.7432C0.689129 23.509 0.689327 23.2415 0.768025 22.9912C0.86868 22.6711 1.01713 22.3593 1.10885 22.0225C1.25986 21.4672 1.50066 20.9638 1.61568 20.3877C1.66507 20.1397 1.73727 19.8129 1.65474 19.5703C1.54703 19.2542 1.22105 18.8061 1.07857 18.4512C0.98014 18.2061 0.934053 17.924 0.84615 17.6924C0.795172 17.5578 0.685305 17.446 0.623494 17.3076C0.333338 16.6573 0.234002 15.75 0.137166 15.044C0.0291742 14.2597 -0.0144194 13.51 0.00435316 12.7207C0.00976743 12.4965 0.125735 12.263 0.156697 12.0391C0.225199 11.5469 0.215443 11.048 0.327595 10.5459C0.427657 10.0991 0.607537 9.65975 0.740681 9.23341C1.04177 8.26936 1.59197 7.3249 2.13326 6.47266C2.68319 5.60691 3.57311 4.75118 4.3276 4.06934C4.65535 3.77309 4.99265 3.53295 5.33345 3.25684C5.60926 3.03334 5.96284 2.93518 6.23677 2.75782C6.99243 2.26894 7.82882 1.80324 8.70553 1.52735C9.27166 1.34921 11.0774 0.914319 11.601 0.986335ZM8.61275 6.26563C8.24195 6.2935 7.52111 6.42855 7.19381 6.59864C7.0884 6.6534 7.03981 6.75373 6.9526 6.80469C6.77895 6.90626 6.5672 6.92775 6.35787 7.0713C5.53363 7.63716 5.10203 9.42643 5.26802 10.3643C5.304 10.5685 5.34605 10.781 5.38521 10.9824C5.4843 11.4925 5.65625 11.8143 5.77095 12.292C5.86034 12.6635 6.20472 13.0539 6.33052 13.4258C8.20336 16.9242 11.6057 19.8244 15.6147 20.3848C16.7183 20.42 17.5983 20.0958 18.5063 19.5127C18.9765 19.211 19.0117 18.9824 19.1938 18.5078C19.2868 18.2656 19.5158 18.014 19.5639 17.7266C19.5849 17.6004 19.5657 17.4844 19.5854 17.3643C19.6052 17.2441 19.6944 17.1274 19.7231 16.9902C19.7846 16.6955 19.8101 16.284 19.5297 16.0918C19.3912 15.9972 19.1379 15.9595 19.0063 15.8828C18.956 15.8537 18.9069 15.7462 18.8461 15.6914C18.5871 15.4585 18.1002 15.3976 17.7778 15.2607C17.3352 15.0726 16.4148 14.5509 15.9633 14.5606C15.9382 14.5622 15.5716 14.6637 15.5424 14.6758C15.3846 14.7418 15.0675 15.2811 14.976 15.4502C14.8888 15.611 14.7512 16.0087 14.6655 16.1143C14.3396 16.5154 13.5792 16.4394 13.1704 16.2139C12.3996 15.7887 11.4294 14.9649 10.8569 14.3145C10.5344 13.9479 9.89438 13.3129 9.76314 12.8535C9.62042 12.3534 9.57275 11.9847 9.94869 11.5781C10.159 11.351 10.6709 10.903 10.7944 10.6367C10.8861 10.4394 10.8788 10.1244 10.7983 9.92481C10.4411 9.04176 10.0609 8.17693 9.69478 7.28907C9.64899 7.17828 9.63771 7.05901 9.58931 6.94727C9.51318 6.77179 9.28563 6.52143 9.13717 6.41016C9.00243 6.30927 8.7781 6.25318 8.61275 6.26563Z" fill="currentColor"></path>
                            </svg>
                        </div>

                        {/* Pop-out Box for Right Side */}
                        <div className="nav-popout nav-wa-box">
                            <div className="nav-popout-inner">
                                <img src="https://dummyimage.com/150x150/e0e0e0/555.png&text=QR+Code" className="nav-wa-qr" alt="Placeholder QR Code" />
                                <h4 className="nav-wa-title">whatsapp us</h4>
                                <p className="nav-wa-desc">Scan the QR code to chat with us via your smartphone.</p>
                                <a href="#" className="nav-wa-link">
                                    <span className="nav-wa-link-text">Chat via desktop</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 169 10" fill="none" className="draw-btn__svg nav-wa-link-svg">
                                        <path d="M1 6.5661C56.3941 3.06082 112.187 1.20095 168 0.999878" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
                                        <path d="M32.1313 8.63371C68.2147 6.92799 104.462 6.13378 140.695 6.25107" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
