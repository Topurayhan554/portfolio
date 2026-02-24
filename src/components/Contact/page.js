"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";
import axios from "axios";

const info = [
  {
    icon: FiMail,
    label: "Email",
    val: "rafiqul@example.com",
    color: "#818cf8",
  },
  {
    icon: FiPhone,
    label: "Phone",
    val: "+880 1234-567890",
    color: "var(--orange)",
  },
  {
    icon: FiMapPin,
    label: "Location",
    val: "Dhaka, Bangladesh",
    color: "#34d399",
  },
];

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await axios.post("http://localhost:5000/api/contact", form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden"
      style={{ background: "var(--soft)" }}
      ref={ref}
    >
      {/* Watercolor */}
      <div className="absolute top-0 left-0 w-[350px] h-[280px] pointer-events-none">
        <div
          className="blob absolute w-[200px] h-[160px] top-4 left-4"
          style={{ background: "var(--wc-teal)", opacity: 0.22 }}
        />
        <div
          className="blob absolute w-[170px] h-[130px] top-16 left-20"
          style={{ background: "var(--wc-green)", opacity: 0.18 }}
        />
      </div>
      <div className="absolute bottom-0 right-0 w-[320px] h-[240px] pointer-events-none">
        <div
          className="blob absolute w-[180px] h-[140px] bottom-6 right-6"
          style={{ background: "var(--wc-purple)", opacity: 0.2 }}
        />
        <div
          className="blob absolute w-[150px] h-[120px] bottom-16 right-20"
          style={{ background: "var(--wc-pink)", opacity: 0.18 }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="sec-tag">Get In Touch</div>
          <h2
            className="font-display font-bold"
            style={{ fontSize: "clamp(28px,4vw,44px)", color: "var(--ink)" }}
          >
            Let's Work Together
          </h2>
          <p
            className="text-sm mt-3 max-w-md mx-auto"
            style={{ color: "var(--muted)" }}
          >
            Have a project in mind? I'd love to hear about it. Drop me a message
            and let's create something amazing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-5"
          >
            {info.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-4 rounded-2xl"
                style={{
                  background: "#fff",
                  border: "1px solid var(--border)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}14` }}
                >
                  <item.icon size={18} style={{ color: item.color }} />
                </div>
                <div>
                  <div
                    className="text-xs font-body mb-0.5"
                    style={{ color: "var(--muted)" }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="text-sm font-semibold font-display"
                    style={{ color: "var(--ink)" }}
                  >
                    {item.val}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Socials */}
            <div
              className="p-5 rounded-2xl"
              style={{
                background: "#fff",
                border: "1px solid var(--border)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
            >
              <div
                className="text-xs font-bold font-display mb-4"
                style={{ color: "var(--muted)" }}
              >
                FIND ME ON
              </div>
              <div className="flex gap-3">
                {[FiGithub, FiLinkedin, FiTwitter].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="social-icon flex-1 rounded-xl"
                    style={{ borderRadius: "12px" }}
                  >
                    <Icon size={17} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3 p-8 rounded-2xl space-y-5"
            style={{
              background: "#fff",
              border: "1px solid var(--border)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-xs font-semibold font-display mb-2"
                  style={{ color: "var(--muted)" }}
                >
                  Your Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="Rafiqul Islam"
                  className="form-input"
                />
              </div>
              <div>
                <label
                  className="block text-xs font-semibold font-display mb-2"
                  style={{ color: "var(--muted)" }}
                >
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  placeholder="hello@example.com"
                  className="form-input"
                />
              </div>
            </div>
            <div>
              <label
                className="block text-xs font-semibold font-display mb-2"
                style={{ color: "var(--muted)" }}
              >
                Subject
              </label>
              <input
                name="subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required
                placeholder="Project Collaboration"
                className="form-input"
              />
            </div>
            <div>
              <label
                className="block text-xs font-semibold font-display mb-2"
                style={{ color: "var(--muted)" }}
              >
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="form-input"
                style={{ resize: "vertical" }}
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === "loading"}
              className="w-full py-4 rounded-xl text-sm font-bold font-display transition-all"
              style={{
                background:
                  status === "success"
                    ? "#34d399"
                    : status === "error"
                      ? "#f87171"
                      : "var(--orange)",
                color: "#fff",
                boxShadow: "0 6px 24px rgba(255,107,43,0.28)",
                opacity: status === "loading" ? 0.75 : 1,
              }}
            >
              {status === "loading"
                ? "Sending..."
                : status === "success"
                  ? "✓ Message Sent!"
                  : status === "error"
                    ? "✕ Try Again"
                    : "Send Message ✉️"}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
