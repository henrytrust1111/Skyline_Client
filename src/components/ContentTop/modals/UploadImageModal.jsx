import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadImageModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const token = localStorage.getItem('token');

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      toast.error('Please select an image file to upload');
      return;
    }

    setLoading(true);
    const profilePhoto = new FormData();
    profilePhoto.append('profilePhoto', imageFile);

    try {
      const response = await axios.put(
        'https://skyline-2kje.onrender.com/profilephoto',
        profilePhoto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      localStorage.setItem('imageFile', JSON.stringify(response.data.profilePhoto));
      toast.success(response.data.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      onClose();
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('No file was uploaded');
      } else if (error.response && error.response.status === 404) {
        toast.error('User not found');
      } else {
        toast.error(`Internal server error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center -bg--clr-secondary bg-opacity-50 z-50">
      <div className="-bg--clr-primary p-6 rounded-lg w-full max-w-md mx-4 sm:mx-auto relative">
        <span className="-text--clr-silver hover:-text--clr-light-gray absolute right-5 top-2 text-[30px] cursor-pointer float-right" onClick={onClose}>&times;</span>
        <h2 className="text-2xl mb-4 -text--clr-silver-v1">Upload Image</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="image" className="block text-sm font-medium -text--clr-silver-v1">Upload Image:</label>
          <input type="file" id="image" name="image" className="mt-1 block w-full border border-gray-300 rounded-md p-2 -text--clr-silver-v1" onChange={handleFileChange} />
          <button type="submit" className="mt-4 w-full -bg--clr-pumpkin text-white py-2 rounded-md" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadImageModal;

