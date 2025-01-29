import LoginForm from "@/container/login/LoginForm";
import SlideShow from "@/container/login/SlideShow";
import React from "react";

export default function LoginPage() {
  return (
    <div className="w-full flex items-center font-nunito !h-screen">
      <SlideShow />
      <LoginForm />
    </div>
  );
}
