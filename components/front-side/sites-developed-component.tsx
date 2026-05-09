"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const MobileSitesCarousel = ({
  sites,
  onSiteClick,
}: {
  sites: any[];
  onSiteClick: (site: any) => void;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const observerOptions = {
      root: el,
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index"));
          setActiveIndex(index);
        }
      });
    }, observerOptions);

    const children = el.querySelectorAll("[data-index]");
    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

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
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-5 px-8 pb-8"
        style={{ perspective: "2000px", transformStyle: "preserve-3d" }}
      >
        {sites.map((site, i) => (
          <motion.div
            key={site.id}
            data-index={i}
            onClick={() => onSiteClick(site)}
            className="flex-shrink-0 w-[75vw] h-[520px] snap-center rounded-[40px] overflow-hidden relative border border-white/10 cursor-pointer"
            animate={{
              rotateY: activeIndex === i ? 0 : activeIndex < i ? 12 : -12,
              scale: activeIndex === i ? 1 : 0.94,
              opacity: activeIndex === i ? 1 : 0.6,
              translateZ: activeIndex === i ? 0 : -40,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
            }}
          >
            <Image
              src={site.image}
              alt={site.name}
              fill
              className="object-cover"
            />

            {/* Cinematic Glow Overlay for Active Card */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                activeIndex === i ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background:
                  "radial-gradient(circle at 50% 0%, rgba(234, 88, 12, 0.2), transparent 75%)",
              }}
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
          </motion.div>
        ))}

        {/* SHOW MORE CARD */}
        <Link
          href="/sites"
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
        </Link>
      </div>

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
    images: ["/site_1.png", "/site_2.png", "/site_3.png"],
    category: "Commercial",
    year: "2023",
  },
  {
    id: 2,
    name: "Azure Bay Villa",
    description:
      "Exclusive luxury living on the southern coast, where modern minimalism meets the infinite blue of the Indian Ocean.",
    location: "Galle, Sri Lanka",
    image: "/site_2.png",
    images: ["/site_2.png", "/site_1.png", "/site_4.png"],
    category: "Residential",
    year: "2022",
  },
  {
    id: 3,
    name: "Nexus Tech Hub",
    description:
      "Redefining the workspace for the future with fluid layouts and high-tech structural integration.",
    location: "Kandy, Sri Lanka",
    image: "/site_3.png",
    images: ["/site_3.png", "/site_2.png", "/site_1.png"],
    category: "Industrial",
    year: "2024",
  },
  {
    id: 4,
    name: "Eco Link Bridge",
    description:
      "Sustainable infrastructure connecting cities through precision engineering and organic design principles.",
    location: "Jaffna, Sri Lanka",
    image: "/site_4.png",
    images: ["/site_4.png", "/site_1.png", "/site_2.png"],
    category: "Infrastructure",
    year: "2023",
  },
];

const SitesDevelopedComponent = () => {
  const [selectedSite, setSelectedSite] = useState<any>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const handleSiteClick = (site: any) => {
    setSelectedSite(site);
    setActivePhotoIndex(0);
  };

  const nextPhoto = () => {
    if (!selectedSite) return;
    setActivePhotoIndex((prev) => (prev + 1) % selectedSite.images.length);
  };

  const prevPhoto = () => {
    if (!selectedSite) return;
    setActivePhotoIndex(
      (prev) =>
        (prev - 1 + selectedSite.images.length) % selectedSite.images.length,
    );
  };

  return (
    <section className="relative w-full h-[115vh] md:h-[120vh] bg-[#0b0d10] z-20">
      <div className="relative md:sticky top-0 w-full h-[115vh] md:h-[120vh] md:overflow-hidden flex flex-col justify-center py-20 pt-0 pb-10 md:py-0">
        <div className="absolute -top-[10%] -right-[5%] w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[150px] animate-pulse pointer-events-none" />
        <div className="absolute top-[10%] -left-[5%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />

        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 w-full pb-20 pt-36 px-5 md:px-[6vw] lg:px-[8vw]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 shrink-0">
            <div className="max-w-[700px]">
              <div className="flex items-center gap-6 mb-8 opacity-60">
                <div className="w-12 h-px bg-orange-500" />
                <span className="text-[0.6rem] font-bold tracking-[0.6em] uppercase text-white">
                  MGD GROUP'S Footprint
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

          <MobileSitesCarousel
            sites={sitesData}
            onSiteClick={handleSiteClick}
          />

          {/* Desktop bento grid (mobile remains unchanged above) */}
          <div className="hidden md:block mt-10">
            <div className="grid grid-cols-12 gap-8 auto-rows-[170px] lg:auto-rows-[220px] xl:auto-rows-[240px]">
              {sitesData.map((site, idx) => {
                const layout =
                  idx === 0
                    ? "col-span-12 md:col-span-7 row-span-2"
                    : idx === 1
                      ? "col-span-12 md:col-span-5 row-span-1"
                      : idx === 2
                        ? "col-span-12 sm:col-span-6 md:col-span-3 row-span-1"
                        : "col-span-12 sm:col-span-6 md:col-span-2 row-span-1";

                const titleSize =
                  idx === 0
                    ? "text-3xl lg:text-5xl"
                    : idx === 1
                      ? "text-2xl lg:text-4xl"
                      : "text-2xl";

                return (
                  <div
                    key={site.id}
                    onClick={() => handleSiteClick(site)}
                    className={`${layout} group relative overflow-hidden rounded-[32px] lg:rounded-[44px] bg-white/[0.02] border border-white/10 cursor-pointer shadow-xl transition-transform duration-700 ease-out hover:-translate-y-1`}
                  >
                    <Image
                      src={site.image}
                      alt={site.name}
                      fill
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                      sizes="(min-width: 1024px) 60vw, (min-width: 768px) 90vw, 100vw"
                    />

                    {/* Liquid glass layers */}
                    <div className="absolute inset-0 bg-white/[0.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] via-[#0b0d10]/25 to-transparent opacity-85" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-white/10 via-transparent to-transparent" />

                    {/* Specular highlights */}
                    <div className="pointer-events-none absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white/10 blur-3xl opacity-60" />
                    <div className="pointer-events-none absolute -bottom-28 -right-28 w-72 h-72 rounded-full bg-orange-600/10 blur-3xl opacity-50" />

                    <div className="absolute top-6 right-6 lg:top-8 lg:right-8 flex items-center gap-3 bg-black/30 backdrop-blur-sm px-4 lg:px-5 py-2 rounded-full border border-white/10 max-w-[70%]">
                      <span className="text-[0.6rem] font-bold uppercase tracking-widest text-white truncate">
                        {site.location}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 p-8 lg:p-10 w-full">
                      <h3
                        className={`${titleSize} font-black text-white uppercase tracking-tighter leading-[0.95] mb-3`}
                      >
                        {site.name}
                      </h3>
                      <p
                        className={`${idx === 0 ? "text-base" : "text-sm"} text-white/55 font-light leading-relaxed line-clamp-2`}
                      >
                        {site.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className=" hidden md:flex  lg:col-span-3  items-center justify-center  md:my-10">
            <a
              href="/sites"
              className="group relative w-full h-full min-h-[200px] md:min-h-0 md:h-auto md:w-auto px-6 md:px-12 py-5 overflow-hidden rounded-[32px] border border-white/10 flex flex-col items-center justify-center gap-4 bg-white/[0.02] hover:bg-white/[0.05] transition-all"
            >
              <span className="w-12 md:hidden h-12 rounded-full bg-orange-600 flex items-center justify-center shadow-[0_0_20px_rgba(234,88,12,0.4)] mb-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-1-1.73l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </span>
              <span className="relative text-white text-[0.6rem] md:text-[0.7rem] font-bold uppercase tracking-[0.3em] text-center">
                Explore
                <br className="md:hidden" /> All Sites
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Site Detail Modal - Liquid Glass Popup */}
      <AnimatePresence>
        {selectedSite && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{
                backdropFilter: "blur(0px)",
                backgroundColor: "rgba(0,0,0,0)",
              }}
              animate={{
                backdropFilter: "blur(20px)",
                backgroundColor: "rgba(0,0,0,0.8)",
              }}
              exit={{
                backdropFilter: "blur(0px)",
                backgroundColor: "rgba(0,0,0,0)",
              }}
              onClick={() => setSelectedSite(null)}
              className="absolute inset-0"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[1000px] max-h-[90vh] overflow-hidden bg-[#0b0d10]/60 backdrop-blur-[40px] border border-white/10 rounded-[32px] flex flex-col lg:flex-row shadow-2xl"
            >
              <button
                onClick={() => setSelectedSite(null)}
                className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-orange-600 hover:border-orange-600 transition-all group"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="relative w-full lg:w-[450px] h-[300px] lg:h-auto overflow-hidden bg-white/5 shrink-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePhotoIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={selectedSite.images[activePhotoIndex]}
                      alt={selectedSite.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] via-transparent to-transparent opacity-60" />

                {/* Arrow Navigation */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                  <button
                    onClick={prevPhoto}
                    className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-black/40 transition-all pointer-events-auto"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-black/40 transition-all pointer-events-auto"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                  {selectedSite.images.map((_: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        activePhotoIndex === idx
                          ? "w-8 bg-orange-600"
                          : "w-2 bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex-1 p-8 md:p-12 overflow-y-auto no-scrollbar">
                <div className="max-w-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-8 h-px bg-orange-500" />
                    <span className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-orange-500">
                      {selectedSite.category}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-white mb-4">
                    {selectedSite.name}
                  </h2>

                  <div className="flex items-center gap-3 mb-8 text-[0.65rem] font-bold uppercase tracking-widest text-white/30">
                    <span>{selectedSite.location}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    <span>Completed {selectedSite.year}</span>
                  </div>

                  <p className="text-white/50 leading-relaxed mb-10 text-sm">
                    {selectedSite.description}
                  </p>

                  <div className="pt-10 border-t border-white/10">
                    <h4 className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/30 mb-6">
                      Direct Inquiries
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <a
                        href="tel:+94777142061"
                        className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-orange-600/20 flex items-center justify-center text-orange-500">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        </div>
                        <span className="text-xs font-bold text-white">
                          +94 (77) 714 2061
                        </span>
                      </a>

                      <a
                        href="mailto:hello@mgdgroup.com"
                        className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                          </svg>
                        </div>
                        <span className="text-xs font-bold text-white">
                          hello@mgdgroup.com
                        </span>
                      </a>
                    </div>

                    <a
                      href={`https://wa.me/94777142061?text=${encodeURIComponent(`මම ${selectedSite.name} ගැන වැඩි විස්තර දැන ගැනීමට කැමතියි.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full py-5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-2xl shadow-lg transition-all"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.049a11.815 11.815 0 001.591 5.95L0 24l6.15-1.613a11.785 11.785 0 005.894 1.57h.005c6.637 0 12.048-5.414 12.052-12.05a11.815 11.815 0 00-3.628-8.512z" />
                      </svg>
                      <span className="text-[0.7rem] font-bold uppercase tracking-widest">
                        Inquire via WhatsApp
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SitesDevelopedComponent;
