"use client";

import { useState, useEffect, useRef } from "react";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

export default function ContactModal({ isOpen, onClose }) {
  const [phase, setPhase] = useState("closed"); // closed | entering | open | leaving
  const overlayRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
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
        body: JSON.stringify({ ...formData, subject: "Contact via Modal" }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setStatusMessage(data.message || "Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setStatusMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setStatusMessage("Network error. Please try again.");
    }
  };

  // Derive phase transitions at render time (no effect needed)
  if (isOpen && (phase === "closed" || phase === "leaving")) {
    setPhase("entering");
  }
  if (!isOpen && (phase === "open" || phase === "entering")) {
    setPhase("leaving");
  }

  useEffect(() => {
    if (phase === "entering") {
      document.body.style.overflow = "hidden";
      const raf1 = requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase("open"));
      });
      return () => cancelAnimationFrame(raf1);
    }
    if (phase === "leaving") {
      document.body.style.overflow = "";
      const timer = setTimeout(() => setPhase("closed"), 500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "closed") return null;

  const show = phase === "open";

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-50 transition-opacity duration-500 ease-in-out ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-[#5477CC] overflow-y-auto flex items-center justify-center">
        {/* ── Close / Hamburger Button ── */}
        <button
          onClick={onClose}
          className="fixed top-10 left-8 lg:left-12 z-50 flex flex-col gap-1.5 cursor-pointer group"
          aria-label="Close contact form"
        >
          <span className="block w-7 h-0.5 bg-white/80 group-hover:bg-[#FDF94B] transition" />
          <span className="block w-7 h-0.5 bg-white/80 group-hover:bg-[#FDF94B] transition" />
        </button>

        <div className="w-full max-w-6xl mx-auto px-8 lg:px-16 xl:px-20 py-20">
          {/* ── Heading ── */}
          <h1
            className={`text-[3.2rem] leading-[1.1] md:text-7xl lg:text-[6.5rem] font-light text-white mb-6 transition-all duration-700 ease-out ${
              show
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Contact Us
          </h1>

          <p
            className={`text-white/75 text-sm lg:text-[15px] leading-relaxed mb-16 lg:mb-20 max-w-sm transition-all duration-700 delay-100 ease-out ${
              show
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            Please feel free to contact us and we
            <br />
            will get back to you as soon as we can.
          </p>

          {/* ── Content Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28">
            {/* Left — Form */}
            <form
              className={`space-y-6 transition-all duration-700 delay-200 ease-out ${
                show
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              onSubmit={handleSubmit}
            >
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
                  required
                  className="w-full bg-transparent border-b border-white/30 text-white py-3 outline-none focus:border-[#FDF94B] transition-colors duration-300"
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
                  required
                  className="w-full bg-transparent border-b border-white/30 text-white py-3 outline-none focus:border-[#FDF94B] transition-colors duration-300"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-white/80 text-sm mb-1 tracking-wide font-medium">
                  Message
                </label>
                <textarea
                  rows={1}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-white/30 text-white py-3 outline-none focus:border-[#FDF94B] transition-colors duration-300 resize-none"
                />
              </div>

              {/* Status */}
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
                    "Sent!"
                  ) : (
                    "Send"
                  )}
                </button>
              </div>
            </form>

            {/* Right — Contact Info */}
            <div
              className={`space-y-10 transition-all duration-700 delay-300 ease-out ${
                show
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {/* Visit Us */}
              <div>
                <h3 className="text-white font-black text-sm uppercase tracking-widest mb-4">
                  Email
                </h3>
                <a
                  href="mailto:aleemtalha098@gmail.com"
                  className="text-white/75 text-sm leading-relaxed font-medium hover:text-[#FDF94B] transition-colors"
                >
                  aleemtalha098@gmail.com
                </a>
              </div>

              {/* Talk to Us */}
              <div>
                <h3 className="text-white font-black text-sm uppercase tracking-widest mb-4">
                  Talk to me
                </h3>
                <p className="text-white/75 text-sm leading-relaxed font-medium">
                  <a
                    href="tel:+923270445135"
                    className="hover:text-[#FDF94B] transition-colors"
                  >
                    +92 327 044 5135
                  </a>
                  <br />
                  <a
                    href="https://wa.me/923270445135"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FDF94B] transition-colors"
                  >
                    WhatsApp
                  </a>
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-5 pt-2">
                <a
                  href="https://github.com/AleemTalha"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#5477CC] transition-all duration-200"
                >
                  <FaGithub size={16} />
                </a>
                <a
                  href="https://www.linkedin.com/in/talha-aleem-a275a72a6/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#5477CC] transition-all duration-200"
                >
                  <FaLinkedinIn size={16} />
                </a>
                <a
                  href="https://www.instagram.com/aleemtalha_dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#5477CC] transition-all duration-200"
                >
                  <FaInstagram size={16} />
                </a>
                <a
                  href="https://wa.me/923270445135"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#5477CC] transition-all duration-200"
                >
                  <FaWhatsapp size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
