import React from "react";
import { Link } from "react-router-dom";

function EventRow({ item }) {
  const formattedDate = new Date(item.dateStart).toLocaleDateString("en-GB");
  return (
    <li className="flex w-11/12 px-2 py-2  hover:bg-light-gray ">
      <Link className="flex" to={`/Admin/Events/${item.eventId}`}>
        <p className="name w-3/12 pr-4 ">{item.eventName}</p>
        <p className="description w-8/12 text-justify ">
          {item.eventDescription}
        </p>
        <p className="date w-2/12 pl-2 text-center">{formattedDate}</p>
        <p className="view w-1/12 text-right">{item.totalSub}</p>
      </Link>
    </li>
  );
}

export default EventRow;
