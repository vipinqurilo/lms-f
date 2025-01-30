import React from "react";
import CommonButton from "../common/CommonButton";
import { useRouter } from "next/navigation";

const TitleComp = ({ heading, des, iscourse = false }) => {
  const router = useRouter();
  return (
    <div className="dashboard-sub-container flex justify-between items-center border-b border-black/10">
      <div className="flex flex-col items-start gap-1">
        <h2 className="text-2xl text-background font-bold">{heading}</h2>
        <p className="max-w-4xl text-light">{des}</p>
      </div>

      {iscourse && (
        <CommonButton
          label={"Add Course"}
          onClick={() =>
            router.push("/instructor-dashboard/my-courses/add-course")
          }
          variant="secondary"
        />
      )}
    </div>
  );
};

export default TitleComp;
