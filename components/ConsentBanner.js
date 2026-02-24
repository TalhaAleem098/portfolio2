/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsented = localStorage.getItem("consent-given");
    if (!hasConsented && typeof window !== "undefined") {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("consent-given", "true");
    
    // Update Google Consent Mode
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
      });
    }
    
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("consent-given", "false");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-linear-to-r from-slate-900 to-slate-800 border-t border-slate-700 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Row 1: Heading */}
        <h2 className="text-base font-bold text-white mb-3">
          🍪 Cookie Notice
        </h2>

        {/* Row 2: Content and Buttons in same row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left: Text Content */}
          <p className="text-sm text-slate-300 flex-1">
            We use analytics to understand how you use our site and improve your experience. Your privacy is important to us.
          </p>

          {/* Right: Buttons */}
          <div className="flex gap-3 shrink-0">
            <button
              onClick={handleReject}
              className="px-5 py-2 text-sm font-medium text-slate-300 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors duration-200"
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              className="px-5 py-2 text-sm text-slate-900 bg-yellow-400 hover:bg-yellow-300 rounded-lg transition-colors duration-200 font-semibold"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
