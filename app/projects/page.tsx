"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Categories for filtering
const categories = [
  "All",
  "Residential",
  "Commercial",
  "Infrastructure",
  "Industrial",
];

// Extended Simulated Database with Variations
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
        description: "Elegant 3-bedroom villa with high-quality finishes and basic smart home features."
      },
      {
        id: "v2",
        name: "4-Bedroom Premium",
        price: "$650,000",
        description: "Spacious 4-bedroom layout with premium Italian marble and advanced home automation."
      },
      {
        id: "v3",
        name: "Executive Penthouse Villa",
        price: "$1,200,000",
        description: "Ultimate luxury with a private rooftop infinity pool and panoramic city views."
      }
    ]
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
        description: "Modern shared office environment with high-speed internet and lounge access."
      },
      {
        id: "v2",
        name: "Private Executive Suite",
        price: "$8,000/mo",
        description: "Fully furnished private suite with dedicated reception and meeting rooms."
      }
    ]
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
    variations: [] // No variations
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
        description: "Compact and modern studio apartment perfect for young professionals."
      },
      {
        id: "v2",
        name: "Ocean Front Suite",
        price: "$350,000",
        description: "Premium 2-bedroom suite with direct views of the Indian Ocean."
      }
    ]
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
        description: "10,000 sq.ft. space with loading docks and basic climate control."
      },
      {
        id: "v2",
        name: "High-Tech Cold Storage",
        price: "$45,000/mo",
        description: "Automated cold storage facility with multi-zone temperature monitoring."
      }
    ]
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
        description: "Prime ground-floor retail space with large display windows and high foot traffic."
      },
      {
        id: "v2",
        name: "Waterfront Restaurant Shell",
        price: "$12,000/mo",
        description: "Spacious restaurant venue with outdoor seating capability and sunset views."
      }
    ]
  },
  {
    id: 7,
    name: "Zenith Plaza",
    category: "Commercial",
    image: "/project_tower.png",
    description:
      "A futuristic shopping mall with an integrated vertical forest.",
    location: "Negombo, SL",
    year: "2024",
    variations: [
      {
        id: "v1",
        name: "Level 1 Pop-up",
        price: "$2,000/wk",
        description: "Flexible short-term kiosk space in the main atrium."
      },
      {
        id: "v2",
        name: "Anchor Store Unit",
        price: "Contact for Price",
        description: "Flagship multi-level space for major international brands."
      }
    ]
  },
  {
    id: 8,
    name: "Green Valley Estate",
    category: "Residential",
    image: "/project_villa.png",
    description: "Eco-friendly residential township with solar-powered homes.",
    location: "Kurunegala, SL",
    year: "2023",
    variations: [
      {
        id: "v1",
        name: "Eco-Villa Type A",
        price: "$220,000",
        description: "Modern sustainable home with solar panels and rainwater harvesting."
      },
      {
        id: "v2",
        name: "Eco-Villa Type B (Plus)",
        price: "$290,000",
        description: "Larger footprint with integrated organic garden and EV charging station."
      }
    ]
  },
  {
    id: 9,
    name: "Southern Expressway",
    category: "Infrastructure",
    image: "/project_bridge.png",
    description:
      "Expansion project involving complex bridge structures and interchanges.",
    location: "Matara, SL",
    year: "2022",
    variations: []
  },
  {
    id: 10,
    name: "Iron Works Factory",
    category: "Industrial",
    image: "/project_tower.png",
    description:
      "Heavy industrial facility designed for high-efficiency steel production.",
    location: "Trincomalee, SL",
    year: "2024",
    variations: []
  },
  {
    id: 11,
    name: "The Pearl Residences",
    category: "Residential",
    image: "/project_villa.png",
    description: "Bespoke beachfront villas with panoramic ocean views.",
    location: "Bentota, SL",
    year: "2023",
    variations: [
      {
        id: "v1",
        name: "Beachside Villa",
        price: "$850,000",
        description: "3-bedroom villa just steps away from the sandy shores."
      },
      {
        id: "v2",
        name: "Royal Ocean Mansion",
        price: "$2,400,000",
        description: "Grand 6-bedroom estate with private beach access and butler service."
      }
    ]
  },
  {
    id: 12,
    name: "Lumina Tech Park",
    category: "Commercial",
    image: "/project_tower.png",
    description:
      "Innovative workspace for technology startups and global enterprises.",
    location: "Jaffna, SL",
    year: "2024",
    variations: [
      {
        id: "v1",
        name: "Start-up Desk",
        price: "$150/mo",
        description: "Flexible hot-desk in a vibrant tech-focused environment."
      },
      {
        id: "v2",
        name: "Custom R&D Lab",
        price: "Inquire",
        description: "Specialized lab space with high-load power and secure networking."
      }
    ]
  },
  {
    id: 13,
    name: "Central Rail Hub",
    category: "Infrastructure",
    image: "/project_bridge.png",
    description:
      "Modernization of the central railway station with high-speed links.",
    location: "Colombo, SL",
    year: "2023",
    variations: []
  },
  {
    id: 14,
    name: "Agro-Processing Unit",
    category: "Industrial",
    image: "/project_tower.png",
    description:
      "Cold storage and processing facility for agricultural exports.",
    location: "Dambulla, SL",
    year: "2024",
    variations: []
  },
  {
    id: 15,
    name: "Heritage Villas",
    category: "Residential",
    image: "/project_villa.png",
    description:
      "Restoration and expansion of colonial-era villas into boutique residences.",
    location: "Nuwara Eliya, SL",
    year: "2022",
    variations: [
      {
        id: "v1",
        name: "Colonial Suite",
        price: "$3,500/mo",
        description: "Historically restored suite with antique furnishings and garden views."
      }
    ]
  },
];

const ProjectShowcasePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setSelectedVariant(project.variations && project.variations.length > 0 ? project.variations[0] : null);
  };

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

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
      <div className="fixed bottom-0 right-0 w-[60vw] h-[60vh] bg-orange-600/5 rounded-full blur-[140px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Header Section */}
      <section className="relative z-10 pt-10 pb-12 px-6 md:px-[6vw]">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col gap-4 mb-12">
            <div className="flex items-center gap-4 text-orange-500 font-bold uppercase tracking-[0.3em] text-[0.6rem] md:text-[0.7rem]">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="w-4 h-px bg-white/20" />
              <span className="text-white/40">Our Projects</span>
            </div>
            <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-light leading-[0.9] tracking-[-0.04em] uppercase">
              Our <span className="font-bold italic text-white">Legacy</span> In{" "}
              <br />
              <span className="text-orange-600">Landmarks.</span>
            </h1>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 py-6 border-y border-white/10 backdrop-blur-sm sticky top-24 z-40 bg-[#0b0d10]/50 -mx-6 px-6 md:mx-0 md:px-0">
            {/* Search Input */}
            <div className="relative w-full lg:w-[400px] group">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-full py-4 px-12 text-sm focus:outline-none focus:border-orange-600/50 transition-all placeholder:text-white/20 group-hover:bg-white/[0.05]"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-orange-500 transition-colors"
                width="20"
                height="20"
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

            {/* Category Tabs */}
            <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 bg-white/[0.03] border border-white/10 rounded-full max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2.5 whitespace-nowrap uppercase tracking-[0.2em] text-[0.6rem] font-bold transition-all duration-300 rounded-full ${
                    selectedCategory === cat
                      ? "bg-orange-600 text-white shadow-[0_0_15px_rgba(234,88,12,0.3)]"
                      : "text-white/40 hover:text-white/80 hover:bg-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="relative z-10 px-6 md:px-[6vw] pb-32">
        <div className="max-w-[1800px] mx-auto">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
              {filteredProjects.map((project, idx) => (
                <div
                  key={project.id}
                  onClick={() => handleProjectClick(project)}
                  className="group relative flex flex-col overflow-hidden rounded-2xl md:rounded-3xl bg-white/[0.02] border border-white/5 transition-all duration-500 hover:border-white/20 animate-in fade-in slide-in-from-bottom-8 cursor-pointer"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1536px) 25vw, 20vw"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] via-[#0b0d10]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[0.5rem] font-bold uppercase tracking-widest text-orange-500">
                        {project.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-4 h-px bg-orange-500" />
                        <span className="text-[0.5rem] md:text-[0.6rem] font-medium text-white/50 uppercase tracking-tighter">
                          {project.location} • {project.year}
                        </span>
                      </div>
                      <h3 className="text-sm md:text-lg font-bold uppercase tracking-wide text-white mb-2 line-clamp-1">
                        {project.name}
                      </h3>
                      <p className="text-[0.65rem] md:text-xs text-white/40 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Action Icon */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 17l9.2-9.2M17 17V7H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-40 text-center">
              <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center mb-6">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white/20"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-white/60 mb-2">
                No projects found
              </h3>
              <p className="text-sm text-white/20">
                Try adjusting your search or category filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-8 text-orange-500 text-[0.6rem] font-bold uppercase tracking-[0.2em] hover:text-white transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

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
              initial={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0)" }}
              animate={{ backdropFilter: "blur(20px)", backgroundColor: "rgba(0,0,0,0.8)" }}
              exit={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0)" }}
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12"/>
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
                
                {/* Image Overlay Info */}
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="px-3 py-1 bg-orange-600 rounded-full text-[0.5rem] font-bold uppercase tracking-widest text-white shadow-lg">
                    {selectedProject.category}
                  </span>
                  <div className="mt-3 text-white/50 text-[0.6rem] font-bold uppercase tracking-tighter">
                    {selectedProject.location} • {selectedProject.year}
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
                    {/* Variations Selection */}
                    <div className="space-y-6">
                      {selectedProject.variations && selectedProject.variations.length > 0 ? (
                        <>
                          <div className="space-y-3">
                            <label className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/30">Select Project Tier</label>
                            <div className="relative group">
                              <select
                                value={selectedVariant?.id}
                                onChange={(e) => {
                                  const variant = selectedProject.variations.find((v: any) => v.id === e.target.value);
                                  setSelectedVariant(variant);
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-[0.8rem] appearance-none focus:outline-none focus:border-orange-600/50 transition-all text-white cursor-pointer group-hover:bg-white/[0.08]"
                              >
                                {selectedProject.variations.map((variant: any) => (
                                  <option key={variant.id} value={variant.id} className="bg-[#0b0d10] text-white">
                                    {variant.name}
                                  </option>
                                ))}
                              </select>
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="m6 9 6 6 6-6"/>
                                </svg>
                              </div>
                            </div>
                          </div>

                          <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-500">
                             <div className="flex items-center justify-between mb-2">
                                <span className="text-[0.6rem] font-bold uppercase tracking-widest text-orange-500">Investment</span>
                                <span className="text-xl font-bold text-white tracking-tighter">{selectedVariant?.price}</span>
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
                           <span className="text-[0.6rem] font-bold uppercase tracking-widest text-white/30 block mb-2">Project Pricing</span>
                           <span className="text-sm text-white/60 font-medium italic">Contact our team for a personalized quotation based on your specific requirements.</span>
                        </div>
                      )}
                    </div>

                    {/* Contact & Inquiries */}
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/30">Direct Inquiries</label>
                        <div className="flex flex-col gap-2">
                          <a href="tel:+94777142061" className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all group">
                             <div className="w-8 h-8 rounded-lg bg-orange-600/20 flex items-center justify-center text-orange-500">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                             </div>
                             <span className="text-xs font-bold text-white/80">+94 (77) 714 2061</span>
                          </a>
                          <a href="mailto:hello@mgdgroup.com" className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all group">
                             <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                             </div>
                             <span className="text-xs font-bold text-white/80">hello@mgdgroup.com</span>
                          </a>
                        </div>
                      </div>

                      {/* WhatsApp Button */}
                      <a 
                        href={`https://wa.me/94777142061?text=${encodeURIComponent(`මම ${selectedProject.name}${selectedVariant ? ` හි ${selectedVariant.name}` : ""} ගැන වැඩි විස්තර දැන ගැනීමට කැමතියි.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl shadow-lg shadow-green-600/20 transition-all group active:scale-[0.98]"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.049a11.815 11.815 0 001.591 5.95L0 24l6.15-1.613a11.785 11.785 0 005.894 1.57h.005c6.637 0 12.048-5.414 12.052-12.05a11.815 11.815 0 00-3.628-8.512z"/>
                        </svg>
                        <span className="text-[0.7rem] font-bold uppercase tracking-widest">Inquire via WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Decoration */}
      <div className="relative h-40 w-full overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-600/20 to-transparent" />
      </div>
    </main>
  );
};

export default ProjectShowcasePage;
