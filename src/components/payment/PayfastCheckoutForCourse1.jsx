import React, { useState, useEffect, useRef } from "react";
import BackgroundModal from "../instructor/BackgroundModal";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyPayfastPayment,
  clearPayfastCheckoutData,
} from "../../store/slices/paymentSlice";
import {
  createOrder,
} from "../../store/slices/coursesSlice";
import Loader from "../common/Loader";
import { IoCloseCircleOutline } from "react-icons/io5";

/**
 * PayfastCheckoutForCourse - A specialized component for handling PayFast checkouts for course purchases
 * This component handles the course purchase workflow with minimal required parameters (amount and courseId)
 */
const PayfastCheckoutForCourse1 = ({
  paymentUrl,
  setPaymentModal,
  onClose = () => {},
}) => {
  // Component state
  const [popupBlocked, setPopupBlocked] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [paymentFailed, setPaymentFailed] = useState(false);
  const [failureReason, setFailureReason] = useState("Payment was unsuccessful.");
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

  // Get payment data from Redux store
  const payfastCheckoutData = useSelector(
    (state) => state.payment.payfastCheckoutData
  );
  const { isLoading, error } = useSelector((state) => state.courses);

  // Extract payment ID from store data
  const paymentId = payfastCheckoutData?.data?.paymentId || null;

  // Handle successful payment processing
  const handlePaymentSuccess = (responseData) => {
    // Close PayFast window if still open
    if (payfastWindowRef.current && !payfastWindowRef.current.closed) {
      payfastWindowRef.current.close();
    }

    setIsProcessingPayment(true);

    // Process course order
    dispatch(createOrder({ sessionId: responseData?.sessionId || responseData?.id, mode: "payfast" }))
      .unwrap()
      .then(response => {
        // Update UI state
        setPaymentComplete(true);
        setPaymentDetails(response.data);
        
        // Reset window flag for next payment
        window.paymentWindowOpened = false;
        
        // Start countdown for automatic redirect
        const countdownInterval = setInterval(() => {
          setCountdown(prev => {
            // Redirect when countdown reaches 0
            if (prev <= 1) {
              clearInterval(countdownInterval);
              onClose();
              // Redirect to specific course page instead of dashboard
              const courseId = response.data?.course?._id || response.data?._id;
              if (courseId) {
                window.location.href = `/courses/${courseId}`;
              } 
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      })
      .catch(error => {
        console.error("Course order creation error:", error);
        setIsProcessingPayment(false);
        setPaymentFailed(true);
        setFailureReason(error?.message || "Failed to create course order.");
      });
  };

  // Handle failed payment
  const handlePaymentFailure = (errorMessage) => {
    // Close PayFast window if still open
    if (payfastWindowRef.current && !payfastWindowRef.current.closed) {
      payfastWindowRef.current.close();
    }
    
    // Update UI state
    setPaymentFailed(true);
    setFailureReason(errorMessage || "Payment verification failed.");
    
    // Reset the payment window flag
    window.paymentWindowOpened = false;
  };

  // Handle closing of the modal
  const handleClose = () => {
    // Clean up all intervals
    cleanupAllIntervals();
    
    // Reset flags
    window.paymentWindowOpened = false;
    
    // Close PayFast window if still open
    if (payfastWindowRef.current && !payfastWindowRef.current.closed) {
      payfastWindowRef.current.close();
    }
    
    // Clear Redux data and close modal
    dispatch(clearPayfastCheckoutData());
    setPaymentModal(false);
  };

  // Cleanup function for all intervals
  const cleanupAllIntervals = () => {
    // Clear all interval and timeout references
    if (initialCheckTimeoutRef.current) {
      clearTimeout(initialCheckTimeoutRef.current);
      initialCheckTimeoutRef.current = null;
    }
    
    if (finalCheckTimeoutRef.current) {
      clearTimeout(finalCheckTimeoutRef.current);
      finalCheckTimeoutRef.current = null;
    }
    
    if (verificationIntervalRef.current) {
      clearInterval(verificationIntervalRef.current);
      verificationIntervalRef.current = null;
    }
    
    if (windowCheckIntervalRef.current) {
      clearInterval(windowCheckIntervalRef.current);
      windowCheckIntervalRef.current = null;
    }
    
    // Reset the flag for next payment
    window.paymentWindowOpened = false;
  };

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
        } else if (
          response.status === "success" &&
          response.data &&
          response.data.paymentStatus === "failed"
        ) {
          // Handle failed payment
          console.log("Payment failed");
          handlePaymentFailure("Payment was declined or cancelled.");
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
    if (paymentComplete || isProcessingPayment || paymentFailed) {
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
    if (paymentUrl && !paymentComplete && !isProcessingPayment && !paymentFailed) {
      // Start verification process after a short delay (let PayFast initialize)
      initialCheckTimeoutRef.current = setTimeout(() => {
        checkPaymentStatus();
      }, 5000);

      // Set up recurring verification with a stored reference for proper cleanup
      verificationIntervalRef.current = setInterval(() => {
        // Only verify if not processing and not complete and not failed
        if (!isProcessingPayment && !paymentComplete && !paymentFailed) {
          checkPaymentStatus();
        }
      }, 10000);

      // Monitor for window close - only if we've opened a window
      if (payfastWindowRef.current) {
        windowCheckIntervalRef.current = setInterval(() => {
          try {
            if (payfastWindowRef.current.closed && !paymentComplete && !isProcessingPayment && !paymentFailed) {
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
                if (!paymentComplete && !isProcessingPayment && !paymentFailed) {
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
    paymentFailed,
    userClosedWindow
  ]);

  // Open PayFast window function
  const openPayfastWindow = () => {
    // Skip if already processing or complete
    if (isProcessingPayment || paymentComplete || paymentFailed) return;
    
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
        if (newWindow.closed && !isProcessingPayment && !paymentComplete && !paymentFailed) {
          setUserClosedWindow(true);
          clearInterval(checkWindowClosed);
        } else if (isProcessingPayment || paymentComplete || paymentFailed) {
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
    // Skip if already processing or complete or failed
    if (isProcessingPayment || paymentComplete || paymentFailed) return;

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
            handlePaymentFailure("Payment was declined or cancelled.");
            return;
          }

          // Otherwise open a new window if not processing
          if (!isProcessingPayment && !paymentComplete && !paymentFailed) {
            openPayfastWindow();
          }
        })
        .catch(() => {
          // If verification fails, allow opening a new window if not processing
          if (!isProcessingPayment && !paymentComplete && !paymentFailed) {
            openPayfastWindow();
          }
        });
    } else {
      // If no payment ID, just open window if not processing
      if (!isProcessingPayment && !paymentComplete && !paymentFailed) {
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
            Please wait while we process your course purchase...
          </p>
        </div>
      </div>
    );
  };

  // Render success modal
  const renderSuccessModal = () => {
    // Get the course ID for redirect
    const courseId = paymentDetails?.courseId || paymentDetails?._id;
    
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

        <div className="flex flex-col items-center justify-center gap-6 py-4">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Course Bought Successfully
          </h2>

          <div className="w-full bg-gray-50 rounded-lg p-4 mt-2">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm text-gray-600 border-b pb-2">
                <span>Amount Paid:</span>
                <span className="font-medium">R {paymentDetails?.amount || "-"}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 border-b pb-2">
                <span>Transaction ID:</span>
                <span className="font-medium">{paymentDetails?.transactionId || paymentDetails?.orderId || "-"}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Order Date:</span>
                <span className="font-medium">
                  {paymentDetails?.orderDate ? new Date(paymentDetails.orderDate).toLocaleDateString() : new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <p className="text-gray-500 text-sm">
            Redirecting to your course in {countdown} seconds...
          </p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => {
                dispatch(clearPayfastCheckoutData());
                // Redirect to specific course page if courseId exists
                if (courseId) {
                  window.location.href = `/courses/${courseId}`;
                } 
              }}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-all"
            > 
              Go to Course
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render failure modal
  const renderFailureModal = () => {
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

        <div className="flex flex-col items-center justify-center gap-6 py-4">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800">
            Payment Failed
          </h2>
          
          <div className="w-full bg-gray-50 rounded-lg p-4 mt-2">
            <p className="text-gray-700">
              {failureReason || "There was an error processing your payment. Please try again or contact support."}
            </p>
          </div>

          <div className="flex gap-4 mt-4">
            <button 
              onClick={() => {
                dispatch(clearPayfastCheckoutData());
                setPaymentFailed(false);
                // If we have a paymentUrl, we can try opening the payment window again
                if (paymentUrl) {
                  openPayfastWindow();
                }
              }}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-all"
            >
              Try Again
            </button>
            
            <button 
              onClick={() => {
                dispatch(clearPayfastCheckoutData());
                window.location.href = "/courses";
              }}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-all"
            >
              Back to Courses
            </button>
          </div>
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
          <h2 className="text-xl mb-4">Processing Course Payment</h2>
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
            disabled={isProcessingPayment || paymentComplete || paymentFailed}
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
    } else if (paymentFailed) {
      return renderFailureModal();
    } else if (isProcessingPayment || isLoading?.createOrder) {
      return renderLoadingState();
    } else {
      return renderProcessingModal();
    }
  };

  return (
    <BackgroundModal PropComponent={() => renderModalContent()} />
  );
};

export default PayfastCheckoutForCourse1;