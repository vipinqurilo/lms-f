import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { createBookingAsync } from "@/store/slices/bookingSlice";

const PaymentSuccessPage = () => {
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [bookingDetails, setBookingDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (sessionId) {
            dispatch(createBookingAsync({ sessionId }))
                .unwrap()
                .then(res => {
                    if (res.success) {
                        setBookingDetails(res.data);
                        setLoading(false);
                        setError("");
                    } else {
                        setError("Booking failed. Please contact support.");
                        setLoading(false);
                    }
                })
                .catch(() => {
                    setError("Booking failed. Please contact support.");
                    setLoading(false);
                });
        }
    }, [sessionId, dispatch]);

    const handleReturnHome = () => {
        if (window.opener && !window.opener.closed) {
            window.opener.location.href = '/';
            window.close();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
                {loading ? (
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-lg text-gray-600">Processing your booking...</p>
                    </div>
                ) : error ? (
                    <div className="text-center">
                        <div className="text-red-500 text-xl mb-4">❌</div>
                        <p className="text-red-500 text-lg">{error}</p>
                    </div>
                ) : bookingDetails && (
                    <div className="space-y-6">
                        <div className="text-center">
                            <div className="text-green-500 text-4xl mb-2">✅</div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
                            <p className="text-gray-600">Your booking has been confirmed</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <p className="text-gray-600">Teacher</p>
                                    <p className="font-semibold text-gray-800">{bookingDetails.teacherName}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-gray-600">Session</p>
                                    <p className="font-semibold text-gray-800">{bookingDetails.sessionTitle}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-gray-600">Date</p>
                                    <p className="font-semibold text-gray-800">
                                        {new Date(bookingDetails.sessionDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-gray-600">Time</p>
                                    <p className="font-semibold text-gray-800">
                                        {new Date(bookingDetails.sessionDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-gray-200">
                                <p className="text-gray-600">Transaction ID</p>
                                <p className="font-mono text-sm text-gray-800">{bookingDetails.transactionId}</p>
                            </div>
                        </div>

                        <div className="text-center space-y-4">
                            <p className="text-blue-600">
                                <span className="inline-block animate-bounce mr-2">📧</span>
                                An email confirmation has been sent to you
                            </p>
                            <button
                                onClick={handleReturnHome}
                                className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 transform hover:scale-105"
                            >
                                Return to Home Screen
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
