"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "@/lib/split-text";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const lines = root.current!.querySelectorAll<HTMLElement>("[data-about-line]");
      lines.forEach((line) => SplitText.split(line));

      gsap.from("[data-about-line] .word", {
        yPercent: 110,
        duration: 1.2,
        stagger: 0.02,
        ease: "expo.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
        },
      });

      gsap.from("[data-about-meta] > *", {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-about-meta]",
          start: "top 85%",
        },
      });

      gsap.from("[data-about-portrait]", {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.6,
        ease: "expo.out",
        scrollTrigger: {
          trigger: "[data-about-portrait]",
          start: "top 85%",
        },
      });
      gsap.to("[data-about-portrait] img", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-about-portrait]",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="about"
      className="relative px-6 py-32 md:px-10 md:py-48"
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-16">
        <div className="col-span-12 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted md:col-span-3 md:text-xs">
          <span className="inline-block h-px w-10 bg-fg-muted" />
          About
        </div>

        <div className="col-span-12 md:col-span-9">
          <p className="max-w-4xl font-display text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.1] tracking-[-0.02em] text-fg">
            <span data-about-line className="block overflow-hidden">
              I&apos;m a designer &amp; developer working at the seam between
            </span>
            <span data-about-line className="block overflow-hidden">
              <span className="italic text-accent">brand</span>, product &amp;{" "}
              <span className="italic text-accent">motion</span> — independent
            </span>
            <span data-about-line className="block overflow-hidden">
              by choice, opinionated by default, and obsessed with the
            </span>
            <span data-about-line className="block overflow-hidden">
              last <span className="italic">5%</span> of polish most teams ship without.
            </span>
          </p>
        </div>

        <div
          data-about-portrait
          className="img-hover col-span-12 aspect-[4/5] md:col-span-5 md:col-start-2"
        >
          <img
            src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1400&q=80"
            alt="Portrait"
            className="h-full w-full object-cover grayscale"
          />
        </div>

        <div
          data-about-meta
          className="col-span-12 flex flex-col gap-12 md:col-span-5 md:col-start-8 md:justify-end"
        >
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted">
              Now
            </div>
            <p className="mt-2 text-lg text-fg/85">
              Building a generative gradient tool, taking on one client engagement
              per quarter, and writing a small essay series on motion craft.
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted">
              Previously
            </div>
            <ul className="mt-3 space-y-2 text-base text-fg/85">
              <li className="flex justify-between gap-6 border-b border-line pb-2">
                <span>Lead designer — Northwind</span>
                <span className="text-fg-muted">&apos;23—&apos;24</span>
              </li>
              <li className="flex justify-between gap-6 border-b border-line pb-2">
                <span>Design engineer — Halo Finance</span>
                <span className="text-fg-muted">&apos;22—&apos;23</span>
              </li>
              <li className="flex justify-between gap-6 border-b border-line pb-2">
                <span>Independent studio</span>
                <span className="text-fg-muted">&apos;24—</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            {["Awwwards SOTD ×3", "FWA ×2", "CSS Design Awards"].map((a) => (
              <span
                key={a}
                className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/80"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
