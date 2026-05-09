"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

/* ─── Service data ──────────────────────────────────────────── */
const services = [
  {
    id: "residential",
    tag: "01",
    label: "Residential",
    title: "Luxury Homes & Residences",
    desc: "From bespoke villas to high-rise apartment complexes — we design and build living spaces that redefine comfort, precision, and lasting value.",
    img: "/project_residential.png",
    imgPosition: "center 30%",
    accent: "rgba(255,99,0,0.9)",
    glassAccent: "rgba(255,99,0,0.18)",
    gradient: {
      from: "rgba(255, 99, 0, 0.35)",
      to: "rgba(18, 21, 26, 0.95)",
    },
    size: "large",
  },
  {
    id: "commercial",
    tag: "02",
    label: "Commercial",
    title: "Towers & Corporate Spaces",
    desc: "World-class commercial towers, retail parks, and corporate campuses built for scale, efficiency, and architectural impact.",
    img: "/service_commercial.png",
    imgPosition: "center center",
    accent: "rgba(99,179,255,0.9)",
    glassAccent: "rgba(99,179,255,0.15)",
    gradient: {
      from: "rgba(99, 179, 255, 0.35)",
      to: "rgba(15, 18, 24, 0.95)",
    },
    size: "medium",
  },
  {
    id: "infrastructure",
    tag: "03",
    label: "Infrastructure",
    title: "Roads, Bridges & Highways",
    desc: "Shaping Sri Lanka's transport backbone with precision-engineered highways, bridges, and civil infrastructure that connects communities.",
    img: "/project_road.png",
    imgPosition: "center 40%",
    accent: "rgba(167,243,208,0.9)",
    glassAccent: "rgba(167,243,208,0.14)",
    gradient: {
      from: "rgba(167, 243, 208, 0.32)",
      to: "rgba(12, 16, 20, 0.95)",
    },
    size: "medium",
  },
  {
    id: "interior",
    tag: "04",
    label: "Interiors",
    title: "Fitout & Interior Design",
    desc: "Premium interior fitouts — from hotel lobbies to corporate offices — that balance aesthetics, function, and brand identity.",
    img: "/project_interior.png",
    imgPosition: "center 20%",
    accent: "rgba(251,191,36,0.9)",
    glassAccent: "rgba(251,191,36,0.15)",
    gradient: {
      from: "rgba(251, 191, 36, 0.35)",
      to: "rgba(16, 18, 22, 0.95)",
    },
    size: "medium",
  },
  {
    id: "management",
    tag: "05",
    label: "Project Management",
    title: "End-to-End Delivery",
    desc: "Full lifecycle project management — feasibility, planning, procurement, and on-site execution — with zero compromise on quality or schedule.",
    img: "/service_management.png",
    imgPosition: "center center",
    accent: "rgba(192,132,252,0.9)",
    glassAccent: "rgba(192,132,252,0.15)",
    gradient: {
      from: "rgba(192, 132, 252, 0.35)",
      to: "rgba(17, 19, 24, 0.95)",
    },
    size: "medium",
  },
  {
    id: "sustainable",
    tag: "06",
    label: "Sustainable Build",
    title: "Green Engineering",
    desc: "ISO-certified green construction practices — recycled materials, reduced carbon footprint, and energy-efficient structural design for a better tomorrow.",
    img: "/service_sustainable.png",
    imgPosition: "center 35%",
    accent: "rgba(74,222,128,0.9)",
    glassAccent: "rgba(74,222,128,0.15)",
    gradient: {
      from: "rgba(74, 222, 128, 0.35)",
      to: "rgba(14, 18, 20, 0.95)",
    },
    size: "large",
  },
] as const;

type Service = (typeof services)[number];

const CardInner = ({ svc, isActive }: { svc: Service; isActive?: boolean }) => (
  <>
    <div className="relative w-full overflow-hidden flex-shrink-0 h-[55%] md:h-[180px] lg:h-[200px]">
      <Image
        src={svc.img}
        alt={svc.title}
        fill
        sizes="(max-width: 768px) 100vw, 480px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        style={{
          objectPosition: svc.imgPosition,
          filter: "saturate(0.82) brightness(0.78) contrast(1.05)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0b0d10]" />
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"}`}
        style={{
          background: `radial-gradient(ellipse 80% 80% at 50% 0%, ${svc.glassAccent} 0%, transparent 70%)`,
        }}
      />
      <div className="absolute top-4 left-4 z-10">
        <span
          className="inline-flex items-center px-3 py-[0.32rem] rounded-full text-[0.48rem] font-bold tracking-[0.32em] uppercase border"
          style={{
            color: svc.accent,
            borderColor: svc.accent.replace("0.9)", "0.35)"),
            background: "rgba(11,13,16,0.55)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          {svc.tag} / {svc.label}
        </span>
      </div>
    </div>
    <div className="flex flex-col flex-1 px-6 pt-5 pb-6 gap-3">
      <h3 className="text-[clamp(1.05rem,1.4vw,1.35rem)] font-bold uppercase tracking-[0.05em] leading-[1.2] text-white">
        {svc.title}
      </h3>
      <p className="text-[0.8rem] leading-[1.78] text-white/50 tracking-[0.01em] flex-1">
        {svc.desc}
      </p>
    </div>
  </>
);

const glassStyle: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.10)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.12), 0 16px 48px rgba(0,0,0,0.5)",
  background:
    "linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 60%, rgba(255,255,255,0.05) 100%)",
  backdropFilter: "blur(24px) saturate(1.5)",
  WebkitBackdropFilter: "blur(24px) saturate(1.5)",
};

const MobileServiceCarousel = ({ cards }: { cards: readonly Service[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const observerOptions = {
      root: el,
      threshold: 0.6, // Trigger when 60% of the card is visible
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

  return (
    <div className="md:hidden relative mb-12">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-5 px-5 pb-4"
      >
        {cards.map((svc, i) => (
          <div
            key={svc.id}
            data-index={i}
            className="flex-shrink-0 w-[80vw] max-w-[300px] h-[440px] snap-start rounded-[30px] overflow-hidden transition-all duration-500 ease-out border border-white/10"
            style={{
              background: `linear-gradient(145deg, ${svc.gradient.from}, ${svc.gradient.to})`,
              opacity: 1,
              transform: "scale(1)",
            }}
          >
            <CardInner svc={svc} isActive={activeIndex === i} />
          </div>
        ))}
      </div>

      {/* Dynamic Indicators */}
      <div className="flex justify-center items-center gap-3 mt-6">
        {cards.map((svc, i) => (
          <button
            key={svc.id}
            onClick={() => {
              const el = scrollRef.current;
              if (el) {
                const cardWidth = (el.firstElementChild as HTMLElement)
                  .offsetWidth;
                el.scrollTo({ left: i * (cardWidth + 20), behavior: "smooth" });
              }
            }}
            className="relative h-1.5 transition-all duration-500 ease-in-out rounded-full overflow-hidden"
            style={{
              width: activeIndex === i ? "40px" : "12px",
              backgroundColor:
                activeIndex === i ? svc.accent : "rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </div>

      {/* Swipe Hint */}
      {activeIndex === 0 && (
        <div className="flex justify-center items-center gap-2 mt-4 opacity-40 animate-pulse">
          <span className="text-[0.6rem] uppercase tracking-widest font-bold">
            Swipe
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
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

const OurServicesComponent = () => {
  return (
    <section
      id="our-services"
      className="relative w-full bg-[#0b0d10] text-white pt-14 pb-16 md:py-24 overflow-x-hidden"
      style={{ fontFamily: "Rajdhani, Sora, 'Segoe UI', sans-serif" }}
    >
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <div
          className="absolute -top-[8%] -left-[6%] w-[700px] h-[700px] rounded-full blur-[90px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,69,0,0.13) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <div className="relative z-10 w-full px-5 md:px-[6vw] lg:px-[8vw]">
        <div className="mb-16 w-full sticky top-0 z-20 bg-[#0b0d10]/92 backdrop-blur-md md:static md:z-auto md:bg-transparent md:backdrop-blur-0">
          <h2 className="text-[clamp(2.2rem,3.8vw,4rem)] font-light leading-[1.08] tracking-[-0.02em] uppercase text-[#d1d1d1] mb-5">
            Built For Every <span className="font-bold text-white">Scale.</span>
            <br />
            Engineered For{" "}
            <span className="font-bold text-[#ff4500]">Every Challenge.</span>
          </h2>
          <p className="text-[0.95rem] leading-[1.8] text-white/55 max-w-[560px]">
            From a single residence to a large scale infrastructure projects -
            MGD Group brings 15+ years of precision engineering across every
            discipline.
          </p>
        </div>

        {/* MOBILE CAROUSEL */}
        <MobileServiceCarousel cards={services} />

        {/* DESKTOP GRID */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((svc) => (
            <div
              key={svc.id}
              className={`group relative flex flex-col overflow-hidden rounded-[26px] cursor-pointer ${svc.size === "large" ? "md:col-span-2" : "col-span-1"}`}
              style={glassStyle}
            >
              <CardInner svc={svc} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServicesComponent;
