"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaGithub, FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "./Navbar";

gsap.registerPlugin(useGSAP);

const SOCIAL_LINKS = [
  { href: "https://github.com/AleemTalha", label: "GitHub", icon: FaGithub },
  { href: "https://www.instagram.com/aleemtalha_dev/", label: "Instagram", icon: FaInstagram },
  { href: "https://wa.me/923270445135", label: "WhatsApp", icon: FaWhatsapp },
  { href: "https://www.linkedin.com/in/talha-aleem-a275a72a6/", label: "LinkedIn", icon: FaLinkedin },
];

const SocialIcons = ({ size = 14, gap = "gap-3" }) => (
  <div className={`flex ${gap}`}>
    {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={`${
          size === 14 ? "w-9 h-9" : "w-10 h-10"
        } rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[#5477CC] transition-colors duration-200`}
      >
        <Icon size={size} />
      </a>
    ))}
  </div>
);

// This object is applied as an inline style prop at JSX render time.
// It runs BEFORE the first browser paint — so elements are never visible
// until GSAP explicitly makes them visible during animation.
const HIDE = { opacity: 0, transform: "translateY(20px)" };

export default function Hero() {
  const [active, setActive] = useState("HOME");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFixedNav, setShowFixedNav] = useState(false);
  const pathname = usePathname();

  const heroRef        = useRef(null);
  const leftHeadRef    = useRef(null);
  const leftDescRef    = useRef(null);
  const imgRef         = useRef(null);
  const rightTopRef    = useRef(null);
  const rightBotRef    = useRef(null);
  const mobIconsRef    = useRef(null);
  const mobImgRef      = useRef(null);

  // Tablet-specific refs (needed because tablet & desktop render separately)
  const tabLeftHeadRef  = useRef(null);
  const tabLeftDescRef  = useRef(null);
  const tabImgRef       = useRef(null);
  const tabRightTopRef  = useRef(null);
  const tabRightBotRef  = useRef(null);

  const handleNavClick = (item) => {
    setActive(item);
    setMobileMenuOpen(false);
    if (pathname === "/") {
      const idMap = {
        WORKS: "recent-works",
        SERVICES: "services",
        TESTIMONIAL: "testimonials",
      };
      document.getElementById(idMap[item])?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getNavLink = (item) => {
    if (item === "HOME") return "/";
    if (item === "CONTACT US") return "/contact";
    return "#";
  };

  useEffect(() => {
    const onScroll = () => setShowFixedNav(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = [
      { id: "hero-section",  label: "HOME" },
      { id: "services",      label: "SERVICES" },
      { id: "recent-works",  label: "WORKS" },
      { id: "testimonials",  label: "TESTIMONIAL" },
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const label = sections.find((s) => s.id === e.target.id)?.label;
            if (label) setActive(label);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // useGSAP runs synchronously before browser paint in the same microtask
  // as layout — no flash possible. scope: heroRef for automatic cleanup.
  useGSAP(
    () => {
      const w = window.innerWidth;
      const mobile = w < 768;
      const tablet = w >= 768 && w < 1024;

      if (mobile) {
        // Mobile: icons → image
        gsap.timeline({ defaults: { ease: "power2.out" } })
          .to(mobIconsRef.current, {
            opacity: 1, y: 0, duration: 0.4, delay: 0.15,
          })
          .to(mobImgRef.current, {
            opacity: 1, y: 0, duration: 0.55,
          }, "-=0.1");
      } else if (tablet) {
        // Tablet: animate tablet-specific refs
        gsap.timeline({ defaults: { ease: "power2.out" } })
          .to(tabLeftHeadRef.current, {
            opacity: 1, y: 0, duration: 0.45, delay: 0.15,
          })
          .to(tabLeftDescRef.current, {
            opacity: 1, y: 0, duration: 0.4,
          }, "-=0.2")
          .to(tabImgRef.current, {
            opacity: 1, y: 0, duration: 0.5,
          }, "-=0.2")
          .to(tabRightTopRef.current, {
            opacity: 1, y: 0, duration: 0.4,
          }, "-=0.25")
          .to(tabRightBotRef.current, {
            opacity: 1, y: 0, duration: 0.4,
          }, "-=0.2");
      } else {
        // Desktop: animate desktop-specific refs
        gsap.timeline({ defaults: { ease: "power2.out" } })
          .to(leftHeadRef.current, {
            opacity: 1, y: 0, duration: 0.45, delay: 0.15,
          })
          .to(leftDescRef.current, {
            opacity: 1, y: 0, duration: 0.4,
          }, "-=0.2")
          .to(imgRef.current, {
            opacity: 1, y: 0, duration: 0.5,
          }, "-=0.2")
          .to(rightTopRef.current, {
            opacity: 1, y: 0, duration: 0.4,
          }, "-=0.25")
          .to(rightBotRef.current, {
            opacity: 1, y: 0, duration: 0.4,
          }, "-=0.2");
      }
    },
    { scope: heroRef }
  );

  const navProps = {
    active, mobileMenuOpen, setMobileMenuOpen,
    showFixedNav, handleNavClick, getNavLink,
  };

  return (
    <div
      id="hero-section"
      ref={heroRef}
      className="bg-white mb-0 border-2 md:border-3 lg:border-6 xl:border-8 border-black rounded-lg lg:rounded-[30px] box-border"
    >
      <div className="xl:p-6 p-2">
        <div className="bg-[#5477CC] min-h-[90vh] md:min-h-0 h-full flex flex-col md:block">

          <Navbar {...navProps} isFixed={true} />
          <Navbar {...navProps} isFixed={false} />

          {/* ===== MOBILE (< 768px) ===== */}
          <div className="flex md:hidden flex-col flex-1 items-center justify-end relative overflow-hidden">
            <span
              aria-hidden="true"
              className="pointer-events-none select-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-black text-white/50 uppercase leading-none z-0 text-4xl"
            >
              Aleem Talha
            </span>

            {/* Hidden at render time via inline style — GSAP animates it in */}
            <div
              ref={mobIconsRef}
              style={HIDE}
              className="absolute top-4 left-0 right-0 flex justify-center gap-3 z-10"
            >
              <SocialIcons size={14} />
            </div>

            <div
              ref={mobImgRef}
              style={HIDE}
              className="relative flex-1 w-full z-1"
            >
              <Image
                src="/images/aleem.png"
                alt="Aleem Talha — UI/UX Designer & Full Stack Developer"
                fill
                priority
                sizes="100vw"
                quality={80}
                className="object-contain object-bottom"
              />
            </div>
          </div>

          {/* ===== TABLET (768px – 1023px) ===== */}
          <div className="hidden md:grid lg:hidden grid-cols-12 gap-0 px-6 pt-8 hero-tablet-height ">
            <div className="col-span-4 flex h-full items-center">
              <div className="flex flex-col justify-between h-[65%] items-center">
                <div ref={tabLeftHeadRef} style={HIDE}>
                  <h1 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tighter">
                    UI UX
                    <br />
                    DESIGNER
                  </h1>
                </div>
                <div ref={tabLeftDescRef} style={HIDE} className="max-w-48">
                  <p className="text-white text-[11px] leading-relaxed font-medium">
                    I DESIGN INTUITIVE INTERFACES AND DEVELOP USER-CENTRIC SOLUTIONS,
                    BLENDING CREATIVITY AND TECHNICAL EXPERTISE TO CRAFT SEAMLESS
                    DIGITAL EXPERIENCES
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-4 flex items-end justify-center">
              <div
                ref={tabImgRef}
                style={HIDE}
                className="relative w-full h-full flex items-end justify-center"
              >
                <Image
                  src="/images/aleem.png"
                  alt="Aleem Talha — UI/UX Designer & Full Stack Developer"
                  fill
                  priority
                  sizes="(max-width: 1023px) 33vw"
                  quality={80}
                  className="object-contain object-bottom"
                />
              </div>
            </div>

            <div className="col-span-4 flex h-full items-center">
              <div className="flex flex-col justify-between h-[75%]">
                <div ref={tabRightTopRef} style={HIDE} className="max-w-56">
                  <p className="text-white font-bold text-[11px] mb-3 tracking-widest">FOLLOW ME</p>
                  <SocialIcons size={14} />
                  <p className="text-white text-[11px] leading-relaxed font-medium mt-3">
                    2.5+ YEARS OF EXPERIENCE DELIVERING PIXEL-PERFECT DIGITAL SOLUTIONS
                  </p>
                </div>
                <div ref={tabRightBotRef} style={HIDE}>
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

          {/* ===== DESKTOP (>= 1024px) ===== */}
          <div className="hidden lg:grid grid-cols-12 gap-0 px-8 pt-12 min-h-[90vh]">
            <div className="col-span-4 flex h-full items-center">
              <div className="flex flex-col justify-between h-[70%] items-center">
                <div ref={leftHeadRef} style={HIDE}>
                  <h1 className="lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white leading-tight tracking-tighter">
                    UI UX
                    <br />
                    DESIGNER
                  </h1>
                </div>
                <div ref={leftDescRef} style={HIDE} className="max-w-sm">
                  <p className="text-white lg:text-sm xl:text-xs 2xl:text-sm leading-relaxed font-medium">
                    I DESIGN INTUITIVE INTERFACES AND DEVELOP USER-CENTRIC SOLUTIONS,
                    BLENDING CREATIVITY AND TECHNICAL EXPERTISE TO CRAFT SEAMLESS
                    DIGITAL EXPERIENCES
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-4 flex items-end justify-center">
              <div
                ref={imgRef}
                style={HIDE}
                className="relative w-full h-full flex items-end justify-center"
              >
                <Image
                  src="/images/aleem.png"
                  alt="Aleem Talha — UI/UX Designer & Full Stack Developer"
                  fill
                  priority
                  sizes="(min-width: 1024px) 33vw"
                  quality={85}
                  className="object-contain object-bottom"
                />
              </div>
            </div>

            <div className="col-span-4 flex h-full items-center">
              <div className="flex flex-col justify-between h-[80%]">
                <div ref={rightTopRef} style={HIDE} className="max-w-md">
                  <p className="text-white font-bold lg:text-sm xl:text-xs 2xl:text-sm mb-4 tracking-widest">
                    FOLLOW ME
                  </p>
                  <SocialIcons size={16} gap="gap-4" />
                  <p className="text-white lg:text-sm xl:text-xs 2xl:text-sm leading-relaxed font-medium mt-4">
                    2.5+ YEARS OF EXPERIENCE DELIVERING PIXEL-PERFECT DIGITAL SOLUTIONS
                  </p>
                </div>
                <div ref={rightBotRef} style={HIDE}>
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