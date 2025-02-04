import React from "react";
import { useForm } from "react-hook-form";

const TeacherRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Handle form submission here (e.g., API call)
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white/40 backdrop-blur-sm text-white p-8 lg:w-full rounded-lg shadow-md">
        {" "}
        {/* Adjusted width */}
        <h2 className="text-2xl font-bold mb-2">Apply To Teach</h2>
        <p className=" mb-4">
          Teach what you are passionate about
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {" "}
          {/* Added space between form elements */}
          <div>
            <label
              htmlFor="email"
              className="block font-medium mb-1"
            >
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
            <label
              htmlFor="password"
              className="block font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className={`w-full text-black border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
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
            Register with email
          </button>
          <p className="text-center text-sm">
            By Signing up with Platform, you agree to{" "}
            <a href="#" className="text-secondary hover:underline">
              Terms & Conditions
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default TeacherRegisterForm;
