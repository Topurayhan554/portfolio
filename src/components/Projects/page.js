"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const categories = ["All", "Full Stack", "Frontend", "Backend", "Mobile"];

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    cat: "Full Stack",
    desc: "Full-stack shopping platform with Stripe payments and admin dashboard.",
    tech: ["Next.js", "Node.js", "MongoDB"],
    emoji: "🛒",
    color: "#818cf8",
    bg: "linear-gradient(135deg,rgba(129,140,248,0.15),rgba(129,140,248,0.05))",
  },
  {
    id: 2,
    title: "AI Chat App",
    cat: "Full Stack",
    desc: "Real-time AI-powered chat with GPT-4 and WebSocket support.",
    tech: ["React", "Socket.io", "OpenAI"],
    emoji: "🤖",
    color: "var(--orange)",
    bg: "linear-gradient(135deg,rgba(255,107,43,0.12),rgba(255,107,43,0.04))",
  },
  {
    id: 3,
    title: "Portfolio CMS",
    cat: "Frontend",
    desc: "Headless CMS with live preview, custom themes, and SEO tools.",
    tech: ["Next.js", "Sanity.io", "Tailwind"],
    emoji: "🎨",
    color: "#34d399",
    bg: "linear-gradient(135deg,rgba(52,211,153,0.12),rgba(52,211,153,0.04))",
  },
  {
    id: 4,
    title: "Task Manager SaaS",
    cat: "Full Stack",
    desc: "Kanban boards, Gantt charts, and team collaboration tools.",
    tech: ["Next.js", "Prisma", "PostgreSQL"],
    emoji: "📋",
    color: "#f59e0b",
    bg: "linear-gradient(135deg,rgba(245,158,11,0.12),rgba(245,158,11,0.04))",
  },
  {
    id: 5,
    title: "REST API Builder",
    cat: "Backend",
    desc: "Auto-generate REST APIs from database schemas with auth.",
    tech: ["Node.js", "Express", "MongoDB"],
    emoji: "⚙️",
    color: "#ec4899",
    bg: "linear-gradient(135deg,rgba(236,72,153,0.12),rgba(236,72,153,0.04))",
  },
  {
    id: 6,
    title: "Weather Dashboard",
    cat: "Frontend",
    desc: "Beautiful weather app with D3.js charts and map integration.",
    tech: ["React", "D3.js", "Mapbox"],
    emoji: "🌤️",
    color: "#38bdf8",
    bg: "linear-gradient(135deg,rgba(56,189,248,0.12),rgba(56,189,248,0.04))",
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.cat === activeFilter);

  return (
    <section
      id="projects"
      className="py-24 relative overflow-hidden"
      style={{ background: "var(--soft)" }}
      ref={ref}
    >
      {/* Watercolor */}
      <div className="absolute top-0 right-0 w-[400px] h-[300px] pointer-events-none">
        <div
          className="blob absolute w-[200px] h-[160px] top-8 right-8"
          style={{ background: "var(--wc-purple)", opacity: 0.2 }}
        />
        <div
          className="blob absolute w-[170px] h-[130px] top-20 right-28"
          style={{ background: "var(--wc-blue)", opacity: 0.18 }}
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
                      boxShadow: "0 4px 14px rgba(255,107,43,0.28)",
                    }
                  : {}
              }
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
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
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="rounded-2xl overflow-hidden border cursor-pointer group"
                style={{
                  borderColor: "var(--border)",
                  background: "#fff",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                }}
              >
                {/* Image area */}
                <div
                  className="h-44 flex items-center justify-center relative overflow-hidden"
                  style={{ background: p.bg }}
                >
                  {/* Watercolor blob in card */}
                  <div
                    className="blob absolute w-32 h-24 top-2 left-4"
                    style={{ background: "var(--wc-pink)", opacity: 0.25 }}
                  />
                  <div
                    className="blob absolute w-28 h-20 bottom-2 right-6"
                    style={{ background: "var(--wc-blue)", opacity: 0.2 }}
                  />
                  <span
                    className="relative z-10 transition-transform group-hover:scale-110 duration-300"
                    style={{ fontSize: "64px" }}
                  >
                    {p.emoji}
                  </span>
                  <span
                    className="absolute top-3 right-3 text-xs font-bold font-display px-3 py-1 rounded-full"
                    style={{
                      background: `${p.color}18`,
                      color: p.color,
                      border: `1px solid ${p.color}30`,
                    }}
                  >
                    {p.cat}
                  </span>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3
                    className="font-display font-bold text-base mb-2"
                    style={{ color: "var(--ink)" }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed mb-4"
                    style={{ color: "var(--muted)" }}
                  >
                    {p.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-lg font-medium font-body"
                        style={{
                          background: "var(--soft)",
                          color: "var(--muted)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="flex-1 py-2 rounded-xl text-xs font-bold font-display transition-all"
                      style={{
                        background: `${p.color}15`,
                        color: p.color,
                        border: `1px solid ${p.color}30`,
                      }}
                    >
                      Live Demo ↗
                    </button>
                    <button
                      className="flex-1 py-2 rounded-xl text-xs font-bold font-display transition-all border"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--muted)",
                      }}
                    >
                      GitHub →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
