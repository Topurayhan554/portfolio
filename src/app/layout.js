import "./globals.css";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  title: "Rafiqul Islam — Full Stack Developer",
  description:
    "Portfolio of Rafiqul Islam — Full Stack Developer specializing in Next.js, React, Node.js, and modern web technologies.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "Bangladesh",
  ],
  openGraph: {
    title: "Rafiqul Islam — Full Stack Developer",
    description:
      "Building modern web experiences with cutting-edge technologies.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="noise">{children}</body>
    </html>
  );
}
