'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Preloader from '@/components/Preloader';
import Link from 'next/link';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  useEffect(() => {
    // Hero entrance animation
    gsap.from('.hero', { 
      y: 40, 
      opacity: 0, 
      duration: 0.6, 
      ease: 'power3.out',
      delay: 0.5 
    });

    // Chapter animations with scroll trigger
    gsap.utils.toArray('.chapter').forEach((section: any) => {
      const content = section.querySelector('.content') || section;
      
      gsap.from(content, {
        y: 48,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          end: 'top 40%',
          toggleActions: 'play none none reverse'
        }
      });

      // Subtle parallax effect
      gsap.to(content, {
        y: -14,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.4
        }
      });
    });

    // Scroll progress indicator
    const updateScrollIndicator = () => {
      const scrollIndicator = document.getElementById('scrollIndicator');
      if (!scrollIndicator) return;

      const doc = document.documentElement;
      const scrollTop = window.pageYOffset || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const pct = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

      const track = scrollIndicator.querySelector('.scroll-track');
      const thumb = scrollIndicator.querySelector('.scroll-thumb') as HTMLElement;
      
      if (!track || !thumb) return;

      const viewRatio = Math.max(0.06, Math.min(0.36, doc.clientHeight / doc.scrollHeight));
      const thumbHeight = Math.max(6, Math.round(viewRatio * track.clientHeight));
      thumb.style.height = thumbHeight + 'px';

      const maxTop = track.clientHeight - thumbHeight;
      thumb.style.transform = 'translateY(' + Math.round(pct * maxTop) + 'px)';
    };

    window.addEventListener('scroll', updateScrollIndicator, { passive: true });
    window.addEventListener('resize', updateScrollIndicator);
    updateScrollIndicator();

    return () => {
      window.removeEventListener('scroll', updateScrollIndicator);
      window.removeEventListener('resize', updateScrollIndicator);
    };
  }, []);

  return (
    <>
      <Preloader />
      <Navbar />
      
      <main className="story-container">
        {/* Chapter: Introduction */}
        <section id="intro" className="chapter hero min-h-screen flex items-center justify-center text-center">
          <div className="content max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-3 text-gold" style={{textShadow: '0 4px 32px #6d1a1a'}}>
              KOMANDO'45
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto">
              Menjadi wadah bagi mahasiswa Indonesia untuk berinteraksi, berkolaborasi, dan berkontribusi di Taylor's University.
            </p>
            <Link 
              className="inline-block mt-4 px-8 py-3 text-lg font-semibold text-gold border-2 border-gold bg-gradient-to-r from-primary to-primary-dark hover:bg-gradient-to-l transition-all" 
              href="/contact"
            >
              Bergabung Dengan Kami
            </Link>
          </div>
        </section>

        {/* Chapter: What we do */}
        <section 
          id="what-we-do" 
          className="chapter min-h-screen flex items-center justify-center" 
          style={{background: 'linear-gradient(180deg, rgba(24,17,18,0.6), rgba(40,22,22,0.6))'}}
        >
          <div className="content container mx-auto text-center px-4">
            <h2 className="text-4xl font-bold mb-3 text-gold">Apa yang Kami Lakukan</h2>
            <p className="text-lg text-muted">
              Kami menyelenggarakan kegiatan pengembangan diri, workshop karir, acara budaya, dan kegiatan sosial 
              untuk mempererat persaudaraan antar mahasiswa Indonesia di Taylor's University.
            </p>
          </div>
        </section>

        {/* Chapter: Divisions */}
        <section id="divisions" className="chapter min-h-screen flex items-center justify-center">
          <div className="content container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-4 text-center text-gold">Badan & Divisi</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="w-full md:w-1/3 p-4">
                <div 
                  className="h-full text-center p-6 border-2 border-gold rounded-lg" 
                  style={{background: 'linear-gradient(135deg, #6d1a1a 0%, #a02c2c 100%)'}}
                >
                  <h5 className="text-xl font-bold text-gold">Divisi Akademik</h5>
                  <p className="text-muted">Mendukung kegiatan akademik dan studi anggota.</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 p-4">
                <div 
                  className="h-full text-center p-6 border-2 border-gold rounded-lg" 
                  style={{background: 'linear-gradient(135deg, #6d1a1a 0%, #a02c2c 100%)'}}
                >
                  <h5 className="text-xl font-bold text-gold">Divisi Budaya & Sosial</h5>
                  <p className="text-muted">Merencanakan event budaya, pentas, dan kegiatan sosial.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter: Vision & Mission */}
        <section id="vision" className="chapter min-h-screen flex items-center justify-center">
          <div className="content container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-4xl font-bold mb-6 text-gold">Visi & Misi</h2>
            <div className="space-y-6">
              <div className="p-6 border-2 border-gold rounded-lg" style={{background: 'linear-gradient(135deg, #6d1a1a 0%, #a02c2c 100%)'}}>
                <h3 className="text-2xl font-bold text-gold mb-3">Visi</h3>
                <p className="text-muted">
                  Menjadi komunitas mahasiswa Indonesia terdepan di Malaysia yang mendorong kolaborasi, 
                  inovasi, dan pengembangan diri.
                </p>
              </div>
              <div className="p-6 border-2 border-gold rounded-lg" style={{background: 'linear-gradient(135deg, #6d1a1a 0%, #a02c2c 100%)'}}>
                <h3 className="text-2xl font-bold text-gold mb-3">Misi</h3>
                <p className="text-muted">
                  Memfasilitasi kegiatan akademik, budaya, dan sosial yang berkualitas untuk mahasiswa Indonesia 
                  di Taylor's University.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Scroll Progress Indicator */}
      <div id="scrollIndicator" className="scroll-indicator">
        <div className="scroll-track">
          <div className="scroll-thumb"></div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary to-primary-dark py-4 text-center">
        <div className="container mx-auto">
          &copy; 2025 Komando45 — Built with Next.js + React + GSAP + Tailwind CSS
        </div>
      </footer>
    </>
  );
}

