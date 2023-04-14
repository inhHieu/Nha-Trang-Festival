import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Events.scss";
import pic from "../../asses/fes1.jpg";
function Events() {
  const [isShow, setIsShow] = useState();
  const id = 10;
  // const navigate = useNavigate();

  function navigation() {
    console.log("clicked");
    // navigate("/Detail/New", { state: { id: id } });
  }

  return (
    <div className="Events-wrap">
      {isShow && (
        <>
          <motion.div className="bg-image-wrap">
            <motion.img
              className="bg-image"
              initial={{ scale: 1.2, opacity: 0.4 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{duration: .5}}
              alt=""
              src={pic}
            ></motion.img>
          </motion.div>
          <div className="shadow"></div>
        </>
      )}

      <div className="Events">
        <p onClick={navigation}>EVENTS</p>

        <div className="EventsSection">
          <div className="Event-wrap">
            <div
              className="Event"
              onMouseEnter={() => setIsShow(true)}
            >
              <div className="image-wrap">
                <img className="image" alt="" src={pic}></img>
              </div>
              <div className="EventName">Food Tuorism</div>
            </div>
          </div>
          <div className="Event-wrap">
            <div
              className="Event"
              onMouseEnter={() => setIsShow(true)}
            >
              <div className="image-wrap">
                <img className="image" alt="" src={pic}></img>
              </div>
              <div className="EventName">Food Tuorism</div>
            </div>
          </div>
          <div className="Event-wrap">
            <div
              className="Event"
              onMouseEnter={() => setIsShow(true)}
            >
              <div className="image-wrap">
                <img className="image" alt="" src={pic}></img>
              </div>
              <div className="EventName">Food Tuorism</div>
            </div>
          </div>
          <div className="Event-wrap">
            <div
              className="Event"
              onMouseEnter={() => setIsShow(true)}
            >
              <div className="image-wrap">
                <img className="image" alt="" src={pic}></img>
              </div>
              <div className="EventName">Food Tuorism</div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default Events;
