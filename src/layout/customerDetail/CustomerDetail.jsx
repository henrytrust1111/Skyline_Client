import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope } from "react-icons/fa";
import ContentTop from "../../components/ContentTop/ContentTop";
import EditProfileModal from "../../components/ContentTop/modals/EditProfileModal";
import LoadingSpinner from "../../components/LoadingSpinner";

const CustomerDetail = () => {
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const data = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const userId = data._id;

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://skyline-2kje.onrender.com/view-me/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data.user);
      localStorage.setItem("userData", JSON.stringify(response.data.user));
      toast.success("User data fetched successfully!");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("User not found");
      } 
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!userData) {
    return (
      <div className="main-content">
        <ContentTop />
        <div className="text-center flex items-center justify-center -text--clr-silver-v1">
          <div>No user data available</div>
        </div>
      </div>
    );
  }

  const {
    fullName,
    email,
    accountNumber,
    totalBalance,
    phoneNumber,
    occupation,
    maritalStatus,
    address,
    registrationDate,
    availableBalance,
    accountStatus,
    accountType,
    accountCurrency,
  } = userData;

  return (
    <>
      <div className="main-content">
        <ContentTop />
        <div className="flex flex-col sm:!flex-row gap-4 -bg--clr-secondary p-4 rounded-lg shadow-md md:space-x-2">
          {/* Left Side */}
          <div className="flex-1 -bg--clr-primary p-4 rounded-lg shadow-sm mb-4 md:mb-0">
            <div className="text-2xl font-bold -text--clr-silver underline underline-offset-8 mb-2">
              {fullName}
            </div>
            <div className="text-sm -text--clr-silver-v1">{accountNumber}</div>
            <div className="mt-4">
              <div className="text-sm font-medium flex items-center -text--clr-silver-v1">
                <FaEnvelope className="h-5 w-5 -text--clr-silver-v1 mr-2" />{" "}
                Email:
              </div>
              <div className="text-sm -text--clr-silver">{email}</div>
              <div className="w-full bg-blue-500 h-1 mt-2 rounded"></div>
            </div>
            <div className="mt-4">
              <div className="text-sm font-medium flex items-center -text--clr-silver-v1">
                <span className="text-2xl -text--clr-silver-v1 mr-2">
                  {accountCurrency}
                </span>
                Total Balance:
              </div>
              <div className="text-sm -text--clr-silver">
                {`${accountCurrency} ${
                  isNaN(totalBalance) ? 0 : formatNumber(totalBalance)
                }`}
              </div>
              <div className="w-full bg-blue-500 h-1 mt-2 rounded"></div>
            </div>
            <div className="mt-4">
              <div className="text-sm font-medium flex items-center -text--clr-silver-v1">
                <span className="text-2xl -text--clr-silver-v1 mr-2">
                  {accountCurrency}
                </span>{" "}
                Available Balance:
              </div>
              <div className="text-sm -text--clr-silver">
                {`${accountCurrency} ${
                  isNaN(availableBalance) ? 0 : formatNumber(availableBalance)
                }`}
              </div>
              <div className="w-full bg-blue-500 h-1 mt-2 rounded"></div>
            </div>
            <div className="mt-4">
              <div className="text-sm font-medium flex items-center -text--clr-silver-v1">
                <span className="text-2xl -text--clr-silver-v1 mr-2">
                  {accountCurrency}
                </span>{" "}
                Account Status:
              </div>
              <div className="text-sm -text--clr-silver">{accountStatus}</div>
              <div className="w-full bg-blue-500 h-1 mt-2 rounded"></div>
            </div>
            <div className="mt-4">
              <div className="text-sm font-medium flex items-center -text--clr-silver-v1">
                <span className="text-2xl -text--clr-silver-v1 mr-2">
                  {accountCurrency}
                </span>{" "}
                Account Type:
              </div>
              <div className="text-sm -text--clr-silver">{accountType}</div>
              <div className="w-full bg-blue-500 h-1 mt-2 rounded"></div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex-1 -bg--clr-primary p-4 rounded-lg shadow-sm">
            <div className="text-lg font-bold -text--clr-silver">
              Profile Overview
            </div>
            <div className="text-sm -text--clr-silver-v1 mt-2">
              Below are your profile details. Should you wish to make any
              changes to your profile, kindly click{" "}
              <a
                className="text-blue-600 cursor-pointer"
                onClick={toggleModal}
                role="button"
                tabIndex="0"
              >
                Here
              </a>
            </div>
            <div className="mt-4">
              <ul className="list-disc pl-5 -text--clr-silver-v1">
                <li className="text-sm font-medium">Phone Number:</li>
                <div className="text-sm -text--clr-silver pl-5">
                  {phoneNumber}
                </div>
                <li className="text-sm font-medium mt-4">Occupation:</li>
                <div className="text-sm -text--clr-silver pl-5">
                  {occupation}
                </div>
                <li className="text-sm font-medium mt-4">Marital Status:</li>
                <div className="text-sm -text--clr-silver pl-5">
                  {maritalStatus}
                </div>
                <li className="text-sm font-medium mt-4">Address:</li>
                <div className="text-sm -text--clr-silver pl-5">{address}</div>
                <li className="text-sm font-medium mt-4">Registration Date:</li>
                <div className="text-sm -text--clr-silver pl-5">
                  {new Date(registrationDate).toLocaleDateString()}
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <EditProfileModal onClose={toggleModal} />}
    </>
  );
};

export default CustomerDetail;
























// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaEnvelope } from "react-icons/fa";
// import ContentTop from "../../components/ContentTop/ContentTop";
// import EditProfileModal from "../../components/ContentTop/modals/EditProfileModal";

// const CustomerDetail = () => {
//   const [userData, setUserData] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
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
//         `https://skyline-2kje.onrender.com/view-me/${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );
//       setUserData(response.data.user);
//       localStorage.setItem("userData", JSON.stringify(response.data.user));
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

//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   if (loading) {
//     return (
      // <div className="main-content">
      //   <ContentTop />
      //   <div className="text-center flex items-center justify-center">
      //     <svg
      //       className="animate-spin h-5 w-5 mr-3 text-white"
      //       xmlns="http://www.w3.org/2000/svg"
      //       fill="none"
      //       viewBox="0 0 24 24"
      //     >
      //       <circle
      //         className="opacity-25"
      //         cx="12"
      //         cy="12"
      //         r="10"
      //         stroke="currentColor"
      //         strokeWidth="4"
      //       ></circle>
      //       <path
      //         className="opacity-75"
      //         fill="currentColor"
      //         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      //       ></path>
      //     </svg>
      //   </div>
      // </div>
//     );
//   }

//   if (!userData) {
//     return (
//       <>
//         <div className="main-content">
//           <ContentTop />
//           <div className="text-center flex items-center justify-center -text--clr-silver-v1">
//             <div>No user data available</div>
//           </div>
//         </div>
//       </>
//     );
//   }

//   const formatNumber = (number) => {
//     return new Intl.NumberFormat("en-US").format(number);
//   };

//   const {
//     fullName,
//     _id,
//     email,
//     accountNumber,
//     totalBalance,
//     phoneNumber,
//     occupation,
//     maritalStatus,
//     address,
//     registrationDate,
//     availableBalance,
//     accountStatus,
//     accountType,
//     accountCurrency
//   } = userData;

//   console.log(userData);

//   return (
//     <>
//       <div className="main-content">
//         <ContentTop />
//         <div className="flex flex-col sm:!flex-row gap-4 -bg--clr-secondary p-4 rounded-lg shadow-md md:space-x-2">
//           {/* Left Side */}
//           <div className="flex-1 -bg--clr-primary p-4 rounded-lg shadow-sm mb-4 md:mb-0">
//             <div className="text-2xl font-bold -text--clr-silver underline underline-offset-8 mb-2">
//               {fullName}
//             </div>
//             <div className="text-sm -text--clr-silver-v1">{accountNumber}</div>
//             <div className="mt-4">
//               <div className="text-sm font-medium flex items-center -text--clr-silver-v1">
//                 <FaEnvelope className="h-5 w-5 -text--clr-silver-v1 mr-2" />{" "}
//                 Email:
//               </div>
//               <div className="text-sm -text--clr-silver">{email}</div>
//               <div className="w-full bg-blue-500 h-1 mt-2 rounded"></div>
//             </div>
//             <div className="mt-4">
//               <div className="text-sm font-medium flex items-center -text--clr-silver-v1">
//                 <span className="text-2xl -text--clr-silver-v1 mr-2">
//                   {accountCurrency}
//                 </span>
//                 Total Balance:
//               </div>
//               <div className="text-sm -text--clr-silver">
//                 {`${accountCurrency} ${
//                   isNaN(totalBalance) ? 0 : formatNumber(totalBalance)
//                 }`}
//               </div>
//               <div className="w-full bg-blue-500 h-1 mt-2 rounded"></div>
//             </div>
//             <div className="mt-4">
//               <div className="text-sm font-medium flex items-center -text--clr-silver-v1">
//                 <span className="text-2xl -text--clr-silver-v1 mr-2">
//                   {accountCurrency}
//                 </span>{" "}
//                 Available Balance:
//               </div>
//               <div className="text-sm -text--clr-silver">
//                 {`${accountCurrency} ${
//                   isNaN(availableBalance) ? 0 : formatNumber(availableBalance)
//                 }`}
//               </div>
//               <div className="w-full bg-blue-500 h-1 mt-2 rounded"></div>
//             </div>
//             <div className="mt-4">
//               <div className="text-sm font-medium flex items-center -text--clr-silver-v1">
//                 <span className="text-2xl -text--clr-silver-v1 mr-2">
//                   {accountCurrency}
//                 </span>{" "}
//                 Account Status:
//               </div>
//               <div className="text-sm -text--clr-silver">{accountStatus}</div>
//               <div className="w-full bg-blue-500 h-1 mt-2 rounded"></div>
//             </div>
//             <div className="mt-4">
//               <div className="text-sm font-medium flex items-center -text--clr-silver-v1">
//                 <span className="text-2xl -text--clr-silver-v1 mr-2">
//                   {accountCurrency}
//                 </span>{" "}
//                 Account Type:
//               </div>
//               <div className="text-sm -text--clr-silver">{accountType}</div>
//               <div className="w-full bg-blue-500 h-1 mt-2 rounded"></div>
//             </div>
//           </div>

//           {/* Right Side */}
//           <div className="flex-1 -bg--clr-primary p-4 rounded-lg shadow-sm">
//             <div className="text-lg font-bold -text--clr-silver">
//               Profile Overview
//             </div>
//             <div className="text-sm -text--clr-silver-v1 mt-2">
//               Below are your profile details. Should you wish to make any
//               changes to your profile, kindly click{" "}
//               <a className="text-blue-600 cursor-pointer" onClick={toggleModal}>
//                 Here
//               </a>
//             </div>
//             <div className="mt-4">
//               <ul className="list-disc pl-5 -text--clr-silver-v1">
//                 <li className="text-sm font-medium">Phone Number:</li>
//                 <div className="text-sm -text--clr-silver pl-5">
//                   {phoneNumber}
//                 </div>
//                 <li className="text-sm font-medium mt-4">Occupation:</li>
//                 <div className="text-sm -text--clr-silver pl-5">
//                   {occupation}
//                 </div>
//                 <li className="text-sm font-medium mt-4">Marital Status:</li>
//                 <div className="text-sm -text--clr-silver pl-5">
//                   {maritalStatus}
//                 </div>
//                 <li className="text-sm font-medium mt-4">Address:</li>
//                 <div className="text-sm -text--clr-silver pl-5">{address}</div>
//                 <li className="text-sm font-medium mt-4">Registration Date:</li>
//                 <div className="text-sm -text--clr-silver pl-5">
//                   {new Date(registrationDate).toLocaleDateString()}
//                 </div>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//       {isModalOpen && <EditProfileModal onClose={toggleModal} />}
//       <ToastContainer />
//     </>
//   );
// };

// export default CustomerDetail;
