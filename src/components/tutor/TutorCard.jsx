import Image from "next/image";
import React from "react";
import { SlLocationPin } from "react-icons/sl";
const TutorCard = () => {
  return (
    <div className="bg-white shadow-lg  rounded-lg max-w-[85%] mx-auto  flex  ">
      {/* Price & Buttons */}
      <div className=" flex flex-col items-center  p-8">
        <div className=" ">
          <Image
            width={140}
            height={140}
            src="/assets/tutor/Marlenereilly.jpg"
            alt="Tutor"
            className=" rounded-xl object-cover"
          />
        </div>
        <div className="text-[12px] font-bold text-gray-700 my-2">
          $2.50 - $20.00
        </div>
        <button className="bg-primary text-white px-8 flex justify-center items-center text-nowrap text-md  rounded-lg hover:bg-opacity-80 w-[140px] h-[40px]">
          Book now
        </button>
        <button className="border border-primary text-primary px-4 flex justify-center items-center rounded-lg mt-4 hover:bg-orange-50 w-[140px] h-[40px]">
          Contact
        </button>
      </div>
      {/* Left Section */}
      <div className="flex-1 flex flex-col py-8">
        {/* Profile Info */}
        <h2 className="text-xl font-bold">Marlene Reilly</h2>
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-500 flex items-center">
            <span className="mr-1">
              <SlLocationPin />
            </span>{" "}
            United Kingdom
          </p>
          <div className="flex items-center ">
            <span className="text-lg font-semibold">
              <div className="text-sm flex justify-center items-center gap-2 font-semibold text-dark_text">
                <Image
                  width={16}
                  height={16}
                  src={"/assets/icons/star-fill.svg"}
                  alt="Star"
                />
                3.50
              </div>
            </span>
            <span className="ml-1 text-sm">(2)</span>
          </div>
          <div className="text-gray-500 text-sm mt-1">
            <span className="font-bold">16</span> Learners ·{" "}
            <span className="font-bold">45</span> Sessions
          </div>
        </div>

        {/* Subjects */}
        <div className="mt-4">
          <h3 className="font-semibold text-gray-700">Teaches</h3>
          <p className="text-gray-600 text-sm">
            Accounting, Biology, Geography, Literary Criticism
          </p>
        </div>

        {/* Languages */}
        <div className="mt-2">
          <h3 className="font-semibold text-gray-700">Speaks</h3>
          <p className="text-gray-600 text-sm">English, Swahili</p>
        </div>

        {/* About */}
        <div className="mt-4">
          <h3 className="font-semibold text-gray-700">About</h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            Since 1998, I've been living and teaching Biology, Accounts,
            Geography, and English in Bolivia. I want all kids to be effective
            learners, so I aim to establish an exciting...
          </p>
          <a
            href="#"
            className="text-orange-500 text-sm underline mt-1 inline-block"
          >
            View profile
          </a>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 border-l min-w-[400px] max-w-[400px] border-gray-200 p-8">
        <h3 className="font-semibold text-gray-700 mb-2">Availability</h3>
        <div className="grid grid-cols-7  text-center text-sm">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day, i) => (
            <div key={i} className=" ">
              <div className="text-gray-600   font-semibold">{day}</div>
              {[...Array(6)].map((_, j) => (
                <div
                  key={j}
                  className={`w-8 h-4 mx-auto ${
                    i !== 0 && i !== 5 ? "bg-green-400" : "bg-gray-200"
                  }  mt-1`}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <a
          href="#"
          className="text-orange-500 text-sm underline mt-2 inline-block"
        >
          View full availability
        </a>
      </div>
    </div>
  );
};

export default TutorCard;
