import { SITE } from "@/lib/site";

const SERVICES = [
  "AI & Machine Learning",
  "LLM Agents & Copilots",
  "Scientific Computing & HPC",
  "Data Platforms & Pipelines",
  "Cloud & DevOps",
  "Web & Mobile Products",
  "Lab & Device Integration",
  "Security & Compliance",
];

/** schema.org description of the company and website, for search engines. */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        alternateName: "Unified Science Technology",
        url: SITE.url,
        logo: {
          "@type": "ImageObject",
          url: `${SITE.url}/icon.png`,
          width: 512,
          height: 512,
        },
        image: `${SITE.url}/opengraph-image.jpg`,
        description: SITE.description,
        slogan: SITE.tagline,
        email: SITE.email,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: SITE.email,
          availableLanguage: ["English"],
        },
        knowsAbout: [
          "Artificial intelligence",
          "Machine learning",
          "Data engineering",
          "Cloud computing",
          "Scientific computing",
          "Bioinformatics",
          "Software engineering",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Engineering services",
          itemListElement: SERVICES.map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name, provider: { "@id": `${SITE.url}/#organization` } },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description: SITE.description,
        inLanguage: "en",
        publisher: { "@id": `${SITE.url}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON-LD must be emitted as raw JSON; the content is static and fully controlled here.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
