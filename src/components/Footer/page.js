"use client";
import { socailMedia } from "@/data/data";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

const links = ["Home", "About", "Skills", "Projects", "Blog", "Contact"];

export default function Footer() {
  const scrollTo = (id) =>
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "var(--footer-bg)",
        paddingTop: "60px",
        paddingBottom: "28px",
      }}
    >
      {/* Watercolor accents - subtle on dark */}
      <div className="absolute top-0 right-0 w-[360px] h-[260px] pointer-events-none">
        <div
          className="blob absolute w-[200px] h-[160px] top-0 right-0"
          style={{ background: "rgba(255,107,43,0.06)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span
                className="font-display font-bold text-2xl"
                style={{ color: "var(--orange)" }}
              >
                TR
              </span>
              <span className="font-display font-bold text-2xl text-white">
                .dev
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Full Stack Developer passionate about building fast, beautiful,
              and scalable web applications.
            </p>
            <div className="flex gap-3">
              {socailMedia.map((item, i) => {
                const Icon = item.icon;

                return (
                  <motion.a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.12, y: -2 }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all"
                    style={{
                      borderColor: "rgba(255,255,255,0.12)",
                      color: "rgba(255,255,255,0.5)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--orange)";
                      e.currentTarget.style.color = "var(--orange)";
                      e.currentTarget.style.background = "rgba(255,107,43,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.12)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <Icon size={15} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold text-sm mb-5 text-white">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              {links.map((l) => (
                <button
                  key={l}
                  onClick={() => scrollTo(l)}
                  className="text-left text-sm transition-colors w-fit"
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    fontFamily: "var(--font-body)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--orange)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
                  }
                >
                  → {l}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-sm mb-5 text-white">
              Contact Info
            </h4>
            <div
              className="space-y-3 text-sm"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              <div>📧 topurayhantipu@gmail.com</div>
              <div>📱 +880 1744406554</div>
              <div>📍 Dinajpur, Bangladesh</div>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollTo("contact")}
              className="mt-6 btn-orange text-sm"
            >
              Hire Me →
            </motion.button>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            © 2025 Topu Rayhan. Built with Next.js & Tailwind CSS.
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ y: -2 }}
            className="text-xs flex items-center gap-2 transition-colors"
            style={{
              color: "rgba(255,255,255,0.3)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--orange)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.3)")
            }
          >
            Back to top ↑
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
