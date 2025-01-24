import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("https://skyline-2kje.onrender.com/forgot", { email });
      const { message } = response.data;
      const { data } = response.data;
      toast.success(message);
      setTimeout(() => {
        navigate(`/otp-verification/${data}`);
      }, 2000); // Navigate after 2 seconds to show the toast message
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        toast.error(message);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen -bg--clr-secondary px-4">
      <div className="w-full max-w-md md:max-w-lg lg:w-[40%] lg:-bg--clr-primary p-8 rounded-lg lg:shadow-lg sm:w-[60%] sm:shadow-none">
        <ToastContainer />
        <h1 className="text-2xl lg:text-3xl font-bold text-center mb-3 -text--clr-pumpkin">Trust Finance</h1>
        <h2 className="text-xl lg:text-2xl font-bold mb-6 -text--clr-silver-v1">Forgot Password</h2>
        <form onSubmit={handleForgotPassword} className="space-y-6">
          <div className="flex items-center border-b -border--clr-silver-v1 py-2">
            <FaEnvelope className="-text--clr-silver-v1 mr-3" />
            <input
              type="email"
              placeholder="Email"
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none bg-transparent border-none w-full -text--clr-silver-v1 leading-tight focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="-bg--clr-pumpkin hover:-bg--clr-pumpkin-light text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
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
                "Reset Password"
              )}
            </button>
            <Link to="/" className="inline-block align-baseline font-bold text-sm -text--clr-pumpkin hover:-text--clr-pumpkin-light">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
