import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const contactDetails = [
  {
    icon: <FaMapMarkerAlt className="text-xl text-gray-700" />,
    title: "ADDRESS",
    content: [
      "ITC 3, Sector 67,",
      "Sahibzada Ajit Singh Nagar,",
      "Punjab 160062"
    ]
  },
  {
    icon: <MdEmail className="text-xl text-gray-700" />,
    title: "Email",
    content: ["sales@fatbit.com", "sales@fatbit.com"]
  },
  {
    icon: <FaPhoneAlt className="text-xl text-gray-700" />,
    title: "Phone no.",
    content: ["+1 469 844 3346", "+1 469 844 3346", "+1 469 844 3346"]
  }
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
      <div className="bg-rose-500 w-full  flex justify-center px-7">
      <div className="bg-white w-full flex flex-wrap p-10 justify-between items-center border-t-4 border-black shadow-lg">
        {/* Left Section */}
        <div className="w-4/12 p-5 ml-8">
          {contactDetails.map((detail, index) => (
            <div key={index} className="mb-7 py-7 border-b-2 border-gray-200">
              <div className="flex items-start px-14">
                {/* Icon Section */}
                <div className="mr-14 flex-shrink-0">{detail.icon}</div>

                {/* Content Section */}
                <div>
                  <h2 className="font-semibold text-lg mb-2">{detail.title}</h2>
                  <div className="px-2">
                    {detail.content.map((line, idx) => (
                      <p key={idx} className="text-gray-700">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-5 px-12">
          <form className="space-y-6">
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
