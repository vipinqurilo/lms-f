import React, { useState } from "react";
import Image from "next/image";
import { MoveLeft } from "lucide-react";
import { confirmBooking } from "@/store/slices/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";

const BookingConfirmationModel = ({ onClose,bookingId , type}) => {
  const dispatch =useDispatch()
  const {isLoading} = useSelector(state=>state.booking)
  const [showZoomDetails, setShowZoomDetails] = useState(false);
  const [showGoogleMeetDetails, setShowGoogleMeetDetails] = useState(false);
  const [link,setLink]=useState("");
  const handleZoomClick = () => {
    setShowZoomDetails(true);
  };

  const handleGoogleMeetClick = () => {
    setShowGoogleMeetDetails(true);
  };

  const handleConfirmation=()=>{
    if(link!==""){
      const meetingPlatform = showZoomDetails ? "Zoom" : "Google Meet";
      dispatch(confirmBooking({bookingId, link, meetingPlatform})).unwrap().then((res)=>{
        onClose()
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[500px] relative">
        <button onClick={onClose} className="absolute right-4 top-4 z-10">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {!showZoomDetails && !showGoogleMeetDetails ? (
          // ... existing initial view code ...
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Confirmation</h2>
            <p className="text-gray-600 mb-8">Stream. says wants to Confirm</p>

            <div className="flex justify-center gap-8 mb-8">
              <div
                className="text-center cursor-pointer"
                onClick={handleZoomClick}
              >
                <div className="w-16 h-16 shadow-[0_4px_18px_rgba(0,0,0,0.1)] rounded-full flex items-center justify-center mx-auto mb-2">
                  <Image
                    src="/assets/common/zoom.png"
                    alt="Zoom"
                    width={32}
                    height={32}
                  />
                </div>
                <p>Zoom Link</p>
              </div>

              <div
                className="text-center cursor-pointer"
                onClick={handleGoogleMeetClick}
              >
                <div className="w-16 h-16 bg-white shadow-[0_4px_18px_rgba(0,0,0,0.1)] rounded-full flex items-center justify-center mx-auto mb-2">
                  <Image
                    src="/assets/common/meet.png"
                    alt="Google Meet"
                    width={32}
                    height={32}
                  />
                </div>
                <p>Google Meet</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-1/2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-[0_0_4px_rgba(0,0,0,0.1)]"
            >
              Cancel
            </button>
          </div>
        ) : showZoomDetails ? (
          <div className="text-center relative ">
          <button className="absolute text-black top-0 left-0" onClick={()=>setShowZoomDetails(false)}> <MoveLeft/></button>
        {/* Zoom Details View */}
        <div className="mb-6">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto">
            <Image
              src="/assets/common/zoom.png"
              alt="Zoom"
              width={55}
              height={55}
              className=""
            />
          </div>
          <h2 className="text-xl font-semibold mt-2">Zoom Video Details</h2>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 mb-6">
          <div className="text-left">
            <label className="block text-gray-600 mb-1">Meeting Link</label>
            <input value={link} onChange={(e)=>setLink(e.target.value)}
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="https://ncsn,bkjablj"
            />
          </div>
          
        </div>

        {/* Confirm Button */}
        <button onClick={()=>handleConfirmation()} disabled={link===''} className="w-full py-3 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-colors">
          {isLoading?.["confirmBooking"] ? <Loader text={"Confirming..."} /> : "Confirm"}
        </button>
      </div>
        ) : (
          <div className="text-center relative">
            <button
              className="absolute text-black top-0 left-0"
              onClick={() => setShowGoogleMeetDetails(false)}
            >
              <MoveLeft />
            </button>
            
            <div className="mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                <Image
                  src="/assets/common/meet.png"
                  alt="Google Meet"
                  width={55}
                  height={55}
                  className=""
                />
              </div>
              <h2 className="text-xl font-semibold mt-2">Google Meet Details</h2>
            </div>

            <div className="space-y-4 mb-6">
              <div className="text-left">
                <label className="block text-gray-600 mb-1">Meeting Link</label>
                <input value={link} onChange={(e)=>setLink(e.target.value)}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="https://meet.google.com/..."
                />
              </div>
            </div>

            <button onClick={()=>handleConfirmation()} disabled={link===''} className="w-full py-3 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-colors">
              {isLoading?.["confirmBooking"] ? <Loader text={"Confirming..."} /> : "Confirm"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingConfirmationModel;