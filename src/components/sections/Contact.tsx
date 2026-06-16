"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const email = "hello@anuragmishra.dev";

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-contact-title]", {
        yPercent: 30,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
        },
      });
      gsap.from("[data-contact-row] > *", {
        y: 20,
        opacity: 0,
        stagger: 0.06,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-contact-row]",
          start: "top 85%",
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  return (
    <section
      ref={root}
      id="contact"
      className="relative overflow-hidden border-t border-line px-6 pt-32 pb-12 md:px-10 md:pt-48"
    >
      <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted md:text-xs">
        <span className="inline-block h-px w-10 bg-fg-muted" />
        Get in touch — 2026
      </div>

      <h2
        data-contact-title
        className="mt-10 max-w-[12ch] font-display text-[clamp(3rem,14vw,14rem)] leading-[0.88] tracking-[-0.03em]"
      >
        Let&apos;s build something{" "}
        <span className="italic text-accent">remarkable.</span>
      </h2>

      <div
        data-contact-row
        className="mt-16 grid grid-cols-12 gap-x-6 gap-y-12 border-t border-line pt-10"
      >
        <div className="col-span-12 md:col-span-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted">
            Email
          </div>
          <button
            onClick={copy}
            data-cursor={copied ? "copied" : "copy"}
            className="mt-2 flex items-center gap-3 font-display text-2xl md:text-3xl link-draw"
          >
            {email}
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-muted">
              {copied ? "Copied" : "Click to copy"}
            </span>
          </button>
        </div>
        <div className="col-span-6 md:col-span-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted">
            Studio
          </div>
          <p className="mt-2 text-lg">
            Bengaluru, IN
            <br />
            Open worldwide
          </p>
        </div>
        <div className="col-span-6 md:col-span-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted">
            Elsewhere
          </div>
          <ul className="mt-2 space-y-1 text-lg">
            <li>
              <a className="link-draw" href="https://x.com" data-cursor="follow">
                Twitter / X ↗
              </a>
            </li>
            <li>
              <a className="link-draw" href="https://github.com" data-cursor="github">
                GitHub ↗
              </a>
            </li>
            <li>
              <a className="link-draw" href="https://read.cv" data-cursor="cv">
                Read.cv ↗
              </a>
            </li>
            <li>
              <a className="link-draw" href="https://linkedin.com" data-cursor="linkedin">
                LinkedIn ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <footer className="mt-24 flex flex-col gap-6 border-t border-line pt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted md:flex-row md:items-center md:justify-between">
        <span>© 2026 Anurag Mishra — All rights reserved</span>
        <span>Built with Next.js · GSAP · Lenis</span>
        <span>v1.0 — Indexed</span>
      </footer>
    </section>
  );
}
