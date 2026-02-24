import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import TopLoader from "@/components/TopLoader";
import { SITE_URL } from "@/lib/constants";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import ConsentBanner from "@/components/ConsentBanner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aleem Talha — UI/UX Designer & Full Stack Developer",
    template: "%s | Aleem Talha",
  },
  description:
    "Aleem Talha is a passionate UI/UX designer and full-stack developer from Pakistan. Specializing in web design, app design, React, Next.js, and end-to-end product development. 2.5+ years of experience delivering pixel-perfect digital experiences.",
  keywords: [
    "Aleem Talha",
    "Talha Aleem",
    "UI UX Designer",
    "Full Stack Developer",
    "Web Designer Pakistan",
    "React Developer",
    "Next.js Developer",
    "Frontend Developer",
    "Portfolio",
    "Freelance Developer Pakistan",
    "Web Development",
    "App Design",
    "GSAP Animations",
    "Tailwind CSS",
  ],
  authors: [{ name: "Aleem Talha", url: SITE_URL }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Aleem Talha — Portfolio",
    title: "Aleem Talha — UI/UX Designer & Full Stack Developer",
    description:
      "Crafting seamless digital experiences through intuitive design and robust development. View my portfolio of 15+ projects.",
    images: [
      {
        url: `${SITE_URL}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Aleem Talha — Portfolio OG Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aleem Talha — UI/UX Designer & Full Stack Developer",
    description:
      "Crafting seamless digital experiences through intuitive design and robust development.",
    creator: "@aleemtalha",
    images: [`${SITE_URL}/images/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-placeholder",
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "technology",
};

export default function RootLayout({ children }) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aleem Talha",
    alternateName: "Talha Aleem",
    jobTitle: "UI/UX Designer & Full Stack Developer",
    description:
      "Passionate UI/UX designer and full-stack developer with 2.5+ years of experience crafting seamless digital experiences.",
    url: SITE_URL,
    image: `${SITE_URL}/images/aleem.png`,
    email: "aleemtalha098@gmail.com",
    telephone: "+923270445135",
    sameAs: [
      "https://github.com/AleemTalha",
      "https://www.linkedin.com/in/talha-aleem-a275a72a6/",
      "https://www.instagram.com/aleemtalha_dev/",
    ],
    knowsAbout: [
      "UI/UX Design",
      "Web Design",
      "App Design",
      "React",
      "Next.js",
      "Node.js",
      "Full Stack Development",
      "Tailwind CSS",
      "GSAP",
      "Figma",
      "MongoDB",
      "PostgreSQL",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Aleem Talha — Portfolio",
    url: SITE_URL,
    description:
      "Personal portfolio of Aleem Talha — UI/UX Designer & Full Stack Developer",
    author: { "@type": "Person", name: "Aleem Talha" },
  };

  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Aleem Dev" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* JSON-LD structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />

        {/* Google Consent Mode - Must load BEFORE Google Analytics */}
        <Script
          id="gtag-consent"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              // Set default consent based on user region and stored preferences
              const analyticsConsent = localStorage.getItem('analytics-consent') || 'denied';
              const adConsent = localStorage.getItem('ad-consent') || 'denied';
              
              gtag('consent', 'default', {
                'ad_storage': adConsent,
                'ad_user_data': adConsent,
                'ad_personalization': adConsent,
                'analytics_storage': analyticsConsent,
                'wait_for_update': 500
              });
              
              gtag('set', {'anonymize_ip': true});
            `,
          }}
        />

        {/* Google Analytics - Only loads if GA ID is configured */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script
              id="google-analytics-config"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                    anonymize_ip: true,
                    allow_google_signals: false,
                    allow_ad_personalization_signals: false
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <TopLoader />
          <Analytics />
        </Suspense>

        {children}

        {/* Consent Banner Component */}
        <ConsentBanner />
      </body>
    </html>
  );
}