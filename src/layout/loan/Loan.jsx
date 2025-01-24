import React, { useState, useEffect } from "react";
import ContentTop from "../../components/ContentTop/ContentTop";
import Ticket from "./Ticket";
import AtmCardDetail from "../statement/AtmCardDetail";

const Loan = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const userData = JSON.parse(localStorage.getItem("balance"));

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US').format(number);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const day = now.toLocaleString("default", { weekday: "short" });
      const date = now.getDate().toString().padStart(2, "0");
      const month = now.toLocaleString("default", { month: "long" });
      const year = now.getFullYear();
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
      setCurrentDate(`${day} ${date} ${month} ${year}`);
    };

    updateTime();
    const timerId = setInterval(updateTime, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <>
      <div className="main-content">
        <ContentTop />
        <div className="flex flex-col lg:flex-row -bg--clr-secondary w-full">
          {/* Left Side */}
          <div className="flex-1 p-6 space-y-6">
            {/* Balances */}
            <div className="flex space-x-6 max-[700px]:flex-col max-[700px]:space-y-5 max-[700px]:items-center max-[700px]:justify-center max-[700px]:space-x-0 ">
              <div className="p-4 -bg--clr-primary rounded shadow-md text-center max-[700px]:w-[95%] ">
                <div className="-text--clr-silver-v1">Book Balance</div>
                <div className="text-2xl text-orange-500 font-bold">
                  {`$ ${isNaN(userData?.totalBalance) ? 0 : formatNumber(userData?.totalBalance)}`}
                </div>
              </div>
              <div className="p-4 -bg--clr-primary rounded shadow-md text-center max-[700px]:w-[95%]">
                <div className="-text--clr-silver-v1">Available Balance</div>
                <div className="text-2xl text-green-500 font-bold">
                  {`$ ${isNaN(userData?.availableBalance) ? 0 : formatNumber(userData?.availableBalance)}`}
                </div>
              </div>
            </div>

            {/* Tickets */}
            <Ticket />
          </div>

          {/* Right Side */}
          <div className="w-full lg:w-1/3 p-6 space-y-6">
            <div className="-bg--clr-primary p-4 rounded shadow-md">
              <div className="-text--clr-silver-v1">{currentDate}</div>
              <div className="text-2xl font-bold -text--clr-silver-v1">
                {currentTime}
              </div>
            </div>
            <AtmCardDetail />
            {/* <div className="-bg--clr-primary p-4 rounded shadow-md">
              <div className="-text--clr-silver-v1">ATM Card Details</div>
              <div className="mt-4 space-y-2">
                <div className="p-2 border rounded -text--clr-silver-v1">
                  Card Number: 4257 9801 21190 XXXX
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <div className="-text--clr-silver-v1">Ex.Date</div>
                    <div className="p-2 border rounded -text--clr-silver-v1">
                      06/2
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="-text--clr-silver-v1">Csv</div>
                    <div className="p-2 border rounded -text--clr-silver-v1">
                      268
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="-text--clr-silver-v1">Pin</div>
                    <div className="p-2 border rounded -text--clr-silver-v1">
                      5460
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="-bg--clr-primary p-4 rounded shadow-md">
              <div className="text-blue-800 font-bold">TIPS</div>
              <div className="mt-4 -text--clr-silver-v1">
                YOUR TRANSFER IS PROCESSING!
                <br />
                DO YOU HAVE ISSUES REGARDING TRANSFER? FEEL FREE TO CONTACT
                CUSTOMER CARE
              </div>
              <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
                Contact Customer care
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loan;
