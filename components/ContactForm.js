"use client";

import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

export default function ContactForm() {
  return (
    <div className="w-full max-w-6xl mx-auto px-8 lg:px-16 xl:px-20 py-20">
      {/* ── Heading ── */}
      <h1
        className="text-[3.2rem] leading-[1.1] md:text-7xl lg:text-[6.5rem] font-light text-white mb-6"
        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
      >
        Contact Me
      </h1>

      <p className="text-white/75 text-sm lg:text-[15px] leading-relaxed mb-16 lg:mb-20 max-w-sm">
        Feel free to reach out and we
        <br />
        will get back to you as soon as we can.
      </p>

      {/* ── Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28">
        {/* Left — Form */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Name */}
          <div>
            <label className="block text-white/80 text-sm mb-1 tracking-wide font-medium">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full bg-transparent border-b border-white/30 text-white py-3 outline-none focus:border-[#FDF94B] transition-colors duration-300 placeholder-white/40"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-white/80 text-sm mb-1 tracking-wide font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Your email address"
              className="w-full bg-transparent border-b border-white/30 text-white py-3 outline-none focus:border-[#FDF94B] transition-colors duration-300 placeholder-white/40"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-white/80 text-sm mb-1 tracking-wide font-medium">
              Subject
            </label>
            <input
              type="text"
              placeholder="Project subject"
              className="w-full bg-transparent border-b border-white/30 text-white py-3 outline-none focus:border-[#FDF94B] transition-colors duration-300 placeholder-white/40"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-white/80 text-sm mb-1 tracking-wide font-medium">
              Message
            </label>
            <textarea
              rows={4}
              placeholder="Tell me about your project"
              className="w-full bg-transparent border-b border-white/30 text-white py-3 outline-none focus:border-[#FDF94B] transition-colors duration-300 resize-none placeholder-white/40"
            />
          </div>

          {/* Send Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-[#FDF94B] hover:bg-[#e8e410] text-black font-black text-sm tracking-widest uppercase py-4 rounded-full transition-colors duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              Send Message
              <HiArrowUpRight size={16} />
            </button>
          </div>

          {/* Alternative Contact */}
          <p className="text-white/60 text-xs mt-6 text-center">
            Or reach out directly via WhatsApp or email below
          </p>
        </form>

        {/* Right — Contact Info */}
        <div className="space-y-10">
          {/* Email */}
          <div>
            <h3 className="text-white font-black text-sm uppercase tracking-widest mb-4">
              Email
            </h3>
            <a
              href="mailto:aleemtalha098@gmail.com"
              className="text-white/75 text-sm leading-relaxed font-medium hover:text-[#FDF94B] transition-colors duration-200"
            >
              aleemtalha098@gmail.com
            </a>
          </div>

          {/* Phone & WhatsApp */}
          <div>
            <h3 className="text-white font-black text-sm uppercase tracking-widest mb-4">
              Talk to me
            </h3>
            <p className="text-white/75 text-sm leading-relaxed font-medium space-y-2">
              <a
                href="tel:+923270445135"
                className="block hover:text-[#FDF94B] transition-colors duration-200"
              >
                +92 327 044 5135
              </a>
              <a
                href="https://wa.me/923270445135"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[#FDF94B] transition-colors duration-200"
              >
                WhatsApp Available
              </a>
            </p>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-white font-black text-sm uppercase tracking-widest mb-4">
              Response Time
            </h3>
            <p className="text-white/75 text-sm leading-relaxed font-medium">
              Usually responds within 24 hours.
              <br />
              Best for urgent inquiries: WhatsApp
            </p>
          </div>

          {/* Social Icons */}
          <div>
            <h3 className="text-white font-black text-sm uppercase tracking-widest mb-6">
              Connect
            </h3>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/AleemTalha"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#5477CC] transition-all duration-200"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/talha-aleem-a275a72a6/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#5477CC] transition-all duration-200"
              >
                <FaLinkedinIn size={18} />
              </a>
              <a
                href="https://www.instagram.com/aleemtalha_dev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#5477CC] transition-all duration-200"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://wa.me/923270445135"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#5477CC] transition-all duration-200"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Back to Home */}
          <div className="pt-6 border-t border-white/20">
            <Link
              href="/"
              className="text-white/75 text-sm font-medium uppercase tracking-widest hover:text-[#FDF94B] transition-colors duration-200"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
