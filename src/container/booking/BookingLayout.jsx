"use client";

import { ArrowLeft } from "lucide-react";

export function BookingLayout({
  children,
  currentStep,
  title,
  showBack = false,
  onBack,
  onClose,
}) {
  const steps = [1, 2, 3, 4];

  return (
    <div className="fixed w-screen  h-screen top-0 left-0 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="bg-white relative justify-center overflow-hidden rounded-lg w-4/5 h-[90vh]">
        <header className="relative flex items-center justify-center p-4 border-b">
          <div className="absolute left-8  flex items-center gap-4">
            {showBack && (
              <button
                onClick={onBack}
                className="text-gray-600 hover:text-gray-900 flex justify-center items-center  gap-2 "
              >
                <ArrowLeft size={20} /> Back
              </button>
            )}
          </div>
          <h1 className="text-xl py-2 font-semibold">{title}</h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full absolute right-8"
          >
            ✕
          </button>
          <div className="absolute inset-0 bottom-0 translate-y-[50%] flex justify-center p-4 w-fit left-[50%] -translate-x-[50%]">
            <div className="flex items-center gap-6">
              {steps.map((step) => {
                const isActive = step === currentStep;
                const isCompleted = step < currentStep;

                return (
                  <div
                    key={step}
                    className={`
                    w-5 h-5 rounded-full flex items-center justify-center text-xs border
                    ${isActive ? "border-black bg-white text-black" : ""}
                    ${
                      isCompleted
                        ? "border-green-500 bg-green-500 text-white"
                        : ""
                    }
                    ${
                      !isActive && !isCompleted
                        ? "border-gray-200 bg-white text-gray-400"
                        : ""
                    }
                  `}
                  >
                    {isCompleted ? "✓" : step}
                  </div>
                );
              })}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto h-full">{children}</div>
      </div>
    </div>
  );
}
