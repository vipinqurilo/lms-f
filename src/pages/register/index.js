import SlideShow from "@/container/login/SlideShow";
import RegisterForm from "@/container/register/RegisterForm";
import React from "react";

export default function RegisterPage() {
  return (
    <div className="w-full flex items-center font-nunito !h-screen">
      <SlideShow />
      <RegisterForm />
    </div>
  );
}
