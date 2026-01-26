import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Komando'45 — Home",
  description: "Menjadi wadah bagi mahasiswa Indonesia untuk berinteraksi, berkolaborasi, dan berkontribusi di Taylor's University.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-brand-bg text-muted antialiased">
        {children}
      </body>
    </html>
  );
}
