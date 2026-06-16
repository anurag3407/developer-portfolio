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
            className="font-display text-fg leading-[0.88] tracking-[-0.03em] text-[clamp(3rem,11vw,12rem)]"
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
            className="pointer-events-none absolute right-0 top-0 hidden md:block"
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
    <div className="relative h-44 w-44 lg:h-52 lg:w-52">
      <svg
        viewBox="0 0 200 200"
        className="sticker absolute inset-0 h-full w-full text-fg"
      >
        <defs>
          <path
            id="circlePath"
            d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
            fill="none"
          />
        </defs>
        <text fill="currentColor" className="font-mono uppercase" fontSize="12" letterSpacing="6">
          <textPath href="#circlePath">
            Available 2026 · Available 2026 · Available 2026 ·
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="h-16 w-16 animate-float text-accent"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="50" cy="50" r="40" />
          <path d="M30 50 L70 50 M50 30 L50 70" />
        </svg>
      </div>
    </div>
  );
}
