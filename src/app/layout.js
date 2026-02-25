import "./globals.css";
import { Poppins, DM_Sans } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Topu Rayhan — Full Stack Developer",
  description: "Portfolio of Topu Rayhan — Full Stack Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
