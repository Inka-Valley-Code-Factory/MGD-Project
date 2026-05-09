"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  X,
  Gift,
  ChevronRight,
  ChevronLeft,
  MessageSquare,
} from "lucide-react";

interface PromoItem {
  id: number;
  title: string;
  discount: string;
  description: string;
  image: string;
  code: string;
}

const promoData: PromoItem[] = [
  {
    id: 1,
    title: "Seasonal Villa Special",
    discount: "15% OFF",
    description:
      "Get a premium discount on all residential luxury villa designs for the upcoming season.",
    image: "/site_2.png",
    code: "MGDVILLA15",
  },
  {
    id: 2,
    title: "Commercial Excellence",
    discount: "10% OFF",
    description:
      "Special engineering consultancy rates for large-scale commercial skyscrapers in Colombo.",
    image: "/site_1.png",
    code: "MGDCOMM10",
  },
  {
    id: 3,
    title: "Smart Home Integration",
    discount: "FREE UPGRADE",
    description:
      "Complimentary smart-home automation system with any design & build contract.",
    image: "/site_3.png",
    code: "MGDSMART",
  },
];

const PromotionalDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const nextPromo = () =>
    setActiveIndex((prev) => (prev + 1) % promoData.length);
  const prevPromo = () =>
    setActiveIndex((prev) => (prev - 1 + promoData.length) % promoData.length);

  return (
    <>
      {/* Sticky Trigger Tab */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed right-0 top-[70%] md:top-1/3 z-[99999] flex items-center transition-all duration-500 ${
          isOpen
            ? "opacity-0 pointer-events-none translate-x-10"
            : "opacity-100 translate-x-0"
        }`}
      >
        <div className="relative h-40 w-10 md:w-12 bg-orange-600 rounded-l-2xl flex flex-col items-center justify-center gap-4 shadow-[0_0_30px_rgba(234,88,12,0.4)] border-l border-y border-white/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
          <Gift className="text-white w-5 h-5 animate-bounce" />
          <div className="flex flex-col items-center justify-center gap-1">
            {"OFFERS".split("").map((char, i) => (
              <span
                key={i}
                className="text-[0.6rem] font-black text-white leading-none tracking-tighter"
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      </button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-[400px] z-[10001] bg-[#0b0d10]/80 backdrop-blur-[40px] border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col"
          >
            {/* Header */}
            <div className="p-8 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-600/20 flex items-center justify-center text-orange-500">
                  <Gift size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">
                    MGD Elite
                  </h3>
                  <p className="text-[0.6rem] font-bold text-white/30 uppercase tracking-widest">
                    Exclusive Offers
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-orange-600 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Promo Carousel Content */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-center gap-10">
              <div className="relative aspect-[3/4] w-full rounded-[32px] overflow-hidden group border border-white/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 50, scale: 1.1 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={promoData[activeIndex].image}
                      alt={promoData[activeIndex].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] via-[#0b0d10]/40 to-transparent" />

                    {/* Discount Badge */}
                    <div className="absolute top-6 left-6 px-4 py-2 bg-orange-600 rounded-xl shadow-lg border border-white/20">
                      <span className="text-sm font-black text-white italic">
                        {promoData[activeIndex].discount}
                      </span>
                    </div>

                    {/* Text Content Overlay */}
                    <div className="absolute bottom-10 left-8 right-8 space-y-4">
                      <h4 className="text-2xl font-bold text-white uppercase tracking-tight leading-none">
                        {promoData[activeIndex].title}
                      </h4>
                      <p className="text-sm text-white/60 leading-relaxed font-light">
                        {promoData[activeIndex].description}
                      </p>

                      <div className="pt-4 flex flex-col gap-3">
                        <div className="flex items-center justify-between px-5 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                          <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/30">
                            Use Code
                          </span>
                          <span className="text-xs font-black text-orange-500 tracking-widest">
                            {promoData[activeIndex].code}
                          </span>
                        </div>

                        <a
                          href={`https://wa.me/94771234567?text=${encodeURIComponent(`මම ${promoData[activeIndex].title} (Code: ${promoData[activeIndex].code}) ගැන වැඩි විස්තර දැන ගැනීමට කැමතියි.`)}`}
                          target="_blank"
                          className="w-full py-4 bg-white text-black text-[0.65rem] font-black uppercase tracking-[0.3em] rounded-2xl flex items-center justify-center gap-3 hover:bg-orange-600 hover:text-white transition-all duration-300"
                        >
                          <MessageSquare size={16} />
                          Claim This Offer
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-10">
                  <button
                    onClick={prevPromo}
                    className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-black/40 transition-all pointer-events-auto"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextPromo}
                    className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-black/40 transition-all pointer-events-auto"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-3">
                {promoData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      activeIndex === idx
                        ? "w-10 bg-orange-600"
                        : "w-3 bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Footer Notice */}
            <div className="p-8 border-t border-white/5 text-center">
              <p className="text-[0.5rem] font-bold text-white/20 uppercase tracking-[0.2em] leading-relaxed">
                * Terms and conditions apply. Offers are valid for a limited
                time only. Contact our consultants for detailed project
                estimations.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PromotionalDrawer;
