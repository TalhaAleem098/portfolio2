"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { HiArrowUpRight } from "react-icons/hi2";
import { FiArrowLeft } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HIDE = { opacity: 0, transform: "translateY(30px)" };

export default function ServicePageContent({ service }) {
  const pageRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroImgRef = useRef(null);
  const statsRef = useRef(null);
  const featuresHeadRef = useRef(null);
  const featuresGridRef = useRef(null);
  const processHeadRef = useRef(null);
  const processGridRef = useRef(null);
  const techHeadRef = useRef(null);
  const techGridRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroTextRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power2.out" },
      });
      heroTl
        .to(heroTextRef.current, { opacity: 1, y: 0, duration: 0.5 })
        .to(heroImgRef.current, { opacity: 1, y: 0, duration: 0.55 }, "-=0.2");

      // Stats
      gsap.to(statsRef.current, {
        opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: statsRef.current, start: "top 85%", toggleActions: "play none none none" },
      });

      // Features
      const featTl = gsap.timeline({
        scrollTrigger: { trigger: featuresHeadRef.current, start: "top 85%", toggleActions: "play none none none" },
        defaults: { ease: "power2.out" },
      });
      featTl
        .to(featuresHeadRef.current, { opacity: 1, y: 0, duration: 0.5 })
        .to(featuresGridRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");

      // Process
      const procTl = gsap.timeline({
        scrollTrigger: { trigger: processHeadRef.current, start: "top 85%", toggleActions: "play none none none" },
        defaults: { ease: "power2.out" },
      });
      procTl
        .to(processHeadRef.current, { opacity: 1, y: 0, duration: 0.5 })
        .to(processGridRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");

      // Technologies
      const techTl = gsap.timeline({
        scrollTrigger: { trigger: techHeadRef.current, start: "top 85%", toggleActions: "play none none none" },
        defaults: { ease: "power2.out" },
      });
      techTl
        .to(techHeadRef.current, { opacity: 1, y: 0, duration: 0.5 })
        .to(techGridRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");

      // CTA
      gsap.to(ctaRef.current, {
        opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 85%", toggleActions: "play none none none" },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-white">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-[#5477CC]">
        <div className="flex items-center justify-between px-6 lg:px-10 xl:px-14 py-4 lg:py-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-white hover:text-[#FDF94B] transition-colors duration-200 group"
          >
            <FiArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform duration-200"
            />
            <span className="text-sm font-bold uppercase tracking-widest">
              Back
            </span>
          </Link>

          <Link
            href="/"
            className="text-white font-bold text-lg lg:text-2xl xl:text-3xl tracking-wide"
          >
            ALEEM{" "}
            <span className="text-xs lg:text-sm font-extrabold">Talha</span>
          </Link>

          <Link
            href="/services"
            className="text-white/80 text-xs lg:text-sm font-bold uppercase tracking-widest hover:text-[#FDF94B] transition-colors duration-200"
          >
            Services
          </Link>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="bg-[#5477CC]">
        <div className="px-6 lg:px-10 xl:px-14 pt-12 lg:pt-20 pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div ref={heroTextRef} style={HIDE}>
              <p className="text-[#FDF94B] text-xs font-black uppercase tracking-[0.3em] mb-4">
                Service
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight uppercase mb-6">
                {service.title}
              </h1>
              <p className="text-white/80 text-sm lg:text-base leading-relaxed max-w-lg font-medium">
                {service.heroDescription}
              </p>
            </div>

            <div ref={heroImgRef} style={HIDE} className="relative overflow-hidden rounded-lg">
              <Image
                src={service.image}
                alt={`${service.title} — Aleem Talha`}
                width={800}
                height={600}
                className="w-full aspect-4/3 object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="bg-[#3d5faa]">
        <div ref={statsRef} style={HIDE} className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-14 py-10 lg:py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: service.stats.projectsCompleted, label: "Projects Completed" },
              { value: service.stats.clientSatisfaction, label: "Client Satisfaction" },
              { value: service.stats.avgDelivery, label: "Avg Delivery" },
            ].map((stat, idx) => (
              <div key={idx} className="flex items-end justify-between border-b border-white/20 pb-6">
                <span className="text-3xl lg:text-4xl font-black text-white leading-none">
                  {stat.value}
                </span>
                <span className="text-xs uppercase tracking-widest text-white/70 font-bold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-14 py-16 lg:py-24">
          <div ref={featuresHeadRef} style={HIDE}>
          <p className="text-[#5477CC] text-xs font-black uppercase tracking-[0.3em] mb-3">
            What I Deliver
          </p>
          <h2 className="text-3xl lg:text-5xl font-black tracking-tight leading-[1.05] uppercase mb-14">
            Key Features
          </h2>
          </div>

          <div ref={featuresGridRef} style={HIDE} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {service.features.map((feature, idx) => (
              <div key={idx} className="pb-8 border-b border-gray-200">
                <div className="flex items-start gap-4">
                  <span className="text-3xl lg:text-4xl font-black text-[#5477CC] leading-none shrink-0">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg xl:text-xl font-black uppercase tracking-tight mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Section ── */}
      <section className="bg-[#5477CC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-14 py-16 lg:py-24">
          <div ref={processHeadRef} style={HIDE}>
          <p className="text-[#FDF94B] text-xs font-black uppercase tracking-[0.3em] mb-3">
            How I Work
          </p>
          <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight leading-[1.05] uppercase mb-14">
            My Process
          </h2>
          </div>

          <div ref={processGridRef} style={HIDE} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {service.process.map((step, idx) => (
              <div key={idx} className="relative">
                <span className="text-5xl lg:text-6xl font-black text-white/15 leading-none">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="text-sm lg:text-base font-black text-white uppercase tracking-wide mt-2">
                  {step}
                </h3>
                {idx < service.process.length - 1 && (
                  <div className="hidden lg:block absolute top-6 right-0 w-8 h-0.5 bg-white/20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technologies Section ── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-14 py-16 lg:py-24">
          <div ref={techHeadRef} style={HIDE}>
          <p className="text-[#5477CC] text-xs font-black uppercase tracking-[0.3em] mb-3">
            Tools & Stack
          </p>
          <h2 className="text-3xl lg:text-5xl font-black tracking-tight leading-[1.05] uppercase mb-14">
            Technologies
          </h2>
          </div>

          <div ref={techGridRef} style={HIDE} className="flex flex-wrap gap-4">
            {service.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-6 lg:px-8 py-3 lg:py-4 border-2 border-black text-sm lg:text-base font-black uppercase tracking-widest hover:bg-[#5477CC] hover:text-white hover:border-[#5477CC] transition-all duration-300 cursor-default rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="bg-[#5477CC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-14 py-16 lg:py-24">
          <div ref={ctaRef} style={HIDE} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div>
              <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] uppercase mb-6">
                Interested in
                <br />
                {service.title}?
              </h2>
              <p className="text-white/75 text-sm lg:text-base font-medium leading-relaxed max-w-md">
                Let&apos;s discuss how I can bring your vision to life with
                my {service.title.toLowerCase()} expertise.
              </p>
            </div>

            <Link
              href="https://wa.me/923270445135"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-10 py-5 bg-[#FDF94B] text-black font-black uppercase tracking-widest rounded-full hover:bg-[#e8e410] transition-all duration-300 shrink-0"
            >
              Get Started
              <HiArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
