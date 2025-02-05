import React from "react";
import { FaEnvelope, FaTwitter, FaInstagram, FaPhone } from "react-icons/fa";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import data from "@/data/HeaderData.json";

const NavbarTopContactBanner = () => {
  const { contactInfo, socialLinks } = data;
  return (
    <div className="bg-background text-white !py-2 custom-container !mt-0 md:block hidden">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm">
          <span className="flex items-center gap-2">
            <TfiHeadphoneAlt className="h-4 w-4" />
            {contactInfo.label}
          </span>
          <span>{contactInfo.phone}</span>
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="hover:text-gray-300 cursor-pointer bg-white/20 p-1.5 rounded"
            >
              {link.icon === "Mail" && <FaEnvelope className="h-3.5 w-3.5" />}
              {link.icon === "Phone" && <FaPhone className="h-3.5 w-3.5" />}
              {link.icon === "Twitter" && <FaTwitter className="h-3.5 w-3.5" />}
              {link.icon === "Instagram" && (
                <FaInstagram className="h-3.5 w-3.5" />
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavbarTopContactBanner;
