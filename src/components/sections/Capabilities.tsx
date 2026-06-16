"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Service = {
  no: string;
  title: string;
  desc: string;
  deliverables: string[];
  color: string;
  span: string;
  icon: "spark" | "grid" | "wave" | "loop";
};

const services: Service[] = [
  {
    no: "01",
    title: "Brand & Identity",
    desc: "Strategy, naming, visual systems & motion-led identities for ambitious products.",
    deliverables: ["Strategy", "Identity", "Guidelines", "Launch"],
    color: "var(--accent)",
    span: "md:col-span-7 md:row-span-2",
    icon: "spark",
  },
  {
    no: "02",
    title: "Product Design",
    desc: "End-to-end product surfaces from positioning to UI to design systems built to scale.",
    deliverables: ["Research", "UX & UI", "Systems"],
    color: "var(--accent-pink)",
    span: "md:col-span-5",
    icon: "grid",
  },
  {
    no: "03",
    title: "Design Engineering",
    desc: "Next.js, GSAP, WebGL & Lenis. Editorial sites and product UIs built with motion in mind.",
    deliverables: ["Front-end", "Motion", "WebGL"],
    color: "var(--accent-blue)",
    span: "md:col-span-5",
    icon: "wave",
  },
  {
    no: "04",
    title: "Art Direction",
    desc: "Photography, type, layout and the invisible 20% — the polish most teams ship without.",
    deliverables: ["Direction", "Type", "Editorial", "Polish"],
    color: "var(--accent-plum)",
    span: "md:col-span-7",
    icon: "loop",
  },
];

export default function Capabilities() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-cap]", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 78%",
        },
      });

      const drawn = root.current!.querySelectorAll<SVGPathElement | SVGCircleElement>("[data-icon-draw]");
      drawn.forEach((el) => {
        const len = (el as SVGPathElement).getTotalLength?.() ?? 200;
        el.style.strokeDasharray = String(len);
        el.style.strokeDashoffset = String(len);
        gsap.to(el, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="capabilities"
      className="relative border-t border-line px-6 py-32 md:px-10 md:py-48"
    >
      <header className="mb-16 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between">
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted md:text-xs">
          <span className="inline-block h-px w-10 bg-fg-muted" />
          Capabilities — 04
        </div>
        <h2 className="max-w-3xl font-display text-[clamp(2rem,5.5vw,4.5rem)] leading-[0.95] tracking-[-0.02em]">
          Four disciplines, one studio.{" "}
          <span className="italic text-sweep">Picked carefully, shipped together.</span>
        </h2>
      </header>

      <div className="grid grid-cols-12 gap-6 auto-rows-[minmax(0,auto)] md:auto-rows-[260px]">
        {services.map((s) => (
          <article
            key={s.no}
            data-cap
            data-cursor="more"
            className={`card-lift group relative col-span-12 flex flex-col justify-between overflow-hidden rounded-3xl border border-line bg-bg-elev p-6 md:p-8 ${s.span}`}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
              style={{ background: s.color }}
            />
            <div className="relative flex items-start justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-fg-muted">
                {s.no} / Discipline
              </span>
              <Icon name={s.icon} color={s.color} />
            </div>

            <div className="relative mt-10 md:mt-0">
              <h3
                className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-tight tracking-[-0.02em]"
                style={{ color: s.color }}
              >
                {s.title}
              </h3>
              <p className="mt-3 max-w-md text-base text-fg/85">{s.desc}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.deliverables.map((d) => (
                  <li
                    key={d}
                    className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/80 transition-colors duration-500 group-hover:border-fg/40"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Icon({ name, color }: { name: Service["icon"]; color: string }) {
  if (name === "spark") {
    return (
      <svg viewBox="0 0 60 60" className="h-14 w-14" fill="none" stroke={color} strokeWidth="1.5">
        <path data-icon-draw d="M30 4 L34 26 L56 30 L34 34 L30 56 L26 34 L4 30 L26 26 Z" />
      </svg>
    );
  }
  if (name === "grid") {
    return (
      <svg viewBox="0 0 60 60" className="h-14 w-14" fill="none" stroke={color} strokeWidth="1.5">
        <path data-icon-draw d="M6 6 H54 V54 H6 Z M6 22 H54 M6 38 H54 M22 6 V54 M38 6 V54" />
      </svg>
    );
  }
  if (name === "wave") {
    return (
      <svg viewBox="0 0 60 60" className="h-14 w-14" fill="none" stroke={color} strokeWidth="1.5">
        <path data-icon-draw d="M4 30 Q 18 4, 30 30 T 56 30" />
        <path data-icon-draw d="M4 42 Q 18 16, 30 42 T 56 42" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 60 60" className="h-14 w-14" fill="none" stroke={color} strokeWidth="1.5">
      <circle data-icon-draw cx="30" cy="30" r="24" />
      <circle data-icon-draw cx="30" cy="30" r="12" />
      <circle cx="30" cy="6" r="2.5" fill={color} stroke="none" />
    </svg>
  );
}
