"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skillRows = [
  // Row 1 — Frontend
  [
    { name: "React", icon: "⚛️", color: "#61dafb", level: 92 },
    { name: "Next.js", icon: "▲", color: "#ffffff", level: 88 },
    { name: "TypeScript", icon: "TS", color: "#3178c6", level: 82 },
    { name: "JavaScript", icon: "JS", color: "#f7df1e", level: 90 },
    { name: "Tailwind CSS", icon: "🌊", color: "#38bdf8", level: 94 },
    { name: "Framer Motion", icon: "🎬", color: "#ff4154", level: 78 },
    { name: "Redux", icon: "⚙️", color: "#764abc", level: 80 },
    { name: "HTML/CSS", icon: "🌐", color: "#e34c26", level: 95 },
  ],
  // Row 2 — Backend & DB
  [
    { name: "Node.js", icon: "🟢", color: "#6cc24a", level: 85 },
    { name: "Express.js", icon: "🚂", color: "#999", level: 84 },
    { name: "MongoDB", icon: "🍃", color: "#47a248", level: 80 },
    { name: "PostgreSQL", icon: "🐘", color: "#336791", level: 74 },
    { name: "Redis", icon: "🔴", color: "#dc382d", level: 70 },
    { name: "REST API", icon: "🔌", color: "#818cf8", level: 90 },
    { name: "GraphQL", icon: "◈", color: "#e10098", level: 68 },
    { name: "Prisma", icon: "💎", color: "#5a67d8", level: 75 },
  ],
  // Row 3 — Tools & DevOps
  [
    { name: "Git", icon: "⎇", color: "#f05032", level: 88 },
    { name: "Docker", icon: "🐳", color: "#2496ed", level: 72 },
    { name: "AWS", icon: "☁️", color: "#ff9900", level: 65 },
    { name: "Vercel", icon: "△", color: "#fff", level: 92 },
    { name: "Figma", icon: "🎨", color: "#f24e1e", level: 76 },
    { name: "VS Code", icon: "📝", color: "#007acc", level: 95 },
    { name: "Postman", icon: "📬", color: "#ff6c37", level: 85 },
    { name: "Linux", icon: "🐧", color: "#fcc624", level: 70 },
  ],
];

const proficiencySkills = [
  { name: "React / Next.js", level: 92, color: "#818cf8" },
  { name: "JavaScript / TypeScript", level: 88, color: "#818cf8" },
  { name: "Node.js / Express", level: 84, color: "#34d399" },
  { name: "Tailwind CSS", level: 94, color: "#34d399" },
  { name: "MongoDB / PostgreSQL", level: 78, color: "#f472b6" },
  { name: "DevOps / Docker / AWS", level: 68, color: "#f472b6" },
];

function Skill({ skill }) {
  return (
    <motion.div
      whileHover={{ scale: 1.06, y: -4 }}
      className="flex-shrink-0 glass rounded-2xl px-5 py-4 flex items-center gap-3 cursor-default mx-2"
      style={{ minWidth: "160px", border: `1px solid ${skill.color}25` }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
        style={{
          background: `${skill.color}18`,
          color: skill.color,
          fontSize:
            typeof skill.icon === "string" && skill.icon.length <= 2
              ? "13px"
              : "20px",
        }}
      >
        {skill.icon}
      </div>
      <div>
        <div
          className="text-sm font-semibold"
          style={{ color: "var(--light)" }}
        >
          {skill.name}
        </div>
        <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
          {skill.level}%
        </div>
      </div>
    </motion.div>
  );
}

function MarqueeRow({ skills, reverse = false, speed = 30 }) {
  const doubled = [...skills, ...skills];
  return (
    <div className="overflow-hidden py-2">
      <motion.div
        className="flex"
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        style={{ width: "max-content" }}
      >
        {doubled.map((skill, i) => (
          <Skill key={i} skill={skill} />
        ))}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="skills" className="py-28">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="section-label mx-auto w-fit">Skills & Tech Stack</div>
          <h2
            className="font-syne font-bold"
            style={{ fontSize: "clamp(30px, 4vw, 52px)" }}
          >
            Tools I work <span className="grad-text">with daily</span>
          </h2>
          <p
            className="text-sm mt-4 max-w-xl mx-auto"
            style={{ color: "var(--muted)", lineHeight: 1.8 }}
          >
            A curated collection of technologies I've mastered and love working
            with. Always learning, always growing.
          </p>
        </motion.div>

        {/* Marquee carousel rows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20 space-y-4"
        >
          <MarqueeRow skills={skillRows[0]} speed={28} />
          <MarqueeRow skills={skillRows[1]} reverse speed={32} />
          <MarqueeRow skills={skillRows[2]} speed={24} />
        </motion.div>

        {/* Proficiency bars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h3
            className="font-syne font-bold text-xl mb-8 text-center"
            style={{ color: "var(--light)" }}
          >
            Proficiency Breakdown
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-7 max-w-4xl mx-auto">
            {proficiencySkills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--light)" }}
                  >
                    {skill.name}
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: skill.color }}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : {}}
                    transition={{
                      duration: 1.2,
                      delay: 0.5 + i * 0.1,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                      boxShadow: `0 0 12px ${skill.color}60`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
