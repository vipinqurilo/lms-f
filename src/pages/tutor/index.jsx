import React from "react";
import TutorCard from "../../container/tutorCard/TutorCard";
import TutorFilter from "../../container/tutorCard/TutorFilter";

const index = () => {
  return (
    <div>
      <div className="text-lg bg-light_bg w-full h-screen p-20">
        <TutorFilter />
        <TutorCard />
      </div>
    </div>
  );
};

export default index;
