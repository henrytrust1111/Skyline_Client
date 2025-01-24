import "./messagecomponent.css"
import { IoMdAdd } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
// import { FaDeleteLeft } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
// import { ImCancelCircle } from "react-icons/im";

const MessageComponent = () => {
    const [open, setOpen] = useState(false)
    const [compose, setCompose] = useState(false)
    const [sender, setSender] = useState("")
    const [subject, setSubject] = useState("")
    const [receiverEmail, setReceiverEmail] = useState("")
    const [receiverId, setReceiverId] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [allUsers, setAllUsers] = useState()
    const [allMessages, SetAllMessages] = useState([])
    const [messageDetail, SetMessageDetail] = useState()
    const [deleteload, SetDeleteLoad] = useState(false)
    const [error, setError] = useState({
        type: "",
        message: ""
    })

    const mapMessage = allMessages.reverse()

    const handleSelectChange = (e) => {
        const selectedUser = allUsers.find(user => user.email === e.target.value);
        if (selectedUser) {
          setReceiverId(selectedUser._id);
          setReceiverEmail(selectedUser.email);
        }
      };
      const handleOpen = (e) => {
        setOpen(true)
        SetMessageDetail(e)
    }

    const admin = JSON.parse(localStorage.getItem("adminData"))
    const token = admin.token
    const headers = {
        'Authorization' : `Bearer ${token}`
    }
    
    useEffect(() => {
    const fetchData = async () => {
        const url = "https://skyline-2kje.onrender.com/view-all-users"
        setLoading2(true)
      try {
        const response = await axios.get(url, { headers });
        setAllUsers(response.data.data)
        // console.log(response.data.data)
        setLoading2(false);
      } catch (err) {
        // console.log(err)
        setLoading2(false);
        toast.error(err.message)
      }
    };
    fetchData();
  }, []);

    const fetchData = async () => {
        const url = "https://skyline-2kje.onrender.com/get-messages"
        setLoading2(true)
    try {
        const response = await axios.get(url, { headers });
        SetAllMessages(response.data.data)
        // console.log(response.data.data)
        setLoading2(false);
    } catch (err) {
        // console.log(err)
        setLoading2(false);
        toast.error(err.message)
    }
    };

    useEffect(() => {
    
    fetchData();
  }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        if(!sender){
            setLoading(false)
            setError({
                type: "sender",
                message: "choose the sender"
            })
            toast.error(error.type === "sender" ? error.message : "")
        } else if(!receiverEmail){
            setLoading(false)
            setError({
                type: "receiver",
                message: "cho0se the receiver"
            })
            toast.error(error.type === "receiver" ? error.message : "")
        } else if(!message){
            setLoading(false)
            setError({
                type: "message",
                message: "you cant send an empty message!"
            })
            toast.error(error.type === "sender" ? error.message : "")
        } else{
            const url = `https://skyline-2kje.onrender.com/message-user/${receiverId}`
            const data = {
                sender: sender,
                receiver: receiverEmail,
                subject: subject,
                content: message
            }
            axios.post(url, data, { headers })
            .then((response)=> {
                // console.log(response)
                setLoading(false)
                toast.success("message sent successfully")
                setCompose(false)
            })
            .catch((error)=> {
                // console.log(error)
                setLoading(false)
                toast.error("could'nt send message")
            })
           
        }
    }

    const handleDeleteHistory = () => {
        SetDeleteLoad(true)
        const url = `https://skyline-2kje.onrender.com/delete-message/${messageDetail._id}`
        axios.delete(url, { headers })
        .then((response)=> {
            // console.log(response)
            SetDeleteLoad(false)
            setOpen(false)
            toast.success("message successfully deleted")
            fetchData()
            // useEffect()
        })
        .catch((error)=> {
            console.log(error)
            SetDeleteLoad(false)
            toast.error("action failed")
        })
    }
    return(
        <div className="messagecomponentParent">
            <ToastContainer />
            <div className="messageCompTop">All Messages</div>
            <div className="messageAction">
                <p>All messages</p>
                <button onClick={()=>setCompose(true)}> <IoMdAdd /> Compose</button>
            </div>
            <div className="messageBodyHold">
               
                {
                    open ? 
                    <div className="messageContent">
                        <div className="messageContHead">
                            <div className="messageContHeadx" onClick={()=> setOpen(false)}>
                                <p>Close</p>
                            </div>
                        </div>
                        <div className="messageContBody">
                            <div className="mesageContMessage">
                                <div className="messageFrom">
                                    <p style={{color: "green"}}>From: {messageDetail.sender}</p>
                                    <p style={{color: "blue"}}>To: {messageDetail.email}</p>
                                </div>
                                <div className="messageItself">
                                    
                                    <div style={{width: "100%", height: "60px"}}>
                                        <p>Subject</p>
                                        <i style={{color: "darkblue"}}>{messageDetail.subject}</i>
                                        <p>Message Body</p>
                                    </div>
                                    <div style={{width: "100%", minHeight: "100px", paddingTop: "20px", color: "darkblue"}}>
                                        <i>
                                            {messageDetail.content}
                                        </i>
                                    </div>
                                    <div style={{width: "100%", fontSize: "30px", height: "50px", display: "flex", alignItems: "center",justifyContent: "center"}}>
                                        {
                                            deleteload ? <BeatLoader color="white" /> : <div onClick={handleDeleteHistory} ><MdDelete cursor={"pointer"}/></div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                : 
                    
                        loading2 ? <BeatLoader color="white"/> :
                        allMessages?.length === 0 ? (<div style={{color: "white", fontSize: "20px"}}><p>No Message Found</p></div>):
                        mapMessage?.map((e, index)=> (
                        <div key={index} className="messageBody" onClick={()=> handleOpen(e)}>
                        <div className="messagePic">
                            <CgProfile />
                        </div>
                        <div className="messageItem">
                            <div className="messageName">
                                <p>sender: {e.sender}</p>
                                <p>receiver: {e.email}</p>
                            </div>
                            <div className="messageMessage">
                                <p>{e.subject}</p>
                            </div>
                        </div>
                        <div className="messageDate">
                            <p>{e.date}</p>
                            <p>{e.time}</p>
                        </div>
                    </div>
                        )) 
                }

                { compose?
                     <div className="messageContent">
                     <div className="messageContHead">
                         <div className="messageContHeadx" onClick={()=> setCompose(false)}>
                             <p>Close</p>
                         </div>
                     </div>
                     <div className="messageContBody">
                         <div className="mesageContMessage">
                             <div className="messageFrom">
                                 <p>Compose A new message</p>
                             </div>
                             <form onSubmit={handleSubmit}>
                             <div className="messageItself">
                                 <div className="composeInputhold">
                                    <p>Sender</p>
                                    <select required name="sender" id="sender" value={sender} onChange={(e)=>setSender(e.target.value)}>
                                        <option value="">Sender</option>
                                        <option value="customerCare">Customer Care</option>
                                        <option value="support">Surpport</option>
                                    </select>
                                 </div>
                                 <div className="composeInputhold">
                                    <p>Subject</p>
                                    <input 
                                    value={subject}
                                    required
                                    onChange={(e)=> setSubject(e.target.value)}
                                    type="text" />
                                 </div>
                                 <div className="composeInputhold">
                                    <p>To</p>
                                    <select name="sender" required id="sender" value={receiverEmail} onChange={handleSelectChange}>
                                        <option value="">receiver</option>
                                        {
                                            allUsers?.map((e,index)=> (
                                                <option key={index} value={e.email}>{e.fullName}</option>
                                            ))
                                        }
                                    </select>
                                 </div>
                                 <div className="messageWrite">
                                    <textarea required name="message" value={message} onChange={(e)=>setMessage(e.target.value)} id="message" placeholder="Message"></textarea>
                                 </div>
                                 <div className="messageButton">
                                    <button>
                                        {
                                            loading ? <BeatLoader color="white"/> : "SEND"
                                        }
                                    </button>
                                 </div>
                             </div>
                             </form>
                         </div>
                     </div>
                 </div>
                 : null
                }
                
            </div>
        </div>
    )
}

export default MessageComponent