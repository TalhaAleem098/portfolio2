"use client";

import { useEffect, useState } from "react";

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: false,
    ads: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsented = localStorage.getItem("consent-banner-shown");
    const analyticsConsent = localStorage.getItem("analytics-consent");
    const adConsent = localStorage.getItem("ad-consent");

    if (!hasConsented) {
      setIsVisible(true);
    } else if (analyticsConsent || adConsent) {
      setPreferences({
        analytics: analyticsConsent === "granted",
        ads: adConsent === "granted",
      });
    }
  }, []);

  const handleAcceptAll = () => {
    updateConsent({ analytics: true, ads: true });
  };

  const handleRejectAll = () => {
    updateConsent({ analytics: false, ads: false });
  };

  const handleSavePreferences = () => {
    updateConsent(preferences);
  };

  const updateConsent = (prefs) => {
    // Save to localStorage
    localStorage.setItem("analytics-consent", prefs.analytics ? "granted" : "denied");
    localStorage.setItem("ad-consent", prefs.ads ? "granted" : "denied");
    localStorage.setItem("consent-banner-shown", "true");

    // Update gtag consent
    if (typeof window.gtag !== "undefined") {
      window.gtag("consent", "update", {
        analytics_storage: prefs.analytics ? "granted" : "denied",
        ad_storage: prefs.ads ? "granted" : "denied",
        ad_user_data: prefs.ads ? "granted" : "denied",
        ad_personalization: prefs.ads ? "granted" : "denied",
      });
    }

    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 to-slate-800 border-t border-slate-700 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-white mb-2">Privacy & Cookie Preferences</h2>
          <p className="text-sm text-slate-300">
            We use cookies and analytics to enhance your experience, understand how you use our site, and improve our services. You can choose what data we collect.
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Analytics Option */}
          <div className="flex items-start gap-3 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
            <input
              type="checkbox"
              id="analytics"
              checked={preferences.analytics}
              onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
              className="mt-1 w-4 h-4 cursor-pointer accent-yellow-400"
            />
            <div className="flex-1">
              <label htmlFor="analytics" className="text-sm font-semibold text-white cursor-pointer">
                Analytics
              </label>
              <p className="text-xs text-slate-400 mt-1">
                Help us understand how you use our site to improve your experience.
              </p>
            </div>
          </div>

          {/* Ads Option */}
          <div className="flex items-start gap-3 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
            <input
              type="checkbox"
              id="ads"
              checked={preferences.ads}
              onChange={(e) => setPreferences({ ...preferences, ads: e.target.checked })}
              className="mt-1 w-4 h-4 cursor-pointer accent-yellow-400"
            />
            <div className="flex-1">
              <label htmlFor="ads" className="text-sm font-semibold text-white cursor-pointer">
                Personalized Ads
              </label>
              <p className="text-xs text-slate-400 mt-1">
                Show you personalized ads based on your interests and behavior.
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={handleRejectAll}
            className="px-6 py-2 text-sm font-medium text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors duration-200"
          >
            Reject All
          </button>
          <button
            onClick={handleSavePreferences}
            className="px-6 py-2 text-sm font-medium text-slate-900 bg-slate-300 hover:bg-slate-200 rounded-lg transition-colors duration-200"
          >
            Save Preferences
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-6 py-2 text-sm font-medium text-slate-900 bg-yellow-400 hover:bg-yellow-300 rounded-lg transition-colors duration-200 font-bold"
          >
            Accept All
          </button>
        </div>

        {/* Privacy Link */}
        <div className="mt-4 text-center">
          <a
            href="/privacy" // Add your privacy policy page
            className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
          >
            Read our Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}
