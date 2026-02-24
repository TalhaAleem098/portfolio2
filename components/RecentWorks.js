"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectsData from "@/public/data/projects.json";

gsap.registerPlugin(ScrollTrigger);

const projects = projectsData.map((p) => ({
  id: p.id,
  title: p.title,
  image: p.image,
}));

const experienceStats = [
  { label: "Years Experience", value: "2.5+" },
  { label: "Projects Completed", value: "15+" },
  { label: "Bugs Solved", value: "200+" },
  { label: "Overall Rating", value: "4.9+" },
];

export default function RecentWorks() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  const expHeadingRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const cardWidth = track.querySelector("div").offsetWidth;
      const getScrollAmount = () =>
        track.scrollWidth - section.offsetWidth / 2 - cardWidth / 2;

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Cards track reveal
      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      // Experience heading reveal
      gsap.to(expHeadingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: expHeadingRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      // Stats grid reveal
      gsap.to(statsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="px-1 lg:px-0">
      <div className="bg-white px-1 lg:mx-5">
        <div className="px-2 w-full">
          <section
            id="recent-works"
            ref={sectionRef}
            className="bg-[#5477CC] min-h-screen overflow-hidden py-10 w-full flex flex-col justify-between"
          >
            <div className="px-2 md:px-4 lg:px-6 xl:px-10">
              <h2 ref={headingRef} style={{ opacity: 0, transform: "translateY(30px)" }} className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-black text-white text-center md:text-left mb-8">
                My Recent Works
              </h2>
            </div>

            <div ref={cardsRef} style={{ opacity: 0, transform: "translateY(30px)" }}>
            <div ref={trackRef} className="flex gap-8 px-6 lg:px-12 pb-10">
              {projects.map((project) => (
                <div
                  key={project.title}
                  className="group shrink-0 w-[75vw] md:w-[45vw] lg:w-[25vw] relative cursor-pointer"
                >
                  <Link href={`/works/${project.id}`} className="block">
                    <div className="relative">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={1792}
                        height={1120}
                        className="w-full aspect-1792/1120 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center rounded-lg">
                        <span className="opacity-0 group-hover:opacity-100 text-white font-bold py-2 px-4 border border-white rounded-full transition-opacity duration-300">
                          View Details
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold text-white uppercase mt-4 text-center">
                      {project.title}
                    </h3>
                  </Link>
                </div>
              ))}
            </div>
            </div>

            <section className="bg-[#5477CC] py-12">
              <div className=" mx-auto px-6 lg:px-12">
                <h2 ref={expHeadingRef} style={{ opacity: 0, transform: "translateY(30px)" }} className="text-xl text-center md:text-left md:text-2xl lg:text-4xl xl:text-5xl font-black text-white mb-12">
                  My Experience
                </h2>

                <div ref={statsRef} style={{ opacity: 0, transform: "translateY(30px)" }} className="grid grid-cols-2  lg:grid-cols-4 gap-10">
                  {experienceStats.map((stat, idx) => {
                    const numeric = stat.value.replace("+", "");
                    const hasPlus = stat.value.includes("+");

                    return (
                      <div
                        key={idx}
                        className="flex flex-col md:flex-row items-end justify-between border-b border-white/30 pb-6"
                      >
                        <div className="flex w-full">
                          <span className="text-4xl lg:text-5xl font-black text-white leading-none">
                            {numeric}
                          </span>
                          {hasPlus && (
                            <span className="text-xl md:text-2xl lg:text-3xl font-bold text-white ml-1">
                              +
                            </span>
                          )}
                        </div>

                        <div className=" md:text-right">
                          <span className="text-[10px] lg:text-sm uppercase tracking-wider text-white">
                            {stat.label.split(" ").slice(0, 3).join(" ")}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
}
