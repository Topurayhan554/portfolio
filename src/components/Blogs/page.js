"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const posts = [
  {
    tag: "Backend",
    emoji: "⚙️",
    tagColor: "#818cf8",
    title: "Building Scalable APIs with Node.js",
    excerpt:
      "Production-ready REST APIs with proper error handling, rate limiting, and JWT authentication.",
    date: "Jan 15, 2025",
    read: "8 min read",
  },
  {
    tag: "Frontend",
    emoji: "⚛️",
    tagColor: "var(--orange)",
    title: "React Server Components in Next.js 14",
    excerpt:
      "Everything about RSC, streaming, and the app router to build blazing-fast applications.",
    date: "Feb 3, 2025",
    read: "12 min read",
  },
  {
    tag: "Database",
    emoji: "🗄️",
    tagColor: "#34d399",
    title: "Database Design for Modern Web Apps",
    excerpt:
      "SQL vs NoSQL, indexing strategies, and Redis caching for peak performance.",
    date: "Feb 18, 2025",
    read: "10 min read",
  },
];

export default function Blog() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section
      id="blog"
      className="py-24 relative overflow-hidden"
      style={{ background: "var(--bg)" }}
      ref={ref}
    >
      {/* Watercolor */}
      <div className="absolute bottom-0 right-0 w-[360px] h-[260px] pointer-events-none">
        <div
          className="blob absolute w-[190px] h-[150px] bottom-6  right-8"
          style={{ background: "var(--wc-yellow)", opacity: 1 }}
        />
        <div
          className="blob absolute w-[160px] h-[130px] bottom-16 right-24"
          style={{ background: "var(--wc-coral)", opacity: 1 }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <div className="sec-tag">Blog</div>
            <h2
              className="font-display font-bold"
              style={{ fontSize: "clamp(28px,4vw,44px)", color: "var(--ink)" }}
            >
              Latest Articles
            </h2>
          </div>
          <button className="btn-orange-outline mt-4 md:mt-0 self-start">
            View All Posts →
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {posts.map((p, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="rounded-2xl border overflow-hidden cursor-pointer group"
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              {/* Color top bar */}
              <div
                className="h-1.5 w-full"
                style={{ background: p.tagColor }}
              />

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="text-xs font-bold font-display px-3 py-1 rounded-full"
                    style={{
                      background: `${p.tagColor}14`,
                      color: p.tagColor,
                      border: `1px solid ${p.tagColor}30`,
                    }}
                  >
                    {p.tag}
                  </span>
                  <span style={{ fontSize: "24px" }}>{p.emoji}</span>
                </div>

                <h3
                  className="font-display font-bold text-base leading-snug mb-3"
                  style={{ color: "var(--ink)" }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-xs leading-relaxed mb-5"
                  style={{ color: "var(--muted)" }}
                >
                  {p.excerpt}
                </p>

                <div
                  className="flex items-center justify-between pt-4"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <span className="text-xs" style={{ color: "var(--muted)" }}>
                    {p.date}
                  </span>
                  <span
                    className="text-xs font-semibold font-display"
                    style={{ color: p.tagColor }}
                  >
                    {p.read}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
