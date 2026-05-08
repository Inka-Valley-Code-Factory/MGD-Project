"use client";
import React from "react";
import Image from "next/image";

const reviews = [
  {
    id: 1,
    name: "James Anderson",
    role: "Senior Architect",
    image: "/reviewer_1_1778263342704.png",
    rating: 5,
    text: "Working with MGD has been a revelation. Their attention to structural detail and digital precision is unmatched in the industry.",
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    role: "Real Estate Developer",
    image: "/reviewer_2_1778263357388.png",
    rating: 5,
    text: "The Liquid Glass aesthetic they've brought to our latest project has set a new standard for luxury developments in the region.",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Civil Engineer",
    image: "/reviewer_3_1778263377890.png",
    rating: 5,
    text: "Beyond aesthetics, the engineering integrity MGD maintains is flawless. A partner you can trust with complex infrastructure.",
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    role: "Interior Designer",
    image: "/reviewer_4_1778263394395.png",
    rating: 4,
    text: "Innovative, responsive, and incredibly talented. They transformed our vision into a digital masterpiece that breathes life.",
  },
  {
    id: 5,
    name: "David Miller",
    role: "Project Manager",
    image: "/reviewer_1_1778263342704.png",
    rating: 5,
    text: "Exceptional service and communication. The final delivery exceeded all expectations. Highly recommended for any scale.",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={i < rating ? "#ea580c" : "rgba(255,255,255,0.1)"}
          className="transition-colors duration-300"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
};

const ReviewCard = ({ review }: { review: (typeof reviews)[0] }) => {
  const [isTruncated, setIsTruncated] = React.useState(false);
  const textRef = React.useRef<HTMLParagraphElement>(null);

  React.useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        setIsTruncated(
          textRef.current.scrollHeight > textRef.current.clientHeight
        );
      }
    };

    checkTruncation();
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, []);

  return (
    <div className="flex-shrink-0 w-[280px] md:w-[400px] bg-white/[0.02] border border-white/10 rounded-[32px] p-6 md:p-8 backdrop-blur-3xl hover:bg-white/[0.05] hover:border-orange-500/30 transition-all duration-700 group cursor-default">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-orange-500/50 transition-colors duration-700">
          <Image
            src={review.image}
            alt={review.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div>
          <h4 className="text-white text-sm md:text-base font-bold tracking-tight">
            {review.name}
          </h4>
          <p className="text-white/40 text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.2em] font-medium">
            {review.role}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <StarRating rating={review.rating} />
      </div>

      <div className="relative">
        <p
          ref={textRef}
          className="text-white/60 text-xs md:text-base font-light leading-relaxed italic whitespace-normal line-clamp-4"
        >
          &ldquo;{review.text}&rdquo;
        </p>
        {isTruncated && (
          <button className="mt-4 flex items-center gap-2 text-orange-500 group/btn hover:text-white transition-colors duration-300">
            <span className="text-[0.6rem] md:text-[0.65rem] font-bold uppercase tracking-[0.3em]">
              Read More
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="transition-transform group-hover/btn:translate-x-1"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

const ReviewsComponent = () => {
  return (
    <section className="relative w-full bg-[#0b0d10] py-24 md:py-32 overflow-hidden border-t border-white/5">
      {/* Cinematic Background Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-orange-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-0"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      <div className="relative z-10 w-full px-5 md:px-[6vw] lg:px-[8vw] mb-20 text-center">
        <div className="inline-flex items-center gap-4 mb-6 opacity-60">
          <div className="w-8 h-px bg-orange-500" />
          <span className="text-[0.6rem] font-bold tracking-[0.6em] uppercase text-white">Client Voices</span>
          <div className="w-8 h-px bg-orange-500" />
        </div>
        <h2 className="text-[clamp(2.5rem,4vw,4rem)] font-light leading-[0.95] tracking-[-0.04em] uppercase text-[#d1d1d1]">
          Industry <span className="font-bold text-white italic">Recognition.</span>
        </h2>
      </div>

      <div className="relative flex flex-col gap-8 md:gap-12 w-full">
        {/* Track 1: Moving Right */}
        <div className="flex overflow-hidden group">
          <div className="flex animate-marquee-slow gap-8 md:gap-12 items-center">
            {[...reviews, ...reviews].map((review, i) => (
              <ReviewCard key={`track1-${i}`} review={review} />
            ))}
          </div>
          <div className="flex animate-marquee-slow gap-8 md:gap-12 items-center pl-8 md:pl-12">
            {[...reviews, ...reviews].map((review, i) => (
              <ReviewCard key={`track1-dup-${i}`} review={review} />
            ))}
          </div>
        </div>

        {/* Track 2: Moving Left */}
        <div className="flex overflow-hidden group">
          <div className="flex animate-marquee-reverse-slow gap-8 md:gap-12 items-center">
            {[...reviews, ...reviews].map((review, i) => (
              <ReviewCard key={`track2-${i}`} review={review} />
            ))}
          </div>
          <div className="flex animate-marquee-reverse-slow gap-8 md:gap-12 items-center pl-8 md:pl-12">
            {[...reviews, ...reviews].map((review, i) => (
              <ReviewCard key={`track2-dup-${i}`} review={review} />
            ))}
          </div>
        </div>
      </div>

      {/* Side Masks for Depth */}
      <div className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-[#0b0d10] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-[#0b0d10] to-transparent z-20 pointer-events-none" />
    </section>
  );
};

export default ReviewsComponent;
