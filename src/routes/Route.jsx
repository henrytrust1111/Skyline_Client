import { RouterProvider, createHashRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "../pages/auth/login/Login";
import AdminDashboardParent from "../pages/adminDashboard/dashboardMain/adminDashboard";
// import AccountComponent from "../pages/adminDashboard/dashboardComponent/account/account";
import AccountDashboard from "../pages/adminDashboard/dashboardMain/dashboardAccount/dashboardAccount";
import DashboardManageAccount from "../pages/adminDashboard/dashboardMain/manageAccount/manageAccount";

import Dashboard from "../dashboards/client/Dashboard";
import Content from "../layout/Content/Content";
import Payment from "../layout/payment/Payment";
import Transfer from "../layout/transfer/Transfer";
import Loan from "../layout/loan/Loan";
import Profile from "../layout/profile/Profile";
import Transaction from "../layout/Transaction/Transaction";
import CustomerDetail from "../layout/customerDetail/CustomerDetail";
import RequestLoan from "../pages/adminDashboard/dashboardComponent/loanRequest/loanRequest";
// import MessageComponent from "../pages/adminDashboard/dashboardComponent/Messages/messageComponent";
import AllMessage from "../pages/adminDashboard/dashboardComponent/Messages/messages";
import AllHistory from "../pages/adminDashboard/dashboardComponent/history/history";
import Statement from "../layout/statement/Statement";
import Message from "../layout/message/Message";
import ForgotPassword from "../pages/auth/forgot-password/ForgotPassword";
import ResetPassword from "../pages/auth/reset-password/ResetPassword";
import UserSignup from "../pages/auth/signUp/signUp";
import OTPverify from "../pages/auth/otp/otp";
import OTPClient from "../pages/auth/otp-client/OTPClient";
import OTPVerification from "../pages/auth/otp-client/OTPClient";
import AdminLogin from "../pages/auth/loginAdmin/loginAdmin";
import Home from "../pages/home/Home";
import Contact from "../pages/contact/Contact";
import About from "../pages/about/About";
import Services from "../pages/services/Services";
import OtherServices from "../pages/others/others";

const route = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-in",
    element: <Login />,
  },

  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "others",
    element: <OtherServices />
  },
  {
    path: "/login",
    element: <AdminLogin />,
  },
  {
    path: "/signup",
    element: <UserSignup />,
  },
  {
    path: "/otp-verification/:userId",
    element: <OTPVerification />,
  },
  {
    path: "/otp",
    element: <OTPverify />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:userId",
    element: <ResetPassword />,
  },
  {
    path: "/admin",
    element: <AdminDashboardParent />,
  },
  {
    path: "/allacount",
    element: <AccountDashboard />,
  },
  {
    path: "accountmanage",
    element: <DashboardManageAccount />,
  },
  // {
  //   path: "/loanrequest",
  //   element: <RequestLoan />
  // },
  {
    path: "/messages",
    element: <AllMessage />,
  },
  {
    path: "/history",
    element: <AllHistory />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: <Profile />,
      },
      // {
      //   path: "/dashboard",
      //   element: <Content />,
      // },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/detail",
        element: <CustomerDetail />,
      },
      {
        path: "/dashboard/transfer",
        element: <Transfer />,
      },
      {
        path: "/dashboard/account-statement",
        element: <Statement />,
      },
      {
        path: "/dashboard/transaction",
        element: <Transaction />,
      },
      {
        path: "/dashboard/payment",
        element: <Payment />,
      },
      {
        path: "/dashboard/message",
        element: <Message />,
      },
      {
        path: "/dashboard/loan",
        element: <Loan />,
      },
    ],
  },
]);

function Route() {
  return (
    <>
      <Toaster />
      <RouterProvider router={route} />
    </>
  );
}

export default Route;
