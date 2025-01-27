import PrivacyPolicyComp from "@/components/policy/PrivacyPolicy";
import TopBanner from "@/components/policy/TopBanner";
import React from "react";

export default function TermsOfService() {
  const termsData = [
    {
      title: "Introduction",
      description:
        "Welcome to STEAM Institute! By registering as a student or participating in any of our programs, you agree to be bound by these Terms of Service ('Terms'). Please read these Terms carefully before using our services.",
    },
    {
      title: "Eligibility",
      description:
        "The services offered by STEAM Institute are available to students who meet the academic and age criteria for each program. Guardians must consent to these Terms on behalf of minors where applicable.",
    },
    {
      title: "Registration and Account Integrity",
      description:
        "Users must provide accurate, current, and complete information during the registration process and are responsible for maintaining the confidentiality of account information, including passwords.",
    },
    {
      title: "Program Fees and Payments",
      description:
        "Detailed information on program fees, payment schedules, and acceptable methods of payment. Policy on late payments, including any applicable fees or consequences.",
    },
    {
      title: "Refund and Cancellation Policy",
      description:
        "Conditions under which refunds for program fees are available. Procedures and timelines for program cancellation by either party.",
    },
    {
      title: "Academic Integrity",
      description:
        "Expectations of honesty and integrity in all academic endeavors. Consequences of academic dishonesty, including plagiarism and cheating.",
    },
    {
      title: "Conduct and Behavior",
      description:
        "Code of conduct for students, including respect for peers, faculty, and Institute property. Disciplinary actions for conduct violations.",
    },
    {
      title: "Privacy Policy",
      description:
        "How personal information is collected, used, and protected. (Refer to a separate, detailed Privacy Policy document.) Consent to use of data for educational purposes.",
    },
    {
      title: "Intellectual Property",
      description:
        "Ownership of materials provided by STEAM Institute, including coursework, and use of student-created content. Prohibitions against unauthorized reproduction or distribution of Institute materials.",
    },
    {
      title: "Dispute Resolution",
      description:
        "Process for addressing grievances and disputes between students (or their guardians) and the Institute. Any binding arbitration agreements or waiver of jury trials.",
    },
    {
      title: "Amendments to Terms",
      description:
        "Procedure for making changes to the Terms, including notice to users.",
    },
    {
      title: "Contact Information",
      description:
        "How to contact STEAM Institute for questions regarding the Terms.",
    },
    {
      title: "Acknowledgment and Acceptance of Terms",
      description:
        "Statement indicating that by using STEAM Institute’s services, the user agrees to be bound by the current version of these Terms.",
    },
  ];

  return (
    <div className="font-nunito">
      <TopBanner heading={"Terms of Service"} />
      <PrivacyPolicyComp data={termsData} />
    </div>
  );
}
