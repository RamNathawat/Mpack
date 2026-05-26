'use client';

import SvgSymbols from '@/components/SvgSymbols';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HorizontalWords from '@/components/HorizontalWords';
import PrintingTypes from '@/components/PrintingTypes';
import ProductCategories from '@/components/ProductCategories';
import IndustriesCarousel from '@/components/IndustriesCarousel';
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
            <header className="main-header">
                <Navbar />
                <Hero />
            </header>
            <HorizontalWords />
            <main>
                <PrintingTypes />
                <ProductCategories />
                <IndustriesCarousel />
                <div className="content-section service-cards-wrapper">
                    <ServiceCards />
                </div>
            </main>
            <section className="Double-marquee">
                <DoubleMarquee />
            </section>
            <footer className="main-footer">
                <Footer />
            </footer>
            <TransitionScribble />
        </>
    );
}
