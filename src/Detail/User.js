import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./User.scss";
const User = (props) => {
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    setUserInfo(userInfo);
  }, [setUserInfo]);
  const [active, setActive] = useState();
  const [edit, setEdit] = useState();
  useEffect(() => {
    if (edit) setActive(true);
  }, [edit]);
  return (
    <motion.div className="user"
    initial={{y:100}}
    animate={{y:0 , }}
    transition={{ type: "spring", bounce: 0 }}
    exit={{opacity:0}}>
      <div className="container">
        <h3 className="greeting">Hi,{userInfo.fullName}</h3>
        <div className="user-info">
          <div className="avatar">{/* <img></img> */}</div>
          <div className="information">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className={active ? "active" : ""}
              disabled={!active}
              value={userInfo.fullName}
            ></input>
            <label htmlFor="dob">Day of Birth</label>
            <input
              type="text"
              id="dob"
              className={active ? "active" : ""}
              disabled={!active}
            ></input>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              className={active ? "active" : ""}
              disabled={!active}
              value={userInfo.address}
            ></input>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              className={active ? "active" : ""}
              disabled={!active}
              value={userInfo.email}
            ></input>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              className={active ? "active" : ""}
              disabled={!active}
              value={userInfo.phone}
            ></input>
            <button
              type="submit"
              className="btn"
              onClick={(e) => setEdit((prev) => !prev)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default User;
