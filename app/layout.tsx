import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prashant Choudhary - AI/ML Engineer & Full-Stack Developer",
  description: "AI/ML engineer building PocketLLM, EchoGen.ai, hiVPN, and more. Flutter, FastAPI, Supabase, LangGraph, Next.js. Open-source and production-focused.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
