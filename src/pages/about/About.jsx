import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import "./about.css"
import "../contact/contact.css"
import { useNavigate } from "react-router-dom";
// import "./contact.css"
import toast from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import { BeatLoader } from "react-spinners";

const About = () => {
  const nav = useNavigate()
  const [loading, setLoading] = useState(false)
  const handleSend = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(()=>{
      toast.success("message sent successfully")
      setLoading(false)
    },3000)
  }
  // useState
  return (
    <>
      <Layout>
        <div className="aboutParent">
            <div className="aboutHold">
              <div className="aboutLeft">
              <img
                  // className="h-10"
                  src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFua2luZyUyMG1lZXRpbmdzfGVufDB8fDB8fHww"
                  alt="Skyline-finance"
              />
              </div>
              <div className="aboutRight">
                <div className="aboutHead">
                  About us
                </div>
                <div className="aboutExplain">
                  <p>
                    we are your trusted partner in financial growth and stability. 
                    Our mission is to provide innovative and secure banking 
                    solutions that empower you to manage your finances effortlessly.
                  </p>
                  <p>
                    we offer a wide range of services including 
                    savings accounts, loans, investments, and more.
                  </p>
                  <p>
                  At Skyline-finance, we prioritize your security and convenience,
                   ensuring that your financial journey is seamless and secure. 
                  Join us today and experience banking redefined.
                  </p>
                </div>
                <div className="aboutButt">
                  <button className="getStarted" onClick={()=> nav("/sign-in")}>Get Started</button>
                  {/* <button className="getStarted2" onClick={()=> nav("/contact")}>contact us</button> */}
                </div>
              </div>
            </div>
            <div className="whyChoose">
              <div className="whyChooseHead">
                Why Choose Us
              </div>
              <div className="whyChooseBodyHold">
                <div className="chooseleft">
                  <h1>Security you can Trust:</h1>
                  <p>
                    At Skyline-finance, we prioritize your financial security with advanced encryption and 
                    robust security protocols, ensuring your money and personal information are safe.
                  </p>
                </div>
                <div className="chooseleft">
                  <h1>Comprehensive Services:</h1>
                  <p>
                    From savings accounts and loans to investments and financial planning, 
                    we offer a wide range of services to meet all your banking needs in one convenient place.
                  </p>
                </div>
              </div>
              <div className="whyChooseBodyHold">
                <div className="chooseleft">
                  <h1>24/7 Customer Support:</h1>
                  <p>
                    Our dedicated customer support team is available around the clock to assist you
                     with any questions or issues, providing you with the support you need, whenever you need it.
                  </p>
                </div>
                <div className="chooseleft">
                  <h1>Seamless Integration:</h1>
                  <p>
                    Our app seamlessly integrates with other financial tools and services, allowing you to manage 
                    all your finances from one central hub, enhancing your overall financial management experience.
                  </p>
                </div>
              </div>
            </div>
        </div>
        <div className="contactParent">
          <ToastContainer />
          <div className="contctHold">
            <div className="contactLeft">
              <div className="contactLeftTopic">
                <p>Talk to our experts and get a reply within 24 hours</p>
              </div>
              <div className="bost">
                <p>Need help with anything? We've helped over 2000+ bussiness improve in their finance</p>
              </div>
              <form action="" onSubmit={handleSend}>
              <div className="contactBody">
                <div className="contactInputHold">
                  <div className="contactFirst">
                    <p>First Name</p>
                    <input required type="text" />
                  </div>
                  <div className="contactFirst">
                    <p>Last Name</p>
                    <input required type="text" />
                  </div>
                </div>
                <div className="contactEmailHold">
                  <p>Email</p>
                  <input required type="email" />
                </div>
                <div className="contactMessageHold">
                  <p>Message</p>
                  <textarea required name="message" id="contactMessage"></textarea>
                </div>
                <div className="contactButt">
                  <button>
                    {
                      loading ? <BeatLoader color="white"/> : "SEND"
                    }
                  </button>
                </div>
              </div>
              </form>
            </div>
            <div className="contactRight">
              <h1>We are your trusted partner
              for your financial success</h1>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default About;
