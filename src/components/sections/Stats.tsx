"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: 86, suffix: "", label: "Projects shipped", color: "var(--accent)", bar: 86 },
  { value: 32, suffix: "", label: "Happy clients", color: "var(--accent-pink)", bar: 64 },
  { value: 9, suffix: "", label: "Industry awards", color: "var(--accent-blue)", bar: 45 },
  { value: 1.2, suffix: "s", label: "Avg LCP", color: "var(--accent-mint)", bar: 95, decimals: 1 },
];

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const counters = root.current!.querySelectorAll<HTMLElement>("[data-counter]");
      counters.forEach((el) => {
        const target = Number(el.dataset.target || "0");
        const decimals = Number(el.dataset.decimals || "0");
        const suffix = el.dataset.suffix || "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2.2,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = obj.v.toFixed(decimals) + suffix;
          },
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });
      });

      gsap.from("[data-stat]", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
        },
      });

      const bars = root.current!.querySelectorAll<HTMLElement>("[data-bar]");
      bars.forEach((b) => {
        const w = b.dataset.width || "0";
        gsap.fromTo(
          b,
          { width: "0%" },
          {
            width: `${w}%`,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: b,
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative border-y border-line bg-bg px-6 py-24 md:px-10 md:py-32"
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-12 md:gap-y-0">
        {stats.map((s, i) => (
          <div
            key={s.label}
            data-stat
            className="col-span-6 md:col-span-3"
          >
            <div className="flex items-end gap-1">
              <span
                data-counter
                data-target={s.value}
                data-decimals={s.decimals ?? 0}
                data-suffix={s.suffix}
                className="font-display tabular text-[clamp(3rem,8vw,7rem)] leading-none tracking-[-0.04em]"
                style={{ color: s.color }}
              >
                0{s.suffix}
              </span>
            </div>
            <div className="mt-4 h-px w-full bg-line">
              <div
                data-bar
                data-width={s.bar}
                style={{ background: s.color, width: "0%" }}
                className="h-full"
              />
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted">
              <span>{s.label}</span>
              <span>0{i + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
