import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyPayfastPayment,
  clearPayfastCheckoutData,
} from "../../store/slices/paymentSlice";
import { useRouter } from "next/router";
import Loader from "../common/Loader";
import { createOrder, getAllEnrolledCourses } from "@/store/slices/coursesSlice";

// Dedicated service function for verification to avoid React re-render issues
let verificationInProgress = false;
const verifyPaymentService = async (dispatch, paymentId, onSuccess, onError, onComplete) => {
  if (verificationInProgress) return;
  
  try {
    verificationInProgress = true;
    console.log(`[${new Date().toISOString()}] Verifying payment: ${paymentId}`);
    
    const response = await dispatch(verifyPayfastPayment(paymentId)).unwrap();
    
    if (response.status === "success" && 
        response.data &&  
        response.data.paymentStatus === "paid") {
      console.log(`[${new Date().toISOString()}] Payment successful`);
      if (onSuccess) onSuccess(response.data);
    } else {
      if (onError) onError(response);
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Verification error:`, error);
    if (onError) onError(error);
  } finally {
    verificationInProgress = false;
    if (onComplete) onComplete();
  }
};

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
  const [modalState, setModalState] = useState('processing'); // 'processing', 'loading', 'success'
  console.log(modalState,"modalStatemodalStatemodalState")
  // Refs
  const payfastWindowRef = useRef(null);
  const timerIdsRef = useRef({
    verification: null,
    windowCheck: null,
    initialCheck: null,
    finalCheck: null,
    countdown: null
  });
  const mountedRef = useRef(false);
  const verificationAttemptsRef = useRef(0);
  const maxVerificationAttempts = 8;  // Limit the number of verification attempts
  
  const dispatch = useDispatch();
  const router = useRouter();

  // Get payment data from Redux store
  const payfastCheckoutData = useSelector(
    (state) => state.payment.payfastCheckoutData
  );
  const {perchasedCourse, isLoading: isLoadingEnrolledCourses } = useSelector((state) => state.courses);

  // Extract payment ID from store data
  const paymentId = payfastCheckoutData?.data?.paymentId || null;

  // Clear all timers and intervals
  const clearAllTimers = useCallback(() => {
    Object.keys(timerIdsRef.current).forEach(key => {
      const timerId = timerIdsRef.current[key];
      if (timerId) {
        if (key === 'verification' || key === 'windowCheck') {
          clearInterval(timerId);
        } else {
          clearTimeout(timerId);
        }
        timerIdsRef.current[key] = null;
      }
    });
  }, []);

  // Handle component mount and unmount
  useEffect(() => {
    mountedRef.current = true;
    
    // Ensure modal state is correct on mount based on existing states
    // paymentComplete should have the highest priority
    if (paymentComplete) {
      setModalState('success');
    } else if (isProcessingPayment || isLoadingEnrolledCourses?.["createOrder"]) {
      setModalState('loading');
    } else {
      setModalState('processing');
    }
    
    return () => {
      mountedRef.current = false;
      clearAllTimers();
    };
  }, [clearAllTimers, paymentComplete, isProcessingPayment, isLoadingEnrolledCourses]);

  // Handle successful payment processing
  const handlePaymentSuccess = useCallback((responseData) => {
    if (isProcessingPayment || paymentComplete) return;
    
    // Set loading state first
    setModalState('loading');
    setIsProcessingPayment(true);
    
    // Clear all verification intervals to prevent state changes
    if (timerIdsRef.current.verification) {
      clearInterval(timerIdsRef.current.verification);
      timerIdsRef.current.verification = null;
    }
    
    // Close PayFast window if still open
    if (payfastWindowRef.current && !payfastWindowRef.current.closed) {
      payfastWindowRef.current.close();
    }
    
    // Process the course order
    dispatch(createOrder({ sessionId: responseData?.sessionId, mode: "payfast" }))
      .unwrap()
      .then(response => {
        if (mountedRef.current) {
          // Handle successful order creation
          console.log(`[${new Date().toISOString()}] Order created successfully:`, response);
          
          // Clear any existing countdown timers
          if (timerIdsRef.current.countdown) {
            clearTimeout(timerIdsRef.current.countdown);
            timerIdsRef.current.countdown = null;
          }
          
          // Store the response data directly in payment details
          setPaymentDetails(response.data);
          
          // Update states to show success modal
          setIsProcessingPayment(false);
          setPaymentComplete(true);
          setUserClosedWindow(true);
          setModalState('success');
          
          // Reset countdown to ensure minimum 4 seconds display
          setCountdown(4);
          
          // Only fetch enrolled courses once
          dispatch(getAllEnrolledCourses());
        }
      })
      .catch(error => {
        console.error(`[${new Date().toISOString()}] Course order creation error:`, error);
        if (mountedRef.current) {
          setIsVerifying(false);
          setIsProcessingPayment(false);
          setModalState('processing');
        }
      });
  }, [dispatch, isProcessingPayment, paymentComplete]);

  // Handle window closing
  const handleClose = useCallback(() => {
    clearAllTimers();
    dispatch(clearPayfastCheckoutData());
    setPaymentModal(false);
  }, [clearAllTimers, dispatch, setPaymentModal]);

  // Handle countdown and redirection after payment success
  useEffect(() => {
    // Only start countdown if payment is complete
    if (paymentComplete && countdown > 0) {
      console.log(`[${new Date().toISOString()}] Countdown: ${countdown}`);
      timerIdsRef.current.countdown = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    
    // Cleanup timer on component unmount or countdown change
    return () => {
      if (timerIdsRef.current.countdown) {
        clearTimeout(timerIdsRef.current.countdown);
      }
    };
  }, [paymentComplete, countdown]);

  // Setup payment verification function
  const checkPaymentStatus = useCallback(() => {
    // Increment the verification attempts counter
    verificationAttemptsRef.current += 1;
    
    // Limit the number of verification attempts
    if (verificationAttemptsRef.current > maxVerificationAttempts) {
      console.log(`[${new Date().toISOString()}] Maximum verification attempts reached`);
      clearAllTimers();
      return;
    }
    
    if (!mountedRef.current || isProcessingPayment || paymentComplete || !paymentId) return;
    
    if (!isVerifying) {
      setIsVerifying(true);
      
      verifyPaymentService(
        dispatch,
        paymentId,
        (data) => {
          if (mountedRef.current && !isProcessingPayment && !paymentComplete) {
            handlePaymentSuccess(data);
          }
        },
        () => {
          if (mountedRef.current) {
            setIsVerifying(false);
          }
        }
      );
    }
  }, [dispatch, paymentId, isVerifying, isProcessingPayment, paymentComplete, handlePaymentSuccess, clearAllTimers]);

  // Setup payment window and verification process - consolidated into a single useEffect
  useEffect(() => {
    if (!mountedRef.current || isProcessingPayment || !paymentUrl || !paymentId) {
      return;
    }
    
    // Don't do anything if payment is already complete - this prevents overriding the success state
    if (paymentComplete) {
      return;
    }
    
    // Ensure we're in processing state
    setModalState('processing');
    
    // Clear any existing timers first
    clearAllTimers();
    
    console.log(`[${new Date().toISOString()}] Setting up payment verification for ID: ${paymentId}`);
    
    // Reset verification attempts counter
    verificationAttemptsRef.current = 0;
    
    // Only open the window automatically on first mount if not reopening
    if (paymentUrl && !userClosedWindow && !payfastWindowRef.current) {
      payfastWindowRef.current = window.open(
        paymentUrl,
        "PayFast Checkout",
        "width=600,height=600,left=300,top=100"
      );

      // Check if popup was blocked
      if (!payfastWindowRef.current) {
        setPopupBlocked(true);
      }
    }

    // Initial verification after a delay
    timerIdsRef.current.initialCheck = setTimeout(() => {
      if (mountedRef.current && !paymentComplete) {
        checkPaymentStatus();
      }
    }, 5000);

    // Regular verification interval
    timerIdsRef.current.verification = setInterval(() => {
      if (!mountedRef.current || isProcessingPayment || paymentComplete) {
        // If payment is complete, clear this interval
        if (paymentComplete && timerIdsRef.current.verification) {
          clearInterval(timerIdsRef.current.verification);
          timerIdsRef.current.verification = null;
        }
        return;
      }
      checkPaymentStatus();
    }, 10000);

    // Monitor for window close - only if we've opened a window
    if (payfastWindowRef.current) {
      timerIdsRef.current.windowCheck = setInterval(() => {
        try {
          if (!mountedRef.current) {
            clearAllTimers();
            return;
          }
          
          // Skip window checks if payment is already complete
          if (paymentComplete) {
            // Clear window check interval as it's no longer needed
            if (timerIdsRef.current.windowCheck) {
              clearInterval(timerIdsRef.current.windowCheck);
              timerIdsRef.current.windowCheck = null;
            }
            return;
          }
          
          if (payfastWindowRef.current.closed && !paymentComplete && !isProcessingPayment) {
            setUserClosedWindow(true);
            
            // Clear window check interval
            if (timerIdsRef.current.windowCheck) {
              clearInterval(timerIdsRef.current.windowCheck);
              timerIdsRef.current.windowCheck = null;
            }
            
            // Clear verification interval
            if (timerIdsRef.current.verification) {
              clearInterval(timerIdsRef.current.verification);
              timerIdsRef.current.verification = null;
            }

            // Final verification after window close
            timerIdsRef.current.finalCheck = setTimeout(() => {
              if (!mountedRef.current) return;
              
              if (!paymentComplete && !isProcessingPayment) {
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

    return clearAllTimers;
  }, [
    paymentUrl, 
    paymentId, 
    userClosedWindow, 
    isProcessingPayment, 
    paymentComplete, 
    checkPaymentStatus,
    clearAllTimers,
    dispatch, 
    setPaymentModal
  ]);

  // Open PayFast window function
  const openPayfastWindow = useCallback(() => {
    if (isProcessingPayment || paymentComplete) return;
    
    // If the window is already open, just focus it instead of opening a new one
    if (payfastWindowRef.current && !payfastWindowRef.current.closed) {
      try {
        payfastWindowRef.current.focus();
        return;
      } catch (error) {
        console.error("Error focusing window:", error);
        // If focusing fails, we'll open a new window
      }
    }
    
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
        if (!mountedRef.current) {
          clearInterval(checkWindowClosed);
          return;
        }
        
        if (newWindow.closed && !isProcessingPayment && !paymentComplete) {
          setUserClosedWindow(true);
          clearInterval(checkWindowClosed);
        } else if (isProcessingPayment || paymentComplete) {
          clearInterval(checkWindowClosed);
        }
      }, 1000);
    } else {
      setPopupBlocked(true);
    }
  }, [paymentUrl, isProcessingPayment, paymentComplete]);

  // Handler for opening payment window button
  const handleOpenPaymentWindow = useCallback(() => {
    if (isProcessingPayment || paymentComplete || verificationInProgress) return;
    
    // If window is already open, just focus it
    if (payfastWindowRef.current && !payfastWindowRef.current.closed) {
      try {
        payfastWindowRef.current.focus();
        return;
      } catch (error) {
        console.error("Error focusing window:", error);
      }
    }
    
    if (!paymentId) {
      openPayfastWindow();
      return;
    }
    
    // Set state to loading during verification
    setModalState('loading');
    console.log(`[${new Date().toISOString()}] Manual verification initiated`);
    
    verifyPaymentService(
      dispatch,
      paymentId,
      (data) => {
        if (mountedRef.current && !isProcessingPayment && !paymentComplete) {
          handlePaymentSuccess(data);
        }
      },
      () => {
        if (mountedRef.current && !isProcessingPayment && !paymentComplete) {
          setModalState('processing');
          openPayfastWindow();
        }
      }
    );
  }, [dispatch, paymentId, isProcessingPayment, paymentComplete, handlePaymentSuccess, openPayfastWindow]);

  // Completely rewritten modal implementation to fix overlapping issue
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black bg-opacity-15 !z-[20] !fixed !top-0 !left-0 backdrop-blur-sm">
      {paymentComplete || modalState === 'success' ? (
        <div className="bg-white rounded-lg p-8 z-[1000] mt-4 w-3/4 max-w-xl text-center relative">
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

            {paymentDetails && (
              <div className="bg-gray-50 w-full p-4 rounded-lg mb-6">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Course:</span>
                  <span className="font-semibold max-w-[60%] text-right">
                    {paymentDetails?.course?.courseTitle || "-"}
                  </span>
                </div>
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
            )}

            <button
              onClick={() => {
                dispatch(clearPayfastCheckoutData());
                clearAllTimers();
                router.push("/student-dashboard/enrolled-courses");
              }}
              className="mt-4 px-6 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90"
            >
              Go to My Courses
            </button>
          </div>
        </div>
      ) :modalState === 'loading' ? (
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
      ) :(
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
              disabled={isProcessingPayment || paymentComplete || verificationInProgress}
            >
              {popupBlocked
                ? "Open Payment Window"
                : "Reopen Payment Window"}
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default PayfastCheckoutForCourse; 