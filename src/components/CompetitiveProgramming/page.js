"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiExternalLink,
  FiCode,
  FiTrendingUp,
  FiAward,
  FiTarget,
} from "react-icons/fi";
import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si";

const platforms = [
  {
    id: "leetcode",
    name: "LeetCode",
    handle: "topu_5656",
    url: "https://leetcode.com/u/QHH3Zx0zoF/",
    Icon: SiLeetcode,
    color: "#FFA116",
    bgLight: "rgba(255,161,22,0.08)",
    bgDark: "rgba(255,161,22,0.12)",
    solved: 26,
    total: 26,
    rating: null,
    ratingLabel: "Rating",
    badge: "Knight",
    badgeColor: "#b9c0c8",
    stats: [
      { label: "Easy", val: 13, color: "#34d399" },
      { label: "Medium", val: 12, color: "#FFA116" },
      { label: "Hard", val: 1, color: "#ef4444" },
    ],
    tagline: "Daily problem solver · Contest participant",
  },
  {
    id: "codeforces",
    name: "Codeforces",
    handle: "topurayhantipu",
    url: "https://codeforces.com/profile/topurayhantipu",
    Icon: SiCodeforces,
    color: "#1F8ACB",
    bgLight: "rgba(31,138,203,0.08)",
    bgDark: "rgba(31,138,203,0.12)",
    solved: 442,
    total: null,
    rating: 1437,
    ratingLabel: "Max Rating",
    badge: "Specialist",
    badgeColor: "#1F8ACB",
    stats: [
      { label: "Div 2 A/B", val: 210, color: "#34d399" },
      { label: "Div 2 C/D", val: 130, color: "#1F8ACB" },
      { label: "Div 2 E+", val: 40, color: "#818cf8" },
    ],
    tagline: "Codeforces Round participant · Graph & DP specialist",
  },
  {
    id: "codechef",
    name: "CodeChef",
    handle: "topu_5656",
    url: "https://www.codechef.com/users/topu_5656",
    Icon: SiCodechef,
    color: "#5B4638",
    bgLight: "rgba(91,70,56,0.08)",
    bgDark: "rgba(91,70,56,0.12)",
    solved: 247,
    total: null,
    rating: 1629,
    ratingLabel: "Rating",
    badge: "3★",
    badgeColor: "#3b82f6",
    stats: [
      { label: "Long Chall.", val: 115, color: "#34d399" },
      { label: "Cook-Off", val: 71, color: "#f59e0b" },
      { label: "Lunchtime", val: 61, color: "#ec4899" },
    ],
    tagline: "3★ rated · Long Challenge expert",
  },
];

const totalSolved = platforms.reduce((a, p) => a + p.solved, 0);

/* ── Topic Tags ── */
const topics = [
  { name: "Dynamic Programming", count: 180, color: "#818cf8" },
  { name: "Graph Theory", count: 145, color: "#34d399" },
  { name: "Binary Search", count: 120, color: "#38bdf8" },
  { name: "Tree / BST", count: 110, color: "#f59e0b" },
  { name: "Greedy", count: 98, color: "#ec4899" },
  { name: "Segment Tree", count: 72, color: "#a78bfa" },
  { name: "Two Pointers", count: 68, color: "#34d399" },
  { name: "Backtracking", count: 55, color: "#fb923c" },
  { name: "Number Theory", count: 48, color: "#f43f5e" },
  { name: "Bit Manipulation", count: 42, color: "#0ea5e9" },
];

/* ── Animated counter hook ── */
function useCounter(target, inView, duration = 1600, delay = 0) {
  const [val, setVal] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts + delay;
      if (ts < start) {
        raf.current = requestAnimationFrame(step);
        return;
      }
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [inView, target, duration, delay]);
  return val;
}

function AnimatedNum({ target, inView, delay = 0 }) {
  const val = useCounter(target, inView, 1400, delay);
  return <>{val.toLocaleString()}</>;
}

function PlatformCard({ p, i, inView }) {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const solved = useCounter(p.solved, inView, 1400, i * 120);
  const rating = useCounter(p.rating, inView, 1400, i * 120 + 200);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 36, scale: 0.95 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "var(--card)",
        border: `1.5px solid ${hovered ? p.color + "55" : "var(--border)"}`,
        boxShadow: hovered
          ? `0 20px 48px ${p.color}20, 0 6px 20px rgba(0,0,0,0.08)`
          : "var(--shadow-md)",
        transform: hovered ? "translateY(-6px)" : "translateY(0px)",
        transition:
          "transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Colored top bar */}
      <div
        style={{
          height: "3px",
          background: `linear-gradient(90deg, ${p.color}, ${p.color}66)`,
          transform: hovered ? "scaleX(1)" : "scaleX(0.3)",
          transformOrigin: "left",
          transition: "transform 0.4s cubic-bezier(.22,1,.36,1)",
        }}
      />

      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                scale: hovered ? 1.12 : 1,
                rotate: hovered ? [0, -8, 8, -4, 0] : 0,
              }}
              transition={{
                scale: { duration: 0.3 },
                rotate: { duration: 0.5 },
              }}
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
              style={{
                background: p.bgLight,
                border: `1px solid ${p.color}25`,
              }}
            >
              <p.Icon />
            </motion.div>
            <div>
              <div
                className="font-display font-bold text-base"
                style={{ color: "var(--ink)" }}
              >
                {p.name}
              </div>
              <div
                className="text-xs font-mono mt-0.5"
                style={{ color: p.color }}
              >
                {p.handle}
              </div>
            </div>
          </div>

          {/* Badge */}
          <span
            className="text-xs font-bold font-display px-2.5 py-1 rounded-full"
            style={{
              background: `${p.badgeColor}15`,
              color: p.badgeColor,
              border: `1px solid ${p.badgeColor}35`,
            }}
          >
            {p.badge}
          </span>
        </div>

        <p className="text-xs" style={{ color: "var(--muted)" }}>
          {p.tagline}
        </p>
      </div>

      {/* Stats */}
      <div className="px-5 py-3 grid grid-cols-2 gap-3">
        <div
          className="text-center py-2.5 rounded-xl"
          style={{
            background: `${p.color}0e`,
            border: `1px solid ${p.color}20`,
          }}
        >
          <div
            className="font-display font-bold text-xl leading-none"
            style={{ color: p.color }}
          >
            {solved}
          </div>
          <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>
            Problems Solved
          </div>
        </div>
        <div
          className="text-center py-2.5 rounded-xl"
          style={{
            background: "var(--bg-soft)",
            border: "1px solid var(--border)",
          }}
        >
          <div
            className="font-display font-bold text-xl leading-none"
            style={{ color: "var(--ink)" }}
          >
            {rating}
          </div>
          <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>
            {p.ratingLabel}
          </div>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="px-5 pb-2">
        <div
          className="text-xs font-bold font-display mb-2"
          style={{ color: "var(--muted)" }}
        >
          BREAKDOWN
        </div>
        <div className="space-y-2">
          {p.stats.map((s) => (
            <div key={s.label}>
              <div className="flex justify-between mb-1">
                <span className="text-xs" style={{ color: "var(--muted)" }}>
                  {s.label}
                </span>
                <span
                  className="text-xs font-bold font-mono"
                  style={{ color: s.color }}
                >
                  {s.val}
                </span>
              </div>
              <div className="skill-track" style={{ height: "4px" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={
                    inView ? { width: `${(s.val / p.solved) * 100}%` } : {}
                  }
                  transition={{
                    duration: 1.2,
                    delay: 0.3 + i * 0.1,
                    ease: "easeOut",
                  }}
                  style={{
                    height: "100%",
                    borderRadius: "99px",
                    background: s.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="p-4 mt-auto">
        <motion.a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold font-display"
          style={{
            background: `${p.color}12`,
            color: p.color,
            border: `1.5px solid ${p.color}35`,
            textDecoration: "none",
          }}
          whileHover={{
            scale: 1.04,
            backgroundColor: `${p.color}22`,
            boxShadow: `0 4px 14px ${p.color}30`,
          }}
          whileTap={{ scale: 0.96 }}
        >
          <FiExternalLink size={12} />
          View Profile on {p.name}
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function CompetitiveProgramming() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });
  const totalCount = useCounter(1000, inView, 1600, 0);

  return (
    <section
      id="competitive"
      className="py-24 relative overflow-hidden"
      style={{ background: "var(--bg)" }}
      ref={ref}
    >
      {/* Watercolor blobs */}
      <div className="absolute top-0 left-0 w-[380px] h-[280px] pointer-events-none">
        <div
          className="blob absolute w-[200px] h-[160px] top-6  left-6"
          style={{ background: "var(--wc-blue)", opacity: 1 }}
        />
        <div
          className="blob absolute w-[170px] h-[130px] top-20 left-24"
          style={{ background: "var(--wc-purple)", opacity: 1 }}
        />
      </div>
      <div className="absolute bottom-0 right-0 w-[340px] h-[260px] pointer-events-none">
        <div
          className="blob absolute w-[180px] h-[145px] bottom-6  right-6"
          style={{ background: "var(--wc-yellow)", opacity: 1 }}
        />
        <div
          className="blob absolute w-[150px] h-[120px] bottom-18 right-24"
          style={{ background: "var(--wc-coral)", opacity: 1 }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="sec-tag"
          >
            Competitive Programming
          </motion.div>
          <h2
            className="font-display font-bold mb-4"
            style={{ fontSize: "clamp(28px,4vw,44px)", color: "var(--ink)" }}
          >
            Problem Solving Journey
          </h2>
          <p
            className="text-sm max-w-lg mx-auto mb-8"
            style={{ color: "var(--muted)" }}
          >
            Passionate competitive programmer with{" "}
            <strong style={{ color: "var(--orange)" }}>1000+ problems</strong>{" "}
            solved across LeetCode, Codeforces & CodeChef using{" "}
            <strong style={{ color: "var(--ink)" }}>C++</strong>. Specialized in
            algorithms, data structures, and optimization.
          </p>

          {/* Big total counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl border mb-4"
            style={{
              background: "var(--orange-pale)",
              borderColor: "rgba(255,107,43,0.2)",
              boxShadow: "0 8px 32px rgba(255,107,43,0.12)",
            }}
          >
            <FiCode size={28} style={{ color: "var(--orange)" }} />
            <div className="text-left">
              <div
                className="font-display font-bold"
                style={{
                  fontSize: "42px",
                  lineHeight: 1,
                  color: "var(--orange)",
                }}
              >
                {totalCount}+
              </div>
              <div
                className="text-sm font-semibold font-display mt-0.5"
                style={{ color: "var(--muted)" }}
              >
                Total Problems Solved
              </div>
            </div>
            <FiTrendingUp
              size={28}
              style={{ color: "var(--orange)", opacity: 0.6 }}
            />
          </motion.div>

          {/* C++ badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <span
              className="inline-flex items-center gap-2 text-xs font-bold font-display px-4 py-1.5 rounded-full"
              style={{
                background: "rgba(129,140,248,0.12)",
                color: "#818cf8",
                border: "1px solid rgba(129,140,248,0.3)",
              }}
            >
              <span
                style={{ fontFamily: "var(--font-mono)", fontSize: "13px" }}
              >
                C, C++
              </span>
              Primary Language
            </span>
          </motion.div>
        </motion.div>

        {/* ── PLATFORM CARDS ── */}
        <motion.div
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14"
        >
          {platforms.map((p, i) => (
            <PlatformCard key={p.id} p={p} i={i} inView={inView} />
          ))}
        </motion.div>

        {/* ── TOPICS MASTERED ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FiTarget size={18} style={{ color: "var(--orange)" }} />
              <span
                className="font-display font-bold text-lg"
                style={{ color: "var(--ink)" }}
              >
                Topics Mastered
              </span>
            </div>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              Key algorithms & data structures I've solved the most
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {topics.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  delay: 0.45 + i * 0.06,
                  type: "spring",
                  stiffness: 320,
                }}
                whileHover={{ scale: 1.08, y: -3 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full border cursor-default"
                style={{
                  background: `${t.color}0d`,
                  borderColor: `${t.color}28`,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: t.color }}
                />
                <span
                  className="text-xs font-semibold font-display"
                  style={{ color: "var(--ink2)" }}
                >
                  {t.name}
                </span>
                <span
                  className="text-xs font-mono font-bold"
                  style={{ color: t.color }}
                >
                  {t.count}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── ACHIEVEMENT BANNER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-12 p-6 rounded-2xl border relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, var(--orange-pale), rgba(129,140,248,0.06))",
            borderColor: "rgba(255,107,43,0.18)",
          }}
        >
          {/* Blobs inside banner */}
          <div
            className="blob absolute w-40 h-32 -top-4 -right-4"
            style={{ background: "var(--wc-yellow)", opacity: 0.4 }}
          />
          <div
            className="blob absolute w-32 h-24 bottom-0 left-8"
            style={{ background: "var(--wc-purple)", opacity: 0.25 }}
          />

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FiAward size={20} style={{ color: "var(--orange)" }} />
                <span
                  className="font-display font-bold text-base"
                  style={{ color: "var(--ink)" }}
                >
                  Competitive Programming Highlights
                </span>
              </div>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                Consistent problem solver · Participates in weekly contests ·
                Focus on efficiency & optimization
              </p>
            </div>

            <div className="flex gap-6 flex-wrap">
              {[
                { label: "Platforms", val: "3", icon: "🏆" },
                { label: "Problems", val: "1K+", icon: "✅" },
                { label: "Language", val: "C, C++", icon: "⚡" },
                { label: "Specialization", val: "DP+Graph", icon: "🧠" },
              ].map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.07 }}
                  className="text-center"
                >
                  <div style={{ fontSize: "20px", marginBottom: "2px" }}>
                    {a.icon}
                  </div>
                  <div
                    className="font-display font-bold text-sm"
                    style={{ color: "var(--orange)" }}
                  >
                    {a.val}
                  </div>
                  <div className="text-xs" style={{ color: "var(--muted)" }}>
                    {a.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
