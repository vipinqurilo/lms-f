import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/router";

// Define role-based access rules
const roleBasedRoutes = {
  admin: ["/admin-dashboard"],
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
          // Wait for authentication state to be determined
          if (isAuthenticated === false) {
            await router.replace("/");
            return;
          }

          // Only proceed with route checking if we have a user
          if (authUser) {
            const allowedRoutes = roleBasedRoutes[authUser?.role] || [];
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
          <FaSpinner className="text-primary animate-spin" size={25} />
        </div>
      );

    return <Component {...props} />;
  };
}

export default protectedPages;
