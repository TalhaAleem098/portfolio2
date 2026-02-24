"use client";

import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";

export default function ProjectCTA() {
  return (
    <div className="bg-white mx-1 lg:mx-5">
      <div className="min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh] flex items-center">
        <div className="w-full mx-auto px-3 md:px-6 lg:px-12 xl:px-16 py-10 md:py-16 lg:py-24">

          {/* Main Heading */}
          <h2 className="text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.05] uppercase">
            Have a Project?
          </h2>

          {/* Bottom Section */}
          <div className="mt-6 md:mt-8 lg:mt-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 md:gap-8 lg:gap-10">

            {/* Left Side - Button + Paragraph */}
            <div className="max-w-xl">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 bg-black text-white font-black text-xs md:text-sm uppercase tracking-widest rounded-full hover:bg-yellow-200 hover:text-black transition-all duration-300"
              >
                Hire Me
                <HiArrowUpRight size={16} />
              </Link>

              <p className="mt-4 md:mt-6 lg:mt-8 text-gray-600 text-[10px] md:text-xs lg:text-sm xl:text-base leading-relaxed">
                Whether you need intuitive UI/UX design, robust development,
                or a seamless blend of both, I'm here to help turn your ideas
                into impactful digital experiences.
              </p>
            </div>

            {/* Right Side - Large Text */}
            <div>
              <h3 className="text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.05] uppercase">
                Let's Talk
              </h3>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}