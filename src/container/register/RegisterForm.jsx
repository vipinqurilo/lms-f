import InputField from "@/components/login/InputField";
import LoginOptions from "@/components/login/LoginOptions";
import LogoHeader from "@/components/login/LogoHeader";
import SubmitButton from "@/components/login/SubmitButton";
import { userRegisterAsync } from "@/store/slices/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const RegisterForm = () => {
  const loading = useSelector(
    (state) => state.user.isLoading.userRegisterAsync
  );

  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submitHandler = (data) => {
    // console.log(data);
    dispatch(userRegisterAsync(data))
      .unwrap()
      .then((res) => {
        console.log(res);
        router.push("/login");
      });
  };
  return (
    <div className="lg:w-1/2 w-full h-full overflow-y-auto flex flex-col">
      <div className="py-10 md:px-10 md:py-20 lg:px-20 px-6 w-full flex flex-col gap-8">
        <LogoHeader />
        <h1 className="text-2xl font-semibold">Create New Account</h1>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="w-full space-y-8"
        >
          <InputField
            type="text"
            label={"Full Name"}
            name={"name"}
            register={register}
            errors={errors}
            placeHolder={"Enter Your Full Name"}
          />
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

          <div className="">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register("terms", {
                  required: "You must agree to the terms and conditions",
                })}
                className="form-checkbox checked:accent-secondary checked:text-white transition-all ease-in-out duration-500 w-4 h-4"
              />
              <span className="ml-2 text-light text-sm cursor-pointer">
                I agree to the{" "}
                <Link href={"/"} className="text-primary font-bold">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href={"/"} className="text-primary font-bold">
                  Privacy Policy.
                </Link>
              </span>
            </label>
            {errors.terms && (
              <p className="text-red-500 text-sm mt-1">
                *{errors.terms.message}
              </p>
            )}
          </div>

          <SubmitButton text={loading ? <Loader /> : "Register"} />
        </form>
      </div>
      <LoginOptions type={"register"} />
    </div>
  );
};

export default RegisterForm;
