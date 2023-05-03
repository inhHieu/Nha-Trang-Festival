import React from "react";

function Dropdown({ list, name, onSelect }) {
  const handleSelect = (event) => {
    onSelect(event.target.value);
  };
  return (
    <select
      className="h-full outline-none text-center bg-transparent"
      //   defaultValue={name}
      onChange={handleSelect}
    >
      {list &&
        list.map((item, i) => (
          <option
            key={i}
            value={item.categoryName}
            selected={name === item.categoryName ? "selected" : ""}
          >
            {item.categoryName}
          </option>
        ))}
      {/* <option value="fruit"></option>

      <option value="vegetable">Vegetable</option>

      <option value="meat">Meat</option> */}
    </select>
  );
}

export default Dropdown;
