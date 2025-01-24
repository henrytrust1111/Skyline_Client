import { Link } from "react-router-dom";
// import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

const Header = ({handleHidden}) => {
    const [scroll, setScroll] = useState(0)
    useEffect(() => {
        document.addEventListener("scroll", () => {
          const scrollCheck = window.scrollY > 100
          if (scrollCheck !== scroll) {
            setScroll(scrollCheck)
          }
        })
      })
    return (
        <>
            <header className={scroll ? "bg-transparent sticky-bar mt-4 stick": "bg-transparent sticky-bar mt-4"}>
                <div className="container bg-white">
                    <nav className="bg-transparent flex justify-between items-center py-3">
                        <Link to="/" className="flex items-center font-bold text-2xl gap-3" legacyBehavior>
                            <a className="text-3xl font-semibold leading-none">
                                <img
                                    className="h-10"
                                    src="/imgs/logos/logo2.jpg"
                                    alt="Skyline-finance"
                                />
                            </a>
                            {/* <span className="hidden lg:flex">SKYLINE</span> */}
                            <span className="flex lg:hidden">SKYLINE</span>
                        </Link>
                        <ul className="hidden lg:flex lg:items-center lg:w-auto lg:space-x-12">
                            <li className="group relative pt-4 pb-4 has-child">
                                <Link to="/" >
                                    <a className="text-sm font-semibold text-blueGray-600 hover:text-blueGray-500">
                                        Home
                                    </a>
                                </Link>
                               
                            </li>
                            <li className="pt-4 pb-4">
                                <Link to="/about" legacyBehavior>
                                    <a className="text-sm font-semibold text-blueGray-600 hover:text-blueGray-500">
                                        About Us
                                    </a>
                                </Link>
                            </li>
                            <li className="pt-4 pb-4">
                                <Link to="/services" legacyBehavior>
                                    <a className="text-sm font-semibold text-blueGray-600 hover:text-blueGray-500">
                                        Safe Deposite Box
                                    </a>
                                </Link>
                            </li>
                           
                            <li className="pt-4 pb-4">
                                <Link to="/contact" legacyBehavior>
                                    <a className="text-sm font-semibold text-blueGray-600 hover:text-blueGray-500">
                                        Cash Management services
                                    </a>
                                </Link>
                            </li>
                            <li className="pt-4 pb-4">
                                <Link to="/others" legacyBehavior>
                                    <a className="text-sm font-semibold text-blueGray-600 hover:text-blueGray-500">
                                        Other services
                                    </a>
                                </Link>
                            </li>
                        </ul>
                        <div className="hidden lg:block">
                            <Link to="/sign-in" legacyBehavior>
                                <a className="btn-accent hover-up-2">Log In</a>
                            </Link>
                            <Link to="/signup" legacyBehavior>
                                <a className="btn-primary hover-up-2">
                                    Sign Up
                                </a>
                            </Link>
                        </div>
                        <div className="lg:hidden">
                            <button className="navbar-burger flex items-center py-2 px-3 text-blue-500 hover:text-blue-700 rounded border border-blue-200 hover:border-blue-300" onClick={handleHidden}>
                                <svg
                                    className="fill-current h-4 w-4"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>Mobile menu</title>
                                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                                </svg>
                            </button>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;
