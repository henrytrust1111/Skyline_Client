import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../layout/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import ContactFormModal from "./ContactFormModal";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBlance] = useState(false);
  const data = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const userId = data._id;

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `https://skyline-2kje.onrender.com/view-me/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setBlance(response.data.user);
      // toast.success("User data fetched successfully!");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("User not found");
      }
    }
  };

  const handleFormSubmit = () => {
    toast.success("Form submitted successfully!");
  };

  return (
    <div className="app">
      <Sidebar />
      <Outlet />
      <ContactFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
      />
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
