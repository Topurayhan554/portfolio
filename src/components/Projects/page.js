"use client";
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiX,
  FiExternalLink,
  FiGithub,
  FiCalendar,
  FiUsers,
  FiArrowRight,
} from "react-icons/fi";

const categories = ["All", "Full Stack", "Frontend", "Backend", "Mobile"];

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    cat: "Full Stack",
    desc: "Full-stack shopping platform with Stripe payments and admin dashboard.",
    longDesc:
      "A production-ready e-commerce platform built with Next.js and Node.js. Features include real-time inventory management, Stripe payment integration, order tracking, customer dashboard, and a full admin panel with analytics. Handles 1000+ concurrent users with 99.9% uptime.",
    tech: ["Next.js", "Node.js", "MongoDB", "Stripe", "Redis", "Tailwind CSS"],
    emoji: "🛒",
    color: "#818cf8",
    cardBg: "rgba(129,140,248,0.1)",
    stats: [
      { icon: "👥", label: "Users", val: "12K+" },
      { icon: "⏱️", label: "Uptime", val: "99.9%" },
      { icon: "⭐", label: "Rating", val: "4.9" },
    ],
    features: [
      "Real-time inventory sync",
      "Stripe payment gateway",
      "Admin analytics dashboard",
      "Order tracking & notifications",
      "Mobile responsive PWA",
    ],
    liveUrl: "https://example.com",
    sourceUrl: "https://github.com",
    date: "Jan 2025",
    role: "Full Stack Developer",
  },
  {
    id: 2,
    title: "AI Chat App",
    cat: "Full Stack",
    desc: "Real-time AI-powered chat with GPT-4 and WebSocket support.",
    longDesc:
      "A modern real-time chat application powered by OpenAI's GPT-4 API. Supports multi-room conversations, file sharing, voice messages, and WebSocket for sub-50ms message delivery. Built with Redis for session management and Docker for deployment.",
    tech: ["React", "Socket.io", "OpenAI API", "Redis", "Docker", "Express"],
    emoji: "🤖",
    color: "#ff7a40",
    cardBg: "rgba(255,107,43,0.1)",
    stats: [
      { icon: "💬", label: "Msg/day", val: "5K+" },
      { icon: "⚡", label: "Latency", val: "<50ms" },
      { icon: "🤖", label: "AI Model", val: "GPT-4" },
    ],
    features: [
      "GPT-4 powered responses",
      "Multi-room support",
      "File & image sharing",
      "WebSocket real-time sync",
      "Docker containerized",
    ],
    liveUrl: "https://example.com",
    sourceUrl: "https://github.com",
    date: "Dec 2024",
    role: "Full Stack Developer",
  },
  {
    id: 3,
    title: "Portfolio CMS",
    cat: "Frontend",
    desc: "Headless CMS with live preview, custom themes, and SEO tools.",
    longDesc:
      "A headless CMS designed specifically for developer portfolios. Features a live preview editor, 10+ custom themes, built-in SEO tools, markdown editor, and one-click Vercel deployment. Used by 300+ developers worldwide.",
    tech: ["Next.js", "Sanity.io", "Tailwind CSS", "Vercel", "TypeScript"],
    emoji: "🎨",
    color: "#34d399",
    cardBg: "rgba(52,211,153,0.1)",
    stats: [
      { icon: "🌐", label: "Sites", val: "300+" },
      { icon: "🎨", label: "Themes", val: "10+" },
      { icon: "🚀", label: "Deploy", val: "<1 min" },
    ],
    features: [
      "Live preview editor",
      "10+ custom themes",
      "Built-in SEO optimizer",
      "Markdown + rich text",
      "One-click Vercel deploy",
    ],
    liveUrl: "https://example.com",
    sourceUrl: "https://github.com",
    date: "Nov 2024",
    role: "Frontend Developer",
  },
  {
    id: 4,
    title: "Task Manager SaaS",
    cat: "Full Stack",
    desc: "Kanban boards, Gantt charts, and team collaboration tools.",
    longDesc:
      "A comprehensive project management SaaS with Kanban boards, Gantt charts, time tracking, team collaboration, and detailed analytics. Supports unlimited projects with role-based access control and real-time updates.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS", "React DnD"],
    emoji: "📋",
    color: "#f59e0b",
    cardBg: "rgba(245,158,11,0.1)",
    stats: [
      { icon: "👥", label: "Teams", val: "200+" },
      { icon: "📋", label: "Tasks/mo", val: "8K+" },
      { icon: "⭐", label: "Rating", val: "4.8" },
    ],
    features: [
      "Drag & drop Kanban board",
      "Gantt chart view",
      "Time tracking & reports",
      "Role-based access control",
      "Real-time collaboration",
    ],
    liveUrl: "https://example.com",
    sourceUrl: "https://github.com",
    date: "Oct 2024",
    role: "Full Stack Developer",
  },
  {
    id: 5,
    title: "REST API Builder",
    cat: "Backend",
    desc: "Auto-generate REST APIs from database schemas with built-in auth.",
    longDesc:
      "A powerful tool that auto-generates production-ready REST APIs from your database schema. Includes JWT authentication, rate limiting, API documentation, input validation, and supports MongoDB and PostgreSQL.",
    tech: ["Node.js", "Express", "MongoDB", "PostgreSQL", "JWT", "Swagger"],
    emoji: "⚙️",
    color: "#ec4899",
    cardBg: "rgba(236,72,153,0.1)",
    stats: [
      { icon: "🔌", label: "Endpoints", val: "Auto" },
      { icon: "🔒", label: "Auth", val: "JWT" },
      { icon: "📄", label: "Docs", val: "Swagger" },
    ],
    features: [
      "Auto-generate endpoints",
      "JWT authentication",
      "Rate limiting built-in",
      "Swagger auto-documentation",
      "Input validation & sanitization",
    ],
    liveUrl: "https://example.com",
    sourceUrl: "https://github.com",
    date: "Sep 2024",
    role: "Backend Developer",
  },
  {
    id: 6,
    title: "Weather Dashboard",
    cat: "Frontend",
    desc: "Beautiful weather app with D3.js charts and live map integration.",
    longDesc:
      "An interactive weather platform with 15-day forecasts, D3.js powered charts, Mapbox integration, severe weather alerts, and hourly breakdowns. Supports 50+ cities with live data updates every 10 minutes.",
    tech: ["React", "D3.js", "Mapbox", "Weather API", "Tailwind CSS"],
    emoji: "🌤️",
    color: "#38bdf8",
    cardBg: "rgba(56,189,248,0.1)",
    stats: [
      { icon: "🏙️", label: "Cities", val: "50+" },
      { icon: "📅", label: "Forecast", val: "15-day" },
      { icon: "🔄", label: "Updates", val: "Live" },
    ],
    features: [
      "15-day weather forecast",
      "D3.js interactive charts",
      "Mapbox live maps",
      "Severe weather alerts",
      "Hourly breakdown view",
    ],
    liveUrl: "https://example.com",
    sourceUrl: "https://github.com",
    date: "Aug 2024",
    role: "Frontend Developer",
  },
];

/* ── Stagger container variants ── */
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3 } },
};

/* ══════════════════════════════
   PROJECT CARD
══════════════════════════════ */
function ProjectCard({ p, onOpen }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hovered"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="rounded-2xl overflow-hidden flex flex-col relative"
      style={{
        background: "var(--card)",
        border: `1.5px solid ${hovered ? p.color + "55" : "var(--border)"}`,
        boxShadow: hovered
          ? `0 20px 50px ${p.color}22, 0 8px 24px rgba(0,0,0,0.1)`
          : "var(--shadow-md)",
        transform: hovered ? "translateY(-8px)" : "translateY(0px)",
        transition:
          "transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s ease, border-color 0.3s ease",
        cursor: "pointer",
      }}
    >
      {/* ── Top colored line that grows on hover ── */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 z-10"
        style={{
          background: `linear-gradient(90deg, ${p.color}, ${p.color}88)`,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.4s cubic-bezier(.22,1,.36,1)",
        }}
      />

      {/* ── IMAGE AREA ── */}
      <div
        className="h-48 flex items-center justify-center relative overflow-hidden flex-shrink-0"
        style={{
          background: hovered ? `${p.color}14` : p.cardBg,
          transition: "background 0.4s ease",
        }}
      >
        {/* Watercolor blobs */}
        <motion.div
          className="blob absolute w-36 h-28 top-2 left-4"
          style={{ background: "var(--wc-pink)" }}
          animate={{ opacity: hovered ? 1 : 0.6, scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
        />
        <motion.div
          className="blob absolute w-32 h-24 bottom-2 right-6"
          style={{ background: "var(--wc-blue)" }}
          animate={{ opacity: hovered ? 0.9 : 0.5, scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        />

        {/* Emoji — scales and rotates slightly on hover */}
        <motion.span
          className="relative z-10 select-none"
          animate={{
            scale: hovered ? 1.18 : 1,
            rotate: hovered ? [0, -8, 8, -4, 0] : 0,
            y: hovered ? -4 : 0,
          }}
          transition={{
            scale: { duration: 0.35, ease: "backOut" },
            rotate: { duration: 0.5, ease: "easeInOut" },
            y: { duration: 0.35, ease: "easeOut" },
          }}
          style={{
            fontSize: "64px",
            filter: hovered ? `drop-shadow(0 8px 16px ${p.color}55)` : "none",
          }}
        >
          {p.emoji}
        </motion.span>

        {/* Category badge */}
        <motion.span
          className="absolute top-3 right-3 text-xs font-bold font-display px-3 py-1 rounded-full"
          animate={{
            background: hovered ? `${p.color}30` : `${p.color}15`,
            scale: hovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.25 }}
          style={{ color: p.color, border: `1px solid ${p.color}40` }}
        >
          {p.cat}
        </motion.span>

        {/* Hover overlay — subtle glow */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle at center, ${p.color}10 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* ── CARD BODY ── */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <motion.h3
          className="font-display font-bold text-base mb-2"
          animate={{ color: hovered ? p.color : "var(--ink)" }}
          transition={{ duration: 0.25 }}
        >
          {p.title}
        </motion.h3>

        <p
          className="text-xs leading-relaxed mb-4 flex-1"
          style={{ color: "var(--muted)" }}
        >
          {p.desc}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.tech.slice(0, 3).map((t, idx) => (
            <motion.span
              key={t}
              className="text-xs px-2.5 py-1 rounded-lg font-medium"
              animate={{
                background: hovered ? `${p.color}12` : "var(--bg-soft)",
                color: hovered ? p.color : "var(--muted)",
                borderColor: hovered ? `${p.color}35` : "var(--border)",
              }}
              transition={{ duration: 0.25, delay: idx * 0.04 }}
              style={{ border: "1px solid" }}
            >
              {t}
            </motion.span>
          ))}
          {p.tech.length > 3 && (
            <span
              className="text-xs px-2.5 py-1 rounded-lg font-medium"
              style={{
                background: `${p.color}12`,
                color: p.color,
                border: `1px solid ${p.color}30`,
              }}
            >
              +{p.tech.length - 3}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {/* See Details */}
          <motion.button
            onClick={() => onOpen(p)}
            className="flex-1 py-2.5 rounded-xl text-xs font-bold font-display flex items-center justify-center gap-1.5 overflow-hidden relative"
            style={{
              background: "var(--orange)",
              color: "#fff",
              border: "none",
              boxShadow: hovered
                ? "0 6px 20px rgba(255,107,43,0.4)"
                : "0 4px 14px rgba(255,107,43,0.2)",
              transition: "box-shadow 0.3s ease",
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {/* Shimmer on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)",
              }}
              animate={hovered ? { x: ["-100%", "200%"] } : { x: "-100%" }}
              transition={{
                duration: 0.7,
                ease: "easeInOut",
                repeat: hovered ? Infinity : 0,
                repeatDelay: 1.2,
              }}
            />
            <span className="relative z-10">See Details</span>
            <motion.span
              className="relative z-10"
              animate={{ x: hovered ? 3 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <FiArrowRight size={12} />
            </motion.span>
          </motion.button>

          {/* Live Demo */}
          <motion.a
            href={p.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2.5 rounded-xl text-xs font-bold font-display flex items-center gap-1.5"
            style={{
              background: "transparent",
              color: p.color,
              border: `1.5px solid ${p.color}45`,
              textDecoration: "none",
            }}
            whileHover={{
              scale: 1.06,
              backgroundColor: `${p.color}15`,
              boxShadow: `0 4px 14px ${p.color}25`,
            }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.2 }}
          >
            <FiExternalLink size={12} />
            <span>Demo</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════
   MODAL
══════════════════════════════ */
function ProjectModal({ project: p, onClose }) {
  return (
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.88, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 40 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl relative"
        style={{
          background: "var(--card)",
          border: `1px solid ${p.color}30`,
          boxShadow: `0 32px 80px rgba(0,0,0,0.3), 0 0 0 1px ${p.color}15`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── BANNER ── */}
        <div
          className="relative h-56 flex items-center justify-center overflow-hidden rounded-t-3xl"
          style={{
            background: `linear-gradient(135deg, ${p.cardBg}, ${p.color}18)`,
          }}
        >
          {/* Animated watercolor blobs */}
          {[
            {
              w: "190px",
              h: "150px",
              t: "4px",
              l: "20px",
              c: "var(--wc-pink)",
              delay: 0,
            },
            {
              w: "160px",
              h: "130px",
              b: "0",
              r: "28px",
              c: "var(--wc-blue)",
              delay: 0.1,
            },
            {
              w: "140px",
              h: "110px",
              t: "20px",
              r: "96px",
              c: "var(--wc-yellow)",
              delay: 0.18,
            },
          ].map((b, i) => (
            <motion.div
              key={i}
              className="blob absolute"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 0.9, scale: 1 }}
              transition={{ delay: b.delay, duration: 0.6, ease: "backOut" }}
              style={{
                width: b.w,
                height: b.h,
                top: b.t,
                left: b.l,
                bottom: b.b,
                right: b.r,
                background: b.c,
              }}
            />
          ))}

          {/* Big emoji */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0, rotate: -15 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
            style={{
              fontSize: "96px",
              filter: `drop-shadow(0 12px 28px ${p.color}44)`,
            }}
          >
            {p.emoji}
          </motion.div>

          {/* Category */}
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="absolute top-4 left-5 text-xs font-bold font-display px-3 py-1.5 rounded-full"
            style={{
              background: `${p.color}22`,
              color: p.color,
              border: `1px solid ${p.color}45`,
            }}
          >
            {p.cat}
          </motion.span>

          {/* Close */}
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{
              scale: 1.12,
              rotate: 90,
              backgroundColor: "var(--orange-pale)",
            }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center border z-20"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--muted)",
            }}
          >
            <FiX size={17} />
          </motion.button>
        </div>

        {/* ── CONTENT ── */}
        <div className="p-7">
          {/* Title + meta */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mb-6"
          >
            <h2
              className="font-display font-bold text-2xl mb-3"
              style={{ color: "var(--ink)" }}
            >
              {p.title}
            </h2>
            <div className="flex flex-wrap gap-4">
              <div
                className="flex items-center gap-1.5 text-xs"
                style={{ color: "var(--muted)" }}
              >
                <FiCalendar size={12} style={{ color: p.color }} />
                {p.date}
              </div>
              <div
                className="flex items-center gap-1.5 text-xs"
                style={{ color: "var(--muted)" }}
              >
                <FiUsers size={12} style={{ color: p.color }} />
                {p.role}
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-7">
            {p.stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.22 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ scale: 1.06, transition: { duration: 0.2 } }}
                className="text-center py-3 px-2 rounded-xl border cursor-default"
                style={{
                  background: `${p.color}0e`,
                  borderColor: `${p.color}28`,
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.3 + i * 0.08,
                    type: "spring",
                    stiffness: 300,
                  }}
                  style={{ fontSize: "22px", marginBottom: "4px" }}
                >
                  {s.icon}
                </motion.div>
                <div
                  className="font-display font-bold text-base leading-none"
                  style={{ color: p.color }}
                >
                  {s.val}
                </div>
                <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <h4
              className="font-display font-bold text-sm mb-2.5"
              style={{ color: "var(--ink)" }}
            >
              About this project
            </h4>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              {p.longDesc}
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-6"
          >
            <h4
              className="font-display font-bold text-sm mb-3"
              style={{ color: "var(--ink)" }}
            >
              Key Features
            </h4>
            <div className="space-y-2.5">
              {p.features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.38 + i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "var(--ink2)" }}
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.4 + i * 0.07,
                      type: "spring",
                      stiffness: 400,
                    }}
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                    style={{ background: `${p.color}20`, color: p.color }}
                  >
                    ✓
                  </motion.span>
                  {f}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tech stack */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42 }}
            className="mb-7"
          >
            <h4
              className="font-display font-bold text-sm mb-3"
              style={{ color: "var(--ink)" }}
            >
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {p.tech.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.44 + i * 0.05,
                    type: "spring",
                    stiffness: 350,
                  }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="text-xs px-3 py-1.5 rounded-xl font-semibold font-display cursor-default"
                  style={{
                    background: `${p.color}12`,
                    color: p.color,
                    border: `1px solid ${p.color}30`,
                  }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48 }}
            className="flex gap-3"
          >
            <motion.a
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3.5 rounded-xl text-sm font-bold font-display flex items-center justify-center gap-2 relative overflow-hidden"
              style={{
                background: "var(--orange)",
                color: "#fff",
                textDecoration: "none",
                boxShadow: "0 6px 22px rgba(255,107,43,0.32)",
              }}
              whileHover={{
                scale: 1.03,
                y: -2,
                boxShadow: "0 10px 30px rgba(255,107,43,0.45)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              <FiExternalLink size={15} />
              Live Demo
            </motion.a>

            <motion.a
              href={p.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3.5 rounded-xl text-sm font-bold font-display flex items-center justify-center gap-2 border"
              style={{
                background: "transparent",
                color: "var(--ink)",
                borderColor: "var(--border)",
                textDecoration: "none",
              }}
              whileHover={{
                scale: 1.03,
                y: -2,
                borderColor: p.color,
                color: p.color,
                backgroundColor: `${p.color}10`,
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <FiGithub size={15} />
              Source Code
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════
   FILTER BUTTON with animation
══════════════════════════════ */
function FilterBtn({ cat, active, onClick }) {
  return (
    <motion.button
      onClick={() => onClick(cat)}
      className="relative px-5 py-2 rounded-full text-sm font-bold font-display overflow-hidden"
      animate={{
        color: active ? "#fff" : "var(--muted)",
      }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.2 }}
    >
      {/* Active pill bg */}
      <AnimatePresence>
        {active && (
          <motion.span
            layoutId="filter-active"
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: "var(--orange)",
              boxShadow: "0 4px 14px rgba(255,107,43,0.35)",
            }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          />
        )}
      </AnimatePresence>
      {/* Hover bg for inactive */}
      {!active && (
        <motion.span
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{ background: "var(--orange-pale)" }}
        />
      )}
      <span className="relative z-10">{cat}</span>
    </motion.button>
  );
}

/* ══════════════════════════════
   MAIN EXPORT
══════════════════════════════ */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });

  const openModal = (p) => {
    setSelectedProject(p);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "";
  };

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.cat === activeFilter);

  return (
    <>
      <section
        id="projects"
        className="py-24 relative overflow-hidden"
        style={{ background: "var(--bg-soft)" }}
        ref={ref}
      >
        {/* Watercolor blobs */}
        <div className="absolute top-0 right-0 w-[420px] h-[320px] pointer-events-none">
          <div
            className="blob absolute w-[210px] h-[170px] top-8  right-8"
            style={{ background: "var(--wc-purple)", opacity: 1 }}
          />
          <div
            className="blob absolute w-[180px] h-[140px] top-24 right-32"
            style={{ background: "var(--wc-blue)", opacity: 1 }}
          />
        </div>
        <div className="absolute bottom-0 left-0 w-[320px] h-[240px] pointer-events-none">
          <div
            className="blob absolute w-[170px] h-[140px] bottom-6  left-8"
            style={{ background: "var(--wc-green)", opacity: 1 }}
          />
          <div
            className="blob absolute w-[140px] h-[115px] bottom-18 left-22"
            style={{ background: "var(--wc-yellow)", opacity: 1 }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="sec-tag"
            >
              Portfolio
            </motion.div>
            <h2
              className="font-display font-bold mb-4"
              style={{ fontSize: "clamp(28px,4vw,44px)", color: "var(--ink)" }}
            >
              My Amazing Works
            </h2>
            <p
              className="text-sm max-w-md mx-auto"
              style={{ color: "var(--muted)" }}
            >
              A curated selection of projects that showcase my skills across
              different technologies.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((cat) => (
              <FilterBtn
                key={cat}
                cat={cat}
                active={activeFilter === cat}
                onClick={setActiveFilter}
              />
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              variants={gridVariants}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((p) => (
                <ProjectCard key={p.id} p={p} onOpen={openModal} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeModal} />
        )}
      </AnimatePresence>
    </>
  );
}
