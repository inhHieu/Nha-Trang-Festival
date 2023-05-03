import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import "./Profile";
import "./Subcribed";
import "../../style/pages/User.scss";
import bg from "../../asses/art.jpg";
import Profile from "./Profile";
import Subcribed from "./Subcribed";

const User = (props) => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [tab, setTab] = useState(false);

  const [userName, setUserName] = useState("");
  // const [userDOB, setUserDOB] =useState('')
  const [userAddress, setUserAddress] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("user-info")) {
      const userInfo = JSON.parse(sessionStorage.getItem("user-info"));
      setUserInfo(userInfo);
      setUserName(userInfo.fullName);
      // setUserDOB(userInfo);
      setUserAddress(userInfo.address);
      setUserEmail(userInfo.email);
      setUserPhone(userInfo.phone);
    } else setLoggedIn(false)
  }, [setUserInfo]);

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
          <div className="avatar-wrap">
            <img src="" alt="" />
          </div>
          <div className="user-name">{userName ? userName : ""}</div>
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
              userName={userName}
              userAddress={userAddress}
              userEmail={userEmail}
              userPhone={userPhone}
            />) : (<Subcribed />)}
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
