"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Work() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-project]");

      cards.forEach((card) => {
        const img = card.querySelector<HTMLElement>("[data-project-img]");
        const meta = card.querySelector<HTMLElement>("[data-project-meta]");
        const title = card.querySelector<HTMLElement>("[data-project-title]");
        const idx = card.querySelector<HTMLElement>("[data-project-idx]");

        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });

        if (img) {
          gsap.from(img, {
            scale: 1.18,
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          });
          gsap.to(img, {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        if (meta && title && idx) {
          gsap.from([idx, title, meta.children], {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
          });
        }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="work"
      className="relative px-6 pt-32 pb-24 md:px-10 md:pt-48"
    >
      <header className="mb-20 flex flex-col gap-6 md:mb-32 md:flex-row md:items-end md:justify-between">
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted md:text-xs">
          <span className="inline-block h-px w-10 bg-fg-muted" />
          Selected work — 2023 / 2026
        </div>
        <h2 className="max-w-2xl font-display text-[clamp(2.25rem,6vw,5rem)] leading-[0.92] tracking-[-0.02em]">
          A small, opinionated body of work.{" "}
          <span className="italic text-fg-muted">
            Chosen over many, refined over none.
          </span>
        </h2>
      </header>

      <div className="grid grid-cols-12 gap-y-32">
        {projects.map((p, i) => {
          const isOdd = i % 2 === 1;
          const left = isOdd ? "md:col-start-2 md:col-end-8" : "md:col-start-1 md:col-end-7";
          const right = isOdd ? "md:col-start-9 md:col-end-13" : "md:col-start-8 md:col-end-12";
          const order = isOdd ? "md:order-1" : "";
          return (
            <article
              key={p.id}
              data-project
              data-cursor="open case"
              className="group relative col-span-12 grid grid-cols-12 gap-x-6 gap-y-6"
            >
              <a
                href={`#${p.id}`}
                className={`img-hover relative col-span-12 block aspect-[4/5] ${left}`}
              >
                <img
                  data-project-img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/40 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/90 backdrop-blur">
                  {p.tags[0]}
                </span>
              </a>

              <div className={`col-span-12 flex flex-col gap-6 ${right} ${order}`}>
                <div
                  data-project-idx
                  className="flex items-baseline gap-4 font-mono text-xs uppercase tracking-[0.25em] text-fg-muted"
                >
                  <span style={{ color: p.color }}>{p.index}</span>
                  <span>{p.year}</span>
                  <span className="h-px flex-1 bg-line" />
                </div>
                <h3
                  data-project-title
                  className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] tracking-[-0.02em]"
                >
                  {p.title}{" "}
                  <span className="italic text-fg-muted">— {p.client}</span>
                </h3>
                <div data-project-meta className="flex flex-col gap-5 text-fg/80">
                  <p className="max-w-md text-base md:text-lg">{p.blurb}</p>
                  <div className="flex flex-wrap items-end gap-x-10 gap-y-4">
                    <div>
                      <div
                        className="font-display text-4xl md:text-5xl"
                        style={{ color: p.color }}
                      >
                        {p.metric.value}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted">
                        {p.metric.label}
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted">
                        Role
                      </div>
                      <div className="text-sm">{p.role}</div>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted">
                        Stack
                      </div>
                      <div className="text-sm">{p.tags.join(" · ")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-32 flex items-center justify-between border-t border-line pt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted">
        <span>End of selected work</span>
        <span>05 / 05</span>
      </div>
    </section>
  );
}
