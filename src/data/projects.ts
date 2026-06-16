export type Project = {
  id: string;
  index: string;
  title: string;
  client: string;
  year: string;
  role: string;
  tags: string[];
  blurb: string;
  metric: { value: string; label: string };
  image: string;
  color: string;
};

export const projects: Project[] = [
  {
    id: "luma",
    index: "01",
    title: "Luma Travel",
    client: "Luma — Travel platform",
    year: "2025",
    role: "Design, Engineering, Motion",
    tags: ["Product", "Brand", "Motion"],
    blurb:
      "Reimagined the booking flow for an ambitious travel startup — kinetic transitions, a single-step booking sheet, and a redesigned itinerary canvas.",
    metric: { value: "−32%", label: "Drop-off" },
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80",
    color: "var(--accent)",
  },
  {
    id: "northwind",
    index: "02",
    title: "Northwind OS",
    client: "Northwind — Internal platform",
    year: "2024",
    role: "Lead designer",
    tags: ["SaaS", "Design system", "Identity"],
    blurb:
      "Built the design system & dashboard surface for a 200-engineer logistics platform. Cut new-page time from days to hours.",
    metric: { value: "12×", label: "Velocity" },
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80",
    color: "var(--accent-pink)",
  },
  {
    id: "aera",
    index: "03",
    title: "Aera Studio",
    client: "Aera — Architecture practice",
    year: "2024",
    role: "Design, Engineering",
    tags: ["Website", "WebGL", "Editorial"],
    blurb:
      "A monolithic, scroll-driven editorial site for a boutique architecture studio. Built with Next.js, GSAP and a custom WebGL grid.",
    metric: { value: "1.2s", label: "LCP" },
    image:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2000&q=80",
    color: "var(--accent-blue)",
  },
  {
    id: "halo",
    index: "04",
    title: "Halo Finance",
    client: "Halo — Consumer finance",
    year: "2023",
    role: "Design, Engineering",
    tags: ["Mobile", "Brand", "Product"],
    blurb:
      "Re-architected the onboarding & invest surfaces for a consumer finance app. Shipped an entirely new motion language.",
    metric: { value: "4.8★", label: "App store" },
    image:
      "https://images.unsplash.com/photo-1542223616-9de9adb5e3e8?auto=format&fit=crop&w=2000&q=80",
    color: "var(--accent-mint)",
  },
  {
    id: "petrichor",
    index: "05",
    title: "Petrichor",
    client: "Personal — Generative tool",
    year: "2025",
    role: "Solo project",
    tags: ["Generative", "Three.js", "Tool"],
    blurb:
      "A browser-native generative gradient & noise tool. Exports tile-able assets used by designers across thousands of projects.",
    metric: { value: "18k", label: "Creators" },
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2000&q=80",
    color: "var(--accent-amber)",
  },
];
