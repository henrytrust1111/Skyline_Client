// import './adminDashboard.css'
import { BsBank } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineManageAccounts } from "react-icons/md";
import { RiMessage2Line } from "react-icons/ri";
import { MdOutlineManageHistory } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
// import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineMonetizationOn } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { LuMenu } from "react-icons/lu";
import { BsMotherboard } from "react-icons/bs";
// import AllInfoComponent from '../dashboardComponent/maincomp/allInfo';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CgCloseR } from "react-icons/cg";

const RequestLoan = () => {
    const navigate = useNavigate()
    const [dropDown, setDropDown] = useState(false)
    return(
        <div className="adminDashboardParent">
        <div className="adminHold">
            <div className="adminLeft">
                <div className="logo"><BsBank /></div>
                <div className="navHold">
                    <div className="navHolddiv" onClick={()=> navigate("/admin")}>
                        <div className="navlogo">
                            <RxDashboard />
                        </div>
                        <div className="navWrited">
                            <p>Dashboard</p>
                        </div>
                    </div>
                    <div className="navHolddiv" onClick={()=> navigate("/allacount")}>
                        <div className="navlogo">
                            <MdOutlineManageAccounts />
                        </div>
                        <div className="navWrited">
                            <p>Accounts</p>
                        </div>
                    </div>
                    <div className="navHolddiv" onClick={()=> navigate("/accountmanage")}>
                        <div className="navlogo">
                            <GrUserManager />
                        </div>
                        <div className="navWrited">
                            <p>Manage Accounts</p>
                        </div>
                    </div>
                    <div className="navHolddivn" onClick={()=>navigate("/loanrequest")}>
                        <div className="navlogo">
                            <MdOutlineMonetizationOn />
                        </div>
                        <div className="navWrited">
                            <p>Loan Requests</p>
                        </div>
                    </div>
                    <div className="navHolddiv" onClick={()=>navigate("/messages")}>
                        <div className="navlogo">
                            <RiMessage2Line />
                        </div>
                        <div className="navWrited">
                            <p>Messages</p>
                        </div>
                    </div>
                    <div className="navHolddiv" onClick={()=> navigate("/history")}>
                        <div className="navlogo">
                            <MdOutlineManageHistory />
                        </div>
                        <div className="navWrited">
                            <p>Transaction History</p>
                        </div>
                    </div>
                    <div className="navHolddiv">
                        <div className="navlogo">
                            <BsMotherboard />
                        </div>
                        <div className="navWrited">
                            <p>Others</p>
                        </div>
                    </div>
                    <div className="navHolddiv">
                        <div className="navlogo">
                            <MdOutlineSettings />
                        </div>
                        <div className="navWrited">
                            <p>Settings</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="adminRight">
                <div className="adminHead">
                    <div className="adminHeadHold">
                        <div className="welcome">
                            <p>Welcome <span>Maxwell</span></p>
                        </div>
                        <div className="notify">
                            <div className="notifyHold">
                                {/* <div className="notifyicon">
                                    <IoNotificationsOutline />
                                </div> */}
                                <div className="notifyicon2" onClick={()=> setDropDown(!dropDown)}>
                                    {
                                        dropDown ? <CgCloseR /> : <LuMenu />
                                    }
                                </div>
                                <div className="profilepic">
                                    <div className="picpic"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="adminComponents">
                    {
                        dropDown ? 
                        <div className="dropDownMenu">
                            <div className="dropdownHold" onClick={()=> navigate("/admin")}>
                                <RxDashboard />
                                <p>Dashboard</p>
                            </div>
                            <div className="dropdownHold" onClick={()=> navigate("/allacount")}>
                                <MdOutlineManageAccounts />
                                <p>Accounts</p>
                            </div>
                            <div className="dropdownHold" onClick={()=> navigate("/accountmanage")}>
                                <GrUserManager />
                                <p>Manage Accounts</p>
                            </div>
                            <div className="dropdownHold" onClick={()=> navigate("/loanrequest")}>
                                <MdOutlineMonetizationOn />
                                <p>Loan Requests</p>
                            </div>
                            <div className="dropdownHold" onClick={()=> navigate("/messages")}>
                                <RiMessage2Line />
                                <p>Messages</p>
                            </div>
                            <div className="dropdownHold" onClick={()=> navigate("/history")}>
                                <MdOutlineManageHistory />
                                <p>Transaction History</p>
                            </div>
                            <div className="dropdownHold">
                                <BsMotherboard />
                                <p>Others</p>
                            </div>
                            <div className="dropdownHold">
                                <MdOutlineSettings />
                                <p>Settings</p>
                            </div>
                        </div>
                        : null
                    }
                    <div className="adminComponentHold">
                        {
                            !dropDown ? 
                            <></>
                            : null
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default RequestLoan