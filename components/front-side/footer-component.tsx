"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const FooterComponent = () => {
  const [currentYear, setCurrentYear] = React.useState(2024);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative w-full bg-[#08090b] pt-32 pb-12 overflow-hidden">
      {/* Top Highlight Border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[2px] bg-orange-500/20 blur-[4px]" />

      {/* Subtle Dot Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Background Decorative Elements */}
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full px-5 md:px-[6vw] lg:px-[8vw]">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          {/* Company Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="relative w-32 h-12">
              <Image
                src="/logo.png"
                alt="MGD Group Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-white/50 text-sm md:text-base font-light leading-relaxed max-w-sm">
              Crafting iconic skylines and infrastructure with a perfect blend
              of architectural vision and engineering precision. Redefining
              modern construction since 2010.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {["facebook", "twitter", "instagram", "linkedin"].map(
                (social) => (
                  <a
                    key={social}
                    href={`#${social}`}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] hover:bg-orange-500 hover:border-orange-500 transition-all duration-500 group"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="text-white group-hover:scale-110 transition-transform">
                      {/* Placeholder Icons - Replace with real SVGs if needed */}
                      <div className="w-4 h-4 bg-current rounded-sm opacity-80" />
                    </div>
                  </a>
                ),
              )}
            </div>
          </div>

          {/* Links Section (Expertise & Navigation) - Side by Side on Mobile */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8 lg:gap-0 lg:flex lg:flex-row">
            {/* Quick Links (Expertise) */}
            <div className="lg:w-1/2 flex flex-col gap-8">
              <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs">
                Expertise
              </h4>
              <nav className="flex flex-col gap-4">
                {[
                  "Architecture",
                  "Engineering",
                  "Infrastructure",
                  "Management",
                ].map((link) => (
                  <Link
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-white/40 hover:text-orange-500 text-sm transition-colors relative group w-fit"
                  >
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-orange-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Resources (Navigation) */}
            <div className="lg:w-1/2 flex flex-col gap-8">
              <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs">
                Navigation
              </h4>
              <nav className="flex flex-col gap-4">
                {["Our Story", "Projects", "Careers", "Privacy Policy"].map(
                  (link) => (
                    <Link
                      key={link}
                      href={`#${link.toLowerCase().replace(" ", "-")}`}
                      className="text-white/40 hover:text-orange-500 text-sm transition-colors relative group w-fit"
                    >
                      {link}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-orange-500 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  ),
                )}
              </nav>
            </div>
          </div>

          {/* Contact Us (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-8 bg-white/[0.02] border border-white/10 rounded-[32px] p-8 backdrop-blur-3xl">
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs">
              Contact Us
            </h4>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ea580c"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/80 font-bold text-sm">
                    +94 (11) 234 5678
                  </p>
                  <p className="text-white/30 text-xs mt-1">
                    Direct Support Line
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ea580c"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/80 font-bold text-sm">
                    hello@mgdgroup.com
                  </p>
                  <p className="text-white/30 text-xs mt-1">
                    General Inquiries
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ea580c"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/80 font-bold text-sm">
                    Colombo, Sri Lanka
                  </p>
                  <p className="text-white/30 text-xs mt-1">
                    123, Architectural Plaza
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white/30 text-[0.7rem] uppercase tracking-[0.2em] text-center">
            © {currentYear} MGD GROUP PRIVATE LIMITED. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-white/20 text-[0.6rem] uppercase tracking-widest">
                Powered by
              </span>
              <div className="relative group cursor-pointer">
                <a
                  href="https://inkavalley.com/"
                  className="text-white font-bold text-[0.75rem] tracking-tighter group-hover:text-orange-500 transition-colors"
                >
                  INKA VALLEY
                </a>
                <div className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-orange-500 to-transparent group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
