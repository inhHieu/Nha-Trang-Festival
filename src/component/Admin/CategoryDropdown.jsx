import { useState, useEffect } from "react";
import axios from "axios";

import Dropdown from "../Dropdown";

import React from "react";

const CategoryDropdown = ({ id, token, onSelect }) => {
  const [categories, setCategories] = useState([]);
  const [loadings, setLoadings] = useState(false);
  const [selected, setSelected] = useState("");

  

  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/admincategories`,
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
  const handleSelect = (event) => {
    onSelect(event.target.value);
  };
  return (
    <select
      className="h-full outline-none text-center bg-transparent"
      onChange={handleSelect}
    >
      {categories &&
        categories.slice(1).map((item, i) => (
          <option
            key={i}
            value={item.category_Id}
            selected={id === item.category_Id ? "selected" : ""}
          >
            {item.categoryName}
          </option>
        ))} 
    </select>
  );
};

export default CategoryDropdown;
