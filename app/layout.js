import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://aleemtalha.vercel.app";

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
  creator: "Aleem Talha",
  publisher: "Aleem Talha",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aleem Talha — UI/UX Designer & Full Stack Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aleem Talha — UI/UX Designer & Full Stack Developer",
    description:
      "Crafting seamless digital experiences through intuitive design and robust development.",
    images: ["/og-image.png"],
    creator: "@aleemtalha",
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

export const viewport = {
  themeColor: "#5477CC",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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
    author: {
      "@type": "Person",
      name: "Aleem Talha",
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
