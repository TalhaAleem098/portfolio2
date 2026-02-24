import Link from "next/link";

export const metadata = {
  title: "404 — Page Not Found",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#5477CC] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Background decorative text */}
      <span
        className="absolute text-[28vw] font-black text-white/3 leading-none select-none pointer-events-none"
        aria-hidden="true"
      >
        404
      </span>

      {/* Content */}
      <div className="relative z-10 max-w-lg">
        {/* Label */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-8 h-0.75 bg-[#FDF94B] rounded-full" />
          <span className="text-[#FDF94B] text-xs font-black uppercase tracking-[0.3em]">
            Page Not Found
          </span>
          <div className="w-8 h-0.75 bg-[#FDF94B] rounded-full" />
        </div>

        {/* 404 */}
        <h1 className="text-[8rem] md:text-[10rem] font-black text-white leading-none tracking-tight mb-2">
          404
        </h1>

        {/* Message */}
        <p className="text-white/70 text-sm md:text-base font-medium leading-relaxed mb-10 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-4 bg-[#FDF94B] text-black font-black text-sm uppercase tracking-widest rounded-full hover:bg-[#e8e410] transition-colors duration-300"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 border-2 border-white/30 text-white font-bold text-sm uppercase tracking-widest rounded-full hover:bg-white/10 transition-colors duration-300"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  );
}
