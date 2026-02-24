"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { HiArrowUpRight } from "react-icons/hi2";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HIDE = { opacity: 0, transform: "translateY(30px)" };

export default function WorkPageContent({ project, prevProject, nextProject }) {
  const pageRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroImgRef = useRef(null);
  const infoRef = useRef(null);
  const overviewRef = useRef(null);
  const highlightsRef = useRef(null);
  const techHeadRef = useRef(null);
  const techGridRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text
      const heroTl = gsap.timeline({
        scrollTrigger: { trigger: heroTextRef.current, start: "top 85%", toggleActions: "play none none none" },
        defaults: { ease: "power2.out" },
      });
      heroTl
        .to(heroTextRef.current, { opacity: 1, y: 0, duration: 0.5 })
        .to(heroImgRef.current, { opacity: 1, y: 0, duration: 0.55 }, "-=0.2");

      // Info strip
      gsap.to(infoRef.current, {
        opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: infoRef.current, start: "top 85%", toggleActions: "play none none none" },
      });

      // Overview + Highlights
      const descTl = gsap.timeline({
        scrollTrigger: { trigger: overviewRef.current, start: "top 85%", toggleActions: "play none none none" },
        defaults: { ease: "power2.out" },
      });
      descTl
        .to(overviewRef.current, { opacity: 1, y: 0, duration: 0.5 })
        .to(highlightsRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.25");

      // Tech
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
    <div ref={pageRef} className="min-h-screen bg-[#f5f5f5]">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 lg:px-10 xl:px-14 py-4 lg:py-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-black hover:text-[#5477CC] transition-colors duration-200 group"
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
            className="text-black font-bold text-lg lg:text-2xl xl:text-3xl tracking-wide"
          >
            ALEEM{" "}
            <span className="text-xs lg:text-sm font-extrabold">Talha</span>
          </Link>

          <span className="text-gray-500 text-xs lg:text-sm font-bold uppercase tracking-widest">
            Works
          </span>
        </div>
      </nav>

      {/* ── Project Hero ── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-14 pt-16 lg:pt-24 pb-0">
          <div ref={heroTextRef} style={HIDE} className="mb-8">
            <span className="inline-block px-4 py-1.5 bg-[#5477CC] text-white text-xs font-black uppercase tracking-widest rounded-full mb-6">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight uppercase mb-6">
              {project.title}
            </h1>
            <p className="text-gray-500 text-sm lg:text-base leading-relaxed max-w-2xl font-medium">
              {project.tagline}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-14 pb-16 lg:pb-24">
          <div ref={heroImgRef} style={HIDE} className="relative overflow-hidden rounded-xl">
            <Image
              src={project.image}
              alt={`${project.title} — Project by Aleem Talha`}
              width={1400}
              height={800}
              className="w-full aspect-video object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── Project Info Strip ── */}
      <section className="bg-[#5477CC]">
        <div ref={infoRef} style={HIDE} className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-14 py-10 lg:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Client", value: project.client },
              { label: "Duration", value: project.duration },
              { label: "Year", value: project.year },
              { label: "Category", value: project.category },
            ].map((item, idx) => (
              <div key={idx}>
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">
                  {item.label}
                </p>
                <p className="text-white text-base lg:text-lg font-black uppercase tracking-tight">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Description + Challenge/Solution ── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-14 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left — About */}
            <div ref={overviewRef} style={HIDE}>
              <p className="text-[#5477CC] text-xs font-black uppercase tracking-[0.3em] mb-3">
                About The Project
              </p>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight leading-[1.05] uppercase mb-8">
                Overview
              </h2>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed font-medium mb-10">
                {project.description}
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight mb-3 text-[#5477CC]">
                    The Challenge
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">
                    {project.challenge}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight mb-3 text-[#5477CC]">
                    The Solution
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">
                    {project.solution}
                  </p>
                </div>
              </div>
            </div>

            {/* Right — Highlights + Results */}
            <div ref={highlightsRef} style={HIDE}>
              <p className="text-[#5477CC] text-xs font-black uppercase tracking-[0.3em] mb-3">
                Key Deliverables
              </p>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight leading-[1.05] uppercase mb-8">
                Highlights
              </h2>

              <div className="space-y-5 mb-14">
                {project.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 pb-5 border-b border-gray-200"
                  >
                    <span className="text-2xl font-black text-[#5477CC] leading-none shrink-0">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              {/* Results */}
              <p className="text-[#5477CC] text-xs font-black uppercase tracking-[0.3em] mb-3">
                Impact
              </p>
              <h3 className="text-2xl font-black tracking-tight leading-[1.05] uppercase mb-6">
                Results
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Performance", value: project.results.performance },
                  { label: "Load Time", value: project.results.loadTime },
                  { label: "Satisfaction", value: project.results.userSatisfaction },
                ].map((r, idx) => (
                  <div key={idx} className="bg-[#5477CC] rounded-lg p-4 lg:p-5 text-center">
                    <p className="text-white text-lg lg:text-xl font-black leading-tight mb-1">
                      {r.value}
                    </p>
                    <p className="text-white/60 text-[10px] lg:text-xs font-bold uppercase tracking-wider">
                      {r.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Technologies ── */}
      <section className="bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-14 py-16 lg:py-20">
          <div ref={techHeadRef} style={HIDE}>
          <p className="text-[#5477CC] text-xs font-black uppercase tracking-[0.3em] mb-3">
            Built With
          </p>
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight leading-[1.05] uppercase mb-10">
            Tech Stack
          </h2>
          </div>

          <div ref={techGridRef} style={HIDE} className="flex flex-wrap gap-4">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-6 lg:px-8 py-3 lg:py-4 bg-white border-2 border-gray-200 text-sm lg:text-base font-black uppercase tracking-widest hover:bg-[#5477CC] hover:text-white hover:border-[#5477CC] transition-all duration-300 cursor-default rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Prev / Next Navigation ── */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-14">
          <div className="grid grid-cols-2 divide-x divide-gray-200">
            <div className="py-10 lg:py-16 pr-6 lg:pr-12">
              {prevProject ? (
                <Link
                  href={`/works/${prevProject.id}`}
                  className="group block"
                >
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <FiArrowLeft
                      size={14}
                      className="group-hover:-translate-x-1 transition-transform duration-200"
                    />
                    Previous Project
                  </p>
                  <h3 className="text-lg lg:text-2xl font-black uppercase tracking-tight group-hover:text-[#5477CC] transition-colors duration-200">
                    {prevProject.title}
                  </h3>
                </Link>
              ) : (
                <div className="opacity-30">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">
                    Previous Project
                  </p>
                  <p className="text-lg font-black uppercase tracking-tight text-gray-300">
                    —
                  </p>
                </div>
              )}
            </div>

            <div className="py-10 lg:py-16 pl-6 lg:pl-12 text-right">
              {nextProject ? (
                <Link
                  href={`/works/${nextProject.id}`}
                  className="group block"
                >
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center justify-end gap-2">
                    Next Project
                    <FiArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform duration-200"
                    />
                  </p>
                  <h3 className="text-lg lg:text-2xl font-black uppercase tracking-tight group-hover:text-[#5477CC] transition-colors duration-200">
                    {nextProject.title}
                  </h3>
                </Link>
              ) : (
                <div className="opacity-30">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">
                    Next Project
                  </p>
                  <p className="text-lg font-black uppercase tracking-tight text-gray-300">
                    —
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#5477CC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-14 py-16 lg:py-24">
          <div ref={ctaRef} style={HIDE} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div>
              <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] uppercase mb-6">
                Have a Similar
                <br />
                Project?
              </h2>
              <p className="text-white/75 text-sm lg:text-base font-medium leading-relaxed max-w-md">
                Let&apos;s build something amazing together. I&apos;m ready to
                bring your ideas to life.
              </p>
            </div>

            <Link
              href="https://wa.me/923270445135"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-10 py-5 bg-[#FDF94B] text-black font-black uppercase tracking-widest rounded-full hover:bg-[#e8e410] transition-all duration-300 shrink-0"
            >
              Let&apos;s Talk
              <HiArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
