import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "tailwindcss/tailwind.css";

const CreditDebit = () => {
  const [statement, setStatement] = useState(null);
  const [loading, setLoading] = useState(false);
  const data = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const userId = data?._id;

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://skyline-2kje.onrender.com/bank-statement/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setStatement(response.data.statement);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("User not found");
      } else {
        toast.error("Internal Server Error: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

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

  if (!statement) {
    return (
      <div className="text-center flex items-center justify-center -text--clr-silver-v1">
        <div>No statement data available</div>
      </div>
    );
  }

  const { user, transactions, period } = statement;

  return (
    <div className="-bg--clr-primary p-6 rounded shadow-md">
      <div className="text-blue-800 font-bold mb-3">
        YOUR FINANCIAL STATEMENT
      </div>
      <div className="p-5 h-max">
        <h1 className="text-lg mb-2 -text--clr-silver-v1">
          (CREDIT AND DEBIT STATEMENTS)
        </h1>
        <div className="overflow-auto rounded-lg shadow-custom hidden md:block">
          <table className="w-full">
            <thead className="border-b-2 -border--clr-silver-v1">
              <tr className="-text--clr-silver-v1">
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  DATE
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  TYPE
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  AMOUNT
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  RECIPIENT ACCOUNT
                </th>
              </tr>
            </thead>
            <tbody className="divide-y -divide--clr-silver-v1">
              {transactions.map((transaction, index) => (
                <tr key={index} className="-text--clr-silver-v1">
                  <td className="p-3 text-sm whitespace-nowrap">
                    {new Date(transaction.date).toLocaleString()}
                  </td>
                  <td className="p-3 text-sm whitespace-nowrap">
                    {transaction.type}
                  </td>
                  <td className="p-3 text-sm whitespace-nowrap">
                    ${formatNumber(transaction.amount)}
                  </td>
                  <td className="p-3 text-sm whitespace-nowrap">
                    {transaction.recipientAccount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className="-bg--clr-secondary space-y-3 p-4 rounded-lg shadow"
            >
              <div className="flex items-center space-x-2 text-sm">
                <div>{new Date(transaction.date).toLocaleString()}</div>
                <div className="text-gray-500">{transaction.type}</div>
              </div>
              <div className="text-sm -text--clr-silver-v1">
                {transaction.recipientAccount} <br />{" "}
                ${formatNumber(transaction.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreditDebit;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "tailwindcss/tailwind.css";
// import { transactions } from './data';

// const CreditDebit = () => {
//   const [record, setRecord] = useState(null);
//   const userData = JSON.parse(localStorage.getItem("user"));
//   const [loading, setLoading] = useState(false);
//   const data = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");
//   const userId = data._id;

//   useEffect(() => {
//     fetchUserData();
//   }, [userId]);

//   const fetchUserData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://skyline-2kje.onrender.com/bank-statement/${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setRecord(response.data.user);
//     } catch (error) {
//       if (error.response && error.response.status === 404) {
//         console.log("User not found");
//       } else {
//         toast.error("Internal Server Error: " + error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//         <div className="text-center flex items-center justify-center">
//           <svg
//             className="animate-spin h-5 w-5 mr-3 text-white"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             ></circle>
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//             ></path>
//           </svg>
//         </div>
//     );
//   }

//   if (!userData) {
//     return (
//       <>
//           <div className="text-center flex items-center justify-center -text--clr-silver-v1">
//             <div>No user data available</div>
//           </div>
//       </>
//     );
//   }
//   return (
//     <>
//       {/* Financial Statement */}
//       <div className="-bg--clr-primary p-6 rounded shadow-md">
//         <div className="text-blue-800 font-bold mb-3">
//           YOUR FINANCIAL STATEMENT
//         </div>
//         <div className="p-5 h-max">
//           <h1 className="text-lg mb-2 -text--clr-silver-v1">
//             (CREDIT AND DEBIT STATEMENTS)
//           </h1>
//           <div className="overflow-auto rounded-lg shadow-custom hidden md:block">
//             <table className="w-full">
//               <thead className="border-b-2 -border--clr-silver-v1">
//                 <tr className="-text--clr-silver-v1">
//                   <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">REF.NO</th>
//                   <th className="p-3 text-sm font-semibold tracking-wide text-left">TYPE</th>
//                   <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">AMOUNT</th>
//                   <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">TO/FROM</th>
//                   <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">DESCRIPTION</th>
//                   <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">DATE/TIME</th>
//                   <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">STATUS</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y -divide--clr-silver-v1">
//                 {transactions.map((transaction, index) => (
//                   <tr key={index} className="-text--clr-silver-v1">
//                     <td className="p-3 text-sm -text--clr-silver-v1 whitespace-nowrap">
//                       <a href="#" className="font-bold text-blue-500 hover:underline">{transaction.refNo}</a>
//                     </td>
//                     <td className="p-3 text-sm -text--clr-silver-v1 whitespace-nowrap">{transaction.type}</td>
//                     <td className="p-3 text-sm -text--clr-silver-v1 whitespace-nowrap">{transaction.amount}</td>
//                     <td className="p-3 text-sm -text--clr-silver-v1 whitespace-nowrap">{transaction.toFrom}</td>
//                     <td className="p-3 text-sm -text--clr-silver-v1 whitespace-nowrap">{transaction.description}</td>
//                     <td className="p-3 text-sm -text--clr-silver-v1 whitespace-nowrap">{transaction.dateTime}</td>
//                     <td className="p-3 text-sm -text--clr-silver-v1 whitespace-nowrap">
//                       <span className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 ${
//                         transaction.status === 'Completed'
//                           ? 'text-green-800 bg-green-200'
//                           : transaction.status === 'Pending'
//                           ? 'text-yellow-800 bg-yellow-200'
//                           : 'text-gray-800 bg-gray-200'
//                       }`}>
//                         {transaction.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
//             {transactions.map((transaction, index) => (
//               <div key={index} className="-bg--clr-secondary space-y-3 p-4 rounded-lg shadow">
//                 <div className="flex items-center space-x-2 text-sm">
//                   <div>
//                     <a href="#" className="text-blue-500 font-bold hover:underline">#{transaction.refNo}</a>
//                   </div>
//                   <div className="text-gray-500">{transaction.dateTime.split(' ')[0]}</div>
//                   <div className="z-10">
//                     <span className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 ${
//                       transaction.status === 'Completed'
//                         ? 'text-green-800 bg-green-200'
//                         : transaction.status === 'Pending'
//                         ? 'text-yellow-800 bg-yellow-200'
//                         : 'text-gray-800 bg-gray-200'
//                     }`}>
//                       {transaction.status}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="text-sm -text--clr-silver-v1">
//                   {transaction.toFrom} <br /> {transaction.type}
//                 </div>
//                 <div className="text-sm font-medium -text--clr-silver-v1">{transaction.amount}</div>
//                 <div className="text-sm font-medium -text--clr-silver-v1">{transaction.description}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreditDebit;
