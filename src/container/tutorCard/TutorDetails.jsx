import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoHeartOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { TooltipItem } from "../../components/common/TooltipItem";
import { useRouter } from "next/router";
const TutorDetails = () => {
  const router = useRouter();
  return (
    <div className="flex-1 flex flex-col  py-6 ">
      {/* Profile Info */}
      <div className="flex justify-between items-center">
        <h2
          onClick={() => router.push(`/tutors/marlene-reilly`)}
          data-tip={"Tip Here"}
          data-for={"mytip"}
          className="text-xl font-bold cursor-pointer"
        >
          Marlene Reilly
        </h2>
        <IoHeartOutline className="mr-5 cursor-pointer" />
      </div>
      <div className="flex mt-4 flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        {/* Location */}
        <div className="flex items-center text-sm text-gray-500">
          <SlLocationPin className="mr-1" />
          United Kingdom
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          <span className="flex items-center gap-1 text-sm font-semibold text-dark_text">
            <Image
              width={16}
              height={16}
              src={"/assets/icons/star-fill.svg"}
              alt="Star"
            />
            3.50
          </span>
          <span className="text-sm text-gray-500">(2)</span>
        </div>

        {/* Learners and Sessions */}
        <div className="text-sm text-gray-500">
          <span className="font-bold">16</span> Learners ·{" "}
          <span className="font-bold">45</span> Sessions
        </div>
      </div>

      {/* Subjects */}
      <div className="mt-4">
        <h3 className="font-semibold text-gray-700">Teaches</h3>
        <div className="text-gray-600 text-sm">
          Accounting, Biology, Geography, Literary Criticism
        </div>
      </div>

      {/* Languages */}
      <div className="mt-2">
        <h3 className="font-semibold text-gray-700">Speaks</h3>
        <div className="text-gray-600 text-sm">English, Swahili</div>
      </div>

      {/* About */}
      <div className="mt-4">
        <h3 className="font-semibold text-gray-700">About</h3>
        <div className="text-gray-600 text-sm line-clamp-2">
          Since 1998, I've been living and teaching Biology, Accounts,
          Geography, and English in Bolivia. I want all kids to be effective
          learners, so I aim to establish an exciting...
        </div>
        <button
          onClick={() => router.push(`/tutors/marlene-reilly`)}
          className="text-orange-500 text-sm underline mt-1 inline-block"
        >
          View profile
        </button>
      </div>
    </div>
  );
};

export default TutorDetails;
