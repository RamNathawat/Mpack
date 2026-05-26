'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../app/styles/horizontal-words.css';

gsap.registerPlugin(ScrollTrigger);

const HorizontalWords = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const container = sectionRef.current;
            const letters = container.querySelectorAll('.typewriter-letter');

            // Initially hide all letters
            gsap.set(letters, { opacity: 0 });

            const scrollTween = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: "+=1500", // The duration of the scroll pin
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    invalidateOnRefresh: true
                }
            });

            // Make letters appear one by one with a bouncy pop-in
            scrollTween.fromTo(letters, {
                opacity: 0,
                y: 40,
                scale: 0.5
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                ease: "back.out(2.5)",
                stagger: 0.1
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Split text into lines, then into words, then into letters
    const line1 = "end to end".split("");
    const line2 = "packaging".split("");
    const line3 = "expertise".split("");

    const renderLetters = (charArray) => {
        return charArray.map((char, i) => (
            <span key={i} className="typewriter-letter" style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
                {char}
            </span>
        ));
    };

    return (
        <section ref={sectionRef} className="horizontal-words-section content-section" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '0 5vw', overflow: 'hidden' }}>
            
            <div style={{ width: '100%', textAlign: 'center' }}>
                <h2 className="display" style={{ fontSize: '9vw', fontWeight: 1000, textTransform: 'lowercase', lineHeight: 1, margin: 0, color: 'var(--color-dark)' }}>
                    <div>{renderLetters(line1)}</div>
                    <div>{renderLetters(line2)}</div>
                    <div>{renderLetters(line3)}</div>
                </h2>
            </div>

            <div style={{ marginTop: '5vh', maxWidth: '40em', fontSize: '1.3rem', lineHeight: '1.4', fontWeight: 450, textAlign: 'center' }}>
                MPACK is your premium packaging partner.<br />
                We offer extensive vendor networks, MOQ flexibility,<br />
                and bespoke printing solutions for all industries.
            </div>
        </section>
    );
};

export default HorizontalWords;
