import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Loader from "@/components/common/Loader";

// Define role-based access rules
const roleBasedRoutes = {
  admin: ["/admin-dashboard", "/instructor-dashboard", "/student-dashboard"],
  teacher: ["/instructor-dashboard"],
  student: ["/student-dashboard"],
};

function protectedPages(Component) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const { authUser, isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const handleAuth = async () => {
        try {
          if (isAuthenticated === false) {
            await router.replace("/");
            return;
          }

          if (authUser && authUser?.userStatus === "active") {
            if (authUser?.role === "admin") {
              localStorage.setItem("isAdmin", JSON.stringify(true)); // Fix: Store correctly
            } else {
              localStorage.setItem("isAdmin", JSON.stringify(false));
            }

            const allowedRoutes = roleBasedRoutes[authUser.role] || [];
            const isAuthorized = allowedRoutes.some((route) =>
              router.pathname.startsWith(route)
            );

            if (!isAuthorized) {
              await router.replace("/");
            }
          }
        } catch (error) {
          console.error("Navigation error:", error);
        } finally {
          setLoading(false);
        }
      };

      handleAuth();
    }, [authUser, isAuthenticated, router]);

    if (loading)
      return (
        <div className="h-screen w-full flex items-center justify-center">
          <Loader isBig={true} color={"text-secondary"} />
        </div>
      );

    return <Component {...props} />;
  };
}

export default protectedPages;
