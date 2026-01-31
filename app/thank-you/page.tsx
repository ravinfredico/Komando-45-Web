"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import Navbar from "@/components/ui/Navbar";
import Link from "next/link";

export default function ThankYou() {
  useEffect(() => {
    // Animate the success message
    gsap.from(".success-message", {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      delay: 0.2,
    });
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="success-message text-center max-w-2xl">
          <div className="mb-8">
            <svg
              className="mx-auto w-24 h-24 text-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gold">
            Terima Kasih!
          </h1>

          <p className="text-lg text-muted mb-8">
            Pesan Anda telah berhasil dikirim. Kami akan menghubungi Anda
            segera.
          </p>

          <Link
            href="/"
            className="inline-block px-8 py-3 text-lg font-semibold text-gold border-2 border-gold bg-gradient-to-r from-primary to-primary-dark hover:bg-gradient-to-l transition-all"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary to-primary-dark py-4 text-center">
        <div className="container mx-auto">
          &copy; 2025 Komando45 — Built with Next.js + React + GSAP + Tailwind
          CSS
        </div>
      </footer>
    </>
  );
}
