import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hippodrome de Guadeloupe — Karukera",
  description:
    "Site officiel de l'Hippodrome de Guadeloupe. Courses hippiques, calendrier des courses, résultats et actualités.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={geist.variable}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
