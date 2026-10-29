import type { Metadata } from "next";
import { COVER } from "@/lib/site";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of the Uniscience (Unified Science Technology) website.",
  alternates: { canonical: "/terms" },
  openGraph: { type: "article", url: "/terms", title: "Terms of Service | Uniscience", images: [COVER] },
  twitter: { card: "summary_large_image", title: "Terms of Service | Uniscience", images: [COVER] },
};

const EMAIL = <a href="mailto:info@uniscience.io">info@uniscience.io</a>;

const SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of these terms",
    body: (
      <>
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the
          website operated by Uniscience, Unified Science Technology (&ldquo;Uniscience&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;). By using this website, you agree to these Terms.
          If you do not agree, please do not use the website.
        </p>
        <p>
          Engineering, consulting and software services are provided under a separate written
          agreement. If that agreement conflicts with these Terms, the agreement takes
          precedence for those services.
        </p>
      </>
    ),
  },
  {
    id: "use-of-website",
    title: "Use of the website",
    body: (
      <>
        <p>You agree to use this website lawfully and responsibly. You must not:</p>
        <ul>
          <li>Attempt to gain unauthorised access to the website or its underlying systems.</li>
          <li>Interfere with or disrupt the website, including through malware or excessive automated requests.</li>
          <li>Use the website to infringe the rights of others or to send unsolicited communications.</li>
          <li>Copy, scrape or republish substantial parts of the website without our written permission.</li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: (
      <p>
        The Uniscience name, logo, website design, text and graphics are owned by or licensed
        to Uniscience and are protected by intellectual property laws. Third-party
        photography is used under its respective licence. Nothing in these Terms grants you
        a right to use our trademarks or content without prior written consent.
      </p>
    ),
  },
  {
    id: "information",
    title: "Information on this website",
    body: (
      <p>
        Content on this website is provided for general information about our company and
        services. It does not constitute a binding offer or professional advice. We work to
        keep it accurate and current but make no guarantee that it is complete or free of
        errors, and we may change it at any time without notice.
      </p>
    ),
  },
  {
    id: "communications",
    title: "Enquiries and communications",
    body: (
      <p>
        When you contact us, please do not send confidential or proprietary information until
        an appropriate confidentiality agreement is in place. Information you send is handled
        in line with our <Link href="/privacy">Privacy Policy</Link>.
      </p>
    ),
  },
  {
    id: "third-party-links",
    title: "Third-party links",
    body: (
      <p>
        This website may link to third-party websites. We do not control and are not
        responsible for their content, policies or practices. Visiting them is at your own
        risk.
      </p>
    ),
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    body: (
      <p>
        The website is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. To the
        fullest extent permitted by law, we disclaim all warranties, express or implied,
        including warranties of merchantability, fitness for a particular purpose and
        non-infringement. We do not warrant that the website will be uninterrupted, secure or
        error-free.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <p>
        To the fullest extent permitted by law, Uniscience will not be liable for any
        indirect, incidental, special, consequential or punitive damages, or any loss of
        profits, data or goodwill, arising from your use of or inability to use this website.
        Nothing in these Terms excludes liability that cannot be excluded under applicable
        law.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these Terms from time to time. The &ldquo;Last updated&rdquo; date at
        the top of this page shows when they were last revised. Continued use of the website
        after changes take effect means you accept the updated Terms.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    body: (
      <p>
        These Terms are governed by the laws of the jurisdiction in which Uniscience is
        established, without regard to conflict-of-law principles. Any dispute will be
        subject to the exclusive jurisdiction of the competent courts of that jurisdiction,
        unless applicable law provides otherwise.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: <p>Questions about these Terms? Contact us at {EMAIL}.</p>,
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      summary="Please read these terms carefully. They set out the rules for using the Uniscience website."
      updated="October 29, 2026"
      sections={SECTIONS}
    />
  );
}
