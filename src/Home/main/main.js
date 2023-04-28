import React from "react";
import "./main.scss";
import Introduction from "./Introduction/Introduction";
import Trending from "./Trending/Trending";
import Events from "./Events/Events";

const main = (props) => {
  return (
    <div className="main">
        <Introduction />
      <div className="container">
        <Trending />
        <Events />
      </div>
    </div>
  );
};

export default main;
