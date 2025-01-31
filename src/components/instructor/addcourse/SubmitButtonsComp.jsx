import CommonButton from "@/components/common/CommonButton";
import React from "react";

const SubmitButtonsComp = ({
  loading,
  handleClick,
  onCancel,
  cancelText,
  saveText,
}) => {
  return (
    <div className="w-full flex items-center justify-between">
      <CommonButton label={cancelText} onClick={onCancel} variant="secondary" />
      <CommonButton
        label={saveText}
        onClick={handleClick}
        variant="primary"
        loading={loading}
      />
    </div>
  );
};

export default SubmitButtonsComp;
