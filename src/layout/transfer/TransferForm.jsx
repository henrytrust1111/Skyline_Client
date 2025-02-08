import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const TransferForm = () => {
  const [formData, setFormData] = useState({
    amount: "",
    beneficiaryName: "",
    beneficiaryNumber: "",
    bankName: "",
    description: "",
    cotCode: "",
    taxCode: "",
    matchingCode: ""
  });

  const [loading, setLoading] = useState(false);
  const [modalStep, setModalStep] = useState(0);
  const [countdown, setCountdown] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate("/dashboard/account-statement");
  };

  const handleStepChange = (step) => {
    // Form Validation
    if (
      modalStep === 0 &&
      (!formData.amount ||
        !formData.beneficiaryName ||
        !formData.beneficiaryNumber ||
        !formData.bankName)
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (modalStep === 1 && !formData.cotCode) {
      toast.error("Please enter your COT Code");
      return;
    }

    if (modalStep === 2 && !formData.taxCode) {
      toast.error("Please enter your Tax Code");
      return;
    }
    setCountdown(3); // Set countdown to 3 seconds
    let timer = 3;

    const interval = setInterval(() => {
      timer -= 1;
      setCountdown(timer);

      if (timer === 0) {
        clearInterval(interval);
        setModalStep(step);
        setCountdown(null); // Reset countdown
      }
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for required fields at each step
    if (
      modalStep === 0 &&
      (!formData.amount ||
        !formData.beneficiaryName ||
        !formData.beneficiaryNumber ||
        !formData.bankName)
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (modalStep === 1 && !formData.cotCode) {
      toast.error("Please enter your COT Code");
      return;
    }

    if (modalStep === 2 && !formData.taxCode) {
      toast.error("Please enter your Tax Code");
      return;
    }

    if (modalStep === 3 && !formData.matchingCode) {
      toast.error("Please enter your Matching Code");
      return;
    }

    if (modalStep < 3) {
      setModalStep(modalStep + 1);
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://skyline-2kje.onrender.com/transfer",
        {
          recipientAccount: formData.beneficiaryNumber,
          amount: formData.amount,
          bank: formData.bankName,
          accountName: formData.beneficiaryName,
          description: formData.description,
          cotCode: formData.cotCode,
          taxCode: formData.taxCode,
          matchingCode: formData.matchingCode
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      // toast.success("Transfer successful!", { autoClose: 5000 });
      setShowSuccessModal(true);
      window.location.reload();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (modalStep === 0) {
  //     setModalStep(1);
  //     return;
  //   }

  //   if (modalStep === 1 && !formData.cotCode) {
  //     toast.error("Please enter your COT Code");
  //     return;
  //   }

  //   if (modalStep === 2 && !formData.taxCode) {
  //     toast.error("Please enter your Tax Code");
  //     return;
  //   }

  //   if (modalStep === 3 && !formData.matchingCode) {
  //     toast.error("Please enter your Matching Code");
  //     return;
  //   }

  //   if (modalStep < 3) {
  //     setModalStep(modalStep + 1);
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.post(
  //       "https://skyline-2kje.onrender.com/transfer",
  //       {
  //         recipientAccount: formData.beneficiaryNumber,
  //         amount: formData.amount,
  //         bank: formData.bankName,
  //         accountName: formData.beneficiaryName,
  //         description: formData.description,
  //         cotCode: formData.cotCode,
  //         taxCode: formData.taxCode,
  //         matchingCode: formData.matchingCode
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json"
  //         }
  //       }
  //     );
  //     toast.success("Transfer successful!", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined
  //     });
  //     window.location.reload();
  //     const outcome = response.data;
  //     console.log(outcome);
  //   } catch (error) {
  //     toast.error(
  //       error.response?.data?.message || "An error occurred. Please try again."
  //     );
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <ToastContainer />
      <div>
        <div className="text-blue-800 font-bold uppercase">
          wire transfer FORM
        </div>
        <div className="mt-2 p-6 -bg--clr-primary rounded shadow-md">
          <form className="" onSubmit={handleSubmit}>
            {modalStep === 0 && (
              <>
                <div className="mb-4 md:flex md:items-center">
                  <label
                    className="block -text--clr-silver-v1 text-sm font-bold mb-2 md:mb-0 md:w-1/3"
                    htmlFor="amount"
                  >
                    Amount:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline md:w-2/3 bg-transparent -border--clr-silver-v1"
                    id="amount"
                    type="text"
                    placeholder="Eg 35678"
                    value={formData.amount}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4 md:flex md:items-center">
                  <label
                    className="block -text--clr-silver-v1 text-sm font-bold mb-2 md:mb-0 md:w-1/3"
                    htmlFor="beneficiaryName"
                  >
                    Beneficiary Account Name:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline md:w-2/3 bg-transparent -border--clr-silver-v1"
                    id="beneficiaryName"
                    type="text"
                    placeholder="Beneficiary Name"
                    value={formData.beneficiaryName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4 md:flex md:items-center">
                  <label
                    className="block -text--clr-silver-v1 text-sm font-bold mb-2 md:mb-0 md:w-1/3"
                    htmlFor="beneficiaryNumber"
                  >
                    Beneficiary Account Number:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline md:w-2/3 bg-transparent -border--clr-silver-v1"
                    id="beneficiaryNumber"
                    type="text"
                    placeholder="2"
                    value={formData.beneficiaryNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4 md:flex md:items-center">
                  <label
                    className="block -text--clr-silver-v1 text-sm font-bold mb-2 md:mb-0 md:w-1/3"
                    htmlFor="bankName"
                  >
                    Bank Name:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline md:w-2/3 bg-transparent -border--clr-silver-v1"
                    id="bankName"
                    type="text"
                    placeholder="Bank Name"
                    value={formData.bankName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4 md:flex md:items-center">
                  <label
                    className="block -text--clr-silver-v1 text-sm font-bold mb-2 md:mb-0 md:w-1/3"
                    htmlFor="description"
                  >
                    Description:
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline md:w-2/3 bg-transparent -border--clr-silver-v1"
                    id="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </>
            )}
            {modalStep === 1 && (
              <div className="">
                <div className="mb-4 md:flex md:items-center">
                  <label
                    className="block -text--clr-silver-v1 text-sm font-bold mb-2 md:mb-0 md:w-1/3"
                    htmlFor="bankName"
                  >
                    COT Code:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline md:w-2/3 bg-transparent -border--clr-silver-v1"
                    id="cotCode"
                    placeholder="Enter COT Code"
                    type="text"
                    value={formData.cotCode}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => setModalStep(0)}
                  >
                    Back
                  </button>
                  {/* <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => setModalStep(2)}
                  >
                    Submit
                  </button> */}
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => handleStepChange(2)}
                    disabled={countdown !== null}
                  >
                    {countdown !== null ? `Next (${countdown}s)` : "Next"}
                  </button>
                </div>
              </div>
            )}
            {modalStep === 2 && (
              <div className="">
                <div className="mb-4 md:flex md:items-center">
                  <label
                    className="block -text--clr-silver-v1 text-sm font-bold mb-2 md:mb-0 md:w-1/3"
                    htmlFor="bankName"
                  >
                    Tax Code:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline md:w-2/3 bg-transparent -border--clr-silver-v1"
                    placeholder="Enter Tax Code"
                    id="taxCode"
                    type="text"
                    value={formData.taxCode}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => setModalStep(1)}
                  >
                    Back
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => handleStepChange(3)}
                    disabled={countdown !== null}
                  >
                    {countdown !== null ? `Next (${countdown}s)` : "Next"}
                  </button>
                </div>
              </div>
            )}
            {modalStep === 3 && (
              <div className="">
                <div className="mb-4 md:flex md:items-center">
                  <label
                    className="block -text--clr-silver-v1 text-sm font-bold mb-2 md:mb-0 md:w-1/3"
                    htmlFor="bankName"
                  >
                    Matching Code:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline md:w-2/3 bg-transparent -border--clr-silver-v1"
                    placeholder="Enter Matching Code"
                    id="matchingCode"
                    type="text"
                    value={formData.matchingCode}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => setModalStep(2)}
                  >
                    Back
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            )}
            {modalStep === 0 && (
              <div className="flex items-center justify-center">
                {/* <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button> */}
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => handleStepChange(1)}
                  disabled={countdown !== null}
                >
                  {countdown !== null ? `Next (${countdown}s)` : "Next"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80 text-center">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold mt-4">Thank you</h2>
            <p className="text-gray-600 mt-2">
              You have successfully sent money to an eWallet.
            </p>

            <button
              className="mt-4 w-full border border-black text-black py-2 rounded-lg"
              onClick={handleViewDetails}
            >
              View details
            </button>

            <button
              className="mt-2 w-full bg-black text-white py-2 rounded-lg"
              onClick={() => setShowSuccessModal(false)}
            >
              Finish
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TransferForm;

// import React, { useState } from 'react';
// import axios from "axios";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const TransferForm = () => {
//   const [formData, setFormData] = useState({
//     amount: '',
//     beneficiaryName: '',
//     beneficiaryNumber: '',
//     bankName: '',
//     cotCode: '',
//     taxCode: '',
//     matchingCode: '',
//     description: '',
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Form validation
//     const { amount, beneficiaryName, beneficiaryNumber, bankName, cotCode, taxCode, description, matchingCode } = formData;
//     if (!amount || isNaN(amount)) {
//       toast.error('Please enter a valid amount');
//       return;
//     }
//     if (!beneficiaryName) {
//       toast.error('Please enter the beneficiary account name');
//       return;
//     }
//     if (!beneficiaryNumber || isNaN(beneficiaryNumber)) {
//       toast.error('Please enter a valid beneficiary account number');
//       return;
//     }
//     if (!bankName) {
//       toast.error('Please enter the bank name');
//       return;
//     }
//     if (!cotCode) {
//       toast.error('Please enter your COT Code');
//       return;
//     }
//     if (!taxCode) {
//       toast.error('Please enter your Tax Code');
//       return;
//     }
//     if (!matchingCode) {
//       toast.error('Please enter your Matching Code');
//       return;
//     }

//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "https://skyline-2kje.onrender.com/transfer",
//         {
//           recipientAccount: beneficiaryNumber,
//           amount,
//           bank: bankName,
//           accountName: beneficiaryName,
//           description,
//           cotCode,
//           taxCode,
//           matchingCode,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       toast.success("Transfer successful!", {
//         position: 'top-right',
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//       window.location.reload();
//       const outcome = response.data;
//       console.log(outcome);
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "An error occurred. Please try again."
//       );
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div>
//         <div className="text-blue-800 font-bold uppercase">wire transfer FORM</div>
//         <div className="mt-2 p-6 -bg--clr-primary rounded shadow-md">
//           <form className="" onSubmit={handleSubmit}>
//             <div className="mb-4 md:flex md:items-center">
//               <label className="block -text--clr-silver-v1 text-sm font-bold mb-2 md:mb-0 md:w-1/3" htmlFor="amount">
//                 Amount:
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline md:w-2/3 bg-transparent -border--clr-silver-v1"
//                 id="amount"
//                 type="text"
//                 placeholder="Eg 35678"
//                 value={formData.amount}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="mb-4 md:flex md:items-center">
//               <label className="block -text--clr-silver-v1 text-sm font-bold mb-2 md:mb-0 md:w-1/3" htmlFor="beneficiaryName">
//                 Beneficiary Account Name:
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline md:w-2/3 bg-transparent -border--clr-silver-v1"
//                 id="beneficiaryName"
//                 type="text"
//                 placeholder="Beneficiary Name"
//                 value={formData.beneficiaryName}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="mb-4 md:flex md:items-center">
//               <label className="block -text--clr-silver-v1 text-sm font-bold mb-2 md:mb-0 md:w-1/3" htmlFor="beneficiaryNumber">
//                 Beneficiary Account Number:
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline md:w-2/3 bg-transparent -border--clr-silver-v1"
//                 id="beneficiaryNumber"
//                 type="text"
//                 placeholder="2"
//                 value={formData.beneficiaryNumber}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="mb-4 md:flex md:items-center">
//               <label className="block -text--clr-silver-v1 text-sm font-bold mb-2 md:mb-0 md:w-1/3" htmlFor="bankName">
//                 Bank Name:
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline md:w-2/3 bg-transparent -border--clr-silver-v1"
//                 id="bankName"
//                 type="text"
//                 placeholder="Bank Name"
//                 value={formData.bankName}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="mb-4 md:flex md:items-center">
//               <label className="block -text--clr-silver-v1 text-sm font-bold mb-2 md:mb-0 md:w-1/3" htmlFor="cotCode">
//                 COT Code:
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline md:w-2/3 bg-transparent -border--clr-silver-v1"
//                 id="cotCode"
//                 type="text"
//                 placeholder="Enter COT Code"
//                 value={formData.cotCode}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="mb-4 md:flex md:items-center">
//               <label className="block -text--clr-silver-v1 text-sm font-bold mb-2 md:mb-0 md:w-1/3" htmlFor="taxCode">
//                 Tax Code:
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline md:w-2/3 bg-transparent -border--clr-silver-v1"
//                 id="taxCode"
//                 type="text"
//                 placeholder="Tax Code."
//                 value={formData.taxCode}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="mb-4 md:flex md:items-center">
//               <label className="block -text--clr-silver-v1 text-sm font-bold mb-2 md:mb-0 md:w-1/3" htmlFor="taxCode">
//               Matching Code:
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline md:w-2/3 bg-transparent -border--clr-silver-v1"
//                 id="matchingCode"
//                 type="text"
//                 placeholder="Matching Code"
//                 value={formData.matchingCode}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="mb-4 md:flex md:items-center">
//               <label className="block -text--clr-silver-v1 text-sm font-bold mb-2 md:mb-0 md:w-1/3" htmlFor="description">
//                 Description:
//               </label>
//               <textarea
//                 className="shadow appearance-none border rounded w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline md:w-2/3 bg-transparent -border--clr-silver-v1"
//                 id="description"
//                 placeholder="Description"
//                 value={formData.description}
//                 onChange={handleChange}
//               ></textarea>
//             </div>
//             <div className="flex items-center justify-center">
//               <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                 type="submit"
//                 disabled={loading}
//               >
//                 {loading ? 'Submitting...' : 'Submit'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TransferForm;
