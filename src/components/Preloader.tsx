"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const numRef = useRef<HTMLSpanElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const [done, setDone] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("preloaded") === "1") {
      setSkip(true);
      setDone(true);
    }
  }, []);

  useEffect(() => {
    if (done || skip) return;
    const root = rootRef.current;
    const num = numRef.current;
    const label = labelRef.current;
    const bar = barRef.current;
    if (!root || !num || !label || !bar) return;

    const tl = gsap.timeline({
      onComplete: () => {
        try {
          sessionStorage.setItem("preloaded", "1");
        } catch {
          /* noop */
        }
        setDone(true);
      },
    });

    const counter = { v: 0 };
    tl.to(counter, {
      v: 100,
      duration: 2.4,
      ease: "power2.inOut",
      onUpdate: () => {
        num.textContent = String(Math.round(counter.v)).padStart(3, "0");
        bar.style.width = `${counter.v}%`;
      },
    })
      .to([num, label, bar], {
        y: -30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.in",
        stagger: 0.04,
      })
      .to(
        root,
        {
          yPercent: -100,
          duration: 1.1,
          ease: "expo.inOut",
        },
        "-=0.1",
      );

    return () => {
      tl.kill();
    };
  }, [done, skip]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col justify-end bg-bg p-6 md:p-10"
    >
      <div className="flex items-end justify-between border-b border-line pb-6">
        <span
          ref={labelRef}
          className="font-mono text-xs uppercase tracking-[0.2em] text-fg-muted"
        >
          Loading — Index
        </span>
        <span
          ref={numRef}
          className="preloader-num font-display text-[18vw] leading-none md:text-[12vw]"
        >
          000
        </span>
      </div>
      <div className="mt-4 h-px w-full bg-line">
        <div
          ref={barRef}
          className="h-full bg-accent"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
}
