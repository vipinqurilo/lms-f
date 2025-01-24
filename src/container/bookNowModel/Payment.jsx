import React from 'react';

const Payment = ({ bookingData, updateBookingData }) => {
  const handleChange = (e) => {
    updateBookingData({ paymentMethod: e.target.value });
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
      <div>
        <label className="flex items-center mb-2">
          <input
            type="radio"
            name="paymentMethod"
            value="creditCard"
            checked={bookingData.paymentMethod === 'creditCard'}
            onChange={handleChange}
            className="mr-2"
          />
          Credit Card
        </label>
        <label className="flex items-center mb-2">
          <input
            type="radio"
            name="paymentMethod"
            value="paypal"
            checked={bookingData.paymentMethod === 'paypal'}
            onChange={handleChange}
            className="mr-2"
          />
          PayPal
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="paymentMethod"
            value="bankTransfer"
            checked={bookingData.paymentMethod === 'bankTransfer'}
            onChange={handleChange}
            className="mr-2"
          />
          Bank Transfer
        </label>
      </div>
    </div>
  );
};

export default Payment;
