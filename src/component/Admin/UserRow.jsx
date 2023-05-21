import React from "react";
import { Link } from "react-router-dom";

function UserRow({ item }) {
  return (
    <li className="flex w-11/12 px-2 py-2 hover:bg-light-gray ">
      <Link className="flex w-full" to={`/Admin/Users/${item.user_ID}`}>
        <p className="name w-3/12">{item.firstName + " " + item.lastName}</p>
        <p className="description w-5/12">{item.email}</p>
        <p className="date w-5/12 text-center">{item.address}</p>
        <p className="view w-1/12 text-right"> {item.total_subscriptions}</p>
      </Link>
    </li>
  );
}

export default UserRow;
