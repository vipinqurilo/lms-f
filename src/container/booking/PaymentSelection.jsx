"use client";

import { Check } from "lucide-react";
import { FaTag } from "react-icons/fa";
import { useSelector } from "react-redux";

const paymentMethods = [
  { id: "bank", name: "Bank transfer" },
  { id: "stripe", name: "Stripe" },
  { id: "paypal", name: "Paypal standard" },
  { id: "paygate", name: "PayGate" },
  { id: "paystack", name: "Paystack" },
];

export function PaymentSelection({
  tutor,
  duration,
  subject,
  scheduledDate,
  selected,
  onSelect,
  handlePayment,
  price,
}) {
  const { isLoading, error } = useSelector((state) => ({
    isLoading: state.payment.isLoading.createPaymentIntent,
    error: state.payment.error.createPaymentIntent
  }));
  return (
    <div className="lg:grid grid-cols-2 gap-8 p-8">
      <div>
        <h2 className="text-sm  mb-4 text-[#040404]">
          SELECT A PAYMENT METHOD
        </h2>
        <div className="space-y-2">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => onSelect(method.id)}
              className={`
                w-full flex items-center justify-start gap-6 p-4  border
                ${
                  selected === method.id
                    ? "border-secondary"
                    : "border-gray-200"
                }
                hover:border-secondary transition-colors
              `}
            >
              {selected === method.id ? (
                <span className="text-white rounded-full p-[2px] bg-secondary">
                  <Check size={16} />
                </span>
              ) : (
                <span className="text-white rounded-full p-[2px] bg-[#E6E6E6]">
                  <Check size={16} />
                </span>
              )}
              <span className="text-sm font-semibold">{method.name}</span>
            </button>
          ))}
        </div>
        <p className="text-red-500 text-sm mt-4">
          The order will automatically be cancelled if it isn't paid within 10
          minutes.
        </p>
      </div>

      <div>
        <h2 className="text-sm  mb-4 text-[#040404]">HAVE A COUPON?</h2>
        <div className="flex gap-2 relative">
          <FaTag className="absolute top-[50%] text-gray-300 -translate-y-[50%] left-5" />
          <input
            type="text"
            placeholder="Enter coupon code"
            className="flex-1  py-2 px-12 border-2 border-gray-200 border-dotted focus:outline-none"
          />
          <div className="px-4 flex justify-center rounded-lg cursor-pointer items-center absolute right-5  h-[32px] text-sm top-[50%] -translate-y-[50%]  bg-black text-white hover:bg-secondary">
            Apply
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-sm mb-4">SUMMARY</h2>
          <div className="space-y-2 leading-3 text-xs border p-3 px-6">
            <div className="flex justify-between text-xs">
              <span>Lesson Count: 1</span>
              <span>${(price * duration / 60).toFixed(2)}</span>
            </div>
            <div>Lesson(s) Duration: {duration} Minutes</div>
            <div>Item price: ${(price * duration / 60).toFixed(2)}</div>
            <div>Teach subject: {subject?.name}</div>
            <div className="pt-4 border-t mt-4">
              <div className="flex justify-between font-medium text-secondary">
                <span>Total</span>
                <span className="">${(price * duration / 60).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="w-full mt-4 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-black"
          >
            {isLoading["createPaymentIntent"] ? "Processing..." : "Confirm payment"}
          </button>

          <p className="text-sm text-gray-500 mt-4 text-center">
            * All purchases are in USD Foreign transaction fees might apply
            according to your bank policies
          </p>
        </div>
      </div>
    </div>
  );
}
