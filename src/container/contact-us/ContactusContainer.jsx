import ContactusForm from "@/components/contact-us/ContactusForm";
import { BiSolidMessageAltDetail, BiSolidPhoneCall } from "react-icons/bi";
import { MdLocationPin } from "react-icons/md";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import GetInTouch from "@/components/contact-us/GetInTouch";

export default function ContactusContainer() {
  const data = [
    {
      icon: <BiSolidPhoneCall />,
      value: "+1012 3456 789",
    },
    {
      icon: <BiSolidMessageAltDetail />,
      value: "demo@gmail.com",
    },
    {
      icon: <MdLocationPin />,
      value: "132 Dartmouth Street Boston, Massachusetts 02156 United States",
    },
  ];

  const imageArray = [
    {
      src: "/assets/contact-us/facebook-f.png",
      link: "/",
    },
    {
      src: "/assets/contact-us/instagram.png",
      link: "/",
    },
    {
      src: "/assets/contact-us/x-twitter.png",
      link: "/",
    },
    {
      src: "/assets/contact-us/linkedin-in.png",
      link: "/",
    },
  ];

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-y-12 md:gap-x-12">
      <GetInTouch data={data} imageArray={imageArray} />

      <ContactusForm />
    </div>
  );
}
