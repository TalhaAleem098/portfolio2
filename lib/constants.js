/**
 * Central site configuration.
 * All URLs and contact info are configured via environment variables
 * for easy customization across different domains and deployments.
 */

// Strip trailing slashes from SITE_URL for consistency
const getSiteUrl = () => {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://aleemtalha.vercel.app");
  return url.endsWith("/") ? url.slice(0, -1) : url;
};

const SITE_URL = getSiteUrl();

// Contact Information (configurable via env)
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "aleemtalha098@gmail.com";
const OWNER_NAME = process.env.NEXT_PUBLIC_OWNER_NAME || "Aleem Talha";

// Social Media Links (configurable via env)
const SOCIAL_LINKS = {
  github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/AleemTalha",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/talha-aleem-a275a72a6/",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/aleemtalha_dev/",
};

// SEO and Meta Configuration
const SEO_CONFIG = {
  siteUrl: SITE_URL,
  siteName: OWNER_NAME,
  description: "UI/UX Designer & Full Stack Developer",
  twitterHandle: "@aleemtalha_dev",
  locale: "en_US",
};

export { SITE_URL, CONTACT_EMAIL, OWNER_NAME, SOCIAL_LINKS, SEO_CONFIG };
