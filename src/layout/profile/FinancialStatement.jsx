import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "tailwindcss/tailwind.css";
import { financialData } from './data';

const FinancialStatement = () => {
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  console.log(userData._id);

  useEffect(() => {
    if (userData && userData?._id) {
      fetchUserData(userData._id);
    } else {
      toast.error("No user data found.");
    }
  }, []);

  const fetchUserData = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://skyline-2kje.onrender.com/transaction-history/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newData = response.data.transactions
      setRecord(newData);
      // console.log(response.data.transactions);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("User not found");
        // console.log(error)
      } else {
        toast.error("Internal Server Error: " + error.message);
        console.log("Internal Server Error: " + error.message);
        // console.log(error)
      }
    } finally {
      setLoading(false);
    }
  };

  // console.log(record);

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

  if (!userData) {
    return (
      <div className="text-center flex items-center justify-center -text--clr-silver-v1">
        <div>No user data available</div>
      </div>
    );
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${day}/${month}/${year} ${hours}:${minutes}${ampm}`;
  };

  return (
    <>
      {/* Financial Statement Review */}
      <div className="-bg--clr-primary p-6 rounded shadow-md">
        <div className="text-blue-800 font-bold mb-3">
          YOUR FINANCIAL STATEMENT REVIEW
        </div>

        <div className="p-5 h-max">
          <h1 className="text-lg mb-2 -text--clr-silver-v1">
            (WIRE AND DOMESTIC TRANSFERS)
          </h1>

          <div className="overflow-auto rounded-lg shadow-custom hidden md:block">
            <table className="w-full">
              <thead className="border-b-2 -border--clr-silver-v1">
                <tr className="-text--clr-silver-v1">
                  <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">SENDER</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">BANK</th>
                  <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">RECEIVER</th>
                  <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">AMOUNT</th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left uppercase">TYPE</th>
                  <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">REMARK</th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left uppercase">Date/time</th>
                </tr>
              </thead>
              <tbody className="divide-y -divide--clr-silver-v1">
                {record.map((data,index) => (
                  <tr key={index} className="-text--clr-silver-v1">
                    <td className="p-3 text-sm -text--clr-silver-v1 whitespace-nowrap">
                      <a href="#" className="font-bold text-blue-500 hover:underline">{data.senderName}</a>
                    </td>
                    <td className="p-3 text-sm -text--clr-silver-v1 whitespace-nowrap">{data.bank}</td>
                    <td className="p-3 text-sm -text--clr-silver-v1 whitespace-nowrap">{data.accountTransferredTo}</td>
                    <td className="p-3 text-sm -text--clr-silver-v1 whitespace-nowrap">{data.amountTransferred}</td>
                    <td className="p-3 text-sm -text--clr-silver-v1 whitespace-nowrap">
                      <span className={`p-1.5 text-xs font-medium uppercase tracking-wider text-${data.transactionType === 'CREDIT' ? 'green' : data.transactionType === 'debit' ? 'yellow-500' : 'green'}-800 bg-${data.transactionType === 'credit' ? 'green' : data.transactionType === 'debit' ? 'yellow' : 'gray'}-200 rounded-lg bg-opacity-50`}>
                        {data.transactionType}
                      </span>
                    </td>
                    <td className="p-3 text-sm -text--clr-silver-v1 whitespace-nowrap">{data.remark}</td>
                    <td className="p-3 text-sm -text--clr-silver-v1 whitespace-nowrap">{formatTimestamp(data.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {record?.map((data,index) => (
              <div key={index} className="-bg--clr-secondary space-y-3 p-4 rounded-lg shadow">
                <div className="flex items-center space-x-2 text-sm">
                  <div>
                    <a href="#" className="text-blue-500 font-bold hover:underline">#{data.senderName}</a>
                  </div>
                  <div className="text-gray-500">{formatTimestamp(data.date).split(' ')[0]}</div>
                  <div>
                    <span className={`p-1.5 text-xs font-medium uppercase tracking-wider text-${data.transactionType === 'credit' ? 'green' : data.transactionType === 'CREDIT' ? 'yellow' : 'gray'}-800 bg-${data.transactionType === 'debit' ? 'green' : data.status === 'Pending' ? 'yellow' : 'gray'}-200 rounded-lg bg-opacity-50`}>
                      {data.transactionType}
                    </span>
                  </div>
                </div>
                <div className="text-sm -text--clr-silver-v1">
                  {data.bank} <br /> {data.accountTransferredTo}
                </div>
                <div className="text-sm font-medium -text--clr-silver-v1">{data.amountTransferred}</div>
                <div className="text-sm font-medium -text--clr-silver-v1">{data.remark}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FinancialStatement;

















































































// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "tailwindcss/tailwind.css";

// const FinancialStatement = () => {
//   const [financialStatement, setFinancialStatement] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const userData = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (userData && userData._id) {
//       fetchUserData(userData._id);
//     } else {
//       toast.error("No user data found.");
//     }
//   }, []);

//   const fetchUserData = async (userId) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://skyline-2kje.onrender.com/financial-statement/${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setFinancialStatement(response.data.statement);
//     } catch (error) {
//       if (error.response && error.response.status === 404) {
//         // toast.error("User not found");
//       } else {
//         // toast.error("Internal Server Error: " + error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center flex items-center justify-center">
//         <svg
//           className="animate-spin h-5 w-5 mr-3 text-white"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//         >
//           <circle
//             className="opacity-25"
//             cx="12"
//             cy="12"
//             r="10"
//             stroke="currentColor"
//             strokeWidth="4"
//           ></circle>
//           <path
//             className="opacity-75"
//             fill="currentColor"
//             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//           ></path>
//         </svg>
//       </div>
//     );
//   }

//   if (!financialStatement) {
//     return (
//       <div className="text-center flex items-center justify-center text-gray-500">
//         <div>No financial statement data available</div>
//       </div>
//     );
//   }

//   const { user, period, totals, transactions } = financialStatement;

//   return (
//     <>
//       {/* Financial Statement Review */}
//       <div className="bg-gray-800 p-6 rounded shadow-md">
//         <div className="text-blue-800 font-bold mb-3">
//           YOUR FINANCIAL STATEMENT REVIEW
//         </div>

//         <div className="p-5 h-max">
//           <h1 className="text-lg mb-2 text-gray-200">
//             (WIRE AND DOMESTIC TRANSFERS)
//           </h1>
//           <div className="text-gray-200 mb-4">
//             <p><strong>Name:</strong> {user.name}</p>
//             <p><strong>Account Number:</strong> {user.accountNumber}</p>
//             <p><strong>Balance:</strong> {user.balance}</p>
//             <p><strong>Bank:</strong> {user.bank}</p>
//           </div>
//           <div className="text-gray-200 mb-4">
//             <p><strong>Statement Period:</strong> {period.startDate} - {period.endDate}</p>
//           </div>
//           <div className="text-gray-200 mb-4">
//             <p><strong>Total Deposits:</strong> {totals.totalDeposits}</p>
//             <p><strong>Total Withdrawals:</strong> {totals.totalWithdrawals}</p>
//             <p><strong>Total Transfers Out:</strong> {totals.totalTransfersOut}</p>
//             <p><strong>Total Transfers In:</strong> {totals.totalTransfersIn}</p>
//           </div>

//           <div className="overflow-auto rounded-lg shadow-custom hidden md:block">
//             <table className="w-full">
//               <thead className="border-b-2 border-gray-700">
//                 <tr className="text-gray-400">
//                   <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">No.</th>
//                   <th className="p-3 text-sm font-semibold tracking-wide text-left">Type</th>
//                   <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">Amount</th>
//                   <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left uppercase">Status</th>
//                   <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">Date/time</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-700">
//                 {transactions.map((transaction, index) => (
//                   <tr key={index} className="text-gray-400">
//                     <td className="p-3 text-sm text-gray-400 whitespace-nowrap">
//                       <a href="#" className="font-bold text-blue-500 hover:underline">{index + 1}</a>
//                     </td>
//                     <td className="p-3 text-sm text-gray-400 whitespace-nowrap">{transaction.type}</td>
//                     <td className="p-3 text-sm text-gray-400 whitespace-nowrap">{transaction.amount}</td>
//                     <td className="p-3 text-sm text-gray-400 whitespace-nowrap">
//                       <span className={`p-1.5 text-xs font-medium uppercase tracking-wider text-${transaction.status === 'delivered' ? 'green' : transaction.status === 'pending' ? 'yellow' : 'gray'}-800 bg-${transaction.status === 'delivered' ? 'green' : transaction.status === 'pending' ? 'yellow' : 'gray'}-200 rounded-lg bg-opacity-50`}>
//                         {transaction.status}
//                       </span>
//                     </td>
//                     <td className="p-3 text-sm text-gray-400 whitespace-nowrap">{new Date(transaction.date).toLocaleString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
//             {transactions.map((transaction, index) => (
//               <div key={index} className="bg-gray-700 space-y-3 p-4 rounded-lg shadow">
//                 <div className="flex items-center space-x-2 text-sm">
//                   <div>
//                     <a href="#" className="text-blue-500 font-bold hover:underline">#{index + 1}</a>
//                   </div>
//                   <div className="text-gray-500">{new Date(transaction.date).toLocaleDateString()}</div>
//                   <div>
//                     <span className={`p-1.5 text-xs font-medium uppercase tracking-wider text-${transaction.status === 'delivered' ? 'green' : transaction.status === 'pending' ? 'yellow' : 'gray'}-800 bg-${transaction.status === 'delivered' ? 'green' : transaction.status === 'pending' ? 'yellow' : 'gray'}-200 rounded-lg bg-opacity-50`}>
//                       {transaction.status}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="text-sm text-gray-400">
//                   {transaction.type}
//                 </div>
//                 <div className="text-sm font-medium text-gray-400">{transaction.amount}</div>
//                 <div className="text-sm font-medium text-gray-400">{new Date(transaction.date).toLocaleString()}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FinancialStatement;

