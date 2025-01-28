import PrivacyPolicyComp from "@/components/policy/PrivacyPolicy";
import TopBanner from "@/components/policy/TopBanner";
import React from "react";

export default function PrivacyPolicy() {
  const policyContent = [
    {
      title: "Introduction",
      description:
        "STEAM Institute is committed to protecting the privacy and security of our community’s personal information. This Privacy Policy outlines our practices regarding the collection, use, and safeguarding of your data.",
    },
    {
      title: "Information We Collect",
      description:
        "We collect personal identification information (names, dates of birth, ID numbers, contact details), academic information (enrollment details, grades, educational progress), and financial information (payment details, scholarship information, billing addresses).",
    },
    {
      title: "How We Collect Information",
      description:
        "Information is collected directly from you through registration forms, enrollment processes, and direct communications, as well as automatically through our website via cookies, log files, and web analytics services.",
    },
    {
      title: "Use of Information",
      description:
        "We use the information to provide and manage educational services, communicate important notices and updates, process billing and payments, improve our programs and services, and ensure legal compliance and policy enforcement.",
    },
    {
      title: "Sharing and Disclosure of Information",
      description:
        "We may share information with third parties with your consent, for external processing with service providers under confidentiality agreements, and for legal reasons when required by law or to protect the rights, property, or safety of STEAM Institute, our users, or the public.",
    },
    {
      title: "Data Security",
      description:
        "We implement physical, technical, and administrative measures to protect personal information from unauthorized access, disclosure, alteration, and destruction.",
    },
    {
      title: "Data Retention",
      description:
        "Personal information is retained for as long as necessary to provide the requested services and as required for record-keeping purposes.",
    },
    {
      title: "Your Rights",
      description:
        "You have the right to access and correct your personal information. Under certain circumstances, you may request the deletion of your information or opt-out of specific uses and disclosures.",
    },
    {
      title: "Cookies and Tracking Technologies",
      description:
        "We use cookies and tracking technologies on our website to enhance user experience and analyze site traffic.",
    },
    {
      title: "Changes to Our Privacy Policy",
      description:
        "Our Privacy Policy may change over time. We will communicate these changes through appropriate channels.",
    },
    {
      title: "Contact Us",
      description:
        "If you have any questions or concerns about privacy, please contact us at info@steaminstitute.online or call +27 82 766 8986.",
    },
  ];

  return (
    <div className="font-nunito">
      <TopBanner heading={"Privacy Policy"} />
      <PrivacyPolicyComp data={policyContent} />
    </div>
  );
}

// export async function getStaticPaths() {
//   const dataDir = path.join(process.cwd(), "src/data/courses");
//   const files = fs.readdirSync(dataDir);
//   const paths = files.map((filename) => ({
//     params: { slug: filename.replace(/\.json$/, "") },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const { slug } = params;
//   const dataFilePath = path.join(
//     process.cwd(),
//     "src/data/courses",
//     `${slug}.json`
//   );
//   const rawData = fs.readFileSync(dataFilePath, "utf-8");
//   const pageData = JSON.parse(rawData);
//   return {
//     props: {
//       pageData,
//     },
//   };
// }
