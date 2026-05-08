"use client";
import React, { useEffect, useRef } from "react";
import styles from "./hero.module.css";
import {
  Settings,
  ArrowDownRight,
  Recycle,
  Search,
  ShoppingCart,
  Menu,
} from "lucide-react";

const HeroComponent = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    let rafId: number | null = null;
    let pausedByTouch = false;
    let lastTick = 0;
    // Slide every 3.2 s, animate over ~500 ms
    const SLIDE_INTERVAL_MS = 3200;
    const ANIM_DURATION_MS = 500;

    // Smoothly scroll `container.scrollLeft` to `target` over `duration` ms
    // using rAF — works reliably on iOS Safari & Android Chrome.
    const animateScroll = (target: number, duration: number, onDone?: () => void) => {
      const start = container.scrollLeft;
      const delta = target - start;
      if (delta === 0) { onDone?.(); return; }
      let startTime: number | null = null;

      const step = (now: number) => {
        if (pausedByTouch) { onDone?.(); return; }
        if (startTime === null) startTime = now;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // ease-in-out cubic
        const eased =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        container.scrollLeft = start + delta * eased;
        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          onDone?.();
        }
      };

      rafId = requestAnimationFrame(step);
    };

    const scheduleNext = () => {
      lastTick = window.setTimeout(() => {
        if (pausedByTouch) { scheduleNext(); return; }
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        if (!isMobile) return; // stop if resized to desktop

        const maxScroll = container.scrollWidth - container.clientWidth;
        if (maxScroll <= 0) { scheduleNext(); return; }

        const nextLeft =
          container.scrollLeft + container.clientWidth >= maxScroll - 4
            ? 0
            : container.scrollLeft + container.clientWidth;

        animateScroll(nextLeft, ANIM_DURATION_MS, scheduleNext);
      }, SLIDE_INTERVAL_MS);
    };

    const isMobileOnMount = window.matchMedia("(max-width: 768px)").matches;
    if (isMobileOnMount) scheduleNext();

    const handleTouchStart = () => { pausedByTouch = true; };
    const handleTouchEnd = () => {
      pausedByTouch = false;
    };

    const handleResize = () => {
      // If we've grown past mobile, cancel outstanding timers
      if (!window.matchMedia("(max-width: 768px)").matches) {
        clearTimeout(lastTick);
        if (rafId) cancelAnimationFrame(rafId);
      }
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(lastTick);
      if (rafId) cancelAnimationFrame(rafId);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className={styles.heroContainer}>
      {/* Background Image */}
      <div className={styles.bgImage}></div>

      {/* Cinematic overlays */}
      <div className={styles.ambientGlow}></div>
      <div className={styles.lightBeams}></div>
      <div className={styles.grain}></div>
      <div className={styles.vignette}></div>

      {/* Thin structural grid lines */}
      <div className={styles.gridOverlay}>
        <div className={styles.lineVertical}></div>
        <div className={styles.lineHorizontal}></div>
        <div className={styles.crosshairCenter}></div>
      </div>

      {/* Main Content Grid */}
      <div className={styles.contentGrid}>
        {/* LOGO AREA (Top Left) */}
        <div className={styles.logoArea}>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="MGD GROUP" className="h-10 w-auto" />
            <div className="flex flex-col justify-center">
              <span className="text-white font-black text-lg lg:text-lg leading-none tracking-tight">
                MGD GROUP
              </span>
              <span className="text-[#ffffff] mt-2 text-[9px] font-bold leading-none tracking-[0.3em] uppercase">
                Pvt Ltd
              </span>
            </div>
          </div>

          <div className={styles.mobileMenuBtn}>
            <Menu className="w-6 h-6 text-white cursor-pointer" />
          </div>
        </div>

        {/* TOP NAV */}
        <div className={styles.navArea}>
          <div className="flex gap-8 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
            <span className="text-white cursor-pointer hover:text-[#ff4500] transition-colors">
              Our Story
            </span>
            <span className="cursor-pointer hover:text-white transition-colors">
              Our Services
            </span>
            <span className="cursor-pointer hover:text-white transition-colors">
              Active Sites
            </span>
            <span className="cursor-pointer hover:text-white transition-colors">
              Featured Projects
            </span>
            <span className="cursor-pointer hover:text-white transition-colors">
              Client Benefits
            </span>
            <span className="cursor-pointer hover:text-white transition-colors">
              Contact Us
            </span>
          </div>
        </div>

        {/* LEFT SIDEBAR */}
        <div className={`${styles.leftSidebar}`}>
          <div className="flex flex-col h-full py-4 ">
            <div className="space-y-20 flex-1 flex flex-col justify-center">
              <div>
                <span className="text-[10px] font-bold text-[#ff4500] tracking-[0.4em] uppercase block mb-3">
                  01 / Build
                </span>
                <h3 className="text-base lg:text-lg font-bold uppercase tracking-widest leading-tight text-white border-l-2 border-[#ff4500] pl-4">
                  Precision
                  <br />
                  In Every
                  <br />
                  Detail.
                </h3>
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#ff4500] tracking-[0.4em] uppercase block mb-3">
                  02 / Vision
                </span>
                <h3 className="text-base lg:text-lg font-bold uppercase tracking-widest leading-tight text-white border-l-2 border-[#ff4500] pl-4">
                  Excellence
                  <br />
                  In Every
                  <br />
                  Project.
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN TITLE */}
        <div className={styles.titleArea}>
          <h1 className={styles.mainTitle}>
            <span className="mb-5 block">WELCOME TO</span>
            <strong className="mb-5 block text-4xl md:text-6xl lg:text-6xl">
              MGD GROUP
            </strong>
            <span className="mb-5 block">PVT LTD</span>
          </h1>

          <div className={styles.quickStats}>
            <div>
              <span className={styles.statValue}>25+ yrs</span>
              <span className={styles.statLabel}>On-ground delivery</span>
            </div>
            <div>
              <span className={styles.statValue}>140+ sites</span>
              <span className={styles.statLabel}>Active across regions</span>
            </div>
            <div>
              <span className={styles.statValue}>ISO 9001</span>
              <span className={styles.statLabel}>Quality systems</span>
            </div>
          </div>

          {/* MOBILE ONLY TICKER (Between title and button) */}
          <div className={`md:hidden ${styles.mobileTicker}`}>
            <div className={styles.mobileTickerInner}>
              <div>
                <span className="text-[10px] font-bold text-[#ff4500] tracking-[0.4em] uppercase block mb-3">
                  01 / Build
                </span>
                <h3 className="text-sm font-bold uppercase tracking-widest leading-tight text-white border-l-2 border-[#ff4500] pl-4">
                  Precision In Every Detail.
                </h3>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#ff4500] tracking-[0.4em] uppercase block mb-3">
                  02 / Vision
                </span>
                <h3 className="text-sm font-bold uppercase tracking-widest leading-tight text-white border-l-2 border-[#ff4500] pl-4">
                  Excellence In Every Project.
                </h3>
              </div>
            </div>
          </div>

          <div className={styles.ctaRow}>
            <button className={`${styles.btnPrimary} rounded-xl `}>
              Explore Us
            </button>
          </div>
        </div>

        {/* TOP RIGHT INFO */}
        <div className={styles.rightTopInfo}>
          <div className={styles.pointerLine}>
            <div className={styles.pointerDot}></div>
            <div className={styles.pointerLineH}></div>
            <div className={styles.pointerLineV}></div>
          </div>
        </div>

        {/* BOTTOM CAROUSEL WRAPPER */}
        <div className={styles.bottomCardsWrapper} ref={carouselRef}>
          {/* BOTTOM LEFT WIDGET (Image + Text) (Card 1) */}
          <div className={styles.bottomProject}>
            <div className={styles.projectImgWrapper}></div>
            <div className={styles.projectInfo}>
              <div>
                <p className="text-[#ff4500] text-[10px] font-bold tracking-widest mb-2 uppercase">
                  New Series
                </p>
                <h3 className="text-xl font-light uppercase tracking-widest text-gray-200 leading-tight">
                  Skyline
                  <br />
                  Tower
                </h3>
              </div>
              <div className="bg-white text-black w-8 h-8 flex items-center justify-center mt-6 cursor-pointer hover:bg-gray-200 transition-colors">
                <ArrowDownRight className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* BOTTOM STATS WIDGET (Card 2 - Middle) */}
          <div className={styles.bottomStats}>
            <div className={styles.excellenceBadge}>15+ Years</div>
            <span className={styles.excellenceNumber}>15+</span>
            <h2 className={styles.excellenceTitle}>Excellence</h2>
            <div className={styles.excellenceLine}></div>
            <p className={styles.excellenceCopy}>
              Precision-led engineering with on-site rigor, safety compliance,
              and premium finishing.
            </p>
          </div>

          {/* BOTTOM MIDDLE WIDGET (Card 3) */}
          <div className={styles.bottomMaterials}>
            <h2 className="text-2xl font-light uppercase tracking-widest leading-tight text-white">
              We Use
              <br />
              Recycled
              <br />
              Materials
            </h2>
            <div className="flex justify-between items-end">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300 leading-relaxed">
                CO2 Emission
                <br />
                Reduction
              </p>
              <Recycle className="w-5 h-5 text-gray-300" />
            </div>
          </div>

          {/* BOTTOM RIGHT TEXTURE (Card 4) */}
          <div className={styles.bottomTexture}>
            <div className={styles.bottomTextureContent}>
              <p className="text-white text-sm font-bold tracking-widest uppercase mb-2">
                Start Your
                <br />
                Project
              </p>
              <ArrowDownRight
                className="w-6 h-6 text-white ml-auto"
                style={{ transform: "rotate(-90deg)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
