export default function Loading() {
  return (
    <div className="min-h-screen bg-[#5477CC] flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        {/* Animated logo / spinner */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-16 h-16 rounded-full border-[3px] border-white/10 border-t-[#FDF94B] animate-spin" />
          {/* Inner dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#FDF94B] animate-pulse" />
          </div>
        </div>

        {/* Brand text */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-white font-bold text-lg tracking-wide">
            ALEEM <span className="text-xs font-extrabold">Talha</span>
          </span>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-white/40 animate-pulse" style={{ animationDelay: "0ms" }} />
            <div className="w-1 h-1 rounded-full bg-white/40 animate-pulse" style={{ animationDelay: "150ms" }} />
            <div className="w-1 h-1 rounded-full bg-white/40 animate-pulse" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
