'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  useEffect(() => {
    // Hero entrance animation
    gsap.from('.hero', { 
      y: 40, 
      opacity: 0, 
      duration: 0.6, 
      ease: 'power3.out',
      delay: 0.3
    });

    // Card animations with scroll trigger
    const cardEls = gsap.utils.toArray('.card');
    cardEls.forEach((card: any) => {
      gsap.from(card, {
        y: 16,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 92%'
        }
      });
    });
  }, []);

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Hero Section */}
          <section className="hero text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gold" style={{textShadow: '0 4px 32px #6d1a1a'}}>
              Tentang Komando'45
            </h1>
            <p className="text-lg text-muted max-w-3xl mx-auto">
              Komando'45 adalah organisasi mahasiswa Indonesia di Taylor's University, Malaysia.
              Kami berkomitmen untuk menjadi wadah bagi mahasiswa Indonesia untuk berinteraksi, 
              berkolaborasi, dan berkontribusi.
            </p>
          </section>

          {/* History Section */}
          <section className="card mb-8 p-8 border-2 border-gold rounded-lg" 
            style={{background: 'linear-gradient(135deg, #6d1a1a 0%, #a02c2c 100%)'}}>
            <h2 className="text-3xl font-bold mb-4 text-gold">Sejarah Kami</h2>
            <p className="text-muted leading-relaxed">
              Didirikan pada tahun 2020, Komando'45 telah menjadi rumah bagi ratusan mahasiswa Indonesia 
              di Taylor's University. Nama "Komando'45" terinspirasi dari semangat kemerdekaan Indonesia 
              tahun 1945, yang mencerminkan dedikasi kami untuk membangun komunitas yang kuat dan berdaya.
            </p>
          </section>

          {/* Mission Section */}
          <section className="card mb-8 p-8 border-2 border-gold rounded-lg" 
            style={{background: 'linear-gradient(135deg, #6d1a1a 0%, #a02c2c 100%)'}}>
            <h2 className="text-3xl font-bold mb-4 text-gold">Misi Kami</h2>
            <ul className="list-disc list-inside text-muted space-y-2 leading-relaxed">
              <li>Memfasilitasi kegiatan akademik yang mendukung prestasi mahasiswa</li>
              <li>Menyelenggarakan event budaya yang memperkuat identitas Indonesia</li>
              <li>Membangun jaringan profesional untuk pengembangan karir</li>
              <li>Menciptakan lingkungan yang inklusif dan mendukung</li>
            </ul>
          </section>

          {/* Values Section */}
          <section className="card mb-8 p-8 border-2 border-gold rounded-lg" 
            style={{background: 'linear-gradient(135deg, #6d1a1a 0%, #a02c2c 100%)'}}>
            <h2 className="text-3xl font-bold mb-4 text-gold">Nilai-Nilai Kami</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-gold mb-2">Kolaborasi</h3>
                <p className="text-muted">Bekerja sama untuk mencapai tujuan bersama</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gold mb-2">Inovasi</h3>
                <p className="text-muted">Mendorong kreativitas dan pemikiran baru</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gold mb-2">Integritas</h3>
                <p className="text-muted">Berpegang pada prinsip dan kejujuran</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gold mb-2">Keberagaman</h3>
                <p className="text-muted">Menghargai perbedaan dan perspektif</p>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="card text-center p-8 border-2 border-gold rounded-lg" 
            style={{background: 'linear-gradient(135deg, #6d1a1a 0%, #a02c2c 100%)'}}>
            <h2 className="text-3xl font-bold mb-4 text-gold">Bergabunglah dengan Kami</h2>
            <p className="text-muted mb-6">
              Tertarik untuk menjadi bagian dari Komando'45? Hubungi kami untuk informasi lebih lanjut.
            </p>
            <a 
              href="/contact" 
              className="inline-block px-8 py-3 text-lg font-semibold text-gold border-2 border-gold hover:bg-gold hover:text-primary transition-all"
            >
              Hubungi Kami
            </a>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary to-primary-dark py-4 text-center">
        <div className="container mx-auto">
          &copy; 2025 Komando45 — Built with Next.js + React + GSAP + Tailwind CSS
        </div>
      </footer>
    </>
  );
}
