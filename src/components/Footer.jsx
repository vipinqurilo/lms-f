import React, { useState, useEffect } from "react";
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
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getFrontendSettings } from "@/store/slices/admin-dashboard/settingSlice";

const Footer = () => {
  const dispatch = useDispatch();
  const [date, setdate] = useState(new Date());
  const frontendSettings = useSelector((state) => state.admin.settings?.frontendSettings || {});
  const loading = useSelector((state) => state.admin.settings?.isLoading?.getFrontendSettings);

  useEffect(() => {
    dispatch(getFrontendSettings());
  }, [dispatch]);

  const contactDetails = [
    {
      Icon: FaLocationArrow,
      title: "Office Location :",
      value: frontendSettings?.contactDetails?.[0]?.value || "Loading...",
      image: "/assets/contact-us/location.svg",
    },
    {
      Icon: FaMailBulk,
      title: "Email Address :",
      value: frontendSettings?.contactDetails?.[1]?.value || "Loading...",
      image: "/assets/contact-us/email.svg",
    },
    {
      Icon: FaPhone,
      title: "Phone Number :",
      value: frontendSettings?.contactDetails?.[2]?.value || "Loading...",
      image: "/assets/contact-us/phone.svg",
    },
  ];

  const icons = [
    {
      id: 1,
      Icon: FaInstagram,
      link: frontendSettings?.socialLinks?.[3]?.link || "https://instagram.com",
      color: "bg-[#E1306C]",
    },
    {
      id: 2,
      Icon: FaLinkedinIn,
      link: frontendSettings?.socialLinks?.[2]?.link || "https://linkedin.com",
      color: "bg-[#0077B5]",
    },
    {
      id: 3,
      Icon: FaXTwitter,
      link: frontendSettings?.socialLinks?.[1]?.link || "https://twitter.com",
      color: "bg-[#1DA1F2]",
    },
    {
      id: 4,
      Icon: FaFacebookF,
      link: frontendSettings?.socialLinks?.[0]?.link || "https://facebook.com",
      color: "bg-[#1877F2]",
    },
  ];

  const footerLinks = [
    {
      title: "For Students",
      linksArray: [
        {
          name: "Courses",
          link: "/courses",
        },
        {
          name: "Student Portal",
          link: "/student-portal",
        },
        {
          name: "Tutors",
          link: "/tutors",
        },
        {
          name: "Financial Aid",
          link: "/financial-aid",
        },
        {
          name: "FAQs",
          link: "/faq",
        },
      ],
    },
    {
      title: "For Instructors",
      linksArray: [
        {
          name: "Instructor Portal",
          link: "/instructor-dashboard",
        },
        {
          name: "Course Management",
          link: "/instructor-dashboard/my-courses",
        },
        {
          name: "Bookings Management",
          link: "/instructor-dashboard/bookings",
        },
        {
          name: "Support",
          link: "/contactus",
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
          link: "/contactus",
        },
        {
          name: "Privacy Policy",
          link: "/privacy-policy",
        },
        {
          name: "Terms of Service",
          link: "/terms-of-service",
        },
      ],
    },
  ];

  return (
    <footer className="bg-white text-light shadow border-t-0 border-black/10 font-nunito">
      <div className="text-start flex flex-col gap-5 lg:gap-0 lg:flex-row items-start justify-between custom-container !py-10">
        <FooterLogo 
          icons={icons} 
          logo={frontendSettings?.logo || '/assets/common/logo.png'}
          description={frontendSettings?.description || 'Loading...'}
        />

        <div className="w-full lg:w-[70%] grid md:grid-cols-2 lg:grid-cols-4 lg:gap-1 gap-5">
          <FooterLinks data={footerLinks[0]} />
          <FooterLinks data={footerLinks[1]} />
          <FooterLinks data={footerLinks[2]} />

          <div className="w-full flex flex-col items-start gap-4">
            <h4 className="text-2xl text-black font-bold">News letter</h4>
            <div className="border border-black/10 pl-3 h-12 rounded-lg flex items-center justify-between">
              <input
                type="text"
                placeholder="Email Address"
                className="focus:outline-none bg-transparent py-2 w-[80%]"
              />
              <button className=" bg-secondary px-3 h-12 text-base font-semibold rounded-l-none rounded-lg text-white hover:bg-black transition-custom">
                Send
              </button>
            </div>
            <div className="!w-full text-black space-y-4">
              {contactDetails?.map((data, index) => (
                <div className="flex items-start gap-2 w-full" key={index}>
                  <div className="">
                    <Image
                      src={data?.image}
                      alt={data?.title}
                      width={10}
                      height={10}
                      layout="responsive"
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-sm text-light font-medium -mt-1">
                      {data?.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="w-full bg-gray-50 py-3 text-center">
        © {date.getFullYear()} {frontendSettings?.title || 'STEAM Institute'}. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
