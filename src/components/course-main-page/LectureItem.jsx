import { useState, useRef, useEffect } from "react";
import { BiPlayCircle, BiSolidLockAlt } from "react-icons/bi";
import { FaRegFilePdf } from "react-icons/fa";

const LectureItem = ({ lecture, index, i, isAccessible }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="w-full">
      <h6
        className="flex items-start gap-1 w-full cursor-pointer"
        onClick={() =>
          activeIndex === i ? setActiveIndex(null) : setActiveIndex(i)
        }
      >
        {isAccessible ? (
          <>
            {/* <BiPlayCircle className="text-secondary text-lg" /> */}
          </>
        ) : (
          <BiSolidLockAlt className="text-black/60 text-lg" />
        )}
        <p
          className={`font-medium transition-custom flex items-center justify-between w-full ${
            isAccessible ? "hover:text-secondary" : "text-black/60"
          }`}
        >
          Lecture {index + 1}.{i + 1} {lecture?.lessonTitle}
          <svg
            className={`transition-transform ${
              activeIndex === i ? "-rotate-0" : "-rotate-90"
            }`}
            fill="none"
            height={20}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            width={20}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </p>
      </h6>

      <div
        className={`mt-2 w-full text-sm pl-4 ${
          activeIndex === i ? "block" : "hidden"
        }`}
      >
        {lecture?.attachements?.length > 0 && (
          <ul className="space-y-2 w-full">
            {lecture?.attachements?.map((attachment) => (
              <li
                key={attachment?._id}
                className="flex items-center gap-5 justify-between w-full"
              >
                <div className="flex items-center gap-2 text-gray-800">
                  <FaRegFilePdf className="text-red-500 text-lg" />
                  <span>{attachment?.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://docs.google.com/gview?url=${attachment?.url}&embedded=true`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-secondary hover:underline ${
                      !isAccessible ? "pointer-events-none opacity-50" : ""
                    }`}
                  >
                    View
                  </a>

                  <a
                    href={attachment?.url}
                    download={attachment?.name}
                    className={`text-green-600 hover:underline ${
                      !isAccessible ? "pointer-events-none opacity-50" : ""
                    }`}
                  >
                    Download
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LectureItem;
