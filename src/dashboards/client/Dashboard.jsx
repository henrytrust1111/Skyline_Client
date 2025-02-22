import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../layout/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import ChatButton from './ChatButton';
import axios from 'axios';
import ContactFormModal from './ContactFormModal';

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
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBlance(response.data.user);
      localStorage.setItem("balance", JSON.stringify(response.data.user));
      // toast.success("User data fetched successfully!");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("User not found");
      } else {
        toast.error("Internal Server Error: " + error.message);
      }
    }
  };
 
  //  const bal =JSON.parse(localStorage.getItem('balance'))
  // const {
  //   totalBalance,
  //   availableBalance,
  // } = bal;
  // console.log(totalBalance,availableBalance);

  const handleFormSubmit = () => {
    toast.success('Form submitted successfully!');
  };

  return (
    <div className='app'>
      <Sidebar />
      <Outlet />
      {/* <ChatButton onClick={() => setIsModalOpen(true)} /> */}
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
