"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skills = [
  { name: "React / Next.js", level: 92, color: "#818cf8" },
  { name: "JavaScript / TypeScript", level: 88, color: "var(--orange)" },
  { name: "Node.js / Express", level: 84, color: "#34d399" },
  { name: "Tailwind CSS / SCSS", level: 94, color: "#38bdf8" },
  { name: "MongoDB / PostgreSQL", level: 78, color: "#f59e0b" },
  { name: "Docker / DevOps", level: 66, color: "#ec4899" },
];

const tools = [
  { name: "VS Code", icon: "📝", color: "#007acc" },
  { name: "Figma", icon: "🎨", color: "#f24e1e" },
  { name: "Git", icon: "⎇", color: "#f05032" },
  { name: "Docker", icon: "🐳", color: "#2496ed" },
  { name: "Postman", icon: "📬", color: "#ff6c37" },
  { name: "AWS", icon: "☁️", color: "#ff9900" },
  { name: "Vercel", icon: "△", color: "#818cf8" },
  { name: "Linux", icon: "🐧", color: "#fcc624" },
];

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section
      id="skills"
      className="py-24 relative overflow-hidden"
      style={{ background: "var(--bg)" }}
      ref={ref}
    >
      {/* Watercolor accents */}
      <div className="absolute top-0 left-0 w-[300px] h-[250px] pointer-events-none">
        <div
          className="blob absolute w-[180px] h-[140px] top-8  left-6"
          style={{ background: "var(--wc-green)", opacity: 1 }}
        />
        <div
          className="blob absolute w-[150px] h-[120px] top-20 left-20"
          style={{ background: "var(--wc-blue)", opacity: 1 }}
        />
      </div>
      <div className="absolute bottom-0 right-0 w-[280px] h-[200px] pointer-events-none">
        <div
          className="blob absolute w-[160px] h-[130px] bottom-6 right-8"
          style={{ background: "var(--wc-pink)", opacity: 1 }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="sec-tag">My Expertise</div>
          <h2
            className="font-display font-bold"
            style={{ fontSize: "clamp(28px,4vw,44px)", color: "var(--ink)" }}
          >
            Skills & Technologies
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Skill bars */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h3
              className="font-display font-bold text-lg mb-8"
              style={{ color: "var(--ink)" }}
            >
              Proficiency
            </h3>
            <div className="space-y-6">
              {skills.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span
                      className="text-sm font-semibold font-display"
                      style={{ color: "var(--ink2)" }}
                    >
                      {s.name}
                    </span>
                    <span
                      className="text-sm font-bold font-mono"
                      style={{ color: s.color }}
                    >
                      {s.level}%
                    </span>
                  </div>
                  <div className="skill-track">
                    <motion.div
                      className="skill-fill"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${s.level}%` } : {}}
                      transition={{
                        duration: 1.3,
                        delay: 0.1 + i * 0.1,
                        ease: "easeOut",
                      }}
                      style={{
                        background: `linear-gradient(90deg,${s.color},${s.color}99)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tools grid */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h3
              className="font-display font-bold text-lg mb-8"
              style={{ color: "var(--ink)" }}
            >
              Tools & Platforms
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {tools.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                  whileHover={{ y: -4, scale: 1.06 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border cursor-default text-center"
                  style={{
                    background: "var(--card)",
                    borderColor: "var(--border)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <span style={{ fontSize: "24px" }}>{t.icon}</span>
                  <span
                    className="text-xs font-semibold font-display"
                    style={{ color: "var(--muted)" }}
                  >
                    {t.name}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Tip box */}
            <div
              className="mt-8 p-5 rounded-2xl border"
              style={{
                background: "var(--orange-pale)",
                borderColor: "rgba(255,107,43,0.15)",
              }}
            >
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--ink2)" }}
              >
                <strong style={{ color: "var(--orange)" }}>
                  Always learning.
                </strong>{" "}
                Technology evolves fast — I stay current with the latest trends,
                frameworks, and best practices in web development.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
