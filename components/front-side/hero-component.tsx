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

    let intervalId: NodeJS.Timeout;

    const startCarousel = () => {
      if (window.innerWidth <= 768) {
        intervalId = setInterval(() => {
          if (!container) return;
          const maxScrollLeft = container.scrollWidth - container.clientWidth;
          
          if (container.scrollLeft >= maxScrollLeft - 10) {
            container.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            container.scrollBy({ left: container.clientWidth, behavior: "smooth" });
          }
        }, 3000);
      }
    };

    startCarousel();

    const handleResize = () => {
      clearInterval(intervalId);
      startCarousel();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className={styles.heroContainer}>
      {/* Background Image */}
      <div className={styles.bgImage}></div>

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
              <span className="text-white font-black text-lg leading-none tracking-tight">
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
            <strong className="mb-5 block">MGD GROUP</strong>
            <span className="mb-5 block">PVT LTD</span>
          </h1>
          <button className={styles.btnPrimary}>Open catalog</button>
        </div>

        {/* TOP RIGHT INFO */}
        <div className={styles.rightTopInfo}>
          <div className={styles.pointerLine}>
            <div className={styles.pointerDot}></div>
            <div className={styles.pointerLineH}></div>
            <div className={styles.pointerLineV}></div>
          </div>
          <div className="lg:ml-12 mt-4 space-y-6">
            <div>
              <span className="text-[10px] font-bold text-[#ff4500] tracking-[0.4em] uppercase block mb-2">Technical Specs</span>
              <h4 className="text-sm font-medium uppercase tracking-widest leading-relaxed text-white">
                Advanced
                <br />
                Steel Beams
              </h4>
            </div>
            <p className="text-[10px] text-gray-400 leading-relaxed max-w-[200px] uppercase tracking-wider">
              Grade A structural steel with anti-corrosive coating for maximum durability in harsh environments.
            </p>
            <div className="pt-4">
              <div className="text-[10px] font-bold border-b border-[#ff4500] inline-block pb-1 cursor-pointer hover:text-[#ff4500] transition-colors uppercase tracking-widest">
                See Technical Details
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM CAROUSEL WRAPPER */}
        <div className={styles.bottomCardsWrapper} ref={carouselRef}>
          {/* BOTTOM STATS WIDGET (Card 1) */}
        <div className={styles.bottomStats}>
          <h2 className="text-4xl font-light text-[#ff4500] mb-2">150+</h2>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300">
            Projects
            <br />
            Completed
          </p>
        </div>

        {/* BOTTOM LEFT WIDGET (Image + Text) (Card 2) */}
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
