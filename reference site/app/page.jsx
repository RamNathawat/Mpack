'use client';

import SvgSymbols from '@/components/SvgSymbols';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HorizontalWords from '@/components/HorizontalWords';

import PrintingAndPouches from '@/components/PrintingAndPouches';
import IndustriesMarquee from '@/components/IndustriesMarquee';
import ServiceCards from '@/components/ServiceCards';
import DoubleMarquee from '@/components/DoubleMarquee';
import Footer from '@/components/Footer';
import TransitionScribble from '@/components/TransitionScribble';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';

export default function Home() {
    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />
            <header className="main-header slideshow-stop">
                <Navbar />
                <Hero />
            </header>
            <div className="slideshow-stop">
                <HorizontalWords />
            </div>
            <div className="slideshow-stop">
                <PrintingAndPouches />
            </div>

            <main className="slideshow-stop">
                <IndustriesMarquee />
            </main>
            <section className="Double-marquee slideshow-stop">
                <DoubleMarquee />
            </section>
            <footer className="main-footer slideshow-stop">
                <Footer />
            </footer>
            <TransitionScribble />
        </>
    );
}
