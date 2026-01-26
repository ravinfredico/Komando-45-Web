'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Navbar from '@/components/Navbar';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    // Hero entrance animation
    gsap.from('.hero', { 
      y: 40, 
      opacity: 0, 
      duration: 0.6, 
      ease: 'power3.out',
      delay: 0.3
    });

    // Form animation
    gsap.from('.contact-form', { 
      y: 30, 
      opacity: 0, 
      duration: 0.8, 
      ease: 'power3.out',
      delay: 0.5
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields before sending.');
      return;
    }
    // Form will be submitted to Formspree
    const form = e.target as HTMLFormElement;
    form.submit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Hero Section */}
          <section className="hero text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gold" style={{textShadow: '0 4px 32px #6d1a1a'}}>
              Hubungi Kami
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Ada pertanyaan atau ingin bergabung dengan Komando'45? 
              Kami senang mendengar dari Anda. Isi formulir di bawah ini dan kami akan segera menghubungi Anda.
            </p>
          </section>

          {/* Contact Form */}
          <section className="contact-form">
            <form 
              id="contactForm"
              action="https://formspree.io/f/mvglzogr" 
              method="POST"
              onSubmit={handleSubmit}
              className="p-8 border-2 border-gold rounded-lg" 
              style={{background: 'linear-gradient(135deg, #6d1a1a 0%, #a02c2c 100%)'}}
            >
              <input type="hidden" name="_next" value="/thank-you" />
              
              <div className="mb-6">
                <label htmlFor="name" className="block text-gold font-semibold mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-brand-bg border border-gold text-muted rounded focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/50"
                  placeholder="Masukkan nama Anda"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-gold font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-brand-bg border border-gold text-muted rounded focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/50"
                  placeholder="nama@email.com"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gold font-semibold mb-2">
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-brand-bg border border-gold text-muted rounded focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/50"
                  placeholder="Tulis pesan Anda di sini..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-3 text-lg font-semibold text-brand-bg bg-gold hover:bg-gold/90 transition-all rounded"
              >
                Kirim Pesan
              </button>
            </form>
          </section>

          {/* Contact Info */}
          <section className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gold">Informasi Kontak</h2>
            <p className="text-muted mb-2">
              Email: info@komando45.com
            </p>
            <p className="text-muted">
              Taylor's University, Subang Jaya, Malaysia
            </p>
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
