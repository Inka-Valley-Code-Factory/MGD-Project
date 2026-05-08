"use client";
import React from "react";
import Image from "next/image";

const partners = [
  { name: "Apex Structural", logo: "/partner_1.png" },
  { name: "Steel Horizon", logo: "/partner_2.png" },
  { name: "Urban Grid", logo: "/partner_3.png" },
  { name: "Nova Engineering", logo: "/partner_1.png" },
  { name: "Core Builders", logo: "/partner_2.png" },
  { name: "Summit Design", logo: "/partner_3.png" },
];

const PartnersComponent = () => {
  return (
    <section className="relative w-full bg-[#0b0d10] py-12 md:py-20 overflow-hidden border-t border-white/5">
      {/* Subtle Grain Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 w-full px-5 md:px-[6vw] lg:px-[8vw] mb-12">
        <div className="flex flex-col items-center">
          <span className="text-[0.9rem] md:text-[1.3rem] font-bold tracking-[0.5em] uppercase text-white/80 text-center">
            Trusted By Industry Leaders
          </span>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mt-4" />
        </div>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative flex overflow-hidden w-full group py-10">
        {/* The 'Colorizer' Lenses (Native CSS) */}
        {/* Left Lens: Dims and Grayscales */}
        <div className="absolute inset-y-0 left-0 w-[30%] bg-[#0b0d10]/70 backdrop-grayscale backdrop-blur-[2px] z-20 pointer-events-none [mask-image:linear-gradient(to_right,black_60%,transparent)]" />

        {/* Right Lens: Dims and Grayscales */}
        <div className="absolute inset-y-0 right-0 w-[30%] bg-[#0b0d10]/70 backdrop-grayscale backdrop-blur-[2px] z-20 pointer-events-none [mask-image:linear-gradient(to_left,black_60%,transparent)]" />

        {/* The Center Glow */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />

        <div className="flex animate-marquee whitespace-nowrap gap-12 items-center">
          {[...partners, ...partners, ...partners].map((partner, i) => (
            <div
              key={i}
              className="flex items-center gap-5 bg-white/[0.08] border border-white/10 rounded-2xl px-8 py-5 transition-all duration-500 hover:bg-white/[0.15] hover:border-white/30 group/card cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            >
              <div className="relative w-7 h-7 md:w-9 md:h-9 opacity-90 transition-opacity duration-500">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[0.65rem] md:text-[0.75rem] font-bold uppercase tracking-[0.3em] text-white/80 transition-colors duration-500">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersComponent;
