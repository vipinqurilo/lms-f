"use client";
import React, { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { resetPasswordAsync } from "@/store/slices/userSlice";
import BackgroundModal from "@/components/instructor/BackgroundModal";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading } = useSelector((state) => state.user);
  
  const isSubmitting = isLoading?.["resetPasswordAsync"] || false;

  useEffect(() => {
    if (router.isReady) {
      const pathParts = router.asPath.split("/");
      const extractedToken = pathParts[pathParts.length - 1];
      setToken(extractedToken);
    }
  }, [router.isReady, router.asPath]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      newPassword: "",
      confirmPassword: "",
    };

    if (!newPassword.trim()) {
      newErrors.newPassword = "Password is required";
      isValid = false;
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      setIsExpired(true);
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    dispatch(
      resetPasswordAsync({ token, newPassword, confirmPassword })
    ).unwrap()
      .then(() => setIsSuccess(true))
      .catch(() => setIsExpired(true));
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-14">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full lg:w-5/12">
        <h2 className="text-2xl font-semibold mt-12 text-gray-900">
          New Password
        </h2>
        <p className="text-gray-500 mt-2">
          Set a new password for your account.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mt-7">
            <label className="block text-gray-700 mb-3">
              Enter New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full p-3 border-none ring-1 outline-none ring-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary ${
                  errors.newPassword ? "border-red-500" : ""
                }`}
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
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>

          <div className="mt-6">
            <label className="block text-gray-700 mb-3">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`w-full p-3 border-none ring-1 outline-none ring-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
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
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-secondary text-white p-3 rounded-md font-semibold hover:bg-black transition relative"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="opacity-0">UPDATE PASSWORD</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              </>
            ) : (
              "UPDATE PASSWORD"
            )}
          </button>
        </form>
      </div>

      {isExpired && (
        <BackgroundModal
          PropComponent={() => (
            <div className="bg-white shadow-lg rounded-2xl p-8 lg:w-5/12 text-center">
              <h2 className="text-xl font-semibold text-gray-900 mt-12">
                This link has expired or is not valid.
              </h2>
              <button
                className="w-full mt-12 bg-secondary text-white p-3 rounded-md font-semibold hover:bg-black"
                onClick={() => {
                  setIsExpired(false);
                  router.push("/login");
                }}
              >
                OK
              </button>
            </div>
          )}
        />
      )}

      {isSuccess && (
        <BackgroundModal
          PropComponent={() => (
            <div className="bg-white shadow-lg rounded-2xl p-8 lg:w-5/12 text-center">
              <h2 className="text-xl font-semibold text-gray-900 mt-12">
                Password reset successful!
              </h2>
              <p className="text-gray-500 mt-4">
                Your password has been updated. You can now log in with your new password.
              </p>
              <button
                className="w-full mt-12 bg-secondary text-white p-3 rounded-md font-semibold hover:bg-black"
                onClick={() => {
                  setIsSuccess(false);
                  router.push("/login");
                }}
              >
                GO TO LOGIN
              </button>
            </div>
          )}
        />
      )}
    </div>
  );
};

export default ResetPassword;
