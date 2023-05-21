import React from "react";
import { Link } from "react-router-dom";

function NewRow({ item }) {
  const formattedDate = new Date(item.postedDate).toLocaleDateString("en-GB");
  return (
    <li className="flex w-11/12 px-2 py-4 border-b hover:bg-light-gray ">
      <Link className="flex" to={`/Admin/News/Trending/${item.newsId}`}>
        <p className="name w-3/12 pr-4 ">{item.newsTitle}</p>
        <p className="description w-8/12 text-justify ">{item.summary}</p>
        <p className="date w-2/12 pl-2 text-center">{formattedDate}</p>
        <p className="view w-1/12 text-right">{item.views} </p>
      </Link>
    </li>
  );
}

export default NewRow;
