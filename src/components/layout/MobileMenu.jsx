import React, { useState } from "react";
// import Link from "next/link";
import { Link } from "react-router-dom";

const MobileMenu = ({ hiddenClass, handleRemove }) => {
    const [isActive, setIsActive] = useState({
        status: false,
        key: "",
    });

    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            });
        } else {
            setIsActive({
                status: true,
                key,
            });
        }
    };
    return (
        <>
            <div className={`${hiddenClass} navbar-menu relative z-[9999] transition duration-300`}>
                <div className="navbar-backdrop fixed inset-0 bg-blueGray-800 opacity-25"></div>
                <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto transition duration-300">
                    <div className="flex items-center mb-8 justify-between">
                        <Link to="/" legacyBehavior>
                            <a className="mr-auto text-3xl font-semibold leading-none">
                                <img className="h-10" src="/imgs/logos/favicon.svg" alt="" />
                            </a>
                        </Link>
                        <button className="navbar-close" onClick={handleRemove}>
                            <svg className="h-6 w-6 text-blueGray-400 cursor-pointer hover:text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <ul className="mobile-menu">
                            <li className={isActive.key == 1 ? "mb-1 menu-item-has-children rounded-xl active" : "mb-1 menu-item-has-children rounded-xl"} onClick={() => handleToggle(1)}>
                                <span className="menu-expand">+</span>
                                <Link to="/" legacyBehavior>
                                    <a className="block p-4 text-sm text-blueGray-500 hover:bg-blue-50 hover:text-blue-500 rounded-xl">Home</a>
                                </Link>
                               
                            </li>
                            <li className="mb-1 rounded-xl">
                                <Link to="/about" legacyBehavior>
                                    <a className="block p-4 text-sm text-blueGray-500 hover:bg-blue-50 hover:text-blue-500 rounded-xl">About Us</a>
                                </Link>
                            </li>
                            <li className="mb-1">
                                <Link to="/services" legacyBehavior>
                                    <a className="block p-4 text-sm text-blueGray-500 hover:bg-blue-50 hover:text-blue-500">Safe Deposite Box</a>
                                </Link>
                            </li>
                            
                            <li className="mb-1">
                                <Link to="/contact" legacyBehavior>
                                    <a className="block p-4 text-sm text-blueGray-500 hover:bg-blue-50 hover:text-blue-500">Cash Management Services</a>
                                </Link>
                            </li>
                            <li className="mb-1">
                                <Link to="/others" legacyBehavior>
                                    <a className="block p-4 text-sm text-blueGray-500 hover:bg-blue-50 hover:text-blue-500">Other Services</a>
                                </Link>
                            </li>
                        </ul>
                        <div className="mt-4 pt-6 border-t border-blueGray-100">
                            <Link to="/signup" legacyBehavior>
                                <a className="block px-4 py-3 mb-3 text-xs text-center font-semibold leading-none bg-blue-400 hover:bg-blue-500 text-white rounded">Sign Up</a>
                            </Link>
                            <Link to="/sign-in" legacyBehavior>
                                <a className="block px-4 py-3 mb-2 text-xs text-center text-blue-500 hover:text-blue-700 font-semibold leading-none border border-blue-200 hover:border-blue-300 rounded">Log In</a>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-auto">
                        <p className="my-4 text-xs text-blueGray-400">
                            <span>Get in Touch</span>
                            <span className="text-blue-500 hover:text-blue-500 underline">customercare@Skyline-finance.com</span>
                        </p>
                        {/* <a className="inline-block px-1" to="https://facebook.com">
                            <img src="/imgs/icons/facebook-blue.svg" alt="Monst" />
                        </a>
                        <a className="inline-block px-1" to="https://twitter.com">
                            <img src="/imgs/icons/twitter-blue.svg" alt="Monst" />
                        </a>
                        <a className="inline-block px-1" to="https://www.instagram.com">
                            <img src="/imgs/icons/instagram-blue.svg" alt="Monst" />
                        </a> */}
                    </div>
                </nav>
            </div>
        </>
    );
};

export default MobileMenu;
