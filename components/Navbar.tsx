'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-primary to-primary-dark shadow-lg sticky top-0 z-50" id="mainNavbar">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <Link className="flex items-center gap-2 text-gold text-xl font-bold tracking-widest" href="/">
            <Image 
              src="/images/Komando.svg" 
              alt="Komando45 logo" 
              id="navbarLogoAnim" 
              className="h-9 transition-all duration-400"
              width={36}
              height={36}
            />
            <span id="navbarTextAnim" className="navbar-text-anim" style={{display: 'none'}}>
              KOMANDO'45
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link className="text-gold font-semibold tracking-wide hover:text-white" href="/">
              Home
            </Link>
            <Link className="text-gold font-semibold tracking-wide hover:text-white" href="/about">
              About
            </Link>
            <Link className="text-gold font-semibold tracking-wide hover:text-white" href="/contact">
              Contact
            </Link>
          </div>
          <button 
            className="md:hidden text-gold"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden pb-4">
            <Link className="block py-2 text-gold font-semibold tracking-wide hover:text-white" href="/">
              Home
            </Link>
            <Link className="block py-2 text-gold font-semibold tracking-wide hover:text-white" href="/about">
              About
            </Link>
            <Link className="block py-2 text-gold font-semibold tracking-wide hover:text-white" href="/contact">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
