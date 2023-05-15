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
    console.log("Subcribe");
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
    console.log("UnSubcribe");
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
      console.log(response.data);
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

  // const getColor = (e) => {
  //   const rgba  = getAverageRGB(e.target)

  //   imgWrapRef.current.style.background =
  //     "linear-gradient(180deg, rgba(" +
  //     rgba.r +
  //     "," +
  //     rgba.g +
  //     "," +
  //     rgba.b +
  //     " ,1) 0%, rgba(255,255,255,0) 80%, rgba(255,255,255,0) 100%)";
  // };

  // function getAverageRGB(imgEl) {
  //   var blockSize = 5, // only visit every 5 pixels
  //     defaultRGB = { r: 100, g: 100, b: 100 }, // for non-supporting envs
  //     canvas = document.createElement("canvas"),
  //     context = canvas.getContext && canvas.getContext("2d"),
  //     data,
  //     width,
  //     height,
  //     i = -4,
  //     length,
  //     rgb = { r: 100, g: 100, b: 100 },
  //     count = 0;

  //   if (!context) {
  //     return defaultRGB;
  //   }

  //   height = canvas.height =
  //     imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
  //   width = canvas.width =
  //     imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

  //   context.drawImage(imgEl, 0, 0);

  //   try {
  //     data = context.getImageData(0, 0, width, height);
  //   } catch (e) {
  //     /* security error, img on diff domain */
  //     alert("x");
  //     return defaultRGB;
  //   }

  //   length = data.data.length;

  //   while ((i += blockSize * 4) < length) {
  //     ++count;
  //     rgb.r += data.data[i];
  //     rgb.g += data.data[i + 1];
  //     rgb.b += data.data[i + 2];
  //   }

  //   // ~~ used to floor values
  //   rgb.r = ~~(rgb.r / count);
  //   rgb.g = ~~(rgb.g / count);
  //   rgb.b = ~~(rgb.b / count);
  //   return rgb;
  // }

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
          crossOrigin="anonymous"
          src={event.imageUrl}
          alt=""
          className="w-full h-full object-cover"
          // onLoad={(e) => getColor(e)}
        ></img>
      </div>
      <div className=" absolute bottom-0 bg-gradient-to-t from-black to-black/0 w-full h-2/3 text-white ">
        <div className="relative flex flex-col justify-end  w-70rem h-full mx-auto ">
          <div className="text-20">{event.eventName}</div>
          <div className="flex gap-8">
            <div className="pb-12 min-w-[80%]">{event.eventDescription}</div>
            <div
              className={`heart flex-shrink-0 w-8 h-8  text-20 animate-bounce ${
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
          <div className="narrow flex absolute top-[20%] -translate-y-[20%] h-max w-full text-20 justify-between">
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
