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
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="bg-white p-10 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-red-500 mb-4">Payment Failed</h1>
                <p className="text-lg text-gray-600">{errorMessage}</p>
                <div className="flex mt-6">
                    <button 
                        onClick={() => router.push("/")}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Retry Payment
                    </button>
                    <button 
                        onClick={() => router.push("/support")}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                    >
                        Contact Support
                    </button>
                    <button 
                        onClick={() => window.close()}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4"
                    >
                        Close Window
                    </button>
                </div>
            </div>
        </div>
    );
};

export default index;