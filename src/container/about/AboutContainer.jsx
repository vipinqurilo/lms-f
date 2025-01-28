import AboutCard from "@/components/about/AboutCard";
import React from "react";

const AboutContainer = () => {
  const data = [
    {
      image: {
        src: "/assets/about/about.jpg",
        alt: "A man working with a book and a play button overlay",
      },
      quote: {
        text: "Making an impact, together",
        author: "Socialy Founder",
      },
      heading: "We empower small business owners",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      highlightedText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    },
    {
      image: {
        src: "/assets/about/about.jpg",
        alt: "A man working with a book and a play button overlay",
      },
      quote: {
        text: "Making an impact, together",
        author: "Socialy Founder",
      },
      heading:
        "We empower small business owners We empower small business owners",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      highlightedText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
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
