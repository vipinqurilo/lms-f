import InputField from "@/components/login/InputField";
import LoginOptions from "@/components/login/LoginOptions";
import LogoHeader from "@/components/login/LogoHeader";
import SubmitButton from "@/components/login/SubmitButton";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resendVerificationEmailAsync, userLoginAsync, verifyLoggedInUser } from "@/store/slices/userSlice";
import Loader from "@/components/common/Loader";
import { useRouter } from "next/router";

const LoginForm = ({ type, setisModalOpen, isModal = false }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const loading = useSelector((state) => state.user.isLoading.userLoginAsync);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch
  } = useForm();

  const reemail = watch("email");
  console.log(reemail,"pppp")

  const [isRememberMe, setisRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");

    if (savedEmail && savedPassword) {
      reset({
        email: savedEmail,
        password: savedPassword,
      });
      setisRememberMe(true);
    }
  }, []);
 

  // const submitHandler = (data) => {
  //   console.log("User Email:", data?.email); // Proper console log
  
  //   if (isRememberMe) {
  //     localStorage.setItem("rememberedEmail", data?.email);
  //     localStorage.setItem("rememberedPassword", data?.password);
  //   } else {
  //     localStorage.removeItem("rememberedEmail");
  //     localStorage.removeItem("rememberedPassword");
  //   }
  
  //   dispatch(userLoginAsync(data))
  //     .unwrap()
  //     .then((res) => {
  //       if (res?.data?.role === "student") {
  //         localStorage.setItem("token", res?.token);
  //         localStorage.removeItem("adminToken");
  //         if (type !== "model") {
  //           router.push("/");
  //         }
  //       } else if (res?.data?.role === "teacher") {
  //         localStorage.setItem("token", res?.token);
  //         localStorage.removeItem("adminToken");
  //         if (type !== "model" && res?.data?.userStatus === "active") {
  //           router.push("/instructor-dashboard");
  //         } else {
  //           router.push("/");
  //         }
  //       } else if (res?.data?.role === "admin") {
  //         localStorage.setItem("adminToken", res?.token);
  //         localStorage.setItem("isAdmin", JSON.stringify(true));
  //         localStorage.removeItem("token");
  //         if (type !== "model") {
  //           router.push("/admin-dashboard");
  //         }
  //       }
  
  //       if (isModal) {
  //         setisModalOpen(false);
  //       }
  
  //       dispatch(verifyLoggedInUser());
  //     })
  //     .catch((err) => {
  //       console.log("Login Error:", err); // Log the full error response
  
  //       if (err === "User is not verified. Please verify your account before logging in.") {
  //         dispatch(resendVerificationEmailAsync(data?.email))
  //           .unwrap()
  //           .then(() => {
  //             // alert("Verification email sent! Please check your inbox.");
  //             router.push("/sendloginverify-email");
  //           })
  //           .catch(() => {
  //             // alert("Failed to resend verification email. Please try again.");
  //           });
  //       } else {
  //         alert(err?.message || "Login failed. Please try again.");
  //       }
  //     });
  // };
  


  const submitHandler = (data) => {
    console.log("User Email:", data?.email); // Proper console log
  
    if (isRememberMe) {
      localStorage.setItem("rememberedEmail", data?.email);
      localStorage.setItem("rememberedPassword", data?.password);
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }
  
    dispatch(userLoginAsync(data))
      .unwrap()
      .then((res) => {
        if (res?.data?.role === "student") {
          localStorage.setItem("token", res?.token);
          localStorage.removeItem("adminToken");
          if (type !== "model") {
            router.push("/");
          }
        } else if (res?.data?.role === "teacher") {
          localStorage.setItem("token", res?.token);
          localStorage.removeItem("adminToken");
          if (type !== "model" && res?.data?.userStatus === "active") {
            router.push("/instructor-dashboard");
          } else {
            router.push("/");
          }
        } else if (res?.data?.role === "admin") {
          localStorage.setItem("adminToken", res?.token);
          localStorage.removeItem("token");
          localStorage.setItem("isAdmin", JSON.stringify(true));
          if (type !== "model") {
            router.push("/admin-dashboard");
          }
        }
  
        if (isModal) {
          setisModalOpen(false);
        }
  
        dispatch(verifyLoggedInUser());
      })
      .catch((err) => {
        console.log("Login Error:", err); // Log the full error response
  
        if (typeof err === "string") {
          console.log("Error String:", err);
        } else if (err?.message) {
          console.log("Error Message:", err.message);
        }

        console.log("Error:", ); // Debugging log
  
        if (err === "User is not verified. Please verify your account before logging in.") {
          dispatch(resendVerificationEmailAsync(data?.email))
            .unwrap()
            .then(() => {
              router.push("/sendloginverify-email");
            })
            .catch((err) => {
              if (err === "Verification email has already been sent. Please check your email.") {
                console.log("Navigating to /notverify"); // Debugging log
                router.push("/notverify");
              } 
              console.log("Failed to resend verification email.");
            });
        } 
        
        else {
          alert(err?.message || "Login failed. Please try again.");
        }
      });
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
                checked={isRememberMe}
                onChange={() => setisRememberMe(!isRememberMe)}
              />
              <span className="ml-2 text-light text-sm cursor-pointer">
                Remember me
              </span>
            </label>
            <button
              type="button"
              className="text-sm font-medium hover:text-secondary text-light transition-custom"
              onClick={() => router.push("/forgot-password")}
            >
              Forgot Password?
            </button>
          </div>
          {
            <SubmitButton
              text={loading ? <Loader /> : "Login"}
              loading={loading}
            />
          }
        </form>
        <LoginOptions type={"login"} />
      </div>
    </div>
  );
};

export default LoginForm;