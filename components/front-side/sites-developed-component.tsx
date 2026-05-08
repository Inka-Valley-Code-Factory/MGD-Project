"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const MobileSitesCarousel = ({ sites }: { sites: any[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollPos = el.scrollLeft;
      const firstChild = el.firstElementChild as HTMLElement;
      if (!firstChild) return;
      const cardWidth = firstChild.offsetWidth;
      const gap = 20; // gap-5 = 20px
      const index = Math.round(scrollPos / (cardWidth + gap));
      if (index !== activeIndex) setActiveIndex(index);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  const scrollTo = (index: number) => {
    const el = scrollRef.current;
    if (el) {
      const firstChild = el.firstElementChild as HTMLElement;
      const cardWidth = firstChild.offsetWidth;
      const gap = 20;
      el.scrollTo({ left: index * (cardWidth + gap), behavior: "smooth" });
    }
  };

  return (
    <div className="md:hidden relative mb-12">
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-5 px-5 pb-4"
      >
        {sites.map((site, i) => (
          <div
            key={site.id}
            className="flex-shrink-0 w-[75vw] h-[480px] snap-start rounded-[30px] overflow-hidden relative border border-white/10 transition-all duration-500 ease-out"
            style={{
              transform: activeIndex === i ? "scale(1)" : "scale(0.92)",
              opacity: activeIndex === i ? 1 : 0.5,
            }}
          >
            <Image
              src={site.image}
              alt={site.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] via-[#0b0d10]/40 to-transparent opacity-90" />

            <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
              <span className="text-[0.55rem] font-bold uppercase tracking-widest text-white">
                {site.category}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 p-8 w-full">
              <span className="text-[0.6rem] font-bold tracking-[0.4em] uppercase text-orange-500 mb-3 block">
                {site.location}
              </span>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tighter mb-3">
                {site.name}
              </h3>
              <p className="text-white/40 text-[0.75rem] font-light leading-relaxed line-clamp-3">
                {site.description}
              </p>
            </div>
          </div>
        ))}

        {/* SHOW MORE CARD - Last Item */}
        <div
          className="flex-shrink-0 w-[75vw] h-[480px] snap-start rounded-[30px] overflow-hidden relative border border-white/10 transition-all duration-500 ease-out bg-white/[0.02] flex flex-col items-center justify-center gap-6"
          style={{
            transform:
              activeIndex === sites.length ? "scale(1)" : "scale(0.92)",
            opacity: activeIndex === sites.length ? 1 : 0.5,
          }}
        >
          <div className="w-20 h-20 rounded-full bg-orange-600/20 border border-orange-500/30 flex items-center justify-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ea580c"
              strokeWidth="1.5"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white uppercase tracking-tighter mb-2">
              Explore All
            </h3>
            <p className="text-white/40 text-[0.7rem] uppercase tracking-[0.3em]">
              View Our Full Portfolio
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Indicators */}
      <div className="flex justify-center items-center gap-3 mt-6">
        {[...sites, null].map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className="relative h-1.5 transition-all duration-500 ease-in-out rounded-full overflow-hidden"
            style={{
              width: activeIndex === i ? "40px" : "12px",
              backgroundColor:
                activeIndex === i ? "#ea580c" : "rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </div>

      {/* Swipe Hint */}
      {activeIndex === 0 && (
        <div className="flex justify-center items-center gap-2 mt-4 opacity-40 animate-pulse">
          <span className="text-[0.6rem] uppercase tracking-widest font-bold text-white">
            Swipe
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  );
};

const sitesData = [
  {
    id: 1,
    name: "The Obsidian Tower",
    description:
      "A landmark of modern skyscraper engineering, redefining the Colombo skyline with obsidian glass and structural steel.",
    location: "Colombo, Sri Lanka",
    image: "/site_1.png",
    category: "Commercial",
  },
  {
    id: 2,
    name: "Azure Bay Villa",
    description:
      "Exclusive luxury living on the southern coast, where modern minimalism meets the infinite blue of the Indian Ocean.",
    location: "Galle, Sri Lanka",
    image: "/site_2.png",
    category: "Residential",
  },
  {
    id: 3,
    name: "Nexus Tech Hub",
    description:
      "Redefining the workspace for the future with fluid layouts and high-tech structural integration.",
    location: "Kandy, Sri Lanka",
    image: "/site_3.png",
    category: "Industrial",
  },
  {
    id: 4,
    name: "Eco Link Bridge",
    description:
      "Sustainable infrastructure connecting cities through precision engineering and organic design principles.",
    location: "Jaffna, Sri Lanka",
    image: "/site_4.png",
    category: "Infrastructure",
  },
];

const SitesDevelopedComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let isDesktop = false;

    const updateScroll = () => {
      isDesktop = window.innerWidth >= 768;

      if (!isDesktop) {
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(0px, 0, 0)`;
        }
        return;
      }

      if (!containerRef.current || !trackRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;

      let progress = 0;
      if (rect.top <= 0 && maxScroll > 0) {
        progress = Math.abs(rect.top) / maxScroll;
        progress = Math.min(1, Math.max(0, progress)); // clamp
      }

      const trackWidth = trackRef.current.scrollWidth;
      const windowWidth = window.innerWidth;

      // Allow it to slide until the end of the track is visible (with padding)
      const maxTranslate = Math.max(
        0,
        trackWidth - windowWidth + windowWidth * 0.08,
      );

      trackRef.current.style.transform = `translate3d(-${progress * maxTranslate}px, 0, 0)`;
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    // Initial call
    updateScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0b0d10] h-auto md:h-[300vh]"
    >
      <div className="relative md:sticky top-0 w-full h-auto md:h-screen md:overflow-hidden flex flex-col justify-center py-20 md:py-0">
        {/* Liquid Glass Background Elements - Mesh Gradients */}
        <div className="absolute -top-[10%] -right-[5%] w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[150px] animate-pulse pointer-events-none" />
        <div className="absolute top-[10%] -left-[5%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />

        {/* Fine Grain Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 w-full px-5 md:px-[6vw] lg:px-[8vw]">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 shrink-0">
            <div className="max-w-[700px]">
              <div className="flex items-center gap-6 mb-8 opacity-60">
                <div className="w-12 h-px bg-orange-500" />
                <span className="text-[0.6rem] font-bold tracking-[0.6em] uppercase text-white">
                  Our Digital Footprint
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
              </div>
              <h2 className="text-[clamp(2.5rem,4.5vw,5rem)] font-light leading-[0.95] tracking-[-0.04em] uppercase text-[#d1d1d1]">
                Sites{" "}
                <span className="font-bold text-white italic">Developed.</span>
              </h2>
            </div>
            <div className="max-w-[380px] pb-2">
              <p className="text-white/40 text-sm md:text-base font-light leading-relaxed">
                Exploring the intersection of architectural precision and
                digital innovation through our most iconic developments.
              </p>
            </div>
          </div>

          {/* Mobile Carousel */}
          <MobileSitesCarousel sites={sitesData} />

          {/* Creative Bento Grid - Liquid Glass 2.0 Style (Desktop Only) */}
          <div className="hidden md:flex overflow-hidden">
            <div
              ref={trackRef}
              className="flex flex-nowrap gap-8 w-max mt-10 origin-left will-change-transform"
            >
              {/* LARGE FEATURED CARD (8 cols, 2 rows) */}
              <div className="w-[85vw] lg:w-[60vw] shrink-0 group relative overflow-hidden rounded-[32px] md:rounded-[48px] bg-white/[0.02] border border-white/10 backdrop-blur-3xl transition-all duration-1000 hover:border-orange-500/30 hover:shadow-[0_0_100px_rgba(234,88,12,0.1)]">
                <Image
                  src={sitesData[0].image}
                  alt={sitesData[0].name}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] via-[#0b0d10]/40 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-70" />

                <div className="absolute top-10 right-10 flex items-center gap-3 bg-black/40 backdrop-blur-md px-5 py-2 rounded-full border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[0.6rem] font-bold uppercase tracking-widest text-white">
                    {sitesData[0].category}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 p-10 w-full">
                  <div className="flex items-end justify-between gap-6">
                    <div className="flex-1">
                      <span className="text-[0.6rem] font-bold tracking-[0.4em] uppercase text-orange-500 mb-4 block">
                        {sitesData[0].location}
                      </span>
                      <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
                        {sitesData[0].name.split(" ").map((word, i) => (
                          <span
                            key={i}
                            className={
                              i === 1
                                ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40"
                                : ""
                            }
                          >
                            {word}{" "}
                          </span>
                        ))}
                      </h3>
                    </div>
                    <button className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500 shrink-0">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-white group-hover:text-black transition-colors"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-white/50 text-base md:text-lg max-w-xl font-light leading-relaxed opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 mt-6">
                    {sitesData[0].description}
                  </p>
                </div>
              </div>

              {/* TALL CARD (4 cols, 2 rows) */}
              <div className="w-[45vw] lg:w-[35vw] shrink-0 group relative overflow-hidden rounded-[32px] md:rounded-[48px] bg-white/[0.02] border border-white/10 backdrop-blur-3xl transition-all duration-1000 hover:border-white/30">
                <Image
                  src={sitesData[1].image}
                  alt={sitesData[1].name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0d10]/20 to-[#0b0d10] opacity-90" />
                <div className="absolute bottom-0 left-0 p-8">
                  <span className="text-[0.6rem] font-bold tracking-[0.4em] uppercase text-orange-500 mb-3 block">
                    {sitesData[1].location}
                  </span>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tighter mb-3">
                    {sitesData[1].name}
                  </h3>
                  <p className="text-white/40 text-[0.75rem] font-light leading-relaxed mb-6">
                    {sitesData[1].description}
                  </p>

                  <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-white group-hover:text-black transition-colors"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* WIDE CARD (7 cols, 1 row) */}
              <div className="w-[60vw] lg:w-[50vw] shrink-0 group relative overflow-hidden rounded-[32px] md:rounded-[48px] bg-white/[0.03] border border-white/10 backdrop-blur-3xl transition-all duration-1000 hover:border-white/30">
                <Image
                  src={sitesData[2].image}
                  alt={sitesData[2].name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d10] via-[#0b0d10]/40 to-transparent opacity-95" />
                <div className="absolute inset-0 flex items-center justify-between p-10">
                  <div className="max-w-[65%]">
                    <span className="text-[0.55rem] font-bold tracking-[0.5em] uppercase text-orange-500 mb-3 block">
                      {sitesData[2].location}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tighter mb-3">
                      {sitesData[2].name}
                    </h3>
                    <p className="text-white/40 text-[0.75rem] md:text-sm font-light leading-relaxed line-clamp-2">
                      {sitesData[2].description}
                    </p>
                  </div>
                  <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-white group-hover:text-black transition-colors"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* NESTED SMALL CARD (5 cols, 1 row) */}
              <div className="w-[50vw] lg:w-[40vw] shrink-0 group relative overflow-hidden rounded-[32px] md:rounded-[48px] bg-white/[0.02] border border-white/10 backdrop-blur-3xl transition-all duration-1000 hover:border-white/30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,88,12,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <Image
                  src={sitesData[3].image}
                  alt={sitesData[3].name}
                  fill
                  className="object-cover mix-blend-luminosity opacity-30 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-10 bg-gradient-to-t from-[#0b0d10] via-transparent to-transparent">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">
                        {sitesData[3].name}
                      </h3>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-orange-500">
                          {sitesData[3].location}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/40">
                          {sitesData[3].category}
                        </span>
                      </div>
                    </div>
                    <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500 shrink-0">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-white group-hover:text-black transition-colors"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Animated Footer Label Integrated into Track */}
              <div className="hidden md:flex items-center justify-center shrink-0 w-[40vw] lg:w-[30vw] pr-[6vw] lg:pr-[8vw]">
                <button className="group relative w-full h-[340px] px-6 py-5 overflow-hidden rounded-[32px] md:rounded-[48px] border border-white/10 flex flex-col items-center justify-center gap-4 bg-white/[0.02] hover:bg-white/[0.05] transition-all">
                  <span className="relative text-white text-[0.7rem] font-bold uppercase tracking-[0.3em] text-center">
                    Explore
                    <br /> All Sites
                  </span>
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    className="mt-4 transition-transform group-hover:translate-x-2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Footer Label */}
        </div>
      </div>
    </section>
  );
};

export default SitesDevelopedComponent;
