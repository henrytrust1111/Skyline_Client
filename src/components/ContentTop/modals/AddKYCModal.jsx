import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddKYCModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleFileChange = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !document) {
      toast.error("Please provide a title and upload a document");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("documents", document);

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://skyline-2kje.onrender.com/upload-document",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Document successfully uploaded!", {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const { documents } = response.data;
      localStorage.setItem("documents", JSON.stringify(documents));
      setTitle("");
      setDocument(null);
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center -bg--clr-secondary bg-opacity-50 z-50 -text--clr-silver-v1">
      <div className="-bg--clr-primary p-6 rounded-lg w-full max-w-md mx-4 sm:mx-auto relative">
        <span
          className="-text--clr-silver-v1 hover:-text--clr-light-gray absolute right-5 top-2 text-2xl cursor-pointer float-right"
          onClick={onClose}
        >
          &times;
        </span>
        <h2 className="text-2xl mb-4">Add KYC Document</h2>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="title"
            className="block text-sm font-medium -text--clr-silver-v1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="mt-1 block w-full border -border--clr-silver-v1 rounded-md p-2 bg-transparent outline-none mb-2"
            value={title}
            onChange={handleTitleChange}
          />
          <label
            htmlFor="document"
            className="block text-sm font-medium -text--clr-silver-v1"
          >
            Upload Document:
          </label>
          <input
            type="file"
            id="document"
            name="document"
            className="mt-1 block w-full border -border--clr-silver-v1 rounded-md p-2"
            onChange={handleFileChange}
          />
          <button
            type="submit"
            className={`mt-4 w-full -bg--clr-pumpkin -text--clr-light-gray py-2 rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddKYCModal;

