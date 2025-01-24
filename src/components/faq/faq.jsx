import React, { useState, useRef } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";const Faq = () => {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("GENERAL QUERIES");
  const contentRefs = useRef([]);

  const faqData = {
    "GENERAL QUERIES": [
      {
        id: 1,
        question: "How can teachers enhance their profiles and make it outstanding?",
        answer:"Teachers can include the YouTube link of their introduc link of their introintroducduc ltheir introduc link of their introintroducduc ltheir introduc link of their introintroducduc ltheir introduc link of their introintroducduc ltheir introduc link of their introintroducduc link of their introduction video to make it more attractive. They can also include relevant information about themselves like biography, skills, experience, and languages which also helps in making their profile outstanding."
       },
      {
        id: 2,
        question: "Is there any feature to record audio and video?",
        answer:
          "Yes, the platform includes features to record audio and video. This allows teachers to create engaging multimedia content for their students.",
      },
      {
        id: 3,
        question: "Can I apply for multiple teaching categories?",
        answer:
          "Yes, you can apply for multiple teaching categories based on your expertise. Make sure to add relevant experience and certifications for each category.",
      },
    ],
    "APPLICATION / REQUIREMENTS": [
      {
        id: 1,
        question: "What are the minimum requirements to apply?",
        answer:
          "The minimum requirements include a valid teaching certification, a completed application form, and at least two years of teaching experience.",
      },
      {
        id: 2,
        question: "Can I apply without a teaching degree?",
        answer:
          "In some cases, relevant work experience or certifications in specialized areas may be accepted in place of a teaching degree.",
      },
    ],
    "APPLY TO TEACH": [
      {
        id: 1,
        question: "How do I submit my application?",
        answer:
          "Applications can be submitted via the platform's application portal. Make sure all required documents are uploaded before submission.",
      },
      {
        id: 2,
        question: "What happens after I apply?",
        answer:
          "Once you apply, your application will be reviewed by the team. If shortlisted, you'll be contacted for the next steps.",
      },
    ],
  };

  const toggleQuestion = (questionId) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setOpenQuestion(null); // Close any open question when switching categories
  };

  const questions = faqData[selectedCategory];

  return (
    <div className="bg-[#F2F2F2] min-h-screen flex flex-col items-center py-2  ">
      {/* Title Section */}
      <div className="bg-white w-full ">
        <div className="text-center mb-10 mt-12">
          <h1 className="text-base font-semibold text-orange-500">FAQ</h1>
          <p className="text-3xl text-black mt-2">Questions? We have answers!!</p>
        </div>

        <div className="flex justify-center space-x-6 text-sm font-medium">
          {Object.keys(faqData).map((category) => (
            <button
              key={category}
              className={`py-3 ${
                selectedCategory === category
                  ? "border-b-2 border-orange-500 text-orange-500"
                  : "text-[#BFBFBF] hover:text-orange-500"
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 w-8/12">
        {/* Search Bar */}
        <div className="w-full mb-8">
          <input
            type="text"
            placeholder="Looking for help? Search your query!"
            className="w-full p-7 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* FAQ Items */}
        <div className="w-full space-y-4">
          {questions.map((item, index) => (
            <div key={item.id} className="border rounded-md overflow-hidden">
              <button
                className="w-full flex justify-between items-center h-24   px-8 bg-white"
                onClick={() => toggleQuestion(item.id)}
              >
                <span className="font-medium text-black text-lg">
                  {item.id}. {item.question}
                </span>
                <span className="text-black text-2xl">
                  {openQuestion === item.id ?<MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
                </span>
              </button>
              <div
                ref={(el) => (contentRefs.current[index] = el)}
                className={`transition-all duration-500 overflow-hidden ${
                  openQuestion === item.id ? "max-h-screen" : "max-h-0"
                }`}
                style={{
                  maxHeight:
                    openQuestion === item.id
                      ? contentRefs.current[index]?.scrollHeight + "px"
                      : "0",
                }}
              >
                <div className="py-4 text-gray-900 flex bg-white justify-center items-center ">
                    
                  <div className=" w-11/12   ">  {item.answer}</div>
                    
                    </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full bg-white h-36 mt-16 flex justify-center items-center">
       <div className="w-8/12  flex justify-between items-center    ">
       <div className="space-y-1">
        <div className="text-2xl font-semibold">Got questions?</div>
        <div className="text-lg  ">Request a call-back</div>
       </div>
       <div className=" bg-[#F89C03] rounded-lg w-40 p-2 flex  justify-center items-center hover:text-white hover:bg-black ">
    <div>
        <button type="button" onclick="alert('Button Clicked!')">Contact us</button>
    </div>
</div>

       </div>
      </div>
    </div>
  );
};

export default Faq;
