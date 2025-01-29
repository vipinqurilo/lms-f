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
import { useState } from "react";

import {
  Megaphone,
  Wallet,
  FileText,
  ClipboardCheck,
  DollarSign,
  CalendarCheck,
} from "lucide-react";
import { useSelector } from "react-redux";

const studentSidebarLinks = [
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
  {
    title: "Support Tickets",
    icon: LifeBuoy,
    href: "/student-dashboard/support",
  },
];

const instructorSidebarLinks = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/instructor-dashboard",
    color: "text-primary",
  },
  {
    title: "My Courses",
    icon: GraduationCap,
    href: "/instructor-dashboard/my-courses",
  },
  {
    title: "Announcements",
    icon: Megaphone,
    href: "/instructor-dashboard/announcements",
  },
  {
    title: "Withdrawals",
    icon: Wallet,
    href: "/instructor-dashboard/withdrawals",
  },
  {
    title: "Quiz Attempts",
    icon: FileText,
    href: "/instructor-dashboard/quiz-attempts",
  },
  {
    title: "Assignments",
    icon: ClipboardCheck,
    href: "/instructor-dashboard/assignments",
  },
  {
    title: "Earnings",
    icon: DollarSign,
    href: "/instructor-dashboard/earnings",
  },
  {
    title: "Bookings",
    icon: CalendarCheck,
    href: "/instructor-dashboard/bookings",
  },
];

const adminSidebarLinks = [];

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed } = useSelector((state) => state.instructor.dashboard);
  4;
  const [isHovered, setisHovered] = useState(null);
  const handleIsHovered = (val) => setisHovered(val);

  const sidebarLinks = pathname?.startsWith("/student-dashboard")
    ? studentSidebarLinks
    : pathname?.startsWith("/instructor-dashboard")
    ? instructorSidebarLinks
    : pathname?.startsWith("/admin-dashboard")
    ? adminSidebarLinks
    : "";

  return (
    <div className={`h-full !transition-custom`}>
      <nav
        className={`flex-1 overflow-y-auto !overflow-visible h-full px-4 bg-background py-5 text-white ${
          isCollapsed ? "w-20" : "w-60"
        } transition-custom`}
        style={{ scrollbarWidth: "thin", scrollbarColor: "#e8ebe9" }}
      >
        <div className="space-y-2">
          {sidebarLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <LinkComponent
                link={link}
                key={index}
                isActive={isActive}
                isCollapsed={isCollapsed}
                handleIsHovered={handleIsHovered}
                isHovered={isHovered}
              />
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="space-y-2">
            {pathname?.startsWith("/student-dashboard") && (
              <LinkComponent
                isActive={pathname === "/student-dashboard/settings"}
                link={{
                  title: "Settings",
                  icon: Settings,
                  href: "/student-dashboard/settings",
                }}
                handleIsHovered={handleIsHovered}
                isCollapsed={isCollapsed}
                isHovered={isHovered}
              />
            )}
            {pathname?.startsWith("/instructor-dashboard") && (
              <LinkComponent
                isActive={pathname === "/instructor-dashboard/settings"}
                link={{
                  title: "Settings",
                  icon: Settings,
                  href: "/instructor-dashboard/settings",
                }}
                handleIsHovered={handleIsHovered}
                isCollapsed={isCollapsed}
                isHovered={isHovered}
              />
            )}
            {pathname?.startsWith("/admin-dashboard") && (
              <LinkComponent
                isActive={pathname === "/admin-dashboard/settings"}
                link={{
                  title: "Settings",
                  icon: Settings,
                  href: "/admin-dashboard/settings",
                }}
                handleIsHovered={handleIsHovered}
                isCollapsed={isCollapsed}
                isHovered={isHovered}
              />
            )}

            <button
              onMouseEnter={() => handleIsHovered("logout")}
              onMouseLeave={() => handleIsHovered(null)}
              className={`flex w-full items-center gap-3 rounded-lg transition-colors relative hover:text-primary hover:bg-gray-50
    ${isCollapsed ? "p-2 justify-center" : "px-3 py-2"}`}
            >
              <LogOut className="w-6 h-6" />
              {isCollapsed && (
                <p
                  className={`absolute top-1/2 -translate-y-1/2 left-[66px] text-sm !z-[20] bg-background px-2 py-1 rounded-full !text-white text-nowrap ${
                    isHovered === "logout" ? "scale-100" : "scale-0"
                  } transition-custom`}
                >
                  Logout
                </p>
              )}
              <span
                className={`${
                  isCollapsed ? "hidden" : "block"
                } transition-custom`}
              >
                Logout
              </span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

function LinkComponent({
  link,
  isCollapsed,
  isActive,
  handleIsHovered,
  isHovered,
}) {
  return (
    <Link
      key={link.href}
      href={link.href}
      onMouseEnter={() => handleIsHovered(link?.href)}
      onMouseLeave={() => handleIsHovered(null)}
      className={`flex items-center gap-3 rounded-lg transition-colors relative
    ${
      isActive
        ? "text-background bg-gray-50"
        : "hover:text-background hover:bg-gray-50"
    } ${isCollapsed ? "p-2 justify-center" : "px-3 py-2"}`}
    >
      <link.icon className="w-6 h-6" />
      {isCollapsed && (
        <p
          className={`absolute top-1/2 -translate-y-1/2 left-[66px] text-sm !z-[20] bg-background px-2 py-1 rounded-full !text-white text-nowrap ${
            isHovered === link?.href ? "scale-100" : "scale-0"
          } transition-custom`}
        >
          {link.title}
        </p>
      )}
      <span className={`${isCollapsed ? "hidden" : "block"} transition-custom`}>
        {link.title}
      </span>
    </Link>
  );
}
