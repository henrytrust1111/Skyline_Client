import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const OTPVerification = () => {
  const { userId } = useParams();
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value.length === 1 && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');

    // Simple form validation
    if (otpValue.length < 6) {
      toast.error("Please enter the complete OTP.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`https://skyline-2kje.onrender.com/verify/${userId}`, {
        userInput: otpValue,
      });

      const { message } = response.data;
      toast.success(message);
      localStorage.setItem('verificationStatus', 'verified');
      // Redirect or show success message
      navigate(`/reset-password/${userId}`);
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        toast.error(message || "Invalid OTP. Please try again.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://skyline-2kje.onrender.com/resend-otp/${userId}`);
      const { message } = response.data;
      toast.success(message);
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        toast.error(message || "An error occurred. Please try again.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <ToastContainer />
      <div className="w-full max-w-md md:max-w-lg lg:w-[40%] bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4 text-orange-600">Trust Finance</h1>
        <h2 className="text-xl font-bold mb-6 text-gray-700">OTP Verification</h2>
        <p className="text-gray-600 mb-6 text-center">
          Please enter the OTP sent to your email. It is valid for 5 minutes.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center space-x-4 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Verify OTP"
              )}
            </button>
            <button
              type="button"
              className="text-sm text-orange-600 hover:underline"
              onClick={resendOTP}
              disabled={isLoading}
            >
              Resend OTP
            </button>
          </div>
        </form>
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-gray-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
