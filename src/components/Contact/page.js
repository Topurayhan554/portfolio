"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axios from "axios";

const contactInfo = [
  {
    icon: "📧",
    label: "Email",
    value: "rafiqul@example.com",
    href: "mailto:rafiqul@example.com",
  },
  {
    icon: "📱",
    label: "Phone",
    value: "+880 1234-567890",
    href: "tel:+8801234567890",
  },
  { icon: "📍", label: "Location", value: "Dhaka, Bangladesh", href: "#" },
];

const socials = [
  { icon: "⌥", label: "GitHub", href: "https://github.com/" },
  { icon: "in", label: "LinkedIn", href: "https://linkedin.com/" },
  { icon: "𝕏", label: "Twitter", href: "https://twitter.com/" },
];

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
    <section id="contact" className="py-28">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="section-label mx-auto w-fit">Contact</div>
          <h2
            className="font-syne font-bold"
            style={{ fontSize: "clamp(30px, 4vw, 52px)" }}
          >
            Let's <span className="grad-text">work together</span>
          </h2>
          <p
            className="text-sm mt-4 max-w-md mx-auto"
            style={{ color: "var(--muted)", lineHeight: 1.8 }}
          >
            Have a project in mind or just want to say hello? I'd love to hear
            from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Info cards */}
            {contactInfo.map((info, i) => (
              <motion.a
                key={i}
                href={info.href}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="glass rounded-2xl p-5 flex items-center gap-4 cursor-pointer block"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{
                    background: "rgba(129,140,248,0.1)",
                    border: "1px solid rgba(129,140,248,0.2)",
                  }}
                >
                  {info.icon}
                </div>
                <div>
                  <div
                    className="text-xs mb-0.5"
                    style={{ color: "var(--muted)" }}
                  >
                    {info.label}
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: "var(--light)" }}
                  >
                    {info.value}
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Social links */}
            <div className="glass rounded-2xl p-5">
              <div
                className="text-xs mb-4 tracking-widest"
                style={{ color: "var(--muted)" }}
              >
                FIND ME ON
              </div>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="flex-1 py-3 rounded-xl text-center text-sm font-bold transition-all"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "var(--muted)",
                    }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-xs mb-2"
                    style={{ color: "var(--muted)" }}
                  >
                    Your Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Rafiqul Islam"
                    className="input-field"
                  />
                </div>
                <div>
                  <label
                    className="block text-xs mb-2"
                    style={{ color: "var(--muted)" }}
                  >
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="hello@example.com"
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-xs mb-2"
                  style={{ color: "var(--muted)" }}
                >
                  Subject
                </label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project Collaboration"
                  className="input-field"
                />
              </div>

              <div>
                <label
                  className="block text-xs mb-2"
                  style={{ color: "var(--muted)" }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="input-field"
                  style={{ resize: "vertical" }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background:
                    status === "success"
                      ? "linear-gradient(135deg, #34d399, #059669)"
                      : status === "error"
                        ? "linear-gradient(135deg, #f472b6, #db2777)"
                        : "linear-gradient(135deg, #818cf8, #34d399)",
                  color: "#07071a",
                  opacity: status === "loading" ? 0.7 : 1,
                }}
              >
                {status === "loading" && "Sending..."}
                {status === "success" && "✓ Message Sent!"}
                {status === "error" && "✕ Failed — Try again"}
                {status === "idle" && "Send Message ✉️"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
