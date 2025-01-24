import { useNavigate } from "react-router-dom";
import "./otp.css"
import { MdMarkEmailRead } from "react-icons/md";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { data } from "autoprefixer";

const OTPverify = () => {
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [error, setError] = useState({
        type: "",
        message: ""
    })
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        if (!otp){
            setLoading(false)
            setError({
                type: "empty",
                message: "please enter the code"
            })
            toast.error(error.type === "empty" ? error.message : "")
        }else{
            const user = JSON.parse(localStorage.getItem("userData"))
            const url = `https://skyline-2kje.onrender.com/verify/${user.id}`
            const data = {userInput: otp}
            axios.post(url,data)
            .then((response)=> {
                console.log(response)
                setLoading(false)
                toast.success("verification successful")
                setTimeout(()=>{
                    navigate("/")
                }, 4000)
            })
            .catch((error)=> {
                console.log(error)
                setLoading(false)
                toast.error("verification failed")
            })  
        }
    }

    const handleResendOTP = (e) => {
        e.preventDefault()
        setLoading2(true)
        const user = JSON.parse(localStorage.getItem("userData"))
        const url = `https://skyline-2kje.onrender.com/resend-otp/${user.id}`
        // const data = {userInput: otp}
        axios.get(url)
        .then((response)=> {
            // console.log(response)
            setLoading2(false)
            toast.success(response.data.message)
        })
        .catch((error)=> {
            // console.log(error)
            setLoading2(false)
            toast.error("verification failed")
        })  
    }
    return(
        <div className="otpParent">
            <ToastContainer />
            {/* <form onSubmit={handleSubmit}> */}
            <div className="otpHold">
               <form onSubmit={handleSubmit}>
               <div className="otplogo">
                    <MdMarkEmailRead />
                </div>
                <div className="read">
                    <h1>please check your email</h1>
                    <p>we've sent a code to <span>your email</span></p>
                </div>
                <div className="otpInputHold">
                    <input 
                    required
                    pattern="\d{6,}"
                    minLength={6}
                    onChange={(e)=> setOtp(e.target.value)}
                    type="text" />
                </div>
                <div className="resendhold">
                    <p>Didn't get a code? <span onClick={handleResendOTP}>{
                        loading2? <BeatLoader color="orange"/> : "click to resend"    
                    }</span></p>
                </div>
                <div className="otpButtonHold">
                    <div className="otpCan" onClick={()=>navigate("/")}>Cancel</div>
                    <button className="otpVer">
                        {
                            loading ? <BeatLoader color="white"/> : "Verify"
                        }
                    </button>
                </div>
               </form>
            </div>
            {/* </form> */}
        </div>
    )
}

export default OTPverify