import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Ticket = () => {
  const [loanType, setLoanType] = useState("personal-loans");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const data = JSON.parse(localStorage.getItem("user"));
  const userId = data._id;
  const token = localStorage.getItem("token");

  console.log(amount, loanType, description);

  const handleOpenTicket = async () => {
    if (!amount || !description) {
      toast.error("Please fill in all the fields");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("loanType", loanType);
      formData.append("amount", amount);
      formData.append("loanReason", description);

      const response = await axios.post(
        `https://skyline-2kje.onrender.com/loan-request/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.setItem("loanRequest", JSON.stringify(response.data));
      toast.success("Ticket opened successfully!");
      setLoanType("personal-loans");
      setAmount("");
      setDescription("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDiscard = () => {
    setLoanType("personal-loans");
    setAmount("");
    setDescription("");
  };

  return (
    <>
      <div>
        <ToastContainer />
        <div className="text-blue-800 font-bold">TICKETS</div>
        <div className="mt-2 p-6 -bg--clr-primary rounded shadow-md">
          <div className="flex justify-between items-center mb-4">
            <p className="-text--clr-silver-v1 underline underline-offset-2">
              Fill The Form Below
            </p>
            <button onClick={handleDiscard} className="text-blue-500">
              Discard
            </button>
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="block -text--clr-silver-v1">To:</label>
              <input
                type="text"
                value="Customer Care"
                readOnly
                className="w-full p-2 border rounded bg-transparent -text--clr-silver-v1"
              />
            </div>
            <div className="space-y-1">
              <label className="block -text--clr-silver-v1">Loan Type:</label>
              <select
                value={loanType}
                onChange={(e) => setLoanType(e.target.value)}
                className="w-full p-2 border rounded -bg--clr-primary -text--clr-silver-v1 outline-none"
              >
                <option value="personal-loans">Personal Loans</option>
                <option value="mortgages">Mortgages</option>
                <option value="business-loans">Business Loans</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="block -text--clr-silver-v1">Amount:</label>
              <input
                type="number"
                name="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                className="w-full p-2 border rounded bg-transparent -text--clr-silver-v1"
              />
            </div>
            <div className="space-y-1">
              <label className="block -text--clr-silver-v1">Loan Reason:</label>
              <textarea
                placeholder="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded bg-transparent -text--clr-silver-v1"
              ></textarea>
            </div>
            <button
              onClick={handleOpenTicket}
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={loading}
            >
              {loading ? "Loading..." : "Open Ticket"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ticket;





// import React, { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Ticket = () => {
//   const [loanType, setLoanType] = useState("personal-loans");
//   const [amount, setAmount] = useState("");
//   const [description, setDescription] = useState("");
//   const [loading, setLoading] = useState(false);
//   const userData = JSON.parse(localStorage.getItem("user"));
//   const data = JSON.parse(localStorage.getItem("user"));
//   const userId = data._id;
//   const token = localStorage.getItem("token");

//  console.log(amount, loanType, description);
//   const handleOpenTicket = async () => {
//     if (!amount || !description) {
//       toast.error("Please fill in all the fields");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `https://skyline-2kje.onrender.com/loan-request/${userId}`,
//         {
//           loanType,
//           amount,
//           loanReason: description,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       localStorage.setItem("loanRequest", JSON.stringify(response.data));
//       toast.success("Ticket opened successfully!");
//       setLoanType("personal-loans");
//       setAmount("");
//       setDescription("");
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "An error occurred. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDiscard = () => {
//     setLoanType("personal-loans");
//     setAmount("");
//     setDescription("");
//   };

//   return (
//     <>
//       <div>
//         <ToastContainer />
//         <div className="text-blue-800 font-bold">TICKETS</div>
//         <div className="mt-2 p-6 -bg--clr-primary rounded shadow-md">
//           <div className="flex justify-between items-center mb-4">
//             <p className="-text--clr-silver-v1 underline underline-offset-2">
//               Fill The Form Below
//             </p>
//             <button onClick={handleDiscard} className="text-blue-500">
//               Discard
//             </button>
//           </div>
//           <div className="space-y-4">
//             <div className="space-y-1">
//               <label className="block -text--clr-silver-v1">To:</label>
//               <input
//                 type="text"
//                 value="Customer Care"
//                 readOnly
//                 className="w-full p-2 border rounded bg-transparent -text--clr-silver-v1"
//               />
//             </div>
//             <div className="space-y-1">
//               <label className="block -text--clr-silver-v1">Loan Type:</label>
//               <select
//                 value={loanType}
//                 onChange={(e) => setLoanType(e.target.value)}
//                 className="w-full p-2 border rounded -bg--clr-primary -text--clr-silver-v1 outline-none"
//               >
//                 <option value="personal-loans">Personal Loans</option>
//                 <option value="mortgages">Mortgages</option>
//                 <option value="business-loans">Business Loans</option>
//               </select>
//             </div>
//             <div className="space-y-1">
//               <label className="block -text--clr-silver-v1">Amount:</label>
//               <input
//                 type="number"
//                 name="number"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 placeholder="Amount"
//                 className="w-full p-2 border rounded bg-transparent -text--clr-silver-v1"
//               />
//             </div>
//             <div className="space-y-1">
//               <label className="block -text--clr-silver-v1">Loan Reason:</label>
//               <textarea
//                 placeholder="description"
//                 name="description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full p-2 border rounded bg-transparent -text--clr-silver-v1"
//               ></textarea>
//             </div>
//             <button
//               onClick={handleOpenTicket}
//               className="px-4 py-2 bg-blue-500 text-white rounded"
//               disabled={loading}
//             >
//               {loading ? "Loading..." : "Open Ticket"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Ticket;

