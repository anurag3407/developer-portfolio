"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("cursor-ready");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cur = { x: target.x, y: target.y };
    let raf = 0;
    let alive = true;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
    };

    const loop = () => {
      if (!alive) return;
      cur.x += (target.x - cur.x) * 0.18;
      cur.y += (target.y - cur.y) * 0.18;
      ring.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    const setHover = (active: boolean, l?: string | null) => {
      ring.dataset.hover = active ? "true" : "false";
      setLabel(l ?? null);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const el = t.closest<HTMLElement>("[data-cursor]");
      if (el) {
        setHover(true, el.dataset.cursor || null);
      } else if (t.closest("a,button,[role='button'],input,textarea,select")) {
        setHover(true, null);
      } else {
        setHover(false, null);
      }
    };

    const onLeave = () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };
    const onEnter = () => {
      ring.style.opacity = "1";
      dot.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("cursor-ready");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] h-1 w-1 rounded-full bg-fg mix-blend-difference transition-opacity duration-300"
        style={{ transform: "translate3d(-100px,-100px,0)" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        data-hover="false"
        className="pointer-events-none fixed left-0 top-0 z-[80] flex h-10 w-10 items-center justify-center rounded-full border border-fg/40 text-[10px] uppercase tracking-widest text-fg mix-blend-difference transition-[width,height,background,opacity] duration-500 ease-[cubic-bezier(.7,0,.2,1)] data-[hover=true]:h-20 data-[hover=true]:w-20 data-[hover=true]:border-accent data-[hover=true]:bg-accent/10"
        style={{ transform: "translate3d(-100px,-100px,0)" }}
      >
        {label}
      </div>
    </>
  );
}
