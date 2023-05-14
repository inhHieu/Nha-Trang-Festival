import React from "react";

function CardLoader() {
  return (
    <li className="list-none ">
      <article
        className="article relative h-71 w-80   
        animate-pulse    "
      >
        <div className="img-wrap  w-full  h-4/6 overflow-clip rounded-md	">
          <img
            className=" w-full bg-def-gray h-full  object-cover  scale-105	duration-300  "
            alt=""
          ></img>
        </div>
        <div className="into px-4 pt-2 flex flex-col gap-2">
          <div className="tag w-8 h-4 rounded-md bg-def-gray"></div>
          <div className="title w-f h-6 rounded-md bg-def-gray"></div>
          <div className="date w-20 h-4 rounded-md bg-def-gray"></div>
        </div>
      </article>
    </li>
  );
}

export default CardLoader;
