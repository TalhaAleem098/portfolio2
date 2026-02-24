import Image from "next/image";
import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import { FiArrowLeft } from "react-icons/fi";
import servicesData from "@/public/data/services.json";

export const metadata = {
  title: "Services — Aleem Talha | UI/UX Design & Full Stack Development",
  description:
    "Explore the full range of services offered by Aleem Talha — Web Design, App Design, Front-End Development, Back-End Development, and 360 Full-Stack Development. Get a free consultation today.",
  keywords: [
    "Aleem Talha Services",
    "Web Design Services",
    "App Design Services",
    "Full Stack Development",
    "React Development",
    "Next.js Development",
    "UI UX Design Services",
    "Freelance Developer Pakistan",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services — Aleem Talha",
    description:
      "Web Design, App Design, Front-End & Back-End Development, and 360 Full-Stack solutions by Aleem Talha.",
    url: "/services",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aleem Talha — Services",
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
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

          <span className="text-white/80 text-xs lg:text-sm font-bold uppercase tracking-widest">
            All Services
          </span>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="bg-[#5477CC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-14 pt-16 lg:pt-24 pb-16 lg:pb-20">
          <p className="text-[#FDF94B] text-xs font-black uppercase tracking-[0.3em] mb-4">
            What I Offer
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight uppercase mb-6">
            My Services
          </h1>
          <p className="text-white/80 text-sm lg:text-base leading-relaxed max-w-2xl font-medium">
            I offer a comprehensive range of design and development services to
            bring your digital vision to life. From concept to deployment, every
            project is handled with precision and creativity.
          </p>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-14 py-16 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, idx) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-lg mb-5">
                  <Image
                    src={service.image}
                    alt={`${service.title} — Aleem Talha`}
                    width={600}
                    height={450}
                    className="w-full aspect-4/3 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center rounded-lg">
                    <span className="opacity-0 group-hover:opacity-100 flex items-center gap-2 text-white font-bold py-2 px-6 border border-white rounded-full transition-opacity duration-300 text-sm uppercase tracking-widest">
                      View Details <HiArrowUpRight size={14} />
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-3xl font-black text-[#5477CC] leading-none shrink-0">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="text-lg xl:text-xl font-black uppercase tracking-tight mb-1 group-hover:text-[#5477CC] transition-colors duration-200">
                      {service.title}
                    </h2>
                    <p className="text-xs xl:text-sm font-medium text-gray-500 leading-relaxed">
                      {service.shortDescription.replace(/\n/g, " ")}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-4 flex gap-6 ml-12">
                  <div>
                    <span className="text-lg font-black text-[#5477CC]">
                      {service.stats.projectsCompleted}
                    </span>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Projects
                    </p>
                  </div>
                  <div>
                    <span className="text-lg font-black text-[#5477CC]">
                      {service.stats.clientSatisfaction}
                    </span>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Satisfaction
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#5477CC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-14 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div>
              <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] uppercase mb-6">
                Ready to Start
                <br />
                Your Project?
              </h2>
              <p className="text-white/75 text-sm lg:text-base font-medium leading-relaxed max-w-md">
                Let&apos;s discuss your project requirements and find the
                perfect service package for your needs.
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
