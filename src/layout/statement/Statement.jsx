import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "tailwindcss/tailwind.css";
import bar from "../../assets/icons/barChart.svg";
import FinancialStatement from "../profile/FinancialStatement";
import CreditDebit from "../profile/CreditDebit";
import ContentTop from "../../components/ContentTop/ContentTop";
import AtmCardDetail from "./AtmCardDetail";

const Statement = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
 
  return (
    <>
      <div className="main-content">
        <ContentTop />
        <div className="p-6 space-y-6 -bg--clr-secondary">
          {/* Header */}
          <div className="text-2xl font-bold -text--clr-white">
            {`Hi, ${userData?.fullName} View Your Transactions History!`}
          </div>
          <div className="-text--clr-silver-v1">Banking Like Never Before.</div>

          {/* Main Content */}
         

          <FinancialStatement />

          <CreditDebit />
        </div>
      </div>
    </>
  );
};

export default Statement;







// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "tailwindcss/tailwind.css";
// import bar from "../../assets/icons/barChart.svg";
// import FinancialStatement from "../profile/FinancialStatement";
// import CreditDebit from "../profile/CreditDebit";
// import ContentTop from "../../components/ContentTop/ContentTop";
// import AtmCardDetail from "./AtmCardDetail";

// const Statement = () => {
//   const userData = JSON.parse(localStorage.getItem("user"));
 
//   return (
//     <>
//       <div className="main-content">
//         <ContentTop />
//         <div className="p-6 space-y-6 -bg--clr-secondary">
//           {/* Header */}
//           <div className="text-2xl font-bold -text--clr-white">
//             {`Hi, ${userData?.fullName} Welcome back!`}
//           </div>
//           <div className="-text--clr-silver-v1">Banking Like Never Before.</div>

//           {/* Main Content */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Left Side */}
//             <div className="-bg--clr-primary p-6 rounded shadow-md space-y-6">
//               {/* Available Balance */}
//               <div className="flex justify-between items-center">
//                 <div>
//                   <div className="-text--clr-silver">Available Balance</div>
//                   <div className="text-3xl font-bold -text--clr-silver-v1">
//                     {`$${userData?.availableBalance}`}
//                   </div>
//                 </div>
//                 <div className="-text--clr-white font-bold ml-1 bg-blue-800 py-1 px-2 rounded ">
//                   VISA
//                 </div>
//               </div>

//               {/* Bar Chart */}
//               <div className="mt-4">
//                 <img src={bar} alt="Bar Chart" className="w-[100px] h-auto" />
//               </div>

//               {/* Account Details */}
//               <div className="space-y-2 -text--clr-silver-v1">
//                 <div className="">Your Account Number</div>
//                 <div className="text-2xl font-bold">{userData?.accountNumber}</div>
//               </div>
//               <div className="grid grid-cols-3 gap-2">
//                 <div>
//                   <div className="-text--clr-silver">Account Holder</div>
//                   <div className="font-bold -text--clr-silver-v1">
//                     {userData?.fullName}
//                   </div>
//                 </div>
//                 <div>
//                   <div className="-text--clr-silver">Account Type</div>
//                   <div className="font-bold -text--clr-silver-v1">
//                     {userData?.accountType}
//                   </div>
//                 </div>
//                 <div>
//                   <div className="-text--clr-silver">Account Status</div>
//                   <div className="font-bold -text--clr-silver-v1">{userData?.status}</div>
//                 </div>
//               </div>
//             </div>

//             {/* Middle Side */}
//             <div className="space-y-6">
//               {/* Total Book Balance */}
//               <div className="-bg--clr-primary p-6 rounded shadow-md space-y-2">
//                 <div className="-text--clr-silver">Total Book Balance</div>
//                 <div className="text-3xl font-bold -text--clr-silver-v1">
//                   {`$${userData?.totalBalance}`}
//                 </div>
//                 <div className="-text--clr-silver-v1">as at July 4, 2024</div>

//                 {/* Bar Chart */}
//                 <div className="mt-4">
//                   <img src={bar} alt="Bar Chart" className="w-[100px] h-auto" />
//                 </div>
//               </div>

//               {/* Registered Email */}
//               <div className="-bg--clr-primary p-6 rounded shadow-md">
//                 <div className="-text--clr-silver">Registered Email</div>
//                 <div className="text-lg font-bold -text--clr-silver-v1 line-clamp-5">
//                   {userData.email}
//                 </div>
//               </div>
//             </div>

//             {/* Right Side */}
//             <AtmCardDetail />
//           </div>

//           <FinancialStatement />

//           <CreditDebit />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Statement;
