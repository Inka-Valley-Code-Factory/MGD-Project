"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const SriLankaMap = dynamic(
  () => import("@/components/front-side/sri-lanka-map"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] lg:h-[700px] rounded-[32px] bg-white/[0.02] border border-white/10 animate-pulse flex items-center justify-center">
        <span className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-white/20">
          Loading Real-Time Map...
        </span>
      </div>
    ),
  },
);

// Helper to find site by ID from the map
const findSiteById = (id: number, sites: any[]) => sites.find(s => s.id === id);

const sitesData = [
  {
    id: 1,
    name: "The Obsidian Tower",
    description:
      "A landmark of modern skyscraper engineering, redefining the Colombo skyline with obsidian glass and structural steel. This project involved complex foundation work and high-performance facade systems.",
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
      "Exclusive luxury living on the southern coast, where modern minimalism meets the infinite blue of the Indian Ocean. Designed for maximum ventilation and natural light integration.",
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
      "Redefining the workspace for the future with fluid layouts and high-tech structural integration. Features state-of-the-art energy management and collaborative zones.",
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
      "Sustainable infrastructure connecting cities through precision engineering and organic design principles. Built with carbon-neutral materials and smart monitoring systems.",
    location: "Jaffna, Sri Lanka",
    image: "/site_4.png",
    images: ["/site_4.png", "/site_1.png", "/site_2.png"],
    category: "Infrastructure",
    year: "2023",
  },
  {
    id: 5,
    name: "Meridian Mall",
    description:
      "A premium retail destination featuring a unique blend of open-air spaces and climate-controlled shopping zones. The central atrium serves as a community hub.",
    location: "Negombo, Sri Lanka",
    image: "/site_1.png",
    images: ["/site_1.png", "/site_3.png", "/site_4.png"],
    category: "Commercial",
    year: "2024",
  },
  {
    id: 6,
    name: "Serenity Gardens",
    description:
      "An eco-conscious residential community integrated with lush vertical forests and renewable energy systems. Promotes urban biodiversity and wellness.",
    location: "Kurunegala, Sri Lanka",
    image: "/site_2.png",
    images: ["/site_2.png", "/site_4.png", "/site_1.png"],
    category: "Residential",
    year: "2023",
  },
  {
    id: 7,
    name: "Velocity Logistics Park",
    description:
      "State-of-the-art automated warehouse facility designed for global distribution efficiency. Optimized for high-throughput robotics and green logistics.",
    location: "Hambantota, Sri Lanka",
    image: "/site_3.png",
    images: ["/site_3.png", "/site_1.png", "/site_2.png"],
    category: "Industrial",
    year: "2024",
  },
  {
    id: 8,
    name: "Pinnacle Airport Terminal",
    description:
      "Modern airport infrastructure with a focus on seamless passenger flow and futuristic aesthetics. Features advanced security and passenger lounge facilities.",
    location: "Katunayake, Sri Lanka",
    image: "/site_4.png",
    images: ["/site_4.png", "/site_2.png", "/site_3.png"],
    category: "Infrastructure",
    year: "2022",
  },
];

const AllSitesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSite, setSelectedSite] = useState<any>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const filteredSites = useMemo(() => {
    return sitesData.filter((site) => {
      const matchesSearch =
        site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery]);

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
    <main className="min-h-screen bg-[#0b0d10] text-white selection:bg-orange-600/30">
      {/* Cinematic Background Elements */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="fixed top-0 left-0 w-[80vw] h-[80vh] bg-orange-600/5 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[60vw] h-[60vh] bg-blue-600/5 rounded-full blur-[140px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Header Section */}
      <section className="relative z-10 pt-10 pb-12 px-6 md:px-[6vw]">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col gap-4 mb-12">
            <div className="flex items-center gap-4 text-orange-500 font-bold uppercase tracking-[0.3em] text-[0.6rem] md:text-[0.7rem]">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="w-4 h-px bg-white/20" />
              <span className="text-white/40">Our Digital Footprint</span>
            </div>
            <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-light leading-[0.9] tracking-[-0.04em] uppercase">
              Sites{" "}
              <span className="font-bold italic text-white">Developed.</span>
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 py-6 border-y border-white/10 backdrop-blur-sm sticky top-24 z-40 bg-[#0b0d10]/50 -mx-6 px-6 md:mx-0 md:px-0">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="Search by site name, location or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-full py-5 px-14 text-sm focus:outline-none focus:border-orange-600/50 transition-all placeholder:text-white/20 group-hover:bg-white/[0.05]"
              />
              <svg
                className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-orange-500 transition-colors"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Sites Grid */}
      <section className="relative z-10 px-6 md:px-[6vw] pb-32">
        <div className="max-w-[1800px] mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredSites.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
              >
                {filteredSites.map((site, idx) => (
                  <motion.div
                    key={site.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    onClick={() => handleSiteClick(site)}
                    className="group relative flex flex-col overflow-hidden rounded-[32px] bg-white/[0.02] border border-white/5 transition-all duration-500 hover:border-white/20 cursor-pointer"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={site.image}
                        alt={site.name}
                        fill
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] via-transparent to-transparent opacity-80" />

                      {/* Category Tag */}
                      <div className="absolute top-6 right-6">
                        <span className="px-4 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[0.6rem] font-bold uppercase tracking-widest text-white">
                          {site.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-1">
                      <span className="text-[0.6rem] font-bold tracking-[0.4em] uppercase text-orange-500 mb-3 block">
                        {site.location}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tighter mb-4">
                        {site.name}
                      </h3>
                      <p className="text-white/40 text-sm font-light leading-relaxed mb-8 flex-1 line-clamp-2">
                        {site.description}
                      </p>

                      <div className="flex items-center justify-between pt-6 border-t border-white/5">
                        <span className="text-[0.6rem] font-bold uppercase tracking-widest text-white/20">
                          Completed {site.year}
                        </span>
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-40 text-center"
              >
                <div className="w-24 h-24 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center mb-8">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white/10"
                    strokeWidth="1"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light text-white/60 mb-3">
                  No sites found
                </h3>
                <p className="text-white/20">
                  Try searching for a different location or development name.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Site Detail Modal - Liquid Glass Popup */}
      <AnimatePresence>
        {selectedSite && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            {/* Backdrop */}
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

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[1000px] max-h-[90vh] overflow-hidden bg-[#0b0d10]/60 backdrop-blur-[40px] border border-white/10 rounded-[32px] flex flex-col lg:flex-row shadow-2xl"
            >
              {/* Close Button */}
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

              {/* Left Side: Photo Collection Slider */}
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

                {/* Photo Navigation (Dots) */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                  {selectedSite.images.map((_: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        activePhotoIndex === idx
                          ? "w-8 bg-orange-600"
                          : "w-2 bg-white/30 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Right Side: Details Content */}
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

                  {/* Contact Section */}
                  <div className="pt-10 border-t border-white/10">
                    <h4 className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/30 mb-6">
                      Direct Inquiries
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <a
                        href="tel:+94112345678"
                        className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-orange-600/20 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
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
                          +94 (11) 234 5678
                        </span>
                      </a>

                      <a
                        href="mailto:hello@mgdgroup.com"
                        className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
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
                      href={`https://wa.me/94771234567?text=${encodeURIComponent(`මම ${selectedSite.name} ගැන වැඩි විස්තර දැන ගැනීමට කැමතියි.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full py-5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-2xl shadow-lg shadow-green-600/20 transition-all active:scale-[0.98]"
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

      {/* Decoration */}
      <div className="relative h-40 w-full overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-600/20 to-transparent" />
      </div>
    </main>
  );
};

export default AllSitesPage;
