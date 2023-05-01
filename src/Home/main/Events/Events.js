import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { delay, motion } from "framer-motion";

import "./Events.scss";
import bg from "../../../asses/beach1.jpg";
import axios from "axios";

function Events() {
  const [events, setEvents] = useState([]);
  const [loadings, setLoadings] = useState(false);

  const getEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8008/api/events");
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
      <p>Events</p>
      <ol>
        {loadings &&
          events.map((event, index) => (
            <motion.li
              initial={{ y: 100 }}
              whileInView={{
                y: 0,
                transition: { type: "spring", bounce: 0, delay: index * .05 },
              }}
              viewport={{once:true}}
            >
              <Link
                className="Link"
                state={{ eventID: event.event_ID }}
                to="/Events/Event"
                key={event.event_ID}
              >
                <div className="event-card">
                  <div className="img-wrap">
                    <img src={bg} alt="" />
                  </div>
                  <div className="info">
                    <div className="tag"> Art</div>
                    <div className="title">{event.eventName}</div>
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
      </ol>
    </div>
  );
}

export default Events;
