"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const paths = root.current!.querySelectorAll<SVGPathElement>("[data-draw]");
      paths.forEach((p) => {
        const len = p.getTotalLength();
        p.style.setProperty("--len", String(len));
        p.style.strokeDasharray = String(len);
        p.style.strokeDashoffset = String(len);

        gsap.to(p, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: p,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 1,
          },
        });
      });

      gsap.from("[data-manifesto-word]", {
        opacity: 0.1,
        y: 0,
        stagger: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-manifesto-text]",
          start: "top 80%",
          end: "bottom 40%",
          scrub: 1,
        },
      });

      gsap.to("[data-orbit]", {
        rotate: 360,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const manifestoText =
    "Restraint over noise. Motion with intent. Type as architecture. Color as language. Every pixel earns its place — every interaction settles, never snaps. Built slowly, shipped fast.";
  const words = manifestoText.split(/(\s+)/);

  return (
    <section
      ref={root}
      id="manifesto"
      className="relative overflow-hidden border-t border-line bg-bg px-6 py-32 md:px-10 md:py-48"
    >
      <div className="dotted-bg pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative grid grid-cols-12 gap-x-6">
        <div className="col-span-12 mb-16 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted md:text-xs">
          <span className="inline-block h-px w-10 bg-fg-muted" />
          Manifesto — what I believe
        </div>

        <div className="col-span-12 md:col-span-2">
          <svg
            data-orbit
            viewBox="0 0 120 120"
            className="h-24 w-24 text-accent-blue"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <circle cx="60" cy="60" r="58" />
            <circle cx="60" cy="60" r="40" stroke="var(--accent-pink)" />
            <circle cx="60" cy="60" r="22" stroke="var(--accent)" />
            <circle cx="60" cy="2" r="4" fill="var(--accent)" stroke="none" />
            <circle cx="100" cy="60" r="3" fill="var(--accent-pink)" stroke="none" />
            <circle cx="60" cy="82" r="2.5" fill="var(--accent-blue)" stroke="none" />
          </svg>
        </div>

        <p
          data-manifesto-text
          className="col-span-12 font-display text-[clamp(1.75rem,4.2vw,3.75rem)] leading-[1.1] tracking-[-0.02em] md:col-span-10"
        >
          {words.map((w, i) =>
            /^\s+$/.test(w) ? (
              w
            ) : (
              <span
                key={i}
                data-manifesto-word
                className="inline-block"
              >
                {w}
              </span>
            ),
          )}
        </p>

        <div className="col-span-12 mt-20 md:col-span-10 md:col-start-3">
          <svg
            viewBox="0 0 800 200"
            className="h-32 w-full md:h-48"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              data-draw
              d="M20 150 C 120 20, 220 20, 320 150 S 520 280, 620 150 S 780 20, 780 150"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              data-draw
              d="M20 120 Q 200 0, 400 120 T 780 120"
              stroke="var(--accent-pink)"
              strokeWidth="1.5"
            />
            <path
              data-draw
              d="M20 170 L 200 80 L 380 170 L 560 80 L 780 170"
              stroke="var(--accent-blue)"
              strokeWidth="1.5"
            />
          </svg>
          <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted">
            <span>FIG 01 — Motion curves</span>
            <span>expo · power · elastic</span>
          </div>
        </div>
      </div>
    </section>
  );
}
