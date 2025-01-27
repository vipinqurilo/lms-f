import CommonHeading from "@/components/common/CommonHeading";
import ContactusContainer from "@/container/contact-us/ContactusContainer";
import React from "react";

export default function index() {
  return (
    <div
      className="custom-container font-nunito space-y-10 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url("/assets/about/bgImage.svg")`,
      }}
    >
      <CommonHeading
        data={{
          page: "Contact Us",
          headings: ["Get in Touch with Us Anytime, Anywhere."],
        }}
      />
      <ContactusContainer />
    </div>
  );
}
