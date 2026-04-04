"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaGithub, FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";

const SOCIAL_LINKS = [
  { href: "https://github.com/AleemTalha", label: "GitHub", icon: FaGithub },
  {
    href: "https://www.instagram.com/aleemtalha_dev/",
    label: "Instagram",
    icon: FaInstagram,
  },
  { href: "https://wa.me/923270445135", label: "WhatsApp", icon: FaWhatsapp },
  {
    href: "https://www.linkedin.com/in/talha-aleem-a275a72a6/",
    label: "LinkedIn",
    icon: FaLinkedin,
  },
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

const ENTRANCE_BASE = "transition-all duration-500 ease-out";
const ENTRANCE_HIDDEN = "opacity-0 translate-y-5";
const ENTRANCE_VISIBLE = "opacity-100 translate-y-0";

export default function Hero() {
  const [active, setActive] = useState("HOME");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFixedNav, setShowFixedNav] = useState(false);
  const pathname = usePathname();
  const heroRef = useRef(null);

  const handleNavClick = (item) => {
    setActive(item);
    setMobileMenuOpen(false);
    if (pathname === "/") {
      const idMap = {
        WORKS: "recent-works",
        SERVICES: "services",
        TESTIMONIAL: "testimonials",
      };
      document
        .getElementById(idMap[item])
        ?.scrollIntoView({ behavior: "smooth" });
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
      { id: "hero-section", label: "HOME" },
      { id: "services", label: "SERVICES" },
      { id: "recent-works", label: "WORKS" },
      { id: "testimonials", label: "TESTIMONIAL" },
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
      { threshold: 0.3 },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const w = window.innerWidth;
    const mobile = w < 768;

    if (mobile) return;

    let ticking = false;
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;

        const progress = Math.min(
          Math.max(scrollY / (viewportHeight * 0.7), 0),
          1,
        );

        const isTablet = w >= 768 && w < 1024;
        const maxScale = isTablet ? 0.15 : 0.2;
        const scale = 1 - progress * maxScale;
        const baseBorderRadius = isTablet ? 8 : 30;
        const borderRadius = baseBorderRadius + progress * 30;
        const opacity = 1 - progress;

        heroEl.style.transform = `scale(${scale})`;
        heroEl.style.borderRadius = `${borderRadius}px`;
        heroEl.style.opacity = opacity;
        heroEl.style.visibility = progress >= 1 ? "hidden" : "visible";
        heroEl.style.pointerEvents = progress >= 0.5 ? "none" : "auto";

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const navProps = {
    active,
    mobileMenuOpen,
    setMobileMenuOpen,
    showFixedNav,
    handleNavClick,
    getNavLink,
  };

  return (
    <div
      id="hero-section"
      ref={heroRef}
      className="fixed top-1 md:top-2 lg:top-3 xl:top-4 left-1 md:left-2 lg:left-3 xl:left-4 right-1 md:right-2 lg:right-3 xl:right-4 bg-white border-2 md:border-3 lg:border-6 xl:border-8 border-black rounded-lg lg:rounded-[30px] box-border will-change-transform z-10"
      style={{ transformOrigin: "center center" }}
    >
      <div className="xl:p-6 p-2">
        <div className="bg-[#5477CC] min-h-[90vh] md:min-h-0 h-full flex flex-col md:block">
          <Navbar {...navProps} isFixed={true} />
          <Navbar {...navProps} isFixed={false} />

          <div className="flex md:hidden flex-col flex-1 items-center justify-end relative overflow-hidden">
            <span
              aria-hidden="true"
              className="pointer-events-none select-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-black text-white/50 uppercase leading-none z-0 text-4xl"
            >
              ALEEM TALHA
            </span>

            <div
              className={`absolute top-4 left-0 right-0 flex justify-center gap-3 z-10 ${ENTRANCE_BASE} ${isLoaded ? ENTRANCE_VISIBLE : ENTRANCE_HIDDEN}`}
              style={{ transitionDelay: "150ms" }}
            >
              <SocialIcons size={14} />
            </div>

            <div
              className={`relative flex-1 w-full z-1 ${ENTRANCE_BASE} ${isLoaded ? ENTRANCE_VISIBLE : ENTRANCE_HIDDEN}`}
              style={{ transitionDelay: "300ms" }}
            >
              <Image
                src="/images/aleem.png"
                alt="Aleem Talha — Full Stack Developer"
                fill
                priority
                sizes="100vw"
                quality={80}
                className="object-contain object-bottom"
              />
            </div>
          </div>

          <div className="hidden md:grid lg:hidden grid-cols-12 gap-0 px-6 pt-8 hero-tablet-height ">
            <div className="col-span-4 flex h-full items-center">
              <div className="flex flex-col justify-between h-[65%] items-center">
                <div
                  className={`${ENTRANCE_BASE} ${isLoaded ? ENTRANCE_VISIBLE : ENTRANCE_HIDDEN}`}
                  style={{ transitionDelay: "150ms" }}
                >
                  <h1 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tighter">
                    FULL STACK
                    <br />
                    DEVELOPER
                  </h1>
                </div>
                <div
                  className={`max-w-48 ${ENTRANCE_BASE} ${isLoaded ? ENTRANCE_VISIBLE : ENTRANCE_HIDDEN}`}
                  style={{ transitionDelay: "250ms" }}
                >
                  <p className="text-white text-[11px] leading-relaxed font-medium">
                    CRAFTING SCALABLE, USER-FRIENDLY WEB APPLICATIONS WITH .NET,
                    NODE.JS, NEXT.JS & TYPESCRIPT
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-4 flex items-end justify-center">
              <div
                className={`relative w-full h-full flex items-end justify-center ${ENTRANCE_BASE} ${isLoaded ? ENTRANCE_VISIBLE : ENTRANCE_HIDDEN}`}
                style={{ transitionDelay: "350ms" }}
              >
                <Image
                  src="/images/aleem.png"
                  alt="Aleem Talha — Full Stack Developer"
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
                <div
                  className={`max-w-56 ${ENTRANCE_BASE} ${isLoaded ? ENTRANCE_VISIBLE : ENTRANCE_HIDDEN}`}
                  style={{ transitionDelay: "450ms" }}
                >
                  <p className="text-white font-bold text-[11px] mb-3 tracking-widest">
                    FOLLOW ME
                  </p>
                  <SocialIcons size={14} />
                  <p className="text-white text-[11px] leading-relaxed font-medium mt-3">
                    2.5+ YEARS OF EXPERIENCE DELIVERING HIGH-PERFORMANCE WEB
                    SOLUTIONS
                  </p>
                </div>
                <div
                  className={`${ENTRANCE_BASE} ${isLoaded ? ENTRANCE_VISIBLE : ENTRANCE_HIDDEN}`}
                  style={{ transitionDelay: "550ms" }}
                >
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

          <div className="hidden lg:grid grid-cols-12 gap-0 px-8 pt-12 min-h-[90vh]">
            <div className="col-span-4 flex h-full items-center">
              <div className="flex flex-col justify-between h-[70%] items-center">
                <div
                  className={`${ENTRANCE_BASE} ${isLoaded ? ENTRANCE_VISIBLE : ENTRANCE_HIDDEN}`}
                  style={{ transitionDelay: "150ms" }}
                >
                  <h1 className="lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white leading-tight tracking-tighter">
                    FULL STACK
                    <br />
                    DEVELOPER
                  </h1>
                </div>
                <div
                  className={`max-w-sm ${ENTRANCE_BASE} ${isLoaded ? ENTRANCE_VISIBLE : ENTRANCE_HIDDEN}`}
                  style={{ transitionDelay: "250ms" }}
                >
                  <p className="text-white lg:text-sm xl:text-xs 2xl:text-sm leading-relaxed font-medium">
                    CRAFTING SCALABLE, USER-FRIENDLY WEB APPLICATIONS WITH .NET,
                    NODE.JS, NEXT.JS & TYPESCRIPT
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-4 flex items-end justify-center">
              <div
                className={`relative w-full h-full flex items-end justify-center ${ENTRANCE_BASE} ${isLoaded ? ENTRANCE_VISIBLE : ENTRANCE_HIDDEN}`}
                style={{ transitionDelay: "350ms" }}
              >
                <Image
                  src="/images/aleem.png"
                  alt="Aleem Talha — Full Stack Developer"
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
                <div
                  className={`max-w-md ${ENTRANCE_BASE} ${isLoaded ? ENTRANCE_VISIBLE : ENTRANCE_HIDDEN}`}
                  style={{ transitionDelay: "450ms" }}
                >
                  <p className="text-white font-bold lg:text-sm xl:text-xs 2xl:text-sm mb-4 tracking-widest">
                    FOLLOW ME
                  </p>
                  <SocialIcons size={16} gap="gap-4" />
                  <p className="text-white lg:text-sm xl:text-xs 2xl:text-sm leading-relaxed font-medium mt-4">
                    2.5+ YEARS OF EXPERIENCE DELIVERING HIGH-PERFORMANCE WEB
                    SOLUTIONS
                  </p>
                </div>
                <div
                  className={`${ENTRANCE_BASE} ${isLoaded ? ENTRANCE_VISIBLE : ENTRANCE_HIDDEN}`}
                  style={{ transitionDelay: "550ms" }}
                >
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
