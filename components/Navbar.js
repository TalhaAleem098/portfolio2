/* eslint-disable react-hooks/static-components */
"use client";

import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import { FiMenu, FiX } from "react-icons/fi";

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

  // Padding hierarchy based on screen size
  const PADDING = {
    mobile: "p-1",
    md: "p-3",
    lg: "p-4",
    xl: "p-6",
  };

  const navLinkClass = (item, isMobile = false) => {
    const baseClass =
      "uppercase font-bold cursor-pointer tracking-widest transition-all";

    const activeClass =
      active === item ? "text-[#FDF94B]" : "text-white hover:text-yellow-200";

    if (isMobile) {
      return `${baseClass} text-sm ${activeClass}`;
    }

    if (isFixed) {
      return `${baseClass} text-xs lg:text-xs xl:text-sm ${activeClass}`;
    }

    return `${baseClass} text-[10px] lg:text-[10px] xl:text-sm ${
      active === item ? "scale-100 lg:scale-105 xl:scale-110" : ""
    } ${activeClass}`;
  };

  const brandClass = isFixed
    ? "text-lg lg:text-2xl xl:text-3xl"
    : "text-2xl lg:text-4xl xl:text-5xl";

  const HireButton = ({ className = "" }) => (
    <Link
      href="/contact"
      onClick={() => setMobileMenuOpen(false)}
      className={`flex items-center gap-2 bg-[#FDF94B] text-black font-black rounded-full hover:bg-[#c8c510] transition uppercase tracking-widest whitespace-nowrap ${className}`}
    >
      HIRE <span className="hidden md:inline">ME</span>
      <HiArrowUpRight size={16} />
    </Link>
  );

  /* 
  ===============================
  NAVBAR: HERO NAVBAR
  Purpose: Primary navbar in hero section - appears on initial page load
  Style: Large brand name, smaller center links, responsive design
  Visibility: Always visible in hero section
  ===============================
  */
  /* 
  ===============================
  NAVBAR: FIXED NAVBAR 
  Purpose: Sticky navigation that appears after scrolling past hero section (100vh+)
  Style: Compact layout, smaller brand text, fixed positioning
  Visibility: Shows only when user scrolls down past hero viewport
  ===============================
  */
  if (showFixedNav && isFixed) {
    return (
      <div className="mx-4 md:mx-6">
        {/* Fixed Navbar Container */}
        <nav className="fixed top-0 left-0 right-0 p-4 md:p-0 w-full bg-[#5477CC] border-b border-black z-50 shadow-lg">
          <div className="flex items-center justify-between px-1 md:p-3 lg:p-4 xl:p-6">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden cursor-pointer text-white text-2xl z-50 shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Logo - Centered on Mobile, Left on Desktop */}
            <Link
              href="/"
              className="absolute lg:relative left-1/2 lg:left-0 transform lg:transform-none -translate-x-1/2 lg:translate-x-0 text-white cursor-pointer font-bold tracking-wide hover:text-[#FDF94B] transition-colors"
            >
              <span className={brandClass}>
                ALEEM{"."}
                <span className="text-xs lg:text-base xl:text-xl font-extrabold">
                  Talha
                </span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-8">
              {navItems.map((item) => {
                if (
                  item === "WORKS" ||
                  item === "SERVICES" ||
                  item === "TESTIMONIAL"
                ) {
                  return (
                    <button
                      key={item}
                      onClick={() => handleNavClick(item)}
                      className={navLinkClass(item)}
                    >
                      {item}
                    </button>
                  );
                }

                return (
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

            {/* Desktop Hire Button */}
            <div className="hidden lg:block shrink-0">
              <HireButton className="text-xs px-4 lg:px-6 xl:px-8 lg:py-2 xl:py-3" />
            </div>
          </div>
        </nav>

        {/* Mobile Sidebar Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 bg-[#5477CC] bg-opacity-98 z-40 pt-2 px-1 overflow-y-auto border-r-2 border-black">
            <div className="flex flex-col gap-4 pb-8 p-2 md:p-3">
              {/* Navigation Items */}
              {navItems.map((item) => {
                if (
                  item === "WORKS" ||
                  item === "SERVICES" ||
                  item === "TESTIMONIAL"
                ) {
                  return (
                    <button
                      key={item}
                      onClick={() => handleNavClick(item)}
                      className={`text-left pl-2 py-2 border-l-4 transition-all ${
                        active === item
                          ? "border-[#FDF94B] text-[#FDF94B]"
                          : "border-transparent text-white hover:text-yellow-200 hover:border-yellow-200"
                      } ${navLinkClass(item, true)}`}
                    >
                      {item}
                    </button>
                  );
                }

                return (
                  <Link
                    key={item}
                    href={getNavLink(item)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-left pl-2 py-2 border-l-4 transition-all ${
                      active === item
                        ? "border-[#FDF94B] text-[#FDF94B]"
                        : "border-transparent text-white hover:text-yellow-200 hover:border-yellow-200"
                    } ${navLinkClass(item, true)}`}
                  >
                    {item}
                  </Link>
                );
              })}

              {/* Hire Button in Mobile Menu */}
              <div className="pt-4 mt-4 border-t border-white/30">
                <HireButton className="w-full justify-center text-xs px-3 py-2 md:px-4 md:py-3" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (!isFixed) {
    return (
      <>
        {/* Hero Navbar */}
        <nav className="flex items-center justify-between p-2.5 md:p-3 lg:p-4 xl:p-6 relative w-full">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden cursor-pointer text-white text-2xl z-50 shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Logo - Centered on Mobile, Left on Desktop */}
          <Link
            href="/"
            className="absolute lg:relative left-1/2 lg:left-0 transform lg:transform-none -translate-x-1/2 lg:translate-x-0 text-white cursor-pointer font-bold tracking-wide hover:text-[#FDF94B] transition-colors"
          >
            <span className={brandClass}>
              ALEEM{" "}
              <span className="text-xs mr-3 md:mr-0 hidden md:inline lg:text-lg xl:text-md font-extrabold">
                Talha
              </span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            {navItems.map((item) => {
              if (
                item === "WORKS" ||
                item === "SERVICES" ||
                item === "TESTIMONIAL"
              ) {
                return (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className={navLinkClass(item)}
                  >
                    {item}
                  </button>
                );
              }

              return (
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

          {/* Desktop Hire Button */}
          <div className="hidden lg:block shrink-0">
            <HireButton className="text-xs px-4 lg:px-6 xl:px-8 lg:py-2 xl:py-3" />
          </div>
        </nav>

        {/* Mobile Sidebar Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 bg-[#5477CC] bg-opacity-98 z-40 pt-2 px-1 overflow-y-auto border-r-2 border-black">
            <div className="flex flex-col gap-4 pb-8 p-2 md:p-3">
              {/* Navigation Items */}
              {navItems.map((item) => {
                if (
                  item === "WORKS" ||
                  item === "SERVICES" ||
                  item === "TESTIMONIAL"
                ) {
                  return (
                    <button
                      key={item}
                      onClick={() => handleNavClick(item)}
                      className={`text-left pl-2 py-2 border-l-4 transition-all ${
                        active === item
                          ? "border-[#FDF94B] text-[#FDF94B]"
                          : "border-transparent text-white hover:text-yellow-200 hover:border-yellow-200"
                      } ${navLinkClass(item, true)}`}
                    >
                      {item}
                    </button>
                  );
                }

                return (
                  <Link
                    key={item}
                    href={getNavLink(item)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-left pl-2 py-2 border-l-4 transition-all ${
                      active === item
                        ? "border-[#FDF94B] text-[#FDF94B]"
                        : "border-transparent text-white hover:text-yellow-200 hover:border-yellow-200"
                    } ${navLinkClass(item, true)}`}
                  >
                    {item}
                  </Link>
                );
              })}

              {/* Hire Button in Mobile Menu */}
              <div className="pt-4 mt-4 border-t border-white/30">
                <HireButton className="w-full justify-center text-xs px-3 py-2 md:px-4 md:py-3" />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
}
