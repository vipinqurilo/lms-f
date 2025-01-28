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
      headings: ["We build an organization to help people to learn", "online."],
    },
    WhoWeAre: {
      subHeading: " We build an organization to help people to learn online.",
      description: [
        "Platform is a self-hosted solution that helps entrepreneurs to launch online tutoring and consultation platforms where multiple tutors or consultants can register and deliver one-to-one or group online sessions to learners. It is a highly scalable and fully customizable solution to meet the business requirements of the users. The solution is pre-integrated with Cometchat, Lesson Space, and Zoom to support features such as video chat, Whiteboard, Textpad, code editor, multiple screen sharing, etc. which improves the interaction between tutor and learner during an online session.",

        "For seamless payment transactions, Platform is integrated with secured payment gateways like Paypal, Authorize.net, Stripe, Paystack, PayGate, 2Checkout/2CO. It is a complete solution with robust functionalities and essential features that guarantee high performance and competitive results. In addition to this, Platform is also available as PWA.",
      ],
    },
    OurMission: {
      tag: "Our mission & Vision",
      heading: "Get to know about our mission and vision",
      cardsData: [
        {
          icon: "/assets/about/mission.png",
          title: "Innovative Education",
          des: "At Steam Institute, we provide cutting-edge education through specialized programs that combine science, technology, engineering, arts, and mathematics. Our courses are designed to prepare students for the future.",
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
      <OurMission data={data?.OurMission} />
      <MeetOurTeam />
      <PlatformInfo tabs={data?.PlatformInfo} />
      <StatsSection data={data?.StatsSection} />
    </div>
  );
}
