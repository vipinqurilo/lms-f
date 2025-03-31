import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
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
                    if(res.success){
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

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1 style={{ color: "green" }}>Payment Successful! 🎉</h1>

            {loading && <p>Processing your booking...</p>}

            {error && <p style={{ color: "red" }}>{error}</p>}

            {bookingDetails && (
                <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "8px" }}>
                    <h2>📅 Booking Confirmed!</h2>
                    <p><strong>Teacher:</strong> {bookingDetails?.teacherName}</p>
                    <p><strong>Session:</strong> {bookingDetails?.sessionTitle}</p>
                    <p><strong>Date:</strong> {bookingDetails?.sessionDate}</p>
                    <p><strong>Time:</strong> {bookingDetails?.sessionStartTime}</p>
                    <p><strong>Transaction ID:</strong> {bookingDetails?.transactionId}</p>
                    <p style={{ color: "blue" }}>An email confirmation has been sent to you.</p>
                </div>
            )}
        </div>
    );
};

export default PaymentSuccessPage;
