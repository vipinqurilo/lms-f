import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

const FAQContainer = ({ data }) => {
  const [selectedCategory, setselectedCategory] = useState("");
  const [filteredFaqs, setfilteredFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    if (data) {
      setselectedCategory(data?.[0]?.categoryName);
      setfilteredFaqs(data?.[0]?.faqs);
    }
  }, []);

  useEffect(() => {
    if (searchTerm !== "") {
      setfilteredFaqs(
        data
          ?.find((cate) => cate?.categoryName === selectedCategory)
          ?.faqs?.filter((faq) =>
            faq?.question?.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    } else {
      setfilteredFaqs(
        data?.find((cate) => cate?.categoryName === selectedCategory)?.faqs
      );
    }
  }, [selectedCategory, searchTerm]);

  return (
    <div className="w-full overflow-hidden py-8">
      <div
        className={`w-full text-nowrap flex items-center md:justify-center gap-2 overflow-x-auto px-4`}
      >
        {data?.map((faq, i) => (
          <button
            onClick={() => setselectedCategory(faq?.categoryName)}
            key={i}
            className={`px-4 uppercase py-2 transition-custom ${
              selectedCategory === faq?.categoryName
                ? "border-b-2 border-secondary font-bold text-secondary"
                : "text-black/40 text-sm"
            }`}
          >
            {faq?.categoryName}
          </button>
        ))}
      </div>
      <div className="bg-secondary/10 px-5 py-8 md:px-10 md:py-10 space-y-6 w-full">
        <div className="relative lg:w-[60%] lg:mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-black/10 p-3 rounded px-4 pl-10 focus:outline-secondary transition-custom"
            placeholder={"Looking for something! Search your query"}
          />

          <IoSearch
            className={`text-xl text-gray-300 absolute top-[50%] left-2 translate-y-[-50%] cursor-pointer`}
          />
        </div>

        <ul className="flex flex-col gap-4 lg:w-[60%] lg:mx-auto">
          {filteredFaqs?.map((faq, index) => (
            <li
              key={index}
              className="border rounded-lg p-4 transition-all duration-200 ease-in-out bg-white"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="flex justify-between items-center w-full font-medium text-lg text-left"
              >
                <span className="font-[700] text-base">
                  {index + 1}. {faq.question}
                </span>
                <svg
                  className={`transition-transform ${
                    activeIndex === index ? "-rotate-0" : "-rotate-90"
                  }`}
                  fill="none"
                  height={24}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width={24}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                  activeIndex === index ? "max-h-[1000px]" : "max-h-0"
                }`}
              >
                <p className="mt-3 text-base leading-7 text-gray-600">
                  {Array.isArray(faq?.answer)
                    ? faq?.answer?.map((ans, i) => (
                        <span key={i} className="block w-full">
                          -{ans}
                        </span>
                      ))
                    : faq?.answer}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FAQContainer;
