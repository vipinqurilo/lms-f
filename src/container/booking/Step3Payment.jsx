import React from "react";

const Step3Payment = ({ onConfirm, onBack }) => {
  return (
    <div className="p-4 flex">
      {/* Left Section: Payment Method Selection */}
      <div className="w-1/2 pr-4">
        <h2 className="text-lg font-bold mb-4">Select payment method</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            SELECT A PAYMENT METHOD
          </label>
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="bank-transfer"
                name="payment-method"
                value="Bank transfer"
                className="form-radio h-4 w-4 text-secondary border-gray-300"
              />
              <label htmlFor="bank-transfer" className="ml-2">
                Bank transfer
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="paypal-standard"
                name="payment-method"
                value="PayPal standard"
                className="form-radio h-4 w-4 text-secondary border-gray-300"
              />
              <label htmlFor="paypal-standard" className="ml-2">
                PayPal standard
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="authorize-net"
                name="payment-method"
                value="Authorize.net"
                className="form-radio h-4 w-4 text-secondary border-gray-300"
              />
              <label htmlFor="authorize-net" className="ml-2">
                Authorize.net
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="paygate"
                name="payment-method"
                value="PayGate"
                className="form-radio h-4 w-4 text-secondary border-gray-300"
              />
              <label htmlFor="paygate" className="ml-2">
                PayGate
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="paystack"
                name="payment-method"
                value="Paystack"
                className="form-radio h-4 w-4 text-secondary border-gray-300"
              />
              <label htmlFor="paystack" className="ml-2">
                Paystack
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Coupon Application and Summary */}
      <div className="w-1/2 pl-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            HAVE A COUPON?
          </label>
          <div className="mt-2 flex">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="flex-1 p-2 border border-gray-300 rounded-md"
            />
            <button className="ml-2 bg-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-80">
              Apply
            </button>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold">SUMMARY</h3>
          <div className="mt-2 space-y-2">
            <div className="flex justify-between">
              <span>Lesson Count:</span>
              <span>1</span>
            </div>
            <div className="flex justify-between">
              <span>Lesson(s) Duration:</span>
              <span>15 Mins/lesson</span>
            </div>
            <div className="flex justify-between">
              <span>Item price:</span>
              <span>$38.75/lesson</span>
            </div>
            <div className="flex justify-between">
              <span>Teach subject:</span>
              <span>Accounting</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>$38.75</span>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          * All purchases are in USD. Foreign transaction fees might apply according to your bank policies.
        </div>
        <div className="text-sm text-gray-600 mb-4">
          The order will automatically be cancelled if it isn't paid within 10 minutes.
        </div>
      </div>

      {/* Back and Confirm Payment Buttons */}
      <div className="flex justify-between mt-6 w-full">
        <button
          onClick={onBack}
          className="border border-secondary text-secondary px-4 py-2 rounded-md hover:bg-orange-50"
        >
          Back
        </button>
        <button
          onClick={onConfirm}
          className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-80"
        >
          Confirm payment
        </button>
      </div>
    </div>
  );
};

export default Step3Payment;