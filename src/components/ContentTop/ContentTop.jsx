import { iconsImgs } from "../../utils/images";
import "./ContentTop.css";
import { useContext, useState, useRef } from "react";
import { SidebarContext } from "../../Context/sidebarContext";
import { TickerTape } from "react-ts-tradingview-widgets";
import { FaUserEdit, FaIdCard, FaUpload, FaCreditCard } from "react-icons/fa";
import AddKYCModal from "./modals/AddKYCModal";
import EditProfileModal from "./modals/EditProfileModal";
import UploadImageModal from "./modals/UploadImageModal";
import { useLocation, useNavigate } from "react-router-dom";
import CardDetailsFormModal from "./modals/CardDetailsFormModal";
import { FiLogOut } from "react-icons/fi";

const ContentTop = () => {
  const { toggleSidebar } = useContext(SidebarContext);
  const [showSettings, setShowSettings] = useState(false);
  const [isAddKYCModalOpen, setAddKYCModalOpen] = useState(false);
  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [isUploadImageModalOpen, setUploadImageModalOpen] = useState(false);
  const [isCardDetailsFormModalOpen, setCardDetailsFormModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const nav = useNavigate()

  const location = useLocation();
  const currentPath = location.pathname.split("/").filter(Boolean).pop();

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowSettings(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowSettings(false);
    }, 200);
  };

  function handleKYC() {
    setAddKYCModalOpen(true);
    setShowSettings(false);
  }

  function handleUploadImage() {
    setUploadImageModalOpen(true);
    setShowSettings(false);
  }

  function handleEditProfile() {
    setEditProfileModalOpen(true);
    setShowSettings(false);
  }

  function handleCardDetails() {
    setCardDetailsFormModalOpen(true);
    setShowSettings(false);
  }

  function handleLogout() {
   localStorage.removeItem('token')
   localStorage.removeItem('user')
   nav('/sign-in')
  }

  function handleNotification() {
   nav('/dashboard/message')
  }

  return (
    <>
      <div className="main-content-top">
        <div className="content-top-left">
          <button
            type="button"
            className="sidebar-toggler"
            onClick={() => toggleSidebar()}
          >
            <img src={iconsImgs.menu} alt="Menu" />
          </button>
          <h3 className="content-top-title uppercase">{currentPath}</h3>
        </div>
        <div className="content-top-btns flex mb-1 relative">
          <button className="notification-btn content-top-btn mb-1" onClick={handleNotification}>
            <img src={iconsImgs.bell} alt="Notifications" />
            <span className="notification-btn-dot"></span>
          </button>
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button type="button" className="setting-btn content-top-btn">
              <img src={iconsImgs.gears} alt="Settings" />
            </button>
            {showSettings && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 -bg--clr-primary shadow-lg rounded-lg -text--clr-silver-v1"
              >
                <div
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleKYC()}
                >
                  <FaIdCard className="mr-2 -text--clr-silver" />
                  <span>Add KYC</span>
                </div>
                <div
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleEditProfile()}
                >
                  <FaUserEdit className="mr-2" />
                  <span>Edit Profile</span>
                </div>
                <div
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer -text--clr-silver-v1"
                  onClick={() => handleUploadImage()}
                >
                  <FaUpload className="mr-2" />
                  <span>Upload Image</span>
                </div>
                <div
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer -text--clr-silver-v1"
                  onClick={() => handleCardDetails()}
                >
                  <FaCreditCard className="mr-2 " />
                  <span>Add Card Details</span>
                </div>
                <div
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer -text--clr-silver-v1"
                  onClick={() => handleLogout()}
                >
                  <FiLogOut className="mr-2 -text--clr-silver-v1" />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <div className="trade__widget">
        <TickerTape
          colorTheme="dark"
          displayMode="adaptive"
          showSymbolLogo={false}
        ></TickerTape>
      </div> */}
      {isAddKYCModalOpen && (
        <AddKYCModal onClose={() => setAddKYCModalOpen(false)} />
      )}
      {isEditProfileModalOpen && (
        <EditProfileModal onClose={() => setEditProfileModalOpen(false)} />
      )}
      {isUploadImageModalOpen && (
        <UploadImageModal onClose={() => setUploadImageModalOpen(false)} />
      )}
      {isCardDetailsFormModalOpen && (
        <CardDetailsFormModal
          onClose={() => setCardDetailsFormModalOpen(false)}
        />
      )}
    </>
  );
};

export default ContentTop;
