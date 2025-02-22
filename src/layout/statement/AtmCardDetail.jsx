import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "tailwindcss/tailwind.css";
const AtmCardDetail = () => {
  const [statement, setStatement] = useState();
  const [loading, setLoading] = useState(false);
  const data = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const userId = data?._id;

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://skyline-2kje.onrender.com/card-details/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStatement(response.data.detail);
      console.log(response.data.detail);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // console.log("User not found");
      } else {
        // toast.error("Internal Server Error: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center flex items-center justify-center">
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
      </div>
    );
  }

  if (!statement || statement.length === 0) {
    return (
      <div className="-bg--clr-primary p-6 rounded shadow-md">
      <div className="-text--clr-silver-v1 font-bold">ATM Card Details</div>
      <p className="-text--clr-silver-v1">Please Provide Your Card Details</p>
      <div className="mt-4 space-y-2">
        <div className="p-2 border rounded -text--clr-silver">
          Card Number: XXXX XXXX XXXXX XXXX
        </div>
        <div className="flex space-x-2">
          <div className="flex-1">
            <div className="-text--clr-silver-v1 font-bold">Ex.Date</div>
            <div className="p-2 border rounded -text--clr-silver">
              MM/YY
            </div>
          </div>
          <div className="flex-1">
            <div className="-text--clr-silver-v1 font-bold">Csv</div>
            <div className="p-2 border rounded -text--clr-silver">
              XXX
            </div>
          </div>
          <div className="flex-1">
            <div className="-text--clr-silver-v1 font-bold">Pin</div>
            <div className="p-2 border rounded -text--clr-silver">XXXX</div>
          </div>
        </div>
      </div>
    </div>
    );
  }
  // if (!statement) {
  //   return (
  //     <div className="text-center flex items-center justify-center -text--clr-silver-v1">
  //       <div>Please provide your Card Details</div>
  //     </div>
  //   );
  // }

  //  console.log(statement[0].cardNumber);
  //  const [cardNumber] = statement
  //  console.log(cardNumber);
  return (
    <div className="-bg--clr-primary p-6 rounded shadow-md">
      <div className="-text--clr-silver-v1 font-bold">ATM Card Details</div>
      <div className="mt-4 space-y-2">
        <div className="p-2 border rounded -text--clr-silver">
          {/* Card Number: XXXX XXXX XXXXX XXXX */}
          {statement[0]?.cardNumber}
        </div>
        <div className="flex space-x-2">
          <div className="flex-1">
            <div className="-text--clr-silver-v1 font-bold">Ex.Date</div>
            <div className="p-2 border rounded -text--clr-silver">
              {statement[0]?.expiryDate}
            </div>
          </div>
          <div className="flex-1">
            <div className="-text--clr-silver-v1 font-bold">Csv</div>
            <div className="p-2 border rounded -text--clr-silver">
              {/* XXX */}
              {statement[0]?.cvv}
            </div>
          </div>
          <div className="flex-1">
            <div className="-text--clr-silver-v1 font-bold">Pin</div>
            <div className="p-2 border rounded -text--clr-silver">XXXX</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtmCardDetail;
