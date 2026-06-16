"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    no: "01",
    title: "Discover",
    body: "A short, intense kickoff. Stakeholders, constraints, ambition, and what the work has to do.",
  },
  {
    no: "02",
    title: "Define",
    body: "Positioning, narrative, structure — written before the design begins, so every pixel has a job.",
  },
  {
    no: "03",
    title: "Design",
    body: "Type, color, layout, motion — built as a system, refined obsessively until nothing feels accidental.",
  },
  {
    no: "04",
    title: "Build",
    body: "Hand-coded in Next.js. Performance, accessibility, and motion treated as design — not afterthoughts.",
  },
  {
    no: "05",
    title: "Ship",
    body: "Final polish — the invisible 20% that separates fine from extraordinary — then launch and iterate.",
  },
];

export default function Process() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-process-step]", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
        },
      });

      const stickyMq = window.matchMedia("(min-width: 768px)");
      if (stickyMq.matches) {
        ScrollTrigger.create({
          trigger: "[data-process-sticky]",
          start: "top 20%",
          endTrigger: root.current,
          end: "bottom 80%",
          pin: "[data-process-pin]",
          pinSpacing: false,
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="process"
      className="relative border-t border-line px-6 py-32 md:px-10 md:py-48"
    >
      <div className="grid grid-cols-12 gap-x-6">
        <div data-process-sticky className="col-span-12 md:col-span-5">
          <div data-process-pin className="md:sticky md:top-32">
            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted md:text-xs">
              <span className="inline-block h-px w-10 bg-fg-muted" />
              Process
            </div>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.02em]">
              How the work{" "}
              <span className="italic text-accent">actually</span> gets made.
            </h2>
            <p className="mt-6 max-w-sm text-base text-fg/80">
              Five phases. No deck-driven theatre. Each step ends in something
              tangible — usually shipped, sometimes argued over, always
              opinionated.
            </p>
          </div>
        </div>

        <ol className="col-span-12 mt-16 md:col-span-7 md:mt-0">
          {steps.map((s) => (
            <li
              key={s.no}
              data-process-step
              className="grid grid-cols-12 gap-x-6 border-t border-line py-10 first:border-t-0 first:pt-0"
            >
              <div className="col-span-2 font-mono text-xs uppercase tracking-[0.25em] text-fg-muted">
                {s.no}
              </div>
              <div className="col-span-10">
                <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight tracking-[-0.02em]">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-lg text-base text-fg/85">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
