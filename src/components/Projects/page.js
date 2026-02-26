"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiX,
  FiExternalLink,
  FiGithub,
  FiCalendar,
  FiUsers,
  FiArrowRight,
  FiImage,
} from "react-icons/fi";

const categories = ["All", "Full Stack", "Frontend", "Backend", "Mobile"];

const projects = [
  {
    id: 1,
    title: "Garments Production Tracker",
    cat: "Full Stack",
    image: "/garments-p-tracker.png",
    desc: "Enterprise-grade production management with role-based access and real-time tracking.",
    longDesc:
      "A comprehensive full-stack production management system built for garment manufacturing industry. Implements secure role-based authentication with Firebase, allowing Admins to manage users and analytics, Managers to handle product inventory and order approvals, and Buyers to place and track orders. Features real-time order status updates through 8 production stages (Pending → Approved → In Production → Quality Check → Packed → Shipped → Delivered), bulk operations for efficient workflow management, and detailed production analytics. Deployed on Firebase Hosting (frontend) and Vercel (backend) with MongoDB Atlas for data persistence. ",
    tech: [
      "React 18.3",
      "Vite 6.0",
      "Tailwind CSS 4",
      "Framer Motion",
      "Node.js 20",
      "Express.js",
      "MongoDB 6",
      "Firebase Auth",
      "TanStack Query",
      "JWT",
    ],
    emoji: "🏭",
    color: "#10b981",
    cardBg: "rgba(16,185,129,0.1)",
    stats: [
      { icon: "👥", label: "Roles", val: "3" },
      { icon: "📈", label: "Efficiency", val: "+70%" },
      { icon: "⚡", label: "Load", val: "<2s" },
    ],
    features: [
      "Role-based authentication (Admin, Manager, Buyer)",
      "Real-time order tracking through 8 stages",
      "Product CRUD with image upload & management",
      "Bulk order operations & approval workflows",
      "Production analytics with revenue tracking",
      "Responsive design with dark mode support",
      "Order cancellation & status notifications",
      "Comprehensive admin dashboard",
    ],
    liveUrl: "https://garments-production-trac-2075a.web.app/",
    apiUrl: "https://garments-production-tracker-server.vercel.app/",
    sourceUrl:
      "https://github.com/Topurayhan554/garments-production-tracker-client",
    backendRepo:
      "https://github.com/Topurayhan554/garments-product-tracks-server",
    date: "February 2025",
    role: "Full Stack Developer",
    duration: "1 month",
  },
  {
    id: 2,
    title: "PawMart Pet Shop",
    cat: "Full Stack",
    image: "/pawmart.png",
    desc: "Pet adoption platform with integrated marketplace for pet products and accessories.",
    longDesc:
      "Modern full-stack pet shop application enabling pet adoption and product sales. The platform allows users to browse pets available for adoption with comprehensive details including category, breed, age, price, and location. Features a complete e-commerce section for pet food, toys, and care products. Users can create accounts to manage their pet listings, upload images, and track their activities. Built with responsive design principles ensuring perfect functionality across all devices. Implements Firebase authentication for secure user management and MongoDB for efficient data storage.",
    tech: [
      "React",
      "Tailwind CSS",
      "React Router",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
    ],
    emoji: "🐾",
    color: "#f59e0b",
    cardBg: "rgba(245,158,11,0.1)",
    stats: [
      { icon: "🐕", label: "Pets", val: "Adopt" },
      { icon: "🛒", label: "Shop", val: "Products" },
      { icon: "📱", label: "Mobile", val: "Responsive" },
    ],
    features: [
      "Pet adoption with detailed profiles",
      "Pet listing with image uploads",
      "Pet food & accessories shop",
      "Care products marketplace",
      "User authentication & management",
      "Interactive forms & date selection",
      "Real-time notifications (Toast & SweetAlert)",
      "Mobile-responsive design",
    ],
    liveUrl: "https://pawmart-petshop.netlify.app/",
    apiUrl: "https://b12-a10-future-box-server.vercel.app/",
    sourceUrl: "https://github.com/Topurayhan554/B12-A10-Future-Box-client.git",
    backendRepo:
      "https://github.com/Topurayhan554/B12-A10-Future-Box-Server.git",
    date: "Oct 2025",
    role: "Full Stack Developer",
    duration: "1 month",
  },
  {
    id: 3,
    title: "GameHub",
    cat: "Frontend",
    image: "/gamehub.png",
    desc: "Modern game discovery platform with ratings and user management.",
    longDesc:
      "A sleek and modern indie game library platform built with React. GameHub makes game discovery easy and fun with detailed game pages, real-time ratings, and user reviews. Users can create accounts to personalize their experience, manage their profiles, subscribe to newsletters, and install games with a single click. The platform features a beautiful responsive design using Tailwind CSS and DaisyUI, smooth animations powered by Framer Motion, and interactive game showcases using Swiper. Complete with authentication features including login, logout, profile updates, and password reset.",
    tech: [
      "React",
      "Tailwind CSS",
      "DaisyUI",
      "React Router",
      "Swiper",
      "Framer Motion",
    ],
    emoji: "🎮",
    color: "#8b5cf6",
    cardBg: "rgba(139,92,246,0.1)",
    stats: [
      { icon: "🎯", label: "Platform", val: "Indie Games" },
      { icon: "⭐", label: "Features", val: "10+" },
      { icon: "🚀", label: "Performance", val: "Fast" },
    ],
    features: [
      "Indie game library with search",
      "Detailed game pages with ratings",
      "Top-rated games section",
      "One-click game installation",
      "User authentication & authorization",
      "Profile management system",
      "Password reset via email",
      "Newsletter subscription",
      "Responsive mobile-first design",
      "Smooth page transitions",
      "Interactive game carousels",
    ],
    liveUrl: "https://game-hub-56.netlify.app/",
    sourceUrl: "https://github.com/Topurayhan554/game-hub",
    date: "2024",
    role: "Frontend Developer",
  },
];

/* ── Variants ── */
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ══════════════════════════════════════════
   IMAGE AREA — used in both Card + Modal
══════════════════════════════════════════ */
function ProjectImage({
  p,
  hovered = false,
  height = "h-48",
  isModal = false,
}) {
  if (p.image) {
    return (
      <div className={`${height} relative overflow-hidden flex-shrink-0`}>
        <Image
          src={p.image}
          alt={p.title}
          fill
          className="object-cover"
          style={{
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.5s cubic-bezier(.22,1,.36,1)",
          }}
        />
        {/* Overlay gradient on hover */}
        <div
          className="absolute inset-0"
          style={{
            background: hovered
              ? `linear-gradient(to top, ${p.color}44 0%, transparent 60%)`
              : "transparent",
            transition: "background 0.4s ease",
          }}
        />
        {/* Category badge */}
        <span
          className="absolute top-3 right-3 text-xs font-bold font-display px-3 py-1 rounded-full z-10"
          style={{
            background: "rgba(0,0,0,0.55)",
            color: "#fff",
            backdropFilter: "blur(6px)",
            border: `1px solid ${p.color}55`,
          }}
        >
          {p.cat}
        </span>
      </div>
    );
  }

  /* ── Watercolor Placeholder (no image) ── */
  return (
    <div
      className={`${height} flex items-center justify-center relative overflow-hidden flex-shrink-0`}
      style={{
        background: hovered ? `${p.color}14` : p.cardBg,
        transition: "background 0.4s ease",
      }}
    >
      {/* Blobs */}
      <motion.div
        className="blob absolute w-36 h-28 top-2 left-4"
        style={{ background: "var(--wc-pink)" }}
        animate={{ opacity: hovered ? 1 : 0.6, scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.4 }}
      />
      <motion.div
        className="blob absolute w-32 h-24 bottom-2 right-6"
        style={{ background: "var(--wc-blue)" }}
        animate={{ opacity: hovered ? 0.9 : 0.5, scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      />

      {/* Emoji placeholder */}
      <motion.span
        className="relative z-10 select-none"
        animate={{
          scale: hovered ? 1.18 : 1,
          rotate: hovered ? [0, -8, 8, -4, 0] : 0,
          y: hovered ? -4 : 0,
        }}
        transition={{
          scale: { duration: 0.35, ease: "backOut" },
          rotate: { duration: 0.5, ease: "easeInOut" },
          y: { duration: 0.35, ease: "easeOut" },
        }}
        style={{
          fontSize: isModal ? "96px" : "64px",
          filter: hovered ? `drop-shadow(0 8px 16px ${p.color}55)` : "none",
        }}
      >
        {p.emoji}
      </motion.span>

      {/* Glow overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle at center, ${p.color}12 0%, transparent 70%)`,
        }}
      />

      {/* Category badge */}
      <motion.span
        className="absolute top-3 right-3 text-xs font-bold font-display px-3 py-1 rounded-full"
        animate={{
          background: hovered ? `${p.color}30` : `${p.color}15`,
          scale: hovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.25 }}
        style={{ color: p.color, border: `1px solid ${p.color}40` }}
      >
        {p.cat}
      </motion.span>
    </div>
  );
}

/* ══════════════════════════════
   PROJECT CARD
══════════════════════════════ */
function ProjectCard({ p, onOpen }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="rounded-2xl overflow-hidden flex flex-col relative"
      style={{
        background: "var(--card)",
        border: `1.5px solid ${hovered ? p.color + "55" : "var(--border)"}`,
        boxShadow: hovered
          ? `0 20px 50px ${p.color}22, 0 8px 24px rgba(0,0,0,0.1)`
          : "var(--shadow-md)",
        transform: hovered ? "translateY(-8px)" : "translateY(0px)",
        transition:
          "transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s ease, border-color 0.3s ease",
        cursor: "pointer",
      }}
    >
      {/* Top color line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 z-10"
        style={{
          background: `linear-gradient(90deg, ${p.color}, ${p.color}88)`,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.4s cubic-bezier(.22,1,.36,1)",
        }}
      />

      {/* ── IMAGE AREA ── */}
      <ProjectImage p={p} hovered={hovered} height="h-48" />

      {/* ── BODY ── */}
      <div className="p-5 flex flex-col flex-1">
        <motion.h3
          className="font-display font-bold text-base mb-2"
          animate={{ color: hovered ? p.color : "var(--ink)" }}
          transition={{ duration: 0.25 }}
        >
          {p.title}
        </motion.h3>

        <p
          className="text-xs leading-relaxed mb-4 flex-1"
          style={{ color: "var(--muted)" }}
        >
          {p.desc}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.tech.slice(0, 3).map((t, idx) => (
            <motion.span
              key={t}
              className="text-xs px-2.5 py-1 rounded-lg font-medium"
              animate={{
                background: hovered ? `${p.color}12` : "var(--bg-soft)",
                color: hovered ? p.color : "var(--muted)",
                borderColor: hovered ? `${p.color}35` : "var(--border)",
              }}
              transition={{ duration: 0.25, delay: idx * 0.04 }}
              style={{ border: "1px solid" }}
            >
              {t}
            </motion.span>
          ))}
          {p.tech.length > 3 && (
            <span
              className="text-xs px-2.5 py-1 rounded-lg font-medium"
              style={{
                background: `${p.color}12`,
                color: p.color,
                border: `1px solid ${p.color}30`,
              }}
            >
              +{p.tech.length - 3}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <motion.button
            onClick={() => onOpen(p)}
            className="flex-1 py-2.5 rounded-xl text-xs font-bold font-display flex items-center justify-center gap-1.5 overflow-hidden relative"
            style={{
              background: "var(--orange)",
              color: "#fff",
              border: "none",
              boxShadow: hovered
                ? "0 6px 20px rgba(255,107,43,0.4)"
                : "0 4px 14px rgba(255,107,43,0.2)",
              transition: "box-shadow 0.3s ease",
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {/* Shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)",
              }}
              animate={hovered ? { x: ["-100%", "200%"] } : { x: "-100%" }}
              transition={{
                duration: 0.7,
                ease: "easeInOut",
                repeat: hovered ? Infinity : 0,
                repeatDelay: 1.2,
              }}
            />
            <span className="relative z-10">See Details</span>
            <motion.span
              className="relative z-10"
              animate={{ x: hovered ? 3 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <FiArrowRight size={12} />
            </motion.span>
          </motion.button>

          <motion.a
            href={p.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2.5 rounded-xl text-xs font-bold font-display flex items-center gap-1.5"
            style={{
              background: "transparent",
              color: p.color,
              border: `1.5px solid ${p.color}45`,
              textDecoration: "none",
            }}
            whileHover={{
              scale: 1.06,
              backgroundColor: `${p.color}15`,
              boxShadow: `0 4px 14px ${p.color}25`,
            }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.2 }}
          >
            <FiExternalLink size={12} />
            <span>Demo</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════
   MODAL
══════════════════════════════ */
function ProjectModal({ project: p, onClose }) {
  return (
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.88, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 40 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl relative"
        style={{
          background: "var(--card)",
          border: `1px solid ${p.color}30`,
          boxShadow: `0 32px 80px rgba(0,0,0,0.3), 0 0 0 1px ${p.color}15`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── BANNER (tall image or watercolor) ── */}
        <div className="relative rounded-t-3xl overflow-hidden">
          {p.image ? (
            /* Real screenshot */
            <div className="relative h-64">
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-cover"
              />
              {/* Dark gradient overlay so text is readable */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)",
                }}
              />

              {/* Bottom title overlay */}
              <div className="absolute bottom-0 left-0 right-0 px-6 pb-5 z-10">
                <span
                  className="inline-block text-xs font-bold font-display px-3 py-1 rounded-full mb-2"
                  style={{
                    background: `${p.color}30`,
                    color: "#fff",
                    border: `1px solid ${p.color}55`,
                    backdropFilter: "blur(6px)",
                  }}
                >
                  {p.cat}
                </span>
                <h2 className="font-display font-bold text-2xl text-white leading-tight">
                  {p.title}
                </h2>
              </div>

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
                whileHover={{ scale: 1.12, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center border z-20"
                style={{
                  background: "rgba(0,0,0,0.5)",
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "#fff",
                  backdropFilter: "blur(6px)",
                }}
              >
                <FiX size={17} />
              </motion.button>
            </div>
          ) : (
            /* Watercolor placeholder banner */
            <div
              className="relative h-56 flex items-center justify-center overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${p.cardBg}, ${p.color}18)`,
              }}
            >
              {/* Animated blobs */}
              {[
                {
                  w: "190px",
                  h: "150px",
                  t: "4px",
                  l: "20px",
                  c: "var(--wc-pink)",
                  d: 0,
                },
                {
                  w: "160px",
                  h: "130px",
                  b: "0",
                  r: "28px",
                  c: "var(--wc-blue)",
                  d: 0.1,
                },
                {
                  w: "140px",
                  h: "110px",
                  t: "20px",
                  r: "96px",
                  c: "var(--wc-yellow)",
                  d: 0.18,
                },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  className="blob absolute"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 0.9, scale: 1 }}
                  transition={{ delay: b.d, duration: 0.6, ease: "backOut" }}
                  style={{
                    width: b.w,
                    height: b.h,
                    top: b.t,
                    left: b.l,
                    bottom: b.b,
                    right: b.r,
                    background: b.c,
                  }}
                />
              ))}

              <motion.span
                initial={{ scale: 0.3, opacity: 0, rotate: -15 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative z-10"
                style={{
                  fontSize: "96px",
                  filter: `drop-shadow(0 12px 28px ${p.color}44)`,
                }}
              >
                {p.emoji}
              </motion.span>

              <motion.span
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="absolute top-4 left-5 text-xs font-bold font-display px-3 py-1.5 rounded-full"
                style={{
                  background: `${p.color}22`,
                  color: p.color,
                  border: `1px solid ${p.color}45`,
                }}
              >
                {p.cat}
              </motion.span>

              <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{
                  scale: 1.12,
                  rotate: 90,
                  backgroundColor: "var(--orange-pale)",
                }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center border z-20"
                style={{
                  background: "var(--card)",
                  borderColor: "var(--border)",
                  color: "var(--muted)",
                }}
              >
                <FiX size={17} />
              </motion.button>
            </div>
          )}
        </div>

        {/* ── CONTENT ── */}
        <div className="p-7">
          {/* Title + meta — only show if image exists (title already shown in overlay above) */}
          {!p.image && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="mb-6"
            >
              <h2
                className="font-display font-bold text-2xl mb-3"
                style={{ color: "var(--ink)" }}
              >
                {p.title}
              </h2>
              <div className="flex flex-wrap gap-4">
                <div
                  className="flex items-center gap-1.5 text-xs"
                  style={{ color: "var(--muted)" }}
                >
                  <FiCalendar size={12} style={{ color: p.color }} />
                  {p.date}
                </div>
                <div
                  className="flex items-center gap-1.5 text-xs"
                  style={{ color: "var(--muted)" }}
                >
                  <FiUsers size={12} style={{ color: p.color }} />
                  {p.role}
                </div>
              </div>
            </motion.div>
          )}

          {/* If image exists, show meta below image */}
          {p.image && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-wrap gap-4 mb-6"
            >
              <div
                className="flex items-center gap-1.5 text-xs"
                style={{ color: "var(--muted)" }}
              >
                <FiCalendar size={12} style={{ color: p.color }} />
                {p.date}
              </div>
              <div
                className="flex items-center gap-1.5 text-xs"
                style={{ color: "var(--muted)" }}
              >
                <FiUsers size={12} style={{ color: p.color }} />
                {p.role}
              </div>
            </motion.div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-7">
            {p.stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.22 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ scale: 1.06, transition: { duration: 0.2 } }}
                className="text-center py-3 px-2 rounded-xl border cursor-default"
                style={{
                  background: `${p.color}0e`,
                  borderColor: `${p.color}28`,
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.3 + i * 0.08,
                    type: "spring",
                    stiffness: 300,
                  }}
                  style={{ fontSize: "22px", marginBottom: "4px" }}
                >
                  {s.icon}
                </motion.div>
                <div
                  className="font-display font-bold text-base leading-none"
                  style={{ color: p.color }}
                >
                  {s.val}
                </div>
                <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <h4
              className="font-display font-bold text-sm mb-2.5"
              style={{ color: "var(--ink)" }}
            >
              About this project
            </h4>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              {p.longDesc}
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-6"
          >
            <h4
              className="font-display font-bold text-sm mb-3"
              style={{ color: "var(--ink)" }}
            >
              Key Features
            </h4>
            <div className="space-y-2.5">
              {p.features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.38 + i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "var(--ink2)" }}
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.4 + i * 0.07,
                      type: "spring",
                      stiffness: 400,
                    }}
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                    style={{ background: `${p.color}20`, color: p.color }}
                  >
                    ✓
                  </motion.span>
                  {f}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tech stack */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42 }}
            className="mb-7"
          >
            <h4
              className="font-display font-bold text-sm mb-3"
              style={{ color: "var(--ink)" }}
            >
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {p.tech.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.44 + i * 0.05,
                    type: "spring",
                    stiffness: 350,
                  }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="text-xs px-3 py-1.5 rounded-xl font-semibold font-display cursor-default"
                  style={{
                    background: `${p.color}12`,
                    color: p.color,
                    border: `1px solid ${p.color}30`,
                  }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48 }}
            className="flex gap-3"
          >
            <motion.a
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3.5 rounded-xl text-sm font-bold font-display flex items-center justify-center gap-2 overflow-hidden relative"
              style={{
                background: "var(--orange)",
                color: "#fff",
                textDecoration: "none",
                boxShadow: "0 6px 22px rgba(255,107,43,0.32)",
              }}
              whileHover={{
                scale: 1.03,
                y: -2,
                boxShadow: "0 10px 30px rgba(255,107,43,0.45)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              <FiExternalLink size={15} />
              Live Demo
            </motion.a>

            <motion.a
              href={p.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3.5 rounded-xl text-sm font-bold font-display flex items-center justify-center gap-2 border"
              style={{
                background: "transparent",
                color: "var(--ink)",
                borderColor: "var(--border)",
                textDecoration: "none",
              }}
              whileHover={{
                scale: 1.03,
                y: -2,
                borderColor: p.color,
                color: p.color,
                backgroundColor: `${p.color}10`,
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <FiGithub size={15} />
              Source Code
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════
   FILTER BUTTON
══════════════════════════════ */
function FilterBtn({ cat, active, onClick }) {
  return (
    <motion.button
      onClick={() => onClick(cat)}
      className="relative px-5 py-2 rounded-full text-sm font-bold font-display overflow-hidden"
      animate={{ color: active ? "#fff" : "var(--muted)" }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence>
        {active && (
          <motion.span
            layoutId="filter-active"
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: "var(--orange)",
              boxShadow: "0 4px 14px rgba(255,107,43,0.35)",
            }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          />
        )}
      </AnimatePresence>
      {!active && (
        <motion.span
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{ background: "var(--orange-pale)" }}
        />
      )}
      <span className="relative z-10">{cat}</span>
    </motion.button>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });

  const openModal = (p) => {
    setSelectedProject(p);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "";
  };

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.cat === activeFilter);

  return (
    <>
      <section
        id="projects"
        className="py-24 relative overflow-hidden"
        style={{ background: "var(--bg-soft)" }}
        ref={ref}
      >
        {/* Watercolor blobs */}
        <div className="absolute top-0 right-0 w-[420px] h-[320px] pointer-events-none">
          <div
            className="blob absolute w-[210px] h-[170px] top-8  right-8"
            style={{ background: "var(--wc-purple)", opacity: 1 }}
          />
          <div
            className="blob absolute w-[180px] h-[140px] top-24 right-32"
            style={{ background: "var(--wc-blue)", opacity: 1 }}
          />
        </div>
        <div className="absolute bottom-0 left-0 w-[320px] h-[240px] pointer-events-none">
          <div
            className="blob absolute w-[170px] h-[140px] bottom-6 left-8"
            style={{ background: "var(--wc-green)", opacity: 1 }}
          />
          <div
            className="blob absolute w-[140px] h-[115px] bottom-16 left-20"
            style={{ background: "var(--wc-yellow)", opacity: 1 }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="sec-tag"
            >
              Portfolio
            </motion.div>
            <h2
              className="font-display font-bold mb-4"
              style={{ fontSize: "clamp(28px,4vw,44px)", color: "var(--ink)" }}
            >
              My Amazing Works
            </h2>
            <p
              className="text-sm max-w-md mx-auto"
              style={{ color: "var(--muted)" }}
            >
              A curated selection of projects that showcase my skills across
              different technologies.
            </p>
          </motion.div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((cat) => (
              <FilterBtn
                key={cat}
                cat={cat}
                active={activeFilter === cat}
                onClick={setActiveFilter}
              />
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              variants={gridVariants}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((p) => (
                <ProjectCard key={p.id} p={p} onOpen={openModal} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeModal} />
        )}
      </AnimatePresence>
    </>
  );
}
