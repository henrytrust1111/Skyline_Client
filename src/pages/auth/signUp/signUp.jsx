import { useNavigate } from "react-router-dom"
import "./signUp.css"
import { toast, ToastContainer } from "react-toastify"
import { useState } from "react"
import { BeatLoader } from "react-spinners"
import axios from "axios"

const UserSignup = () => {
    const navigate = useNavigate()
    const [fullName, setFullName] = useState("")
    const [userName, setUserName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [occupation, setOccupation] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [maritalStatus, setMaritalStatus] = useState("")
    const [address, setAddress] = useState("")
    const [accountType, setAccountType] = useState("")
    const [gender, setGender] = useState("")
    const [password, setPassword] = useState("")
    const [retypePassword, setRetypePassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        // isError: false,
        type: "",
        message: ""
    })

    const userData = {
        fullName: fullName,
        username: userName,
        phoneNumber: phone,
        email: email,
        occupation: occupation,
        dateOfBirth: dateOfBirth,
        maritalStatus: maritalStatus,
        address: address,
        accountType: accountType,
        password: password,
        // gender: gender,
        retypePassword: retypePassword
    }

    const passwordValidator = () => {
        const hasUpperCase = /[A-Z]/
        const hasLowerCase = /[a-z]/
        const hasNumbers = /\d/
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/
    
          return hasUpperCase.test(password) &&
                 hasLowerCase.test(password) &&
                 hasNumbers.test(password) &&
                 hasSpecialChars.test(password)
    }

    const handleSignUp = (e) => {
        e.preventDefault()
        setLoading(true)
        if(!fullName){
            setLoading(false)
            setError({
                // isError: true,
                type: "fullname",
                message: "Input your fullname"
            })
            toast.error(error.type === "fullname" ? error.message : "" )
        } else if(!userName) {
            setLoading(false)
            setError({
                // isError: true,
                type: "username",
                message: "Input your username"
            })
            toast.error(error.type === "username" ? error.message : "" )
        } else if(!phone) {
            setLoading(false)
            setError({
                // isError: true,
                type: "phone",
                message: "input your phone number"
            })
            toast.error(error.type === "phone" ? error.message : "" )
        } else if(!email) {
            setLoading(false)
            setError({
                // isError: true,
                type: "email",
                message: "input your email"
            })
            toast.error(error.type === "email" ? error.message : "" )
            
        } else if(!occupation) {
            setLoading(false)
            setError({
                isError: true,
                type: "occupation",
                message: "input your occupation"
            })
            toast.error(error.type === "occupation" ? error.message : "" )
        } else if(!dateOfBirth) {
            setLoading(false)
            setError({
                isError: true,
                type: "dob",
                message: "input your date of birth"
            })
            toast.error(error.type === "dob" ? error.message : "" )
        }else if(!maritalStatus) {
            setLoading(false)
            setError({
                isError: true,
                type: "marital",
                message: "select your marital status"
            })
            toast.error(error.type === "marital" ? error.message : "" )
        } else if(!address) {
            setLoading(false)
            setError({
                isError: true,
                type: "address",
                message: "input your address"
            })
            toast.error(error.type === "address" ? error.message : "" )
        } else if(!accountType) {
            setLoading(false)
            setError({
                isError: true,
                type: "account",
                message: "select the type of account you want to open"
            })
            toast.error(error.type === "account" ? error.message : "" )
        }else if(!password) {
            setLoading(false)
            setError({
                isError: true,
                type: "password",
                message: "input a strong password"
            })
            toast.error(error.type === "password" ? error.message : "" )
        } else if(passwordValidator() === false) {
            setLoading(false)
            setError({
                isError: true,
                type: "passwordvalid",
                message: "password and confirmPassword must match, and it must contain upperCasa, lowercase and special character"
            })
            toast.error(error.type === "passwordvalid" ? error.message : "" )
        } else if(!retypePassword) {
            setLoading(false)
            setError({
                isError: true,
                type: "retype",
                message: "retype your password correctly"
            })
            toast.error(error.type === "retype" ? error.message : "" )
        }else if(password !== retypePassword) {
            setLoading(false)
            setError({
                isError: true,
                type: "passwordmatch",
                message: "password and retype password must match"
            })
            toast.error(error.type === "passwordmatch" ? error.message : "" )
        }else{
            const url = "https://skyline-2kje.onrender.com/sign-up"
            axios.post(url, userData)
            .then((response)=> {
                console.log(response.data)
                localStorage.setItem("userData",JSON.stringify(response?.data.data))
                setLoading(false)
                toast.success(response.data.message)
                setTimeout(()=>{
                    navigate("/otp")
                }, 4000)
            })
            .catch((error)=> {
                console.log(error)
                // console.log("user name", userName)
                setLoading(false)
                toast.error(error.response.data.message)
            })
        }
    }
    return(
        <div className="signupParent" style={{backgroundImage: 'url("./imgs/bussiness.jpg")', backgroundSize: "cover"}}>
            <div className="signUpbody">
                <div className="signUptop">
                    <p>Welcome to SKYLINE  FINANCE <span>Get Started!</span></p>
                    <i>Provide the following information to get started</i>
                </div>
                <ToastContainer />
                <form onSubmit={handleSignUp}>
                <div className="signupInputHold">
                    <div className="signUpinput">
                        <div className="signupInputone">
                            <p>Full Name</p>
                            <input
                            required
                             value={fullName}
                             onChange={(e)=>setFullName(e.target.value)}
                             type="text" />
                        </div>
                        <div className="signupInputone">
                            <p>User Name</p>
                            <input 
                            required
                            value={userName}
                            onChange={(e)=>setUserName(e.target.value)}
                            type="text" />
                        </div>
                    </div>
                    <div className="signUpinput">
                        <div className="signupInputone">
                            <p>Phone</p>
                            <input 
                            required
                            value={phone}
                            onChange={(e)=>setPhone(e.target.value)}
                            type= "number" />
                        </div>
                        <div className="signupInputone">
                            <p>Email</p>
                            <input 
                            required
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            type="email" />
                        </div>
                    </div>
                    <div className="signUpinput">
                        <div className="signupInputone">
                            <p>Occupation</p>
                            <input 
                            required
                            value={occupation}
                            onChange={(e)=>setOccupation(e.target.value)}
                            type="text" />
                        </div>
                        <div className="signupInputone">
                            <p>Date Of Birth</p>
                            <input 
                            required
                            value={dateOfBirth}
                            onChange={(e)=>setDateOfBirth(e.target.value)}
                            type="date" />
                        </div>
                    </div>
                    <div className="signUpinput">
                        <div className="signupInputone">
                            <p>Marital Status</p>
                            <select 
                            required
                            value={maritalStatus}
                            onChange={(e)=>setMaritalStatus(e.target.value)}
                            name="marital" id="marital">
                                <option value="">select</option>
                                <option value="Single">Single</option>
                                <option value="Married">Maried</option>
                                <option value="Divorced">Divorced</option>
                            </select>
                        </div>
                        <div className="signupInputone">
                            <p>Address</p>
                            <input 
                            required
                            value={address}
                            onChange={(e)=>setAddress(e.target.value)}
                            type="address" />
                        </div>
                    </div>
                    <div className="signUpinput">
                        <div className="signupInputone">
                            <p>Account Type</p>
                            <select 
                            required
                            value={accountType}
                            onChange={(e)=>setAccountType(e.target.value)}
                            name="marital" id="marital">
                                <option value="">select</option>
                                <option value="savings">Savings account</option>
                                <option value="current">Current account</option>
                                {/* <option value="checking">Checking account</option> */}
                            </select>
                        </div>
                        <div className="signupInputone">
                            <p>Password</p>
                            <input 
                            required
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            type="text" />
                        </div>

                    </div>
                    <div className="signUpinput">
                        
                        <div className="signupInputone">
                            <p>Retype-Password</p>
                            <input 
                            required
                            value={retypePassword}
                            onChange={(e)=>setRetypePassword(e.target.value)}
                            type="text" />
                        </div>
                    </div>
                    <div className="signUpbottonHold">
                        <button type="submit" className="signButton1">
                            {
                                loading ? <BeatLoader color="white" />: "Sign-Up"
                            }
                        </button>
                        <button className="signButton2" onClick={()=>navigate("/sign-in")}>allready have an account? <span style={{color: "blue"}}>LOGIN</span></button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
}

export default UserSignup