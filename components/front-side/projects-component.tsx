"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  "All",
  "Residential",
  "Commercial",
  "Infrastructure",
  "Industrial",
];

const projectsData = [
  {
    id: 1,
    name: "Skyward Heights",
    category: "Residential",
    image: "/project_villa.png",
    description:
      "Ultra-luxury modern villa with smart integration and sustainable materials.",
    location: "Colombo, SL",
    year: "2023",
    variations: [
      {
        id: "v1",
        name: "3-Bedroom Standard",
        price: "$450,000",
        description:
          "Elegant 3-bedroom villa with high-quality finishes and basic smart home features.",
      },
      {
        id: "v2",
        name: "4-Bedroom Premium",
        price: "$650,000",
        description:
          "Spacious 4-bedroom layout with premium Italian marble and advanced home automation.",
      },
      {
        id: "v3",
        name: "Executive Penthouse Villa",
        price: "$1,200,000",
        description:
          "Ultimate luxury with a private rooftop infinity pool and panoramic city views.",
      },
    ],
  },
  {
    id: 2,
    name: "Corporate Nexus",
    category: "Commercial",
    image: "/project_tower.png",
    description:
      "State-of-the-art office tower featuring LEED Gold certification.",
    location: "Kandy, SL",
    year: "2024",
    variations: [
      {
        id: "v1",
        name: "Shared Coworking Space",
        price: "$2,500/mo",
        description:
          "Modern shared office environment with high-speed internet and lounge access.",
      },
      {
        id: "v2",
        name: "Private Executive Suite",
        price: "$8,000/mo",
        description:
          "Fully furnished private suite with dedicated reception and meeting rooms.",
      },
    ],
  },
  {
    id: 3,
    name: "Mahaweli Link",
    category: "Infrastructure",
    image: "/project_bridge.png",
    description:
      "Critical infrastructure connecting rural communities with precision engineering.",
    location: "Polonnaruwa, SL",
    year: "2022",
    variations: [],
  },
  {
    id: 4,
    name: "Aura Condominiums",
    category: "Residential",
    image: "/project_villa.png",
    description:
      "High-rise residential complex focusing on communal green spaces.",
    location: "Galle, SL",
    year: "2023",
    variations: [
      {
        id: "v1",
        name: "City View Studio",
        price: "$180,000",
        description:
          "Compact and modern studio apartment perfect for young professionals.",
      },
      {
        id: "v2",
        name: "Ocean Front Suite",
        price: "$350,000",
        description:
          "Premium 2-bedroom suite with direct views of the Indian Ocean.",
      },
    ],
  },
  {
    id: 5,
    name: "Apex Logistics",
    category: "Industrial",
    image: "/project_tower.png",
    description: "Automated logistics hub designed for maximum throughput.",
    location: "Hambantota, SL",
    year: "2024",
    variations: [
      {
        id: "v1",
        name: "Standard Warehouse Unit",
        price: "$15,000/mo",
        description:
          "10,000 sq.ft. space with loading docks and basic climate control.",
      },
      {
        id: "v2",
        name: "High-Tech Cold Storage",
        price: "$45,000/mo",
        description:
          "Automated cold storage facility with multi-zone temperature monitoring.",
      },
    ],
  },
  {
    id: 6,
    name: "Harbor Front",
    category: "Commercial",
    image: "/project_bridge.png",
    description: "Mixed-use development revitalizing the waterfront district.",
    location: "Colombo, SL",
    year: "2023",
    variations: [
      {
        id: "v1",
        name: "Retail Boutique Space",
        price: "$4,500/mo",
        description:
          "Prime ground-floor retail space with large display windows and high foot traffic.",
      },
      {
        id: "v2",
        name: "Waterfront Restaurant Shell",
        price: "$12,000/mo",
        description:
          "Spacious restaurant venue with outdoor seating capability and sunset views.",
      },
    ],
  },
];

const ProjectsComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setSelectedVariant(
      project.variations && project.variations.length > 0
        ? project.variations[0]
        : null,
    );
  };

  const filteredProjects =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="portfolio"
      className="relative bg-[#0b0d10] pt-16 pb-10 w-full overflow-hidden"
    >
      {/* Cinematic Noise Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Glow Orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[140px] translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 w-full px-5 md:px-[6vw] lg:px-[8vw]">
        <div className="flex items-center gap-6 md:mb-10 mb-5 opacity-60">
          <div className="w-12 h-px bg-orange-500" />
          <span className="text-[0.6rem] font-bold tracking-[0.6em] uppercase text-white">
            MGD GROUP'S Projects
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent " />
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="w-full text-center md:text-left">
            <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-light leading-[1] tracking-[-0.03em] uppercase text-[#d1d1d1]">
              Crafted For
              <span className="font-bold text-white italic"> Impact.</span>
            </h2>
          </div>
        </div>

        {/* Cinematic Category Bar */}
        <div className="relative mb-20 overflow-visible">
          <div className="flex items-center justify-center">
            <div className="flex overflow-x-auto no-scrollbar gap-2 md:gap-4 p-2 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-full snap-x">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-8 py-3 whitespace-nowrap uppercase tracking-[0.25em] text-[0.6rem] font-bold transition-all duration-500 rounded-full snap-start ${
                    selectedCategory === cat
                      ? "bg-orange-600 text-white shadow-[0_0_20px_rgba(234,88,12,0.3)]"
                      : "text-white/40 hover:text-white/80 hover:bg-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid - 2+1 Mobile Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-12 w-full">
          {filteredProjects.slice(0, 3).map((project, idx) => (
            <div
              key={`${project.id}-${selectedCategory}`}
              onClick={() => handleProjectClick(project)}
              className="group relative flex flex-col overflow-hidden rounded-[32px] bg-white/[0.03] border border-white/10 transition-all duration-500 hover:border-white/20 animate-in fade-in slide-in-from-bottom-8 duration-700 cursor-pointer"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="relative h-[240px] md:h-[250px] w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] via-transparent to-transparent opacity-80" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 p-4 md:p-8 w-full translate-y-2 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-px bg-orange-500" />
                    <span className="text-[0.6rem] font-bold uppercase tracking-widest text-orange-500">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider mb-3 text-white">
                    {project.name}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* See More CTA */}
          <div className="col-span-1 lg:col-span-3 flex items-center justify-center mt-4 md:mt-0">
            <a
              href="/projects"
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
                <br className="md:hidden" /> All Projects
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Project Detail Modal - Liquid Glass Popup */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            {/* Liquid Backdrop */}
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
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[1100px] max-h-[90vh] overflow-hidden bg-[#0b0d10]/60 backdrop-blur-[40px] border border-white/10 rounded-[32px] flex flex-col lg:flex-row shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-orange-600 hover:border-orange-600 transition-all group"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Left Side: Smaller Image Sidebar */}
              <div className="relative w-full lg:w-[340px] h-[240px] lg:h-auto overflow-hidden bg-white/5 shrink-0">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  fill
                  className="object-cover lg:object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-transparent via-[#0b0d10]/10 to-[#0b0d10]/60" />

                <div className="absolute bottom-6 left-6 right-6">
                  <span className="px-3 py-1 bg-orange-600 rounded-full text-[0.5rem] font-bold uppercase tracking-widest text-white shadow-lg">
                    {selectedProject.category}
                  </span>
                  <div className="mt-3 text-white/50 text-[0.6rem] font-bold uppercase tracking-tighter">
                    {selectedProject.location || "Colombo, SL"} •{" "}
                    {selectedProject.year || "2023"}
                  </div>
                </div>
              </div>

              {/* Right Side: Details Content */}
              <div className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto no-scrollbar">
                <div className="max-w-2xl">
                  <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-white mb-4">
                    {selectedProject.name}
                  </h2>

                  <p className="text-white/50 leading-relaxed mb-8 text-xs md:text-sm line-clamp-3 lg:line-clamp-none">
                    {selectedProject.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-6">
                      {selectedProject.variations &&
                      selectedProject.variations.length > 0 ? (
                        <>
                          <div className="space-y-3">
                            <label className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/30">
                              Select Project Tier
                            </label>
                            <div className="relative group">
                              <select
                                value={selectedVariant?.id}
                                onChange={(e) => {
                                  const variant =
                                    selectedProject.variations.find(
                                      (v: any) => v.id === e.target.value,
                                    );
                                  setSelectedVariant(variant);
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-[0.8rem] appearance-none focus:outline-none focus:border-orange-600/50 transition-all text-white cursor-pointer group-hover:bg-white/[0.08]"
                              >
                                {selectedProject.variations.map(
                                  (variant: any) => (
                                    <option
                                      key={variant.id}
                                      value={variant.id}
                                      className="bg-[#0b0d10] text-white"
                                    >
                                      {variant.name}
                                    </option>
                                  ),
                                )}
                              </select>
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="m6 9 6 6 6-6" />
                                </svg>
                              </div>
                            </div>
                          </div>

                          <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-500">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[0.6rem] font-bold uppercase tracking-widest text-orange-500">
                                Investment
                              </span>
                              <span className="text-xl font-bold text-white tracking-tighter">
                                {selectedVariant?.price}
                              </span>
                            </div>
                            {selectedVariant?.description && (
                              <p className="text-[0.7rem] text-white/40 leading-relaxed border-t border-white/5 pt-3">
                                {selectedVariant.description}
                              </p>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl">
                          <span className="text-[0.6rem] font-bold uppercase tracking-widest text-white/30 block mb-2">
                            Project Pricing
                          </span>
                          <span className="text-sm text-white/60 font-medium italic">
                            Contact our team for a personalized quotation based
                            on your specific requirements.
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/30">
                          Direct Inquiries
                        </label>
                        <div className="flex flex-col gap-2">
                          <a
                            href="tel:+94112345678"
                            className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-orange-600/20 flex items-center justify-center text-orange-500">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                              </svg>
                            </div>
                            <span className="text-xs font-bold text-white/80">
                              +94 (11) 234 5678
                            </span>
                          </a>
                          <a
                            href="mailto:hello@mgdgroup.com"
                            className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                              </svg>
                            </div>
                            <span className="text-xs font-bold text-white/80">
                              hello@mgdgroup.com
                            </span>
                          </a>
                        </div>
                      </div>

                      <a
                        href={`https://wa.me/94771234567?text=${encodeURIComponent(`මම ${selectedProject.name}${selectedVariant ? ` හි ${selectedVariant.name}` : ""} ගැන වැඩි විස්තර දැන ගැනීමට කැමතියි.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl shadow-lg shadow-green-600/20 transition-all group active:scale-[0.98]"
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsComponent;
