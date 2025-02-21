import React from "react";
import BackgroundModal from "../instructor/BackgroundModal";

const CheckoutForm = ({ checkoutUrl, setPaymentModal }) => {
  React.useEffect(() => {
    if (checkoutUrl) {
      // Open in a new window with specific dimensions
      const stripeWindow = window.open(
        checkoutUrl,
        "Stripe Checkout",
        "width=600,height=600,left=300,top=100"
      );

      // Monitor for window close
      const timer = setInterval(() => {
        if (stripeWindow.closed) {
          clearInterval(timer);
          setPaymentModal(false);
        }
      }, 500);

      return () => clearInterval(timer);
    }
  }, [checkoutUrl]);

  return (
    <BackgroundModal
      PropComponent={() => (
        <div className="bg-white rounded-lg p-4 mt-4 w-3/4 max-w-xl text-center relative">
          <div className="absolute top-4 right-4">
            <button
              className="text-gray-500 hover:text-red-500"
              onClick={() => {
                console.log("Clied");
                setPaymentModal(false);
              }}
            >
              Close
            </button>
          </div>
          <div className="py-8">
            <h2 className="text-xl mb-4">Processing Payment</h2>
            <p>Please complete your payment in the opened window.</p>
            <p className="text-sm text-gray-500 mt-2">
              If you don't see the payment window, please click below to reopen
              it.
            </p>
            <button
              className="mt-4 px-6 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90"
              onClick={() =>
                window.open(
                  checkoutUrl,
                  "Stripe Checkout",
                  "width=600,height=800"
                )
              }
            >
              Reopen Payment Window
            </button>
          </div>
        </div>
      )}
    />
  );
};

export default CheckoutForm;
