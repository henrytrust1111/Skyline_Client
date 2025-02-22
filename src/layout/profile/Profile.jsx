import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import bar from "../../assets/icons/barChart.svg";
import ContentTop from "../../components/ContentTop/ContentTop";
import CreditDebit from "./CreditDebit";
import FinancialStatement from "./FinancialStatement";
import AtmCardDetail from "../statement/AtmCardDetail";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const data = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const userId = data?._id;

  // Format number with commas
  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  // Fetch user data
  useEffect(() => {
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
        setUserData(response.data.user);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        localStorage.setItem("balance", JSON.stringify(response.data.user));
        toast.success("User data fetched successfully!");
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error("User not found");
        } else {
          toast.error("Error fetching user data: " + error.message);
        }
      } finally {
        setLoading(false); // Set loading to false after the data is fetched or an error occurs
      }
    };

    if (userId) {
      fetchUserData();
    } else {
      setLoading(false); // If userId is not available, stop loading
    }
  }, [userId, token]);

  // Destructure userData for cleaner code
  const {
    fullName,
    accountNumber,
    availableBalance,
    totalBalance,
    accountCurrency,
    accountType,
    accountStatus,
    email
  } = userData || {};

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!userData) {
    return (
      <div className="main-content">
        <ContentTop />
        <div className="text-center flex items-center justify-center text-gray-400">
          <div>No user data available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <ContentTop />
      <div className="p-6 space-y-6 -bg--clr-secondary">
        {/* Header */}
        <div className="text-2xl font-bold text-white">
          {`Hi, ${fullName} Welcome back!`}
        </div>
        <div className="text-gray-400">Banking Like Never Before.</div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side */}
          <div className="-bg--clr-primary p-6 rounded shadow-md space-y-6">
            {/* Available Balance */}
            <div className="flex justify-between items-center">
              <div>
                <div className="text-gray-400">Available Balance</div>
                <div className="text-3xl font-bold text-gray-200">
                  {`${accountCurrency} ${
                    isNaN(availableBalance) ? 0 : formatNumber(availableBalance)
                  }`}
                </div>
              </div>
              <div className="text-white font-bold ml-1 bg-blue-800 py-1 px-2 rounded">
                VISA
              </div>
            </div>

            {/* Bar Chart */}
            <div className="mt-4">
              <img src={bar} alt="Bar Chart" className="w-[100px] h-auto" />
            </div>

            {/* Account Details */}
            <div className="space-y-2 text-gray-400">
              <div>Your Account Number</div>
              <div className="text-2xl font-bold">{accountNumber}</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <div className="text-gray-400">Account Holder</div>
                <div className="font-bold text-gray-200">{fullName}</div>
              </div>
              <div>
                <div className="text-gray-400">Account Type</div>
                <div className="font-bold text-gray-200">{accountType}</div>
              </div>
              <div>
                <div className="text-gray-400">Account Status</div>
                <div className="font-bold text-gray-200">{accountStatus}</div>
              </div>
            </div>
          </div>

          {/* Middle Side */}
          <div className="space-y-6">
            {/* Total Book Balance */}
            <div className="-bg--clr-primary p-6 rounded shadow-md space-y-2">
              <div className="text-gray-400">Total Book Balance</div>
              <div className="text-3xl font-bold text-gray-200">
                {`${accountCurrency} ${
                  isNaN(totalBalance) ? 0 : formatNumber(totalBalance)
                }`}
              </div>
              <div className="mt-4">
                <img src={bar} alt="Bar Chart" className="w-[100px] h-auto" />
              </div>
            </div>

            {/* Registered Email */}
            <div className="-bg--clr-primary p-6 rounded shadow-md">
              <div className="text-gray-400">Registered Email</div>
              <div className="text-lg font-bold text-gray-200 line-clamp-5">
                {email}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <AtmCardDetail />
        </div>

        <FinancialStatement />
        <CreditDebit />
      </div>
    </div>
  );
};

export default Profile;

// import React, { useEffect, useState } from "react";
// import "tailwindcss/tailwind.css";
// import bar from "../../assets/icons/barChart.svg";
// import ContentTop from "../../components/ContentTop/ContentTop";
// import CreditDebit from "./CreditDebit";
// import FinancialStatement from "./FinancialStatement";
// import AtmCardDetail from "../statement/AtmCardDetail";
// import { toast } from "react-toastify";
// import LoadingSpinner from "../../components/LoadingSpinner";
// import axios from "axios";

// const Profile = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const data = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");
//   const userId = data?._id;

//   // Format number with commas
//   const formatNumber = (number) => {
//     return new Intl.NumberFormat("en-US").format(number);
//   };

//   // Fetch user data
//   useEffect(() => {
//     const fetchUserData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `https://skyline-2kje.onrender.com/view-me/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           }
//         );
//         setUserData(response.data.user);
//         localStorage.setItem("userData", JSON.stringify(response.data.user));
//         localStorage.setItem("balance", JSON.stringify(response.data.user));
//         toast.success("User data fetched successfully!");
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           toast.error("User not found");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) {
//       fetchUserData();
//     }
//   }, [userId, token]);

//   // Destructure userData for cleaner code
//   const {
//     fullName,
//     accountNumber,
//     availableBalance,
//     totalBalance,
//     accountCurrency,
//     accountType,
//     accountStatus,
//     email
//   } = userData || {};

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   if (!userData) {
//     return (
//       <div className="main-content">
//         <ContentTop />
//         <div className="text-center flex items-center justify-center text-gray-400">
//           <div>No user data available</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="main-content">
//       <ContentTop />
//       <div className="p-6 space-y-6 -bg--clr-secondary">
//         {/* Header */}
//         <div className="text-2xl font-bold text-white">
//           {`Hi, ${fullName} Welcome back!`}
//         </div>
//         <div className="text-gray-400">Banking Like Never Before.</div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Side */}
//           <div className="-bg--clr-primary p-6 rounded shadow-md space-y-6">
//             {/* Available Balance */}
//             <div className="flex justify-between items-center">
//               <div>
//                 <div className="text-gray-400">Available Balance</div>
//                 <div className="text-3xl font-bold text-gray-200">
//                   {`${accountCurrency} ${
//                     isNaN(availableBalance) ? 0 : formatNumber(availableBalance)
//                   }`}
//                 </div>
//               </div>
//               <div className="text-white font-bold ml-1 bg-blue-800 py-1 px-2 rounded">
//                 VISA
//               </div>
//             </div>

//             {/* Bar Chart */}
//             <div className="mt-4">
//               <img src={bar} alt="Bar Chart" className="w-[100px] h-auto" />
//             </div>

//             {/* Account Details */}
//             <div className="space-y-2 text-gray-400">
//               <div>Your Account Number</div>
//               <div className="text-2xl font-bold">{accountNumber}</div>
//             </div>
//             <div className="grid grid-cols-3 gap-2">
//               <div>
//                 <div className="text-gray-400">Account Holder</div>
//                 <div className="font-bold text-gray-200">{fullName}</div>
//               </div>
//               <div>
//                 <div className="text-gray-400">Account Type</div>
//                 <div className="font-bold text-gray-200">{accountType}</div>
//               </div>
//               <div>
//                 <div className="text-gray-400">Account Status</div>
//                 <div className="font-bold text-gray-200">{accountStatus}</div>
//               </div>
//             </div>
//           </div>

//           {/* Middle Side */}
//           <div className="space-y-6">
//             {/* Total Book Balance */}
//             <div className="-bg--clr-primary p-6 rounded shadow-md space-y-2">
//               <div className="text-gray-400">Total Book Balance</div>
//               <div className="text-3xl font-bold text-gray-200">
//                 {`${accountCurrency} ${
//                   isNaN(totalBalance) ? 0 : formatNumber(totalBalance)
//                 }`}
//               </div>
//               <div className="mt-4">
//                 <img src={bar} alt="Bar Chart" className="w-[100px] h-auto" />
//               </div>
//             </div>

//             {/* Registered Email */}
//             <div className="-bg--clr-primary p-6 rounded shadow-md">
//               <div className="text-gray-400">Registered Email</div>
//               <div className="text-lg font-bold text-gray-200 line-clamp-5">
//                 {email}
//               </div>
//             </div>
//           </div>

//           {/* Right Side */}
//           <AtmCardDetail />
//         </div>

//         <FinancialStatement />
//         <CreditDebit />
//       </div>
//     </div>
//   );
// };

// export default Profile;
