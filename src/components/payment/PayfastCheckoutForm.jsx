import React, { useState, useEffect, useRef } from "react";
import BackgroundModal from "../instructor/BackgroundModal";
import { useDispatch, useSelector } from "react-redux";
import { verifyPayfastPayment, clearPayfastCheckoutData, createPaymentCourse } from "../../store/slices/paymentSlice";
import { clearBookingData, createBooking, createBookingAsync } from "../../store/slices/bookingSlice";
import { useRouter } from "next/router";
import Loader from "../common/Loader";
import { createOrder } from "@/store/slices/coursesSlice";

const PayfastCheckoutForm = ({ paymentUrl, setPaymentModal, onClose, mode, paymentFor }) => {
  const [popupBlocked, setPopupBlocked] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const {isLoading} = useSelector((state) => state.booking);
  const [userClosedWindow, setUserClosedWindow] = useState(false);
  const payfastWindowRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  
  // Get payment data from Redux store
  const payfastCheckoutData = useSelector((state) => state.payment.payfastCheckoutData);
  
  // Extract payment ID from store data
  const paymentId = payfastCheckoutData?.data?.paymentId || null;
  
  // Handle countdown and redirection after payment success
  useEffect(() => {
    let timer;
    if (paymentComplete && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (paymentComplete && countdown === 0) {
      // Clear payment data from Redux store before redirecting
      dispatch(clearPayfastCheckoutData());
      dispatch(clearBookingData());
      onClose();
      router.push("/student-dashboard/booking");
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [paymentComplete, countdown, router, dispatch]);
  
  // Initialize popup window and set up verification interval
  useEffect(() => {
    // Only open the window automatically on first mount
    if (paymentUrl && !userClosedWindow && !paymentComplete && !window.paymentWindowOpened) {
      window.paymentWindowOpened = true;
      payfastWindowRef.current = window.open(
        paymentUrl,
        "PayFast Checkout",
        "width=600,height=600,left=300,top=100"
      );

      // Check if popup was blocked
      if (!payfastWindowRef.current) {
        setPopupBlocked(true);
        return;
      }
    }
    
    // Set up verification logic regardless of whether window opened
    if (paymentUrl && !paymentComplete) {
      // Set up interval to verify payment status
      const checkPaymentStatus = () => {
        if (isVerifying || !paymentId) return;
        
        setIsVerifying(true);
        
        // Call API to verify payment status
        dispatch(verifyPayfastPayment(paymentId))
          .unwrap()
          .then(response => {
            if (
              response.status === "success" &&
              response.data && response.data.paymentStatus === 'paid'
            ) {
              console.log("Payment is paid");
               // Close PayFast window if still open
               if (payfastWindowRef.current && !payfastWindowRef.current.closed) {
                console.log("Closing PayFast window");
                payfastWindowRef.current.close();
              }
              // Stop verification interval immediately when payment is paid
              clearInterval(verificationInterval);
              // Create booking first, then process payment completion
              if(paymentFor === "booking"){
              dispatch(createBookingAsync({sessionId: response?.data?.sessionId, mode: mode}))
                .unwrap()
                .then((response) => {
                  // Only complete payment flow after booking is created
                  setPaymentComplete(true);
                  setPaymentDetails(response.data);
                  setUserClosedWindow(true);
                  onClose();
                })
                .catch(error => {
                  console.error("Booking creation error:", error);
                  // Still set isVerifying to false even if booking creation fails
                  setIsVerifying(false);
                });
              }else{
                dispatch(createOrder({sessionId: response?.data?.sessionId, mode: mode}))
                .unwrap()
                .then((response) => {
                  console.log("Order created:", response);
                  setPaymentComplete(true);
                  setPaymentDetails(response.data);
                  setUserClosedWindow(true);
                  onClose();
                })
                .catch(error => {
                  console.error("Order creation error:", error);
                });
              }
            } else {
              setIsVerifying(false);
            }
          })
          .catch(error => {
            console.error("Payment verification error:", error);
            setIsVerifying(false);
          });
      };
      
      // Start verification process after a short delay (let PayFast initialize)
      let initialCheckTimeout = setTimeout(() => {
        checkPaymentStatus();
      }, 5000);
      
      // Set up recurring verification
      const verificationInterval = setInterval(checkPaymentStatus, 10000);
      
      // Monitor for window close - only if we've opened a window
      let windowCheckInterval;
      if (payfastWindowRef.current) {
        windowCheckInterval = setInterval(() => {
          try {
            if (payfastWindowRef.current.closed && !paymentComplete) {
              // If window is closed without payment being completed,
              // mark as user closed and stop checking
              setUserClosedWindow(true);
              clearInterval(windowCheckInterval);
              clearInterval(verificationInterval);
              
              // Continue verification for a short period in case payment was completed
              setTimeout(() => {
                if (!paymentComplete) {
                  // Only clear data if payment wasn't successful after final check
                  dispatch(clearPayfastCheckoutData());
                  dispatch(clearBookingData());
                  setPaymentModal(false);
                }
              }, 5000);
            }
          } catch (error) {
            console.error("Error checking window state:", error);
          }
        }, 1000);
      }
      
      return () => {
        clearTimeout(initialCheckTimeout);
        clearInterval(verificationInterval);
        if (windowCheckInterval) clearInterval(windowCheckInterval);
      };
    }
  }, [paymentUrl, paymentId, isVerifying, paymentComplete, setPaymentModal, userClosedWindow, dispatch]);

  const handleOpenPaymentWindow = () => {
    // Don't open window if payment is already complete
    if (paymentComplete) return;
    
    // Check if payment is already being processed
    if (paymentId) {
      // Verify payment status before opening a new window
      dispatch(verifyPayfastPayment(paymentId))
        .unwrap()
        .then(response => {
          // If payment is already paid, don't open a new window and complete the process
          if (response.status === "success" && 
              response.data && 
              response.data.paymentStatus === 'paid') {
            
            // Create booking and process payment completion
            dispatch(createBooking({sessionId: response?.data?.sessionId}))
              .unwrap()
              .then(() => {
                setPaymentComplete(true);
                setPaymentDetails(response.data);
                return;
              })
              .catch(error => {
                console.error("Booking creation error:", error);
              });
            return;
          }
          
          // If payment failed, don't open a new window
          if (response.status === "success" && 
              response.data && 
              response.data.paymentStatus === 'failed') {
            return;
          }
          
          // Otherwise open a new window
          openPayfastWindow();
        })
        .catch(() => {
          // If verification fails, allow opening a new window
          openPayfastWindow();
        });
    } else {
      // If no payment ID, just open window
      openPayfastWindow();
    }
  };
  
  const openPayfastWindow = () => {
    // Reset the userClosedWindow flag when manually opening
    setUserClosedWindow(false);
    
    const newWindow = window.open(
      paymentUrl,
      "PayFast Checkout",
      "width=600,height=800"
    );
    
    if (newWindow) {
      payfastWindowRef.current = newWindow;
      setPopupBlocked(false);
      
      // Set up tracking for manual window closure
      const checkWindowClosed = setInterval(() => {
        if (newWindow.closed) {
          setUserClosedWindow(true);
          clearInterval(checkWindowClosed);
        }
      }, 1000);
    } else {
      setPopupBlocked(true);
    }
  };

  const handleClose = () => {
    dispatch(clearPayfastCheckoutData());
    dispatch(clearBookingData());
    setPaymentModal(false);
  };

  // Render loading state while booking is being created
  const renderLoadingState = () => {
    return (
      <div className="bg-white rounded-lg p-8 mt-4 w-3/4 max-w-xl text-center relative">
        <div className="absolute top-4 right-4">
          <button className="text-gray-500 hover:text-red-500" onClick={handleClose}>
            Close
          </button>
        </div>
        
        <div className="flex flex-col items-center justify-center py-12">
          <div className="mb-6">
            <Loader text="Creating booking..." color="text-secondary" isBig={true} />
          </div>
          <p className="text-gray-600">
            Your payment was successful. Please wait while we create your booking...
          </p>
        </div>
      </div>
    );
  };

  // Render success modal
  const renderSuccessModal = () => {
    return (
      <div className="bg-white rounded-lg p-8 mt-4 w-3/4 max-w-xl text-center relative">
        <div className="absolute top-4 right-4">
          <button className="text-gray-500 hover:text-red-500" onClick={handleClose}>
            Close
          </button>
        </div>
        
        <div className="flex flex-col items-center justify-center py-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your booking has been confirmed.</p>
          
          <div className="bg-gray-50 w-full p-4 rounded-lg mb-6">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Amount:</span>
              <span className="font-semibold">R {paymentDetails?.amount || "-"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-semibold">{paymentDetails?.transactionId || "-"}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Status:</span>
              <span className="font-semibold text-green-500">Paid</span>
            </div>
            {paymentDetails?.metadata?.sessionTitle && (
              <div className="flex justify-between py-2 border-t border-gray-200">
                <span className="text-gray-600">Session:</span>
                <span className="font-semibold">{paymentDetails.metadata.sessionTitle}</span>
              </div>
            )}
          </div>
          
          <p className="text-gray-500 text-sm">
            Redirecting to your bookings in {countdown} seconds...
          </p>
          
          <button 
            onClick={() => {
              dispatch(clearPayfastCheckoutData());
              dispatch(clearBookingData());
              router.push("/student-dashboard/booking");
            }}
            className="mt-4 px-6 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90"
          >
            Go to My Bookings
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <BackgroundModal
      PropComponent={() => (
        <>
          {paymentComplete ? (
            renderSuccessModal()
          ) : isLoading?.createBookingAsync ? (
            renderLoadingState()
          ) : (
            <div className="bg-white rounded-lg p-4 mt-4 w-3/4 max-w-xl text-center relative">
              <div className="absolute top-4 right-4">
                <button
                  className="text-gray-500 hover:text-red-500"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
              <div className="py-8">
                <h2 className="text-xl mb-4">Processing PayFast Payment</h2>
                {popupBlocked ? (
                  <div className="text-red-500 mb-4">
                    <p>The payment window was blocked by your browser.</p>
                    <p>Please allow popups for this site and try again.</p>
                  </div>
                ) : userClosedWindow ? (
                  <div className="mb-4">
                    <p>You closed the payment window.</p>
                    <p>Click below if you want to reopen it and continue with payment.</p>
                  </div>
                ) : (
                  <p>Please complete your payment in the opened window.</p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  {popupBlocked
                    ? "Click below to try opening the payment window again"
                    : userClosedWindow
                    ? "Click below to reopen the payment window"
                    : "If you don't see the payment window, please click below to reopen it"}
                </p>
                <button
                  className="mt-4 px-6 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90"
                  onClick={handleOpenPaymentWindow}
                >
                  {popupBlocked 
                    ? "Open Payment Window" 
                    : userClosedWindow
                    ? "Reopen Payment Window"
                    : "Reopen Payment Window"}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    />
  );
};

export default PayfastCheckoutForm; 
