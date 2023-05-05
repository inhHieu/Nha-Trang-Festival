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
        <div className="item head sticky top-0 bg-def-gray">
          <div className="name w-3/12">Name</div>
          <div className="subcription w-6/12">
            Description
          </div>
          <div className="date w-2/12">Date</div>
          <div className="subcribed w-1/12">Sub</div>
        </div>
        {loadings &&
          events.map((event,i) => (
            <Link to={`/Event/${event.event_ID}`} key={i} className="item">
              <div className="name w-3/12">{event.eventName}</div>
              <div className="subcription w-6/12">
                10 min drone light show at the begining 10 min drone light show
                at the begining
              </div>
              <div className="date w-2/12">3 - 6/2023</div>
              <div className="subcribed w-1/12">99999</div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Events;
