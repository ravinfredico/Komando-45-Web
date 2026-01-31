"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const executiveTeam = [
  {
    name: "Richard Anthony",
    role: "President",
    image: "/images/members/richard.jpg",
  },
  {
    name: "Nadya Liandre",
    role: "Vice President",
    image: "/images/members/nadya.jpg",
  },
  {
    name: "Angelique Clarissa",
    role: "Secretary",
    image: "/images/members/angelique.jpg",
  },
  {
    name: "Ravin Fredico",
    role: "Treasurer",
    image: "/images/members/ravin.jpg",
  },
];

const departments = [
  {
    name: "Event Department",
    description:
      "Departemen Event KOMANDO'45 adalah divisi yang bertanggung jawab untuk merancang ide acara, menyusun proposal, mengurus seluruh kebutuhan pra-acara, serta memastikan pelaksanaan acara pada hari-H berjalan tertata, efektif, dan memberikan pengalaman terbaik bagi seluruh mahasiswa Indonesia yang ada di Taylor's University.",
    members: [
      { name: "Member 1", image: "/images/members/event1.jpg" },
      { name: "Member 2", image: "/images/members/event2.jpg" },
    ],
  },
  {
    name: "Public Relations Department",
    description:
      "Public Relations KOMANDO'45 adalah divisi yang bertugas membangun dan menjaga hubungan baik dengan pihak internal maupun eksternal, mengelola komunikasi resmi organisasi, serta memastikan citra KOMANDO'45 tetap positif dan profesional. PR juga menangani media relations, publikasi, dan koordinasi dengan mitra, sponsor, serta komunitas mahasiswa.",
    members: [
      { name: "Member 1", image: "/images/members/pr1.jpg" },
      { name: "Member 2", image: "/images/members/pr2.jpg" },
    ],
  },
  {
    name: "Marketing Department",
    description:
      "Departemen Marketing KOMANDO'45 adalah divisi yang bertanggung jawab merancang strategi pemasaran, mengelola promosi acara, serta meningkatkan jangkauan dan visibilitas organisasi. Divisi ini memastikan setiap program dan kegiatan KOMANDO'45 tersampaikan dengan efektif melalui konten kreatif dan komunikasi terarah di platform TikTok, YouTube, dan Instagram.",
    members: [
      { name: "Member 1", image: "/images/members/marketing1.jpg" },
      { name: "Member 2", image: "/images/members/marketing2.jpg" },
    ],
  },
  {
    name: "MDP Department",
    description:
      "Member Development Program (MDP) KOMANDO'45 adalah divisi yang bertanggung jawab untuk mengembangkan potensi dan keterampilan anggota melalui berbagai program pelatihan, workshop, dan kegiatan pengembangan diri. MDP memastikan setiap anggota mendapatkan kesempatan untuk bertumbuh secara profesional dan personal selama berorganisasi di KOMANDO'45.",
    members: [
      { name: "Member 1", image: "/images/members/mdp1.jpg" },
      { name: "Member 2", image: "/images/members/mdp2.jpg" },
    ],
  },
];

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("#home");

  // Navigation items
  const navItems = [
    { num: "01", title: "HOME", href: "#home" },
    { num: "02", title: "EVENTS", href: "#gallery" },
    { num: "03", title: "ABOUT US", href: "#about" },
    { num: "04", title: "TEAM", href: "#team" },
    { num: "05", title: "DEPARTMENTS", href: "#departments" },
    { num: "06", title: "CONTACT", href: "#contact" },
  ];

  useEffect(() => {
    // Hero entrance animation
    gsap.fromTo(
      ".hero-content",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 },
    );

    // Section animations with scroll trigger
    gsap.utils.toArray(".section").forEach((section: any) => {
      gsap.fromTo(
        section,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    // Cleanup function to reset on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields before sending.");
      return;
    }
    const form = e.target as HTMLFormElement;
    form.submit();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <main>
      {/* Logo - Fixed Top Right - Click to toggle menu */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed z-50 cursor-pointer bg-transparent p-2 hover:scale-110 transition-transform duration-300 btn-no-outline"
        style={{ top: "24px", right: "24px" }}
      >
        <img
          src="images/Komando.svg"
          alt="KOMANDO'45 Logo"
          style={{ width: "40px", height: "40px" }}
        />
      </button>

      {/* ==================== RIGHT SIDE NAVIGATION MENU ==================== */}
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-500 ${
          menuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Right side panel */}
      <div
        className={`fixed top-0 h-screen z-40 transition-transform duration-500 ease-out backdrop-blur-md ${
          menuOpen ? "" : "pointer-events-none"
        }`}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          width: "350px",
          right: "0px",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 text-white text-2xl font-light hover:scale-110 transition-transform cursor-pointer bg-transparent btn-no-outline"
        >
          ✕
        </button>

        {/* Navigation Items */}
        <nav className="h-full flex flex-col justify-center px-10">
          {navItems.map((item, index) => (
            <a
              key={item.num}
              href={item.href}
              onClick={() => {
                setActivePage(item.href);
                setMenuOpen(false);
              }}
              className={`group flex items-baseline gap-4 py-1 transition-all duration-300 hover:translate-x-2 ${
                menuOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              }`}
              style={{
                transitionDelay: menuOpen ? `${150 + index * 60}ms` : "0ms",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                  color:
                    activePage === item.href
                      ? "#ef4444"
                      : "rgba(255,255,255,0.5)",
                }}
              >
                {item.num}
              </span>
              <span
                className="font-black uppercase tracking-tighter transition-colors"
                style={{
                  fontStyle: "italic",
                  fontSize: "45px",
                  lineHeight: "1",
                  color: activePage === item.href ? "#ef4444" : "#ffffff",
                }}
              >
                {item.title}
              </span>
            </a>
          ))}
        </nav>
      </div>

      {/* ==================== FULL-SCREEN HERO ==================== */}
      <section
        id="home"
        className="hero relative h-screen w-full flex items-center justify-center text-center overflow-hidden"
        style={{ opacity: 1 }}
      >
        {/* Background - Gradient fallback when no image */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />

        {/* Background Image using img tag for better loading */}
        <img
          src="images/hero-bg.jpg"
          alt="KOMANDO'45 Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Red accent gradient (Indonesian flag inspired) */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/30 via-transparent to-black/80" />

        {/* Hero Content */}
        <div className="hero-content relative z-10 px-6 max-w-4xl">
          {/* Title with modern styling */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-2 tracking-tighter uppercase"
            style={{
              fontFamily: "'Poppins', sans-serif",
              textShadow: "0 4px 30px rgba(49, 1, 1, 0.5)",
            }}
          >
            KOMANDO'45
          </h1>

          {/* Subtitle line */}
          <p className="text-sm md:text-base uppercase tracking-[0.3em] mb-6 opacity-70">
            Indonesian Students Association
          </p>

          {/* Main description */}
          <p
            className="text-base md:text-xl max-w-xl mx-auto mb-10 opacity-90 leading-relaxed"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Wadah mahasiswa Indonesia untuk berinteraksi, berkolaborasi, dan
            berkontribusi di Taylor's University.
          </p>

          {/* Buttons with modern styling */}
          <div className="flex flex-row gap-3 justify-center">
            <button
              onClick={() => (window.location.href = "#contact")}
              className="px-4 py-1.5 bg-red-600 hover:bg-red-500 font-medium text-xs transition-all duration-300 hover:scale-105 rounded-full cursor-pointer text-white border-none outline-none focus:outline-none"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Bergabung Dengan Kami
            </button>
            <button
              onClick={() => (window.location.href = "#about")}
              className="px-4 py-1.5 font-medium text-xs bg-white text-black hover:bg-zinc-200 transition-all duration-300 hover:scale-105 rounded-full cursor-pointer border-none outline-none focus:outline-none"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Tentang Kami
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* ==================== EVENTS INTRO SECTION ==================== */}
      <section className="section min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        {/* Large background text */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none"
          style={{
            fontSize: "25vw",
            fontWeight: "900",
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "-0.05em",
          }}
        >
          EVENTS
        </div>

        {/* Main content */}
        <div className="relative z-10 text-center px-6">
          <p className="text-sm uppercase tracking-[0.3em] mb-4 opacity-60">
            What we do
          </p>
          <h2
            className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter mb-6"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontStyle: "italic",
            }}
          >
            EVENTS
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-80 mb-8">
            From cultural celebrations to career workshops, we bring Indonesian
            students together through meaningful experiences.
          </p>
        </div>
      </section>

      {/* ==================== PAST EVENT: KOMANDO CUP 2025 ==================== */}
      <section
        id="past-komandocup2025"
        className="section py-10 bg-black flex flex-col items-center justify-center"
      >
        <section className="max-w-6xl w-full px-6 py-12 flex flex-col lg:flex-row gap-12">
          {/* Main Visual & Title */}
          <div className="flex-1 min-w-[320px] flex flex-col items-center justify-center">
            <div className="relative w-full rounded-3xl overflow-hidden aspect-video shadow-2xl mb-8">
              <img
                src="images/komandocup2025/komandocup2025.jpg"
                alt="Komando Cup 2025 Poster"
                className="w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/60 to-red-900/60" />
            </div>
            {/* Title with shadow background */}
            <div className="relative w-full flex flex-col items-center justify-center mb-2">
              <div
                className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none"
                style={{
                  fontSize: "10vw",
                  fontWeight: 900,
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: "-0.05em",
                }}
              >
                KOMANDO CUP
              </div>
              <p className="text-sm uppercase tracking-[0.3em] mb-2 opacity-70 z-10">
                Past Event
              </p>
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter italic text-white z-10 mb-2"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontStyle: "italic",
                }}
              >
                <span className="bg-gradient-to-r from-red-400 via-yellow-200 to-white bg-clip-text text-transparent">
                  Komando Cup 2025
                </span>
              </h1>
            </div>
          </div>

          {/* Description, Aftermovie, Docs */}
          <div className="flex-1 min-w-[400px] flex flex-col">
            <div>
              <div
                className="text-base max-w-2xl leading-relaxed text-white/80 font-normal text-center"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontStyle: "normal",
                }}
              >
                Komando Cup 2025 was an exhilarating sports tournament that
                brought together Indonesian students at Taylor's University for
                a day filled with competition, camaraderie, and unforgettable
                moments. Held on May 1, 2025, the event featured a variety of
                sports including soccer, badminton, basketball, billiard, and
                mobile legends, showcasing the diverse athletic talents of our
                community.
              </div>
              <div>
                <h1></h1>
              </div>
              <div className="mt-8 flex justify-center items-center gap-4 mb-4 ">
                <div className="flex flex-col md:flex-row gap-6 items-center justify-center w-full">
                  {/* Aftermovie (left) */}
                  <div style={{ maxWidth: "500px", width: "200%" }}>
                    <iframe
                      src="https://www.youtube.com/embed/WfCz-laE1rw?list=PLf2Og0QW9vsLPMRSXGHnMvOCyKYhF0kAD&index=3"
                      title="Komando Cup 2025 Aftermovie"
                      className="w-full aspect-video min-h-[200px]"
                      style={{ border: "none" }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <div className="w-full text-center mt-3">
                      <p
                        className="text-xs uppercase tracking-[0.1em] text-white/70 mb-0.5 font-semibold"
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontStyle: "italic",
                        }}
                      >
                        Aftermovie Komando Cup 2025
                      </p>
                    </div>
                  </div>
                  {/* Documentation (right) */}
                  <div className="mb-24">
                    <h3 className="text-base font-bold text-yellow-300 mb-5 mt-5 uppercase tracking-wide text-center">
                      Documentation
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-24">
                      {[
                        "36037210-349F-424E-A643-48862FFF43EC-27585-000007AD94BB7674.jpg",
                        "9846947C-0737-49AF-828D-2855A0858CFF-18787-0000054C340EE491.jpg",
                        "DSC03896.JPG",
                        "DSC04897.JPG",
                      ].map((img, idx) => (
                        <div
                          key={img}
                          className="overflow-hidden rounded bg-zinc-800"
                          style={{ width: "200px", height: "200px" }}
                        >
                          <img
                            src={`images/komandocup2025/${img}`}
                            alt={`Komando Cup 2025 Documentation ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div style={{ marginBottom: "64px" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ==================== GALLERY SECTION ==================== */}
        <div className="w-full max-w-6xl px-6 mx-auto ">
          {/* ==================== INSTAGRAM FEED - AUTO-UPDATING ==================== */}
          <section id="instagram-feed" className="my-20">
            {/* LightWidget - 100% FREE, auto-updates */}
            <div className="flex justify-center mb-6">
              <div className="w-[80vw] max-w-6xl aspect-[3/1] mx-auto rounded-2xl overflow-hidden shadow-lg bg-zinc-900/40">
                <iframe
                  src="//lightwidget.com/widgets/81b41e38b5845470ba2310cb1607ba7d.html"
                  title="Instagram Feed"
                  className="w-full h-full border-0"
                  allowTransparency={true}
                />
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* ==================== VISION & MISSION ==================== */}
      <section id="vision" className="section mb-20">
  <h2
    className="text-4xl md:text-5xl font-bold mb-12 text-center text-white tracking-tight animate-fadein"
    style={{ fontFamily: "Poppins, sans-serif", letterSpacing: "-0.02em" }}
  >
    Visi & Misi
  </h2>
  <div className="relative flex flex-col md:flex-row gap-0 justify-center items-stretch animate-fadein" style={{ animationDelay: "0.2s", animationDuration: "1.2s" }}>
    <div className="flex-1 flex flex-col items-center px-4 md:px-12">
      <h3 className="text-2xl font-bold mb-6 text-yellow-200 tracking-widest uppercase animate-fadein" style={{ fontFamily: 'Oswald, Poppins, sans-serif', letterSpacing: '0.12em' }}>Visi</h3>
      <p className="text-lg text-center text-white/90 leading-relaxed animate-fadein" style={{ fontFamily: 'Montserrat, Poppins, sans-serif', fontWeight: 400 }}>
        Mewujudkan Komando’45 sebagai rumah persaudaraan yang kokoh dan wadah generasi muda yang berani, idealis, serta tulus dengan citra positif, pencapaian nyata, dan legacy bermanfaat bagi anggota dan komunitas.
      </p>
    </div>
    {/* Vertical Divider for desktop */}
    <div className="hidden md:flex items-center" aria-hidden="true">
      <div className="h-40 border-l border-zinc-600 mx-8"></div>
    </div>
    <div className="flex-1 flex flex-col items-center px-4 md:px-12">
      <h3 className="text-2xl font-bold mb-6 text-red-200 tracking-widest uppercase animate-fadein" style={{ fontFamily: 'Oswald, Poppins, sans-serif', letterSpacing: '0.12em' }}>Misi</h3>
      <ul className="text-lg text-white/90 space-y-2 list-inside list-decimal animate-fadein" style={{ fontFamily: 'Montserrat, Poppins, sans-serif', fontWeight: 400 }}>
        <li>Meneguhkan keberanian dan ketulusan</li>
        <li>Memperkuat persaudaraan dan kebersamaan</li>
        <li>Mewariskan legacy yang bermakna</li>
      </ul>
    </div>
  </div>
</section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section id="about" className="section mb-20">
        <p
          className="text-lg md:text-xl tracking-widest mb-4 text-center text-yellow-300 font-bold uppercase animate-fadein"
          style={{
            fontFamily: "Oswald, Poppins, sans-serif",
            letterSpacing: "0.18em",
          }}
        >
          Getting to Know
        </p>
        <h2
          className="text-5xl md:text-6xl font-black mb-3 text-center bg-gradient-to-r from-yellow-300 via-red-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg animate-fadein"
          style={{
            fontFamily: "Poppins, sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          PPI Malaysia in Taylor's University
        </h2>
        <p
          className="text-2xl mb-2 text-center text-white/80 animate-fadein"
          style={{
            fontFamily: "Montserrat, Poppins, sans-serif",
            fontWeight: 600,
          }}
        >
          KOMANDO'45 25/26
        </p>
        <p
          className="italic mb-10 text-center text-pink-200 animate-fadein"
          style={{ fontFamily: "Oswald, Poppins, sans-serif", fontWeight: 400 }}
        >
          ABIMANYU-SAKHYABANDHA
        </p>

        <div
          className="mb-14 max-w-2xl mx-auto bg-zinc-900/70 rounded-3xl shadow-xl p-10 animate-fadein"
          style={{ fontFamily: "Montserrat, Poppins, sans-serif" }}
        >
          <h3
            className="text-3xl font-extrabold mb-6 text-center text-yellow-300 animate-fadein"
            style={{ fontFamily: "Oswald, Poppins, sans-serif" }}
          >
            Halo, Kami KOMANDO'45!
          </h3>
          <p
            className="mb-5 text-white/90 text-center text-lg animate-fadein"
            style={{
              fontFamily: "Montserrat, Poppins, sans-serif",
              fontWeight: 500,
            }}
          >
            Komando'45 adalah Perhimpunan Pelajar Indonesia (PPI) di Taylor's
            University. Nama organisasi kami berasal dari singkatan dari{" "}
            <strong>Komunitas Mahasiswa Indonesia dengan Semangat '45</strong>.
          </p>
          <p
            className="text-white/90 text-center text-lg animate-fadein"
            style={{
              fontFamily: "Montserrat, Poppins, sans-serif",
              fontWeight: 500,
            }}
          >
            Berdiri sejak <strong>2012</strong>, organisasi ini menjadi wadah
            resmi bagi mahasiswa Indonesia untuk berkegiatan, berorganisasi, dan
            mengembangkan diri di lingkungan Taylor's University.
          </p>
        </div>
      </section>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
      <div className="text-center text-sm opacity-70">
        &copy; 2025 Komando'45 — Built with Next.js + React + GSAP + Tailwind
        CSS
      </div>
      <style jsx global>{`
        @keyframes fadein {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .animate-fadein {
          animation: fadein 1.1s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
      `}</style>
    </main>
  );
}
<section id="vision" className="section mb-20">
  <h2
    className="text-4xl md:text-5xl font-bold mb-12 text-center text-white tracking-tight animate-fadein"
    style={{ fontFamily: "Poppins, sans-serif", letterSpacing: "-0.02em" }}
  >
    Visi & Misi
  </h2>
  <div className="relative flex flex-col md:flex-row gap-0 justify-center items-stretch animate-fadein" style={{ animationDelay: "0.2s", animationDuration: "1.2s" }}>
    <div className="flex-1 flex flex-col items-center px-4 md:px-12">
      <h3 className="text-2xl font-bold mb-6 text-yellow-200 tracking-widest uppercase animate-fadein" style={{ fontFamily: 'Oswald, Poppins, sans-serif', letterSpacing: '0.12em' }}>Visi</h3>
      <p className="text-lg text-center text-white/90 leading-relaxed animate-fadein" style={{ fontFamily: 'Montserrat, Poppins, sans-serif', fontWeight: 400 }}>
        Mewujudkan Komando’45 sebagai rumah persaudaraan yang kokoh dan wadah generasi muda yang berani, idealis, serta tulus dengan citra positif, pencapaian nyata, dan legacy bermanfaat bagi anggota dan komunitas.
      </p>
    </div>
    {/* Vertical Divider for desktop */}
    <div className="hidden md:flex items-center" aria-hidden="true">
      <div className="h-40 border-l border-zinc-600 mx-8"></div>
    </div>
    <div className="flex-1 flex flex-col items-center px-4 md:px-12">
      <h3 className="text-2xl font-bold mb-6 text-red-200 tracking-widest uppercase animate-fadein" style={{ fontFamily: 'Oswald, Poppins, sans-serif', letterSpacing: '0.12em' }}>Misi</h3>
      <ul className="text-lg text-white/90 space-y-2 list-inside list-decimal animate-fadein" style={{ fontFamily: 'Montserrat, Poppins, sans-serif', fontWeight: 400 }}>
        <li>Meneguhkan keberanian dan ketulusan</li>
        <li>Memperkuat persaudaraan dan kebersamaan</li>
        <li>Mewariskan legacy yang bermakna</li>
      </ul>
    </div>
  </div>
</section>