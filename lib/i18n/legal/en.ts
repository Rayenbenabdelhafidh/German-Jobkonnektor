import type { LegalDictionary } from "../types";

/**
 * Legal texts, English.
 *
 * NOTE FOR THE OPERATOR: structured placeholders, not legal advice. Have the
 * texts reviewed by a lawyer before launch and replace every "PLACEHOLDER"
 * marker. The Impressum is a German legal requirement; the English version is
 * a courtesy translation, and the German text remains binding.
 */

export const legalEn: LegalDictionary = {
  imprint: {
    title: "Legal Notice",
    intro:
      "Information pursuant to § 5 DDG (German Digital Services Act). The German text is the legally binding version; this translation is provided for convenience only.",
    sections: [
      {
        heading: "Service Provider",
        lines: [
          "German Jobkonnektor",
          "Owner: Mustapha Ben Belgacem",
          "Schneeheideanger 3",
          "80937 Munich",
          "Germany",
        ],
      },
      {
        heading: "Contact",
        contact: true,
      },
      {
        heading: "VAT Identification Number",
        paragraphs: [
          "VAT identification number pursuant to § 27a of the German VAT Act: PLACEHOLDER – please complete before publication.",
          "Tax number: PLACEHOLDER – please complete before publication.",
        ],
      },
      {
        heading: "Responsible for Content pursuant to § 18 para. 2 MStV",
        lines: [
          "Mustapha Ben Belgacem",
          "Schneeheideanger 3",
          "80937 Munich",
          "Germany",
        ],
      },
      {
        heading: "Licence and Supervisory Authority",
        paragraphs: [
          "Competent supervisory authority: PLACEHOLDER – please enter the authority responsible for the registered seat.",
          "If the recruitment activity requires a licence or registration, the corresponding details should be added here.",
        ],
      },
      {
        heading: "EU Dispute Resolution",
        paragraphs: [
          "The European Commission provides a platform for online dispute resolution. We are neither obliged nor willing to participate in dispute resolution proceedings before a consumer arbitration board.",
        ],
      },
      {
        heading: "Liability for Content",
        paragraphs: [
          "As a service provider, we are responsible for our own content on these pages under general law pursuant to § 7 para. 1 DDG. However, pursuant to §§ 8 to 10 DDG, we as a service provider are not obliged to monitor transmitted or stored third-party information, nor to investigate circumstances indicating unlawful activity.",
          "Obligations to remove or block the use of information under general law remain unaffected. However, liability in this regard is only possible from the point in time at which a specific infringement becomes known. Upon becoming aware of any such infringements, we will remove the content in question immediately.",
        ],
      },
      {
        heading: "Liability for Links",
        paragraphs: [
          "Our website contains links to external third-party websites over whose content we have no control. We can therefore accept no liability for this external content. The respective provider or operator of the linked pages is always responsible for their content.",
          "The linked pages were checked for possible legal violations at the time of linking. No unlawful content was identifiable at that time. Upon becoming aware of any infringements, we will remove such links immediately.",
        ],
      },
      {
        heading: "Copyright",
        paragraphs: [
          "The content and works created by the site operators on these pages are subject to German copyright law. Reproduction, editing, distribution and any form of exploitation beyond the limits of copyright law require the written consent of the respective author or creator.",
        ],
      },
    ],
  },

  privacy: {
    title: "Privacy Policy",
    updatedLabel: "Last updated",
    updated: "September 2026",
    intro:
      "Protecting your personal data matters to us. Below we explain what data we collect, for what purpose we process it, and what rights you have. This is based on the General Data Protection Regulation (GDPR) and the German Federal Data Protection Act (BDSG).",
    disclaimer:
      "Note: this text is a structured template. Please have it reviewed by a lawyer before publication and complete every field marked PLACEHOLDER.",
    sections: [
      {
        heading: "1. Data Controller",
        paragraphs: [
          "The controller responsible for data processing on this website is:",
        ],
        contact: true,
      },
      {
        heading: "2. Data Protection Officer",
        paragraphs: [
          "If there is an obligation to appoint one, you can reach our data protection officer at: PLACEHOLDER.",
        ],
      },
      {
        heading: "3. Data from the Contact Form",
        paragraphs: [
          "When you send us a message via the contact form, we process the data you provide (name, email address, phone number, subject and message text) in order to handle and respond to your enquiry.",
          "The legal basis is Art. 6(1)(b) GDPR (pre-contractual measures) or Art. 6(1)(f) GDPR (legitimate interest in responding to enquiries).",
          "This data is deleted once your enquiry has been fully resolved, provided no statutory retention periods apply.",
        ],
      },
      {
        heading: "4. Data from Staff Requests (Employers)",
        paragraphs: [
          "When you submit a staff request, we process the company name, contact person, contact details, industry, number of employees needed, desired start date and your message, in order to assess your staffing needs and provide you with a proposal.",
          "The legal basis is Art. 6(1)(b) GDPR. Your data is not shared with third parties without your explicit prior consent.",
        ],
      },
      {
        heading: "5. Candidate Data and Uploaded Documents",
        paragraphs: [
          "When you apply through our application form, we process your core data (first and last name, email address, phone/WhatsApp number, country of residence, nationality, German language level, desired industry) as well as the documents you upload.",
          "Depending on the industry, these documents include your CV, a copy of the main page of your passport, your vocational diplomas and certificates, and — for applications in the transport and logistics sector — your foreign driving licence (front and back), your driver card or tachograph card, and proof of your commercial driving experience.",
          "Some of this information may relate to special categories of personal data within the meaning of Art. 9 GDPR. Processing is therefore based exclusively on your explicit consent under Art. 6(1)(a) and Art. 9(2)(a) GDPR, which you give by checking the corresponding box in the application form.",
          "The purpose of processing is to arrange employment in Germany. This includes passing on your data and documents to specific potential employers and, where necessary, to authorities as part of the visa and recognition procedures.",
          "You may withdraw your consent at any time with future effect. This does not affect the lawfulness of processing carried out prior to withdrawal. An informal email to the address given above is sufficient to withdraw consent.",
          "Retention period: we store application documents for the duration of the placement process and thereafter for a maximum of 24 months, unless you have expressly agreed to a longer retention period. The data and documents are deleted after this period.",
        ],
      },
      {
        heading: "6. Security of Uploaded Documents",
        paragraphs: [
          "Uploaded documents are encrypted and stored in storage that is not publicly accessible. Access is limited to authorised staff after login; retrieval takes place via short-lived, signed links. At no point are the documents accessible via a public address.",
          "Data transmitted on this website is fully encrypted via HTTPS (TLS).",
        ],
      },
      {
        heading: "7. Cookies and Consent Management",
        paragraphs: [
          "We use technically necessary cookies or comparable storage technologies to remember your language choice and your cookie decision. The legal basis is § 25(2) TDDDG in conjunction with Art. 6(1)(f) GDPR.",
          "All non-necessary content — in particular the embedded map on the Contact page — is only loaded after your explicit consent. The legal basis is § 25(1) TDDDG in conjunction with Art. 6(1)(a) GDPR.",
          "You can change or withdraw your consent at any time via the \"Cookie Settings\" link in the website footer.",
          "No tracking or web analytics takes place on this website.",
        ],
      },
      {
        heading: "8. Google Maps",
        paragraphs: [
          "On the Contact page, we embed a map from the Google Maps service. The provider is Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland.",
          "The map is only loaded after your active consent. Only then is a connection established to Google's servers, transmitting your IP address and potentially other data to Google. A transfer to third countries cannot be ruled out.",
          "For more information, please refer to Google's privacy policy.",
        ],
      },
      {
        heading: "9. Server Log Files",
        paragraphs: [
          "The hosting provider of this website automatically collects and stores information in what are known as server log files, which your browser transmits: browser type and version, operating system used, referrer URL, hostname of the accessing device, time of the server request, and IP address.",
          "This data is not combined with other data sources. The legal basis is Art. 6(1)(f) GDPR (legitimate interest in technically error-free and secure operation).",
          "Hosting provider: PLACEHOLDER – please complete before publication. A data processing agreement pursuant to Art. 28 GDPR is in place with the provider.",
        ],
      },
      {
        heading: "10. Recipients and Processors",
        paragraphs: [
          "Your data is only shared to the extent necessary to fulfil the placement purpose, where you have consented, or where a legal obligation exists.",
          "Possible recipients include potential employers in Germany, German diplomatic missions abroad and immigration authorities, relevant recognition bodies, and our technical service providers for hosting and document storage.",
          "Contracts pursuant to Art. 28 GDPR are in place with all processors.",
        ],
      },
      {
        heading: "11. Your Rights",
        paragraphs: ["As a data subject, you have the following rights:"],
        list: [
          "Right of access to data stored about you (Art. 15 GDPR)",
          "Right to rectification of inaccurate data (Art. 16 GDPR)",
          "Right to erasure of your data (Art. 17 GDPR)",
          "Right to restriction of processing (Art. 18 GDPR)",
          "Right to data portability (Art. 20 GDPR)",
          "Right to object to processing (Art. 21 GDPR)",
          "Right to withdraw a given consent with future effect (Art. 7(3) GDPR)",
        ],
        after: [
          "To exercise your rights, an informal message to the email address given above is sufficient.",
          "Independently of this, you have the right to lodge a complaint with a data protection supervisory authority (Art. 77 GDPR). This is generally the authority of your habitual residence or of the controller's registered seat. For our registered seat, the competent authority is the Bavarian State Office for Data Protection Supervision.",
        ],
      },
      {
        heading: "12. Changes to This Privacy Policy",
        paragraphs: [
          "We update this privacy policy whenever changes to our services or the legal situation require it. The version published on this page always applies.",
        ],
      },
    ],
  },
};
