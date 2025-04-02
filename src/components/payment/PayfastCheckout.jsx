import React, { useState, useEffect } from 'react';
import BackgroundModal from '../instructor/BackgroundModal';

const PayfastCheckout = ({ paymentData, paymentUrl, onSuccess, onCancel, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [paymentWindow, setPaymentWindow] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('pending');

  useEffect(() => {
    const handleMessage = (event) => {
      // Verify origin for security
      if (event.origin !== process.env.NEXT_PUBLIC_FRONTEND_URL) return;

      if (event.data.type === 'PAYFAST_PAYMENT_SUCCESS') {
        setPaymentStatus('success');
        onSuccess?.();
        closePaymentFlow();
      } else if (event.data.type === 'PAYFAST_PAYMENT_CANCELLED') {
        setPaymentStatus('cancelled');
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
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = paymentUrl;
    form.target = 'payfast_window';

    Object.entries(paymentData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      }
    });

    document.body.appendChild(form);

    const childWindow = window.open(
      'about:blank',
      'payfast_window',
      'width=550,height=750,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0'
    );

    if (childWindow) {
      setPaymentWindow(childWindow);
      form.submit();
    } else {
      alert('Please allow popups for this website to make payments');
      setIsOpen(false);
    }

    document.body.removeChild(form);
  };

  const PaymentModalContent = () => (
    <div className="bg-white rounded-lg p-6 max-w-md w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">
          PayFast Payment
        </h2>
        <button
          onClick={closePaymentFlow}
          className="text-gray-400 hover:text-gray-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="mt-4">
        {paymentStatus === 'pending' && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Processing your payment...</p>
            <p className="text-sm text-gray-500 mt-2">
              Please complete the payment in the popup window.
              If you can't see it, click the button below.
            </p>
            <button
              onClick={initiatePayment}
              className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Reopen Payment Window
            </button>
          </div>
        )}

        {paymentStatus === 'success' && (
          <div className="text-center py-4">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-900 font-medium">Payment Successful!</p>
          </div>
        )}

        {paymentStatus === 'cancelled' && (
          <div className="text-center py-4">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-gray-900 font-medium">Payment Cancelled</p>
            <button
              onClick={initiatePayment}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );

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
        <BackgroundModal PropComponent={PaymentModalContent} />
      )}
    </>
  );
};

export default PayfastCheckout; 