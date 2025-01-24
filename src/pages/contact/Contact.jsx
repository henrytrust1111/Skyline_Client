import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import "./cashmanage.css"
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { GiMoneyStack } from "react-icons/gi";
import { MdOutlineTimer } from "react-icons/md";
import { MdOutlineLockClock } from "react-icons/md";

const Contact = () => {
  const [loading, setLoading] = useState(false)
  const handleSend = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(()=>{
      toast.success("message sent successfully")
      setLoading(false)
    },3000)
  }
  return (
    <>
      <Layout>
        <div className="cashmanageparent">
          <div className="cashHeroPage" style={{backgroundImage: 'url("./imgs/bussiness.jpg")'}}>
            <div>
              <p>Solutions for <span style={{fontSize: "40px", color: "navy"}}>Financial growth</span></p>
            <p style={{color: "white"}}>
            At Skyline-finance, our cash management services are designed to
            help you manage your cash flow efficiently and effectively.
            </p>
            </div>
          </div>
          <div className="herobody">
          <section
          // id="key-features"
          className="pt-8 pb-12 md:py-16 lg:py-16 overflow-x-hidden"
        >
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap lg:flex-nowrap">
              <div className="w-full lg:w-1/2">
                <div
                  className="lg:py-6 lg:pr-77 wow animate__animated animate__fadeIn"
                  data-wow-delay=".3s"
                >
                  <div className="mb-4">
                    <span
                      className="text-xs py-1 px-3 text-blue-500 font-semibold bg-blue-50 rounded-xl wow animate__animated animate__fadeInDown"
                      data-wow-delay=".9s"
                    >
                      Why choose us
                    </span>
                    <h2
                      className="mt-5 text-4xl font-bold font-heading wow animate__animated animate__fadeIn"
                      data-wow-delay=".3s"
                    >
                      Key Features
                    </h2>
                  </div>
                  <div
                    className="flex items-start py-4 wow animate__animated animate__fadeIn"
                    data-wow-delay=".5s"
                  >
                    <div className="w-8 mr-5 text-blue-500">
                      <GiMoneyStack fontSize={"30px"}/>
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-semibold font-heading">
                        Enhanced Cash Flow
                      </h3>
                      <p className="text-blueGray-400 leading-loose">
                      Optimize your cash flow with tools that provide better control
                       over your receivables and payables.
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex items-start py-4 wow animate__animated animate__fadeIn"
                    data-wow-delay=".7s"
                  >
                    <div className="w-8 mr-5 text-blue-500">
                      <MdOutlineTimer fontSize={"30px"}/>
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-semibold font-heading">
                        Real-Time Monitoring
                      </h3>
                      <p className="text-blueGray-400 leading-loose">
                      Access real-time data and insights to make informed financial decisions
                       and improve your overall cash management strategy.
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex items-start py-4 wow animate__animated animate__fadeIn"
                    data-wow-delay=".9s"
                  >
                    <div className="w-8 mr-5 text-blue-500">
                      <MdOutlineLockClock fontSize={"30px"}/>
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-semibold font-heading">
                        Secure Transactions
                      </h3>
                      <p className="text-blueGray-400 leading-loose">
                      Enjoy the peace of mind that comes with secure transactions and advanced 
                      fraud protection measures.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative w-full lg:w-1/2 my-12 lg:my-0">
                <div
                  className="wow animate__animated animate__fadeIn"
                  data-wow-delay=".5s"
                >
                  <img
                    className="jump relative mx-auto rounded-xl w-full z-10"
                    src="../imgs/cashmeeting.jpg"
                    alt="Banking Features"
                  />
                  {/* <img
                    className="absolute top-0 left-0 w-40 -ml-12 -mt-12"
                    src="/imgs/elements/blob-tear.svg"
                    alt="Decoration"
                  /> */}
                  {/* <img
                    className="absolute bottom-0 right-0 w-40 -mr-12 -mb-12"
                    src="/imgs/elements/blob-tear.svg"
                    alt="Decoration"
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="heroBodytwo">
        <div className="whyChoose">
              <div className="whyChooseHead" style={{color: "white", backgroundColor: "gray"}}>
                Benefits of our cash management services
              </div>
              <div className="whyChooseBodyHold">
                <div className="chooseleft">
                  <h1>Efficient Receivables Management:</h1>
                  <p>
                  Accelerate cash inflows with effective receivables management, 
                  ensuring timely payments and improved liquidity.
                  </p>
                </div>
                <div className="chooseleft">
                  <h1>Robust Fraud Protection:</h1>
                  <p>
                  Benefit from multiple layers of security to 
                  safeguard your financial operations from potential threats
                  </p>
                </div>
              </div>
              <div className="whyChooseBodyHold">
                <div className="chooseleft">
                  <h1>Real-Time Monitoring:</h1>
                  <p>
                  Keep track of your cash flow and account activities
                   in real-time, allowing you to make informed decisions swiftly.
                  </p>
                </div>
                <div className="chooseleft">
                  <h1>Remote Deposit Capture:</h1>
                  <p>
                  Deposit checks from your office, 
                  saving time and avoiding trips to the bank.
                  </p>
                </div>
              </div>
            </div>
        </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Contact;
