"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  Heart,
  Star,
  ShoppingCart,
  Grid2x2Check,
  LogOut,
  Settings,
  ListOrdered,
} from "lucide-react";
import { useState } from "react";

import { Wallet, DollarSign, CalendarCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { LinkComponent } from "@/components/layout/LinkComponent";
import { LuCalendarClock, LuTickets } from "react-icons/lu";
import { logout } from "@/store/slices/userSlice";
import Loader from "@/components/common/Loader";

import {
  MdDashboard,
  MdCategory,
  MdSchool,
  MdPeople,
  MdAccountBalanceWallet,
  MdBook,
  MdSupervisorAccount,
} from "react-icons/md";

const studentSidebarLinks = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/student-dashboard",
    color: "text-primary",
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
  {
    title: "Availability Calendar",
    icon: LuCalendarClock,
    href: "/instructor-dashboard/calender",
  },
];

const adminSidebarLinks = [
  {
    title: "Dashboard",
    icon: MdDashboard,
    href: "/admin-dashboard",
    color: "text-primary",
  },
  {
    title: "Courses",
    icon: MdSchool,
    subLinks: [
      {
        title: "Manage Courses",
        href: "/admin-dashboard/manage-courses",
      },
      {
        title: "Course Request",
        href: "/admin-dashboard/approvals/courses",
      },
    ],
  },
  {
    title: "Student",
    icon: MdSupervisorAccount,
    href: "/admin-dashboard/manage-students",
  },
  {
    title: "Teachers",
    icon: MdPeople,
    subLinks: [
      {
        title: "Teachers Request",
        href: "/admin-dashboard/approvals/teachers",
      },
      {
        title: "Teachers",
        href: "/admin-dashboard/teachers",
      },
    ],
  },
  {
    title: "Withdrawals",
    icon: MdAccountBalanceWallet,
    href: "/admin-dashboard/approvals/withdrawals",
  },
  {
    title: "Manage Bookings",
    icon: MdBook,
    href: "/admin-dashboard/manage-booking",
  },
  {
    title: "Manage Users",
    icon: MdSupervisorAccount,
    href: "/admin-dashboard/user",
  },
  {
    title: "Orders",
    icon: ListOrdered,
    href: "/admin-dashboard/orders",
  },
  {
    title: "Category",
    icon: MdCategory,
    subLinks: [
      {
        title: "Sub-Category",
        href: "/admin-dashboard/managesubjects/subCategories",
      },
      {
        title: "Category",
        href: "/admin-dashboard/managesubjects/categories",
      },
    ],
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
        className={`flex-1 !overflow-y-auto text-nowrap overflow-x-hidden h-full px-4 bg-background py-5 text-white ${
          isCollapsed ? "w-[80px]" : "w-[240px]"
        } transition-custom`}
        style={{ scrollbarWidth: "none", scrollbarColor: "#e8ebe9" }}
      >
        <div className="space-y-2">
          {sidebarLinks.map((link, index) => {
            const hasHref = link.href;
            let isActive = hasHref
              ? pathname === link.href || pathname.startsWith(link.href + "/")
              : link.subLinks?.some(
                  (subLink) =>
                    pathname === subLink.href ||
                    pathname.startsWith(subLink.href + "/")
                );

            // Ensure "Dashboard" is active only when pathname matches exactly
            if (link?.title === "Dashboard") {
              isActive = pathname === link.href;
            }

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
