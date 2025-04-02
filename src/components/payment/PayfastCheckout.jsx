import React, { useState, useEffect } from 'react';
import BackgroundModal from '../instructor/BackgroundModal';

const PayfastCheckout = ({ paymentData, paymentUrl, onSuccess, onCancel, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [paymentWindow, setPaymentWindow] = useState(null);
  const [popupBlocked, setPopupBlocked] = useState(false);

  useEffect(() => {
    const handleMessage = (event) => { 
      if (event.origin !== process.env.NEXT_PUBLIC_FRONTEND_URL) return;

      if (event.data.type === 'PAYFAST_PAYMENT_SUCCESS') {
        onSuccess?.();
        closePaymentFlow();
      } else if (event.data.type === 'PAYFAST_PAYMENT_CANCELLED') {
        onCancel?.();
        closePaymentFlow();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
      closePaymentFlow();
    };
  }, [onSuccess, onCancel]);

  useEffect(() => {
    if (isOpen && paymentWindow) {
      const timer = setInterval(() => {
        try {
          if (paymentWindow.closed) {
            clearInterval(timer);
            closePaymentFlow();
          }
        } catch (error) {
          clearInterval(timer);
        }
      }, 500);

      return () => clearInterval(timer);
    }
  }, [isOpen, paymentWindow]);

  const closePaymentFlow = () => {
    if (paymentWindow) {
      paymentWindow.close();
      setPaymentWindow(null);
    }
    setIsOpen(false);
    onClose?.();
  };

  const initiatePayment = () => {
    setIsOpen(true);
    
    const formData = new URLSearchParams();
    Object.entries(paymentData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        formData.append(key, String(value));
      }
    });

    const fullUrl = `${paymentUrl}?${formData.toString()}`;
    
    const childWindow = window.open(
      fullUrl,
      'PayFast Checkout',
      'width=600,height=800,left=300,top=100'
    );

    if (childWindow) {
      setPaymentWindow(childWindow);
      setPopupBlocked(false);
    } else {
      setPopupBlocked(true);
    }
  };

  if (!paymentData || !paymentUrl) {
    return null;
  }

  return (
    <>
      <button
        onClick={initiatePayment}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
      >
        Pay with PayFast
      </button>

      {isOpen && (
        <BackgroundModal PropComponent={() => (
          <div className="bg-white rounded-lg p-4 mt-4 w-3/4 max-w-xl text-center relative">
            <div className="absolute top-4 right-4">
              <button
                className="text-gray-500 hover:text-red-500"
                onClick={closePaymentFlow}
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
                onClick={initiatePayment}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {popupBlocked ? "Open Payment Window" : "Reopen Payment Window"}
              </button>
            </div>
          </div>
        )} />
      )}
    </>
  );
};

export default PayfastCheckout; 