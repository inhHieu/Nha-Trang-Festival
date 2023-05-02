import React, { useState,useEffect,useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "./New.scss";
import bg from "../asses/beach1.jpg";

// import ColorThief from "colorthief";

// import bg1 from "../asses/fes1.jpg";
function New(props) {
  const imgWrapRef = useRef();
  const location = useLocation()
  // console.log(location.state.newsID)

  const [news, setNews] = useState([]);
  const [loadings, setLoadings] = useState(false);

  const getNews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8008/api/news/${location.state.newsID}`
      );
      setNews(response.data);
      console.log("got data");
      setLoadings(true);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  //APIs call
  useEffect(() => {
    getNews();
  }, []);




  // useEffect(() => {
  //   rgba.current = getAverageRGB(imgsRef.current);
  //   console.log(imgWrapRef, imgsRef);
  //   console.log(rgba)
  //   imgWrapRef.current.style.boxShadow =
  //     "rgba(" +
  //     rgba.current.r +
  //     "," +
  //     rgba.current.g +
  //     "," +
  //     rgba.current.b +
  //     ",0.75) 0px -5rem 10rem 10rem";
  // },[]);

  // const getColor = (e) => {
  //   const rgba  = getAverageRGB(e.target)
  //   // const colorThief = new ColorThief();
  //   // const img = e.target;
  //   // const result = colorThief.getColor(img, 25);
  //   // console.log(
  //   //   "linear-gradient(0deg, rgba(" +
  //   //     result[0] +
  //   //     "," +
  //   //     result[1] +
  //   //     "," +
  //   //     result[2] +
  //   //     " ,0 )0%, rgba(0, 0, 0, 1) 95%, rgba(0, 0, 0, 1) 100%)"
  //   // );
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
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -100, opacity: 0 }}
    transition= {{ bounce: 0 }} 
      // exit={{ y: -100, transition:{type: "spring", bounce: 0} }}
      // initial={{opacity: 0}}
      // animate={{opacity: 1,transition:{delay:.5}}}
      // exit={{ opacity:0 ,transition:{duration:.5}}}

      // style={{ color: result }}
      className="News"
      ref={imgWrapRef}
    >
      <div className="title-img">
        <img
          crossOrigin="anonymous"
          src={bg}
          alt=""
          // onLoad={(e) => getColor(e)}
        ></img>
      </div>
      <div className="container">
        <div className="title">{news.newsTitle}</div>
        <div className="contents">{news.newsContent}</div>
      </div>
    </motion.div>
  );
}

export default New;
