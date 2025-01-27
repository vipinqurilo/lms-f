import React from "react";

export default function Become() {
  return (
    <div className="flex gap-4 mx-20 mt-16">
      <div className="bg-[#ffdeda] rounded-2xl flex items-start justify-center pl-6  md:mx-6">
        <div className="py-8">
          <h2 className="text-2xl font-extrabold text-[#002058]">
            Become An Instructor
          </h2>
          <p className="text-xl mt-4 md:w-[70%]">
            Top instructors from around the world teach millions of students on
            Mentoring.
          </p>
        </div>

        <img
          src="https://dreamslms.dreamstechnologies.com/html/assets/img/icon/become-02.svg"
          alt=""
        />
      </div>

      {/* second here */}
      <div className="bg-[#ffe88f] rounded-2xl flex items-start justify-center pl-6 pt-4 md:mx-6 ">
        <div className="py-8">
          <h2 className="text-2xl font-extrabold text-[#002058]">
            Transform Access To Education
          </h2>
          <p className="text-xl mt-4 md:w-[80%]">
            Create an account to receive our newsletter, course recommendations
            and promotions.
          </p>
        </div>

        <img
          src="https://dreamslms.dreamstechnologies.com/html/assets/img/icon/become-01.svg"
          alt=""
        />
      </div>
    </div>
  );
}
