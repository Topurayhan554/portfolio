"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const cards = [
  {
    icon: "🎓",
    title: "Education",
    desc: "B.Sc. in Computer Science & Engineering. Strong foundation in algorithms, data structures, and software design.",
    color: "#818cf8",
  },
  {
    icon: "💼",
    title: "Experience",
    desc: "3+ years building scalable web apps. Collaborated with startups and established companies across e-commerce, SaaS, and fintech.",
    color: "#34d399",
  },
  {
    icon: "🌍",
    title: "Location",
    desc: "Based in Dhaka, Bangladesh. Open to remote opportunities worldwide and on-site collaborations.",
    color: "#f472b6",
  },
  {
    icon: "🎯",
    title: "Philosophy",
    desc: "I believe great software is a blend of clean code, thoughtful UX, and measurable business impact.",
    color: "#fbbf24",
  },
];

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      id="about"
      className="py-28"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="section-label">About Me</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2
              className="font-syne font-bold"
              style={{ fontSize: "clamp(30px, 4vw, 52px)" }}
            >
              Passionate about <span className="grad-text">building</span>
              <br />
              great experiences
            </h2>
            <p
              className="max-w-md text-sm leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              I'm a full stack developer who loves crafting elegant solutions.
              When I'm not coding, I'm exploring new technologies, contributing
              to open source, or writing about web development.
            </p>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="glass rounded-2xl p-6 cursor-default group"
              style={{ borderColor: "rgba(255,255,255,0.05)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform group-hover:scale-110"
                style={{
                  background: `${card.color}18`,
                  border: `1px solid ${card.color}30`,
                }}
              >
                {card.icon}
              </div>
              <h3
                className="font-syne font-bold text-base mb-2"
                style={{ color: card.color }}
              >
                {card.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom strip — fun facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="glass rounded-2xl p-8"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { n: "3+", l: "Years of Experience" },
              { n: "25+", l: "Projects Completed" },
              { n: "15+", l: "Happy Clients" },
              { n: "∞", l: "Lines of Code" },
            ].map(({ n, l }) => (
              <div key={l}>
                <div className="font-syne font-bold text-4xl mb-1 grad-text">
                  {n}
                </div>
                <div className="text-sm" style={{ color: "var(--muted)" }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
