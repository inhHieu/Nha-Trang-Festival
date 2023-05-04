import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Events() {
  const [events, setEvents] = useState([]);
  const [loadings, setLoadings] = useState(false);

  const getEvents = async () => {
    try {
      const response = await axios.get(`http://localhost:8008/api/events`);
      setEvents(response.data);
      //   console.log(news.length,news);
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
    <div className="box">
      <div className="box-title">
        <p className="name">Events</p>
        <p className="total">{events.length}</p>
      </div>
      <div className="data">
        {loadings &&
          events.map((event) => (
            <Link to={`/Event/${event.event_ID}`} className="item">
              <div className="name">{event.eventName}</div>
              <div className="subcription">
                10 min drone light show at the begining 10 min drone light show
                at the begining
              </div>
              <div className="date">3-6-2023</div>
              <div className="subcribed">99999</div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Events;
