import React, { useState, useEffect, useRef } from "react";
import BackgroundModal from "../instructor/BackgroundModal";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyPayfastPayment,
  clearPayfastCheckoutData,
} from "../../store/slices/paymentSlice";
import { useRouter } from "next/router";
import Loader from "../common/Loader";
import { createOrder, getAllEnrolledCourses } from "@/store/slices/coursesSlice";

/**
 * PayfastCheckoutForCourse - A specialized component for handling PayFast checkouts for courses
 * This component handles the course payment workflow specifically, with optimizations to prevent multiple API calls
 */
const PayfastCheckoutForCourse = ({
  paymentUrl,
  setPaymentModal,
  onClose = () => {},
}) => {
  // Component state
  const [popupBlocked, setPopupBlocked] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const [userClosedWindow, setUserClosedWindow] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const payfastWindowRef = useRef(null);
  
  // Interval references for proper cleanup
  const verificationIntervalRef = useRef(null);
  const windowCheckIntervalRef = useRef(null);
  const initialCheckTimeoutRef = useRef(null);
  const finalCheckTimeoutRef = useRef(null);
  
  const dispatch = useDispatch();
  const router = useRouter();

  // Get payment data from Redux store
  const payfastCheckoutData = useSelector(
    (state) => state.payment.payfastCheckoutData
  );
  const { isLoading: isLoadingEnrolledCourses } = useSelector((state) => state.courses);

  // Extract payment ID from store data
  const paymentId = payfastCheckoutData?.data?.paymentId || null;

  // Handle successful payment processing - includes circuit breaker to prevent duplicate calls
  const handlePaymentSuccess = (responseData) => {
    // Skip if already processing or completed payment
    if (isProcessingPayment || paymentComplete) return;
    
    // Set processing flag to prevent duplicate calls
    setIsProcessingPayment(true);
    
    // Close PayFast window if still open
    if (payfastWindowRef.current && !payfastWindowRef.current.closed) {
      payfastWindowRef.current.close();
    }
    
    // Process the course order
    dispatch(createOrder({ sessionId: responseData?.sessionId, mode: "payfast" }))
      .unwrap()
      .then(response => {
        // Only fetch enrolled courses once and if not already complete
        if (!paymentComplete) {
          dispatch(getAllEnrolledCourses());
        }
        completePaymentProcess(response.data);
      })
      .catch(error => {
        console.error("Course order creation error:", error);
        setIsVerifying(false);
        setIsProcessingPayment(false); // Reset processing flag on error
      });
  };

  // Complete the payment process
  const completePaymentProcess = (data) => {
    setPaymentComplete(true);
    setPaymentDetails(data);
    setUserClosedWindow(true);
    if (onClose) onClose();
  };

  // Handle window closing
  const handleClose = () => {
    cleanupAllIntervals();
    dispatch(clearPayfastCheckoutData());
    setPaymentModal(false);
  };

  // Cleanup function for all intervals and timeouts
  const cleanupAllIntervals = () => {
    // Clear all intervals and timeouts
    if (verificationIntervalRef.current) clearInterval(verificationIntervalRef.current);
    if (windowCheckIntervalRef.current) clearInterval(windowCheckIntervalRef.current);
    if (initialCheckTimeoutRef.current) clearTimeout(initialCheckTimeoutRef.current);
    if (finalCheckTimeoutRef.current) clearTimeout(finalCheckTimeoutRef.current);
  };

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
      if (onClose) onClose();
      router.push("/student-dashboard/enrolled-courses");
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [paymentComplete, countdown, router, dispatch, onClose]);

  // Verify payment status
  const checkPaymentStatus = () => {
    // Skip verification if already verifying, processing, completed, or no payment ID
    if (isVerifying || isProcessingPayment || paymentComplete || !paymentId) {
      return;
    }

    setIsVerifying(true);

    // Call API to verify payment status
    dispatch(verifyPayfastPayment(paymentId))
      .unwrap()
      .then((response) => {
        // Check if payment is already paid and we haven't processed it yet
        if (
          response.status === "success" &&
          response.data &&
          response.data.paymentStatus === "paid" &&
          !isProcessingPayment &&
          !paymentComplete
        ) {
          console.log("Payment is paid");
          handlePaymentSuccess(response.data);
        } else {
          setIsVerifying(false);
        }
      })
      .catch((error) => {
        console.error("Payment verification error:", error);
        setIsVerifying(false);
      });
  };

  // Initialize popup window and set up verification interval
  useEffect(() => {
    // Skip setup if payment is already complete or being processed
    if (paymentComplete || isProcessingPayment) {
      return;
    }
    
    // Only open the window automatically on first mount
    if (paymentUrl && !userClosedWindow && !window.paymentWindowOpened) {
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
    if (paymentUrl && !paymentComplete && !isProcessingPayment) {
      // Start verification process after a short delay (let PayFast initialize)
      initialCheckTimeoutRef.current = setTimeout(() => {
        checkPaymentStatus();
      }, 5000);

      // Set up recurring verification with a stored reference for proper cleanup
      verificationIntervalRef.current = setInterval(() => {
        // Only verify if not processing and not complete
        if (!isProcessingPayment && !paymentComplete) {
          checkPaymentStatus();
        }
      }, 10000);

      // Monitor for window close - only if we've opened a window
      if (payfastWindowRef.current) {
        windowCheckIntervalRef.current = setInterval(() => {
          try {
            if (payfastWindowRef.current.closed && !paymentComplete && !isProcessingPayment) {
              // If window is closed without payment being completed,
              // mark as user closed and stop checking
              setUserClosedWindow(true);
              
              // Clear window check interval since window is now closed
              if (windowCheckIntervalRef.current) {
                clearInterval(windowCheckIntervalRef.current);
                windowCheckIntervalRef.current = null;
              }
              
              // Clear verification interval
              if (verificationIntervalRef.current) {
                clearInterval(verificationIntervalRef.current);
                verificationIntervalRef.current = null;
              }

              // Continue verification for a short period in case payment was completed
              finalCheckTimeoutRef.current = setTimeout(() => {
                if (!paymentComplete && !isProcessingPayment) {
                  // Only clear data if payment wasn't successful after final check
                  dispatch(clearPayfastCheckoutData());
                  setPaymentModal(false);
                }
              }, 5000);
            }
          } catch (error) {
            console.error("Error checking window state:", error);
          }
        }, 1000);
      }
    }

    // Cleanup function for unmounting or dependency changes
    return cleanupAllIntervals;
  }, [
    paymentUrl,
    paymentId,
    paymentComplete,
    isProcessingPayment,
    userClosedWindow
  ]);

  // Open PayFast window function
  const openPayfastWindow = () => {
    // Skip if already processing or complete
    if (isProcessingPayment || paymentComplete) return;
    
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
        if (newWindow.closed && !isProcessingPayment && !paymentComplete) {
          setUserClosedWindow(true);
          clearInterval(checkWindowClosed);
        } else if (isProcessingPayment || paymentComplete) {
          // Clear interval if payment is being processed or complete
          clearInterval(checkWindowClosed);
        }
      }, 1000);
    } else {
      setPopupBlocked(true);
    }
  };

  // Handler for opening payment window button
  const handleOpenPaymentWindow = () => {
    // Skip if already processing or complete
    if (isProcessingPayment || paymentComplete) return;

    // Check if payment is already being processed
    if (paymentId) {
      // Verify payment status before opening a new window
      dispatch(verifyPayfastPayment(paymentId))
        .unwrap()
        .then((response) => {
          // If payment is already paid, don't open a new window and complete the process
          if (
            response.status === "success" &&
            response.data &&
            response.data.paymentStatus === "paid" &&
            !isProcessingPayment &&
            !paymentComplete
          ) {
            handlePaymentSuccess(response.data);
            return;
          }

          // If payment failed, don't open a new window
          if (
            response.status === "success" &&
            response.data &&
            response.data.paymentStatus === "failed"
          ) {
            return;
          }

          // Otherwise open a new window if not processing
          if (!isProcessingPayment && !paymentComplete) {
            openPayfastWindow();
          }
        })
        .catch(() => {
          // If verification fails, allow opening a new window if not processing
          if (!isProcessingPayment && !paymentComplete) {
            openPayfastWindow();
          }
        });
    } else {
      // If no payment ID, just open window if not processing
      if (!isProcessingPayment && !paymentComplete) {
        openPayfastWindow();
      }
    }
  };

  // Render loading state while processing payment
  const renderLoadingState = () => {
    return (
      <div className="bg-white rounded-lg p-8 mt-4 w-3/4 max-w-xl text-center relative">
        <div className="absolute top-4 right-4">
          <button
            className="text-gray-500 hover:text-red-500"
            onClick={handleClose}
          >
            Close
          </button>
        </div>

        <div className="flex flex-col items-center justify-center py-12">
          <div className="mb-6">
            <Loader
              text="Loading..."
              color="text-secondary"
              isBig={true}
            />
          </div>
          <p className="text-gray-600">
            Please wait a second while we process your payment...
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
          <button
            className="text-gray-500 hover:text-red-500"
            onClick={handleClose}
          >
            Close
          </button>
        </div>

        <div className="flex flex-col items-center justify-center py-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6">Your course purchase has been confirmed.</p>

          <div className="bg-gray-50 w-full p-4 rounded-lg mb-6">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Amount:</span>
              <span className="font-semibold">
                R {paymentDetails?.amount || "-"}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-semibold">
                {paymentDetails?.transactionId || "-"}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Status:</span>
              <span className="font-semibold text-green-500">Paid</span>
            </div>
          </div>

          <p className="text-gray-500 text-sm">
            Redirecting to your courses in {countdown} seconds...
          </p>

          <button
            onClick={() => {
              dispatch(clearPayfastCheckoutData());
              router.push("/student-dashboard/enrolled-courses");
            }}
            className="mt-4 px-6 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90"
          >
            Go to My Courses
          </button>
        </div>
      </div>
    );
  };

  // Render payment processing modal
  const renderProcessingModal = () => {
    return (
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
              <p>
                Click below if you want to reopen it and continue with
                payment.
              </p>
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
            disabled={isProcessingPayment || paymentComplete}
          >
            {popupBlocked
              ? "Open Payment Window"
              : "Reopen Payment Window"}
          </button>
        </div>
      </div>
    );
  };

  // Determine which modal to render based on state
  const renderModalContent = () => {
    if (paymentComplete) {
      return renderSuccessModal();
    } else if (isProcessingPayment || isLoadingEnrolledCourses?.getAllEnrolledCourses) {
      return renderLoadingState();
    } else {
      return renderProcessingModal();
    }
  };

  return (
    <BackgroundModal PropComponent={() => renderModalContent()} />
  );
};

export default PayfastCheckoutForCourse; 