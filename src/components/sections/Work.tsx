"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Work() {
  const root = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-work-head] > *", {
        y: 60,
        opacity: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-work-head]", start: "top 80%" },
      });

      gsap.from("[data-work-row]", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-work-index]", start: "top 75%" },
      });

      gsap.from("[data-work-feature]", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-work-features]", start: "top 80%" },
      });

      gsap.from("[data-work-feature] img", {
        scale: 1.2,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-work-features]", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!previewRef.current) return;
    const images = previewRef.current.querySelectorAll<HTMLElement>("[data-preview]");
    images.forEach((img, i) => {
      gsap.to(img, {
        autoAlpha: i === active ? 1 : 0,
        scale: i === active ? 1 : 1.08,
        duration: 0.9,
        ease: "power3.out",
      });
    });
  }, [active]);

  const featured = projects.slice(0, 2);
  const total = projects.length;

  return (
    <section
      ref={root}
      id="work"
      className="relative px-6 pt-32 pb-24 md:px-10 md:pt-48"
    >
      <header
        data-work-head
        className="mb-20 grid grid-cols-12 gap-x-6 gap-y-8 md:mb-28"
      >
        <div className="col-span-12 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted md:col-span-3 md:text-xs">
          <span className="inline-block h-px w-10 bg-fg-muted" />
          Index — Selected work
        </div>
        <h2 className="col-span-12 font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.88] tracking-[-0.03em] md:col-span-9">
          A small,{" "}
          <span className="italic text-accent">opinionated</span> body
          <br />
          of work. <span className="italic text-accent-pink">Chosen</span> over
          many,
          <br />
          <span className="italic text-accent-blue">refined</span> over none.
        </h2>
        <div className="col-span-12 flex items-center justify-between border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted md:col-start-4 md:col-end-13">
          <span>05 projects · 2023 — 2026</span>
          <span className="hidden md:inline">Hover an entry to preview ↗</span>
          <span>
            <span className="text-fg">{String(active + 1).padStart(2, "0")}</span> /{" "}
            {String(total).padStart(2, "0")}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-x-6">
        <div className="relative col-span-12 hidden md:col-span-5 md:block">
          <div
            ref={previewRef}
            className="sticky top-28 aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-bg-elev"
          >
            {projects.map((p, i) => (
              <div
                key={p.id}
                data-preview
                className="absolute inset-0"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 mix-blend-multiply"
                  style={{ background: p.color, opacity: 0.5 }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
                <div className="absolute left-6 top-6 flex items-center gap-2">
                  <span
                    className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-bg"
                    style={{ background: p.color }}
                  >
                    {p.tags[0]}
                  </span>
                  <span className="rounded-full border border-fg/30 bg-bg/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-fg/90 backdrop-blur">
                    {p.year}
                  </span>
                </div>
                <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-fg">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg/70">
                      Client
                    </div>
                    <div className="mt-1 font-display text-2xl leading-tight">
                      {p.client.split("—")[0].trim()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className="font-display text-5xl leading-none"
                      style={{ color: p.color }}
                    >
                      {p.metric.value}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-fg/70">
                      {p.metric.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="absolute inset-x-6 top-1/2 flex justify-end">
              <span className="rounded-full border border-fg/30 bg-bg/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-fg backdrop-blur">
                ↗ View case study
              </span>
            </div>
          </div>
        </div>

        <ol
          data-work-index
          className="col-span-12 border-t border-line md:col-span-7"
        >
          {projects.map((p, i) => (
            <li
              key={p.id}
              data-work-row
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group relative border-b border-line"
            >
              <a
                href={`#${p.id}`}
                data-cursor="open"
                className="block py-7 md:py-9"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 origin-left scale-x-0 opacity-0 transition-all duration-700 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-x-100 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, ${p.color}10, transparent 60%)`,
                  }}
                />
                <div className="relative grid grid-cols-12 items-end gap-x-4 gap-y-4">
                  <span
                    className="col-span-2 font-mono text-xs uppercase tracking-[0.25em] text-fg-muted transition-colors duration-500 group-hover:text-fg md:col-span-1"
                    style={{
                      color:
                        active === i ? (p.color as string) : undefined,
                    }}
                  >
                    {p.index}
                  </span>
                  <div className="col-span-10 md:col-span-11">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3
                        className="font-display text-[clamp(2rem,4.6vw,4rem)] leading-[0.95] tracking-[-0.02em] transition-all duration-500 group-hover:translate-x-2"
                        style={{
                          color:
                            active === i ? (p.color as string) : undefined,
                        }}
                      >
                        {p.title}
                        <span className="italic text-fg-muted">
                          {" "}
                          — {p.client.split("—")[1]?.trim() ?? p.client}
                        </span>
                      </h3>
                      <span
                        aria-hidden
                        className="hidden shrink-0 font-mono text-xs uppercase tracking-[0.25em] text-fg-muted opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:inline"
                      >
                        ↗ {p.year}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted">
                      <span>{p.role}</span>
                      <span className="hidden md:inline">/</span>
                      <span className="flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-line px-2 py-1 transition-colors duration-500 group-hover:border-fg/40"
                          >
                            {t}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="img-hover relative mt-6 aspect-[16/10] overflow-hidden rounded-2xl md:hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover"
                  />
                  <div
                    className="absolute inset-0 mix-blend-multiply"
                    style={{ background: p.color, opacity: 0.45 }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between text-fg">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
                      {p.year}
                    </span>
                    <span
                      className="font-display text-3xl leading-none"
                      style={{ color: p.color }}
                    >
                      {p.metric.value}
                    </span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </div>

      <div
        data-work-features
        className="mt-32 grid grid-cols-12 gap-6 md:mt-40"
      >
        <div className="col-span-12 flex items-end justify-between border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted">
          <span>Featured — In depth</span>
          <span>02 / 02</span>
        </div>

        {featured.map((p, i) => (
          <article
            key={p.id}
            data-work-feature
            data-cursor="case study"
            className={`group relative col-span-12 overflow-hidden rounded-3xl border border-line bg-bg-elev ${
              i === 0 ? "md:col-span-7" : "md:col-span-5"
            }`}
          >
            <a href={`#${p.id}`} className="block">
              <div className="img-hover relative aspect-[4/3] md:aspect-[5/4]">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-80"
                  style={{ background: p.color, opacity: 0.55 }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                  <div className="flex items-center justify-between text-fg">
                    <span
                      className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-bg"
                      style={{ background: p.color }}
                    >
                      Featured
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
                      {p.index} · {p.year}
                    </span>
                  </div>
                  <div className="text-fg">
                    <h3 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] tracking-[-0.02em]">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm text-fg/85 md:text-base">
                      {p.blurb}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-between border-t border-line p-6 md:p-8">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted">
                    Role
                  </div>
                  <div className="mt-1 text-base">{p.role}</div>
                </div>
                <div className="text-right">
                  <div
                    className="font-display text-3xl leading-none md:text-4xl"
                    style={{ color: p.color }}
                  >
                    {p.metric.value}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted">
                    {p.metric.label}
                  </div>
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>

      <a
        href="#contact"
        data-cursor="all work"
        data-magnetic
        className="mt-20 flex items-center justify-center gap-3 rounded-full border border-line py-6 font-mono text-xs uppercase tracking-[0.25em] text-fg transition-colors duration-500 hover:border-accent hover:bg-accent/5 hover:text-accent"
      >
        <span>View full archive</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M1 13L13 1M13 1H4M13 1V10"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      </a>
    </section>
  );
}
