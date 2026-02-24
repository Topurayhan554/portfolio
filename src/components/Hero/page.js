"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiFacebook, FiTwitter, FiLinkedin, FiGithub } from "react-icons/fi";

const roles = [
  "Full Stack Developer",
  "React Specialist",
  "Node.js Engineer",
  "UI/UX Enthusiast",
];

const techBadges = [
  {
    label: "React.js",
    color: "#61dafb",
    bg: "#e8f8ff",
    icon: "⚛️",
    pos: "top-[12%] right-[18%]",
    anim: "float1",
  },
  {
    label: "Node.js",
    color: "#6cc24a",
    bg: "#edfbea",
    icon: "🟢",
    pos: "top-[38%] right-[8%]",
    anim: "float2",
  },
  {
    label: "Next.js",
    color: "#111",
    bg: "#f4f4f4",
    icon: "▲",
    pos: "bottom-[28%] right-[20%]",
    anim: "float3",
  },
  {
    label: "Figma",
    color: "#f24e1e",
    bg: "#fff2ef",
    icon: "🎨",
    pos: "top-[20%] left-[6%]",
    anim: "float2",
  },
];

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout;
    if (!isDeleting && typed === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typed === "") {
      setIsDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    } else {
      timeout = setTimeout(
        () =>
          setTyped(
            isDeleting
              ? current.slice(0, typed.length - 1)
              : current.slice(0, typed.length + 1),
          ),
        isDeleting ? 40 : 70,
      );
    }
    return () => clearTimeout(timeout);
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
      style={{ paddingTop: "80px", background: "#fff" }}
    >
      {/* ── WATERCOLOR BLOBS ── */}
      {/* Big rainbow splash - top right */}
      <div
        className="absolute top-0 right-0 w-[640px] h-[640px] pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div
          className="blob blob-animate absolute w-[320px] h-[260px] top-10 right-16"
          style={{ background: "var(--wc-pink)", opacity: 0.7 }}
        />
        <div
          className="blob blob-animate absolute w-[280px] h-[220px] top-20 right-8"
          style={{
            background: "var(--wc-purple)",
            opacity: 0.6,
            animationDelay: "1.2s",
          }}
        />
        <div
          className="blob blob-animate absolute w-[240px] h-[200px] top-0 right-40"
          style={{
            background: "var(--wc-blue)",
            opacity: 0.55,
            animationDelay: "2.4s",
          }}
        />
        <div
          className="blob blob-animate absolute w-[200px] h-[180px] top-32 right-52"
          style={{
            background: "var(--wc-green)",
            opacity: 0.5,
            animationDelay: "0.8s",
          }}
        />
        <div
          className="blob blob-animate absolute w-[220px] h-[160px] top-8 right-28"
          style={{
            background: "var(--wc-yellow)",
            opacity: 0.5,
            animationDelay: "3s",
          }}
        />
        <div
          className="blob blob-animate absolute w-[180px] h-[140px] top-44 right-20"
          style={{
            background: "var(--wc-coral)",
            opacity: 0.55,
            animationDelay: "1.8s",
          }}
        />
        <div
          className="blob blob-animate absolute w-[160px] h-[130px] top-12 right-64"
          style={{
            background: "var(--wc-teal)",
            opacity: 0.45,
            animationDelay: "0.4s",
          }}
        />
      </div>

      {/* Bottom left soft splash */}
      <div
        className="absolute bottom-0 left-0 w-[360px] h-[280px] pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div
          className="blob blob-animate absolute w-[200px] h-[160px] bottom-8 left-8"
          style={{
            background: "var(--wc-blue)",
            opacity: 0.4,
            animationDelay: "2s",
          }}
        />
        <div
          className="blob blob-animate absolute w-[160px] h-[130px] bottom-16 left-20"
          style={{
            background: "var(--wc-purple)",
            opacity: 0.35,
            animationDelay: "1.4s",
          }}
        />
        <div
          className="blob blob-animate absolute w-[140px] h-[110px] bottom-4 left-36"
          style={{
            background: "var(--wc-pink)",
            opacity: 0.35,
            animationDelay: "2.8s",
          }}
        />
      </div>

      {/* Subtle mid blobs */}
      <div
        className="absolute top-1/2 left-1/3 w-[180px] h-[140px] pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div
          className="blob blob-animate w-full h-full"
          style={{
            background: "var(--wc-yellow)",
            opacity: 0.2,
            animationDelay: "1.6s",
          }}
        />
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="flex items-center gap-12 flex-wrap lg:flex-nowrap">
          {/* LEFT */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex-1 min-w-[300px]"
          >
            <motion.p
              variants={item}
              className="text-lg font-semibold mb-2"
              style={{
                color: "var(--orange)",
                fontFamily: "var(--font-display)",
              }}
            >
              Hello, I'm
            </motion.p>

            <motion.h1
              variants={item}
              className="font-display font-bold leading-[1.08] mb-4"
              style={{
                fontSize: "clamp(40px, 6vw, 70px)",
                color: "var(--ink)",
              }}
            >
              Rafiqul Islam
            </motion.h1>

            <motion.div
              variants={item}
              className="flex items-center gap-2 mb-4"
              style={{ minHeight: "32px" }}
            >
              <span
                className="text-base font-semibold font-display"
                style={{ color: "var(--muted)" }}
              >
                A{" "}
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
                {" "}
                From Dhaka
              </span>
            </motion.div>

            <motion.p
              variants={item}
              className="text-sm leading-relaxed mb-8 max-w-[440px]"
              style={{ color: "var(--muted)" }}
            >
              I'm a passionate full stack developer based in Dhaka, Bangladesh.
              I love building fast, beautiful web applications with clean code
              and great user experiences.
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

            {/* Socials */}
            <motion.div variants={item} className="flex items-center gap-3">
              {[
                { icon: FiFacebook, href: "#" },
                { icon: FiTwitter, href: "#" },
                { icon: FiLinkedin, href: "#" },
                { icon: FiGithub, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
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

          {/* RIGHT — Photo + badges */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 relative"
            style={{ width: "340px", height: "420px" }}
          >
            {/* Photo container with watercolor bg */}
            <div
              className="relative w-full h-full rounded-[40px] overflow-hidden flex items-end justify-center"
              style={{
                background:
                  "linear-gradient(160deg, rgba(255,182,193,0.35) 0%, rgba(197,162,255,0.35) 40%, rgba(147,210,255,0.3) 100%)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
              }}
            >
              {/* Inner watercolor blobs on photo bg */}
              <div
                className="blob absolute w-48 h-36 top-6 left-4"
                style={{ background: "var(--wc-pink)", opacity: 0.5 }}
              />
              <div
                className="blob absolute w-40 h-32 top-16 right-4"
                style={{ background: "var(--wc-blue)", opacity: 0.4 }}
              />
              <div
                className="blob absolute w-36 h-28 bottom-24 right-8"
                style={{ background: "var(--wc-green)", opacity: 0.35 }}
              />

              {/* Placeholder / Photo */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div
                  className="text-center"
                  style={{
                    fontSize: "140px",
                    lineHeight: 1,
                    paddingBottom: "20px",
                  }}
                >
                  👨‍💻
                </div>
                {/* Uncomment to use real photo: */}
                {/* <Image src="/photo.jpg" alt="Rafiqul" fill style={{ objectFit: "cover", objectPosition: "top" }} /> */}
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
                <span style={{ fontSize: "18px" }}>{b.icon}</span>
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
                3+
              </div>
              <div
                className="text-xs font-body"
                style={{ color: "var(--muted)" }}
              >
                Years of
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
                25+
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "var(--muted)" }}
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

      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </section>
  );
}
