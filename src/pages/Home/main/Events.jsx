import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import ViewAll from "../../../component/ViewAll";
import "../../../style/pages/Home/main/Events.scss";
import bg from "../../../asses/beach1.jpg";
import axios from "axios";

function Events() {
  const [events, setEvents] = useState([]);
  const [loadings, setLoadings] = useState(false);

  const getEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8008/api/events?offset=0&limit=3");
      setEvents(response.data);
      console.log("got data");
      setLoadings(true);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  //APIs call
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="Events">
      <div className="flex justify-between">
        <p>Events</p>
        <ViewAll link={"/Categories/1?event=true"}>View all</ViewAll>
      </div>
      <ol>
        {loadings &&
          events.map((event, index) => (
            <Link
              className="Link"
              to={`/Event/${event.eventId}`}
              key={event.eventId}
            >
              <motion.li
                initial={{ y: 200, opacity: 0 }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    bounce: 0,
                    delay: 0.3 + index * 0.1,
                  },
                }}
                viewport={{ once: true }}
              >
                <div className="event-card">
                  <div className="img-wrap">
                    <img src={event.imageUrl} alt="" />
                  </div>
                  <div className="info">
                    <div className="tag"> Art</div>
                    <div className="title">{event.eventName}</div>
                  </div>
                </div>
              </motion.li>
            </Link>
          ))}
      </ol>
    </div>
  );
}

export default Events;
