import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {API_BASE_URL} from "../../../Api/BaseUrl"
import ViewAll from "../../../component/ViewAll";
import "../../../style/pages/Home/main/Events.scss";
import axios from "axios";

function Events() {
  const [events, setEvents] = useState([]);
  const [loadings, setLoadings] = useState(true);
  const [categories, setCategories] = useState([]);

  const getEvents = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/events?offset=0&limit=3`
      );
      setEvents(response.data);
      console.log("got data");
      setLoadings(false);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/categories?offset=0&limit=10000`
      );
      setCategories(response.data);
      setLoadings(false);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  //APIs call
  useEffect(() => {
    getEvents();
    getCategories();
  }, []);

  if (loadings) {
    return (
      <div className="Events">
        <ol className="animate-pulse">
          <div className="card w-96 h-[490px] rounded-2xl bg-def-gray "></div>
          <div className="card w-80 h-96 rounded-2xl bg-def-gray "></div>
          <div className="card w-80 h-96 rounded-2xl bg-def-gray "></div>
        </ol>
      </div>
    );
  }

  return (
    <div className="Events flex flex-col">
      <div className="flex justify-between">
        <p>Events</p>
        <ViewAll link={"/Categories/1?event=true"}>View all</ViewAll>
      </div>
      <ol>
        {!loadings &&
          events.map((event, index) => {
            let categoryName;
            for (let i = 0; i < categories.length; i++) {
              if (event.categoryId == categories[i].category_Id) {
                categoryName = categories[i].categoryName;
                break;
              }
            }
            return (
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
                      <div className="tag text-07 text-sea-blue">{categoryName}</div>
                      <div className="title">{event.eventName}</div>
                    </div>
                  </div>
                </motion.li>
              </Link>
            );
          })}
      </ol>
    </div>
  );
}

export default Events;
