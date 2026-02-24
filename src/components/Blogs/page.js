"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const posts = [
  {
    title: "Building Scalable APIs with Node.js and Express",
    excerpt:
      "A deep dive into building production-ready REST APIs with proper error handling, rate limiting, and authentication.",
    tag: "Backend",
    date: "Jan 15, 2025",
    readTime: "8 min read",
    color: "#818cf8",
    emoji: "⚙️",
  },
  {
    title: "Mastering React Server Components in Next.js 14",
    excerpt:
      "Everything you need to know about RSC, streaming, and the app router to build blazing-fast Next.js applications.",
    tag: "Frontend",
    date: "Feb 3, 2025",
    readTime: "12 min read",
    color: "#34d399",
    emoji: "⚛️",
  },
  {
    title: "Database Design Patterns for Modern Web Apps",
    excerpt:
      "Comparing SQL vs NoSQL trade-offs, indexing strategies, and when to use Redis caching effectively.",
    tag: "Database",
    date: "Feb 18, 2025",
    readTime: "10 min read",
    color: "#f472b6",
    emoji: "🗄️",
  },
];

export default function Blog() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section
      id="blog"
      className="py-28"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-4"
        >
          <div>
            <div className="section-label">Blog</div>
            <h2
              className="font-syne font-bold"
              style={{ fontSize: "clamp(30px, 4vw, 52px)" }}
            >
              Latest <span className="grad-text">articles</span>
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 rounded-xl text-sm font-semibold glass border"
            style={{
              color: "var(--accent)",
              borderColor: "rgba(129,140,248,0.25)",
            }}
          >
            View All Posts →
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="glass rounded-2xl p-7 cursor-pointer group flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <span
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                  style={{
                    background: `${post.color}15`,
                    border: `1px solid ${post.color}30`,
                    color: post.color,
                  }}
                >
                  {post.tag}
                </span>
                <span className="text-2xl">{post.emoji}</span>
              </div>

              <h3
                className="font-syne font-bold text-base mb-3 leading-snug group-hover:text-accent transition-colors"
                style={{ color: "var(--light)" }}
              >
                {post.title}
              </h3>
              <p
                className="text-sm leading-relaxed mb-6 flex-1"
                style={{ color: "var(--muted)" }}
              >
                {post.excerpt}
              </p>

              <div
                className="flex items-center justify-between pt-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="text-xs" style={{ color: "var(--muted)" }}>
                  {post.date}
                </span>
                <span className="text-xs" style={{ color: "var(--muted)" }}>
                  {post.readTime}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
