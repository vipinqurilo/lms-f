import React, { useState } from "react";
import BackgroundModal from "../instructor/BackgroundModal";

const CheckoutForm = ({ checkoutUrl, setPaymentModal, setisModalOpen }) => {
  const [popupBlocked, setPopupBlocked] = useState(false);

  React.useEffect(() => {
    if (checkoutUrl) {
      // Open in a new window with specific dimensions
      const stripeWindow = window.open(
        checkoutUrl,
        "Stripe Checkout",
        "width=600,height=600,left=300,top=100"
      );

      // Check if popup was blocked
      if (!stripeWindow) {
        setPopupBlocked(true);
        return;
      }

      // Monitor for window close
      const timer = setInterval(() => {
        try {
          if (stripeWindow.closed) {
            clearInterval(timer);
            setPaymentModal(false);
            setisModalOpen(false);
          }
        } catch (error) {
          // Handle any potential errors when checking window.closed
          clearInterval(timer);
        }
      }, 500);

      return () => clearInterval(timer);
    }
  }, [checkoutUrl]);

  const handleOpenPaymentWindow = () => {
    const newWindow = window.open(
      checkoutUrl,
      "Stripe Checkout",
      "width=600,height=800"
    );
    if (newWindow) {
      setPopupBlocked(false);
    } else {
      setPopupBlocked(true);
    }
  };

  return (
    <BackgroundModal
      PropComponent={() => (
        <div className="bg-white rounded-lg p-4 mt-4 w-3/4 max-w-xl text-center relative">
          <div className="absolute top-4 right-4">
            <button
              className="text-gray-500 hover:text-red-500"
              onClick={() => {
                setPaymentModal(false);
                setisModalOpen(false);
              }}
            >
              Close
            </button>
          </div>
          <div className="py-8">
            <h2 className="text-xl mb-4">Processing Payment</h2>
            {popupBlocked ? (
              <div className="text-red-500 mb-4">
                <p>The payment window was blocked by your browser.</p>
                <p>Please allow popups for this site and try again.</p>
              </div>
            ) : (
              <p>Please complete your payment in the opened window.</p>
            )}
            <p className="text-sm text-gray-500 mt-2">
              {popupBlocked
                ? "Click below to try opening the payment window again"
                : "If you don't see the payment window, please click below to reopen it"}
            </p>
            <button
              className="mt-4 px-6 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90"
              onClick={handleOpenPaymentWindow}
            >
              {popupBlocked ? "Open Payment Window" : "Reopen Payment Window"}
            </button>
          </div>
        </div>
      )}
    />
  );
};

export default CheckoutForm;
