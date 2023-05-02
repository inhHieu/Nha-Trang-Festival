import React from "react";
import "../../../style/pages/Home/main.scss";
import Introduction from "./Introduction";
import Trending from "./Trending";
import Categories from "./Categories";
import Events from "./Events";

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
