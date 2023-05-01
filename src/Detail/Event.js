import React, { useState,useEffect,useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "./New.scss";
import bg from "../asses/beach1.jpg";

function Event(props) {
  const imgWrapRef = useRef();
  const location = useLocation()

  const [event, setEvent] = useState([]);
  const [loadings, setLoadings] = useState(false);

  const getEvent = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8008/api/events/${location.state.eventID}`
      );
      setEvent(response.data);
      console.log("got data");
      console.log(event);
      setLoadings(true);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  //APIs call
  useEffect(() => {
    getEvent();
  }, []);






  const getColor = (e) => {
    const rgba  = getAverageRGB(e.target)

    imgWrapRef.current.style.background =
      "linear-gradient(180deg, rgba(" +
      rgba.r +
      "," +
      rgba.g +
      "," +
      rgba.b +
      " ,1) 0%, rgba(255,255,255,0) 80%, rgba(255,255,255,0) 100%)";
  };

  function getAverageRGB(imgEl) {
    var blockSize = 5, // only visit every 5 pixels
      defaultRGB = { r: 100, g: 100, b: 100 }, // for non-supporting envs
      canvas = document.createElement("canvas"),
      context = canvas.getContext && canvas.getContext("2d"),
      data,
      width,
      height,
      i = -4,
      length,
      rgb = { r: 100, g: 100, b: 100 },
      count = 0;

    if (!context) {
      return defaultRGB;
    }

    height = canvas.height =
      imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width =
      imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
      data = context.getImageData(0, 0, width, height);
    } catch (e) {
      /* security error, img on diff domain */
      alert("x");
      return defaultRGB;
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i + 1];
      rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);
    return rgb;
  }

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      viewport={{ once: true }}
      whileInView={{
        y: 0,
        opacity: 1,
        transition: { type: "spring", bounce: 0, delay: 0.2 },
      }}
      transition={{ type: "spring", bounce: 0 }}
      className="Event"
      ref={imgWrapRef}
    >
      <div className="title-img">
        <img
          crossOrigin="anonymous"
          src={bg}
          alt=""
          onLoad={(e) => getColor(e)}
        ></img>
      </div>
      <div className="container">
        <div className="title">{event.eventName}</div>
        <div className="contents">{event.eventDescription}</div>
      </div>
    </motion.div>
  );
}

export default Event;
