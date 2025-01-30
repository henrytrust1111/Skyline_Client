import React, { useEffect, useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { DB } from "../../../Global/Features";

const AdminLogin = () => {
//   const [accountNumber, setAccountNumber] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(DB(["Hello World"]));
  }, [dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // if (username !== "veevs") {
    //     setIsLoading(false)
    //     toast.error("incorrect username")
    // } else if(password !== "") {
    //     setIsLoading(false)
    //     toast.error("incorrect password")
    // } else {
    try {
      const response = await axios.post("https://skyline-2kje.onrender.com/admin-login", {
        username: username,
        password: password,
      });
      const { message, data, token } = response.data;
      toast.success(message);
      localStorage.setItem("adminData", JSON.stringify(data));
    //   localStorage.setItem("token", token);
      nav("/admin");
    } catch (error) {
        console.log(error)
        setIsLoading(false)
        toast.error(error.message);
    } 
  // }
  };

  return (
    <div className="flex justify-center items-center min-h-screen -bg--clr-secondary px-4" 
    // style={{backgroundImage: 'url("./imgs/logos/favicon.svg")'}}
    >
      <div className="w-full max-w-md md:max-w-lg lg:w-[40%] bg--clr-primary p-8 rounded-lg lg:shadow-lg sm:w-[60%] sm:shadow-none -text--clr-silver-v1">
        <ToastContainer />
        <h1 className="text-2xl lg:text-3xl font-bold text-center mb-3 uppercase -text--clr-pumpkin">
          SKYLINE FINANCE ADMIN
        </h1>
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="flex items-center border-b -border--clr-silver-v1 py-2 -text--clr-silver-v1">
            <MdAccountBalance className="-text--clr-silver-v1 mr-3" />
            <input
              type="text"
              placeholder="username"
              name="accountNumber"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="appearance-none bg-transparent border-none w-full -text--clr-silver-v1 leading-tight focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center border-b -border--clr-silver-v1 py-2 relative">
            <FaLock className="-text--clr-silver-v1 mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none bg-transparent border-none w-full -text--clr-silver-v1 leading-tight focus:outline-none"
              required
            />
            <div
              className="absolute right-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-500" />
              ) : (
                <FaEye className="text-gray-500" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="-bg--clr-pumpkin hover:-bg--clr-pumpkin-light text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
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
              ) : (
                "Login"
              )}
            </button>
            {/* <Link
              to="/forgot-password"
              className="inline-block align-baseline font-bold text-sm -text--clr-pumpkin hover:-text--clr-pumpkin-light"
            >
              Forgot Password?
            </Link> */}
          </div>
        </form>
        <div className="text-center mt-6 flex flex-col items-center lg:flex-row lg:justify-center lg:space-x-1 ">
          {/* <span className="italic"> Don't have an account?</span>
          <Link
            to="/signup"
            className="-text--clr-pumpkin hover:-text--clr-pumpkin-light"
          >
            Create an Account
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
