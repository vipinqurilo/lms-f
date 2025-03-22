"use client";

import { logout, logoutUser } from "@/store/slices/userSlice";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { VscTriangleUp } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";

const ProfileDropDown = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname();
  const { authUser } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isUserToken = !!localStorage.getItem("token");

  const studentProfileLinks = [
    {
      title: "Dashboard",
      href: "/student-dashboard",
    },
    {
      title: "My Profile",
      href: "/student-dashboard/settings",
    },
    {
      title: "Enrolled Courses",
      href: "/student-dashboard/enrolled-courses",
    },
    {
      title: "Wishlist",
      href: "/student-dashboard/wishlist",
    },
    {
      title: "My Booking",
      href: "/student-dashboard/booking",
    },
    {
      title: "Order History",
      href: "/student-dashboard/orders",
    },
    {
      title: "Settings",
      href: "/student-dashboard/settings",
    },
  ];

  const adminProfileLinks = [
    {
      title: "Dashboard",
      href: "/admin-dashboard",
    },
    ...(isUserToken
      ? [
          {
            title: "Student Dashboard",
            href: "/student-dashboard",
          },
          {
            title: "Instructor Dashboard",
            href: "/instructor-dashboard",
          },
        ]
      : []),
    {
      title: "Courses",
      href: "/admin-dashboard/approvals/courses",
    },
    {
      title: "Teachers",
      href: "/admin-dashboard/approvals/teachers",
    },
    {
      title: "Withdrawals",
      href: "/admin-dashboard/approvals/withdrawals",
    },
    {
      title: "Manage Courses",
      href: "/admin-dashboard/manage-courses",
    },
    {
      title: "Sales",
      href: "/admin-dashboard/sales",
    },
    {
      title: "Languages",
      href: "/admin-dashboard/languages",
    },
    {
      title: "Settings",
      href: "/admin-dashboard/settings",
    },
  ];

  const instructorProfileLinks = [
    {
      title: "Dashboard",
      href: "/instructor-dashboard",
    },
    {
      title: "My Courses",
      href: "/instructor-dashboard/my-courses",
    },
    {
      title: "Bookings",
      href: "/instructor-dashboard/bookings",
    },
    {
      title: "Settings",
      href: "/instructor-dashboard/settings",
    },
  ];ProfileAvatar

  const handleLogOut = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        router.push("/");
      });
  };

  return (
    <div
      className="relative font-nunito"
      onMouseEnter={() => setIsModalOpen(true)}
      onMouseLeave={() => setIsModalOpen(false)}
    >
      <ProfileAvatar authUser={authUser} />

      {isModalOpen && (
        <div className="absolute top-full right-0 pt-2 !z-[65]">
          <div className="-mb-3.5 w-full flex items-center justify-end text-white ">
            <VscTriangleUp size={40} />
          </div>

          <ul className="min-w-full md:w-48 bg-white text-nowrap rounded border border-t-0 shadow-sm">
            {[
              "/instructor-dashboard",
              "/student-dashboard",
              "/admin-dashboard",
            ]?.some((p) => path.startsWith(p)) && (
              <Link
                href={"/"}
                className={`text-black bg-gray-200 group !w-full`}
              >
                <li className=" text-light group-hover:!text-secondary transition-custom w-full h-auto text-base border-b border-black/10 px-6 py-3">
                  Go To Website
                </li>
              </Link>
            )}

            {(authUser?.role === "admin"
              ? adminProfileLinks
              : authUser?.role === "teacher"
              ? instructorProfileLinks
              : studentProfileLinks
            )?.map((subLink, i) => (
              <Link
                key={i}
                href={authUser?.userStatus === "active" ? subLink?.href : "#"}
                onClick={(e) => {
                  if (authUser?.userStatus !== "active") {
                    e.preventDefault();
                  }
                }}
                className={`text-black bg-gray-200 group !w-full ${
                  authUser?.userStatus !== "active"
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
              >
                <li
                  className="text-light group-hover:!text-secondary transition-custom w-full h-auto text-base border-b border-black/10 px-6 py-3"
                  key={i}
                >
                  {subLink?.title}
                </li>
              </Link>
            ))}
            <button
              onClick={handleLogOut}
              className={`text-black hover:!text-secondary transition-custom w-full text-start px-6 py-3`}
            >
              Logout
            </button>
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
        <Image
          src={userImage || "/assets/common/profile.png"}
          alt="profile image"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Greeting Message */}
      <div className="text-gray-800 font-medium">
        Hi{" "}
        {authUser?.name && authUser?.name !== "undefined undefined"
          ? authUser.name?.split(" ")?.[0]
          : authUser?.role === "user"
          ? "User"
          : "Teacher"}
      </div>
    </div>
  );
};
