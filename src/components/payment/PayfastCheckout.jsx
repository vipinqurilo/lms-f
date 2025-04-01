import React, { useEffect } from 'react';

const PayfastCheckout = ({ paymentData, paymentUrl, fullPaymentUrl }) => {
  useEffect(() => {
    // Early return if required props are missing
    if (!paymentData || !paymentUrl) {
      console.error('Missing required props:', { paymentData, paymentUrl });
      return;
    }

    console.log('PayFast Checkout Data:', paymentData);
    console.log('Full PayFast URL from backend:', fullPaymentUrl);
    
    // Use the full URL if provided, otherwise build it
    const finalUrl = fullPaymentUrl || (() => {
      const queryParams = new URLSearchParams();
      // Only process if paymentData is an object
      if (typeof paymentData === 'object' && paymentData !== null) {
        Object.entries(paymentData).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            queryParams.append(key, value);
          }
        });
      }
      return `${paymentUrl}?${queryParams.toString()}`;
    })();
    
    console.log('Redirecting to:', finalUrl);
    
    // Redirect to PayFast
    window.location.href = finalUrl;
    
  }, [paymentData, paymentUrl, fullPaymentUrl]);

  // Show loading state if data is missing
  if (!paymentData || !paymentUrl) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">Error: Missing payment data</p>
      </div>
    );
  }

  return (
    <div className="text-center p-4">
      <p>Redirecting to PayFast...</p>
      
      {/* Fallback form in case redirect fails */}
      <form 
        action={fullPaymentUrl || paymentUrl} 
        method="GET" 
        className="hidden"
      >
        {!fullPaymentUrl && typeof paymentData === 'object' && paymentData !== null && 
          Object.entries(paymentData).map(([key, value]) => (
            value !== undefined && value !== null && value !== '' && (
              <input 
                key={key}
                type="hidden"
                name={key}
                value={value}
              />
            )
          ))}
        <button type="submit">
          Continue to PayFast
        </button>
      </form>
    </div>
  );
};

export default PayfastCheckout; 