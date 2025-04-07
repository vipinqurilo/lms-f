import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearPayfastCheckoutData, verifyPayfastPayment } from '@/store/slices/paymentSlice';
import { createOrder } from '@/store/slices/coursesSlice';
import toast from 'react-hot-toast';

const SuccessFailure = ({ data, isSuccess = true }) => {
  return (
    <div className="w-full remove-scrollbar h-screen flex items-center justify-center bg-black bg-opacity-15 !z-[20] !fixed !top-0 !left-0 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-8 z-[1000] mt-4 w-3/4 max-w-xl text-center relative">
        {/* <div className="absolute top-4 right-4">
          <button
            className="text-gray-500 hover:text-red-500"
            onClick={() => window.location.href = '/'}
          >
            Close
          </button>
        </div> */}
        
        <div className="flex flex-col items-center justify-center gap-6 py-4">
          {isSuccess ? (
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
          
          <h2 className="text-2xl font-bold text-gray-800">
            {isSuccess 
              ? (data?.message || "Course Bought Successfully") 
              : (data?.message || "Payment Failed")}
          </h2>
          
          {isSuccess ? (
            <div className="w-full bg-gray-50 rounded-lg p-4 mt-2">
              <div className="flex flex-col gap-3">
                {/* <h3 className="text-xl font-semibold text-gray-700">{data?.data?.course?.courseTitle}</h3> */}
                <div className="flex justify-between text-sm text-gray-600 border-b pb-2">
                  <span>Amount Paid:</span>
                  <span className="font-medium">₹{data?.data?.amount}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 border-b pb-2">
                  <span>Transaction ID:</span>
                  <span className="font-medium">{data?.data?.transactionId}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Order Date:</span>
                  <span className="font-medium">{new Date(data?.data?.orderDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full bg-gray-50 rounded-lg p-4 mt-2">
              <p className="text-gray-700">
                {data?.error || "There was an error processing your payment. Please try again or contact support."}
              </p>
              {data?.errorCode && (
                <p className="text-sm text-gray-600 mt-2">
                  Error code: {data.errorCode}
                </p>
              )}
            </div>
          )}
          
          <div className="flex gap-4 mt-4">
            {isSuccess ? (
              <>
                <button 
                  onClick={() => window.location.href = `/courses/${data?.data?.course?._id}`}
                  className="px-6 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-all"
                >
                  Go to Course
                </button>
                <button 
                  onClick={() => window.location.href = '/student-dashboard/enrolled-courses'}
                  className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-all"
                >
                  Go to Dashboard
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-all"
                >
                  Try Again
                </button>
                <button 
                  onClick={() => window.location.href = '/dashboard'}
                  className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-all"
                >
                  Go to Dashboard
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PayfastCheckoutForCourse = ({ paymentUrl, onClose }) => {
  const [popupBlocked, setPopupBlocked] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const payfastWindowRef = useRef(null);
  const checkIntervalRef = useRef(null);
  const dispatch = useDispatch();
  
  const payfastCheckoutData = useSelector(
    (state) => state.payment.payfastCheckoutData
  );
  
  // Extract payment ID from store data
  const paymentId = payfastCheckoutData?.data?.paymentId || null;

  // Select payment verification and order creation states from Redux
  const { isLoading, error } = useSelector((state) => ({
    isLoading: state.payment.isLoading["verifyPayfastPayment"],
    error: state.payment.error["verifyPayfastPayment"]
  }));

  const { isLoadingEnrolledCourses } = useSelector((state) => ({
    isLoadingEnrolledCourses: state.courses.isLoading
  }));

  // This ref keeps track of whether polling is active
  const isPollingActiveRef = useRef(false);
  const orderCreationAttemptedRef = useRef(false);

  // Verify payment status using Redux action
  const checkPaymentStatus = async (id) => {
    // Skip if already checking or no payment ID
    if (!id || isLoading) return;
    
    try {
      const resultAction = await dispatch(verifyPayfastPayment(id));
      
      if (verifyPayfastPayment.fulfilled.match(resultAction)) {
        const paymentData = resultAction.payload;
        setPaymentStatus(paymentData);
        
        // Check if payment is successful and order hasn't been created yet
        if (paymentData?.data?.paymentStatus === 'paid' && !orderCreationAttemptedRef.current) {
          // Set flag to prevent multiple order creation attempts
          orderCreationAttemptedRef.current = true;
          
          // Clear intervals and close window
          if (checkIntervalRef.current) {
            clearInterval(checkIntervalRef.current);
            checkIntervalRef.current = null;
          }
          
          // Close PayFast window if still open
          if (payfastWindowRef.current && !payfastWindowRef.current.closed) {
            payfastWindowRef.current.close();
          }
          
          // Create order
          try {
            const orderResult = await dispatch(createOrder({ 
              sessionId: paymentData.data.sessionId, 
              mode: "payfast" 
            }));
            
            if (createOrder.fulfilled.match(orderResult)) {
              toast("Payment successful!", { icon: '✅' });
            } else {
              toast("Payment successful but order creation failed. Please contact support.", { icon: '⚠️' });
            }
          } catch (orderError) {
            console.error("Error creating order:", orderError);
            toast("Error creating order. Please contact support.", { icon: '⚠️' });
          }
        }
      }
    } catch (err) {
      console.error("Error verifying payment:", err);
    }
  };
  
  useEffect(() => {
    // Open the payment window when component mounts
    openPayfastWindow();
    
    // Start polling for payment status if we have a paymentId and not already polling
    if (paymentId && !isPollingActiveRef.current) {
      // Set polling as active
      isPollingActiveRef.current = true;
      
      // Initial verification (with a small delay to avoid race conditions)
      const initialCheckTimeout = setTimeout(() => {
        checkPaymentStatus(paymentId);
      }, 500);
      
      // Set up interval for checking payment status every 3 seconds
      checkIntervalRef.current = setInterval(() => {
        checkPaymentStatus(paymentId);
      }, 4000);
      
      // Cleanup function
      return () => {
        // Clear timeout for initial check
        clearTimeout(initialCheckTimeout);
        
        // Clear interval and reset polling status
        if (checkIntervalRef.current) {
          clearInterval(checkIntervalRef.current);
          checkIntervalRef.current = null;
        }
        
        isPollingActiveRef.current = false;
        orderCreationAttemptedRef.current = false;
        
        // Close window if needed
        if (payfastWindowRef.current && !payfastWindowRef.current.closed) {
          payfastWindowRef.current.close();
        }
      };
    }
    
    // If no payment ID, just handle window cleanup
    return () => {
      if (payfastWindowRef.current && !payfastWindowRef.current.closed) {
        payfastWindowRef.current.close();
      }
    };
  }, [paymentId]);
  
  const openPayfastWindow = () => {
    // If the window is already open, just focus it
    if (payfastWindowRef.current && !payfastWindowRef.current.closed) {
      try {
        payfastWindowRef.current.focus();
        return;
      } catch (error) { 
        console.error("Error focusing window:", error);
      }
    }
    
    // Open a new window
    const newWindow = window.open(
      paymentUrl,
      "PayFast Checkout",
      "width=600,height=600,left=300,top=100"
    );
    
    if (newWindow) {
      payfastWindowRef.current = newWindow;
      setPopupBlocked(false);
      
      // Monitor for window closure
      const checkWindowClosed = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(checkWindowClosed);
          // If window is closed but payment not completed, continue checking
          // as user might have completed payment process but closed window before redirect
        }
      }, 1000);
    } else {
      setPopupBlocked(true);
    }
  };
  
  const cancelPayment = () => {
    // Close the payment window if it's open
    if (payfastWindowRef.current && !payfastWindowRef.current.closed) {
      payfastWindowRef.current.close();
    }
    
    // Clear the interval if it's running
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
      checkIntervalRef.current = null;
    }
    
    // Clear the payment data from Redux store
    dispatch(clearPayfastCheckoutData());
    
    // Show a toast notification
    toast("Payment cancelled", { icon: 'ℹ️' });
    
    // Close the modal
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  };
  
  // Show success/failure component based on payment and order status
  if (paymentStatus?.data?.paymentStatus === 'paid') {
    useEffect(() => {
      // Disable scrolling when modal is mounted
      document.body.style.overflow = 'hidden';
      
      // Re-enable scrolling when modal is unmounted
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, []);
    return (
      <SuccessFailure 
        data={{
          message: isLoadingEnrolledCourses?.["createOrder"] 
            ? "Processing your enrollment..." 
            : "Course Bought Successfully",
          data: {
            course: {
              courseTitle: paymentStatus.data.metadata?.item_name,
              _id: paymentStatus.data.metadata?.courseId
            },
            amount: paymentStatus.data.amount,
            transactionId: paymentStatus.data.transactionId,
            orderDate: paymentStatus.data.createdAt
          }
        }} 
        isSuccess={true} 
      />
    );
  }

  if (error) {
    useEffect(() => {
      // Disable scrolling when modal is mounted
      document.body.style.overflow = 'hidden';
      
      // Re-enable scrolling when modal is unmounted
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, []);
    return (
      <SuccessFailure 
        data={{
          message: "Payment Failed",
          error: error
        }} 
        isSuccess={false} 
      />
    );
  }
  useEffect(() => {
    // Disable scrolling when modal is mounted
    document.body.style.overflow = 'hidden';
    
    // Re-enable scrolling when modal is unmounted
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black bg-opacity-15 !z-[20] !fixed !top-0 !left-0 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-8 z-[1000] mt-4 w-3/4 max-w-xl text-center relative">
        <h2 className="text-xl font-semibold mb-4">PayFast Checkout</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
            {typeof error === 'string' ? error : 'Error verifying payment status'}
          </div>
        )}
        
        {popupBlocked ? (
          <div className="mb-4 text-red-500">
            <p>Popup blocked! Please allow popups and try again.</p>
            <button 
              onClick={openPayfastWindow}
              className="mt-2 px-6 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-all"
            >
              Open Payment Window
            </button>
          </div>
        ) : (
          <div className="mb-4">
            <p>Payment window has been opened.</p>
            <p className="text-sm text-gray-600 mt-2">
              If you closed the payment window, you can reopen it.
            </p>
            <button 
              onClick={openPayfastWindow}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-all"
            >
              Reopen Payment Window
            </button>
          </div>
        )}
        
        <div className="mt-3 text-sm text-gray-500">
          {isLoading || isLoadingEnrolledCourses?.["createOrder"] ? (
            <p className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isLoadingEnrolledCourses?.["createOrder"] ? "Processing enrollment..." : "Verifying payment..."}
            </p>
          ) : paymentStatus?.data ? (
            <p>
              Payment status: 
              <span className="font-medium ml-1">
                {paymentStatus.data.paymentStatus}
              </span>
            </p>
          ) : (
            <p>Checking payment status...</p>
          )}
        </div>
        
        {/* <button 
          onClick={() => cancelPayment()}
          className="mt-4 px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-all"
          disabled={isLoadingEnrolledCourses?.["createOrder"]}
        >
          Cancel Payment
        </button> */}
      </div>
    </div>
  );
};

export default PayfastCheckoutForCourse
