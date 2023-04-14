import React from "react";
import "./main.scss";
import Trending from "./Trending/Trending";
import Events from "./Events/Events";

const main = (props) => {
  return (
    <div className="main">
      <div className="space">Introduction here</div>
      <div className="container">
        <Trending />
        <Events />
      </div>
    </div>
  );
};

export default main;
