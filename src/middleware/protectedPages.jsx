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
    const [initialCheckDone, setInitialCheckDone] = useState(false);

    useEffect(() => {
      const handleAuth = async () => {
        try {
          console.log("Protected Pages Debug:", {
            pathname: router.pathname,
            isAuthenticated,
            authUser,
            userStatus: authUser?.userStatus,
            userRole: authUser?.role,
            initialCheckDone
          });

          // On first render, skip the check until we're sure about auth state
          if (!initialCheckDone) {
            setInitialCheckDone(true);
            return;
          }

          // Skip auth check if state is not yet hydrated
          if (isAuthenticated === undefined || authUser === undefined) {
            console.log("Debug: Auth state not yet hydrated, waiting...");
            return;
          }

          // Wait for authentication state to be determined
          if (isAuthenticated === false) {
            console.log("Debug: Not authenticated, redirecting to home");
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

            console.log("Debug: Route authorization check:", {
              allowedRoutes,
              currentPath: router.pathname,
              isAuthorized,
              userRole: authUser.role
            });

            if (!isAuthorized) {
              console.log("Debug: User not authorized for this route, redirecting to home");
              await router.replace("/");
            }
          } else if (authUser !== null) { // Only log if we actually have a user object
            console.log("Debug: User status check failed:", {
              hasAuthUser: !!authUser,
              userStatus: authUser?.userStatus
            });
          }
        } catch (error) {
          console.error("Navigation error:", error);
        } finally {
          // Only set loading to false if we have a definitive auth state
          if (isAuthenticated !== undefined && authUser !== undefined) {
            setLoading(false);
          }
        }
      };

      handleAuth();
    }, [authUser, isAuthenticated, router, initialCheckDone]);

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
