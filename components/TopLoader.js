/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * GitHub / YouTube-style top loading bar.
 * Shows a slim animated bar at the top of the viewport during route transitions.
 */

export default function TopLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const prevPathRef = useRef(pathname + searchParams.toString());

  const completeLoading = useCallback(() => {
    clearInterval(timerRef.current);
    setProgress(100);
    setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 300);
  }, []);

  const startLoading = useCallback(() => {
    setLoading(true);
    setProgress(0);

    // Animate progress in stages
    let p = 0;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      p += Math.random() * 12 + 3;
      if (p >= 90) {
        p = 90;
        clearInterval(timerRef.current);
      }
      setProgress(p);
    }, 150);
  }, []);

  // Detect route changes and complete the loading bar
  useEffect(() => {
    const currentPath = pathname + searchParams.toString();
    if (prevPathRef.current !== currentPath) {
      prevPathRef.current = currentPath;
      // Route changed — complete the loader if it was active
      if (loading) {
        completeLoading();
      }
    }
  }, [pathname, searchParams, loading, completeLoading]);

  // Intercept link clicks to detect navigation start
  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Skip external links, hash links, mailto, tel, and blank targets
      if (
        href.startsWith("http") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        anchor.target === "_blank"
      ) {
        return;
      }

      // Check if navigating to a different path
      const currentPath = pathname + searchParams.toString();
      if (href !== currentPath && href !== pathname) {
        startLoading();
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, [pathname, searchParams, startLoading]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  if (!loading && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-9999 pointer-events-none"
      style={{ height: "3px" }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #FDF94B, #e8e410, #FDF94B)",
          transition: progress === 100 ? "width 200ms ease-out, opacity 300ms ease 200ms" : "width 300ms ease",
          opacity: progress === 100 ? 0 : 1,
          borderRadius: "0 2px 2px 0",
          boxShadow: "0 0 8px rgba(253, 249, 75, 0.5), 0 0 4px rgba(253, 249, 75, 0.3)",
        }}
      />
    </div>
  );
}
