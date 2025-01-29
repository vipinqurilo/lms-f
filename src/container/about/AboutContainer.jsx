import AboutCard from "@/components/about/AboutCard";
import React from "react";

const AboutContainer = () => {
  const data = [
    {
      image: {
        src: "/assets/about/about1.webp",
        alt: "A student engaging in STEAM activities with creative tools",
      },
      quote: {
        text: "Inspiring innovation through education",
        author: "STEAM Institute Founder",
      },
      heading:
        "We inspire learners through STEAM education and innovative practices",
      description:
        "At Steam Institute, we focus on fostering creativity, innovation, and problem-solving skills through a comprehensive and inclusive STEAM curriculum. Our interactive platform connects learners with educators to explore science, technology, engineering, arts, and mathematics in a dynamic and engaging way. We believe in nurturing talent to create impactful change through knowledge, collaboration, and innovation. With advanced tools, modern methodologies, and diverse resources, we are shaping the future of education through pioneering STEAM initiatives designed for global impact.",
      highlightedText:
        "Unlock the potential of STEAM learning with cutting-edge tools, innovative educational approaches, and a focus on fostering lifelong curiosity and discovery.",
    },
    {
      image: {
        src: "/assets/about/about2.webp",
        alt: "A student engaging in STEAM activities with creative tools",
      },
      quote: {
        text: "Inspiring innovation through education",
        author: "STEAM Institute Founder",
      },
      heading:
        "Empowering minds through STEAM education for a brighter, smarter future",
      description:
        "Steam Institute is dedicated to building an educational platform that integrates science, technology, engineering, arts, and mathematics into a holistic, well-rounded learning experience. By combining creativity, technical skills, and innovation, we empower learners to achieve their potential, think critically, and excel in the modern, competitive world. Our mission is to make STEAM education accessible to everyone, providing the tools, resources, and guidance needed to succeed in a constantly evolving environment, ensuring long-term impact and success for learners worldwide.",
      highlightedText:
        "Explore a new world of STEAM education where creativity meets technology. Empower learners to make an impact through innovative, forward-thinking learning solutions.",
    },
  ];

  return (
    <section data-aos="fade-up" className="custom-container space-y-20">
      {data?.map((card, index) => (
        <AboutCard data={card} key={index} index={index} />
      ))}
    </section>
  );
};

export default AboutContainer;
