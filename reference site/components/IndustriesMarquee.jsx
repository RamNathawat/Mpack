'use client';

import React from 'react';
import '../app/styles/industries-worlds.css';

const industriesData = [
    { name: "Food & Beverage", src: "/assets/industries-section/flat_modern_industry_food_1781019609690.png" },
    { name: "Nutraceuticals & Supplements", src: "/assets/industries-section/flat_modern_industry_nutra_1781019627721.png" },
    { name: "Pharmaceuticals & Healthcare", src: "/assets/industries-section/flat_modern_industry_pharma_1781019640868.png" },
    { name: "Personal Care & Cosmetics", src: "/assets/industries-section/flat_modern_industry_personal_care_1781019654401.png" },
    { name: "Pet Care & Animal Nutrition", src: "/assets/industries-section/flat_modern_industry_pet_care_1781019666873.png" },
    { name: "Home Care & Household Products", src: "/assets/industries-section/flat_modern_industry_home_care_1781019680459.png" },
    { name: "Retail & E-Commerce", src: "/assets/industries-section/flat_modern_industry_retail_1781019698077.png" },
    { name: "Agriculture & Agro Products", src: "" }
];

export default function IndustriesMarquee() {
    return (
        <section className="industries-worlds-section">
            <div className="industries-worlds-header">
                <h2>Industries We Serve</h2>
                <p>Packaging solutions tailored to every industry.</p>
            </div>
            
            <div className="industries-marquee-container">
                <div className="industries-marquee-track">
                    {/* Triplicate the array for seamless infinite scrolling */}
                    {[...industriesData, ...industriesData, ...industriesData].map((industry, index) => (
                        <div className="industry-world-item" key={index}>
                            <div className="industry-world-stage">
                                {/* Invisible stage with illustration */}
                                {industry.src ? (
                                    <img src={industry.src} alt={`${industry.name} Packaging World`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} loading="lazy" />
                                ) : (
                                    <div className="industry-world-placeholder" style={{ opacity: 0.05, border: '1px dashed currentColor', borderRadius: '50%' }}>
                                        {/* Blank space instead of dev-facing notes */}
                                    </div>
                                )}
                            </div>
                            <h3 className="industry-world-name">{industry.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
