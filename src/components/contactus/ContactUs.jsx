 

import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "leaflet/dist/leaflet.css";

const ContactUs = () => {
  return (
    <div className="bg-[#F2F2F2] min-h-screen flex flex-col items-center py-2">
      {/* Title Section */}
      <div className="bg-[#F2F2F2] w-full">
        <div className="text-center mb-10 mt-16">
          <h1 className="text-base font-semibold text-orange-500">Contact Us</h1>
          <p className="text-3xl text-black mt-2">Want to get in touch?</p>
          <p className="text-3xl text-black mt-2">We would love to hear from you.</p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-gray-100 w-full lg:flex lg:px-10 justify-between items-center lg:rounded-t-xl  ">
        <div className="w-full p-5 lg:px-12 flex justify-center items-center">
          <form className="space-y-6 w-full sm:w-9/12 mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm">Name</div>
                <input
                  type="text"
                  className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <div className="text-sm">Phone no. *</div>
                <input
                  type="text"
                  className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm">Email *</div>
              <input
                type="email"
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="space-y-2">
              <div className="text-sm">Message *</div>
              <textarea
                rows="5"
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              ></textarea>
            </div>

            <div>
              <input type="checkbox" className="mr-2" />
              <label>I’m not a robot</label>
            </div>

            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-4 rounded-lg w-full hover:bg-black"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full flex flex-wrap justify-center lg:px-6 h-auto relative mt-12">
        <div className="w-full lg:h-[65vh] h-[65vh]">
          <iframe
            className="w-full h-[65vh] lg:h-[510px] z-10"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d20341.971606782456!2d28.107744412262633!3d-25.671741686334983!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ebfd794cdf22c65%3A0x52fe3aacbeb58b0a!2sSTEAM%20Institute!5e0!3m2!1sen!2sin!4v1738130726415!5m2!1sen!2sin"
            style={{
              border: 0,
              allowFullScreen: "",
              loading: "lazy",
              referrerPolicy: "no-referrer-when-downgrade",
            }}
          ></iframe>

<div className="bg-[#F5F5F5] lg:w-72   h-64 p-4  shadow-lg lg:flex flex-col lg:relative lg:bottom-[59vh] lg:left-4 flex  justify-center items-center text-white lg:mt-auto mt-10">
            <div className="lg:space-y-1 lg:w-auto w-7/12 ">
              <div className="text-lg font-semibold text-black">
                STEAM Institute
              </div>
              <div className="text-base   text-black mt-4">
                52 Spekboom Avenue,
              </div>
              <div className="text-base   text-black">Amandasig Akasia,</div>
              <div className="text-base   text-black">Pretoria, 0182,</div>
              <div className="text-base   text-black ">South Africa</div>
              <div className="text-base   text-black ">+27 82 766 8986</div>
              <a
                href="mailto:hello@octavus.com"
                className="text-orange-500 hover:text-orange-300 underline"
              >
                info@steaminstitute.online
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
