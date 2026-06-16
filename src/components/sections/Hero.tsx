"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "@/lib/split-text";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const lines = root.current!.querySelectorAll<HTMLElement>("[data-line]");
      lines.forEach((line) => SplitText.split(line));

      gsap.set("[data-hero-line] .word", { yPercent: 110 });
      gsap.set("[data-hero-sub]", { opacity: 0, y: 20 });
      gsap.set("[data-hero-meta]", { opacity: 0, y: 16 });
      gsap.set("[data-hero-media]", { yPercent: 8, opacity: 0 });
      gsap.set("[data-hero-mark]", { opacity: 0, scale: 0.6, rotate: -30 });

      const tl = gsap.timeline({
        delay: 0.4,
        defaults: { ease: "expo.out" },
      });

      tl.to("[data-hero-line] .word", {
        yPercent: 0,
        duration: 1.4,
        stagger: 0.06,
      })
        .to(
          "[data-hero-sub]",
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
          "-=0.9",
        )
        .to(
          "[data-hero-meta]",
          { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: "power3.out" },
          "-=1.0",
        )
        .to(
          "[data-hero-media]",
          { opacity: 1, yPercent: 0, duration: 1.4, ease: "power3.out" },
          "-=1.1",
        )
        .to(
          "[data-hero-mark]",
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1.4,
            ease: "elastic.out(1, 0.5)",
          },
          "-=1.2",
        );

      gsap.to("[data-hero-media] img", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to("[data-hero-headline]", {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to("[data-hero-mark]", {
        rotate: 360,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to("[data-aurora]", {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
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
      className="relative min-h-[110vh] overflow-hidden pt-[28vh] md:pt-[22vh]"
    >
      <div data-aurora className="aurora">
        <div
          className="aurora-blob"
          style={{
            top: "10%",
            left: "5%",
            width: "55vw",
            height: "55vw",
            background:
              "radial-gradient(circle at 30% 30%, var(--accent) 0%, transparent 60%)",
            animationDelay: "0s",
          }}
        />
        <div
          className="aurora-blob"
          style={{
            top: "20%",
            right: "0%",
            width: "60vw",
            height: "60vw",
            background:
              "radial-gradient(circle at 60% 40%, var(--accent-pink) 0%, transparent 65%)",
            animationDelay: "-4s",
          }}
        />
        <div
          className="aurora-blob"
          style={{
            bottom: "0%",
            left: "30%",
            width: "70vw",
            height: "70vw",
            background:
              "radial-gradient(circle at 50% 50%, var(--accent-blue) 0%, transparent 60%)",
            animationDelay: "-8s",
          }}
        />
        <div
          className="aurora-blob"
          style={{
            top: "5%",
            left: "40%",
            width: "40vw",
            height: "40vw",
            background:
              "radial-gradient(circle at 50% 50%, var(--accent-plum) 0%, transparent 60%)",
            animationDelay: "-12s",
          }}
        />
      </div>

      <div className="relative z-10 px-6 md:px-10">
        <div
          data-hero-meta
          className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.25em] text-fg/70 md:text-xs"
        >
          <span className="inline-flex items-center gap-2">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for select work — 2026
          </span>
          <span className="hidden md:inline">/</span>
          <span>Index — 001</span>
          <span className="hidden md:inline">/</span>
          <span>Bengaluru ↔ Worldwide</span>
        </div>

        <div className="relative">
          <h1
            data-hero-headline
            className="font-display text-fg leading-[1.05] tracking-[-0.03em] text-[clamp(2.75rem,10vw,10.5rem)] [&>span]:mb-2 md:[&>span]:mb-4"
          >
            <span
              data-line
              data-hero-line
              className="block overflow-hidden whitespace-nowrap"
            >
              Designer &amp;
            </span>
            <span
              data-line
              data-hero-line
              className="block overflow-hidden whitespace-nowrap"
            >
              developer crafting
            </span>
            <span
              data-line
              data-hero-line
              className="block overflow-hidden whitespace-nowrap"
            >
              <span className="italic text-accent-pink">interfaces</span> that{" "}
              <span className="italic text-accent">feel alive</span>.
            </span>
          </h1>

          <div
            data-hero-mark
            className="pointer-events-none absolute right-0 top-2 hidden md:block lg:top-6"
          >
            <Sticker />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <p
            data-hero-sub
            className="max-w-md text-pretty text-base text-fg/80 md:text-lg"
          >
            Independent studio of one — I design and build{" "}
            <span className="text-accent-mint">editorial</span>,{" "}
            <span className="text-accent-amber">motion-led</span> product
            experiences for ambitious teams that refuse to ship anything
            ordinary.
          </p>
          <div data-hero-sub className="flex items-center gap-3">
            <a
              href="#work"
              data-cursor="view"
              className="btn-magnetic"
              data-magnetic
            >
              Selected work
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 13L13 1M13 1H4M13 1V10"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
              </svg>
            </a>
            <a
              href="#contact"
              data-cursor="email"
              className="btn-magnetic btn-pink"
              data-magnetic
            >
              Start a project
            </a>
          </div>
        </div>
      </div>

      <div
        data-hero-media
        className="pointer-events-none relative mt-20 h-[60vh] w-full overflow-hidden md:mt-28 md:h-[80vh]"
      >
        <img
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=2400&q=80"
          alt=""
          className="h-[120%] w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/10" />
      </div>

      <div className="absolute bottom-6 left-6 right-6 z-20 flex items-end justify-between md:left-10 md:right-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg/70">
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-3 w-px animate-pulse bg-accent" />
            Scroll to explore
          </span>
        </div>
        <div className="text-right font-mono text-[10px] uppercase tracking-[0.25em] text-fg/70">
          Made in{" "}
          <span className="text-accent">Next.js · GSAP · Lenis</span>
          <br />
          2026 — V.1
        </div>
      </div>
    </section>
  );
}

function Sticker() {
  return (
    <div className="relative h-48 w-48 -rotate-[8deg] lg:h-60 lg:w-60">
      <svg
        viewBox="0 0 240 240"
        className="absolute inset-0 h-full w-full"
        style={{ color: "var(--accent)" }}
      >
        <defs>
          <filter id="stampRough" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              seed="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="1.4"
            />
          </filter>
          <path
            id="topArc"
            d="M 120,120 m -92,0 a 92,92 0 1,1 184,0"
            fill="none"
          />
          <path
            id="bottomArc"
            d="M 120,120 m -92,0 a 92,92 0 1,0 184,0"
            fill="none"
          />
        </defs>

        <g
          filter="url(#stampRough)"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="120" cy="120" r="108" strokeDasharray="2 6" opacity="0.6" />
          <circle cx="120" cy="120" r="96" />
          <circle cx="120" cy="120" r="62" />
        </g>

        <g className="sticker" style={{ transformOrigin: "120px 120px" }}>
          <text
            fill="currentColor"
            fontSize="13"
            letterSpacing="6"
            className="font-mono uppercase"
            style={{ fontWeight: 600 }}
          >
            <textPath href="#topArc" startOffset="50%" textAnchor="middle">
              ★ Studio of One ★ Est. 2026 ★ Made with Care
            </textPath>
          </text>
          <text
            fill="currentColor"
            fontSize="11"
            letterSpacing="5"
            className="font-mono uppercase"
          >
            <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
              Available — Bengaluru ↔ Worldwide
            </textPath>
          </text>
        </g>

        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          filter="url(#stampRough)"
        >
          <line x1="120" y1="36" x2="120" y2="48" />
          <line x1="120" y1="192" x2="120" y2="204" />
          <line x1="36" y1="120" x2="48" y2="120" />
          <line x1="192" y1="120" x2="204" y2="120" />
        </g>

        <g
          fill="currentColor"
          stroke="none"
          filter="url(#stampRough)"
        >
          <text
            x="120"
            y="112"
            textAnchor="middle"
            fontSize="11"
            letterSpacing="5"
            className="font-mono uppercase"
          >
            Indep.
          </text>
        </g>

        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#stampRough)"
        >
          <path d="M 96 124 L 144 124 M 120 100 L 120 148" />
          <circle cx="120" cy="124" r="22" strokeWidth="1.5" opacity="0.6" />
        </g>

        <g
          fill="currentColor"
          stroke="none"
          filter="url(#stampRough)"
        >
          <text
            x="120"
            y="166"
            textAnchor="middle"
            fontSize="9"
            letterSpacing="4"
            className="font-mono uppercase"
            opacity="0.85"
          >
            Anurag M.
          </text>
        </g>
      </svg>
    </div>
  );
}
