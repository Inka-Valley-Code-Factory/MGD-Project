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
  Building,
  MessageCircle,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Our Story", href: "#story" },
  { name: "Our Services", href: "#services" },
  { name: "Featured Projects", href: "#projects" },
  { name: "Active Sites", href: "#sites" },
  { name: "Client Benefits", href: "#benefits" },
  { name: "Contact Us", href: "#contact" },
];

const HeroComponent = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeIndexRef = useRef(0);
  const [currentBg, setCurrentBg] = useState(0);
  const [prevBg, setPrevBg] = useState<number | null>(null);
  const bgImages = ["/IMG01.JPG", "/IMG02.JPG", "/IMG03.JPG"];
  const quotes = [
    {
      title: "Precision Engineering",
      text: "CRAFTING SPACES WHERE ARCHITECTURAL BRILLIANCE MEETS RIGOROUS ENGINEERING.",
    },
    {
      title: "Visionary Design",
      text: "BRILLIANT BY DESIGN. WHERE CREATIVE VISION MEETS TECHNICAL MASTERY.",
    },
    {
      title: "Legacy of Trust",
      text: "BUILT ON TRUST. UPHOLDING A LEGACY OF RELIABILITY IN EVERY FOUNDATION.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevBg(currentBg);
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 8000); // 8 seconds per slide

    return () => clearInterval(interval);
  }, [currentBg]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      document.documentElement.style.setProperty('--mouse-x', x.toString());
      document.documentElement.style.setProperty('--mouse-y', y.toString());
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

    let timer: number | null = null;
    let pausedByTouch = false;
    const SLIDE_INTERVAL_MS = 3500;

    const scheduleNext = () => {
      timer = window.setTimeout(() => {
        if (pausedByTouch) {
          scheduleNext();
          return;
        }

        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        if (!isMobile) return;

        const cards = container.children;
        if (cards.length === 0) return;

        // Deterministic increment
        activeIndexRef.current = (activeIndexRef.current + 1) % cards.length;

        const targetCard = cards[activeIndexRef.current] as HTMLElement;
        if (targetCard) {
          const targetLeft =
            targetCard.offsetLeft -
            (container.clientWidth - targetCard.offsetWidth) / 2;

          container.scrollTo({
            left: targetLeft,
            behavior: "smooth",
          });
        }

        scheduleNext();
      }, SLIDE_INTERVAL_MS);
    };

    const isMobileOnMount = window.matchMedia("(max-width: 768px)").matches;
    if (isMobileOnMount) scheduleNext();

    const handleTouchStart = () => {
      pausedByTouch = true;
    };
    const handleTouchEnd = () => {
      pausedByTouch = false;
    };

    const handleResize = () => {
      if (!window.matchMedia("(max-width: 768px)").matches) {
        if (timer) clearTimeout(timer);
      }
    };

    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      if (timer) clearTimeout(timer);
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
              initial={{
                backdropFilter: "blur(0px)",
                backgroundColor: "rgba(0,0,0,0)",
              }}
              animate={{
                backdropFilter: "blur(30px)",
                backgroundColor: "rgba(11,13,16,0.95)",
              }}
              exit={{
                backdropFilter: "blur(0px)",
                backgroundColor: "rgba(0,0,0,0)",
              }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0"
            />{" "}
            {/* Liquid Glass Dropdown Menu */}
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full h-[65vh] bg-white/[0.05] backdrop-blur-3xl border-b border-white/10 rounded-b-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden"
            >
              {/* Subtle Liquid Glow Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/10 blur-[80px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[80px] rounded-full" />
              </div>

              {/* Menu Header */}
              <div className="px-8 py-6 flex items-center justify-between border-b border-white/5 shrink-0 relative z-10">
                <div className="flex items-center gap-3">
                  <img
                    src="/logo2.jpg"
                    alt="MGD GROUP"
                    className="h-8 w-auto rounded-lg"
                  />
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm tracking-tight">
                      MGD GROUP
                    </span>
                    <span className="text-[10px] font-medium text-orange-500 uppercase tracking-widest leading-none">
                      Excellence
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 transition-all border border-white/5"
                >
                  <X size={22} />
                </button>
              </div>

              {/* User-Friendly Navigation Links */}
              <div className="flex-1 px-6 py-6 overflow-y-auto no-scrollbar relative z-10">
                <div className="grid grid-cols-1 gap-3">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 group hover:bg-white/[0.08] hover:border-white/10 transition-all active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-600 opacity-0 group-hover:opacity-100 transition-all" />
                        <span className="text-base font-semibold text-white/90 tracking-wide">
                          {link.name}
                        </span>
                      </div>
                      <ChevronRight
                        size={18}
                        className="text-white/20 group-hover:text-orange-500 transition-colors"
                      />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Simplified Footer */}
              <div className="px-8 py-5 bg-white/[0.02] border-t border-white/5 flex items-center justify-between relative z-10">
                <div className="flex gap-6">
                  <a
                    href="#"
                    className="text-white/30 hover:text-white transition-colors"
                  >
                    <MessageCircle size={18} />
                  </a>
                  <a
                    href="#"
                    className="text-white/30 hover:text-white transition-colors"
                  >
                    <Facebook size={18} />
                  </a>
                  <a
                    href="#"
                    className="text-white/30 hover:text-white transition-colors"
                  >
                    <Mail size={18} />
                  </a>
                </div>
                <span className="text-[10px] font-medium text-white/15 uppercase tracking-[0.3em]">
                  Est. 2012
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Cinematic Carousel */}
      <div className={styles.bgImage}>
        {bgImages.map((src, index) => (
          <div
            key={src}
            className={`${styles.bgLayer} ${
              index === currentBg ? styles.bgLayerActive : 
              index === prevBg ? styles.bgLayerExit : ""
            }`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>

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
            <img src="/logo2.jpg" alt="MGD GROUP" className="h-10 w-auto" />
            <div className="flex flex-col justify-center">
              <span className="text-white font-black text-lg lg:text-lg leading-none tracking-tight">
                MGD GROUP
              </span>
              <span className="text-[#ffffff] mt-2 text-[9px] font-bold leading-none tracking-[0.3em] uppercase">
                Pvt Ltd
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsMenuOpen(true)}
            className={styles.mobileMenuBtn}
          >
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
                  Build
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
                  Vision
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
              <span className={styles.statValue}>15+ yrs</span>
              <span className={styles.statLabel}>On-ground delivery</span>
            </div>
            <div>
              <span className={styles.statValue}>20+ sites</span>
              <span className={styles.statLabel}>Active across regions</span>
            </div>
            <div>
              <span className={styles.statValue}>Excellence Driven</span>
              <span className={styles.statLabel}>Construction Works</span>
            </div>
          </div>

          {/* MOBILE ONLY TICKER (Between title and button) */}
          <div className={`md:hidden ${styles.mobileTicker}`}>
            <div className={styles.mobileTickerInner}>
              <div>
                <span className="text-[10px] font-bold text-[#ff4500] tracking-[0.4em] uppercase block mb-3">
                  Build
                </span>
                <h3 className="text-sm font-bold uppercase tracking-widest leading-tight text-white border-l-2 border-[#ff4500] pl-4">
                  Precision In Every Detail.
                </h3>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#ff4500] tracking-[0.4em] uppercase block mb-3">
                  Vision
                </span>
                <h3 className="text-sm font-bold uppercase tracking-widest leading-tight text-white border-l-2 border-[#ff4500] pl-4">
                  Excellence In Every Project.
                </h3>
              </div>
            </div>
          </div>

          <div className={`${styles.ctaRow} flex items-center gap-6 mt-8`}>
            <button className={`${styles.btnPrimary} rounded-xl !mt-0`}>
              Explore Us
            </button>
            
            {/* Cinematic Progress Indicators */}
            <div className={styles.progressContainer}>
              {bgImages.map((_, idx) => (
                <div 
                  key={idx}
                  className={`${styles.progressBar} ${
                    idx === currentBg ? styles.progressBarActive : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* TOP RIGHT INFO / QUOTE AREA */}
        <div className={styles.rightTopInfo}>
          <div className={styles.quoteArea}>
            {quotes.map((quote, index) => (
              <div
                key={index}
                className={`${styles.quoteWrapper} ${
                  index === currentBg ? styles.quoteActive : 
                  index === prevBg ? styles.quoteExit : ""
                }`}
              >
                <span className={styles.quoteTitle}>{quote.title}</span>
                <p className={styles.quoteText}>{quote.text}</p>
                <div className={styles.quoteLine}></div>
              </div>
            ))}
          </div>

          <div className={styles.pointerLine}>
            <div className={styles.pointerDot}></div>
            <div className={styles.pointerLineH}></div>
            <div className={styles.pointerLineV}></div>
          </div>
        </div>

        {/* BOTTOM CAROUSEL WRAPPER */}
        <div className={styles.bottomCardsWrapper} ref={carouselRef}>
          {/* BOTTOM LEFT WIDGET (Image + Text) (Card 1) */}
          <motion.div
            className={styles.bottomProject}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className={styles.projectImgWrapper}></div>
            <div className={styles.projectInfo}>
              <div>
                <p className="text-[#ff4500] text-[10px] font-bold tracking-[0.3em] mb-2 uppercase opacity-90">
                  Engineering
                </p>
                <h3 className="text-xl font-light uppercase tracking-widest text-gray-200 leading-tight">
                  Building
                  <br />
                  <span className="font-bold italic text-white/90">
                    Beyond Boundaries
                  </span>
                </h3>
              </div>
              <div className="bg-white/10 backdrop-blur-md text-white w-9 h-9 rounded-xl border border-white/20 flex items-center justify-center mt-6 cursor-pointer hover:bg-[#ff4500] hover:border-[#ff4500] transition-all duration-300">
                <ArrowDownRight className="w-5 h-5" />
              </div>
            </div>
          </motion.div>

          {/* BOTTOM STATS WIDGET (Card 2 - Middle) */}
          <motion.div
            className={styles.bottomStats}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className={styles.excellenceBadge}>15+ Years</div>
            <span className={styles.excellenceNumber}>15+</span>
            <h2 className={styles.excellenceTitle}>Excellence</h2>
            <div className={styles.excellenceLine}></div>
            <p className={styles.excellenceCopy}>
              Precision-led engineering with on-site rigor, safety compliance,
              and premium finishing.
            </p>
          </motion.div>

          {/* BOTTOM MIDDLE WIDGET (Card 3) */}
          <motion.div
            className={styles.bottomMaterials}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div>
              <p className="text-[#ff4500] text-[10px] font-bold tracking-[0.3em] mb-3 uppercase opacity-90">
                Commitment
              </p>
              <h2 className="text-2xl font-light uppercase tracking-widest leading-tight text-white">
                Your Project,
                <br />
                <span className="font-bold italic text-white/90">
                  Our Promise
                </span>
              </h2>
            </div>
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40 leading-relaxed">
                  Crafted With Care
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff4500]/80 leading-relaxed">
                  Built For Trust
                </p>
              </div>
              <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                <Building className="w-5 h-5 text-white/60" />
              </div>
            </div>
          </motion.div>

          {/* BOTTOM RIGHT TEXTURE (Card 4) */}
          <motion.div
            className={styles.bottomTexture}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className={styles.bottomTextureContent}>
              <p className="text-white text-sm font-bold tracking-widest uppercase mb-2">
                Turning Ideas Into
                <br />
                Structures
              </p>
              <ArrowDownRight
                className="w-6 h-6 text-white ml-auto"
                style={{ transform: "rotate(-90deg)" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
