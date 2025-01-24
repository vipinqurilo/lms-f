import InputField from "@/components/login/InputField";
import LoginOptions from "@/components/login/LoginOptions";
import LogoHeader from "@/components/login/LogoHeader";
import SubmitButton from "@/components/login/SubmitButton";
import React from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submitHandler = (data) => {
    console.log(data);
  };
  return (
    <div className="lg:w-1/2 w-full h-full overflow-y-auto flex flex-col">
      <div className="py-10 md:px-10 md:py-20 lg:py-20 lg:px-20 px-6 w-full flex flex-col gap-8">
        <LogoHeader />
        <h1 className="text-2xl font-semibold">Log into Your Account</h1>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="w-full space-y-8"
        >
          <InputField
            type="email"
            label={"Email"}
            name={"email"}
            register={register}
            errors={errors}
            placeHolder={"Enter Your Email Address"}
          />
          <InputField
            type="password"
            label={"Password"}
            name={"password"}
            register={register}
            errors={errors}
            placeHolder={"Enter Your Password"}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox checked:accent-secondary checked:text-white transition-all ease-in-out duration-500 w-4 h-4"
              />
              <span className="ml-2 text-black/60 text-sm cursor-pointer">
                Remember me
              </span>
            </label>
            <button
              type="button"
              className="text-sm font-medium hover:text-secondary text-black/60 transition-custom"
            >
              Forgot Password?
            </button>
          </div>

          <SubmitButton text={"Login"} />
        </form>
      </div>
      <LoginOptions type={"login"} />
    </div>
  );
};

export default LoginForm;
