import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useScroll, useMotionValueEvent } from "framer-motion";
import axios from "axios";

import {API_BASE_URL} from "../../Api/BaseUrl"
import EventCard from "../../component/EventCard";
import EventRow from "../../component/Admin/EventRow.jsx";
import Dropdown from "../../component/Dropdown";

function Events() {
  const { scrollYProgress } = useScroll();

  const [active, setActive] = useState(true);

  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadings, setLoadings] = useState(true);
  const [token, setToken] = useState();
  const [id, setID] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("token"));
    setToken(data);
  }, []);

  const getEvents = async (id, offset) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/adminevents/category/${id}?offset=${offset}&limit=6`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const newEvents = response.data;
      setEvents(events.concat(newEvents));
      setLoadings(false);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  const getEventsCID = async (id, offset) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/adminevents/category/${id}?offset=${offset}&limit=6`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setEvents(response.data)
      setLoadings(false);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  const getCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      setCategories(response.data);
      setLoadings(true);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };
  //APIs call
  useEffect(() => {
    if (token) getEvents(id, 0);
    getCategories();
  }, [token]);
  const [selected, setSelected] = useState("");
  const handleDropdownSelect = (value) => {
    setSelected(value);
    for (let i = 0; i < categories.length; i++)
      if (categories[i].categoryName === value) {
        // console.log(categories);
        // console.log("handleDropdownSelect:", value);
        // console.log(categories[i].category_Id);
        setID(categories[i].category_Id);
        if (token) getEventsCID(categories[i].category_Id, 0);
      }
  };
  const handleLoadMore = () => {
    getEvents(id, events.length);
  };

  return (
    <div className="A-Events h-screen">
      <div className="head flex justify-between">
        <p className="title">Events</p>
        <div className="options flex items-center  h-12 mt-5 mr-5 ">
          <div className="filter">
            <Dropdown
              list={categories}
              name={category.categoryName}
              value={selected}
              onSelect={handleDropdownSelect}
            />
          </div>
          <div
            className={`option ml-2 px-2 cursor-pointer rounded-tl-md rounded-bl-md duration-300 ${
              !active ? "bg-hard-blue text-white" : "bg-def-gray"
            }`}
            onClick={() => setActive(false)}
          >
            <FontAwesomeIcon icon="fa-solid fa-list" />
          </div>
          <div
            className={`option px-2 cursor-pointer  rounded-tr-md rounded-br-md duration-300 ${
              active ? "bg-hard-blue text-white" : "bg-def-gray"
            }`}
            onClick={() => setActive(true)}
          >
            <FontAwesomeIcon icon="fa-solid fa-table-cells-large" />
          </div>
        </div>
      </div>
      <main
        ref={containerRef}
        className="w-full h-5/6 overflow-auto overflow-x-hidden "
      >
        <ul className="list-none flex flex-wrap gap-2 justify-center w-full">
          {active ? (
            events.map((item, i) => (
              <Link key={i} to={`/Admin/Events/${item.eventId}`}>
                <EventCard
                  name={item.eventName}
                  date={item.dateStart}
                  category={item.categoryId}
                  img={item.imageUrl}
                />
              </Link>
            ))
          ) : (
            <>
              <li className="flex w-11/12 px-2 py-2 text-08 rounded-md bg-light-blue">
                <p className="name w-3/12">Name</p>
                <p className="description w-8/12">Description</p>
                <p className="date w-2/12 text-center">Posted Date</p>
                <p className="view w-1/12 text-right">Views</p>
              </li>
              {events.map((item, i) => (
                <EventRow key={i} item={item} />
              ))}
            </>
          )}
          <button
            className="bg-light-blue mb-8 py-1 px-28 rounded-md duration-300 hover:bg-sea-blue hover:text-white"
            onClick={handleLoadMore}
          >
            Load more
          </button>
        </ul>
      </main>
      <div className="add group absolute text-[2rem] leading-[3rem] w-12 h-12 text-center rounded-full bottom-6 right-4 text-white cursor-pointer grid place-items-center   bg-hard-blue">
        <Link to="/Admin/Events/Add">
          <FontAwesomeIcon
            icon="fa-solid fa-plus"
            className="group-hover:rotate-180 duration-300 "
          />
        </Link>
      </div>
    </div>
  );
}

export default Events;
