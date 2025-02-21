import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";

const AddRemoveInput = ({
  label,
  valueArray,
  setValueArray,
  formValueName,
  setFormValue,
  placeholder,
}) => {
  const [newItem, setNewItem] = useState("");

  const handleAddItem = (itemToAdd) => {
    if (!itemToAdd.trim()) return;
    setValueArray((prev) => {
      const updatedArray = [...prev, itemToAdd];
      setFormValue(formValueName, updatedArray);
      return updatedArray;
    });
    setNewItem("");
  };

  const handleRemoveItem = (index) => {
    setValueArray((prev) => {
      const updatedArray = prev.filter((_, i) => i !== index);
      setFormValue(formValueName, updatedArray);
      return updatedArray;
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddItem(newItem);
    }
  };

  return (
    <div className="col-span-1">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {/* Display items with improved UI */}
      {valueArray?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {valueArray.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full text-sm text-gray-700 shadow-sm"
            >
              <span className="mr-3">{item}</span>
              <button
                onClick={() => handleRemoveItem(index)}
                className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-red-600 transition"
              >
                <RxCross1 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input field for adding a new item */}
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary transition outline-none"
        placeholder={placeholder}
      />
    </div>
  );
};

export default AddRemoveInput;
