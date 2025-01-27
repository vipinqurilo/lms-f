import React from "react";

export default function Become() {
  return (
    <div className="flex gap-4 md:px-20 px-4 mt-16 md:flex-row flex-col">
      <div className=" bg-[#ffdeda] rounded-2xl flex md:flex-row flex-col items-start justify-center pl-6  md:mx-6">
        <div className="py-8">
          <h2 className="md:text-2xl text-[20px] font-extrabold text-[#002058]">
            Become An Instructor
          </h2>
          <p className="md:text-xl text-base mt-4 md:w-[70%] ">
            Top instructors from around the world teach millions of students on
            Mentoring.
          </p>
        </div>

        <img
          src="https://dreamslms.dreamstechnologies.com/html/assets/img/icon/become-02.svg"
          alt=""
          className="md:w-full w-1/2"
        />
      </div>

      {/* second here */}
      <div className="bg-[#ffe88f] rounded-2xl flex items-start justify-center md:flex-row flex-col pl-6 pt-4 md:mx-6 ">
        <div className="py-8">
          <h2 className="text-2xl font-extrabold text-[#002058]">
            Transform Access To Education
          </h2>
          <p className="md:text-xl text-base mt-4 md:w-[80%]">
            Create an account to receive our newsletter, course recommendations
            and promotions.
          </p>
        </div>

        <img
          src="https://dreamslms.dreamstechnologies.com/html/assets/img/icon/become-01.svg"
          alt=""
          className="md:w-full w-1/2"
        />
      </div>
    </div>
  );
}
