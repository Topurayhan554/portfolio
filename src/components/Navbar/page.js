"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiSun, HiMoon } from "react-icons/hi";

const links = [
  "Home",
  "About",
  "Skills",
  "Experience",
  "Projects",
  "Blog",
  "Contact",
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  // Apply theme to <html>
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = links.map((l) =>
        document.getElementById(l.toLowerCase()),
      );
      let current = "Home";
      sections.forEach((s) => {
        if (s && window.scrollY >= s.offsetTop - 140) {
          current = s.id.charAt(0).toUpperCase() + s.id.slice(1);
        }
      });
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const isDark = theme === "dark";

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3 backdrop-blur-2xl border-b" : "py-5 bg-transparent"
        }`}
        style={
          scrolled
            ? {
                background: "var(--nav-bg)",
                borderColor: "var(--border)",
              }
            : {}
        }
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-syne font-bold text-xl cursor-pointer"
            onClick={() => scrollTo("home")}
          >
            <span className="grad-text">RI</span>
            <span className="mx-1" style={{ color: "var(--border-solid)" }}>
              /
            </span>
            <span
              className="text-sm font-normal font-jakarta"
              style={{ color: "var(--muted)" }}
            >
              dev
            </span>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg"
                style={{
                  color: active === link ? "var(--accent)" : "var(--muted)",
                }}
              >
                {active === link && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "var(--accent-pill)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link}</span>
              </button>
            ))}
          </div>

          {/* Right side — theme toggle + CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="relative w-14 h-7 rounded-full flex items-center px-1 transition-all duration-300"
              style={{
                background: isDark
                  ? "rgba(129,140,248,0.15)"
                  : "rgba(251,191,36,0.15)",
                border: `1px solid ${isDark ? "rgba(129,140,248,0.3)" : "rgba(251,191,36,0.4)"}`,
              }}
              aria-label="Toggle theme"
            >
              {/* Track icons */}
              <HiMoon
                size={11}
                className="absolute left-1.5"
                style={{
                  color: isDark ? "var(--accent)" : "var(--muted)",
                  opacity: 0.7,
                }}
              />
              <HiSun
                size={11}
                className="absolute right-1.5"
                style={{
                  color: isDark ? "var(--muted)" : "#fbbf24",
                  opacity: 0.7,
                }}
              />

              {/* Sliding knob */}
              <motion.div
                layout
                animate={{ x: isDark ? 0 : 28 }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                className="w-5 h-5 rounded-full flex items-center justify-center shadow-md z-10"
                style={{
                  background: isDark
                    ? "linear-gradient(135deg, #818cf8, #6366f1)"
                    : "linear-gradient(135deg, #fbbf24, #f59e0b)",
                  boxShadow: isDark
                    ? "0 0 10px rgba(129,140,248,0.5)"
                    : "0 0 10px rgba(251,191,36,0.5)",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDark ? (
                      <HiMoon size={11} color="#fff" />
                    ) : (
                      <HiSun size={11} color="#07071a" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.button>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("contact")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{
                background: "linear-gradient(135deg, #818cf8, #34d399)",
                color: "#07071a",
              }}
            >
              Hire Me ✦
            </motion.button>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: isDark
                  ? "rgba(129,140,248,0.12)"
                  : "rgba(251,191,36,0.12)",
                border: `1px solid ${isDark ? "rgba(129,140,248,0.25)" : "rgba(251,191,36,0.35)"}`,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? (
                    <HiMoon size={16} color="var(--accent)" />
                  ) : (
                    <HiSun size={16} color="#fbbf24" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            <button
              className="flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <motion.span
                animate={
                  mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }
                }
                className="block w-6 h-0.5 origin-center"
                style={{ background: "var(--light)" }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-0.5"
                style={{ background: "var(--light)" }}
              />
              <motion.span
                animate={
                  mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
                }
                className="block w-6 h-0.5 origin-center"
                style={{ background: "var(--light)" }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{
              background: "var(--mobile-menu-bg)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {links.map((link, i) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => scrollTo(link)}
                  className="text-3xl font-syne font-bold transition-colors"
                  style={{
                    color: active === link ? "var(--accent)" : "var(--muted)",
                  }}
                >
                  {link}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.07 }}
                onClick={() => scrollTo("contact")}
                className="mt-4 px-8 py-3 rounded-xl text-base font-semibold"
                style={{
                  background: "linear-gradient(135deg, #818cf8, #34d399)",
                  color: "#07071a",
                }}
              >
                Hire Me ✦
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
