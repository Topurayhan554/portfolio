/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ["var(--font-syne)"],
        jakarta: ["var(--font-jakarta)"],
      },
      colors: {
        bg: "#07071a",
        surface: "#0d0d2b",
        card: "#111130",
        border: "rgba(255,255,255,0.07)",
        accent: "#818cf8",
        "accent-2": "#34d399",
        "accent-3": "#f472b6",
        muted: "#64648a",
        light: "#c4c4e0",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        marquee: "marquee 25s linear infinite",
        "marquee-2": "marquee2 25s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
