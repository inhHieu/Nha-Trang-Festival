import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../style/pages/New.scss";

function Event(props) {
  const imgWrapRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState([]);
  const [sub, setSub] = useState([]);
  const [userID, setUserID] = useState();
  const [token, setToken] = useState();
  const [loadings, setLoadings] = useState(false);
  const [heart, setHeart] = useState(false);

  const getEvent = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8008/api/events/${id}`
      );
      setEvent(response.data);
      setLoadings(true);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };
  //APIs call
  useEffect(() => {
    getEvent();
    if (localStorage.getItem("user-sub") && localStorage.getItem("user-info")) {
      const data = JSON.parse(localStorage.getItem("user-info"));
      setUserID(data.user.user_ID);
      setToken(data.token);
      setSub(JSON.parse(localStorage.getItem("user-sub")));
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("user-sub")) {
      setSub(JSON.parse(localStorage.getItem("user-sub")));
    }
  }, [setSub]);

  useEffect(() => {
    if (sub.length > 0)
      for (let i = 0; i < sub.length; i++) {
        if (id == sub[i].eventId) setHeart(true);
      }
  }, [sub]);

  const handelnext = () => {
    navigate(`/Event/${Number(id) + 1}`);
  };
  const handelprev = () => {
    navigate(`/Event/${Number(id) - 1}`);
  };

  // keyhandler
  useEffect(() => {
    const keyDownHandler = (event) => {
      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          handelnext();
          // else
          break;
        case "ArrowLeft":
          event.preventDefault();
          handelprev();
          break;
        default:
          return null;
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  const Subcribe = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8008/api/subscribed?userId=${userID}&eventId=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const oldSub = sub;
      const newSub = {
        subscribedId: null,
        userId: userID,
        eventId: id,
        event: null,
        user: null,
      };
      setSub(oldSub.push(newSub));
      localStorage.setItem("user-sub", JSON.stringify(sub));
      setSub(JSON.parse(localStorage.getItem("user-sub")));
      setHeart(true);
    } catch (error) {
      console.log("Error: " + error.message);
      setHeart(false);
    }
  };

  const unSubcribe = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8008/api/subscribed?userId=${userID}&eventId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const oldSub = sub;
      const deleteObj = oldSub.find((obj) => obj.eventId === id);
      if (deleteObj) {
        const index = oldSub.indexOf(deleteObj);
        oldSub.splice(index, 1);
        setSub(oldSub);
      }
      localStorage.setItem("user-sub", JSON.stringify(sub));
      setSub(JSON.parse(localStorage.getItem("user-sub")));
      setHeart(false);
    } catch (error) {
      console.log("Error: " + error.message);
      setHeart(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ bounce: 0 }}
      className="-mt-16 w-full h-screen"
      ref={imgWrapRef}
    >
      <div className="relative w-full h-full">
        <img
          // crossOrigin="anonymous"
          src={event.imageUrl}
          alt=""
          className="w-full h-full object-cover"
          // onLoad={(e) => getColor(e)}
        ></img>
      </div>
      <div className=" absolute bottom-0 bg-gradient-to-t from-black to-black/0 w-full h-2/3 text-white ">
        <div className="relative flex flex-col justify-end w-[90%] h-full mx-auto 2xl:w-[70rem] ">
          <div className=" text-[1.7rem] font-semibold sm:text-20">
            {event.eventName}
          </div>
          <div className="flex flex-col gap-4 py-4 w-full">
            <div className="text-justify">{event.eventDescription}</div>
            <div className="flex justify-between">
              <div className="detail flex flex-col gap-x-2 sm:flex-row ">
                <div className="time">{event.dateStart?.slice(0, -9)}</div>
                <div className="palce">{event.takePlace}</div>
              </div>
              <div
                className={`heart flex-grow  text-20 sm:animate-bounce text-right ${
                  heart ? "text-red-500 animate-none" : ""
                }`}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-heart"
                  className="cursor-pointer"
                  onClick={heart ? () => unSubcribe() : () => Subcribe()}
                />
              </div>
            </div>
          </div>
          <div className="narrow flex absolute left-0 top-[20%] -translate-y-[20%] h-max w-full max-w-[70rem] text-20 justify-between">
            <div className="cursor-pointer" onClick={handelprev}>
              <FontAwesomeIcon
                icon="fa-solid fa-angle-up"
                className="ml-1 mr-2  text-sea-blue -rotate-90 "
              />
            </div>
            <div className="cursor-pointer" onClick={handelnext}>
              <FontAwesomeIcon
                icon="fa-solid fa-angle-up"
                className="ml-1 mr-2  text-sea-blue rotate-90 "
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Event;
