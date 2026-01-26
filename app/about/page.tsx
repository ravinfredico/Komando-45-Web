'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const executiveTeam = [
  { name: 'Richard Anthony', role: 'President' },
  { name: 'Nadya Liandre', role: 'Vice President' },
  { name: 'Angelique Clarissa', role: 'Secretary' },
  { name: 'Ravin Fredico', role: 'Treasurer' },
];

const departments = [
  {
    name: 'Event Department',
    description: 'Departemen Event KOMANDO\'45 adalah divisi yang bertanggung jawab untuk merancang ide acara, menyusun proposal, mengurus seluruh kebutuhan pra-acara, serta memastikan pelaksanaan acara pada hari-H berjalan tertata, efektif, dan memberikan pengalaman terbaik bagi seluruh mahasiswa Indonesia yang ada di Taylor\'s University.',
  },
  {
    name: 'Public Relations Department',
    description: 'Public Relations KOMANDO\'45 adalah divisi yang bertugas membangun dan menjaga hubungan baik dengan pihak internal maupun eksternal, mengelola komunikasi resmi organisasi, serta memastikan citra KOMANDO\'45 tetap positif dan profesional. PR juga menangani media relations, publikasi, dan koordinasi dengan mitra, sponsor, serta komunitas mahasiswa.',
  },
  {
    name: 'Marketing Department',
    description: 'Departemen Marketing KOMANDO\'45 adalah divisi yang bertanggung jawab merancang strategi pemasaran, mengelola promosi acara, serta meningkatkan jangkauan dan visibilitas organisasi. Divisi ini memastikan setiap program dan kegiatan KOMANDO\'45 tersampaikan dengan efektif melalui konten kreatif dan komunikasi terarah di platform TikTok, YouTube, dan Instagram.',
  },
];

export default function About() {
  useEffect(() => {
    gsap.from('.hero', { 
      y: 40, 
      opacity: 0, 
      duration: 0.6, 
      ease: 'power3.out',
      delay: 0.3
    });

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
            <p className="text-lg text-gold mb-2 tracking-widest">GETTING TO KNOW</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gold" style={{textShadow: '0 4px 32px #6d1a1a'}}>
              PPI Malaysia in Taylor's University
            </h1>
            <p className="text-2xl font-semibold text-muted">
              KOMANDO'45 25/26
            </p>
            <p className="text-lg text-gold mt-2 italic">
              ABIMANYU-SAKHYABANDHA
            </p>
          </section>

          {/* About Section */}
          <section className="card mb-8 p-8 border-2 border-gold rounded-lg" 
            style={{background: 'linear-gradient(135deg, #6d1a1a 0%, #a02c2c 100%)'}}>
            <h2 className="text-3xl font-bold mb-4 text-gold">Halo, Kami KOMANDO'45!</h2>
            <p className="text-muted leading-relaxed mb-4">
              Komando'45 adalah Perhimpunan Pelajar Indonesia (PPI) di Taylor's University. 
              Nama organisasi kami berasal dari singkatan dari <strong className="text-gold">Komunitas Mahasiswa Indonesia dengan Semangat '45</strong>.
            </p>
            <p className="text-muted leading-relaxed">
              Berdiri sejak <strong className="text-gold">2012</strong>, organisasi ini menjadi wadah resmi bagi mahasiswa Indonesia 
              untuk berkegiatan, berorganisasi, dan mengembangkan diri di lingkungan Taylor's University.
            </p>
          </section>

          {/* Executive Committee Section */}
          <section className="card mb-8 p-8 border-2 border-gold rounded-lg" 
            style={{background: 'linear-gradient(135deg, #6d1a1a 0%, #a02c2c 100%)'}}>
            <h2 className="text-3xl font-bold mb-6 text-gold text-center">Executive Committee</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {executiveTeam.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gold/20 flex items-center justify-center">
                    <span className="text-2xl text-gold">{member.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gold">{member.name}</h3>
                  <p className="text-muted text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Departments Section */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-6 text-gold text-center">Our Departments</h2>
            <div className="space-y-6">
              {departments.map((dept) => (
                <div 
                  key={dept.name}
                  className="card p-8 border-2 border-gold rounded-lg" 
                  style={{background: 'linear-gradient(135deg, #6d1a1a 0%, #a02c2c 100%)'}}
                >
                  <h3 className="text-2xl font-bold mb-4 text-gold">{dept.name}</h3>
                  <p className="text-muted leading-relaxed">{dept.description}</p>
                </div>
              ))}
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
              className="inline-block px-8 py-3 text-lg font-semibold text-gold border-2 border-gold hover:bg-gold hover:text-primary transition-all rounded"
            >
              Hubungi Kami
            </a>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary to-primary-dark py-4 text-center">
        <div className="container mx-auto">
          &copy; 2025 Komando'45  Built with Next.js + React + GSAP + Tailwind CSS
        </div>
      </footer>
    </>
  );
}
