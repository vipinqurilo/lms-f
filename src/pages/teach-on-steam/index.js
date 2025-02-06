import BecomeAnInstructor from "@/container/teach/BecomeAnInstructor";
import RegisterProcess from "@/container/teach/RegisterProcess";
import TeachersBenefits from "@/container/teach/TeachersBenefits";
import TeachStats from "@/container/teach/TeachStats";
import TeachTopSecton from "@/container/teach/TeachTopSecton";
import React from "react";

const index = () => {
  return (
    <div className="w-full font-nunito custom-margin-top">
      <TeachTopSecton />
      <TeachStats />
      <TeachersBenefits />
      <RegisterProcess />
      <BecomeAnInstructor />
    </div>
  );
};

export default index;
