"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiDownload, FiSun, FiMoon } from "react-icons/fi";

const links = [
  "Home",
  "About",
  "Skills",
  "Competitive",
  "Projects",
  "Blog",
  "Contact",
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  // Scroll + active section tracking
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const ids = [
        "home",
        "about",
        "skills",
        "competitive",
        "projects",
        "blog",
        "contact",
      ];
      let cur = "Home";
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130)
          cur = id.charAt(0).toUpperCase() + id.slice(1);
      });
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  // Toggle light / dark
  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = "/TOPU RAYHAN _ FULL STACK DEVELOPER.pdf";
    a.download = "TOPU RAYHAN_FULL STACK DEVELOPER.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const isDark = theme === "dark";

  return (
    <>
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3 shadow-sm border-b" : "py-5"
        }`}
        style={{
          background: scrolled ? "var(--nav-bg)" : "transparent",
          borderColor: scrolled ? "var(--nav-border)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-4">
          {/* ── Logo ── */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="cursor-pointer flex-shrink-0"
            onClick={() => scrollTo("home")}
          >
            <span
              className="font-display font-bold text-xl"
              style={{ color: "var(--orange)" }}
            >
              ●
            </span>
            <span
              className="font-display font-bold text-xl ml-1"
              style={{ color: "var(--ink)" }}
            >
              TR
            </span>
            <span
              className="font-display font-semibold text-xl"
              style={{ color: "var(--orange)" }}
            >
              .dev
            </span>
          </motion.div>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="relative px-4 py-2 text-sm font-semibold font-display rounded-full transition-colors duration-200"
                style={{
                  color: active === link ? "var(--orange)" : "var(--muted)",
                }}
              >
                {active === link && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "var(--orange-pale)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link}</span>
              </button>
            ))}
          </div>

          {/* ── Right side actions ── */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {/* ── Theme Toggle Switch ── */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              title={isDark ? "Light Mode" : "Dark Mode"}
              className="relative w-[54px] h-7 rounded-full flex items-center px-1 cursor-pointer"
              style={{
                background: isDark
                  ? "linear-gradient(135deg,#2d2d5e,#1a1a40)"
                  : "linear-gradient(135deg,#fde68a,#fed7aa)",
                border: `1.5px solid ${isDark ? "rgba(129,140,248,0.35)" : "rgba(255,107,43,0.3)"}`,
                boxShadow: isDark
                  ? "0 2px 14px rgba(99,102,241,0.2), inset 0 1px 0 rgba(255,255,255,0.05)"
                  : "0 2px 14px rgba(255,107,43,0.18), inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
            >
              {/* Sun icon (left) */}
              <FiSun
                size={10}
                className="absolute left-1.5"
                style={{
                  color: isDark ? "rgba(255,255,255,0.18)" : "#ea580c",
                  transition: "color 0.3s",
                }}
              />
              {/* Moon icon (right) */}
              <FiMoon
                size={10}
                className="absolute right-1.5"
                style={{
                  color: isDark ? "#818cf8" : "rgba(0,0,0,0.18)",
                  transition: "color 0.3s",
                }}
              />
              {/* Sliding knob */}
              <motion.div
                animate={{ x: isDark ? 26 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className="w-5 h-5 rounded-full flex items-center justify-center shadow-md z-10"
                style={{
                  background: isDark
                    ? "linear-gradient(135deg,#6366f1,#818cf8)"
                    : "linear-gradient(135deg,#ff6b2b,#ff8c55)",
                  boxShadow: isDark
                    ? "0 0 10px rgba(99,102,241,0.55)"
                    : "0 0 10px rgba(255,107,43,0.45)",
                }}
              >
                {isDark ? (
                  <FiMoon size={9} color="#fff" />
                ) : (
                  <FiSun size={9} color="#fff" />
                )}
              </motion.div>
            </motion.button>

            {/* ── Download CV Button ── */}
            <motion.button
              onClick={handleDownload}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 text-sm font-semibold font-display px-5 py-2.5 rounded-full border-2 transition-all duration-200"
              style={{
                color: "var(--orange)",
                borderColor: "var(--orange)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--orange)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.boxShadow =
                  "0 6px 22px rgba(255,107,43,0.38)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--orange)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <FiDownload size={14} />
              Download CV
            </motion.button>
          </div>

          {/* ── Mobile ── */}
          <div className="md:hidden flex items-center gap-2">
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center border"
              style={{
                background: "var(--orange-pale)",
                borderColor: "rgba(255,107,43,0.2)",
              }}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiSun size={16} style={{ color: "var(--orange)" }} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMoon size={16} style={{ color: "var(--orange)" }} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <button
              className="p-2 rounded-xl"
              style={{ background: "var(--orange-pale)" }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <FiX size={22} style={{ color: "var(--orange)" }} />
              ) : (
                <FiMenu size={22} style={{ color: "var(--orange)" }} />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Dropdown Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed top-[66px] left-4 right-4 z-40 md:hidden rounded-2xl shadow-2xl border overflow-hidden"
            style={{
              background: "var(--card-bg)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex flex-col p-4 gap-1">
              {links.map((link, i) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link)}
                  className="text-left px-4 py-3 rounded-xl font-display font-semibold text-sm transition-all"
                  style={{
                    color: active === link ? "var(--orange)" : "var(--ink2)",
                    background:
                      active === link ? "var(--orange-pale)" : "transparent",
                  }}
                >
                  {link}
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                onClick={() => {
                  handleDownload();
                  setMobileOpen(false);
                }}
                className="mt-2 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold font-display"
                style={{
                  background: "var(--orange)",
                  color: "#fff",
                  boxShadow: "0 4px 18px rgba(255,107,43,0.32)",
                }}
              >
                <FiDownload size={15} />
                Download Resume
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
