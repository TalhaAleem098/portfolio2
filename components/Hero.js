"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FaGithub,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";

export default function Hero() {
  const [active, setActive] = useState("HOME");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFixedNav, setShowFixedNav] = useState(false);
  const pathname = usePathname();
  const observerRefs = useRef({});

  const handleNavClick = (item) => {
    setActive(item);
    setMobileMenuOpen(false);
    
    if (pathname === "/") {
      if (item === "WORKS") {
        const element = document.getElementById("recent-works");
        element?.scrollIntoView({ behavior: "smooth" });
      } else if (item === "SERVICES") {
        const element = document.getElementById("services");
        element?.scrollIntoView({ behavior: "smooth" });
      } else if (item === "TESTIMONIAL") {
        const element = document.getElementById("testimonials");
        element?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const getNavLink = (item) => {
    switch (item) {
      case "HOME":
        return "/";
      case "CONTACT US":
        return "/contact";
      default:
        return "#";
    }
  };


  useEffect(() => {

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewHeight = window.innerHeight;
      setShowFixedNav(scrollPosition > viewHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    const sections = [
      { id: "hero-section", label: "HOME" },
      { id: "services", label: "SERVICES" },
      { id: "recent-works", label: "WORKS" },
      { id: "testimonials", label: "TESTIMONIAL" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionLabel = sections.find(
              (s) => s.id === entry.target.id
            )?.label;
            if (sectionLabel) {
              setActive(sectionLabel);
            }
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    const heroSection = document.getElementById("hero-section");
    if (heroSection) {
      observer.observe(heroSection);
    }

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div id="hero-section"
      className="bg-white mb-0 lg:border-6 xl:border-8 border-black rounded-lg lg:rounded-[30px] box-border "
      
    >
      <div className="xl:p-6 p-2">
        <div className="bg-[#5477CC] min-h-[90vh] md:min-h-0 h-full flex flex-col md:block">

          <Navbar
            active={active}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            showFixedNav={showFixedNav}
            handleNavClick={handleNavClick}
            getNavLink={getNavLink}
            isFixed={true}
          />


          <Navbar
            active={active}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            showFixedNav={showFixedNav}
            handleNavClick={handleNavClick}
            getNavLink={getNavLink}
            isFixed={false}
          />

          {/* ===== MOBILE / SMALL TABLET HERO (< 768px) ===== */}
          <div className="flex md:hidden flex-col flex-1 items-center justify-end relative overflow-hidden">
            {/* Background name text */}
            <span
              aria-hidden="true"
              className="hero-bg-name pointer-events-none select-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-black text-white/50 uppercase leading-none z-0"
            >
              Aleem Talha
            </span>

            {/* Social icons row at top */}
            <div className="absolute top-4 left-0 right-0 flex justify-center gap-3 z-10">
              <a href="https://github.com/AleemTalha" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                className="w-9 h-9 rounded-full border-2 border-white/60 flex items-center justify-center text-white/80 hover:bg-white hover:text-[#5477CC] transition">
                <FaGithub size={14} />
              </a>
              <a href="https://www.instagram.com/aleemtalha_dev/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-9 h-9 rounded-full border-2 border-white/60 flex items-center justify-center text-white/80 hover:bg-white hover:text-[#5477CC] transition">
                <FaInstagram size={14} />
              </a>
              <a href="https://wa.me/923270445135" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border-2 border-white/60 flex items-center justify-center text-white/80 hover:bg-white hover:text-[#5477CC] transition">
                <FaWhatsapp size={14} />
              </a>
              <a href="https://www.linkedin.com/in/talha-aleem-a275a72a6/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border-2 border-white/60 flex items-center justify-center text-white/80 hover:bg-white hover:text-[#5477CC] transition">
                <FaLinkedin size={14} />
              </a>
            </div>

            {/* Image – takes the majority of height, pinned to bottom */}
            <div className="relative flex-1 w-full z-1">
              <Image
                src="/images/aleem.png"
                alt="Aleem Talha — UI/UX Designer & Full Stack Developer"
                fill
                priority
                className="object-contain object-bottom"
              />
            </div>
          </div>
          

          {/* ===== TABLET HERO (768px – 1023px) ===== */}
          <div className="hidden md:grid lg:hidden grid-cols-12 gap-0 px-6 pt-8 hero-tablet-height">
            <div className="col-span-4 flex h-full items-center">
              <div className="flex flex-col justify-between h-[65%] items-center">
                <div>
                  <h1 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tighter">
                    UI UX
                    <br />
                    DESIGNER
                  </h1>
                </div>
                <div className="max-w-50">
                  <p className="text-white text-[11px] leading-relaxed font-medium">
                    I DESIGN INTUITIVE INTERFACES AND DEVELOP USER-CENTRIC
                    SOLUTIONS, BLENDING CREATIVITY AND TECHNICAL EXPERTISE TO
                    CRAFT SEAMLESS DIGITAL EXPERIENCES
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-4 flex items-end justify-center">
              <div className="relative w-full h-full flex items-end justify-center">
                <Image
                  src="/images/aleem.png"
                  alt="Aleem Talha — UI/UX Designer & Full Stack Developer"
                  fill
                  priority
                  className="object-contain object-bottom"
                />
              </div>
            </div>

            <div className="col-span-4 flex h-full items-center">
              <div className="flex flex-col justify-between h-[75%]">
                <div className="max-w-55">
                  <div className="mb-3">
                    <p className="text-white font-bold text-[11px] mb-3 tracking-widest">
                      FOLLOW ME
                    </p>
                    <div className="flex gap-3">
                      <a href="https://github.com/AleemTalha" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                        className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[#5477CC] transition">
                        <FaGithub size={14} />
                      </a>
                      <a href="https://www.instagram.com/aleemtalha_dev/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                        className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[#5477CC] transition">
                        <FaInstagram size={14} />
                      </a>
                      <a href="https://wa.me/923270445135" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                        className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[#5477CC] transition">
                        <FaWhatsapp size={14} />
                      </a>
                      <a href="https://www.linkedin.com/in/talha-aleem-a275a72a6/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                        className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[#5477CC] transition">
                        <FaLinkedin size={14} />
                      </a>
                    </div>
                  </div>
                  <p className="text-white text-[11px] leading-relaxed font-medium">
                    2.5+ YEARS OF EXPERIENCE DELIVERING PIXEL-PERFECT DIGITAL SOLUTIONS
                  </p>
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tighter">
                    FULL
                    <br />
                    STACK
                    <br />
                    CODER
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* ===== DESKTOP / LAPTOP HERO (>= 1024px) ===== */}
          <div className="hidden lg:grid grid-cols-12 gap-0 px-8 pt-12 min-h-[90vh]">
            <div className="col-span-4 flex h-full items-center">
              <div className="flex flex-col justify-between h-[70%] items-center">
                <div>
                  <h1 className="lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white leading-tight tracking-tighter">
                    UI UX
                    <br />
                    DESIGNER
                  </h1>
                </div>
                <div className="max-w-sm">
                  <p className="text-white lg:text-sm xl:text-xs 2xl:text-sm leading-relaxed font-medium">
                    I DESIGN INTUITIVE INTERFACES AND DEVELOP USER-CENTRIC
                    SOLUTIONS, BLENDING CREATIVITY AND TECHNICAL EXPERTISE TO
                    CRAFT SEAMLESS DIGITAL EXPERIENCES
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-4 flex items-end justify-center">
              <div className="relative w-full h-full flex items-end justify-center">
                <Image
                  src="/images/aleem.png"
                  alt="Aleem Talha — UI/UX Designer & Full Stack Developer"
                  fill
                  priority
                  className="object-contain object-bottom"
                />
              </div>
            </div>

            <div className="col-span-4 flex h-full items-center">
              <div className="flex flex-col justify-between h-[80%]">
                <div className="max-w-md">
                  <div className="mb-4">
                    <p className="text-white font-bold lg:text-sm xl:text-xs 2xl:text-sm mb-4 tracking-widest">
                      FOLLOW ME
                    </p>
                    <div className="flex gap-4">
                      <a
                        href="https://github.com/AleemTalha"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[#5477CC] transition"
                      >
                        <FaGithub size={16} />
                      </a>
                      <a
                        href="https://www.instagram.com/aleemtalha_dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[#5477CC] transition"
                      >
                        <FaInstagram size={16} />
                      </a>
                      <a
                        href="https://wa.me/923270445135"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                        className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[#5477CC] transition"
                      >
                        <FaWhatsapp size={16} />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/talha-aleem-a275a72a6/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[#5477CC] transition"
                      >
                        <FaLinkedin size={16} />
                      </a>
                    </div>
                  </div>
                  <p className="text-white lg:text-sm xl:text-xs 2xl:text-sm leading-relaxed font-medium">
                    2.5+ YEARS OF EXPERIENCE DELIVERING PIXEL-PERFECT DIGITAL SOLUTIONS
                  </p>
                </div>
                <div>
                  <h2 className="lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white leading-tight tracking-tighter">
                    FULL
                    <br />
                    STACK
                    <br />
                    CODER
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
