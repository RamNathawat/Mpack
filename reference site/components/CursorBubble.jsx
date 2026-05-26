'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CursorBubble() {
    const bubbleRef = useRef(null);

    useEffect(() => {
        const bubble = bubbleRef.current;
        if (!bubble) return;

        // Use GSAP quickTo for ultra-smooth cursor tracking
        const xTo = gsap.quickTo(bubble, 'x', { duration: 0.15, ease: 'power3' });
        const yTo = gsap.quickTo(bubble, 'y', { duration: 0.15, ease: 'power3' });

        const onMouseMove = (e) => {
            xTo(e.clientX);
            yTo(e.clientY);

            // Find if we are hovering over any element with data-cursor-text
            const target = e.target.closest('[data-cursor-text]');
            
            if (target) {
                const text = target.getAttribute('data-cursor-text');
                if (bubble.textContent !== text) {
                    bubble.textContent = text;
                }
                gsap.to(bubble, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.3,
                    ease: 'back.out(1.5)'
                });
            } else {
                // If not hovering over a target, shrink and hide the bubble
                gsap.to(bubble, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.2,
                    ease: 'power2.inOut'
                });
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        
        // Hide bubble when mouse leaves the window
        const onMouseLeave = () => {
            gsap.to(bubble, { scale: 0, opacity: 0, duration: 0.2 });
        };
        window.addEventListener('mouseleave', onMouseLeave);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseleave', onMouseLeave);
        };
    }, []);

    return (
        <div 
            ref={bubbleRef} 
            className="cursor-bubble"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 9999,
                backgroundColor: 'var(--color-pink, #EBB6F4)',
                color: 'var(--color-dark, #0f172a)',
                padding: '8px 16px',
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                transform: 'translate(-50%, -150%) scale(0)', // Offset above cursor
                opacity: 0,
                transformOrigin: 'center center'
            }}
        >
        </div>
    );
}
