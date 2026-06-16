"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const slides = [
  {
    label: "Editorial layouts",
    color: "var(--accent)",
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=2000&q=80",
  },
  {
    label: "Motion systems",
    color: "var(--accent-pink)",
    image:
      "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=2000&q=80",
  },
  {
    label: "WebGL surfaces",
    color: "var(--accent-blue)",
    image:
      "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=2000&q=80",
  },
  {
    label: "Type as architecture",
    color: "var(--accent-mint)",
    image:
      "https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&w=2000&q=80",
  },
  {
    label: "Brand systems",
    color: "var(--accent-plum)",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b8?auto=format&fit=crop&w=2000&q=80",
  },
];

export default function Showcase() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current || !track.current) return;
    const ctx = gsap.context(() => {
      const mq = window.matchMedia("(min-width: 768px)");
      if (!mq.matches) return;

      const trackEl = track.current!;
      const getDistance = () => trackEl.scrollWidth - window.innerWidth;

      gsap.to(trackEl, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.to("[data-show-img]", {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden border-t border-line bg-bg"
    >
      <div className="flex items-end justify-between border-b border-line px-6 py-8 md:px-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted md:text-xs">
          <span className="inline-flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-fg-muted" />
            Surfaces — pinned scroll
          </span>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted md:text-xs">
          ⟶ Scroll horizontally
        </div>
      </div>

      <div className="relative h-[80vh] min-h-[600px] md:overflow-hidden">
        <div
          ref={track}
          className="flex h-full w-full gap-6 px-6 py-8 md:w-max md:flex-nowrap md:px-10"
        >
          {slides.map((s, i) => (
            <article
              key={s.label}
              className="relative flex h-full w-[78vw] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-line bg-bg-elev p-6 md:w-[55vw] md:p-10 lg:w-[42vw]"
            >
              <div
                aria-hidden
                className="img-hover absolute inset-0"
              >
                <img
                  data-show-img
                  src={s.image}
                  alt=""
                  className="h-full w-full object-cover opacity-40"
                />
                <div
                  className="absolute inset-0 mix-blend-multiply"
                  style={{ background: s.color, opacity: 0.55 }}
                />
              </div>
              <div className="relative flex items-start justify-between text-fg">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
                  {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </span>
                <span
                  className="rounded-full border border-fg/30 bg-bg/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur"
                  style={{ color: s.color }}
                >
                  Surface
                </span>
              </div>
              <h3 className="relative font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em] text-fg">
                {s.label}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
