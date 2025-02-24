import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const index = () => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("Payment was unsuccessful.");
    useEffect(() => {
        // Get error from query params after component mounts
        if (router.query.error) {
            setErrorMessage(router.query.error);
        }
    }, [router.query]);

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1 style={{ color: "red" }}>❌ Payment Failed</h1>
            <p style={{ fontSize: "18px", color: "#555" }}>{errorMessage}</p>

            <div style={{ marginTop: "20px" }}>
                <button 
                    onClick={() => router.push("/")}
                    style={{
                        padding: "10px 20px",
                        margin: "10px",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: "#ff4d4d",
                        color: "#fff",
                        cursor: "pointer"
                    }}
                >
                    🔄 Retry Payment
                </button>

                <button 
                    onClick={() => router.push("/support")}
                    style={{
                        padding: "10px 20px",
                        margin: "10px",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        cursor: "pointer"
                    }}
                >
                    📞 Contact Support
                </button>
            </div>
        </div>
    );
};

export default index;