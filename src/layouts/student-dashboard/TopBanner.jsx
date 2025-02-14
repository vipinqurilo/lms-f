"use client";
import { toggleIsCollapsed } from "@/store/slices/instructor/dashboardSlice";
import Image from "next/image";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { RiNotification3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";
import { VscTriangleUp } from "react-icons/vsc";
import Link from "next/link";
import { logoutUser } from "@/store/slices/userSlice";

const profileData = [
  {
    title: "My Profile",
    href: "/profile",
    description: "View and edit your personal details",
  },
  {
    title: "Account Settings",
    href: "/profile/settings",
    description: "Manage your account preferences and security",
  },
  {
    title: "Notifications",
    href: "/profile/notifications",
    description: "Control your notification settings",
  },
  {
    title: "Payment Methods",
    href: "/profile/payments",
    description: "Manage your saved payment options",
  },
  {
    title: "Order History",
    href: "/profile/orders",
    description: "View your past purchases and transactions",
  },
  {
    title: "Logout",
    href: "#",
    description: "Sign out of your account securely",
    onClick: async (e) => {
      e.preventDefault();
      await dispatch(logoutUser());
      router.push("/");
    },
  },
];

const TopBanner = () => {
  const dispatch = useDispatch();
  const profileData = [
    {
      title: "My Profile",
      href: "/profile",
      description: "View and edit your personal details",
    },
    {
      title: "Account Settings",
      href: "/profile/settings",
      description: "Manage your account preferences and security",
    },
    {
      title: "Notifications",
      href: "/profile/notifications",
      description: "Control your notification settings",
    },
    {
      title: "Payment Methods",
      href: "/profile/payments",
      description: "Manage your saved payment options",
    },
    {
      title: "Order History",
      href: "/profile/orders",
      description: "View your past purchases and transactions",
    },
    {
      title: "Logout",
      href: "#",
      description: "Sign out of your account securely",
      onClick: async (e) => {
        e.preventDefault();
        await dispatch(logoutUser());
        router.push("/");
      },
    },
  ];
  const { isCollapsed } = useSelector((state) => state.instructor.dashboard);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleIsModalOpen = () => setIsModalOpen(!isModalOpen);

  const handleToggle = () => dispatch(toggleIsCollapsed());
  return (
    <div className="w-full bg-secondary/5 flex items-center justify-between pr-10 h-20">
      <div className="flex items-center w-[60%] gap-20">
        <div className=" relative w-60 h-20 border-r border-black/10 flex items-center justify-start px-2">
          <div className="w-full h-14 relative">
            <Image
              src={"/assets/common/logo.png"}
              alt="logo"
              fill={true}
              className="object-contain object-left"
            />
          </div>

          <button
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
          </button>
        </div>

        <div className="relative lg:w-[60%]">
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
        </div>
      </div>

      <div className="flex items-center gap-2 relative">
        <button className="w-10 h-10 bg-white flex items-center justify-center rounded-full border border-black/10">
          <RiNotification3Line size={20} />
        </button>
        <div
          className="relative"
          onMouseEnter={() => setIsModalOpen(true)}
          onMouseLeave={() => setIsModalOpen(false)}
        >
          <div className="w-10 h-10 rounded-full border border-black/10 relative overflow-hidden cursor-pointer">
            <Image
              src={"/assets/about/founder1.jpg"}
              alt="profile image"
              fill={true}
              className="object-cover object-center "
            />
          </div>
          {isModalOpen && (
            <div className="absolute top-full right-0 -mt-3">
              <div className="-mb-3.5 w-full flex items-center justify-end text-white ">
                <VscTriangleUp size={40} />
              </div>

              <ul className="min-w-full bg-white text-nowrap rounded border border-t-0">
                {profileData?.map((subLink, i) => (
                  <li
                    className=" text-light group w-full text-base border-b border-black/10 px-6 py-3"
                    key={i}
                  >
                    <Link
                      href={subLink?.href}
                      className={`text-black group-hover:!text-secondary transition-custom w-full md:w-fit`}
                    >
                      {subLink?.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
