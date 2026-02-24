"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

const roles = [
  "Full Stack Developer",
  "React Specialist",
  "Node.js Engineer",
  "UI/UX Enthusiast",
  "Open Source Dev",
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/",
    icon: FiGithub,
    color: "#818cf8",
    hoverBg: "rgba(129,140,248,0.12)",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/",
    icon: FiLinkedin,
    color: "#34d399",
    hoverBg: "rgba(52,211,153,0.12)",
  },
  {
    label: "Twitter",
    href: "https://twitter.com/",
    icon: FiTwitter,
    color: "#60a5fa",
    hoverBg: "rgba(96,165,250,0.12)",
  },
];

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout;

    if (!isDeleting && typed === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && typed === "") {
      setIsDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    } else {
      timeout = setTimeout(
        () => {
          setTyped(
            isDeleting
              ? current.slice(0, typed.length - 1)
              : current.slice(0, typed.length + 1),
          );
        },
        isDeleting ? 45 : 75,
      );
    }
    return () => clearTimeout(timeout);
  }, [typed, isDeleting, roleIdx]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center grid-pattern overflow-hidden"
      style={{ paddingTop: "80px" }}
    >
      {/* Background decorations */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 65%)",
        }}
      />

      {/* Floating orbs */}
      {[
        { size: 6, top: "20%", left: "8%", color: "#818cf8", delay: 0 },
        { size: 4, top: "70%", left: "15%", color: "#34d399", delay: 1 },
        { size: 5, top: "40%", right: "10%", color: "#f472b6", delay: 0.5 },
        { size: 3, top: "80%", right: "20%", color: "#818cf8", delay: 1.5 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: orb.color,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            boxShadow: `0 0 ${orb.size * 3}px ${orb.color}`,
          }}
          animate={{ y: [0, -15, 0], opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 3 + i,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex items-center gap-16 flex-wrap lg:flex-nowrap">
          {/* Left Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex-1 min-w-[300px]"
          >
            <motion.div variants={item} className="section-label w-fit">
              <span
                className="w-2 h-2 rounded-full inline-block animate-pulse"
                style={{ background: "var(--accent-2)" }}
              />
              Available for work
            </motion.div>

            <motion.h1
              variants={item}
              className="font-syne font-bold leading-[1.05] mb-5"
              style={{ fontSize: "clamp(42px, 6vw, 76px)" }}
            >
              Hi, I'm <span className="grad-text glow-text">Rafiqul</span>
              <br />
              <span style={{ color: "rgba(255,255,255,0.9)" }}>Islam</span>
            </motion.h1>

            <motion.div
              variants={item}
              className="flex items-center gap-3 mb-6"
              style={{ height: "36px" }}
            >
              <span style={{ color: "var(--muted)", fontSize: "16px" }}>
                I build
              </span>
              <span
                className="font-semibold text-lg"
                style={{ color: "var(--accent-2)" }}
              >
                {typed}
                <span
                  className="inline-block w-0.5 h-5 ml-0.5 align-middle"
                  style={{
                    background: "var(--accent-2)",
                    animation: "pulse 1s infinite",
                  }}
                />
              </span>
            </motion.div>

            <motion.p
              variants={item}
              style={{
                color: "var(--muted)",
                maxWidth: "500px",
                lineHeight: 1.85,
                fontSize: "15px",
                marginBottom: "36px",
              }}
            >
              I craft pixel-perfect, performant web applications using modern
              technologies. From elegant UIs to scalable backends — I love
              turning complex ideas into simple, beautiful products.
            </motion.p>

            <motion.div variants={item} className="flex gap-4 flex-wrap mb-12">
              <motion.button
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 0 30px rgba(129,140,248,0.35)",
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-7 py-3.5 rounded-xl text-sm font-semibold"
                style={{
                  background: "linear-gradient(135deg, #818cf8, #34d399)",
                  color: "#07071a",
                }}
              >
                View My Work →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, borderColor: "var(--accent)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-7 py-3.5 rounded-xl text-sm font-semibold transition-all"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "var(--light)",
                  background: "transparent",
                }}
              >
                Let's Talk
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={item} className="flex gap-10">
              {[
                ["3+", "Years Exp."],
                ["25+", "Projects Done"],
                ["15+", "Happy Clients"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-syne font-bold text-3xl grad-text">
                    {n}
                  </div>
                  <div
                    className="text-xs mt-1"
                    style={{ color: "var(--muted)", letterSpacing: "0.05em" }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 relative"
          >
            {/* Rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, #818cf8 90deg, transparent 180deg, #34d399 270deg, transparent 360deg)",
                padding: "2px",
                margin: "-4px",
                borderRadius: "50%",
              }}
            />

            <div
              className="relative w-[300px] h-[300px] lg:w-[360px] lg:h-[360px] rounded-full overflow-hidden"
              style={{
                border: "3px solid rgba(129,140,248,0.3)",
                boxShadow:
                  "0 0 80px rgba(129,140,248,0.2), inset 0 0 60px rgba(0,0,0,0.5)",
              }}
            >
              <div
                className="w-full h-full flex items-center justify-center text-8xl"
                style={{
                  background: "linear-gradient(135deg, #0d0d2b, #111130)",
                }}
              >
                👨‍💻
              </div>
              <Image
                src="/topu.png"
                alt="Rafiqul Islam"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>

            {/* Floating badge — top right */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-2.5 flex items-center gap-2"
            >
              <span className="text-lg">⚡</span>
              <div>
                <div
                  className="text-xs font-semibold"
                  style={{ color: "var(--accent)" }}
                >
                  Full Stack
                </div>
                <div className="text-xs" style={{ color: "var(--muted)" }}>
                  Developer
                </div>
              </div>
            </motion.div>

            {/* Floating badge — bottom left */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-2.5 flex items-center gap-2"
            >
              <span className="text-lg">🚀</span>
              <div>
                <div
                  className="text-xs font-semibold"
                  style={{ color: "var(--accent-2)" }}
                >
                  Open to
                </div>
                <div className="text-xs" style={{ color: "var(--muted)" }}>
                  New Projects
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex items-center gap-6 mt-16"
        >
          <span
            className="text-xs tracking-widest"
            style={{ color: "var(--muted)" }}
          >
            FIND ME ON
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: "var(--border)" }}
          />

          <div className="flex gap-3">
            {socialLinks.map((s) => {
              const Icon = s.icon;
              const isHovered = hoveredSocial === s.label;
              return (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onHoverStart={() => setHoveredSocial(s.label)}
                  onHoverEnd={() => setHoveredSocial(null)}
                  whileHover={{ y: -4, scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                  className="relative flex flex-col items-center gap-1.5 group"
                >
                  {/* Icon button */}
                  <motion.div
                    animate={{
                      background: isHovered
                        ? s.hoverBg
                        : "rgba(255,255,255,0.04)",
                      borderColor: isHovered
                        ? s.color
                        : "rgba(255,255,255,0.08)",
                      boxShadow: isHovered ? `0 0 20px ${s.color}40` : "none",
                    }}
                    transition={{ duration: 0.2 }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center border"
                  >
                    <motion.div
                      animate={{ color: isHovered ? s.color : "var(--muted)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon size={18} />
                    </motion.div>
                  </motion.div>

                  {/* Tooltip */}
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      y: isHovered ? 0 : 4,
                    }}
                    transition={{ duration: 0.15 }}
                    className="absolute -bottom-6 text-[10px] font-semibold tracking-wide whitespace-nowrap"
                    style={{ color: s.color }}
                  >
                    {s.label}
                  </motion.span>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-xs tracking-widest"
          style={{ color: "var(--muted)" }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0.5 h-8 rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, var(--accent), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
