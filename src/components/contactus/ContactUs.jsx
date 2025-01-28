import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "leaflet/dist/leaflet.css";
const contactDetails = [
  {
    icon: <FaMapMarkerAlt className="text-xl text-gray-700" />,
    title: "ADDRESS",
    content: [
      "ITC 3, Sector 67,",
      "Sahibzada Ajit Singh Nagar,",
      "Punjab 160062",
    ],
  },
  {
    icon: <MdEmail className="text-xl text-gray-700" />,
    title: "Email",
    content: ["sales@fatbit.com", "sales@fatbit.com"],
  },
  {
    icon: <FaPhoneAlt className="text-xl text-gray-700" />,
    title: "Phone no.",
    content: ["+1 469 844 3346", "+1 469 844 3346", "+1 469 844 3346"],
  },
];

const ContactUs = () => {
  return (
    <div className="bg-[#F2F2F2] min-h-screen flex flex-col items-center py-2">
      {/* Title Section */}
      <div className="bg-[#F2F2F2] w-full ">
        <div className="text-center mb-10 mt-16">
          <h1 className="text-base font-semibold text-orange-500">
            Contact Us
          </h1>
          <p className="text-3xl text-black mt-2">Want to get in touch?</p>
          <p className="text-3xl text-black mt-2">
            We would love to hear from you.
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="  w-full  flex flex-wrap justify-center px-7 h-auto relative ">
        <div className="bg-purple-500 w-full h-[65vh]  absolute top-0 left-0 ">
          <iframe
            className="w-full h-[350px] lg:h-[510px]   z-10"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.182842853665!2d28.10927207466772!3d-25.677891542744703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ebfd794cdf22c65%3A0x52fe3aacbeb58b0a!2sSTEAM%20Institute!5e1!3m2!1sen!2sin!4v1738065918092!5m2!1sen!2sin"
            style={{
              border: 0,
              allowFullScreen: "",
              loading: "lazy",
              referrerPolicy: "no-referrer-when-downgrade",
            }}
          ></iframe>

          <div className="bg-[#F5F5F5] w-72 h-64 p-4  shadow-lg flex flex-col relative bottom-[59vh] left-4  justify-center text-white">
            <div className="space-y-">
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
        <div className="bg-gray-100 w-full flex p-10 relative top-[60vh] justify-between items-center rounded-t-xl shadow-lg mt-16">
          <div className="w-full p-5 px-12  flex justify-center items-center">
            <form className="space-y-6 w-9/12  ">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm">Name</div>
                  <div>
                    <input
                      type="text"
                      className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm">Phone no. *</div>
                  <div>
                    <input
                      type="text"
                      className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">Email *</div>
                <div>
                  <input
                    type="email"
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm">Message *</div>
                <div>
                  <textarea
                    rows="5"
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                  ></textarea>
                </div>
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
      </div>
    </div>
  );
};

export default ContactUs;
