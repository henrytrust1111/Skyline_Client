import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContentTop from "../../components/ContentTop/ContentTop";

const messages = [
  {
    id: 1,
    sender: "Alice",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vulputate, justo vitae.",
    dateTime: "2024-07-08 10:00",
  },
  {
    id: 2,
    sender: "Bob",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
    dateTime: "2024-07-08 11:00",
  },
  {
    id: 3,
    sender: "Charlie",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.",
    dateTime: "2024-07-08 12:00",
  },
];

const MessageComponent = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const data = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const userId = data._id;

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://skyline-2kje.onrender.com/get-admin-message/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data?.data);
      // console.log(userData);
      // toast.success("User data fetched successfully!");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("User not found");
      } else {
        toast.error("Internal Server Error: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="main-content">
        <ContentTop />
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
      </div>
    );
  }

  if (!userData || userData?.length === 0) {
    return (
      <>
        <div className="main-content">
          <ContentTop />
          <div className="text-center flex items-center justify-center -text--clr-silver-v1">
            <div className="-text--clr-white">No Messages Yet</div>
          </div>
        </div>
      </>
    );
  }

  const handleClick = (message) => {
    setSelectedMessage(message);
  };

  const handleClose = () => {
    setSelectedMessage(null);
  };

  console.log(userData);

  return (
    <div className="main-content">
      <ContentTop />
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userData?.map((message, index) => (
            <div
              key={index}
              className="-bg--clr-primary p-4 rounded shadow-md flex flex-col cursor-pointer hover:scale-105 "
              onClick={() => handleClick(message)}
            >
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 -bg--clr-pumpkin text-white flex items-center justify-center rounded-full text-lg font-bold mr-3">
                  {message.sender.charAt(0)}
                </div>
                <div className="flex-1 text-lg font-bold -text--clr-silver">
                  {message.sender}
                </div>
              </div>
              <div className="flex justify-between items-center -text--clr-silver-v1">
                <div className="flex-1">
                  {message.subject?.length > 50
                    ? `${message?.subject.substring(0, 50)}...`
                    : message.subject}
                </div>
                <div className="text-[10px] ml-2">
                  {message.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedMessage && (
          <div className="fixed inset-0 flex items-center justify-center -bg--clr-secondary bg-opacity-50 z-[100]">
            <div className="-bg--clr-primary p-6 rounded shadow-md w-11/12 md:w-1/2 lg:w-1/3 relative -text--clr-silver-v1">
              <h2 className="text-2xl font-bold mb-4">
                {selectedMessage.sender}
              </h2>
              <p>{selectedMessage.message}</p>
              <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageComponent;
