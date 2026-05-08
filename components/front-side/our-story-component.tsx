"use client";
import React from "react";

const projectPhotos = [
  {
    src: "/project_residential.png",
    label: "Residential",
    title: "Skyline Residences",
    year: "2022",
  },
  {
    src: "/project_commercial.png",
    label: "Commercial",
    title: "Commerce Tower",
    year: "2021",
  },
  {
    src: "/project_infrastructure.png",
    label: "Infrastructure",
    title: "Southern Bridge",
    year: "2020",
  },
  {
    src: "/project_interior.png",
    label: "Interiors",
    title: "Grand Hotel Lobby",
    year: "2023",
  },
  {
    src: "/project_road.png",
    label: "Highways",
    title: "Expressway Ph.2",
    year: "2019",
  },
];

const milestones = [
  { val: "1999", label: "Year Founded" },
  { val: "500+", label: "Projects Delivered" },
  { val: "2,400+", label: "Workforce" },
  { val: "12", label: "Awards Won" },
];

const OurStoryComponent = () => {
  /* ── Shared sub-blocks ──────────────────────────────────── */

  const FounderPhoto = ({ mobileMode = false }: { mobileMode?: boolean }) => (
    <div className="relative">
      <div
        className={`relative w-full overflow-hidden border border-white/10 group ${
          mobileMode
            ? "aspect-[3/2]"
            : "aspect-[4/3] max-[860px]:aspect-[16/7] max-[600px]:aspect-[4/3]"
        }`}
      >
        <img
          src="/founder.png"
          alt="MGD Group Founder"
          className="w-full h-full object-cover object-top transition-transform duration-[700ms] ease-in-out group-hover:scale-[1.04]"
          style={{ filter: "saturate(0.92) contrast(1.06)" }}
        />

        {/* Bottom-fade overlay — cinematic bleed into description on mobile */}
        <div
          className="absolute inset-0"
          style={{
            background: mobileMode
              ? "linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(0,0,0,0.55) 70%, rgba(11,13,16,0.98) 100%)"
              : "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
          }}
        />

        {/* Founder badge + name (sits above the overlay) */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 gap-[0.3rem] z-10">
          <div className="inline-flex self-start px-3 py-[0.3rem] rounded-full text-[0.55rem] font-bold tracking-[0.3em] uppercase text-white bg-[rgba(255,69,0,0.25)] border border-[rgba(255,69,0,0.5)] mb-[0.4rem]">
            Founder &amp; CEO
          </div>
          <div className="text-[clamp(1rem,1.5vw,1.4rem)] font-bold tracking-[0.06em] uppercase text-white">
            Mr. Mahesh G. De Silva
          </div>
          <div className="text-[0.65rem] tracking-[0.3em] uppercase text-white/55">
            Est. 1999
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#ff4500] pointer-events-none z-20" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#ff4500] pointer-events-none z-20" />
      </div>
    </div>
  );

  const ProjectGrid = ({
    limit = projectPhotos.length,
  }: {
    limit?: number;
  }) => {
    const photos = projectPhotos.slice(0, limit);
    // 4 photos → 2 rows of 2; 5 photos → keep original 3-col layout
    const isFour = limit === 4;
    return (
      <div
        className={`grid gap-2 ${
          isFour
            ? "grid-cols-2 grid-rows-[90px_90px]"
            : "grid-cols-3 grid-rows-[90px_90px]"
        }`}
      >
        {photos.map((photo, index) => (
          <div
            key={photo.title}
            className={`relative overflow-hidden cursor-pointer group ${
              !isFour && index === 0 ? "col-span-2" : ""
            }`}
          >
            <img
              src={photo.src}
              alt={photo.title}
              className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-[1.08]"
              style={{
                filter: "saturate(0.85) brightness(0.88)",
                transition: "transform 0.5s ease, filter 0.5s ease",
              }}
            />
            <div
              className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)",
              }}
            >
              <span className="text-[0.48rem] font-bold tracking-[0.35em] uppercase text-[#ff4500] mb-[0.2rem]">
                {photo.label}
              </span>
              <span className="text-[0.75rem] font-bold uppercase tracking-[0.08em] text-white leading-[1.2]">
                {photo.title}
              </span>
              <span className="text-[0.5rem] tracking-[0.25em] text-white/50 mt-[0.15rem]">
                {photo.year}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const StoryText = () => (
    <>
      {/* Body text */}
      <div className="flex flex-col gap-5">
        <p className="text-[0.95rem] leading-[1.85] text-white/65 tracking-[0.02em]">
          MGD Group Pvt Ltd was founded in 1999 by{" "}
          <strong className="text-white/90 font-bold">
            Mr. Mahesh Gunathilake De Silva
          </strong>
          , a visionary engineer who believed that quality construction could
          transform communities. Starting with a single residential project in
          Colombo, the company grew into one of Sri Lanka&apos;s most trusted
          construction conglomerates.
        </p>
        <p className="text-[0.95rem] leading-[1.85] text-white/65 tracking-[0.02em]">
          Over two and a half decades, we have delivered more than{" "}
          <strong className="text-white/90 font-bold">500+ projects</strong>{" "}
          spanning luxury residences, commercial towers, highways, bridges, and
          industrial parks — each built with unwavering commitment to precision,
          safety, and sustainability.
        </p>
        <p className="text-[0.95rem] leading-[1.85] text-white/65 tracking-[0.02em]">
          Our legacy is not just in the structures we raise, but in the lives we
          shape and the communities we strengthen — one foundation at a time.
        </p>
      </div>

      {/* Milestones */}
      <div className="grid grid-cols-2 border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm overflow-hidden">
        {milestones.map((m) => (
          <div
            key={m.label}
            className="flex flex-col items-start px-[1.4rem] py-[1.2rem] bg-white/[0.02] border-r border-b border-white/[0.06] transition-colors duration-300 hover:bg-[rgba(255,69,0,0.07)]"
          >
            <span className="text-[clamp(1.4rem,2vw,2rem)] font-bold text-[#ff4500] tracking-[0.04em] leading-none">
              {m.val}
            </span>
            <span className="text-[0.55rem] font-bold tracking-[0.3em] uppercase text-white/45 mt-[0.4rem]">
              {m.label}
            </span>
          </div>
        ))}
      </div>
    </>
  );

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <section
      id="our-story"
      className="relative w-full bg-[#0b0d10] text-white overflow-hidden py-24 pt-5 md:pt-20 pb-20"
      style={{ fontFamily: "Rajdhani, Sora, 'Segoe UI', sans-serif" }}
    >
      {/* ── Background decoration ─────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <div
          className="absolute -top-[10%] -right-[5%] w-[600px] h-[600px] rounded-full blur-[60px] animate-orbDrift"
          style={{
            background:
              "radial-gradient(circle, rgba(255,69,0,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-[10%] -left-[5%] w-[500px] h-[500px] rounded-full blur-[80px] animate-orbDriftReverse"
          style={{
            background:
              "radial-gradient(circle, rgba(63,125,255,0.10) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Inner container ───────────────────────────────────── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-16 max-[860px]:px-8 max-[600px]:px-5">
        <div className="flex items-center gap-6 mb-10">
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,69,0,0.6) 0%, rgba(255,255,255,0.1) 60%, transparent 100%)",
            }}
          />
        </div>

        {/* ════════════════════════════════════════════════════
            DESKTOP LAYOUT  (≥ 861px) — 2 columns side by side
            ════════════════════════════════════════════════════ */}
        <div className="hidden min-[861px]:grid grid-cols-2 gap-20 items-start">
          {/* LEFT — heading + text + milestones */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-[clamp(2.2rem,3.5vw,3.8rem)] font-light leading-[1.1] tracking-[-0.02em] uppercase text-[#d1d1d1]">
                Built On <br />
                <span className="font-bold text-[#ff4500]">25 Years</span>
                <br /> Of Grit &amp; Vision.
              </h2>
            </div>
            <StoryText />
          </div>

          {/* RIGHT — founder + project photos */}
          <div className="flex flex-col gap-6">
            <FounderPhoto />
            <ProjectGrid />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            MOBILE / TABLET LAYOUT  (≤ 860px) — single column
            Order: heading → CEO photo → description → sub-photos
            ════════════════════════════════════════════════════ */}
        <div className="flex flex-col min-[861px]:hidden">
          {/* 1. Heading */}
          <div className="mb-6">
            <h2 className="text-[clamp(1.9rem,7vw,3rem)] font-light leading-[1.1] tracking-[-0.02em] uppercase text-[#d1d1d1]">
              Built On <br />
              <span className="font-bold text-[#ff4500]">25 Years</span>
              <br /> Of Grit &amp; Vision.
            </h2>
          </div>

          {/* 2. CEO / Founder photo — full width, cinematic bottom fade */}
          {/*    negative bottom margin so description overlaps the black fade */}
          <div className="relative -mb-8 z-10">
            <FounderPhoto mobileMode />
          </div>

          {/* 3. Description block — starts inside the black fade of the photo */}
          <div
            className="relative z-20 flex flex-col gap-7 px-1 pt-10 pb-8"
            style={{
              background:
                "linear-gradient(to bottom, rgba(11,13,16,0.0) 0%, #0b0d10 12%)",
            }}
          >
            <StoryText />
          </div>

          {/* 4. Project photos */}
          <div>
            <p className="text-[0.6rem] font-bold tracking-[0.35em] uppercase text-[#ff4500] mb-3">
              Our Projects
            </p>
            <ProjectGrid limit={4} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStoryComponent;
