"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#5477CC] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Background decorative text */}
      <span
        className="absolute text-[20vw] font-black text-white/3 leading-none select-none pointer-events-none"
        aria-hidden="true"
      >
        ERROR
      </span>

      {/* Content */}
      <div className="relative z-10 max-w-lg">
        {/* Label */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-8 h-0.75 bg-red-400 rounded-full" />
          <span className="text-red-400 text-xs font-black uppercase tracking-[0.3em]">
            Something Went Wrong
          </span>
          <div className="w-8 h-0.75bg-red-400 rounded-full" />
        </div>

        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-white/20 flex items-center justify-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase mb-4">
          Oops!
        </h1>

        {/* Message */}
        <p className="text-white/70 text-sm md:text-base font-medium leading-relaxed mb-10 max-w-sm mx-auto">
          An unexpected error occurred. Don&apos;t worry — you can try again or
          head back to the home page.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="px-8 py-4 bg-[#FDF94B] text-black font-black text-sm uppercase tracking-widest rounded-full hover:bg-[#e8e410] transition-colors duration-300 cursor-pointer"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-8 py-4 border-2 border-white/30 text-white font-bold text-sm uppercase tracking-widest rounded-full hover:bg-white/10 transition-colors duration-300"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
