"use client";

import About from "@/components/About/page";
import Blog from "@/components/Blogs/page";
import Contact from "@/components/Contact/page";
import Experience from "@/components/Experience/page";
import Footer from "@/components/Footer/page";
import Hero from "@/components/Hero/page";
import Navbar from "@/components/Navbar/page";
import Projects from "@/components/Projects/page";
import Services from "@/components/Service/page";
import Skills from "@/components/Skill/page";

export default function Home() {
  return (
    <main className="bg-cream min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}
