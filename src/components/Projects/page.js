"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiX,
  FiExternalLink,
  FiGithub,
  FiCalendar,
  FiUsers,
  FiStar,
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
    cardBg: "rgba(129,140,248,0.08)",
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
    cardBg: "rgba(255,107,43,0.08)",
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
    cardBg: "rgba(52,211,153,0.08)",
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
    cardBg: "rgba(245,158,11,0.08)",
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
    cardBg: "rgba(236,72,153,0.08)",
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
    cardBg: "rgba(56,189,248,0.08)",
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

/* ══════════════════════════════
   PROJECT CARD
══════════════════════════════ */
function ProjectCard({ p, i, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="rounded-2xl overflow-hidden border cursor-pointer group flex flex-col"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      {/* Image area */}
      <div
        className="h-44 flex items-center justify-center relative overflow-hidden flex-shrink-0"
        style={{ background: p.cardBg }}
      >
        <div
          className="blob absolute w-32 h-24 top-2 left-4"
          style={{ background: "var(--wc-pink)", opacity: 0.9 }}
        />
        <div
          className="blob absolute w-28 h-20 bottom-2 right-6"
          style={{ background: "var(--wc-blue)", opacity: 0.8 }}
        />

        <span
          className="relative z-10 transition-transform group-hover:scale-110 duration-300"
          style={{ fontSize: "62px" }}
        >
          {p.emoji}
        </span>

        <span
          className="absolute top-3 right-3 text-xs font-bold font-display px-3 py-1 rounded-full"
          style={{
            background: `${p.color}18`,
            color: p.color,
            border: `1px solid ${p.color}35`,
          }}
        >
          {p.cat}
        </span>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-display font-bold text-base mb-2"
          style={{ color: "var(--ink)" }}
        >
          {p.title}
        </h3>
        <p
          className="text-xs leading-relaxed mb-4 flex-1"
          style={{ color: "var(--muted)" }}
        >
          {p.desc}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded-lg font-medium"
              style={{
                background: "var(--bg-soft)",
                color: "var(--muted)",
                border: "1px solid var(--border)",
              }}
            >
              {t}
            </span>
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

        {/* Buttons */}
        <div className="flex gap-2">
          {/* See Details */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onOpen(p)}
            className="flex-1 py-2.5 rounded-xl text-xs font-bold font-display transition-all flex items-center justify-center gap-1.5"
            style={{
              background: "var(--orange)",
              color: "#fff",
              border: "none",
              boxShadow: "0 4px 14px rgba(255,107,43,0.25)",
            }}
          >
            See Details
            <span style={{ fontSize: "11px" }}>→</span>
          </motion.button>

          {/* Live Demo */}
          <motion.a
            href={p.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-3 py-2.5 rounded-xl text-xs font-bold font-display border flex items-center gap-1"
            style={{
              background: `${p.color}12`,
              color: p.color,
              border: `1.5px solid ${p.color}40`,
            }}
          >
            <FiExternalLink size={12} />
            Demo
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════
   MODAL
══════════════════════════════ */
function ProjectModal({ project, onClose }) {
  if (!project) return null;
  const p = project;

  return (
    <AnimatePresence>
      <motion.div
        key="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      >
        <motion.div
          key="modal-box"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl relative"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── TOP BANNER ── */}
          <div
            className="relative h-52 flex items-center justify-center overflow-hidden rounded-t-3xl"
            style={{ background: p.cardBg }}
          >
            {/* Watercolor blobs in banner */}
            <div
              className="blob absolute w-48 h-36 top-2 left-6"
              style={{ background: "var(--wc-pink)", opacity: 0.85 }}
            />
            <div
              className="blob absolute w-40 h-32 bottom-0 right-8"
              style={{ background: "var(--wc-blue)", opacity: 0.75 }}
            />
            <div
              className="blob absolute w-36 h-28 top-8 right-24"
              style={{ background: "var(--wc-yellow)", opacity: 0.7 }}
            />

            {/* Emoji */}
            <motion.span
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative z-10"
              style={{
                fontSize: "90px",
                filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.15))",
              }}
            >
              {p.emoji}
            </motion.span>

            {/* Category badge */}
            <span
              className="absolute top-4 left-5 text-xs font-bold font-display px-3 py-1.5 rounded-full"
              style={{
                background: `${p.color}20`,
                color: p.color,
                border: `1px solid ${p.color}40`,
              }}
            >
              {p.cat}
            </span>

            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
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
            <div className="mb-5">
              <h2
                className="font-display font-bold text-2xl mb-2"
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
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {p.stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                  className="text-center py-3 px-2 rounded-xl border"
                  style={{
                    background: `${p.color}0d`,
                    borderColor: `${p.color}25`,
                  }}
                >
                  <div style={{ fontSize: "20px", marginBottom: "4px" }}>
                    {s.icon}
                  </div>
                  <div
                    className="font-display font-bold text-base leading-none"
                    style={{ color: p.color }}
                  >
                    {s.val}
                  </div>
                  <div
                    className="text-xs mt-1"
                    style={{ color: "var(--muted)" }}
                  >
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h4
                className="font-display font-bold text-sm mb-2"
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
            </div>

            {/* Features */}
            <div className="mb-6">
              <h4
                className="font-display font-bold text-sm mb-3"
                style={{ color: "var(--ink)" }}
              >
                Key Features
              </h4>
              <div className="space-y-2">
                {p.features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.06 }}
                    className="flex items-center gap-2.5 text-sm"
                    style={{ color: "var(--ink2)" }}
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
                      style={{ background: `${p.color}18`, color: p.color }}
                    >
                      ✓
                    </span>
                    {f}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tech stack */}
            <div className="mb-7">
              <h4
                className="font-display font-bold text-sm mb-3"
                style={{ color: "var(--ink)" }}
              >
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1.5 rounded-xl font-semibold font-display"
                    style={{
                      background: `${p.color}12`,
                      color: p.color,
                      border: `1px solid ${p.color}30`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <motion.a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 py-3.5 rounded-xl text-sm font-bold font-display flex items-center justify-center gap-2"
                style={{
                  background: "var(--orange)",
                  color: "#fff",
                  textDecoration: "none",
                  boxShadow: "0 6px 22px rgba(255,107,43,0.32)",
                }}
              >
                <FiExternalLink size={15} />
                Live Demo
              </motion.a>

              <motion.a
                href={p.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 py-3.5 rounded-xl text-sm font-bold font-display flex items-center justify-center gap-2 border"
                style={{
                  background: "transparent",
                  color: "var(--ink)",
                  borderColor: "var(--border)",
                  textDecoration: "none",
                }}
              >
                <FiGithub size={15} />
                Source Code
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ══════════════════════════════
   MAIN EXPORT
══════════════════════════════ */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  // Lock body scroll when modal open
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
        <div className="absolute top-0 right-0 w-[400px] h-[300px] pointer-events-none">
          <div
            className="blob absolute w-[200px] h-[160px] top-8  right-8"
            style={{ background: "var(--wc-purple)", opacity: 1 }}
          />
          <div
            className="blob absolute w-[170px] h-[130px] top-20 right-28"
            style={{ background: "var(--wc-blue)", opacity: 1 }}
          />
        </div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[220px] pointer-events-none">
          <div
            className="blob absolute w-[160px] h-[130px] bottom-6  left-8"
            style={{ background: "var(--wc-green)", opacity: 1 }}
          />
          <div
            className="blob absolute w-[130px] h-[110px] bottom-16 left-20"
            style={{ background: "var(--wc-yellow)", opacity: 1 }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="sec-tag">Portfolio</div>
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
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                className="filter-btn"
                style={
                  activeFilter === cat
                    ? {
                        background: "var(--orange)",
                        color: "#fff",
                        boxShadow: "0 4px 14px rgba(255,107,43,0.3)",
                      }
                    : {}
                }
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((p, i) => (
                <ProjectCard key={p.id} p={p} i={i} onOpen={openModal} />
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
