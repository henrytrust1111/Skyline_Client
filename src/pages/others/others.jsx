import React from 'react';
import Layout from '../../components/layout/Layout';

const OtherServices = () => {
    return (
        <>
            <Layout>
                <section className="-mt-24 pt-40 pb-12 bg-blueGray-100">
                    <div className="container">
                        <h1 className="text-2xl lg:text-5xl font-bold mb-5 wow animate__animated animate__fadeIn animated">Our Services</h1>
                        <ul className="flex text-gray-500 text-sm lg:text-sm pb-12 wow animate__animated animate__fadeIn animated">
                            <li className="inline-flex items-center">
                                <a href="#" className="hover:text-blue-500 text-gray-800">
                                    Home
                                </a>
                                <svg fill="currentColor" viewBox="0 0 20 20" className="h-5 w-auto text-gray-300">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                </svg>
                            </li>
                            <li className="inline-flex items-center">
                                <a href="#" className="hover:text-blue-500 text-gray-800">
                                    Our Services
                                </a>
                                <svg fill="currentColor" viewBox="0 0 20 20" className="h-5 w-auto text-gray-300">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                </svg>
                            </li>
                            <li className="inline-flex items-center text-gray-400">
                                <span>Bank Services</span>
                            </li>
                        </ul>
                    </div>
                </section>
                <section className="pt-12">
                    <div className="container py-12 mx-auto">
                        <div className="flex flex-wrap">
                            <div className="w-full md:w-1/2 pr-12 px-3 order-0 md:order-0 mb-12 md:mb-0 wow animate__animated animate__fadeIn" data-wow-delay=".5s">
                                <img className="sm:max-w-sm lg:max-w-full mx-auto" src="/imgs/placeholders/img-6.jpg" alt="Skyline-Finance" />
                            </div>
                            <div className="w-full md:w-1/2 px-3 order-1 md:order-1">
                                <div className="max-w-md-2">
                                    <div className="mb-4">
                                        <span className="text-xs py-1 px-3 text-blue-500 font-semibold bg-blue-50 rounded-xl wow animate__animated animate__fadeInDown" data-wow-delay=".9s">
                                            Why choose us
                                        </span>
                                        <h2 className="text-4xl mt-3 font-bold font-heading wow animate__animated animate__fadeIn" data-wow-delay=".3s">
                                            We Provide the Best <br />
                                            <span className="text-blue-500">Banking</span> Services
                                        </h2>
                                    </div>

                                    <p className="mb-6 leading-loose text-blueGray-400 wow animate__animated animate__fadeIn" data-wow-delay=".1s">
                                        At Skyline-Finance, we are dedicated to offering comprehensive banking services tailored to meet your financial needs.
                                    </p>

                                    <div className="flex flex-wrap">
                                        <div className="w-full md:w-1/2 items-start pt-4 pb-8 wow animate__animated animate__fadeIn" data-wow-delay=".2s">
                                            <div className="w-8 mb-5 text-blue-500">
                                                <span className="inline-block py-2 px-4 mr-4 text-xs font-semibold bg-blue-500 text-white rounded">1</span>
                                            </div>
                                            <div>
                                                <h3 className="mb-2 text-xl font-semibold font-heading">Investment services</h3>
                                                <p className="text-blueGray-400 leading-loose text-sm">Access a wide range of investment opportunities, including stocks, bonds, mutual funds, and more.</p>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 items-start py-4 wow animate__animated animate__fadeIn" data-wow-delay=".3s">
                                            <div className="w-8 mb-5 text-blue-500">
                                                <span className="inline-block py-2 px-4 mr-4 text-xs font-semibold bg-blue-500 text-white rounded">2</span>
                                            </div>
                                            <div>
                                                <h3 className="mb-2 text-xl font-semibold font-heading">Foreign exchange services</h3>
                                                <p className="text-blueGray-400 leading-loose text-sm">Access a range of forex products, including spot transactions, forward contracts, and currency swaps, tailored to meet your specific needs.</p>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 items-start py-4 wow animate__animated animate__fadeIn" data-wow-delay=".4s">
                                            <div className="w-8 mb-5 text-blue-500">
                                                <span className="inline-block py-2 px-4 mr-4 text-xs font-semibold bg-blue-500 text-white rounded">3</span>
                                            </div>
                                            <div>
                                                <h3 className="mb-2 text-xl font-semibold font-heading">Insurance Product</h3>
                                                <p className="text-blueGray-400 leading-loose text-sm"> Choose from a variety of insurance products, including home, auto, health, and life insurance, tailored to your specific needs.</p>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 items-start py-4 wow animate__animated animate__fadeIn" data-wow-delay=".5s">
                                            <div className="w-8 mb-5 text-blue-500">
                                                <span className="inline-block py-2 px-4 mr-4 text-xs font-semibold bg-blue-500 text-white rounded">4</span>
                                            </div>
                                            <div>
                                                <h3 className="mb-2 text-xl font-semibold font-heading">Advisory Services</h3>
                                                <p className="text-blueGray-400 leading-loose text-sm">Receive tailored advice that aligns with your individual financial goals and circumstances.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className="pt-20 pb-24 bg-blueGray-50" id="how-we-work">
                    <div className="container">
                        <div className="flex flex-wrap items-center justify-between max-w-2xl lg:max-w-full mb-12">
                            <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
                                <h2 className="text-3xl md:text-4xl font-bold font-heading wow animate__animated animate__fadeInDown">
                                    <span>We are </span>
                                    <span className="text-blue-500">your reliable partner </span>
                                    <br />
                                    <span>for all your financial needs</span>
                                </h2>
                            </div>
                            <div className="w-full lg:w-1/2">
                                <p className="text-blueGray-400 leading-loose wow animate__animated animate__fadeIn">At Skyline-Finance, we prioritize your financial success and provide expert guidance and support every step of the way.</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 -mb-6 text-center">
                            <div className="hover-up-5 w-full md:w-1/2 lg:w-1/3 px-3 mb-6 wow animate__animated animate__fadeIn" data-wow-delay=".3s">
                                <div className="p-12 bg-white shadow rounded">
                                    <div className="flex w-12 h-12 mx-auto items-center justify-center text-blue-800 font-bold font-heading bg-blue-200 rounded-full">1</div>
                                    <img className="h-36 mx-auto my-4" src="/imgs/illustrations/eating.svg" alt="Account Management" />
                                    <h3 className="mb-2 font-bold font-heading text-xl">Account Management</h3>
                                    <p className="text-sm text-blueGray-400 leading-relaxed">Manage your accounts easily and efficiently with our user-friendly tools and services.</p>
                                </div>
                            </div>
                            <div className="hover-up-5 w-full md:w-1/2 lg:w-1/3 px-3 mb-6 wow animate__animated animate__fadeIn" data-wow-delay=".4s">
                                <div className="p-12 bg-white shadow rounded">
                                    <div className="flex w-12 h-12 mx-auto items-center justify-center text-blue-800 font-bold font-heading bg-blue-200 rounded-full">2</div>
                                    <img className="h-36 mx-auto my-4" src="/imgs/icons/Credit_Card.svg" alt="Credit Cards" />
                                    <h3 className="mb-2 font-bold font-heading text-xl">Credit Cards</h3>
                                    <p className="text-sm text-blueGray-400 leading-relaxed">Enjoy the convenience and benefits of our range of credit cards designed to fit your lifestyle.</p>
                                </div>
                            </div>
                            <div className="hover-up-5 w-full md:w-1/2 lg:w-1/3 px-3 mb-6 wow animate__animated animate__fadeIn" data-wow-delay=".5s">
                                <div className="p-12 bg-white shadow rounded">
                                    <div className="flex w-12 h-12 mx-auto items-center justify-center text-blue-800 font-bold font-heading bg-blue-200 rounded-full">3</div>
                                    <img className="h-36 mx-auto my-4" src="/imgs/icons/Mortgages.svg" alt="Mortgages" />
                                    <h3 className="mb-2 font-bold font-heading text-xl">Mortgages</h3>
                                    <p className="text-sm text-blueGray-400 leading-relaxed">Find the perfect mortgage solution for your new home with our competitive rates and personalized service.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default OtherServices;









// import Layout from '../../components/layout/Layout'
// import './others.css'
// import { GiReceiveMoney } from "react-icons/gi";
// import { FcCurrencyExchange } from "react-icons/fc";
// import { GiBookCover } from "react-icons/gi";
// import { FaOpencart } from "react-icons/fa6";

// const OtherServices = () => {
//     return(
//         <Layout>
//             <section className='otherSavicesParent'>
//                 <div className="othersHeroPage" style={{backgroundImage: 'url("./imgs/others.jpg")'}}>
//                     {/* <img src="./imgs/others.jpg" alt="" /> */}
//                     <div className="othersHeroWrite">
//                         <div className="otherswriteHead">
//                             <h1>
//                                 Welcome to Skyline-finance
//                             </h1>
//                             <p>
//                                 Here are other financial financial servics we offer
//                             </p>
//                         </div>
//                         <div className="otherlist">
//                             <div className="listone">
//                                 <div className="listpic" style={{color: "blue"}}>
//                                     <GiReceiveMoney />
//                                 </div>
//                                 <div className="listwrite">
//                                     <p>Wealth management and investment services</p>
//                                 </div>
//                             </div>
//                             <div className="listone">
//                                 <div className="listpic">
//                                     <FcCurrencyExchange />
//                                 </div>
//                                 <div className="listwrite">
//                                     <p>Foreign exchange services</p>
//                                 </div>
//                             </div>
//                             <div className="listone">
//                                 <div className="listpic" style={{color: "green"}}>
//                                     <GiBookCover />
//                                 </div>
//                                 <div className="listwrite">
//                                     <p>Insurance Product</p>
//                                 </div>
//                             </div>
//                             <div className="listone">
//                                 <div className="listpic" style={{color: "blue"}}>
//                                     <FaOpencart />
//                                 </div>
//                                 <div className="listwrite">
//                                     <p>Advisory Services</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="navicon"></div>
//                     </div>
//                 </div>
//                 <div className="otherHeroTwo">
//                     <div className="wealthManagement">
//                         <p>Wealth Management and Investment Services</p>
//                     </div>
//                     <div className="wealthManage2">
//                         <div className="wealthManageLeft">
//                             <img src="./imgs/wealthmanage.jpg" alt="" />
//                         </div>
//                         <div className="wealthManageRight">
//                             <p>
//                                 At Skyline-Finance, our wealth management and investment services are 
//                                 designed to help you grow and protect your wealth. Whether you're planning 
//                                 for retirement, looking to diversify your portfolio, or seeking expert 
//                                 financial advice, we offer personalized solutions to meet your unique needs.
//                             </p>
//                             <header>BENEFITS</header>
//                             <ul>
//                                 <li>Personalized Strategies</li>
//                                 <li>Diverse Investment Options</li>
//                                 <li>Comprehensive Planning</li>
//                                 <li>Ongoing Support</li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="otherHeroTwo">
//                     <div className="wealthManagement">
//                         <p>Foreign Exchange Services</p>
//                     </div>
//                     <div className="wealthManage2" id='h3xx3' style={{flexDirection: "row-reverse"}}>
//                         <div className="wealthManageLeft">
//                             <img src="./imgs/foreignexchange.jpg" alt="" />
//                         </div>
//                         <div className="wealthManageRight" style={{paddingLeft: "20px"}}>
//                             <p>
//                                 Navigate the complexities of global markets with ease using our
//                                 foreign exchange services. Whether you're a business managing international 
//                                 transactions or an individual planning to travel, our comprehensive forex 
//                                 solutions provide you with competitive rates and exceptional service.
//                             </p>
//                             <header>BENEFITS</header>
//                             <ul>
//                                 <li>Competitive Exchange Rates</li>
//                                 <li>Fast and Secure Transactions</li>
//                                 <li>Expert Guidance</li>
//                                 <li>Flexible Solutions</li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="otherHeroTwo">
//                     <div className="wealthManagement">
//                         <p>Insurance Products</p>
//                     </div>
//                     <div className="wealthManage2">
//                         <div className="wealthManageLeft">
//                             <img src="./imgs/insurance.jpg" alt="" />
//                         </div>
//                         <div className="wealthManageRight">
//                             <p>
//                                 Protect what matters most with our comprehensive range of insurance products at 
//                                 Skyline-finance. From safeguarding your home and car to ensuring your health 
//                                 and life, our insurance solutions provide the coverage you need for peace of mind.
//                             </p>
//                             <header>BENEFITS</header>
//                             <ul>
//                                 <li>Wide Range of Coverage</li>
//                                 <li>Competitive Premiums</li>
//                                 <li>Customizable Plans</li>
//                                 <li>Reliable Claims Support</li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="otherHeroTwo">
//                     <div className="wealthManagement">
//                         <p>Advisory Services</p>
//                     </div>
//                     <div className="wealthManage2" id='h3xx3' style={{flexDirection: "row-reverse"}}>
//                         <div className="wealthManageLeft">
//                             <img src="./imgs/advice.jpg" alt="" />
//                         </div>
//                         <div className="wealthManageRight" style={{paddingLeft: "20px"}}>
//                             <p>
//                                 Our advisory services are designed to provide you with the insights and 
//                                 expertise you need to make informed financial decisions. Whether you're 
//                                 looking to optimize your investments, plan for retirement, or navigate 
//                                 complex financial challenges, our experienced advisors are here to guide you every step of the way.
//                             </p>
//                             <header>BENEFITS</header>
//                             <ul>
//                                 <li>Personalized Guidance</li>
//                                 <li>Comprehensive Planning</li>
//                                 <li>Expert Insights</li>
//                                 <li>Proactive Support</li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </Layout>
//     )
// }

// export default OtherServices