import React from "react";

function EventRow({item}) {
  return (
    <li className="flex w-11/12 px-2 py-2 ">
      <p className="name w-3/12">{item.eventName}</p>
      <p className="description w-8/12">{item.eventDescription}</p>
      <p className="date w-2/12 text-center">{item.dateStart}</p>
      <p className="view w-1/12 text-right">999</p>
    </li>
  );
}

export default EventRow;
