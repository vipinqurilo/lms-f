import React from "react";
import { useSelector } from "react-redux";

const SpeaksSection = () => {
  const { tutorProfile } = useSelector((state) => state.tutors);
  console.log(tutorProfile, "tutorProfiletutorProfiletutorProfile");
  return (
    <div>
      {/* Speaks Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Speaks</h2>
        <div className="space-y-2">
          {tutorProfile.languagesSpoken?.map((language) => (
            <div>{language.name}</div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SpeaksSection;
