"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HIDE = { opacity: 0, transform: "translateY(30px)" };

export default function Footer() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const copyrightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(gridRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.to(copyrightRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: copyrightRef.current,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white mx-1 lg:mx-5">
      <div className="p-1 md:p-2 lg:p-3">
        <footer ref={sectionRef} className="bg-[#5477CC] py-8 md:py-10 px-3 md:px-6 lg:px-12 xl:px-16 flex flex-col justify-between">
          <div className="py-8 md:py-12 lg:py-16">
            {/* Main Footer Content */}
            <div ref={gridRef} style={HIDE} className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 xl:gap-12 mb-8 md:mb-10 lg:mb-12 pb-8 md:pb-10 lg:pb-12 border-b border-white/30">
              {/* Email Section */}
              <div>
                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white mb-2 md:mb-4">
                  Email me for any queries
                </h3>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-xs md:text-sm lg:text-base xl:text-lg font-black uppercase text-white hover:text-yellow-200 transition break-all"
                >
                  {CONTACT_EMAIL.split("@")[0].toUpperCase()}
                  <br />
                  @{CONTACT_EMAIL.split("@")[1].toUpperCase()}
                </a>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white mb-3 md:mb-6">
                  Quick Links
                </h3>
                <ul className="space-y-1.5 md:space-y-2 lg:space-y-3">
                  <li>
                    <Link
                      href="/"
                      className="text-[10px] md:text-xs font-medium text-white hover:text-yellow-200 transition uppercase tracking-wide"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="text-[10px] md:text-xs font-medium text-white hover:text-yellow-200 transition uppercase tracking-wide"
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-[10px] md:text-xs font-medium text-white hover:text-yellow-200 transition uppercase tracking-wide"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <a
                      href={SOCIAL_LINKS.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] md:text-xs font-medium text-white hover:text-yellow-200 transition uppercase tracking-wide"
                    >
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>

              {/* Follow Section */}
              <div>
                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white mb-3 md:mb-6">
                  Follow
                </h3>
                <ul className="space-y-1.5 md:space-y-2 lg:space-y-3">
                  <li>
                    <a
                      href={SOCIAL_LINKS.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] md:text-xs font-medium text-white hover:text-yellow-200 transition uppercase tracking-wide flex items-center gap-2"
                    >
                      <FaGithub size={14} className="md:size-4 lg:size-4" />
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href={SOCIAL_LINKS.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] md:text-xs font-medium text-white hover:text-yellow-200 transition uppercase tracking-wide flex items-center gap-2"
                    >
                      <FaInstagram size={14} className="md:size-4 lg:size-4" />
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href={SOCIAL_LINKS.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] md:text-xs font-medium text-white hover:text-yellow-200 transition uppercase tracking-wide flex items-center gap-2"
                    >
                      <FaLinkedin size={14} className="md:size-4 lg:size-4" />
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/923270445135"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] md:text-xs font-medium text-white hover:text-yellow-200 transition uppercase tracking-wide flex items-center gap-2"
                    >
                      <FaWhatsapp size={14} className="md:size-4 lg:size-4" />
                      WhatsApp
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Section */}
              <div>
                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white mb-2 md:mb-4">
                  Get in Touch
                </h3>
                <p className="text-[10px] md:text-xs font-medium text-white leading-relaxed mb-2 md:mb-3">
                  <a
                    href="tel:+923270445135"
                    className="hover:text-yellow-200 transition"
                  >
                    +92 327 044 5135
                  </a>
                </p>
                <p className="text-[10px] md:text-xs font-medium text-white leading-relaxed">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="hover:text-yellow-200 transition truncate"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>
            </div>

            {/* Copyright */}
            <div ref={copyrightRef} style={HIDE} className="text-center">
              <p className="text-[10px] md:text-xs font-medium text-white uppercase tracking-wide">
                {new Date().getFullYear()}&copy; ALEEM TALHA. ALL RIGHTS RESERVED
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
