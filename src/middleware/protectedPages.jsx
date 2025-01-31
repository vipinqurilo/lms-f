import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/router";

// Define role-based access rules
const roleBasedRoutes = {
  admin: ["/admin-dashboard", "/instructor-dashboard", "/student-dashboard"],
  instructor: ["/instructor-dashboard"],
  student: ["/student-dashboard"],
};

function protectedPages(Component) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const { authUser } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!authUser || !authUser.role) {
        // Redirect to login if not authenticated
        router.replace("/").then(() => setLoading(false));
      } else {
        const allowedRoutes = roleBasedRoutes[authUser.role] || [];
        const isAuthorized = allowedRoutes.some((route) =>
          router.pathname.startsWith(route)
        );

        if (!isAuthorized) {
          // Redirect unauthorized users
          router.replace("/").then(() => setLoading(false));
        } else {
          setLoading(false);
        }
      }
    }, [authUser, router]);

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
