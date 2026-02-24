"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const experiences = [
  {
    role: "Senior Full Stack Developer",
    company: "TechFlow Solutions",
    period: "2023 — Present",
    type: "Full-time",
    desc: "Lead development of a SaaS platform serving 10K+ users. Built scalable microservices with Node.js, React dashboards, and CI/CD pipelines.",
    tags: ["Next.js", "Node.js", "AWS", "PostgreSQL"],
    color: "#818cf8",
  },
  {
    role: "Full Stack Developer",
    company: "DevCraft Agency",
    period: "2022 — 2023",
    type: "Full-time",
    desc: "Developed 8+ client projects from scratch. Specialized in React frontends and Express APIs. Reduced page load times by 40% through optimization.",
    tags: ["React", "Express", "MongoDB", "Docker"],
    color: "#34d399",
  },
  {
    role: "Frontend Developer",
    company: "StartupHub BD",
    period: "2021 — 2022",
    type: "Part-time",
    desc: "Built responsive UIs for e-commerce and healthcare platforms. Collaborated directly with designers to implement pixel-perfect interfaces.",
    tags: ["React", "Tailwind CSS", "Redux", "REST API"],
    color: "#f472b6",
  },
  {
    role: "Freelance Web Developer",
    company: "Self-employed",
    period: "2020 — 2021",
    type: "Freelance",
    desc: "Delivered 15+ websites and web apps for local businesses. Handled full project lifecycle from requirements to deployment.",
    tags: ["HTML/CSS", "JavaScript", "WordPress", "PHP"],
    color: "#fbbf24",
  },
];

export default function Experience() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="experience"
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
          <div className="section-label">Experience</div>
          <h2
            className="font-syne font-bold"
            style={{ fontSize: "clamp(30px, 4vw, 52px)" }}
          >
            My professional <span className="grad-text">journey</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-px hidden md:block"
            style={{
              background:
                "linear-gradient(to bottom, var(--accent), transparent)",
            }}
          />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex gap-8"
              >
                {/* Timeline dot */}
                <div
                  className="hidden md:flex flex-col items-center flex-shrink-0"
                  style={{ width: "64px" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.15 + 0.2,
                      type: "spring",
                    }}
                    className="w-4 h-4 rounded-full border-2 mt-1 relative z-10"
                    style={{
                      borderColor: exp.color,
                      background: "var(--bg)",
                      boxShadow: `0 0 12px ${exp.color}60`,
                    }}
                  />
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  className="flex-1 glass rounded-2xl p-7 mb-2"
                  style={{ borderLeft: `2px solid ${exp.color}40` }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3
                        className="font-syne font-bold text-lg"
                        style={{ color: "var(--light)" }}
                      >
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span
                          className="text-sm font-medium"
                          style={{ color: exp.color }}
                        >
                          {exp.company}
                        </span>
                        <span
                          className="text-xs px-2.5 py-1 rounded-full"
                          style={{
                            background: `${exp.color}15`,
                            border: `1px solid ${exp.color}30`,
                            color: exp.color,
                          }}
                        >
                          {exp.type}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm" style={{ color: "var(--muted)" }}>
                      {exp.period}
                    </span>
                  </div>

                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{ color: "var(--muted)" }}
                  >
                    {exp.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-lg font-medium"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "var(--muted)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
