import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfileModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    // email: '',
    phoneNumber: '',
    maritalStatus: 'single',
    address: ''
  });

  const data = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const userId = data._id;

  useEffect(() => {
    // Fetch current user data to populate the form
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://skyline-2kje.onrender.com/view-me/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const { username, phoneNumber, maritalStatus, address } = response.data.user;
        setFormData({ username, phoneNumber, maritalStatus, address });
      } catch (error) {
        toast.error('Failed to load user data');
      }
    };
    fetchUserData();
  }, [token, userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { username, email, phoneNumber, address } = formData;
    if (!username || !phoneNumber || !address) {
      toast.error('All fields are required');
      return false;
    }
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   toast.error('Invalid email format');
    //   return false;
    // }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.put(
        'https://skyline-2kje.onrender.com/update-personal-profile',
        {
          username: formData.username,
          // email: formData.email,
          phoneNumber: formData.phoneNumber,
          maritalStatus: formData.maritalStatus,
          address: formData.address
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      localStorage.setItem('userData', JSON.stringify(response.data.data));
      toast.success(response.data.message);
      onClose();
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('User not found');
      } else {
        console.log(`Internal Server Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center -bg--clr-secondary bg-opacity-50 z-50">
      <div className="-bg--clr-primary -text--clr-silver-v1 p-6 rounded-lg w-full max-w-md mx-4 sm:mx-auto relative">
        <span className="cursor-pointer float-right text-[40px] -text--clr-silver hover:-text--clr-light-gray absolute right-5 top-2 " onClick={onClose}>&times;</span>
        <h2 className="text-2xl mb-4">Edit Profile</h2>
        <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
          <label htmlFor="username" className="block text-sm font-medium -text--clr-silver-v1">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Name"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-transparent outline-none"
            value={formData.username}
            onChange={handleInputChange}
          />
          {/* <label htmlFor="email" className="block text-sm font-medium -text--clr-silver-v1">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-transparent outline-none"
            value={formData.email}
            onChange={handleInputChange}
          /> */}
          <label htmlFor="phoneNumber" className="block text-sm font-medium -text--clr-silver-v1">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Number"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-transparent outline-none"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          <label htmlFor="maritalStatus" className="block text-sm font-medium -text--clr-silver-v1">Marital Status:</label>
          <select
            id="maritalStatus"
            name="maritalStatus"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 -bg--clr-primary outline-none"
            value={formData.maritalStatus}
            onChange={handleInputChange}
          >
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
          <label htmlFor="address" className="block text-sm font-medium -text--clr-silver-v1">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-transparent outline-none"
            value={formData.address}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="mt-4 w-full -bg--clr-pumpkin text-white py-2 rounded-md"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditProfileModal;









// import React from 'react';

// const EditProfileModal = ({ onClose }) => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center -bg--clr-secondary  bg-opacity-50 z-50">
//       <div className="-bg--clr-primary -text--clr-silver-v1 p-6 rounded-lg w-full max-w-md mx-4 sm:mx-auto relative">
//         <span className="cursor-pointer float-right text-[40px] -text--clr-silver hover:-text--clr-light-gray absolute right-5 top-2 " onClick={onClose}>&times;</span>
//         <h2 className="text-2xl mb-4">Edit Profile</h2>
//         <form className="grid grid-cols-1 gap-4">
//           <label htmlFor="name" className="block text-sm font-medium -text--clr-silver-v1">Name:</label>
//           <input type="text" id="name" name="name" placeholder='Name' className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-transparent outline-none" />
//           <label htmlFor="email" className="block text-sm font-medium -text--clr-silver-v1">Email:</label>
//           <input type="email" id="email" name="email" placeholder='Email' className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-transparent outline-none" />
//           <label htmlFor="phone" className="block text-sm font-medium -text--clr-silver-v1">Phone Number:</label>
//           <input type="text" id="phone" name="phone" placeholder='Number' className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-transparent outline-none" />
//           <label htmlFor="marital-status" className="block text-sm font-medium -text--clr-silver-v1">Marital Status:</label>
//           <select id="marital-status" name="marital-status" className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-transparent outline-none">
//             <option value="single">Single</option>
//             <option value="married">Married</option>
//             <option value="divorced">Divorced</option>
//             <option value="widowed">Widowed</option>
//           </select>
//           <label htmlFor="address" className="block text-sm font-medium -text--clr-silver-v1">Address:</label>
//           <input type="text" id="address" name="address" placeholder='Address' className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-transparent outline-none" />
//           <button type="submit" className="mt-4 w-full -bg--clr-pumpkin text-white py-2 rounded-md">Save Changes</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProfileModal;
