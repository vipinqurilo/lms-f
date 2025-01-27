import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaLocationArrow,
  FaMailBulk,
  FaPhone,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import FooterLogo from "./footer/FooterLogo";
import FooterLinks from "./footer/FooterLinks";

const Footer = () => {
  const contactDetails = [
    {
      Icon: FaPhone,
      title: "Phone Number :",
      value: "+1012 3456 789",
    },
    {
      Icon: FaMailBulk,
      title: "Email Address :",
      value: "demo@gmail.com",
    },
    {
      Icon: FaLocationArrow,
      title: "Office Location :",
      value: "132 Dartmouth Street Boston, Massachusetts 02156 United States",
    },
  ];

  const icons = [
    {
      id: 1,
      Icon: FaInstagram,
      link: "https://instagram.com",
      color: "bg-[#E1306C]",
    },
    {
      id: 2,
      Icon: FaLinkedinIn,
      link: "https://linkedin.com",
      color: "bg-[#0077B5]",
    },
    {
      id: 3,
      Icon: FaXTwitter,
      link: "https://twitter.com",
      color: "bg-[#1DA1F2]",
    },
    {
      id: 4,
      Icon: FaFacebookF,
      link: "https://facebook.com",
      color: "bg-[#1877F2]",
    },
  ];

  const footerLinks = [
    {
      title: "For Students",
      linksArray: [
        {
          name: "Admissions",
          link: "/admissions",
        },
        {
          name: "Courses",
          link: "/courses",
        },
        {
          name: "Student Portal",
          link: "/student-portal",
        },
        {
          name: "Financial Aid",
          link: "/financial-aid",
        },
        {
          name: "Campus Life",
          link: "/campus-life",
        },
        {
          name: "FAQs",
          link: "/faqs",
        },
      ],
    },
    {
      title: "For Instructors",
      linksArray: [
        {
          name: "Instructor Portal",
          link: "/instructor-portal",
        },
        {
          name: "Course Management",
          link: "/course-management",
        },
        {
          name: "Teaching Resources",
          link: "/teaching-resources",
        },
        {
          name: "Professional Development",
          link: "/professional-development",
        },
        {
          name: "Community Forums",
          link: "/community-forums",
        },
        {
          name: "Support",
          link: "/contact-us",
        },
      ],
    },
    {
      title: "Quick Links",
      linksArray: [
        {
          name: "About Us",
          link: "/about",
        },
        {
          name: "Contact Us",
          link: "/contact-us",
        },
        {
          name: "Privacy Policy",
          link: "/privacy-policy",
        },
        {
          name: "Terms of Service",
          link: "/terms-of-service",
        },
        {
          name: "Blog",
          link: "/blog",
        },
      ],
    },
  ];

  return (
    <footer className="bg-white text-light shadow border-t-0 border-black/10 font-nunito">
      <div className="text-start flex flex-col gap-5 lg:gap-0 lg:flex-row items-start justify-between custom-container">
        <FooterLogo icons={icons} />

        <div className="w-full lg:w-[70%] grid md:grid-cols-2 lg:grid-cols-4 lg:gap-1 gap-5">
          <FooterLinks data={footerLinks[0]} />
          <FooterLinks data={footerLinks[1]} />
          <FooterLinks data={footerLinks[2]} />

          <div className="w-full flex flex-col items-start gap-4">
            <h4 className="text-2xl text-black font-bold">News letter</h4>
            <div className="border py-2 border-black/10 px-1 pl-3 h-12 rounded flex items-center justify-between">
              <input
                type="text"
                placeholder="Enter Email Address"
                className="focus:outline-none bg-transparent w-[80%]"
              />
              <button className="h-full bg-secondary px-2 text-sm font-semibold rounded text-white hover:bg-black transition-custom">
                Send
              </button>
            </div>
            <div className="!w-full text-black space-y-4">
              {contactDetails?.map((data, index) => (
                <div className="flex items-start gap-4 w-full" key={index}>
                  <div className="bg-secondary/10 !w-10 !h-8 flex items-center justify-center rounded border border-black/10">
                    <data.Icon size={16} />
                  </div>
                  <div className="w-full">
                    <p className="text-sm">{data?.title}</p>
                    <p className="text-sm text-light">{data?.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="w-full bg-black/10 py-3 text-center">
        © 2025 STEAM Institute. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
