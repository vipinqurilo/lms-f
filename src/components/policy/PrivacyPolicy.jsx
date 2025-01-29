import React from "react";

const PrivacyPolicyComp = ({ data }) => {
  return (
    <div className="custom-container">
      <ul className="space-y-6">
        {data?.map((section, index) => (
          <div key={index} className="space-y-2">
            <h2 className="text-xl font-bold ">{section.title}</h2>
            <li className="text-light list-disc ml-5">{section.description}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default PrivacyPolicyComp;
