import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact — Aleem Talha | Get in Touch",
  description:
    "Get in touch with Aleem Talha for your design and development projects. Available for freelance work, consultations, and collaborations.",
  keywords: [
    "Contact Aleem Talha",
    "Hire Designer",
    "Hire Developer",
    "Contact Form",
    "Get in Touch",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact — Aleem Talha",
    description: "Get in touch with Aleem Talha for your design and development projects.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#5477CC]">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-[#5477CC]">
        <div className="flex items-center justify-between px-6 lg:px-10 xl:px-14 py-4 lg:py-5">
          <Link
            href="/"
            className="text-white font-bold text-lg lg:text-2xl xl:text-3xl tracking-wide hover:text-[#FDF94B] transition-colors duration-200"
          >
            ALEEM{" "}
            <span className="text-xs lg:text-sm font-extrabold">Talha</span>
          </Link>

          <span className="text-white/80 text-xs lg:text-sm font-bold uppercase tracking-widest">
            Contact
          </span>
        </div>
      </nav>

      {/* ── Contact Form Section ── */}
      <ContactForm />
    </div>
  );
}
