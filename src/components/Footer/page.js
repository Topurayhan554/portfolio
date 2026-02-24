"use client";
import { motion } from "framer-motion";

const links = [
  "Home",
  "About",
  "Skills",
  "Experience",
  "Projects",
  "Blog",
  "Contact",
];

export default function Footer() {
  const scrollTo = (id) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="py-12 px-6"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-syne font-bold text-2xl cursor-pointer"
            onClick={() => scrollTo("home")}
          >
            <span className="grad-text">RI</span>
            <span className="text-white/20 mx-1">/</span>
            <span className="text-white/40 text-sm font-normal font-jakarta">
              dev
            </span>
          </motion.div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-1">
            {links.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l)}
                className="px-3 py-1.5 text-sm rounded-lg transition-colors hover:text-accent"
                style={{ color: "var(--muted)" }}
              >
                {l}
              </button>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollTo("contact")}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold"
            style={{
              background: "linear-gradient(135deg, #818cf8, #34d399)",
              color: "#07071a",
            }}
          >
            Hire Me ✦
          </motion.button>
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            © 2025 Rafiqul Islam. Built with Next.js, Tailwind CSS & Framer
            Motion.
          </p>
          <button
            onClick={() => scrollTo("home")}
            className="text-xs transition-colors hover:text-accent flex items-center gap-2"
            style={{ color: "var(--muted)" }}
          >
            Back to top
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↑
            </motion.span>
          </button>
        </div>
      </div>
    </footer>
  );
}
