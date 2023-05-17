import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Events({ token }) {
  const [events, setEvents] = useState([]);
  const [loadings, setLoadings] = useState(false);

  const getEvents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8008/api/admin/adminevents?offset=0&limit=4`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setEvents(response.data);
      //   console.log(news.length,news);
      setLoadings(true);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };
  //APIs call
  useEffect(() => {
    if (token) getEvents();
  }, [token]);

  return (
    <div className="box">
      <div className="box-title">
        <p className="name">Events</p>
        <p className="total">{events.length}</p>
      </div>
      <div className="data">
        <div className="item head sticky top-0 bg-def-gray">
          <div className="name w-3/12">Name</div>
          <div className="subcription w-6/12">Description</div>
          <div className="date w-2/12">Date</div>
          <div className="subcribed w-1/12">Sub</div>
        </div>
        {loadings &&
          events.map((event, i) => {
            const formattedDate = new Date(event.dateStart).toLocaleDateString(
              "en-GB"
            );
            return (
              <Link
                to={`/Event/${event.eventId}`}
                key={i}
                className="item border-b"
              >
                <div className="name w-3/12">{event.eventName}</div>
                <div className="subcription w-6/12">{event.summary}</div>
                <div className="date w-2/12">{formattedDate}</div>
                <div className="subcribed w-1/12">{event.totalSub}</div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default Events;
