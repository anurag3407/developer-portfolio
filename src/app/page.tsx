import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Stats from "@/components/sections/Stats";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import Manifesto from "@/components/sections/Manifesto";
import Showcase from "@/components/sections/Showcase";
import Process from "@/components/sections/Process";
import Capabilities from "@/components/sections/Capabilities";
import Contact from "@/components/sections/Contact";
import Magnetic from "@/components/Magnetic";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Stats />
      <Work />
      <Manifesto />
      <Showcase />
      <About />
      <Process />
      <Capabilities />
      <Contact />
      <Magnetic />
    </>
  );
}
