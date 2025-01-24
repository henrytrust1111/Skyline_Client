import { useEffect, useState } from 'react';
import './allInfo.css'
import { FcSimCardChip } from "react-icons/fc";
import { RiMastercardFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import jsPDF from 'jspdf';
import { BeatLoader } from 'react-spinners';
// import jsPDF from 'jspdf';

const AllInfoComponent = () => {
    const nav = useNavigate()
    const [showDocuments, setShowDocuments] = useState(false)
    const [viewDocuments, setViewDocuments] = useState([])
    const [cardDetails, setCardDetails] = useState()
    const [allUsers, setAllUsers] = useState()
    const [history, setHistory] = useState()
    const [loading, setLoading] = useState(false)


    const admin = JSON.parse(localStorage.getItem("adminData"))
    const token = admin.token
    const headers = {
        'Authorization' : `Bearer ${token}`
    }
    const url = "https://skyline-2kje.onrender.com/view-all-users"
    useEffect(() => {
    const fetchData = async () => {
        // setLoading(true)
      try {
        const response = await axios.get(url, { headers });
        setAllUsers(response?.data.data)
        // console.log(response.data.data)
        setLoading(false);
      } catch (err) {
        // console.log(err)
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  useEffect(() => {
    const url = "https://skyline-2kje.onrender.com/view-all-documents"
    const fetchData = async () => {
        setLoading(true)
        try {
        const response = await axios.get(url, { headers } );
        setViewDocuments(response.data.data)
        // console.log(response)
        setLoading(false);
        } catch (err) {
        // setError(err);
        console.log(err)
        setLoading(false);
          console.log(err.message)
        }
    };
  fetchData();
    }, []);

    // const fetchMimeType = async (fileUrl) => {
    //     try {
    //       const response = await axios.head(fileUrl);
    //       return response.headers['content-type'];
    //     } catch (error) {
    //       console.error('Error fetching MIME type', error);
    //       return null;
    //     }
    //   };

    //   const convertToPdf = async (fileUrl) => {
    //     if (!fileUrl) {
    //       console.error('Invalid file URL');
    //       return;
    //     }
    
    //     const mimeType = await fetchMimeType(fileUrl);
    
    //     if (!mimeType) {
    //       console.error('Unable to determine MIME type');
    //       return;
    //     }
    
    //     const pdf = new jsPDF();
    //     const img = new Image();
    //     img.src = fileUrl;
    
    //     img.onload = () => {
    //       const imgProps = pdf.getImageProperties(img.src);
    //       const pdfWidth = pdf.internal.pageSize.getWidth();
    //       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    //       pdf.addImage(img.src, mimeType.toUpperCase().split('/')[1], 0, 0, pdfWidth, pdfHeight);
    //       pdf.save('download.pdf');
    //     };
    //   };

    // console.log("atm",cardDetails)

  useEffect(() => {
    const url = "https://skyline-2kje.onrender.com/view-all-history"
  const fetchData = async () => {
      setLoading(true)
    try {
      const response = await axios.get(url, { headers });
      setHistory(response.data.history)
      // console.log(response)
      setLoading(false);
    } catch (err) {
      // setError(err);
    //   console.log(err)
      setLoading(false);
    //   console.log(err.message)
    }
  };
  fetchData();
}, []);

  useEffect(() => {
    const url = "https://skyline-2kje.onrender.com/all-card-details"
  const fetchData = async () => {
      setLoading(true)
    try {
      const response = await axios.get(url, { headers });
    //   console.log(response)
    setLoading(false)
      setCardDetails(response.data.transactions)
    } catch (err) {
      // setError(err);
    //   console.log(err)
      setLoading(false);
    //   console.log(err.message)
    }
  };
  fetchData();
}, []);

    return(
        <div className="allInfoParentxx">
            <div className="header">
                <p>DashBoard</p>
            </div>
            {
                showDocuments ?
                <div className="documentHold">
                    <div className="headerdoc">
                        <button onClick={()=> setShowDocuments(false)}>CLOSE DOCUMENTS</button>
                    </div>
                    <div className="documentBodyHold">
                        {viewDocuments?.length === 0 ? (<div><p>No Document Found</p></div>):
                            viewDocuments?.map((e, index)=> (
                                <div key={index} className="documentBody">
                            <div className="owner">
                                <p>Owner: <span>{e.name}</span></p>
                                <p>Title: <span>{e.title}</span></p>
                            </div>
                            <div className="picture">
                                <img src={e.url} alt="" />
                                {/* {renderFile(e.url, e.mimeType)} */}
                            </div>
                            {/* <div className="pdf">
                                <button onClick={()=>convertToPdf(e.url)}>Download as PDF</button>
                            </div> */}
                        </div>
                            ))
                        }
                    </div>
                </div>
                : <div style={{width: "100%", height: "max-content", display: "flex", flexDirection: "column", gap: "30px"}}>
                    <div className="dashboardItemHold">
                {
                    loading ? <BeatLoader color='blue'/> :
                    <div className="dashboardItems">
                    <div className="tti"><p>Accounts</p></div>
                    <div className="tt2">
                        <p>Total accounts : <span>{allUsers?.length}</span></p>
                    </div>
                    <div className="bigBut">
                        <button onClick={()=> nav("/accountmanage")}>Manage Accounts</button>
                    </div>
                </div>
                }
                <div className="dashboardItems">
                    <div className="tti"><p>Transaction History</p></div>
                    <div className="tt2">
                        <p>Total Transactions : <span>{history?.length}</span></p>
                    </div>
                    <div className="bigBut">
                        <button onClick={()=> nav("/history")}>Manage History</button>
                    </div>
                </div>
                <div className="dashboardItems">
                <div className="tti"><p>Documents</p></div>
                    <div className="tt2">
                        <p>All documents : <span>{viewDocuments?.length}</span></p>
                    </div>
                    <div className="bigBut">
                        <button onClick={()=>setShowDocuments(true)}>view document</button>
                    </div>
                </div>
            </div>
            <div className="transactionDetailxx">
                <div className="tablehead"><h1>All Card Details</h1></div>
                <div className="cardHold">
                    { loading? <BeatLoader color='blue'/> :
                      cardDetails?.length === 0 ? (<div style={{width: "100%", height: "50px", fontSize: "20px"}}><p>No cards found, if there is any it will appear here</p></div>):
                        cardDetails?.map((e, index)=> (
                            <div key={index} className="card">
                        <div className="cardname">
                            <p>Avant Garde</p>
                        </div>
                        <div className="cardChip">
                            <FcSimCardChip />
                        </div>
                        <div className="cardNum">
                            <p>{e.cardNumber}</p>
                        </div>
                        <div className="cardDate">
                            <p>cvv - {e.cvv}</p>
                            <p>valid - {e.expiryDate}</p>
                            <RiMastercardFill fontSize={"30px"} color='orange'/>
                        </div>
                        <div className="holderName">
                            <p>{e.cardHolderName}</p>
                        </div>
                    </div>
                        ))
                    }
                </div>
            </div>
                </div>
            }
            

        </div>
    )
}

export default AllInfoComponent 