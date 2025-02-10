import React from "react";
import { SlCalender } from "react-icons/sl";
import { MdOutlineWatchLater } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function RecentTicket() {
  return (
    <div className="bg-white space-y-4 shadow-md p-4 my-4">
      <div className="flex justify-between">
        <span className="text-xl font-bold">Recent Ticket</span>
        <span>
          <BsThreeDotsVertical className="text-black text-xl" />
        </span>
      </div>

      <div className="p-4 border border-gray-300">
        <h2 className="w-[80%] font-bold">
          {" "}
          I am Having Trouble with my Lesson #24...
        </h2>

        <div className="flex md:my-2 text-blue-900 bg-blue-50 p-2">
          <SlCalender className="mt-[3px] " />{" "}
          <span className="mx-2 ">Thursday, 12 June 2025</span>
        </div>
        <div className="flex">
          <MdOutlineWatchLater className="text-black mt-[3px] text-[18px]" />{" "}
          <span className="mx-2">7:28 am</span>
        </div>
      </div>
      <div className="p-4 border border-gray-300">
        <h2 className="w-[80%] font-bold">
          {" "}
          I am Having Trouble with my Lesson #24...
        </h2>

        <div className="flex md:my-2 text-blue-900 bg-blue-50 p-2">
          <SlCalender className="mt-[3px] " />{" "}
          <span className="mx-2 ">Thursday, 12 June 2025</span>
        </div>
        <div className="flex">
          <MdOutlineWatchLater className="text-black mt-[3px] text-[18px]" />{" "}
          <span className="mx-2">7:28 am</span>
        </div>
      </div>
    </div>
  );
}
