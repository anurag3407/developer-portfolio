"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

export default function Magnetic() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-magnetic]"),
    );
    const cleanups: Array<() => void> = [];

    targets.forEach((el) => {
      const strength = 18;
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        gsap.to(el, {
          x: (x / r.width) * strength,
          y: (y / r.height) * strength,
          duration: 0.6,
          ease: "power3.out",
        });
      };
      const onLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.4)",
        });
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((c) => c());
  }, []);

  return null;
}
