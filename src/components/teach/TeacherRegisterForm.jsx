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
  const { authUser } = useSelector((state) => state.user);
  const [showPassword, setshowPassword] = useState(false);
  const togglePassword = () => setshowPassword(!showPassword);

  const getIconCss = () => {
    return "text-xl text-gray-300 absolute top-[50%] right-2 translate-y-[-50%] cursor-pointer";
  };

  const loading = useSelector(
    (state) => state.user.isLoading.instructorRegister
  );
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = {
      ...data,
      role: "instructor",
    };
    console.log(formData);
    dispatch(instructorRegister(formData))
      .unwrap()
      .then(() => {
        router.push("/login");
      });
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white/40 backdrop-blur-sm text-white p-8 lg:w-full rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-2">Apply To Teach</h2>
        <p className=" mb-4">Teach what you are passionate about</p>
        {Object.keys(authUser).length > 0 ? (
          <div className="py-10 lg:w-full flex items-center justify-center">
            <Link
              href={"/instructor-request"}
              className="!w-full px-4 py-2 text-center rounded-md shadow font-semibold transition bg-background text-white hover:bg-secondary text-lg disabled:cursor-not-allowed disabled:opacity-95"
            >
              Become an Instructor
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {" "}
            {/* Added space between form elements */}
            <div>
              <label htmlFor="email" className="block font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full text-black border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className={`w-full text-black border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {showPassword ? (
                  <FaEye
                    className={`${getIconCss()}`}
                    onClick={togglePassword}
                  />
                ) : (
                  <FaEyeSlash
                    className={`${getIconCss()}`}
                    onClick={togglePassword}
                  />
                )}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-secondary hover:bg-background transition-custom text-white font-bold py-2 rounded-md"
            >
              {loading ? (
                <Loader text={"Please Wait"} />
              ) : (
                "Register with email"
              )}
            </button>
            <p className="text-center text-sm">
              By Signing up with Platform, you agree to{" "}
              <Link
                href={"/terms-of-service"}
                className="text-secondary hover:underline"
              >
                Terms & Conditions
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default TeacherRegisterForm;
