"use client";
import { instructorRegister } from "@/store/slices/userSlice";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../common/Loader";
import { useRouter } from "next/navigation";
import CommonButton from "../common/CommonButton";

const TeacherRegisterForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { authUser, isLoading } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = { ...data, role: "teacher" };
    dispatch(instructorRegister(formData))
      .unwrap()
      .then(() => router.push("/login"));
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white/40 backdrop-blur-sm text-white p-8 md:w-full rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-2">Apply To Teach</h2>
        <p className="mb-4">Teach what you are passionate about</p>

        {authUser !== null ? (
          <>
            {authUser.role === "admin" ? (
              <RedirectButton
                href="/admin-dashboard"
                text="Go To Admin Dashboard"
              />
            ) : authUser.role === "teacher" ? (
              authUser.userStatus === "active" ? (
                <RedirectButton
                  href="/instructor-dashboard"
                  text="Go To Instructor Dashboard"
                />
              ) : (
                <RedirectButton
                  href="/instructor-request"
                  text="Become an Instructor"
                />
              )
            ) : (
              <RegistrationForm
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                errors={errors}
                showPassword={showPassword}
                togglePassword={togglePassword}
                loading={isLoading?.instructorRegister}
              />
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

// **Redirect Button Component**
const RedirectButton = ({ href, text }) => (
  <div className="py-10 lg:w-full flex items-center justify-center">
    <Link
      href={href}
      className="w-full px-4 py-2 text-center rounded-md shadow font-semibold transition bg-background text-white hover:bg-secondary text-lg disabled:cursor-not-allowed disabled:opacity-95"
    >
      {text}
    </Link>
  </div>
);

// **Registration Form Component**
const RegistrationForm = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
  showPassword,
  togglePassword,
  loading,
}) => (
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    {/* Email Field */}
    <FormInput
      label="Email"
      type="email"
      id="email"
      placeholder="Enter Email Address"
      register={register("email", {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address",
        },
      })}
      error={errors.email}
    />

    {/* Password Field */}
    <div>
      <label htmlFor="password" className="block font-medium mb-1">
        Password
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          {...register("password", { required: "Password is required" })}
          placeholder="Enter Password"
          className={`w-full text-black border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        {showPassword ? (
          <FaEye
            className="text-xl text-gray-300 absolute top-[50%] right-2 translate-y-[-50%] cursor-pointer"
            onClick={togglePassword}
          />
        ) : (
          <FaEyeSlash
            className="text-xl text-gray-300 absolute top-[50%] right-2 translate-y-[-50%] cursor-pointer"
            onClick={togglePassword}
          />
        )}
      </div>
      {errors.password && (
        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
      )}
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-secondary hover:bg-background transition-custom text-white font-bold py-2 rounded-md"
    >
      {loading ? <Loader text="Please Wait" /> : "Register with email"}
    </button>

    {/* Terms & Conditions */}
    <p className="text-center text-sm">
      By Signing up with Platform, you agree to{" "}
      <Link href="/terms-of-service" className="text-secondary hover:underline">
        Terms & Conditions
      </Link>
    </p>
  </form>
);

// **Reusable Form Input Component**
const FormInput = ({ label, type, id, placeholder, register, error }) => (
  <div>
    <label htmlFor={id} className="block font-medium mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      {...register}
      placeholder={placeholder}
      className={`w-full text-black border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

export default TeacherRegisterForm;
