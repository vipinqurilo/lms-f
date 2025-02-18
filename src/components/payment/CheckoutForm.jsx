import React from "react";
import BackgroundModal from "../instructor/BackgroundModal";

const CheckoutForm = ({checkoutUrl, setPaymentModal}) => {
  return (
      <BackgroundModal PropComponent={() => (
        <div className="bg-white rounded-lg p-4 mt-4 w-3/4 h-[90vh]" >
            <div className="absolute top-0 right-0 flex justify-between items-center">
                <button className="text-red-500" onClick={() => setPaymentModal(false)}>Close</button>
            </div>
          <iframe
            src={checkoutUrl}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: "4px",
            }}
            allow="payment"
          />
        </div>
      )}
    />
  );
};

export default CheckoutForm;
