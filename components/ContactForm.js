"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { HiArrowUpRight } from "react-icons/hi2";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const HIDE = { opacity: 0, transform: "translateY(30px)" };

export default function ContactForm() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus("error");
      setStatusMessage("Please fill in all fields.");
      return;
    }

    setStatus("sending");
    setStatusMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setStatusMessage(data.message || "Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setStatusMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setStatusMessage("Network error. Please check your connection and try again.");
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power2.out" },
      });

      tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.5 })
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
        .to(formRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.15")
        .to(infoRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="w-full max-w-6xl mx-auto px-8 lg:px-16 xl:px-20 py-20">
      {/* ── Heading ── */}
      <h1
        ref={headingRef}
        className="text-[3.2rem] leading-[1.1] md:text-7xl lg:text-[6.5rem] font-light text-white mb-6"
        style={{ ...HIDE, fontFamily: "'Georgia', 'Times New Roman', serif" }}
      >
        Contact Me
      </h1>

      <p ref={descRef} style={HIDE} className="text-white/75 text-sm lg:text-[15px] leading-relaxed mb-16 lg:mb-20 max-w-sm">
        Feel free to reach out and we
        <br />
        will get back to you as soon as we can.
      </p>

      {/* ── Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28">
        {/* Left — Form */}
        <form ref={formRef} style={HIDE} className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-white/80 text-sm mb-1 tracking-wide font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email address"
              required
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
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Project subject"
              required
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
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project"
              required
              className="w-full bg-transparent border-b border-white/30 text-white py-3 outline-none focus:border-[#FDF94B] transition-colors duration-300 resize-none placeholder-white/40"
            />
          </div>

          {/* Status Message */}
          {statusMessage && (
            <p
              className={`text-sm text-center py-2 rounded-lg ${
                status === "success"
                  ? "text-green-400 bg-green-400/10"
                  : "text-red-400 bg-red-400/10"
              }`}
            >
              {statusMessage}
            </p>
          )}

          {/* Send Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-[#FDF94B] hover:bg-[#e8e410] disabled:opacity-60 disabled:cursor-not-allowed text-black font-black text-sm tracking-widest uppercase py-4 rounded-full transition-colors duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              {status === "sending" ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </>
              ) : status === "success" ? (
                <>Sent Successfully!</>
              ) : (
                <>
                  Send Message
                  <HiArrowUpRight size={16} />
                </>
              )}
            </button>
          </div>

          {/* Alternative Contact */}
          <p className="text-white/60 text-xs mt-6 text-center">
            Or reach out directly via WhatsApp or email below
          </p>
        </form>

        {/* Right — Contact Info */}
        <div ref={infoRef} style={HIDE} className="space-y-10">
          {/* Email */}
          <div>
            <h3 className="text-white font-black text-sm uppercase tracking-widest mb-4">
              Email
            </h3>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-white/75 text-sm leading-relaxed font-medium hover:text-[#FDF94B] transition-colors duration-200"
            >
              {CONTACT_EMAIL}
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
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#5477CC] transition-all duration-200"
              >
                <FaGithub size={18} />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#5477CC] transition-all duration-200"
              >
                <FaLinkedinIn size={18} />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
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
