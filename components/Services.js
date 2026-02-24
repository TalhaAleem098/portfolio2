"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { HiArrowUpRight } from "react-icons/hi2";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import servicesData from "@/public/data/services.json";

gsap.registerPlugin(ScrollTrigger);

const HIDE = { opacity: 0, transform: "translateY(30px)" };

export default function Services() {
  const webDesign = servicesData.find((s) => s.id === "web-design");
  const appDesign = servicesData.find((s) => s.id === "app-design");
  const dev360 = servicesData.find((s) => s.id === "360-development");

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power2.out" },
      });

      tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.5 })
        .to(card1Ref.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .to(card2Ref.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .to(card3Ref.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="services"
      className="bg-white mx-1 lg:mx-5 lg:min-h-screen"
      style={{ boxSizing: "border-box" }}
    >
      <div className="py-8 md:py-12 lg:py-16 px-3 md:px-6 lg:px-12 xl:px-16 pt-10 md:pt-14 lg:pt-20">
        <h2 ref={headingRef} style={HIDE} className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-black tracking-tight leading-[1.05] uppercase mb-4 md:mb-6 lg:mb-0">
          My Services
        </h2>
        <div className="flex flex-nowrap gap-3 md:gap-4 lg:gap-6 xl:gap-8 items-start overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none scrollbar-hide">
          <div ref={card1Ref} style={HIDE} className="flex min-w-[70vw] md:min-w-0 md:flex-1 snap-start">
            <div>
              <div className="h-6 md:h-12 lg:h-25"></div>
              <div className="relative group overflow-hidden cursor-pointer">
                <Image
                  src={webDesign.image}
                  alt={webDesign.title}
                  width={400}
                  height={440}
                  className="w-full aspect-15/11 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 md:gap-3 lg:gap-4 px-4 md:px-5 lg:px-6 text-center">
                  <p className="text-white text-[10px] md:text-xs lg:text-sm font-medium leading-relaxed">
                    {webDesign.tagline}
                  </p>
                  <Link
                    href={`/services/${webDesign.id}`}
                    className="flex items-center gap-1.5 md:gap-2 bg-[#FDF94B] text-black font-black text-[10px] md:text-xs px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-full uppercase tracking-wider md:tracking-widest hover:bg-[#e8e410] transition"
                  >
                    See Details <HiArrowUpRight size={12} />
                  </Link>
                </div>
              </div>
              <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-black uppercase tracking-tight mt-2 md:mt-3 lg:mt-4 mb-0.5 md:mb-1">
                {webDesign.title}
              </h3>
              <p className="text-[10px] md:text-xs xl:text-sm font-medium uppercase tracking-wider text-gray-500 leading-relaxed">
                {webDesign.shortDescription}
              </p>
            </div>
          </div>

          <div ref={card2Ref} style={HIDE} className="flex flex-col gap-2 md:gap-3 lg:gap-4 min-w-[70vw] md:min-w-0 md:flex-1 snap-start">
            <div className="relative group overflow-hidden cursor-pointer">
              <Image
                src={appDesign.image}
                alt={appDesign.title}
                width={400}
                height={600}
                className="w-full aspect-3/4 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 md:gap-3 lg:gap-4 px-4 md:px-5 lg:px-6 text-center">
                <p className="text-white text-[10px] md:text-xs lg:text-sm font-medium leading-relaxed">
                  {appDesign.tagline}
                </p>
                <Link
                  href={`/services/${appDesign.id}`}
                  className="flex items-center gap-1.5 md:gap-2 bg-[#FDF94B] text-black font-black text-[10px] md:text-xs px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-full uppercase tracking-wider md:tracking-widest hover:bg-[#e8e410] transition"
                >
                  See Details <HiArrowUpRight size={12} />
                </Link>
              </div>
            </div>
            <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-black uppercase tracking-tight mt-1 md:mt-2 mb-0.5 md:mb-1">
              {appDesign.title}
            </h3>
            <p className="text-[10px] md:text-xs xl:text-sm font-medium uppercase tracking-wider text-gray-500 leading-relaxed whitespace-pre-line">
              {appDesign.shortDescription}
            </p>
          </div>

          <div ref={card3Ref} style={HIDE} className="flex flex-col gap-3 md:gap-5 lg:gap-8 min-w-[70vw] md:min-w-0 md:flex-1 snap-start">
            <p className="text-[10px] md:text-xs xl:text-sm font-medium uppercase tracking-wider text-gray-500 leading-relaxed pt-1 md:pt-2">
              I offer a range of services that blend design and development to
              create seamless, user-focused digital solutions
            </p>

            <div>
              <div className="relative group overflow-hidden cursor-pointer">
                <Image
                  src={dev360.image}
                  alt={dev360.title}
                  width={400}
                  height={520}
                  className="w-full aspect-13/13 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 md:gap-3 lg:gap-4 px-4 md:px-5 lg:px-6 text-center">
                  <p className="text-white text-[10px] md:text-xs lg:text-sm font-medium leading-relaxed">
                    {dev360.tagline}
                  </p>
                  <Link
                    href={`/services/${dev360.id}`}
                    className="flex items-center gap-1.5 md:gap-2 bg-[#FDF94B] text-black font-black text-[10px] md:text-xs px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-full uppercase tracking-wider md:tracking-widest hover:bg-[#e8e410] transition"
                  >
                    See Details <HiArrowUpRight size={12} />
                  </Link>
                </div>
              </div>
              <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-black uppercase tracking-tight mt-2 md:mt-3 lg:mt-4 mb-0.5 md:mb-1">
                {dev360.title}
              </h3>
              <p className="text-[10px] md:text-xs xl:text-sm font-medium uppercase tracking-wider text-gray-500 leading-relaxed whitespace-pre-line">
                {dev360.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
