"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HIDE = { opacity: 0, transform: "translateY(30px)" };

export default function MyWorkstation() {
  const workstationItems = [
    {
      title: "My Main Working Area",
      description:
        "This is my main working area where I spend most of the time.",
      image: "/images/my-workstation/workstation-1.jpg",
    },
    {
      title: "My iPad",
      description:
        "I use my iPad to read books. Also I use my iPad for so many things in work.",
      image: "/images/my-workstation/workstation-2.jpg",
    },
    {
      title: "My MacBook",
      description:
        "When I travel I use this MacBook for work, meeting & everything.",
      image: "/images/my-workstation/workstation-3.jpg",
    },
    {
      title: "My Mac & iPhone",
      description: "This is my another MacBook. Its for my another teammate.",
      image: "/images/my-workstation/workstation-4.jpg",
    },
  ];

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const col3Ref = useRef(null);

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
        .to(col1Ref.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .to(col2Ref.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .to(col3Ref.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white mx-1 lg:mx-5">
      <div className="px-1 md:px-2 lg:px-3">
        <section
          ref={sectionRef}
          className="bg-[#5477CC] overflow-hidden py-8 md:py-12 lg:py-16 px-3 md:px-6 lg:px-12 xl:px-16 min-h-screen flex flex-col justify-between"
        >
          <h2 ref={headingRef} style={HIDE} className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-black tracking-tight leading-[1.05] uppercase text-white mb-6 md:mb-8 lg:mb-12">
            My Workstation
          </h2>

          {/* Mobile/Tablet: horizontal scroll, Desktop: 3-col grid */}
          <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scrollbar-hide pb-4 md:pb-0">
            {/* Column 1 */}
            <div ref={col1Ref} style={HIDE} className="min-w-[70vw] md:min-w-0 snap-start flex flex-col gap-3 md:gap-4 lg:gap-8">
              <div className="relative group overflow-hidden cursor-pointer">
                <Image
                  src={workstationItems[0].image}
                  alt={workstationItems[0].title}
                  width={300}
                  height={250}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105 rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-black uppercase tracking-tight text-white mb-1 md:mb-2">
                  {workstationItems[0].title}
                </h3>
                <p className="text-[10px] md:text-xs xl:text-sm font-medium text-white/80 uppercase tracking-wide">
                  {workstationItems[0].description}
                </p>
              </div>
            </div>

            {/* Column 2 */}
            <div ref={col2Ref} style={HIDE} className="min-w-[70vw] md:min-w-0 snap-start flex flex-col gap-3 md:gap-4 lg:gap-8">
              <div className="relative group overflow-hidden cursor-pointer">
                <Image
                  src={workstationItems[2].image}
                  alt={workstationItems[2].title}
                  width={300}
                  height={350}
                  className="w-full aspect-3/4 object-cover transition-transform duration-500 group-hover:scale-105 rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-black uppercase tracking-tight text-white mb-1 md:mb-2">
                  {workstationItems[2].title}
                </h3>
                <p className="text-[10px] md:text-xs xl:text-sm font-medium text-white/80 uppercase tracking-wide">
                  {workstationItems[2].description}
                </p>
              </div>
            </div>

            {/* Column 3 - special layout */}
            <div ref={col3Ref} style={HIDE} className="min-w-[70vw] md:min-w-0 snap-start flex flex-col gap-4 md:gap-6 lg:gap-8">
              {/* Row 1: 7 cols image, 5 cols space */}
              <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8 items-start">
                <div className="col-span-12 md:col-span-7">
                  <div className="relative group overflow-hidden cursor-pointer">
                    <Image
                      src={workstationItems[1].image}
                      alt={workstationItems[1].title}
                      width={280}
                      height={280}
                      className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105 rounded-lg"
                    />
                  </div>
                  <div className="mt-2 md:mt-3 lg:mt-4">
                    <h3 className="text-sm md:text-base lg:text-lg font-black uppercase tracking-tight text-white mb-0.5 md:mb-1">
                      {workstationItems[1].title}
                    </h3>
                    <p className="text-[10px] md:text-xs font-medium text-white/75 uppercase tracking-wide">
                      {workstationItems[1].description}
                    </p>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-5"></div>
              </div>

              {/* Row 2: 5 cols space, 7 cols image */}
              <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8 items-start">
                <div className="col-span-12 md:col-span-5"></div>
                <div className="col-span-12 md:col-span-7 lg:mt-8">
                  <div className="relative group overflow-hidden cursor-pointer">
                    <Image
                      src={workstationItems[3].image}
                      alt={workstationItems[3].title}
                      width={280}
                      height={280}
                      className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105 rounded-lg"
                    />
                  </div>
                  <div className="mt-2 md:mt-3 lg:mt-4">
                    <h3 className="text-sm md:text-base lg:text-lg font-black uppercase tracking-tight text-white mb-0.5 md:mb-1">
                      {workstationItems[3].title}
                    </h3>
                    <p className="text-[10px] md:text-xs font-medium text-white/75 uppercase tracking-wide">
                      {workstationItems[3].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
