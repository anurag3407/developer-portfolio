"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const update = () => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      setTime(`IST ${d.toLocaleTimeString("en-GB", opts)}`);
    };
    update();
    const id = setInterval(update, 30000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(id);
    };
  }, []);

  return (
    <header
      ref={ref}
      data-scrolled={scrolled}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-[background,backdrop-filter,padding] duration-500 data-[scrolled=true]:py-3 data-[scrolled=true]:backdrop-blur-xl data-[scrolled=true]:bg-bg/40 md:px-10"
    >
      <Link
        href="/"
        data-cursor="home"
        className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em]"
      >
        <span className="inline-block h-2 w-2 rounded-full bg-accent" />
        Anurag M.
      </Link>
      <nav className="hidden items-center gap-10 md:flex">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="link-draw font-mono text-xs uppercase tracking-[0.2em] text-fg/80 hover:text-fg"
          >
            {l.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-fg-muted md:inline">
          {time}
        </span>
        <a
          href="#contact"
          data-cursor="say hi"
          className="font-mono text-xs uppercase tracking-[0.2em] text-fg"
        >
          <span className="rounded-full border border-line px-3 py-2 transition-colors hover:border-accent hover:text-accent">
            Let&apos;s talk
          </span>
        </a>
      </div>
    </header>
  );
}
