"use client";
import React, { useState } from "react";
import Image from "next/image";

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
  },
  {
    id: 2,
    name: "Corporate Nexus",
    category: "Commercial",
    image: "/project_tower.png",
    description:
      "State-of-the-art office tower featuring LEED Gold certification.",
  },
  {
    id: 3,
    name: "Mahaweli Link",
    category: "Infrastructure",
    image: "/project_bridge.png",
    description:
      "Critical infrastructure connecting rural communities with precision engineering.",
  },
  {
    id: 4,
    name: "Aura Condominiums",
    category: "Residential",
    image: "/project_villa.png",
    description:
      "High-rise residential complex focusing on communal green spaces.",
  },
  {
    id: 5,
    name: "Apex Logistics",
    category: "Industrial",
    image: "/project_tower.png",
    description: "Automated logistics hub designed for maximum throughput.",
  },
  {
    id: 6,
    name: "Harbor Front",
    category: "Commercial",
    image: "/project_bridge.png",
    description: "Mixed-use development revitalizing the waterfront district.",
  },
];

const ProjectsComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="w-full text-center md:text-left">
            <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-light leading-[1] tracking-[-0.03em] uppercase text-[#d1d1d1]">
              Excellence In{" "}
              <span className="font-bold text-white italic">Execution.</span>
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
              className="group relative flex flex-col overflow-hidden rounded-[32px] bg-white/[0.03] border border-white/10 transition-all duration-500 hover:border-white/20 animate-in fade-in slide-in-from-bottom-8 duration-700"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="relative h-[240px] md:h-[520px] w-full overflow-hidden">
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

                {/* Corner Link Arrow */}
              </div>
            </div>
          ))}

          {/* See More CTA - Integrated into Grid for Mobile 2+1 Layout */}
          <div className="col-span-1 lg:col-span-3 flex items-center justify-center mt-4 md:mt-0">
            <button className="group relative w-full h-full min-h-[200px] md:min-h-0 md:h-auto md:w-auto px-6 md:px-12 py-5 overflow-hidden rounded-[32px] border border-white/10 flex flex-col items-center justify-center gap-4 bg-white/[0.02] hover:bg-white/[0.05] transition-all">
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
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </span>
              <span className="relative text-white text-[0.6rem] md:text-[0.7rem] font-bold uppercase tracking-[0.3em] text-center">
                Explore
                <br className="md:hidden" /> All Projects
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsComponent;
