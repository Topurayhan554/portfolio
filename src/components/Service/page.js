"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const services = [
  {
    icon: "🎯",
    title: "Pixel Perfect",
    desc: "I craft interfaces with meticulous attention to detail — every margin, shadow, and color is intentional and purposeful.",
    color: "#818cf8",
    bg: "rgba(129,140,248,0.1)",
    delay: 0,
  },
  {
    icon: "⚡",
    title: "High Performance",
    desc: "Lightning-fast applications built with optimized code, smart caching, and modern frameworks for the best user experience.",
    color: "var(--orange)",
    bg: "var(--orange-pale)",
    delay: 0.12,
  },
  {
    icon: "💡",
    title: "Creative Solutions",
    desc: "Every problem is unique. I bring creative thinking and proven engineering practices to deliver solutions that truly work.",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    delay: 0.24,
  },
];

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      id="services"
      className="py-24 relative overflow-hidden"
      style={{ background: "#fff" }}
      ref={ref}
    >
      {/* Watercolor accent top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none">
        <div
          className="blob absolute w-[300px] h-[120px] top-0 left-10"
          style={{ background: "var(--wc-blue)", opacity: 0.18 }}
        />
        <div
          className="blob absolute w-[260px] h-[100px] top-4 right-10"
          style={{ background: "var(--wc-purple)", opacity: 0.15 }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="sec-tag">What I Offer</div>
          <h2
            className="font-display font-bold"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "var(--ink)" }}
          >
            Services I Provide
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: s.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="text-center p-8 rounded-2xl border cursor-default"
              style={{
                borderColor: "var(--border)",
                background: "#fff",
                boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
              }}
            >
              {/* Icon circle */}
              <div
                className="icon-circle"
                style={{
                  background: s.bg,
                  boxShadow: `0 4px 20px ${s.color}22`,
                }}
              >
                <span style={{ fontSize: "28px" }}>{s.icon}</span>
              </div>

              <h3
                className="font-display font-bold text-lg mb-3"
                style={{ color: "var(--ink)" }}
              >
                {s.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                {s.desc}
              </p>

              {/* Bottom accent bar */}
              <div
                className="mt-6 mx-auto h-1 rounded-full"
                style={{
                  width: "40px",
                  background: s.color,
                  opacity: 0.5,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
