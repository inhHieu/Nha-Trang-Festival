import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

import EventCard from "../../component/EventCard";

function EventSection({ id, categories }) {
  const [events, setEvents] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryID, setCategoryID] = useState();
  const limit = 6;
  const getEvents = async (id, offset, limit) => {
    try {
      const response = await axios.get(
        `http://localhost:8008/api/events/category/${id}?offset=${offset}&limit=${limit}`
      );
      const newEvents = response.data;
      setEvents(events.concat(newEvents));
      setLoading(false);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  }; 
  
  useEffect(() => {
    getEvents(id, 0, limit); 
  }, [id]);

  const handleLoadMore = () => {
    getEvents(id, events.length, limit);
  };

  if (loading) {
    return <p>Loading events...</p>;
  }
  return (
    <>
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-wrap justify-around"
      >
        {events.map((event, i) => {
          let categoryName;
          for (let j = 0; j < categories.length; j++) {
            if (event.categoryId == categories[j].category_Id) {
              categoryName = categories[j].categoryName;
              break;
            }
          }
          return (
            <Link key={i} to={`/Event/${event.eventId}`}>
              <EventCard
                i={i}
                img={event.imageUrl}
                name={event.eventName}
                date={event.dateStart}
                category={categoryName}
              />
            </Link>
          );
        })}
      </motion.ul>
      <button
        className="bg-light-blue mt-8 py-1 px-4 rounded-md duration-300 hover:bg-sea-blue hover:text-white"
        onClick={handleLoadMore}
      >
        Load more
      </button>
    </>
  );
}

export default EventSection;
