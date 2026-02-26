"use client";

import About from "@/components/About/page";
import Blog from "@/components/Blogs/page";
import CompetitiveProgramming from "@/components/CompetitiveProgramming/page";
import Contact from "@/components/Contact/page";
import Footer from "@/components/Footer/page";
import Hero from "@/components/Hero/page";
import Navbar from "@/components/Navbar/page";
import Projects from "@/components/Projects/page";
import Skills from "@/components/Skill/page";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <CompetitiveProgramming />
      <Projects />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}
