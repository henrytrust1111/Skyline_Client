import { useEffect, useState, useContext } from "react";
import { personsImgs } from "../../utils/images";
import { navigationLinks } from "../../data/data";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SidebarContext } from "../../Context/sidebarContext";
import "./Sidebar.css";

const Sidebar = () => {
  const [activeLinkIdx, setActiveLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isSidebarOpen } = useContext(SidebarContext);

  const data = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const userId = data?._id;

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://skyline-2kje.onrender.com/view-me/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setUserData(response.data.user);
        toast.success("User data fetched successfully!");
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error("User not found");
        }
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId, token]);

  // Update sidebar class based on context
  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarClass("sidebar-change");
    } else {
      setSidebarClass("");
    }
  }, [isSidebarOpen]);

  // Default profile image
  const profileImage = userData?.profilePhoto?.url || personsImgs.person_two;

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="user-info">
        <a href="/#/dashboard" aria-label="Dashboard">
          {userData ? (
            <div className="info-img img-fit-cover">
              <img src={profileImage} alt="Profile" />
            </div>
          ) : (
            <div className="info-img img-fit-cover">
              <img src="https://cdn3.iconfinder.com/data/icons/leto-user-group/64/__user_person_profile-1024.png" alt="Profile" />
            </div>
          )}
        </a>
        
        <span className="info-name">{userData?.username || "User"}</span>
      </div>

      <nav className="navigation">
        <ul className="nav-list">
          {navigationLinks.map((navigationLink) => (
            <li className="nav-item" key={navigationLink.id}>
              <a
                href={navigationLink.route}
                className={`nav-link ${
                  navigationLink.id === activeLinkIdx ? "active" : ""
                }`}
                onClick={() => setActiveLinkIdx(navigationLink.id)}
                aria-label={navigationLink.title}
              >
                <img
                  src={navigationLink.image}
                  className="nav-link-icon"
                  alt={navigationLink.title}
                />
                <span className="nav-link-text">{navigationLink.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
