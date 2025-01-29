import CommonHeading from "@/components/common/CommonHeading";
import FAQContainer from "@/container/faq/FAQContainer";
import React from "react";

export default function FaqPage() {
  const data = {
    heading: {
      page: "FAQ",
      headings: ["Questions? We have answers!!"],
    },
    faqs: [
      {
        categoryName: "General Queries",
        faqs: [
          {
            question: "What is your company's mission?",
            answer:
              "To provide innovative and user-friendly e-commerce solutions.",
          },
          {
            question: "Do you offer any support?",
            answer: [
              "Yes, we offer 24/7 customer support via email and chat.",
              "You can also find helpful resources in our documentation and knowledge base.",
            ],
          },
          {
            question: "What are your business hours?",
            answer:
              "We are available Monday to Friday from 9:00 AM to 5:00 PM.",
          },
          {
            question: "How can I contact you?",
            answer:
              "You can contact us via email at sales@fatbit.com or by phone at +1 469 844 3346.",
          },
        ],
      },
      {
        categoryName: "Application/requirements",
        faqs: [
          {
            question:
              "What are the system requirements for using your platform?",
            answer:
              "You'll need a modern web browser and a stable internet connection.",
          },
          {
            question: "Do I need any technical skills to use your platform?",
            answer: [
              "No, our platform is designed to be user-friendly and intuitive.",
              "We also provide comprehensive training resources and support.",
            ],
          },
          {
            question: "What are the pricing plans for your platform?",
            answer:
              "We offer a variety of pricing plans to suit different needs and budgets.",
          },
          {
            question: "Is there a free trial available?",
            answer:
              "Yes, we offer a free trial for you to experience our platform before committing.",
          },
        ],
      },
      {
        categoryName: "Apply to teach",
        faqs: [
          {
            question: "How do I apply to become a teacher on your platform?",
            answer:
              "Please visit our teacher application page and submit the required information.",
          },
          {
            question: "What are the requirements for becoming a teacher?",
            answer: [
              "You must have expertise in your chosen subject area.",
              "You should be passionate about teaching and have excellent communication skills.",
            ],
          },
          {
            question: "What are the benefits of teaching on your platform?",
            answer: [
              "Flexible work schedule.",
              "Opportunity to reach a global audience.",
              "Competitive earnings potential.",
            ],
          },
          {
            question: "How will I be paid for my teaching services?",
            answer:
              "We offer various payment options, including direct deposit and PayPal.",
          },
        ],
      },
    ],
  };

  return (
    <div className="w-full font-nunito py-10 custom-margin-top">
      <CommonHeading data={data?.heading} />
      <FAQContainer data={data?.faqs} />
    </div>
  );
}
