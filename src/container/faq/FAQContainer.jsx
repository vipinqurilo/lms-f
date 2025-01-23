import React, { useEffect, useState } from "react";

const FAQContainer = ({ data }) => {
  const [selectedCategory, setselectedCategory] = useState("");
  const [filteredFaqs, setfilteredFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

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
    setfilteredFaqs(
      data?.find((cate) => cate?.categoryName === selectedCategory)?.faqs
    );
  }, [selectedCategory]);

  return (
    <div className="w-full overflow-hidden py-8">
      <div
        className={`w-full text-nowrap flex items-center overflow-x-auto px-4`}
      >
        {data?.map((faq, i) => (
          <button
            onClick={() => setselectedCategory(faq?.categoryName)}
            key={i}
            className={`px-4 uppercase py-2 transition-custom ${
              selectedCategory === faq?.categoryName
                ? "border-b-2 border-secondary font-bold text-secondary"
                : "text-black/40"
            }`}
          >
            {faq?.categoryName}
          </button>
        ))}
      </div>
      <div className="bg-secondary/10 px-5 py-8 w-full">
        <ul>
          {filteredFaqs?.map((faq, index) => (
            <li
              key={index}
              className="border rounded-lg p-4 transition-all duration-200 ease-in-out bg-white"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="flex justify-between items-center w-full font-medium text-lg text-left"
              >
                <span className="font-[900] text-base">{faq.question}</span>
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
                    {Array.isArray(faq?.answer) ? (
                        faq?.answer?.map((ans, i) => (
                            <span key={i} className="block w-full" >-{ans}</span>
                        ))
                    ) : faq?.answer}
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
