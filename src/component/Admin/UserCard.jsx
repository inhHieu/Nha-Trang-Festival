import React from "react";
import bg from "../../asses/art.jpg";

function UserCard() {
  return (
    <li className="group">
      <article className="article rounded-lg overflow-clip relative h-71 w-48 cursor-pointer bg-slate-300	">
        <div className="img-wrap  w-full  h-full overflow-clip	">
          <img
            className="group-hover:scale-100 w-full  h-full  object-cover  scale-105	duration-300  "
            src={bg}
            alt=""
          ></img>
        </div>
        <div className="into absolute bottom-0 px-4 pt-1 w-full h-1/3   flex-col flex justify-center duration-300 group-hover:h-1/2 text-white bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10">
          <div className="region text-sea-blue text-05 uppercase tracking-wider	">
            VN
          </div>
          <div className="name pt-1 font-bold">Shaun McLain</div>
          <div className="flex w-full justify-between py-1 text-08">
            <div className="age  ">19</div>
            <div className="sub">Sub:10</div>
          </div>
          <div className=" flex -mb-8 justify-around duration-300  group-hover:opacity-100 group-hover:mb-0">
            <span>Food</span>
            <span>Sport</span>
          </div>
        </div>
      </article>
    </li>
  );
}

export default UserCard;
