import React from "react";

function NewRow({item}) {
  return (
    <li className="flex w-11/12 px-2 py-2  bg-slate-500">
      <p className="name w-3/12">{item.newsTitle}</p>
      <p className="description w-8/12">{item.newsContent}</p>
      <p className="date w-2/12 text-center">{item.postedDate}</p>
      <p className="view w-1/12 text-right">{item.views} </p>
    </li>
  );
}

export default NewRow;
