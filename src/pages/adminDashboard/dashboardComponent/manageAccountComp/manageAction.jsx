import { useEffect, useState } from "react";
import "./manageAction.css";
import { IoCloseSharp } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import { FaCamera } from "react-icons/fa";

export const AddAccount = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [address, setAddress] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [availableBalance, setAvailableBalance] = useState("");
  const [totalBalance, setTotalBalance] = useState("");
  const [registerationDate, setRegisterationDate] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [accountLimit, setAccountLimit] = useState();
  const [cotCode, setCotCode] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [matchingCode, setMatchingCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    // isError: false,
    type: "",
    message: ""
  });

  const balance = parseInt(totalBalance);
  const available = parseInt(availableBalance);
  const limit = parseInt(accountLimit);

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
    accountNumber: accountNumber,
    availableBalance: available,
    totalBalance: balance,
    registerationDate: registerationDate,
    password: password,
    retype_password: retypePassword,
    accountLimit: limit,
    cotCode: cotCode,
    taxCode: taxCode,
    matchingCode
  };

  const passwordValidator = () => {
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumbers = /\d/;
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/;

    return (
      hasUpperCase.test(password) &&
      hasLowerCase.test(password) &&
      hasNumbers.test(password) &&
      hasSpecialChars.test(password)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== retypePassword) {
      setLoading(false);
      setError({
        type: "password match",
        message: "password and retype password must match"
      });
      toast.error(error.type === "password match" ? error.message : "");
    } else if (passwordValidator() === false) {
      setLoading(false);
      setError({
        type: "password valid",
        message:
          "password must contain lowercase, uppercase number and special character"
      });
      toast.error(error.type === "password valid" ? error.message : "");
    } else if (totalBalance !== availableBalance) {
      setLoading(false);
      setError({
        type: "balance check",
        message:
          "total balance and available balance must be the same for a new user"
      });
      toast.error(error.type === "password valid" ? error.message : "");
    } else {
      // const url = "https://skyline-2kje.onrender.com/admin-login"
      const url = "https://skyline-2kje.onrender.com/admin-create";
      const admin = JSON.parse(localStorage.getItem("adminData"));
      const token = admin.token;
      const headers = {
        Authorization: `Bearer ${token}`
      };
      const adminData = {
        username: "Jerikoko",
        password: "Mykehirl10@"
      };
      axios
        .post(url, userData, { headers })
        .then((response) => {
          // console.log(response.data.data)
          toast.success("user added successfully");
          setLoading(false);
          const oldData = JSON.parse(localStorage.getItem("allUsers")) || [];
          const newData = [...oldData, response.data.data];
          localStorage.setItem("allUsers", JSON.stringify(newData));
        })
        .catch((error) => {
          // console.log(error)
          toast.error(error.response.data.message);
          setLoading(false);
          // console.log(admin)
        });
    }
  };

  // console.log(myApp)
  return (
    <div className="addAccountParent">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="addformHold">
          <div className="addformrow">
            <div className="inputHold">
              <p>Full Name</p>
              <input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
              />
            </div>
            <div className="inputHold">
              <p>User Name</p>
              <input
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
              />
            </div>
            <div className="inputHold">
              <p>Password</p>
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
              />
            </div>
            <div className="inputHold">
              <p>Retype Password</p>
              <input
                required
                value={retypePassword}
                onChange={(e) => setRetypePassword(e.target.value)}
                type="text"
              />
            </div>
          </div>
          <div className="addformrow">
            <div className="inputHold">
              <p>Phone</p>
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
              />
            </div>
            <div className="inputHold">
              <p>Email</p>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </div>
            <div className="inputHold">
              <p>Occupation</p>
              <input
                required
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                type="text"
              />
            </div>
            <div className="inputHold">
              <p>Date of birth</p>
              <input
                required
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                type="date"
              />
            </div>
          </div>
          <div className="addformrow">
            <div className="inputHold">
              <p>Marital Status</p>
              <select
                required
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
                name="accounts"
                id="accounts"
              >
                <option value="">Select</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">divorced</option>
              </select>
            </div>
            <div className="inputHold">
              <p>Account Number</p>
              <input
                title="minimum of 10 numbers"
                required
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                type="text"
                pattern="\d{10,}"
                minLength={10}
              />
            </div>
            <div className="inputHold">
              <p>Address</p>
              <input
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
              />
            </div>
            <div className="inputHold">
              <p>Account Type</p>
              <select
                required
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                name="accounts"
                id="accounts"
              >
                <option value="">Select</option>
                <option value="savings">Savings</option>
                <option value="current">Current</option>
                {/* <option value="checking">Checking</option> */}
              </select>
            </div>
          </div>
          <div className="addformrow">
            <div className="inputHold">
              <p>Registeration Date</p>
              <input
                required
                value={registerationDate}
                onChange={(e) => setRegisterationDate(e.target.value)}
                type="date"
              />
            </div>
            <div className="inputHold">
              <p>Total balance</p>
              <input
                required
                value={totalBalance}
                onChange={(e) => setTotalBalance(e.target.value)}
                type="number"
              />
            </div>
            <div className="inputHold">
              <p>Available balance</p>
              <input
                required
                value={availableBalance}
                onChange={(e) => setAvailableBalance(e.target.value)}
                type="number"
              />
            </div>
            <div className="inputHold">
              <p>Account Limit</p>
              <input
                required
                value={accountLimit}
                onChange={(e) => setAccountLimit(e.target.value)}
                type="number"
              />
            </div>
          </div>
          <div className="addformrow">
            <div className="inputHold">
              <p>COT Code</p>
              <input
                required
                value={cotCode}
                onChange={(e) => setCotCode(e.target.value)}
                type="text"
              />
            </div>
            <div className="inputHold">
              <p>TAX Code</p>
              <input
                required
                value={taxCode}
                onChange={(e) => setTaxCode(e.target.value)}
                type="text"
              />
            </div>
            <div className="inputHold">
              <p>Matching Code</p>
              <input
                required
                value={matchingCode}
                onChange={(e) => setMatchingCode(e.target.value)}
                type="number"
              />
            </div>
          </div>
          <div className="addformrowbutt">
            <button>
              {loading ? <BeatLoader color="white" /> : "Create Account"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export const CreditAccount = () => {
  const [creditAccount, setCreditAccount] = useState("");
  const [accountToCredit, setAccountToCredit] = useState();
  const [debitAccount, setDebitAccount] = useState("");
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [bank, setBank] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [allAccount, setAllAccount] = useState();
  const [id, setId] = useState();

  const amount1 = parseInt(amount);
  const from = parseInt(debitAccount);
  const accountToCredit1 = parseInt(accountToCredit);

  const data = {
    chooseAccount: accountToCredit1,
    from: from,
    amount: amount1,
    description: description,
    date: date,
    time: time,
    bank: bank
  };
  const admin = JSON.parse(localStorage.getItem("adminData"));
  const token = admin.token;
  const adminId = admin._id;
  const headers = {
    Authorization: `Bearer ${token}`
  };

  const url = "https://skyline-2kje.onrender.com/view-all-users";
  useEffect(() => {
    const fetchData = async () => {
      setLoading2(true);
      try {
        const response = await axios.get(url, { headers });
        setAllAccount(response?.data.data);
        setLoading2(false);
      } catch (err) {
        setLoading2(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (!adminId) {
      toast.error("Please select a valid account to credit.");
      setLoading(false);
      return;
    }
    const url = `https://skyline-2kje.onrender.com/credit/${adminId}`;
    axios
      .post(url, data, { headers })
      .then((response) => {
        toast.success(response.data.message);
        setLoading(false);
        setAccountToCredit("");
        setAmount("");
        setDate("");
        setDebitAccount("");
        setBank("");
        setDescription("");
        setTime("");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="addAccountParent">
      <ToastContainer />
      <form action="" onSubmit={handleSubmit}>
        <div className="creditAccountHold">
          <div className="creditAccount">
            <div className="creditTopic">
              <p>Credit user account</p>
            </div>
            <div className="creditAccountrow">
              <div className="creditInputHold">
                <p>Choose account to credit</p>
                <select
                  required
                  value={accountToCredit}
                  // onChange={handleSelectChange}
                  onChange={(e) => setAccountToCredit(e.target.value)}
                  name="accounts"
                  id="accounts"
                >
                  <option value="">Select</option>
                  {allAccount?.map((e, index) => (
                    <option key={index} value={e.accountNumber}>
                      {e.fullName}
                    </option>
                    // <option key={index} value={e._id}>
                    //   {e.fullName}
                    // </option>
                  ))}
                </select>
              </div>
              <div className="creditInputHold">
                <p>From</p>
                <select
                  required
                  value={debitAccount}
                  onChange={(e) => setDebitAccount(e.target.value)}
                  name="account"
                  id="accounts"
                >
                  <option value="">Select</option>
                  {allAccount?.map((e, index) => (
                    <option key={index} value={e.accountNumber}>
                      {e.fullName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="creditAccountrow">
              <div className="creditInputHold">
                <p>Amount</p>
                <input
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                />
              </div>
              <div className="creditInputHold">
                <p>Description</p>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                />
              </div>
            </div>
            <div className="creditAccountrow">
              <div className="creditInputHold">
                <p>Date</p>
                <input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                />
              </div>
              <div className="creditInputHold">
                <p>Time</p>
                <input
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  type="Time"
                />
              </div>
            </div>
            <div className="creditAccountrow">
              <div className="creditInputHold">
                <p>Bank</p>
                <input
                  // required
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  type="text"
                />
              </div>
              {/* <div className="creditInputHold">
                            <p>Time</p>
                            <input 
                            // required
                            value={time}
                            onChange={(e)=>setTime(e.target.value)}
                            type="Time" />
                        </div> */}
            </div>
            <div className="creditAcctButt">
              <button>{loading ? <BeatLoader color="white" /> : "SEND"}</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export const DebitAccount = () => {
  const [creditAccount, setCreditAccount] = useState("");
  const [debitAccount, setDebitAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [bank, setBank] = useState("");
  const [loading, setLoading] = useState(false);
  const [allAccount, setAllAccount] = useState();

  const chooseAccount = debitAccount;
  const credit = parseInt(creditAccount);

  const data = {
    chooseAccount: chooseAccount,
    to: credit,
    amount: amount,
    description: description,
    date: date,
    time: time,
    bank: bank
  };
  const admin = JSON.parse(localStorage.getItem("adminData"));
  const token = admin.token;
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const url = "https://skyline-2kje.onrender.com/view-all-users";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, { headers });
        setAllAccount(response?.data.data);
      } catch (err) {}
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const url = `https://skyline-2kje.onrender.com/debit/${debitAccount}`;
    axios
      .post(url, data, { headers })
      .then((response) => {
        // console.log(response)
        setDebitAccount("");
        setCreditAccount("");
        setAmount("");
        setDescription("");
        setDate("");
        setTime("");
        setBank("");
        toast.success(response.data.message);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error(error.response.data.message);
        // console.log(data)
      });
  };

  return (
    <div className="addAccountParent">
      <ToastContainer />
      <form action="" onSubmit={handleSubmit}>
        <div className="creditAccountHold">
          <div className="creditAccount">
            <div className="creditTopic">
              <p>Debit user account</p>
            </div>
            <div className="creditAccountrow">
              <div className="creditInputHold">
                <p>Choose account to debit</p>
                <select
                  required
                  value={debitAccount}
                  onChange={(e) => setDebitAccount(e.target.value)}
                  name="accounts"
                  id="accounts"
                >
                  <option value="">Select</option>
                  {allAccount?.map((e, index) => (
                    <option key={index} value={e._id}>
                      {e.fullName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="creditInputHold">
                <p>Debit to</p>
                <select
                  required
                  value={creditAccount}
                  onChange={(e) => setCreditAccount(e.target.value)}
                  name="accounts"
                  id="accounts"
                >
                  <option value="">select</option>
                  {allAccount?.map((e, index) => (
                    <option key={index} value={e.accountNumber}>
                      {e.fullName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="creditAccountrow">
              <div className="creditInputHold">
                <p>Amount</p>
                <input
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                />
              </div>
              <div className="creditInputHold">
                <p>Description</p>
                <input
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                />
              </div>
            </div>
            <div className="creditAccountrow">
              <div className="creditInputHold">
                <p>Date</p>
                <input
                  // required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                />
              </div>
              <div className="creditInputHold">
                <p>Time</p>
                <input
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  type="Time"
                />
              </div>
            </div>
            <div className="creditAccountrow">
              <div className="creditInputHold">
                <p>Bank</p>
                <input
                  // required
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  type="text"
                />
              </div>
              {/* <div className="creditInputHold">
                            <p>Time</p>
                            <input 
                            value={time}
                            onChange={(e)=> setTime(e.target.value)}
                            type="Time" />
                        </div> */}
            </div>
            <div className="creditAcctButt">
              <button>
                {loading ? <BeatLoader color="white" /> : "DEBIT"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export const UpdateAccount = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [allAccount, setAllAccount] = useState();
  // const [allAccount2, setAllAccount2] = useState([])
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [address, setAddress] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [availableBalance, setAvailableBalance] = useState("");
  const [totalBalance, setTotalBalance] = useState("");
  const [registerationDate, setRegisterationDate] = useState();
  const [currency, setCurrency] = useState("");
  const [cotCode, setCotCode] = useState("");
  const [taxCode, setTaxCoded] = useState("");
  const [accountLimit, setAccountLimit] = useState();
  const [loading2, setLoading2] = useState(false);
  const [placeholder, setPlaceholder] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState({
    // isError: false,
    type: "",
    message: ""
  });

  const handlePlaceholder = (e) => {
    setPlaceholder(e);
    setShowUpdate(true);
  };

  const balance = parseInt(totalBalance);
  const available = parseInt(availableBalance);
  const limit = parseInt(accountLimit);

  const userData = {
    fullName: fullName,
    username: userName,
    phoneNumber: phone,
    password: password,
    email: email,
    occupation: occupation,
    dateOfBirth: dateOfBirth,
    maritalStatus: maritalStatus,
    address: address,
    accountType: accountType,
    accountNumber: accountNumber,
    availableBalance: available,
    totalBalance: balance,
    registrationDate: registerationDate,
    cotCode: cotCode,
    taxCode: taxCode,
    accountLimit: limit
  };
  const admin = JSON.parse(localStorage.getItem("adminData"));
  const token = admin.token;
  const headers = {
    Authorization: `Bearer ${token}`
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setImageLoading(true);
    try {
      const formData = new FormData();
      formData.append("profilePhoto", file);

      const response = await axios.put(
        `https://skyline-2kje.onrender.com/profilephoto/${placeholder._id}`,
        formData,
        { headers }
      );

      setImage(URL.createObjectURL(file));
      toast.success(
        response?.data?.message || "Profile photo updated successfully"
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "failed to upload image");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setImageLoading(false);
    }
  };

  const handleUpdate = () => {
    setLoading2(true);
    const url = `https://skyline-2kje.onrender.com/admin-update/${placeholder._id}`;
    axios
      .put(url, userData, { headers })
      .then((response) => {
        console.log(response);
        console.log(registerationDate);
        setLoading2(false);
        toast.success("user update successful");
        setTimeout(() => {
          setShowUpdate(false);
        }, 4000);
      })
      .catch((error) => {
        // console.log(error)
        setLoading2(false);
        toast.error("update failed");
      });
  };

  useEffect(() => {
    const url = "https://skyline-2kje.onrender.com/view-all-users";
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, { headers });
        setAllAccount(response?.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="addAccountParent">
      <div className="updateAccountHold">
        <div className="updateHeadtopic">
          <p>Choose the account to update</p>
        </div>
        {loading ? (
          <BeatLoader color="blue" />
        ) : (
          <div className="accountChooseHold">
            {allAccount?.length === 0 ? (
              <div>
                <p>No Account Found</p>
              </div>
            ) : (
              allAccount?.map((e, index) => (
                <div
                  key={index}
                  className="accountChooseDetail"
                  onClick={() => handlePlaceholder(e)}
                >
                  <p>{index + 1} : </p>
                  <p>{e.fullName}</p>
                </div>
              ))
            )}
          </div>
        )}
        {showUpdate ? (
          <div className="updateInfoDetails">
            <ToastContainer />
            <div className="closeUpdate">
              <div className="updateClose" onClick={() => setShowUpdate(false)}>
                <IoCloseSharp />
              </div>
              <div
                className="updateClose2"
                onClick={() => setShowUpdate(false)}
              >
                <FaArrowLeftLong />
              </div>
              <h1 className="infow">change only the info you want to update</h1>
            </div>

            <div className="addformHold">
              {/* Profile Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Profile Information
                </h3>
                <div className="relative flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-[100%] bg-gray-300 ">
                    <img
                      src={
                        image ||
                        placeholder?.profilePhoto?.url ||
                        "https://www.exscribe.com/wp-content/uploads/2021/08/placeholder-image-person-jpg.jpg"
                      }
                      alt="Profile"
                      // layout="responsive"
                      width={100}
                      height={100}
                      className="w-full h-full rounded-[100%] object-cover border"
                    />
                    <label
                      htmlFor="upload-image"
                      className="absolute bottom-0 right-0 p-1 bg-[#000080] rounded-full text-white cursor-pointer disabled:opacity-50"
                    >
                      {imageLoading ? (
                        <div className="animate-spin">↻</div>
                      ) : (
                        <FaCamera />
                      )}
                    </label>
                    <input
                      type="file"
                      id="upload-image"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={imageLoading}
                    />
                  </div>

                  <label
                    htmlFor="upload-image"
                    className={`px-3 py-2 text-sm font-semibold bg-white text-[#000080] border border-[#000080] rounded-[7px] cursor-pointer ${
                      imageLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {imageLoading ? "Uploading..." : "Upload New"}
                  </label>
                </div>
              </div>
              <div className="addformrow">
                <div className="inputHold">
                  <p>Full Name</p>
                  <input
                    value={fullName}
                    placeholder={placeholder.fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="inputHold">
                  <p>User Name</p>
                  <input
                    value={userName}
                    placeholder={placeholder.username}
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="inputHold">
                  <p>Password</p>
                  <input
                    value={password}
                    placeholder={placeholder.password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="inputHold">
                  <p>Retype Password</p>
                  <input type="text" />
                </div>
              </div>
              <div className="addformrow">
                <div className="inputHold">
                  <p>Phone</p>
                  <input
                    value={phone}
                    placeholder={placeholder.phoneNumber}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="inputHold">
                  <p>Email</p>
                  <input
                    value={email}
                    placeholder={placeholder.email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="inputHold">
                  <p>Occupation</p>
                  <input
                    value={occupation}
                    placeholder={placeholder.occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="inputHold">
                  <p>Date of birth</p>
                  <input
                    value={dateOfBirth}
                    placeholder={placeholder.dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    type="date"
                  />
                </div>
              </div>
              <div className="addformrow">
                <div className="inputHold">
                  <p>Marital Status</p>
                  <select
                    name=""
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    value={maritalStatus}
                    id="accounts"
                  >
                    <option value="Married">Married</option>
                    <option value="Single">Single</option>
                    <option value="Divorced">Divorced</option>
                  </select>
                </div>

                <div className="inputHold">
                  <p>Address</p>
                  <input
                    value={address}
                    placeholder={placeholder.address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="inputHold">
                  <p>Account Type</p>
                  <input
                    value={accountType}
                    placeholder={placeholder.accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    type="text"
                  />
                </div>
              </div>
              <div className="addformrow">
                <div className="inputHold">
                  <p>Registeration Date</p>
                  <input
                    value={registerationDate}
                    placeholder={placeholder.registrationDate}
                    onChange={(e) => setRegisterationDate(e.target.value)}
                    type="date"
                  />
                </div>
                <div className="inputHold">
                  <p>Total balance</p>
                  <input
                    value={totalBalance}
                    placeholder={placeholder.totalBalance}
                    onChange={(e) => setTotalBalance(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="inputHold">
                  <p>Available balance</p>
                  <input
                    value={availableBalance}
                    placeholder={placeholder.availableBalance}
                    onChange={(e) => setAvailableBalance(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="inputHold">
                  <p>Account number</p>
                  <input
                    value={accountNumber}
                    placeholder={placeholder.accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    type="text"
                  />
                </div>
              </div>
              <div className="addformrow">
                <div className="inputHold">
                  <p>Account currency</p>
                  <input
                    value={currency}
                    placeholder={placeholder.accountCurrency}
                    onChange={(e) => setCurrency(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="inputHold">
                  <p>COT code</p>
                  <input
                    placeholder={placeholder.cotCode}
                    value={cotCode}
                    onChange={(e) => setCotCode(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="inputHold">
                  <p>TAX code</p>
                  <input
                    placeholder={placeholder.taxCode}
                    value={taxCode}
                    onChange={(e) => setTaxCoded(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="inputHold">
                  <p>Account Limit</p>
                  <input
                    placeholder={placeholder.accountLimit}
                    value={accountLimit}
                    onChange={(e) => setAccountLimit(e.target.value)}
                    type="number"
                  />
                </div>
              </div>

              <div className="addformrowbutt">
                <button onClick={handleUpdate}>
                  {loading2 ? <BeatLoader color="white" /> : "Update Account"}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export const DeleteAccount = () => {
  const [deleteWarn, setDeleteWarn] = useState(false);
  const [allAccount, setAllAccount] = useState();
  const [loading, setLoading] = useState();
  const [deleteId, setDeleteId] = useState();
  const [loading2, setLoading2] = useState(false);

  const admin = JSON.parse(localStorage.getItem("adminData"));
  const token = admin.token;
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const url = "https://skyline-2kje.onrender.com/view-all-users";
  const fetchData = async () => {
    setLoading2(true);
    try {
      const response = await axios.get(url, { headers });
      setAllAccount(response?.data.data);
      setLoading2(false);
    } catch (err) {
      setLoading2(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = () => {
    setLoading(true);
    const url = `https://skyline-2kje.onrender.com/admin-delete/${deleteId._id}`;
    axios
      .delete(url, { headers })
      .then((response) => {
        // console.log(response)
        setLoading(false);
        toast.success("account successfully deleted");
        setDeleteWarn(false);
        fetchData();
      })
      .catch((error) => {
        // console.log(error)
        setLoading(false);
        toast.error("error deleting account");
      });
  };
  return (
    <div className="deleteAcountParent">
      <ToastContainer />

      {deleteWarn ? (
        <div className="deleteWarn">
          <p>
            Are you sure you want to delete{" "}
            <span style={{ color: "blue" }}>{deleteId.fullName}</span> from your
            users ?
          </p>
          <i>please note: Once this action is done it cannot be undone!!</i>
          <div className="deleteButt">
            <button className="cancelDel" onClick={() => setDeleteWarn(false)}>
              cancel
            </button>
            <button className="del" onClick={handleDelete}>
              {loading ? <BeatLoader color="blue" /> : "Delete"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="deleteActTopic">
            <p>Select Account to delete</p>
          </div>

          {loading2 ? (
            <BeatLoader color="blue" />
          ) : (
            <div className="deleteSelectHold">
              {allAccount?.length === 0 ? (
                <div>
                  <p>No Account Found</p>
                </div>
              ) : (
                allAccount?.map((e, index) => (
                  <div
                    key={index}
                    className="deleteSelect"
                    onClick={() => {
                      setDeleteWarn(true);
                      setDeleteId(e);
                    }}
                  >
                    <p>{index + 1} :</p>
                    <p>{e.fullName}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const ChangeAccountStatus = () => {
  // const [account, setAccount] = useState("")
  const [accountId, setAccountId] = useState("");
  const [allAccount, setAllAccount] = useState();
  const [accountStatus, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const admin = JSON.parse(localStorage.getItem("adminData"));
  const token = admin.token;
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const url = "https://skyline-2kje.onrender.com/view-all-users";
  const fetchData = async () => {
    setLoading2(true);
    try {
      const response = await axios.get(url, { headers });
      setAllAccount(response?.data.data);
      setLoading2(false);
    } catch (err) {
      setLoading2(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // console.log(allAccount)

  const handleSubmit = (e) => {
    const data = {
      accountStatus: accountStatus
    };
    setLoading(true);
    e.preventDefault();
    const url = `https://skyline-2kje.onrender.com/admin-status/${accountId}`;
    axios
      .put(url, data, { headers })
      .then((response) => {
        console.log(response);
        setLoading(false);
        toast.success("Account status changed successfully");
        console.log("status", accountStatus);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("operation failed");
      });
  };
  return (
    <div className="deleteAcountParent">
      <ToastContainer />
      <div className="changeStatusTopic">
        <p>Change Account Status</p>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className="changeStatusHold">
          <div className="statuschangeWrap">
            <p>Select Account</p>
            <select
              required
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              name="status"
              id="status"
            >
              loading2 ? <BeatLoader color="blue" /> :
              <option value="">Choose</option>
              {allAccount?.map((e, index) => (
                <option key={index} value={e._id}>
                  {e.fullName}
                </option>
              ))}
            </select>
          </div>
          <div className="statuschangeWrap">
            <p>Set Status</p>
            <select
              required
              value={accountStatus}
              onChange={(e) => setStatus(e.target.value)}
              name="status"
              id="status"
            >
              <option value="">Choose</option>
              <option value="active">Active</option>
              <option value="inactive">Dormant/Innactive</option>
              <option value="closed">Closed</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
          <div className="statusChangeButt">
            <button>{loading ? <BeatLoader color="white" /> : "SET"}</button>
          </div>
          <div className="guideline">
            <p>
              Active :{" "}
              <span>
                This means that the client can access all functions within
                his/her account
              </span>
            </p>
            <p>
              Dormant/Innactive:{" "}
              <span>
                A notice that the account is Dormant/Inactive will be shown on
                the client's dashboard. Also, he/she will not be able to make
                any transfers.
              </span>
            </p>
            <p>
              Closed:{" "}
              <span>
                When the account is set to Closed, it brings up a message when
                the client tries to log in, saying that the account no longer
                exist.
              </span>
            </p>
            <p>
              Disabled:{" "}
              <span>
                A client will be notified when they try logging in that their
                account has been disabled due to security reasons, we detected
                diffrent IP address and location.
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export const handleSendOtp = () => {
  return <div className="sendOtpParent"></div>;
};
