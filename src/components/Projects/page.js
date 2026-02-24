"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Full Stack",
    desc: "A high-performance e-commerce platform with real-time inventory, Stripe payment integration, admin dashboard, and PWA support. Handles 1000+ concurrent users.",
    tech: ["Next.js", "Node.js", "MongoDB", "Stripe", "Redis"],
    color: "#818cf8",
    bg: "from-[#818cf8]/10 to-[#818cf8]/5",
    emoji: "🛒",
    live: "#",
    github: "#",
    stats: [
      ["12K", "Users"],
      ["99.9%", "Uptime"],
      ["1.2s", "Load Time"],
    ],
  },
  {
    id: 2,
    title: "AI Chat Application",
    category: "AI / Real-time",
    desc: "Real-time AI-powered chat app with multi-room support, message history, file sharing, and GPT-4 integration. Built with WebSocket for instant messaging.",
    tech: ["React", "Socket.io", "OpenAI API", "Redis", "Docker"],
    color: "#34d399",
    bg: "from-[#34d399]/10 to-[#34d399]/5",
    emoji: "🤖",
    live: "#",
    github: "#",
    stats: [
      ["5K", "Messages/day"],
      ["< 50ms", "Latency"],
      ["GPT-4", "Powered"],
    ],
  },
  {
    id: 3,
    title: "Task Management SaaS",
    category: "SaaS",
    desc: "Kanban-style project management with team collaboration, drag & drop, Gantt charts, time tracking, and detailed analytics dashboard.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Tailwind", "Framer Motion"],
    color: "#f472b6",
    bg: "from-[#f472b6]/10 to-[#f472b6]/5",
    emoji: "📋",
    live: "#",
    github: "#",
    stats: [
      ["200+", "Teams"],
      ["8K", "Tasks/mo"],
      ["4.9★", "Rating"],
    ],
  },
  {
    id: 4,
    title: "Weather Analytics Dashboard",
    category: "Data Viz",
    desc: "Interactive weather platform with 15-day forecasts, interactive maps, severe weather alerts, historical data analysis, and beautiful data visualizations.",
    tech: ["React", "D3.js", "Weather API", "Mapbox", "Chart.js"],
    color: "#fbbf24",
    bg: "from-[#fbbf24]/10 to-[#fbbf24]/5",
    emoji: "🌤️",
    live: "#",
    github: "#",
    stats: [
      ["50+", "Cities"],
      ["7-day", "Forecast"],
      ["Live", "Updates"],
    ],
  },
  {
    id: 5,
    title: "Portfolio CMS Platform",
    category: "CMS",
    desc: "Headless CMS for developer portfolios with live preview, custom themes, markdown editor, SEO optimization, and one-click Vercel deployment.",
    tech: ["Next.js", "Sanity.io", "Tailwind", "Vercel", "TypeScript"],
    color: "#60a5fa",
    bg: "from-[#60a5fa]/10 to-[#60a5fa]/5",
    emoji: "🎨",
    live: "#",
    github: "#",
    stats: [
      ["300+", "Portfolios"],
      ["10+", "Themes"],
      ["< 1s", "Deploy"],
    ],
  },
];

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const paginate = (dir) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + projects.length) % projects.length);
  };

  const project = projects[current];

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir > 0 ? -100 : 100, opacity: 0, scale: 0.95 }),
  };

  return (
    <section id="projects" className="py-28">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6"
        >
          <div>
            <div className="section-label">Projects</div>
            <h2
              className="font-syne font-bold"
              style={{ fontSize: "clamp(30px, 4vw, 52px)" }}
            >
              Featured <span className="grad-text">work</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm" style={{ color: "var(--muted)" }}>
              {String(current + 1).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(-1)}
                className="w-11 h-11 rounded-xl glass flex items-center justify-center text-lg transition-colors hover:border-accent"
                style={{ color: "var(--muted)" }}
              >
                ←
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(1)}
                className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-semibold"
                style={{
                  background: "linear-gradient(135deg, #818cf8, #34d399)",
                  color: "#07071a",
                }}
              >
                →
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Main carousel */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-3xl overflow-hidden mb-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left — visual */}
              <div
                className={`p-10 flex items-center justify-center bg-gradient-to-br ${project.bg} min-h-[300px] relative`}
              >
                <motion.div
                  initial={{ scale: 0.8, rotate: -5 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center"
                >
                  <div
                    className="text-[100px] mb-4"
                    style={{
                      filter: `drop-shadow(0 0 40px ${project.color}60)`,
                    }}
                  >
                    {project.emoji}
                  </div>
                  {/* Stats */}
                  <div className="flex gap-6 justify-center flex-wrap">
                    {project.stats.map(([val, label]) => (
                      <div key={label} className="text-center">
                        <div
                          className="font-syne font-bold text-xl"
                          style={{ color: project.color }}
                        >
                          {val}
                        </div>
                        <div
                          className="text-xs"
                          style={{ color: "var(--muted)" }}
                        >
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Category badge */}
                <div
                  className="absolute top-6 left-6 text-xs font-semibold px-3 py-1.5 rounded-lg"
                  style={{
                    background: `${project.color}20`,
                    color: project.color,
                    border: `1px solid ${project.color}30`,
                  }}
                >
                  {project.category}
                </div>
              </div>

              {/* Right — info */}
              <div className="p-10 flex flex-col justify-center">
                <h3
                  className="font-syne font-bold text-3xl mb-4"
                  style={{ color: "var(--light)" }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-7"
                  style={{ color: "var(--muted)" }}
                >
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1.5 rounded-lg font-medium"
                      style={{
                        background: `${project.color}12`,
                        border: `1px solid ${project.color}30`,
                        color: project.color,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <motion.a
                    href={project.live}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold text-center"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}, ${project.color}aa)`,
                      color: "#07071a",
                    }}
                  >
                    Live Demo ↗
                  </motion.a>
                  <motion.a
                    href={project.github}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold text-center glass text-center"
                    style={{ color: "var(--muted)" }}
                  >
                    GitHub →
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Thumbnail dots */}
        <div className="flex justify-center gap-3">
          {projects.map((p, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full transition-all"
              style={{
                width: i === current ? "32px" : "8px",
                height: "8px",
                background:
                  i === current
                    ? `linear-gradient(135deg, ${p.color}, ${p.color}88)`
                    : "rgba(255,255,255,0.15)",
                boxShadow: i === current ? `0 0 12px ${p.color}60` : "none",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
