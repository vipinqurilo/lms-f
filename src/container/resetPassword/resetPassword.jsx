"use client";
import React, { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { resetPasswordAsync } from "@/store/slices/userSlice";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const pathParts = router.asPath.split("/");
      const extractedToken = pathParts[pathParts.length - 1];
      setToken(extractedToken);
    }
  }, [router.isReady, router.asPath]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Invalid or missing token.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await dispatch(
        resetPasswordAsync({ token, newPassword, confirmPassword })
      ).unwrap();
      
      if (response.message === "Invalid or expired token") {
        setIsExpired(true);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setIsExpired(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-14">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-5/12">
        <h2 className="text-2xl font-semibold mt-12 text-gray-900">New Password</h2>
        <p className="text-gray-500 mt-2">Set a new password for your account.</p>

        <form onSubmit={handleSubmit}>
          <div className="mt-7">
            <label className="block text-gray-700 mb-3">Enter New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-gray-700 mb-3">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-primary text-white p-3 rounded-md font-semibold hover:bg-black"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Updating..." : "UPDATE PASSWORD"}
          </button>
        </form>
      </div>

      {isExpired && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white shadow-lg rounded-2xl p-8 w-5/12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mt-12">
            The link you provided is either invalid or has expired. Please check and try again.
            </h2>
            <button
              className="w-full mt-6 bg-primary text-white p-3 rounded-md font-semibold hover:bg-black"
              onClick={() => {
                setIsExpired(false);
                router.push("/login");
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
