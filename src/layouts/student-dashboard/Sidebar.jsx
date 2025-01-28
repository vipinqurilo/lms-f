"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  GraduationCap,
  Heart,
  Star,
  FileQuestion,
  ShoppingCart,
  MessageSquare,
  Users,
  LifeBuoy,
  LogOut,
  Settings,
} from "lucide-react";
import Image from "next/image";

const sidebarLinks = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/student-dashboard",
    color: "text-primary",
  },
  {
    title: "My Profile",
    icon: User,
    href: "/student-dashboard/profile",
  },
  {
    title: "Enrolled Courses",
    icon: GraduationCap,
    href: "/student-dashboard/enrolled-courses",
  },
  {
    title: "Wishlist",
    icon: Heart,
    href: "/student-dashboard/wishlist",
  },
  {
    title: "Reviews",
    icon: Star,
    href: "/student-dashboard/reviews",
  },

  {
    title: "Order History",
    icon: ShoppingCart,
    href: "/student-dashboard/orders",
  },
  {
    title: "Question & Answer",
    icon: MessageSquare,
    href: "/student-dashboard/qa",
  },
];

const accountLinks = [
  {
    title: "Support Tickets",
    icon: LifeBuoy,
    href: "/student-dashboard/support",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/student-dashboard/settings",
  },
  {
    title: "Logout",
    icon: LogOut,
    href: "/student-dashboard/logout",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-[306px] h-screen sticky -top-[240px] flex flex-col gap-6">
      {/* Profile Section */}
      <div className=" rounded-lg min-h-[240px] relative bg-white overflow-hidden border ">
        <div className="relative h-28 bg-primary">
          <div className="absolute -bottom-10 w-full flex justify-center">
            <div className="relative bg-white rounded-full p-[6px]">
              <Image
                width={80}
                height={80}
                src="/assets/tutor/Marlenereilly.jpg"
                alt="Tutor"
                className="rounded-full  object-cover w-[80px] lg:w-[100px] h-[80px] lg:h-[100px]"
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-12 mb-6">
          <h2 className="text-xl font-semibold text-dark">Rolands Richard</h2>
          <p className="text-gray-600">Student</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 bg-white py-4 rounded-lg border">
        <div className="space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
              ${
                isActive
                  ? "text-primary bg-primary/5"
                  : "text-gray-600 hover:text-primary hover:bg-gray-50"
              }`}
              >
                <link.icon className="w-5 h-5" />
                <span>{link.title}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t">
          <h3 className="px-3 mb-2 text-sm font-semibold text-gray-600">
            Account Settings
          </h3>
          <div className="space-y-1">
            {accountLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg hover:text-primary hover:bg-gray-50"
              >
                <link.icon className="w-5 h-5" />
                <span>{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
