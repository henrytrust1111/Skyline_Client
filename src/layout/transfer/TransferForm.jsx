import React, { useState } from 'react';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TransferForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    beneficiaryName: '',
    beneficiaryNumber: '',
    bankName: '',
    cotCode: '',
    taxCode: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    const { amount, beneficiaryName, beneficiaryNumber, bankName, cotCode, taxCode, description } = formData;
    if (!amount || isNaN(amount)) {
      toast.error('Please enter a valid amount');
      return;
    }
    if (!beneficiaryName) {
      toast.error('Please enter the beneficiary account name');
      return;
    }
    if (!beneficiaryNumber || isNaN(beneficiaryNumber)) {
      toast.error('Please enter a valid beneficiary account number');
      return;
    }
    if (!bankName) {
      toast.error('Please enter the bank name');
      return;
    }
    if (!cotCode) {
      toast.error('Please enter your COT Code');
      return;
    }
    if (!taxCode) {
      toast.error('Please enter your Tax Code');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://skyline-2kje.onrender.com/transfer",
        {
          recipientAccount: beneficiaryNumber,
          amount,
          bank: bankName,
          accountName: beneficiaryName,
          description,
          cotCode,
          taxCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Transfer successful!", {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.location.reload();
      const outcome = response.data;
      console.log(outcome);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div>
        <div className="text-blue-800 font-bold uppercase">wire transfer FORM</div>
        <div className="mt-2 p-6 -bg--clr-primary rounded shadow-md">
          <form className="" onSubmit={handleSubmit}>
            <div className="mb-4 md:flex md:items-center">
              <label className="block -text--clr-silver-v1 text-sm font-bold mb-2 md:mb-0 md:w-1/3" htmlFor="amount">
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
              <label className="block -text--clr-silver-v1 text-sm font-bold mb-2 md:mb-0 md:w-1/3" htmlFor="beneficiaryName">
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
              <label className="block -text--clr-silver-v1 text-sm font-bold mb-2 md:mb-0 md:w-1/3" htmlFor="beneficiaryNumber">
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
              <label className="block -text--clr-silver-v1 text-sm font-bold mb-2 md:mb-0 md:w-1/3" htmlFor="bankName">
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
              <label className="block -text--clr-silver-v1 text-sm font-bold mb-2 md:mb-0 md:w-1/3" htmlFor="cotCode">
                COT Code:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline md:w-2/3 bg-transparent -border--clr-silver-v1"
                id="cotCode"
                type="text"
                placeholder="Enter COT Code"
                value={formData.cotCode}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 md:flex md:items-center">
              <label className="block -text--clr-silver-v1 text-sm font-bold mb-2 md:mb-0 md:w-1/3" htmlFor="taxCode">
                Tax Code:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline md:w-2/3 bg-transparent -border--clr-silver-v1"
                id="taxCode"
                type="text"
                placeholder="Tax Code."
                value={formData.taxCode}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 md:flex md:items-center">
              <label className="block -text--clr-silver-v1 text-sm font-bold mb-2 md:mb-0 md:w-1/3" htmlFor="description">
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
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
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
//     description: '',
//     // accountType: '',
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Form validation
//     const { amount, beneficiaryNumber, bankName, cotCode, taxCode, description, beneficiaryName } = formData;
//     if (!amount || isNaN(amount)) {
//       toast.error('Please enter a valid amount');
//       return;
//     }
//     // if (!beneficiaryName) {
//     //   toast.error('Please enter the beneficiary account name');
//     //   return;
//     // }
//     if (!beneficiaryNumber || isNaN(beneficiaryNumber)) {
//       toast.error('Please enter a valid beneficiary account number');
//       return;
//     }
//     if (!bankName) {
//       toast.error('Please enter the bank name');
//       return;
//     }
//     if (!cotCode) {
//       toast.error('Please enter your cotCode');
//       return;
//     }
//     if (!taxCode) {
//       toast.error('Please enter youe TaxCode');
//       return;
//     }
//     if (!description) {
//       toast.error('Please select an Please Enter a description');
//       return;
//     }

//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "https://skyline-2kje.onrender.com/transfer",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       toast.success("Document successfully uploaded!", {
//         position: 'top-right',
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//       const outcome = response.data;
//       console.log(outcome);
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "An error occurred. Please try again."
//       );
//       console.log(formData);
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
//             {/* <div className="mb-4 md:flex md:items-center">
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
//             </div> */}
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
//                 cotCode:
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 -text--clr-silver-v1 leading-tight focus:outline-none focus:shadow-outline md:w-2/3 bg-transparent -border--clr-silver-v1"
//                 id="cotCode"
//                 type="text"
//                 placeholder="Enter cotCode"
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
//                 placeholder="TaxCode."
//                 value={formData.taxCode}
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
//             {/* <div className="mb-4 md:flex md:items-center">
//               <label className="block -text--clr-silver-v1 text-sm font-bold mb-2 md:mb-0 md:w-1/3">
//                 Account Type: <span className="text-red-500">*</span>
//               </label>
//               <div className="md:w-2/3">
//                 <div className="flex items-center mb-2">
//                   <input
//                     className="mr-2 leading-tight"
//                     type="radio"
//                     id="personal"
//                     name="accountType"
//                     value="personal"
//                     onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
//                   />
//                   <label className="-text--clr-silver-v1" htmlFor="personal">Personal (Savings)</label>
//                 </div>
//                 <div className="flex items-center mb-2">
//                   <input
//                     className="mr-2 leading-tight"
//                     type="radio"
//                     id="current"
//                     name="accountType"
//                     value="current"
//                     onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
//                   />
//                   <label className="-text--clr-silver-v1" htmlFor="current">Current</label>
//                 </div>
//                 <div className="flex items-center">
//                   <input
//                     className="mr-2 leading-tight"
//                     type="radio"
//                     id="checking"
//                     name="accountType"
//                     value="checking"
//                     onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
//                   />
//                   <label className="-text--clr-silver-v1" htmlFor="checking">Checking</label>
//                 </div>
//               </div>
//             </div> */}
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


