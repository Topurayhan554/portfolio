"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden"
      style={{ background: "var(--soft)" }}
      ref={ref}
    >
      {/* Watercolor accent */}
      <div className="absolute top-0 right-0 w-[400px] h-[300px] pointer-events-none">
        <div
          className="blob absolute w-[220px] h-[180px] top-4 right-8"
          style={{ background: "var(--wc-pink)", opacity: 0.25 }}
        />
        <div
          className="blob absolute w-[180px] h-[150px] top-16 right-24"
          style={{ background: "var(--wc-yellow)", opacity: 0.22 }}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[200px] pointer-events-none">
        <div
          className="blob absolute w-[180px] h-[140px] bottom-4 left-8"
          style={{ background: "var(--wc-teal)", opacity: 0.2 }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT — Image with overlays */}
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
                  "linear-gradient(135deg, rgba(255,182,193,0.4) 0%, rgba(197,162,255,0.35) 50%, rgba(147,210,255,0.3) 100%)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
              }}
            >
              <div
                className="blob absolute w-52 h-40 top-4 left-4"
                style={{ background: "var(--wc-coral)", opacity: 0.45 }}
              />
              <div
                className="blob absolute w-44 h-36 bottom-8 right-6"
                style={{ background: "var(--wc-blue)", opacity: 0.4 }}
              />

              {/* Photo placeholder */}
              <div className="w-full h-full flex items-center justify-center relative z-10">
                <span style={{ fontSize: "120px" }}>👨‍💼</span>
                <Image
                  src="/topu.png"
                  alt="Topu"
                  fill
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              </div>

              {/* Floating stat overlay — years */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-6 -right-6 glass-card px-4 py-3 z-20"
              >
                <div
                  className="font-display font-bold text-2xl leading-none"
                  style={{ color: "var(--orange)" }}
                >
                  1
                </div>
                <div
                  className="text-xs font-body mt-0.5"
                  style={{ color: "var(--muted)" }}
                >
                  Years of
                  <br />
                  Success
                </div>
              </motion.div>

              {/* Floating stat overlay — projects */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute bottom-8 -right-6 glass-card px-4 py-3 z-20"
              >
                <div
                  className="font-display font-bold text-2xl leading-none"
                  style={{ color: "var(--ink)" }}
                >
                  0K{" "}
                  <span
                    className="text-xs font-medium"
                    style={{ color: "var(--muted)" }}
                  >
                    Total
                    <br />
                    Projects
                  </span>
                </div>
              </motion.div>
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
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                color: "var(--ink)",
              }}
            >
              I Can Build Anything
              <br />
              <span style={{ color: "var(--orange)" }}>You Want</span>
            </h2>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "var(--muted)" }}
            >
              Hello! I'm a full stack web developer, and I'm very passionate and
              dedicated to my work. With 3+ years of experience, I have acquired
              the skills and knowledge necessary to make your project a success.
              I enjoy every step of the process, from discussion to deployment.
            </p>
            <p
              className="text-sm leading-relaxed mb-8"
              style={{ color: "var(--muted)" }}
            >
              I specialize in{" "}
              <strong style={{ color: "var(--ink)" }}>
                React, Next.js, Node.js
              </strong>
              , and modern web technologies. I believe in writing clean,
              maintainable code that scales with your business.
            </p>

            {/* Stats row */}
            <div className="flex gap-8 mb-8 flex-wrap">
              {[
                ["3+", "Years Exp."],
                ["25+", "Projects"],
                ["15+", "Clients"],
                ["5★", "Reviews"],
              ].map(([n, l]) => (
                <div key={l} className="text-center">
                  <div
                    className="font-display font-bold text-2xl"
                    style={{ color: "var(--orange)" }}
                  >
                    {n}
                  </div>
                  <div
                    className="text-xs mt-1 font-body"
                    style={{ color: "var(--muted)" }}
                  >
                    {l}
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
