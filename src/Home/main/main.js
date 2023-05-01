import React from "react";
import "./main.scss";
import Introduction from "./Introduction/Introduction";
import Trending from "./Trending/Trending";
import Categories from "./Categories/Categories";
import Events from "./Events/Events.js";

const main = (props) => {
  return (
    <div className="main" style={{overflow:'clip'}}>
        <Introduction />
      <div className="container">
        <Trending />
        <Categories />
      </div>
        <Events />
    </div>
  );
};

export default main;
