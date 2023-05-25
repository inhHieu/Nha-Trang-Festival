import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Profile";
import "./Subcribed";
import "../../style/pages/User.scss";
import bg from "../../asses/art.jpg";
import Profile from "./Profile";
import Subcribed from "./Subcribed";
import Loader from "../../component/Loader";

const User = (props) => {
  const [tab, setTab] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [userInfos, setUserInfo] = useState({ user: {} });
  const [userID, setUserID] = useState();
  const [token, setToken] = useState();
  const [loadings, setLoadings] = useState(true);
  const [userInfo, setUser] = useState();
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      const userInfo = JSON.parse(localStorage.getItem("user-info"));
      setToken(userInfo.token);
      setUserID(userInfo.user.user_ID);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const getUser = async () => {
    if (userID && token) {
      // check if userID and token have been set
      try {
        const response = await axios.get(
          `http://localhost:8008/api/users/${userID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setUserInfo(response.data);
        setLoadings(false);
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, [userID, token]); // call getUser when userID or token changes

  if (loadings) {
    return <Loader/>;
  }
  
  return (
    <motion.div
      className="user"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ bounce: 0 }}
    >
      <div className="profile-display">
        <div className="bg-img-wrap">
          <img src={bg} alt="" />
        </div>
        <div className="info">
          <div className="avatar-wrap w-36 h-36 -bottom-[4.5rem] rounded-full md:w-[200px] md:h-[200px] md:-bottom-[100px] ">
            <img src="" alt="" />
          </div>
          <div className="user-name left-44 text-[1.3rem] font-semibold sm:text-[2rem] sm:left-56 ">{userInfos ? userInfos.firstName + " "+ userInfos.lastName : ""}</div>
          <div className="tab-group">
            <div className={`tab ${tab ? 'active' : ''}`} onClick={() => setTab(true)}>Profile</div>
            <div className={`tab ${!tab ? 'active' : ''}`} onClick={() => setTab(false)}>Subscribed</div>
          </div>
        </div>
      </div>
      <div className="container">
        {loggedIn ? (
          <>
            {tab ? (<Profile
              userInfos={userInfos}
            />) : (<Subcribed token={token} id={userID} />)}
          </>
        ) : (
          <div className="alert">You currently not logged-in</div>
        )}
      </div>
    </motion.div>

    // <motion.div className="user"
    // initial={{y:100}}
    // animate={{y:0 , }}
    // transition={{ type: "spring", bounce: 0 }}
    // exit={{opacity:0}}>
    //   <div className="container">
    //     <h3 className="greeting">Hi,{userInfo.fullName}</h3>
    //       <div className="avatar">{/* <img></img> */}</div>

    //     </div>
    // </motion.div>
  );
};

export default User;
