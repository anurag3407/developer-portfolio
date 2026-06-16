"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const items = [
  { label: "Brand Systems", color: "var(--accent)" },
  { label: "Product Design", color: "var(--accent-pink)" },
  { label: "Motion", color: "var(--accent-blue)" },
  { label: "WebGL", color: "var(--accent-mint)" },
  { label: "Editorial", color: "var(--accent-amber)" },
  { label: "Design Engineering", color: "var(--accent-plum)" },
  { label: "Identity", color: "var(--accent)" },
  { label: "Interaction", color: "var(--accent-pink)" },
];

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to("[data-marquee-track]", {
        xPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const Divider = () => (
    <svg
      viewBox="0 0 60 60"
      className="inline-block h-12 w-12 shrink-0 animate-spin-slow text-fg/40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M30 4 L34 26 L56 30 L34 34 L30 56 L26 34 L4 30 L26 26 Z" />
    </svg>
  );

  const row = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((it, i) => (
        <span key={`${it.label}-${i}`} className="inline-flex items-center gap-10">
          <span
            className="font-display text-[clamp(3rem,9vw,8rem)] italic leading-none tracking-[-0.02em]"
            style={{ color: it.color }}
          >
            {it.label}
          </span>
          <Divider />
        </span>
      ))}
    </div>
  );

  return (
    <section
      ref={ref}
      aria-hidden
      className="relative overflow-hidden border-y border-line bg-bg py-10"
    >
      <div data-marquee-track className="flex w-max animate-marquee will-change-transform">
        {row}
        {row}
      </div>
    </section>
  );
}
