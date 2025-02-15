"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MdOutlineCategory } from "react-icons/md";
import {
  LayoutDashboard,
  User,
  GraduationCap,
  Heart,
  Star,
  FileQuestion,
  ShoppingCart,
  MessageSquare,
  Grid2x2Check,
  Users,
  BookCheck,
  LibraryBig,
  LifeBuoy,
  LogOut,
  Settings,
  SquareLibrary,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

import {
  Megaphone,
  Wallet,
  FileText,
  ClipboardCheck,
  DollarSign,
  CalendarCheck,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { LinkComponent } from "@/components/layout/LinkComponent";
import { LuTickets } from "react-icons/lu";
import { FaBook } from "react-icons/fa";
import { logout } from "@/store/slices/userSlice";
import Loader from "@/components/common/Loader";
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
    title: "My Booking",
    icon: Grid2x2Check,
    href: "/student-dashboard/booking",
  },
  {
    title: "Order History",
    icon: ShoppingCart,
    href: "/student-dashboard/orders",
  },
  // {
  //   title: "Question & Answer",
  //   icon: MessageSquare,
  //   href: "/student-dashboard/qa",
  // },
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
    title: "Withdrawals",
    icon: Wallet,
    href: "/instructor-dashboard/withdrawals",
  },

  // {
  //   title: "Quiz Attempts",
  //   icon: FileText,
  //   href: "/instructor-dashboard/quiz-attempts",
  // },
  // {
  //   title: "Assignments",
  //   icon: ClipboardCheck,
  //   href: "/instructor-dashboard/assignments",
  // },
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

const adminSidebarLinks = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin-dashboard",
    color: "text-primary",
  },
  {
    title: "Courses",
    icon: GraduationCap,
    href: "/admin-dashboard/approvals/courses",
  },

  {
    title: "Teachers",
    icon: Users,
    href: "/admin-dashboard/teachers",
  },

  {
    title: "Teachers Request",
    icon: Users,
    href: "/admin-dashboard/approvals/teachers",
  },
  {
    title: "Withdrawals",
    icon: Wallet,
    href: "/admin-dashboard/approvals/withdrawals",
  },
  {
    title: "Manage Courses",
    icon: LibraryBig,
    href: "/admin-dashboard/manage-courses",
  },
  {
    title: "Manage Bookings",
    icon: BookCheck,
    href: "/admin-dashboard/manage-booking",
  },

  {
    title: "Manage Users",
    icon: Users,
    href: "/admin-dashboard/user",
  },

  {
    title: "Category",
    icon: SquareLibrary,
    href: "/admin-dashboard/managesubjects/categories",
  },
  {
    title: "Sub-Category",
    icon: Users,
    href: "/admin-dashboard/managesubjects/subCategories",
  },
];

export function Sidebar() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const { isCollapsed } = useSelector((state) => state.instructor.dashboard);
  const logoutLoading = useSelector((state) => state.user.isLoading.logout);
  const [isHovered, setisHovered] = useState(null);
  const handleIsHovered = (val) => setisHovered(val);

  const sidebarLinks = pathname?.startsWith("/student-dashboard")
    ? studentSidebarLinks
    : pathname?.startsWith("/instructor-dashboard")
    ? instructorSidebarLinks
    : pathname?.startsWith("/admin-dashboard")
    ? adminSidebarLinks
    : "";

  const handleLogOut = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        router.push("/");
      });
  };

  return (
    <div className={`h-full !transition-custom`}>
      <nav
        className={`flex-1 !overflow-y-auto overflow-x-hidden h-full px-4 bg-background py-5 text-white ${
          isCollapsed ? "w-[80px]" : "w-[240px]"
        } transition-custom`}
        style={{ scrollbarWidth: "none", scrollbarColor: "#e8ebe9" }}
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

            {pathname?.startsWith("/instructor-dashboard") && (
              <LinkComponent
                isActive={pathname === "/instructor-dashboard/support"}
                handleIsHovered={handleIsHovered}
                isHovered={isHovered}
                link={{
                  title: "Support Tickets",
                  icon: LuTickets,
                  href: "/instructor-dashboard/support",
                }}
                isCollapsed={isCollapsed}
              />
            )}
            {pathname?.startsWith("/student-dashboard") && (
              <LinkComponent
                isActive={pathname === "/student-dashboard/support"}
                handleIsHovered={handleIsHovered}
                isHovered={isHovered}
                link={{
                  title: "Support Tickets",
                  icon: LuTickets,
                  href: "/student-dashboard/support",
                }}
                isCollapsed={isCollapsed}
              />
            )}
            {pathname?.startsWith("/admin-dashboard") && (
              <LinkComponent
                isActive={pathname === "/admin-dashboard/support"}
                handleIsHovered={handleIsHovered}
                isHovered={isHovered}
                link={{
                  title: "Support Tickets",
                  icon: LuTickets,
                  href: "/admin-dashboard/support",
                }}
                isCollapsed={isCollapsed}
              />
            )}

            <button
              onMouseEnter={() => handleIsHovered("logout")}
              onMouseLeave={() => handleIsHovered(null)}
              onClick={() => handleLogOut()}
              className={`flex w-full items-center gap-3 rounded-lg transition-colors relative hover:text-background hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60
    ${isCollapsed ? "p-2 justify-center" : "px-3 py-2"}`}
              disabled={logoutLoading}
            >
              {logoutLoading ? (
                <Loader />
              ) : (
                <>
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
                </>
              )}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
