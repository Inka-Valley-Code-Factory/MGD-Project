"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full bg-[#0b0d10] flex flex-col items-center justify-center overflow-hidden font-sans">
      {/* Blueprint Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ 
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px' 
        }}
      />

      {/* Cinematic Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Animated 404 Number */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <h1 className="text-[clamp(8rem,20vw,15rem)] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/5 uppercase select-none">
            404
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-xl mt-8"
        >
          <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-[0.3em] mb-4">
            Structure Not Found
          </h2>
          <p className="text-white/40 text-sm md:text-base font-light leading-relaxed mb-12">
            The blueprint you are looking for has been misplaced, or the structure was never part of the original design. Let&apos;s get you back to solid ground.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link 
            href="/"
            className="group relative px-10 py-5 overflow-hidden rounded-full bg-white flex items-center gap-3 transition-all duration-500 hover:pr-14"
          >
            <span className="relative z-10 text-black text-[0.7rem] font-bold uppercase tracking-[0.2em]">
              Return to Foundation
            </span>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="black" 
              strokeWidth="2.5"
              className="relative z-10 transition-transform duration-500 group-hover:translate-x-2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </Link>
        </motion.div>
      </div>


      
      {/* Footer-like Credit (Optional for 404) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-20">
        <div className="w-8 h-px bg-white/50" />
        <span className="text-[0.6rem] font-bold uppercase tracking-[0.5em] text-white">MGD GROUP</span>
        <div className="w-8 h-px bg-white/50" />
      </div>
    </main>
  );
}
