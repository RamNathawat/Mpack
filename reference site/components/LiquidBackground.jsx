"use client";
import React, { useRef, useEffect } from 'react';
import gsap from "gsap";

const LiquidBackground = () => {
    const canvasRef = useRef(null);
    const mousePos = useRef({ x: -1000, y: -1000 });
    const particlesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let animationFrameId;
        let w, h;
        const INK_COLOR = "#FF6B6B"; // Warm, friendly Coral
        const BG_COLOR = "#f8fafc"; // Clean off-white

        // Initialize particles along the diagonal boundary
        const initParticles = () => {
            particlesRef.current = [];
            h = window.innerHeight;
            w = window.innerWidth;
            
            // Generate particles along the vertical height
            const numParticles = 45; // Reduced particle count for a smoother, wider wave
            for (let i = 0; i <= numParticles; i++) {
                const y = (i / numParticles) * h;
                const cx = w * 0.55 + (h / 2 - y) * Math.tan(15 * Math.PI / 180);

                particlesRef.current.push({
                    originX: cx,
                    originY: y,
                    x: cx,
                    y: y,
                    vx: 0,
                    vy: 0,
                    mass: 1,
                });
            }
        };

        const resize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w;
            canvas.height = h;
            initParticles();
        };

        window.addEventListener('resize', resize);
        resize();

        // Mouse tracking for hover gravity
        const handleMouseMove = (e) => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            mousePos.current.x = e.clientX - rect.left;
            mousePos.current.y = e.clientY - rect.top;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const render = () => {
            ctx.clearRect(0, 0, w, h);
            
            // Draw background
            ctx.fillStyle = BG_COLOR;
            ctx.fillRect(0, 0, w, h);

            // Diagonal base points (where the fluid edge rests)
            const topX = w * 0.55 + (h / 2) * Math.tan(15 * Math.PI / 180);
            const bottomX = w * 0.55 - (h / 2) * Math.tan(15 * Math.PI / 180);

            // Physics Update for Particles (1D Wave Simulation)
            const mx = mousePos.current.x;
            const my = mousePos.current.y;
            const particles = particlesRef.current;

            // 1. Self spring and Mouse pull
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Mouse Interaction (Liquid push/pull)
                const dxMouse = mx - p.x;
                const dyMouse = my - p.y;
                const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
                
                if (distMouse < 280) { 
                    const force = (280 - distMouse) / 280; 
                    p.vx += (dxMouse / distMouse) * force * 2.0; 
                }

                // Spring physics toward original diagonal line
                p.vx += (p.originX - p.x) * 0.025; 
            }

            // 2. Neighbor Propagation (Creates the smooth viscous ink curve)
            const spread = 0.18;
            for (let pass = 0; pass < 2; pass++) {
                for (let i = 0; i < particles.length; i++) {
                    if (i > 0) {
                        particles[i - 1].vx += spread * (particles[i].x - particles[i - 1].x);
                    }
                    if (i < particles.length - 1) {
                        particles[i + 1].vx += spread * (particles[i].x - particles[i + 1].x);
                    }
                }
            }

            // 3. Apply friction and update position
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.vx *= 0.82; // Viscous friction
                p.x += p.vx;
            }

            // Draw the flawless fluid surface (Bezier Curve)
            ctx.fillStyle = INK_COLOR;
            ctx.beginPath();
            
            // 1. Start top-left
            ctx.moveTo(0, 0);
            // 2. Line to the top of the diagonal
            ctx.lineTo(topX, 0);

            // 3. Bezier curve through all particles to form the fluid edge
            if (particles.length > 0) {
                // Connect the first particle
                ctx.lineTo(particles[0].x, particles[0].y);
                
                for (let i = 1; i < particles.length - 1; i++) {
                    const xc = (particles[i].x + particles[i+1].x) / 2;
                    const yc = (particles[i].y + particles[i+1].y) / 2;
                    ctx.quadraticCurveTo(particles[i].x, particles[i].y, xc, yc);
                }
                
                // Connect the last particle
                const last = particles[particles.length - 1];
                ctx.quadraticCurveTo(last.x, last.y, bottomX, h);
            } else {
                ctx.lineTo(bottomX, h);
            }

            // 4. Close the polygon bottom-left
            ctx.lineTo(0, h);
            ctx.lineTo(0, 0);
            ctx.closePath();
            
            // Fill the entire unified shape
            ctx.fill();

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
};

export default LiquidBackground;
