import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { verifyPayfastPayment } from '@/store/slices/paymentSlice';
import { createBookingAsync } from '@/store/slices/bookingSlice';
import Link from 'next/link';
import axios from 'axios';

const PaymentSuccess = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [verificationStatus, setVerificationStatus] = useState('verifying'); // 'verifying', 'success', 'failed'
  const { session_id } = router.query;
  const [isPopup, setIsPopup] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [verificationAttempted, setVerificationAttempted] = useState(false);

  // Check if in popup window (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsPopup(window.opener && window.opener !== window);
      
      // For popup windows, immediately send the message to parent and close
      if (window.opener && window.opener !== window && session_id) {
        try {
          window.opener.postMessage(
            { type: 'PAYFAST_PAYMENT_COMPLETE', sessionId: session_id },
            window.location.origin
          );
          // Close popup after a short delay to allow the message to be processed
          setTimeout(() => window.close(), 2000);
          setVerificationStatus('success');
        } catch (err) {
          console.error('Error sending message to parent window:', err);
          setVerificationStatus('failed');
        }
      }
    }
  }, [session_id]);

  // Direct API verification for popup windows (no Redux)
  const verifyPaymentDirectly = async (sessionId) => {
    try {
      console.log("Verifying payment directly with session ID:", sessionId);
      // Use updated API path and POST method
      const response = await axios.post(`/api/payment/payfast/verify`, { paymentId: sessionId });
      console.log("Direct verification response:", response.data);
      return response.data;
    } catch (error) {
      console.error('Direct payment verification error:', error);
      return { success: false, error: error.message };
    }
  };

  // Create booking directly without Redux
  const createBookingDirectly = async (sessionId) => {
    try {
      console.log("Creating booking directly with session ID:", sessionId);
      // Use the same API path format as in the Redux store
      const response = await axios.post(`/api/bookings`, { sessionId });
      console.log("Direct booking creation response:", response.data);
      return response.data;
    } catch (error) {
      console.error('Direct booking creation error:', error);
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    const verifyPayment = async () => {
      // Check if we already attempted verification
      if (verificationAttempted) return;
      setVerificationAttempted(true);
      
      // Get session_id from URL or localStorage
      const paymentId = session_id || (typeof window !== 'undefined' && localStorage.getItem('payfast_payment_id'));
      
      if (!paymentId) {
        console.error('No payment ID found');
        setVerificationStatus('failed');
        return;
      }

      try {
        console.log('Verifying payment for session_id:', paymentId);
        
        // Handle verification based on whether we're in a popup
        if (isPopup) {
          // For popup windows, just show success (messaging already done)
          setVerificationStatus('success');
        } else {
          // For parent windows, use Redux to verify and create booking
          let result;
          try {
            result = await dispatch(verifyPayfastPayment(paymentId)).unwrap();
          } catch (error) {
            console.error('Redux verification failed, trying direct API:', error);
            // Fallback to direct API call if Redux fails
            result = await verifyPaymentDirectly(paymentId);
          }
          
          if (result?.success) {
            console.log('Payment verified successfully:', result);
            // Payment verified, now create the booking
            let bookingResult;
            try {
              bookingResult = await dispatch(createBookingAsync({ sessionId: paymentId })).unwrap();
            } catch (error) {
              console.error('Redux booking creation failed, trying direct API:', error);
              // Fallback to direct API call if Redux fails
              bookingResult = await createBookingDirectly(paymentId);
            }
            
            if (bookingResult?.success) {
              console.log('Booking created successfully:', bookingResult);
              setBookingDetails(bookingResult.data);
              setVerificationStatus('success');
              
              // Clear the payment ID from localStorage
              if (typeof window !== 'undefined') {
                localStorage.removeItem('payfast_payment_id');
              }
            } else {
              console.error('Booking creation failed:', bookingResult);
              setVerificationStatus('failed');
            }
          } else {
            console.error('Payment verification failed:', result);
            setVerificationStatus('failed');
          }
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setVerificationStatus('failed');
      }
    };

    // Only run verification if we have session_id or in a parent window
    if ((session_id || (typeof window !== 'undefined' && localStorage.getItem('payfast_payment_id'))) && !isPopup) {
      verifyPayment();
    }
  }, [session_id, dispatch, isPopup, verificationAttempted]);

  const renderContent = () => {
    // For popup windows, show minimal content
    if (isPopup) {
      return (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">Payment Completed!</h2>
          <p className="text-gray-600 mb-4">
            Payment has been processed. This window will close automatically.
          </p>
          <div className="mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary mx-auto"></div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Redirecting back to main window...
          </p>
        </div>
      );
    }

    // Content for parent window
    switch (verificationStatus) {
      case 'verifying':
        return (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Verifying Payment</h2>
            <p className="text-gray-600">Please wait while we verify your payment and create your booking...</p>
            <div className="mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary mx-auto"></div>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">Your booking has been confirmed.</p>
            {bookingDetails && (
              <div className="mb-4">
                <p className="text-gray-700">Session: {bookingDetails.subject?.name || 'Tutoring Session'}</p>
                <p className="text-gray-700">Date: {new Date(bookingDetails.sessionDate).toLocaleDateString()}</p>
                <p className="text-gray-700">Time: {new Date(bookingDetails.sessionStartTime).toLocaleTimeString()}</p>
              </div>
            )}
            <div className="mt-6">
              <Link 
                href="/student-dashboard/bookings"
                className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
              >
                View My Bookings
              </Link>
            </div>
          </div>
        );

      case 'failed':
        return (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-red-600">Payment Verification Failed</h2>
            <p className="text-gray-600 mb-4">
              There was an issue verifying your payment or creating your booking. If you believe this is an error, please contact support.
            </p>
            <div className="mt-6 space-y-3">
              <div>
                <Link 
                  href="/student-dashboard/bookings"
                  className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
                >
                  View My Bookings
                </Link>
              </div>
              <div>
                <Link 
                  href="/support"
                  className="text-secondary hover:underline"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        {renderContent()}
      </div>
    </div>
  );
};

export default PaymentSuccess; 