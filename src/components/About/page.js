"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden"
      style={{ background: "var(--bg-soft)" }}
      ref={ref}
    >
      {/* Watercolor accents */}
      <div className="absolute top-0 right-0 w-[400px] h-[300px] pointer-events-none">
        <div
          className="blob absolute w-[220px] h-[180px] top-4  right-8"
          style={{ background: "var(--wc-pink)", opacity: 1 }}
        />
        <div
          className="blob absolute w-[180px] h-[150px] top-16 right-24"
          style={{ background: "var(--wc-yellow)", opacity: 1 }}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[200px] pointer-events-none">
        <div
          className="blob absolute w-[180px] h-[140px] bottom-4 left-8"
          style={{ background: "var(--wc-teal)", opacity: 1 }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT — Image */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Big decorative number */}
            <div
              className="absolute -top-8 -left-4 font-display font-bold select-none pointer-events-none"
              style={{
                fontSize: "160px",
                lineHeight: 1,
                color: "var(--orange)",
                opacity: 0.07,
                zIndex: 0,
              }}
            >
              6
            </div>

            {/* Image container */}
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                height: "420px",
                background:
                  "linear-gradient(135deg,var(--wc-pink) 0%,var(--wc-purple) 50%,var(--wc-blue) 100%)",
                boxShadow: "var(--shadow-lg)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="blob absolute w-52 h-40 top-4  left-4"
                style={{ background: "var(--wc-coral)", opacity: 0.9 }}
              />
              <div
                className="blob absolute w-44 h-36 bottom-8 right-6"
                style={{ background: "var(--wc-blue)", opacity: 0.8 }}
              />

              <div className="w-full h-full flex items-center justify-center relative z-10">
                {/* <span style={{ fontSize: "120px" }}>👨‍💼</span> */}

                <img
                  src="/topu1.png"
                  alt="Topu"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Text */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.75,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="sec-tag">I'm a Developer</div>
            <h2
              className="font-display font-bold mb-5 leading-tight"
              style={{ fontSize: "clamp(28px,4vw,44px)", color: "var(--ink)" }}
            >
              I Can Build Anything
              <br />
              <span style={{ color: "var(--orange)" }}>You Want</span>
            </h2>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "var(--muted)" }}
            >
              Hello! I'm a full stack web developer, and I'm very passionate and
              dedicated to my work. With 1+ years of experience, I have acquired
              the skills and knowledge necessary to make your project a success.
            </p>
            <p
              className="text-sm leading-relaxed mb-8"
              style={{ color: "var(--muted)" }}
            >
              I specialize in{" "}
              <strong style={{ color: "var(--ink)" }}>
                React, Next.js, Node.js, Express.js
              </strong>
              , and modern web technologies. I believe in writing clean,
              maintainable code that scales.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-8 flex-wrap">
              {[
                ["1+", "Years Exp."],
                ["10+", "Projects"],
                ["1000+", "Problem Solve"],
              ].map(([n, l]) => (
                <div key={l} className="text-center">
                  <div
                    className="font-display font-bold text-2xl"
                    style={{ color: "var(--orange)" }}
                  >
                    {n}
                  </div>
                  <div
                    className="text-xs mt-1"
                    style={{ color: "var(--muted)" }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                {
                  icon: "🎓",
                  title: "Education",
                  desc: "I have completed my HSC from the Science group. Currently, I am studying Botany at Dinajpur Adarsha College.",
                },
                {
                  icon: "💼",
                  title: "Experience",
                  desc: "1+ years building production apps for startups & enterprises.",
                },
                {
                  icon: "🌍",
                  title: "Location",
                  desc: "Dinajpur, Bangladesh. Open to remote work globally.",
                },
                {
                  icon: "🎯",
                  title: "Philosophy",
                  desc: "Clean code + great UX + business impact.",
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="p-4 rounded-xl border"
                  style={{
                    background: "var(--card)",
                    borderColor: "var(--border)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <div style={{ fontSize: "20px", marginBottom: "6px" }}>
                    {c.icon}
                  </div>
                  <div
                    className="text-xs font-bold font-display mb-1"
                    style={{ color: "var(--orange)" }}
                  >
                    {c.title}
                  </div>
                  <div
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    {c.desc}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="btn-orange"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Hire Me →
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
