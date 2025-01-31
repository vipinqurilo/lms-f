import React from "react";
import CommonButton from "@/components/common/CommonButton";

const AddRemoveInput = ({
  label,
  valueArray,
  setValueArray,
  formValueName,
  setFormValue,
  placeholder,
}) => {
  const handleAddItem = () => {
    setValueArray((prev) => {
      const updatedArray = [...prev, ""];
      setFormValue(formValueName, updatedArray); // Update the form value
      return updatedArray;
    });
  };

  const handleRemoveItem = (index) => {
    setValueArray((prev) => {
      const updatedArray = prev.filter((_, i) => i !== index);
      setFormValue(formValueName, updatedArray); // Update the form value
      return updatedArray;
    });
  };

  const handleChangeItem = (index, newValue) => {
    const updatedArray = [...valueArray];
    updatedArray[index] = newValue;
    setValueArray(updatedArray);
    setFormValue(formValueName, updatedArray); // Update the form value
  };

  return (
    <div className="col-span-1">
      <label className="block text-sm font-medium text-light mb-2">
        {label}
      </label>
      {valueArray.map((item, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <input
            type="text"
            value={item}
            onChange={(e) => handleChangeItem(index, e.target.value)}
            className="mt-1 block px-4 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none"
            placeholder={placeholder}
          />
          <CommonButton
            label={"X"}
            onClick={() => handleRemoveItem(index)}
            variant="secondary"
          />
        </div>
      ))}
      <CommonButton
        label={`Add ${label}`}
        variant="secondary"
        onClick={handleAddItem}
      />
    </div>
  );
};

export default AddRemoveInput;
