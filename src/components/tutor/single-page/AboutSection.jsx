import React from "react";
import { useSelector } from "react-redux";

const AboutSection = () => {
  const { tutorProfile } = useSelector((state) => state.tutors);
  return (
    <div>
      {/* About Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          About {tutorProfile?.userId?.firstName} {tutorProfile?.userId?.lastName}
        </h2>
        <p className="text-gray-700">{tutorProfile?.userId?.bio}</p>
      </section>

    </div>
  );
};

export default AboutSection;
