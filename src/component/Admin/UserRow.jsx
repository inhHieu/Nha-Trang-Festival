import React from "react";

function UserRow({item}) {
  return (
    <li className="flex w-11/12 px-2 py-2 ">
      <p className="name w-3/12">{item.firstName + " " + item.lastName}</p>
      <p className="description w-8/12">{item.email}</p>
      <p className="date w-2/12 text-center">{item.address}</p>
      <p className="view w-1/12 text-right"> {item.total_subscriptions}</p>
    </li>
  );
}

export default UserRow;
