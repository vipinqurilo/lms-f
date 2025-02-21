import React from "react";
import { useRouter } from "next/navigation";
import InstructorButton from "./InstructorButton";
import { RiPresentationLine } from "react-icons/ri";

const TitleComp = ({ heading, des, iscourse = false }) => {
  const router = useRouter();
  return (
    <div className="dashboard-sub-container flex justify-between items-center border-b border-black/10">
      <div className="flex flex-col items-start gap-1">
        <h2 className="text-2xl text-background font-bold">{heading}</h2>
        <p className="max-w-4xl text-light">{des}</p>
      </div>

      {iscourse && (
        <InstructorButton
          icon={<RiPresentationLine size={20} />}
          tab={"Add Course"}
          handleClick={() =>
            router.push("/instructor-dashboard/my-courses/add-course")
          }
          condition={"bg-secondary text-white"}
        />
      )}
    </div>
  );
};

export default TitleComp;
