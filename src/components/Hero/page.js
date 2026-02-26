"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import {
  colorTiles,
  heroShapes,
  roles,
  socailMedia,
  techBadges,
} from "@/data/data";

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let t;
    if (!isDeleting && typed === current) {
      t = setTimeout(() => setDeleting(true), 2000);
    } else if (isDeleting && typed === "") {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    } else {
      t = setTimeout(
        () =>
          setTyped(
            isDeleting
              ? current.slice(0, typed.length - 1)
              : current.slice(0, typed.length + 1),
          ),
        isDeleting ? 40 : 70,
      );
    }
    return () => clearTimeout(t);
  }, [typed, isDeleting, roleIdx]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.13, delayChildren: 0.15 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: "80px", background: "var(--bg)" }}
    >
      {/* ── WATERCOLOR BLOBS (top-right rainbow splash) ── */}
      <div
        className="absolute top-0 right-0 w-[640px] h-[640px] pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {colorTiles.map((b, i) => (
          <div
            key={i}
            className="blob blob-animate absolute"
            style={{
              width: b.w,
              height: b.h,
              top: b.t,
              right: b.r,
              background: b.c,
              opacity: b.o,
              animationDelay: b.delay,
            }}
          />
        ))}
      </div>

      {/* Bottom-left soft splash */}
      <div
        className="absolute bottom-0 left-0 w-[360px] h-[280px] pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {heroShapes.map((b, i) => (
          <div
            key={i}
            className="blob blob-animate absolute"
            style={{
              width: b.w,
              height: b.h,
              bottom: b.b,
              left: b.l,
              background: b.c,
              opacity: b.o,
              animationDelay: b.delay,
            }}
          />
        ))}
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="flex items-center gap-12 flex-wrap lg:flex-nowrap">
          {/* LEFT — Text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex-1 min-w-[300px]"
          >
            <motion.p
              variants={item}
              className="text-lg font-semibold mb-2 font-display"
              style={{ color: "var(--orange)" }}
            >
              Hello, I'm
            </motion.p>

            <motion.h1
              variants={item}
              className="font-display font-bold leading-[1.08] mb-4"
              style={{ fontSize: "clamp(40px,6vw,70px)", color: "var(--ink)" }}
            >
              Topu Rayhan
            </motion.h1>

            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-1.5 mb-4"
              style={{ minHeight: "32px" }}
            >
              <span
                className="text-base font-semibold font-display"
                style={{ color: "var(--muted)" }}
              >
                A
              </span>
              <span
                className="text-base font-bold font-display"
                style={{ color: "var(--orange)" }}
              >
                {typed}
              </span>
              <span
                className="inline-block w-0.5 h-5 align-middle"
                style={{
                  background: "var(--orange)",
                  animation: "blink 1s infinite",
                }}
              />
              <span
                className="text-base font-semibold font-display"
                style={{ color: "var(--muted)" }}
              >
                From Dinajpur
              </span>
            </motion.div>

            <motion.p
              variants={item}
              className="text-sm leading-relaxed mb-8 max-w-[440px]"
              style={{ color: "var(--muted)" }}
            >
              I am a Full Stack Engineer and Competitive Programmer with a focus
              on building high-performance web architectures. I love building
              fast, beautiful web applications with clean code and great user
              experiences.
            </motion.p>

            <motion.div variants={item} className="flex gap-4 flex-wrap mb-8">
              <button
                className="btn-orange"
                onClick={() =>
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                About Me
              </button>
              <button
                className="btn-orange-outline"
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                My Work →
              </button>
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-3">
              {socailMedia.map(({ icon: Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — Photo + floating badges */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 relative"
            style={{ width: "340px", height: "340px" }}
          >
            {/* Photo card */}
            <div
              className="relative w-full h-full rounded-[40px] overflow-hidden"
              style={{
                background:
                  "linear-gradient(160deg,var(--wc-pink) 0%,var(--wc-purple) 40%,var(--wc-blue) 100%)",
                boxShadow: "var(--shadow-lg)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="blob absolute w-48 h-36 top-6 left-4"
                style={{ background: "var(--wc-coral)", opacity: 0.7 }}
              />
              <div
                className="blob absolute w-40 h-32 top-16 right-4"
                style={{ background: "var(--wc-blue)", opacity: 0.6 }}
              />
              <div
                className="blob absolute w-36 h-28 bottom-24 right-8"
                style={{ background: "var(--wc-green)", opacity: 0.6 }}
              />

              <div className="relative z-11 w-full h-full  flex items-center justify-center">
                <img src="/topu2.png" />
              </div>
            </div>

            {/* Floating tech badges */}
            {techBadges.map((b, i) => (
              <motion.div
                key={i}
                className={`absolute ${b.pos} ${b.anim} glass-card px-3 py-2 flex items-center gap-2 z-20`}
                whileHover={{ scale: 1.08 }}
                style={{ minWidth: "110px" }}
              >
                <span style={{ fontSize: "18px", color: b.color }}>
                  <b.Icon />
                </span>
                <span
                  className="text-xs font-bold font-display"
                  style={{ color: b.color }}
                >
                  {b.label}
                </span>
              </motion.div>
            ))}

            {/* Experience badge */}
            <motion.div
              className="absolute -bottom-4 -left-8 glass-card px-5 py-3 z-20 float2"
              whileHover={{ scale: 1.06 }}
            >
              <div
                className="font-display font-bold text-2xl"
                style={{ color: "var(--orange)", lineHeight: 1 }}
              >
                1+
              </div>
              <div
                className="text-xs font-body"
                style={{ color: "var(--muted)" }}
              >
                Year of
                <br />
                Experience
              </div>
            </motion.div>

            {/* Projects badge */}
            <motion.div
              className="absolute -top-4 -right-6 glass-card px-5 py-3 z-20 float1"
              whileHover={{ scale: 1.06 }}
            >
              <div
                className="font-display font-bold text-2xl"
                style={{ color: "var(--orange)", lineHeight: 1 }}
              >
                10+
              </div>
              <div
                className="text-xs font-body"
                style={{ color: "var(--muted)" }}
              >
                Projects
                <br />
                Done
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <div
          className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5"
          style={{ borderColor: "var(--muted)" }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="w-1 h-1 rounded-full"
            style={{ background: "var(--orange)" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
