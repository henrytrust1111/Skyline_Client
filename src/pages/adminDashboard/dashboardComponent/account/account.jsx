import { useEffect, useState } from "react"
import "./account.css"
import { IoCloseSharp } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import { BeatLoader } from "react-spinners";
// import AdminDashboardParent from "../../.dashboardMain/adminDashboard"

const AccountComponent = () => {
    // axios
    const [show, setShow] = useState(false)
    const [allUsers, setAllUsers] = useState()
    // const [allUser, setAllUser] = useState([])
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [data, setData] = useState()

    const admin = JSON.parse(localStorage.getItem("adminData"))
    const token = admin.token
    const headers = {
        'Authorization' : `Bearer ${token}`
    }
    const url = "https://skyline-2kje.onrender.com/view-all-users"
    useEffect(() => {
    const fetchData = async () => {
        setLoading(true)
      try {
        const response = await axios.get(url, { headers });
        setAllUsers(response?.data.data)
        // console.log(response.data.data)
        setLoading(false);
      } catch (err) {
        console.log(err)
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleViewOneUser = (e) => {
    setLoading2(true)
    const url = `https://skyline-2kje.onrender.com/admin-view-one-user/${e}`
    axios.get(url, { headers })
    .then((response)=> {
        setData(response.data.user)
        setLoading2(false)
        setShow(true)
        
        // console.log(response)
    })
    .catch((error)=> {
        console.log(error)
        setLoading2(false)
    })
  }
//   console.log(data)

    return(
        <div className="accountParent">
            {
                loading2 ? <BeatLoader color="blue"/> :
                show? 
                
                <div className="accountdet">
                    <div className="close">
                        <div className="closexx" onClick={()=> setShow(false)}>
                            <IoCloseSharp />
                        </div>
                        <div className="closexxn" onClick={()=> setShow(false)}>
                            <FaArrowLeftLong />
                        </div>
                    </div>
                    <div className="accountPicture">
                        <div className="accountPictureHold">
                            <img src={data.profilePhoto.url} alt="no picture" />
                        </div>
                    </div>
                    <div className="accountdetHold">
                        <div className="acountLog">
                            <div className="log1">
                                <h1>Full Name:</h1>
                                <p>{data?.fullName}</p>
                            </div>
                            <div className="log1">
                                <h1>User Name:</h1>
                                <p>{data?.username}</p>
                            </div>
                            <div className="log1">
                                <h1>Account Number:</h1>
                                <p>{data?.accountNumber}</p>
                            </div>
                            <div className="log1">
                                <h1>Email:</h1>
                                <p>{data?.email}</p>
                            </div>
                        </div>
                        <div className="acountLog">
                            <div className="log1">
                                <h1>Occupation:</h1>
                                <p>{data?.occupation}</p>
                            </div>
                            <div className="log1">
                                <h1>Account Type:</h1>
                                <p>{data?.accountType}</p>
                            </div>
                            <div className="log1">
                                <h1>Total Balance:</h1>
                                <p>{data?.totalBalance}</p>
                            </div>
                            <div className="log1">
                                <h1>Available Balance:</h1>
                                <p>{data?.availableBalance}</p>
                            </div>
                        </div>
                        <div className="acountLog">
                            <div className="log1">
                                <h1>Phone number:</h1>
                                <p>{data?.phoneNumber}</p>
                            </div>
                            <div className="log1">
                                <h1>Account status:</h1>
                                <p>{data?.accountStatus}</p>
                            </div>
                            <div className="log1">
                                <h1>Reg date:</h1>
                                <p>{data?.registrationDate}</p>
                            </div>
                            <div className="log1">
                                <h1>Currency:</h1>
                                <p>{data?.accountCurrency}</p>
                            </div>
                        </div>
                        <div className="acountLog">
                            <div className="log1">
                                <h1>Verification Status</h1>
                                <p>{data.isVerified === false ? "Not Verified": "Verified"}</p>
                            </div>
                            <div className="log1">
                                <h1>Marital Status:</h1>
                                <p>{data?.maritalStatus}</p>
                            </div>
                            <div className="log1">
                                <h1>otp code:</h1>
                                <p>{data?.otpCode}</p>
                            </div>
                            <div className="log1">
                                <h1>Account Limit:</h1>
                                <p>{data?.accountLimit}</p>
                            </div>
                        </div>
                        <div className="acountLog">
                            <div className="log1">
                                <h1>COT Code</h1>
                                <p>{data.cotCode}</p>
                            </div>
                            <div className="log1">
                                <h1>Tax Code:</h1>
                                <p>{data?.taxCode}</p>
                            </div>
                            <div className="log1">
                                <h1>Matching Code:</h1>
                                <p>{data?.matchingCode}</p>
                            </div>
                            {/* <div className="log1">
                                <h1>otp code:</h1>
                                <p>{data?.otpCode}</p>
                            </div>
                            <div className="log1">
                                <h1>Account Limit:</h1>
                                <p>{data?.accountLimit}</p>
                            </div> */}
                        </div>
                    </div>
                    
                </div>
                : <div>
                <div className="accountHead">
                    <p>All Accounts</p>
                </div>
                {
                    loading ? <BeatLoader color="blue"/> :
                    <div className="accountHold">
                    { allUsers?.length === 0 ? (<div><p>No Account found</p></div>):
                        allUsers?.map((e, index)=> (
                            <div key={index} className="accountHold2" onClick={()=> handleViewOneUser(e._id)}>
                        <div className="numberLine">
                            <p>{index + 1} :</p>
                        </div>
                        <div className="accountit">
                            <p>{e.fullName}</p>
                        </div>
                    </div>
                        ))
                    }
                </div>
                }
            </div>
            }
            
        </div>
    )
}

export default AccountComponent