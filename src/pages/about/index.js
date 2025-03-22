import MeetOurTeam from "@/components/about/MeetOurTeam";
import CommonHeading from "@/components/common/CommonHeading";
import AboutContainer from "@/container/about/AboutContainer";
import OurMission from "@/container/about/OurMission";
import PlatformInfo from "@/container/about/PlatformInfo";
import StatsSection from "@/container/about/StatsSection";
import WhoWeAre from "@/container/about/WhoWeAre";
import React from "react";

export default function index() {
  const data = {
    heading: {
      page: "About Us",
      headings:
        "We build an organization dedicated to empowering people with the skills, knowledge, and opportunities they need to learn, grow, and succeed.",
    },
    WhoWeAre: {
      subHeading:
        "Empowering innovation and creativity through STEAM education.",
      description: [
        "The STEAM Institute is dedicated to transforming education by integrating Science, Technology, Engineering, Arts, and Mathematics (STEAM) into a holistic learning experience. Our platform enables learners and educators to engage in interactive, innovative, and inspiring sessions designed to foster critical thinking, creativity, and problem-solving skills. With cutting-edge tools and resources, we create a dynamic ecosystem for learners to thrive in a digital world.",

        "Our platform is equipped with advanced features such as live video sessions, interactive whiteboards, collaborative coding spaces, and digital art tools to facilitate immersive learning. Integrated with secure payment gateways and scalable infrastructure, it ensures seamless transactions and exceptional performance. STEAM Institute also provides Progressive Web App (PWA) support, making education accessible across devices anytime, anywhere.",
      ],
    },
    OurMission: {
      tag: "Our mission & Vision",
      heading: "Get to know about our mission and vision",
      cardsData: [
        {
          icon: "/assets/about/mission.png",
          title: "Innovative Education",
          des: "At STEAM Institute, we provide cutting-edge education through specialized programs that combine science, technology, engineering, arts, and mathematics. Our courses are designed to prepare students for the future.",
        },
        {
          icon: "/assets/about/mission.png",
          title: "Industry Collaborations",
          des: "We collaborate with industry experts and leading companies to offer hands-on experience, internships, and real-world exposure to our students, ensuring they are industry-ready upon graduation.",
        },
        {
          icon: "/assets/about/mission.png",
          title: "Student-Centric Approach",
          des: "Our teaching philosophy is centered around the student. We focus on personalized learning, mentorship, and creating a supportive environment where students can excel and reach their full potential.",
        },
      ],
    },
    PlatformInfo: [
      {
        title: "01. Search",
        content: {
          image: "/assets/about/STEP-1.png",
          title: "Search for Opportunities",
          des: "Explore a wide range of options that fit your needs and preferences. Find the best match that suits your requirements by filtering through various available choices for a personalized experience.",
          link: "https://example.com/search",
          videoLink: "https://www.youtube.com/watch?v=search_step",
        },
      },
      {
        title: "02. Book",
        content: {
          image: "/assets/about/STEP-2.png",
          title: "Book Your Choice",
          des: "After discovering your ideal option, proceed to effortlessly book it. Our platform offers a smooth booking process with just a few clicks, ensuring a hassle-free reservation experience.",
          link: "https://example.com/book",
          videoLink: "https://www.youtube.com/watch?v=book_step",
        },
      },
      {
        title: "03. Learn",
        content: {
          image: "/assets/about/STEP-3.png",
          title: "Learn and Enjoy",
          des: "Once your booking is complete, immerse yourself in a learning journey. Gain valuable insights and enjoy a fulfilling experience, whether it's for personal growth or professional development.",
          link: "https://example.com/learn",
          videoLink: "https://www.youtube.com/watch?v=learn_step",
        },
      },
    ],
    StatsSection: [
      {
        image: "/assets/about/stats1.png",
        stat: "130+",
        description: "Languages Available to Learn",
      },
      {
        image: "/assets/about/stats1.png",
        stat: "10,000+",
        description: "Teachers From 120 Countries",
      },
      {
        image: "/assets/about/stats1.png",
        stat: "5,000,000+",
        description: "Learners From 180 Countries",
      },
    ],
  };
  return (
    <div className="w-full font-nunito custom-margin-top">
      <WhoWeAre data={data?.WhoWeAre} heading={data?.heading} />
      <AboutContainer />
      <StatsSection data={data?.StatsSection} />
      <OurMission data={data?.OurMission} />
      <PlatformInfo tabs={data?.PlatformInfo} />
      <MeetOurTeam />
    </div>
  );
}
