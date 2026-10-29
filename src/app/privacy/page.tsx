import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Uniscience (Unified Science Technology) collects, uses and protects personal information.",
};

const EMAIL = (
  <a href="mailto:info@uniscience.io">info@uniscience.io</a>
);

const SECTIONS: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    body: (
      <>
        <p>
          This Privacy Policy explains how Uniscience, Unified Science Technology
          (&ldquo;Uniscience&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) handles personal
          information when you visit our website or contact us about our services.
        </p>
        <p>
          We collect as little personal information as possible, use it only for the
          purposes described here, and never sell it.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: (
      <>
        <p>We collect the following categories of information:</p>
        <ul>
          <li>
            <strong>Information you send us.</strong> When you email us, we receive your
            name, email address, organisation and anything you choose to include in your
            message or attachments.
          </li>
          <li>
            <strong>Technical information.</strong> Like most websites, our hosting
            infrastructure automatically records basic request data such as IP address,
            browser type, pages requested and the date and time of the request.
          </li>
          <li>
            <strong>Project information.</strong> If we work together, we process the
            business contact details and project materials needed to deliver our services,
            as set out in the relevant agreement.
          </li>
        </ul>
        <p>
          This website has no account system or contact forms, and it does not use
          advertising or cross-site tracking cookies.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use information",
    body: (
      <ul>
        <li>To respond to your enquiries and provide the services you request.</li>
        <li>To prepare proposals, manage projects and administer our client relationships.</li>
        <li>To operate, secure and improve this website and diagnose technical problems.</li>
        <li>To comply with legal, accounting and regulatory obligations.</li>
      </ul>
    ),
  },
  {
    id: "legal-bases",
    title: "Legal bases for processing",
    body: (
      <p>
        Where data protection laws such as the GDPR apply, we process personal information
        on the basis of our legitimate interests in running our business and responding to
        enquiries, to take steps at your request before entering into a contract, to
        perform a contract with you, or to comply with a legal obligation. Where we rely on
        consent, you may withdraw it at any time.
      </p>
    ),
  },
  {
    id: "sharing",
    title: "How we share information",
    body: (
      <>
        <p>We share personal information only when necessary, with:</p>
        <ul>
          <li>
            Service providers who host our website, email and business systems on our
            behalf, under contractual confidentiality and data protection obligations.
          </li>
          <li>Professional advisers such as lawyers and accountants, where required.</li>
          <li>
            Authorities or other parties when required by law or to protect our rights,
            users or the public.
          </li>
        </ul>
        <p>We do not sell or rent personal information to anyone.</p>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "International transfers",
    body: (
      <p>
        Our team and service providers may be located in different countries. When personal
        information is transferred across borders, we take reasonable steps, such as
        standard contractual clauses, to ensure it remains protected to the standard
        described in this policy.
      </p>
    ),
  },
  {
    id: "retention",
    title: "Data retention",
    body: (
      <p>
        We keep personal information only for as long as needed for the purposes described
        above: for example, for the duration of an enquiry or engagement and any period
        required afterwards for legal, tax or accounting reasons. Server logs are retained
        for a limited period for security and troubleshooting.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        We use appropriate technical and organisational measures to protect personal
        information, including encryption in transit, access controls and least-privilege
        practices. No method of transmission or storage is completely secure, but we work
        hard to protect the information entrusted to us.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>Depending on where you live, you may have the right to:</p>
        <ul>
          <li>Access the personal information we hold about you.</li>
          <li>Ask us to correct or delete it.</li>
          <li>Object to or restrict certain processing.</li>
          <li>Receive a copy of your information in a portable format.</li>
          <li>Lodge a complaint with your local data protection authority.</li>
        </ul>
        <p>To exercise any of these rights, email us at {EMAIL}.</p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children's privacy",
    body: (
      <p>
        Our website and services are intended for businesses and professionals. We do not
        knowingly collect personal information from children.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. When we do, we will revise the
        &ldquo;Last updated&rdquo; date at the top of this page. Significant changes will be
        highlighted on this website.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: <p>If you have any questions about this Privacy Policy or our data practices, contact us at {EMAIL}.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      summary="We respect your privacy. This policy explains what information we collect, why we collect it, and the choices you have."
      updated="October 29, 2026"
      sections={SECTIONS}
    />
  );
}
