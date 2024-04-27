import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from "@mui/icons-material/Create";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import logo from "../assets/logo.png";
import PersonIcon from "@mui/icons-material/Person";
import BasicChips from "../components/custom/Chips";
import { RiLogoutCircleRFill } from "react-icons/ri";
import Calender from "../components/custom/Calender";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
// import './home.css'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CustomMenu from "../components/custom/CustomMenu";
import axios from "axios";

const Home = () => {
  const [showMenu, setShowMenu] = useState(false);
  const p = useLocation();
  console.log("GHj", p.pathname);
  useEffect(() => {
    console.log("home bete");
    const loadCSS = () => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "./home.css";
      document.head.appendChild(link);
    };
    loadCSS();
  }, []);

  const handleNotification = () => {
    navigate("/notification", { replace: true });
    window.location.reload();
  };
  const user = useSelector((state) => state.loggedSlice.currentUser);
  console.log("User", user);
  const navigate = useNavigate();

  const handleClick = () => {
    // console.log("hii")
  };
  // for mcq questions
  const [totalMcq, setTotalMcq] = useState(0);
  const [lastMcq, setLastMcq] = useState([]);
  const [secondMcq, setSecondLastMcq] = useState([]);

  // for recent data

  const [recent, setRecent] = useState("");
  useEffect(() => {
    const getTotalData = async () => {
      let response = await axios.get(
        `http://localhost:2001/user/questions/get/${user.email}`
      );
      console.log(
        "response asd",
        response?.data[response.data.length - 1].topic
      );
      console.log("response full", response?.data);
      // console.log("dsdsdcs",Array.isArray(response.data))
      setRecent(response?.data);
      setTotalMcq(response?.data.length);
      setLastMcq(response?.data[response.data.length - 1].topic);
      setSecondLastMcq(response?.data[response.data.length - 2].topic);
    };
    getTotalData();
  }, [user.email]);
  return (
    <>
      <header className="header">
        <section className="flex">
          <p className="logo">AutoProb</p>

          <form className="search-form">
            <input
              type="text"
              name="search_box"
              required
              placeholder="search courses..."
              maxLength="100"
            />
            <button type="submit" className="fas fa-search">
              <SearchIcon sx={{ fontSize: "26px" }} className="fas fa-search" />
            </button>
          </form>

          <div className="icons" style={{ display: "flex" }}>
            {/* <div id="user-btn" className="fas fa-user"onClick={()=>setShowMenu(true)}><PersonIcon sx={{fontSize:'26px'}}/></div>
         {showMenu && <CustomMenu />} */}
            <div
              id="toggle-btn"
              className="fas fa-sun"
              onClick={handleNotification}
            >
              <NotificationsActiveIcon sx={{ fontSize: "24px" }} />
            </div>
            <div id="toggle-btn" className="fas fa-sun" onClick={handleClick}>
              <SettingsIcon sx={{ fontSize: "22px" }} />
            </div>
            <div id="toggle-btn" style={{display:'flex',justifyContent:"center",alignItems:"center"}} className="fas fa-sun" onClick={handleClick}>
              <RiLogoutCircleRFill style={{ fontSize: "22px" }} />
            </div>
          </div>

          <div className="profile">
            <img src="" className="image" alt="" />
            <h3 className="name">shaikh anas</h3>
            <p className="role">studen</p>
            <a href="profile.html" className="btn">
              view profile
            </a>
            <div className="flex-btn">
              <a href="login.html" className="option-btn">
                login
              </a>
              <a href="register.html" className="option-btn">
                register
              </a>
            </div>
          </div>
        </section>
      </header>

      <div className="side-bar">
        <div id="close-btn">
          <i className="fas fa-times"></i>
        </div>

        <div className="profile">
          <img src={logo} className="image" alt="" style={{ width: "100%" }} />
          <h3 className="name">{user.username}</h3>
          <a href="profile.html" className="btn">
            view profile
          </a>
        </div>

        <nav className="navbar">
          <a href="/">
            <HomeIcon
              sx={{
               fontSize: "22px",
                color: "#8e44ad",
                marginRight: "1rem",
                marginBottom: "5px",
              }}
            />
            <span>Home</span>
          </a>
          <a href="/test">
            <RadioButtonCheckedIcon
              sx={{  fontSize: "22px", color: "#8e44ad", marginRight: "1rem" }}
            />
            <span>Question Paper-MCQs</span>
          </a>
          <a href="/prompt">
            <CreateIcon
              sx={{  fontSize: "22px", color: "#8e44ad", marginRight: "1rem" }}
            />
            <span>Question Paper-Written</span>
          </a>
          <a href="friend">
            <CastForEducationIcon
              sx={{  fontSize: "22px", color: "#8e44ad", marginRight: "1rem" }}
            />
            <span>Study Buddy</span>
          </a>
          <a href="/pay">
            <CardGiftcardIcon
              sx={{
               fontSize: "22px",
                color: "#8e44ad",
                marginRight: "1rem",
                marginBottom: "5px",
              }}
            />
            <span>Subscriptions</span>
          </a>
          <a href="/contact-us">
            <ForwardToInboxIcon
              sx={{
                fontSize: "22px",
                color: "#8e44ad",
                marginRight: "1rem",
                marginBottom: "5px",
              }}
            />
            <span>Contact Us</span>
          </a>
        </nav>
      </div>

      <section className="home-grid">
        <h1 className="heading">quick options</h1>

        <div className="box-container">
          <div className="box">
            <h3 className="title">Question Paper-MCQs</h3>
            <p className="likes">
              total Paper : <span>{totalMcq}</span>
            </p>
            <a href="#" className="inline-btn">
              view Details
            </a>
            <p className="likes">
              total Questions : <span>{totalMcq * 10}</span>
            </p>
            <a href="#" className="inline-btn">
              view comments
            </a>
            <p className="likes" style={{ marginBottom: "1rem" }}>
              Favorite Topics :{" "}
            </p>

            {/* for a specific topic  */}
            <div>
              <div
                className="likes"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <BasicChips label={lastMcq} />
                <p style={{ fontSize: "14px" }}>x 10 questions</p>
              </div>
            </div>
            <div>
              <div
                className="likes"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <BasicChips label={secondMcq} />
                <p style={{ fontSize: "14px" }}>x 10 questions</p>
              </div>
            </div>
            {/* <a href="#" className="inline-btn">view playlists</a> */}
          </div>

          <div className="box">
            <h3 className="title">Question Paper-Written</h3>
            <p className="likes">
              total Paper : <span>25</span>
            </p>
            <a href="#" className="inline-btn">
              view Details
            </a>
            <p className="likes">
              total Questions : <span>12</span>
            </p>
            <a href="#" className="inline-btn">
              view comments
            </a>
            <p className="likes" style={{ marginBottom: "1rem" }}>
              Favorite Topics :{" "}
            </p>

            {/* for a specific topic  */}
            <div>
              <div
                className="likes"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <BasicChips label="Java" />
                <p style={{ fontSize: "14px" }}>x 30 questions</p>
              </div>
            </div>
            <div>
              <div
                className="likes"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <BasicChips label="Cryptography" />
                <p style={{ fontSize: "14px" }}>x 30 questions</p>
              </div>
            </div>
            {/* <a href="#" className="inline-btn">view playlists</a> */}
          </div>

          <div className="box">
            <h3 className="title">Recent Topics</h3>
            <div className="flex">
              {recent[recent?.length - 1] && (
                <a>
                  <span>{recent[recent?.length - 1].topic}</span>
                </a>
              )}
               {recent[recent?.length - 2] && (
                <a>
                  <span>{recent[recent?.length - 2].topic}</span>
                </a>
              )}
               {recent[recent?.length - 3] && (
                <a>
                  <span>{recent[recent?.length - 3].topic}</span>
                </a>
              )}
               {recent[recent?.length - 4] && (
                <a>
                  <span>{recent[recent?.length - 4].topic}</span>
                </a>
              )}
             
            </div>
          </div>

          <div className="box">
            <h3 className="title">Solve With Friend</h3>
            <p className="tutor">
              Connect with friends in real-time to tackle practice exams
              together.
            </p>
            <a href="/friend" className="inline-btn">
              get started
            </a>
          </div>
          {/* 
      <div className="box" style={{width:"40rem"}}>
         <h3 className="title">become a tutor</h3>
         <Calender />
      </div> */}
        </div>
      </section>
    </>
  );
};

export default Home;
