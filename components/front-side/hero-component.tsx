"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./hero.module.css";
import {
  Settings,
  ArrowDownRight,
  Recycle,
  Search,
  ShoppingCart,
  Menu,
  X,
  ChevronRight,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Our Story", href: "#story" },
  { name: "Our Services", href: "#services" },
  { name: "Active Sites", href: "#sites" },
  { name: "Featured Projects", href: "#projects" },
  { name: "Client Benefits", href: "#benefits" },
  { name: "Contact Us", href: "#contact" },
];

const HeroComponent = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

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
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] flex items-center justify-center p-6 md:hidden"
          >
            {/* Backdrop Blur */}
            <motion.div
              initial={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0)" }}
              animate={{ backdropFilter: "blur(30px)", backgroundColor: "rgba(11,13,16,0.95)" }}
              exit={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0)" }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0"
            />

            {/* Menu Content Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-[85vh] bg-white/[0.03] border border-white/10 rounded-[40px] shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Menu Header */}
              <div className="p-8 flex items-center justify-between border-b border-white/5 shrink-0">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="MGD GROUP" className="h-8 w-auto" />
                  <span className="text-white font-black text-sm tracking-tight">MGD GROUP</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 hover:bg-orange-600 hover:text-white transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 px-8 py-10 overflow-y-auto no-scrollbar">
                <div className="flex flex-col gap-8">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => setIsMenuOpen(false)}
                      className="group flex items-center justify-between"
                    >
                      <div className="flex flex-col">
                        <span className="text-[0.6rem] font-black text-orange-500 uppercase tracking-[0.4em] mb-1">
                          0{i + 1}
                        </span>
                        <span className="text-3xl font-bold text-white uppercase tracking-tighter group-hover:text-orange-500 transition-colors">
                          {link.name}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:border-orange-500 group-hover:text-orange-500 transition-all">
                        <ChevronRight size={18} />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Menu Footer */}
              <div className="p-8 bg-white/[0.02] border-t border-white/5 flex flex-col gap-6">
                <div className="flex justify-center gap-8">
                  <a href="#" className="text-white/20 hover:text-white transition-colors"><Instagram size={20} /></a>
                  <a href="#" className="text-white/20 hover:text-white transition-colors"><Facebook size={20} /></a>
                  <a href="#" className="text-white/20 hover:text-white transition-colors"><Linkedin size={20} /></a>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-[0.55rem] font-bold text-white/10 uppercase tracking-[0.4em]">Powered by MGD Excellence</p>
                  <p className="text-[0.5rem] font-bold text-white/5 uppercase tracking-[0.2em]">© 2024 MGD GROUP PVT LTD</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

          <button onClick={() => setIsMenuOpen(true)} className={styles.mobileMenuBtn}>
            <Menu className="w-6 h-6 text-white cursor-pointer" />
          </button>
        </div>

        {/* TOP NAV */}
        <div className={styles.navArea}>
          <div className="flex gap-8 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {link.name}
              </a>
            ))}
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
