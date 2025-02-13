"use client";

import { logoutUser } from "@/store/slices/userSlice";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { VscTriangleUp } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";

const ProfileDropDown = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleIsModalOpen = () => setIsModalOpen(!isModalOpen);
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
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsModalOpen(true)}
      onMouseLeave={() => setIsModalOpen(false)}
    >
      <ProfileAvatar authUser={authUser} />

      {isModalOpen && (
        <div className="absolute top-full right-0 pt-2">
          <div className="-mb-3.5 w-full flex items-center justify-end text-white ">
            <VscTriangleUp size={40} />
          </div>

          <ul className="min-w-full bg-white text-nowrap rounded border border-t-0">
            {profileData?.map((subLink, i) => (
              <li
                className=" text-light group w-full text-base border-b border-black/10 px-6 py-3"
                key={i}
              >
                {subLink?.onClick ? (
                  <button
                    onClick={subLink?.onClick}
                    className={`text-black group-hover:!text-secondary transition-custom w-full md:w-fit`}
                  >
                    {subLink?.title}
                  </button>
                ) : (
                  <Link
                    href={subLink?.href}
                    onClick={subLink?.onClick}
                    className={`text-black group-hover:!text-secondary transition-custom w-full md:w-fit`}
                  >
                    {subLink?.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;

const ProfileAvatar = ({ authUser }) => {
  const userName = authUser?.name || "User";
  const userImage = authUser?.image; // Assuming the image URL is stored in authUser.image
  const firstInitial = userName.charAt(0).toUpperCase(); // Get first letter and capitalize

  return (
    <div className="flex items-center gap-2">
      {/* Profile Image or Initial */}
      <div className="w-10 h-10 rounded-full border border-black/10 relative overflow-hidden cursor-pointer flex items-center justify-center bg-gray-200 text-gray-700 font-semibold">
        {userImage ? (
          <Image
            src={userImage}
            alt="profile image"
            fill
            className="object-cover object-center"
          />
        ) : (
          <span>{firstInitial}</span>
        )}
      </div>

      {/* Greeting Message */}
      <div className="text-gray-800 font-medium">
        Hi {authUser?.name || "User"}
      </div>
    </div>
  );
};
