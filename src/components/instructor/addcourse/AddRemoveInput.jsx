import React, { useState } from "react";
import CommonButton from "@/components/common/CommonButton";
import { RxCross1 } from "react-icons/rx";

const AddRemoveInput = ({
  label,
  valueArray,
  setValueArray,
  formValueName,
  setFormValue,
  placeholder,
}) => {
  // State to keep track of the new input value
  const [newItem, setNewItem] = useState("");

  // Function to add the new item
  const handleAddItem = (itemToAdd) => {
    // Prevent adding empty strings
    if (!itemToAdd.trim()) return;
    setValueArray((prev) => {
      const updatedArray = [...prev, itemToAdd];
      setFormValue(formValueName, updatedArray);
      return updatedArray;
    });
    setNewItem(""); // Clear the input after adding
  };

  // Function to remove an item from the list
  const handleRemoveItem = (index) => {
    setValueArray((prev) => {
      const updatedArray = prev.filter((_, i) => i !== index);
      setFormValue(formValueName, updatedArray);
      return updatedArray;
    });
  };

  // Listen for key events on the input field
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddItem(newItem);
    }
  };

  return (
    <div className="col-span-1">
      <label className="block text-sm font-medium text-light mb-2">
        {label}
      </label>

      {/* Display the current items */}
      {valueArray?.length > 0 &&
        valueArray.map((item, index) => (
          <div key={index} className="flex items-start space-x-2 mb-2 w-full justify-between">
            <p className="text-sm  whitespace-normal break-words">
              {item}
            </p>
            <button
              onClick={() => handleRemoveItem(index)}
              className="w-5 h-5 rounded border border-black/10 flex items-center justify-center hover:border-red-100 hover:text-red-500 transition-custom"
            >
              <RxCross1 size={14} />
            </button>
          </div>
        ))}

      {/* Input for adding a new item */}
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        onKeyDown={handleKeyDown}
        className="mt-1 block px-4 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none"
        placeholder={placeholder}
      />
    </div>
  );
};

export default AddRemoveInput;
