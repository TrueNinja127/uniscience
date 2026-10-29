/** Single source of truth for site-wide identity, used by metadata, sitemap and structured data. */
export const SITE = {
  url: "https://uniscience.io",
  name: "Uniscience",
  legalName: "Uniscience | Unified Science Technology",
  tagline: "Complex science. Engineered into software.",
  title: "Uniscience | AI, Data and Cloud Engineering for Science",
  description:
    "Uniscience builds AI, data and cloud platforms for research-driven companies. Designed by scientists, built by engineers, from first prototype to global scale.",
  email: "info@uniscience.io",
  locale: "en_US",
  themeColor: "#050806",
} as const;

/** Social preview image (served from src/app/opengraph-image.jpg). */
export const COVER = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "Uniscience: Complex science. Engineered into software.",
};
