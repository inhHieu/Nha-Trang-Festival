import React, { useRef } from "react";
import { motion } from "framer-motion";
import "./New.scss";
import bg from "../asses/hero.jpg";
// import bg1 from "../asses/fes1.jpg";
function New() {
  const imgWrapRef = useRef();
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

  const getColor = (e) => {
    const rgb = getAverageRGB(e.target);
    imgWrapRef.current.style.boxShadow =
      "rgba(" +
      rgb.r +
      "," +
      rgb.g +
      "," +
      rgb.b +
      ",0.75) 0px -5rem 10rem 10rem";
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
      initial={{ y: 100 }}
      animate={{ y: 0, transition:{type: "spring", bounce: 0} }}
      transition={{ type: "spring", bounce: 0 }}
      // exit={{ y: -100, transition:{type: "spring", bounce: 0} }}
      // initial={{opacity: 0}}
      // animate={{opacity: 1,transition:{delay:.5}}}
      // exit={{ opacity:0 ,transition:{duration:.5}}}
      

      className="News"
    >
      <div className="title-img" ref={imgWrapRef}>
         <img src={bg} alt="" onLoad={(e) => getColor(e)} ></img>
      </div>
      <div className="container">
        <div className="title">Api new title</div>
        <div className="contents">There is something interesting here...</div>
      </div>
    </motion.div>
  );
}

export default New;
