"use client";

const paymentMethods = [
  { id: "wallet", name: "Wallet balance ($390.23)" },
  { id: "bank", name: "Bank transfer" },
  { id: "stripe", name: "Stripe" },
  { id: "authorize", name: "Authorize.net" },
  { id: "paypal", name: "Paypal standard" },
  { id: "paygate", name: "PayGate" },
  { id: "paystack", name: "Paystack" },
];

export function PaymentSelection({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-8 p-4">
      <div>
        <h2 className="text-lg font-semibold mb-4">SELECT A PAYMENT METHOD</h2>
        <div className="space-y-2">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => onSelect(method.id)}
              className={`
                w-full flex items-center justify-between p-4 rounded-lg border
                ${
                  selected === method.id
                    ? "border-orange-500"
                    : "border-gray-200"
                }
                hover:border-orange-500 transition-colors
              `}
            >
              <span>{method.name}</span>
              {selected === method.id && (
                <span className="text-orange-500">✓</span>
              )}
            </button>
          ))}
        </div>
        <p className="text-red-500 text-sm mt-4">
          The order will automatically be cancelled if it isn't paid within 10
          minutes.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">HAVE A COUPON?</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter coupon code"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500"
          />
          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
            Apply
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">SUMMARY</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Lesson Count: 1</span>
              <span>$38.75</span>
            </div>
            <div>Lesson(s) Duration: 15 Mins/lesson</div>
            <div>Item price: $38.75/lesson</div>
            <div>Teach subject: Accounting</div>
            <div className="pt-4 border-t mt-4">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span className="text-orange-500">$38.75</span>
              </div>
            </div>
          </div>

          <button className="w-full mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            Confirm payment
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
