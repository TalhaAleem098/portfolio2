"use client";

import Image from "next/image";

export default function WorkProcess() {
  const steps = [
    {
      number: 1,
      title: "Research & Discovery",
      description: "Understand the project's goals, audience, and requirements",
      image: "/images/work_process/research.png",
    },
    {
      number: 2,
      title: "Ideation & Planning",
      description: "Outline the structure and flow of the product",
      image: "/images/work_process/planning.png",
    },
    {
      number: 3,
      title: "Design & Development",
      description:
        "Create visually appealing and functional interfaces & functional product.",
      image: "/images/work_process/design.png",
    },
    {
      number: 4,
      title: "Launch & Deliver",
      description:
        "Deliver the product to the end client, ensuring long-term success and adaptability.",
      image: "/images/work_process/launch.png",
    },
  ];

  return (
    <div className="px-1">
      <div className="bg-white px-1 lg:mx-5">
        <div className="py-8 md:py-12 lg:py-16 px-3 md:px-6 lg:px-12 xl:px-16 pt-10 md:pt-14 lg:pt-20">
          <h2 className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-black tracking-tight leading-[1.05] uppercase mb-6 md:mb-10 lg:mb-16">
            My Work Process
          </h2>

          <div className="flex flex-nowrap gap-4 md:gap-5 lg:gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none scrollbar-hide pb-4 lg:pb-0">
            {/* Card 1 - Normal position */}
            <div className="flex flex-col min-w-[60vw] md:min-w-[40vw] lg:min-w-0 lg:flex-1 snap-start">
              <div className="relative group overflow-hidden cursor-pointer mb-2 md:mb-3 lg:mb-4">
                <Image
                  src={steps[0].image}
                  alt={steps[0].title}
                  width={300}
                  height={450}
                  className="w-full aspect-3/4 object-cover transition-transform duration-500 group-hover:scale-105 rounded-lg"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </div>
              <div className="flex items-start gap-2 md:gap-3">
                <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-[#5477CC]">
                  {steps[0].number}.
                </span>
                <div>
                  <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-black uppercase tracking-tight mb-1 md:mb-2">
                    {steps[0].title}
                  </h3>
                  <p className="text-[10px] md:text-xs xl:text-sm font-medium text-gray-600 leading-relaxed">
                    {steps[0].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 - Shifted down */}
            <div className="flex flex-col lg:mt-20 min-w-[60vw] md:min-w-[40vw] lg:min-w-0 lg:flex-1 snap-start">
              <div className="relative group overflow-hidden cursor-pointer mb-2 md:mb-3 lg:mb-4">
                <Image
                  src={steps[1].image}
                  alt={steps[1].title}
                  width={300}
                  height={450}
                  className="w-full aspect-3/4 object-cover transition-transform duration-500 group-hover:scale-105 rounded-lg"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </div>
              <div className="flex items-start gap-2 md:gap-3">
                <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-[#5477CC]">
                  {steps[1].number}.
                </span>
                <div>
                  <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-black uppercase tracking-tight mb-1 md:mb-2">
                    {steps[1].title}
                  </h3>
                  <p className="text-[10px] md:text-xs xl:text-sm font-medium text-gray-600 leading-relaxed">
                    {steps[1].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 - Normal position */}
            <div className="flex flex-col min-w-[60vw] md:min-w-[40vw] lg:min-w-0 lg:flex-1 snap-start">
              <div className="relative group overflow-hidden cursor-pointer mb-2 md:mb-3 lg:mb-4">
                <Image
                  src={steps[2].image}
                  alt={steps[2].title}
                  width={300}
                  height={450}
                  className="w-full aspect-3/4 object-cover transition-transform duration-500 group-hover:scale-105 rounded-lg"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </div>
              <div className="flex items-start gap-2 md:gap-3">
                <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-[#5477CC]">
                  {steps[2].number}.
                </span>
                <div>
                  <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-black uppercase tracking-tight mb-1 md:mb-2">
                    {steps[2].title}
                  </h3>
                  <p className="text-[10px] md:text-xs xl:text-sm font-medium text-gray-600 leading-relaxed">
                    {steps[2].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 - Shifted down */}
            <div className="flex flex-col lg:mt-20 min-w-[60vw] md:min-w-[40vw] lg:min-w-0 lg:flex-1 snap-start">
              <div className="relative group overflow-hidden cursor-pointer mb-2 md:mb-3 lg:mb-4">
                <Image
                  src={steps[3].image}
                  alt={steps[3].title}
                  width={300}
                  height={450}
                  className="w-full aspect-3/4 object-cover transition-transform duration-500 group-hover:scale-105 rounded-lg"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </div>
              <div className="flex items-start gap-2 md:gap-3">
                <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-[#5477CC]">
                  {steps[3].number}.
                </span>
                <div>
                  <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-black uppercase tracking-tight mb-1 md:mb-2">
                    {steps[3].title}
                  </h3>
                  <p className="text-[10px] md:text-xs xl:text-sm font-medium text-gray-600 leading-relaxed">
                    {steps[3].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
