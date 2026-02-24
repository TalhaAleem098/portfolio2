/* eslint-disable react-hooks/static-components */
"use client";

import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import { FiMenu, FiX } from "react-icons/fi";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Navbar({
  active,
  mobileMenuOpen,
  setMobileMenuOpen,
  showFixedNav,
  handleNavClick,
  getNavLink,
  isFixed,
}) {
  const navItems = ["HOME", "SERVICES", "WORKS", "TESTIMONIAL", "CONTACT US"];

  const fixedNavRef = useRef(null);
  const heroNavRef = useRef(null);
  const lastScrollY = useRef(0);
  const isNavVisible = useRef(false);
  const ticking = useRef(false);

  useEffect(() => {
    if (isFixed || !heroNavRef.current) return;

    gsap.set(heroNavRef.current, { opacity: 0, y: -12 });
    gsap.to(heroNavRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      delay: 0.1,
    });
  }, [isFixed]);

  useEffect(() => {
    if (!isFixed || !fixedNavRef.current || !showFixedNav) return;

    if (!isNavVisible.current) {
      isNavVisible.current = true;
      lastScrollY.current = window.scrollY;
      gsap.fromTo(
        fixedNavRef.current,
        { y: -80 },
        { y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [showFixedNav, isFixed]);

  useEffect(() => {
    if (!isFixed || !fixedNavRef.current) return;

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const diff = currentScrollY - lastScrollY.current;

        if (diff > 6 && isNavVisible.current) {
          isNavVisible.current = false;
          gsap.to(fixedNavRef.current, {
            y: -80,
            duration: 0.3,
            ease: "power2.inOut",
          });
        } else if (diff < -4 && !isNavVisible.current) {
          isNavVisible.current = true;
          gsap.to(fixedNavRef.current, {
            y: 0,
            duration: 0.35,
            ease: "power2.out",
          });
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFixed]);

  const navLinkClass = (item, isMobile = false) => {
    const base = "uppercase font-bold cursor-pointer tracking-widest transition-colors duration-200";
    const color = active === item ? "text-[#FDF94B]" : "text-white hover:text-yellow-200";

    if (isMobile) return `${base} text-sm ${color}`;
    if (isFixed) return `${base} text-xs lg:text-xs xl:text-sm ${color}`;
    return `${base} text-[10px] lg:text-[10px] xl:text-sm ${color}`;
  };

  const brandClass = isFixed
    ? "text-lg lg:text-2xl xl:text-3xl"
    : "text-2xl lg:text-4xl xl:text-5xl";

  const HireButton = ({ className = "" }) => (
    <Link
      href="/contact"
      onClick={() => setMobileMenuOpen(false)}
      className={`flex items-center gap-2 bg-[#FDF94B] text-black font-black rounded-full hover:bg-[#c8c510] transition-colors duration-200 uppercase tracking-widest whitespace-nowrap ${className}`}
    >
      HIRE <span className="hidden md:inline">ME</span>
      <HiArrowUpRight size={16} />
    </Link>
  );

  const MobileMenu = () => (
    <div className="lg:hidden fixed inset-0 top-16 bg-[#5477CC] z-40 pt-2 px-1 overflow-y-auto border-r-2 border-black">
      <div className="flex flex-col gap-4 pb-8 p-2 md:p-3">
        {navItems.map((item) => {
          const isSection = ["WORKS", "SERVICES", "TESTIMONIAL"].includes(item);
          const sharedClass = `text-left pl-2 py-2 border-l-4 transition-all ${
            active === item
              ? "border-[#FDF94B] text-[#FDF94B]"
              : "border-transparent text-white hover:text-yellow-200 hover:border-yellow-200"
          } ${navLinkClass(item, true)}`;

          return isSection ? (
            <button key={item} onClick={() => handleNavClick(item)} className={sharedClass}>
              {item}
            </button>
          ) : (
            <Link
              key={item}
              href={getNavLink(item)}
              onClick={() => setMobileMenuOpen(false)}
              className={sharedClass}
            >
              {item}
            </Link>
          );
        })}
        <div className="pt-4 mt-4 border-t border-white/30">
          <HireButton className="w-full justify-center text-xs px-3 py-2 md:px-4 md:py-3" />
        </div>
      </div>
    </div>
  );

  const NavLinks = () => (
    <div className="hidden lg:flex items-center gap-4 xl:gap-8">
      {navItems.map((item) => {
        const isSection = ["WORKS", "SERVICES", "TESTIMONIAL"].includes(item);
        return isSection ? (
          <button key={item} onClick={() => handleNavClick(item)} className={navLinkClass(item)}>
            {item}
          </button>
        ) : (
          <Link
            key={item}
            href={getNavLink(item)}
            onClick={() => setMobileMenuOpen(false)}
            className={navLinkClass(item)}
          >
            {item}
          </Link>
        );
      })}
    </div>
  );

  const BrandLogo = () => (
    <Link
      href="/"
      className="absolute lg:relative left-1/2 lg:left-0 transform lg:transform-none -translate-x-1/2 lg:translate-x-0 text-white cursor-pointer font-bold tracking-wide hover:text-[#FDF94B] transition-colors duration-200"
    >
      <span className={brandClass}>
        ALEEM{"."}
        <span className={`font-extrabold ${isFixed ? "text-xs lg:text-base xl:text-xl" : "text-xs lg:text-lg xl:text-xl"}`}>
          Talha
        </span>
      </span>
    </Link>
  );

  const MenuToggle = () => (
    <button
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      className="lg:hidden cursor-pointer text-white text-2xl z-50 shrink-0"
      aria-label="Toggle menu"
    >
      {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
    </button>
  );

  if (showFixedNav && isFixed) {
    return (
      <div ref={fixedNavRef} style={{ transform: "translateY(-80px)", willChange: "transform" }}>
        <nav className="fixed top-0 left-0 right-0 w-full bg-[#5477CC] border-b border-black z-50 shadow-lg">
          <div className="flex items-center justify-between px-4 md:p-3 lg:p-4 xl:p-6">
            <MenuToggle />
            <BrandLogo />
            <NavLinks />
            <div className="hidden lg:block shrink-0">
              <HireButton className="text-xs px-4 lg:px-6 xl:px-8 lg:py-2 xl:py-3" />
            </div>
          </div>
        </nav>
        {mobileMenuOpen && <MobileMenu />}
      </div>
    );
  }

  if (!isFixed) {
    return (
      <>
        <nav
          ref={heroNavRef}
          style={{ opacity: 0 }}
          className="flex items-center justify-between p-2.5 md:p-3 lg:p-4 xl:p-6 relative w-full"
        >
          <MenuToggle />
          <BrandLogo />
          <NavLinks />
          <div className="hidden lg:block shrink-0">
            <HireButton className="text-xs px-4 lg:px-6 xl:px-8 lg:py-2 xl:py-3" />
          </div>
        </nav>
        {mobileMenuOpen && <MobileMenu />}
      </>
    );
  }

  return null;
}