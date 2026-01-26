'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Only show the preloader once per browser session
    const seen = sessionStorage.getItem('komando45_seen');
    
    if (!seen) {
      sessionStorage.setItem('komando45_seen', 'true');
      
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => {
          setIsVisible(false);
        }
      });

      const preloader = document.querySelector('.preloader');
      const logo = document.querySelector('.preloader .logo');
      const splash = document.querySelector('.splash-text');

      if (preloader && splash) {
        // Lock scrolling during preload
        document.documentElement.classList.add('preload-active');
        
        // Splash animation
        tl.set(splash, { autoAlpha: 1, x: '-50%', y: '-50%', scale: 1 });
        
        // Animate splash from left to right while scaling up
        const moveX = Math.max(window.innerWidth * 0.28, 300);
        tl.fromTo(
          splash,
          { x: '-80%', autoAlpha: 0 },
          { x: moveX, autoAlpha: 1, scale: 3.2, duration: 1.8, ease: 'power3.out' }
        );
        
        // Fade logo and slide preloader away
        tl.to(logo, { y: -20, opacity: 0, duration: 0.45 }, '+=0.2');
        tl.to(preloader, { y: '-100%', duration: 0.75, delay: 0.06 }, '+=0');
        tl.set(preloader, { display: 'none' });
        
        // Unlock scrolling
        tl.call(() => {
          document.documentElement.classList.remove('preload-active');
        });
      }
    } else {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style jsx global>{`
        .preload-active {
          overflow: hidden !important;
        }
      `}</style>
      <div className="preloader">
        <div className="preloader-inner">
          <div className="logo">
            <Image 
              src="/images/Komando.svg" 
              alt="Komando45 logo" 
              className="preloader-logo"
              width={80}
              height={80}
            />
            <div className="brand-text">Komando'45</div>
          </div>
          <div className="splash-text">Komando'45</div>
        </div>
      </div>
    </>
  );
}
