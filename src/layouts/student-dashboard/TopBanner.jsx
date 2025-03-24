"use client";
import { toggleIsCollapsed } from "@/store/slices/instructor/dashboardSlice";
import Image from "next/image";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { RiNotification3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";
import ProfileDropDown from "@/components/common/ProfileDropDown";
import WalletBalanceBadge from "./WalletBalanceBadge";

const TopBanner = () => {
  const dispatch = useDispatch();
  const { isCollapsed } = useSelector((state) => state.instructor.dashboard);
  const { authUser } = useSelector((state) => state.user);
  const frontendSettings = useSelector((state) => state.admin.settings?.frontendSettings || {});

  const handleToggle = () => dispatch(toggleIsCollapsed());
  return (
    <div className="w-full bg-secondary/5 flex items-center justify-between pr-10 h-20">
      <div className="flex items-center w-[60%] gap-20">
        <div className=" relative w-60 h-20 border-r border-black/10 flex items-center justify-start px-2">
          <div className="w-full h-14 relative">
            <Image
              src={frontendSettings?.logo || "/assets/common/logo.png"}
              alt={frontendSettings?.title || "logo"}
              fill={true}
              className="object-contain object-left"
            />
          </div>

          {/* <button
            type="button"
            onClick={handleToggle}
            className="bg-secondary hover:bg-black transition-custom text-white shadow flex items-center justify-center w-10 h-10 rounded-full absolute top-1/2 -translate-y-1/2 -right-5"
          >
            <LiaAngleLeftSolid
              className={`${
                isCollapsed ? "rotate-0" : "rotate-180"
              } transition-custom`}
            />
            <LiaAngleRightSolid
              className={`${
                isCollapsed ? "rotate-0" : "rotate-180"
              } transition-custom`}
            />
          </button> */}
        </div>

        {/* <div className="relative lg:w-[60%]">
          <input
            type="text"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-black/10 p-3 rounded-full px-8 pl-10 focus:outline-secondary transition-custom"
            placeholder={"Looking for something! Search your query"}
          />

          <IoSearch
            className={`text-xl text-light absolute top-[50%] left-3 translate-y-[-50%] cursor-pointer`}
          />
        </div> */}
      </div>

      <div className="flex items-center gap-4 relative">
        {authUser?.role === "teacher" && <WalletBalanceBadge />}
        {/* <button className="w-10 h-10 bg-white flex items-center justify-center rounded-full border border-black/10">
          <RiNotification3Line size={20} />
        </button> */}
        <ProfileDropDown />
      </div>
    </div>
  );
};

export default TopBanner;
