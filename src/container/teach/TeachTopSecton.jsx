import TeacherRegisterForm from "@/components/teach/TeacherRegisterForm";
import React from "react";
import { VscWorkspaceTrusted } from "react-icons/vsc";

const TeachTopSecton = () => {
  return (
    <div
      className="w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-12 gap-8 bg-no-repeat bg-center bg-cover custom-container"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.5887605042016807) 0%, rgba(0,0,0,0.6475840336134453) 100%), url("/assets/about/bgimage.png")`,
      }}
    >
      <div data-aos="fade-up" className="">
        <div className="flex items-start gap-3">
          <div className="p-2 text-white bg-green-600 rounded">
            <VscWorkspaceTrusted size={20} />
          </div>
          <h3 className="md:text-xl text-base font-semibold border-b text-white mb-4">
            Trusted by over 15K Users worldwide since 2024
          </h3>
        </div>
        <h1 className="text-2xl lg:text-5xl font-bold mt-2 text-white leading-tight md:mt-2 mb-6">
          Unlock Knowledge,{" "}
          <span className="text-orange-500">Elevate Your </span>Future, Achieve
          Success
        </h1>
      </div>
      <div className="lg:w-[80%] lg:ml-auto">
        <TeacherRegisterForm />
      </div>
    </div>
  );
};

export default TeachTopSecton;
