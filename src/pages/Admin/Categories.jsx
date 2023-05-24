import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";

import CategoryCard from "../../component/CategoryCard";
import NewRow from "../../component/Admin/NewRow.jsx";

function Categories() {
  const [active, setActive] = useState(true);

  const [categories, setCategories] = useState([]);
  const [loadings, setLoadings] = useState(false);
  const [token, setToken] = useState();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("token"));
    setToken(data);
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8008/api/admin/admincategories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCategories(response.data);
      setLoadings(true);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };
  //APIs call
  useEffect(() => {
    if (token) getCategories();
  }, [token]);

  return (
    <div className="A-News h-screen">
      <div className="head flex justify-between">
        <p className="title">Categories</p>
        <div className="options flex items-center  h-12 mt-5 mr-5 ">
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
      <main className="w-full h-5/6 overflow-auto overflow-x-hidden ">
        <ul className="list-none flex flex-wrap gap-2 justify-center w-full">
          {active ? (
            categories.map((item, i) => (
              <Link key={i} to={`/Admin/Categories/${item.category_Id}`}>
                <CategoryCard
                  name={item.categoryName}
                  date={""}
                  img={item.image}
                  category={""}
                />
              </Link>
            ))
          ) : (
            <>
              <li className="flex w-11/12 px-2 py-2 text-08 text-center bg-light-blue">
                <p className="name w-2/12 text-left">Name</p>
                <p className="description w-4/12">Summary</p>
                <p className="description w-2/12">Event</p> 
                <p className="date w-2/12">News</p>
                <p className="view w-2/12 text-right">Sub</p>
              </li>
              {categories.slice(1).map((item, i) => (
                <li className="flex w-11/12 px-2 py-4 border-b hover:bg-light-gray ">
                  <Link className="flex w-full text-center" to={`/Admin/Categories/${item.category_Id}`} key={i} >
                    <div className="name w-2/12 pr-4 text-left">{item.categoryName}</div>
                    <div className="name w-4/12 pr-4 text-left">{item.categoryDescription}</div>
                    <div className="text-center w-2/12">{item.totalEvents}</div>
                    <div className="date w-2/12">{item.totalNews}</div>
                    <div className="subcribed w-2/12 text-right">
                      {item.totalSubscribers}
                    </div>
                  </Link>
                </li>
              ))}
            </>
          )}
        </ul>
      </main>
      <div className="add group absolute text-[2rem] leading-[3rem] w-12 h-12 text-center rounded-full bottom-6 right-4 text-white cursor-pointer grid place-items-center   bg-hard-blue">
        <Link to={`/Admin/Categories/Add`}>
          <FontAwesomeIcon
            icon="fa-solid fa-plus"
            className="group-hover:rotate-180 duration-300 "
          />
        </Link>
      </div>
    </div>
  );
}

export default Categories;
