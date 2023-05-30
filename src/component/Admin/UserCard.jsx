import React from "react";
import { motion } from "framer-motion";
import Age from "../../Hook/Age";
import bg from "../../asses/art.jpg";

function UserCard({ user }) {
  return (
    <motion.li
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { type: "spring", bounce: 0 } }}
      className="group"
    >
      <article className="article rounded-lg overflow-clip relative h-71 w-48 cursor-pointer bg-slate-300	">
        <div className="img-wrap  w-full  h-full overflow-clip	">
          <img
            className="group-hover:scale-100 w-full  h-full  object-cover  scale-105	duration-300  "
            src={user.avatar != "" ? user.avatar : bg}
            alt=""
          ></img>
        </div>
        <div className="into absolute bottom-0 px-4 pt-1 w-full h-1/3   flex-col flex justify-center duration-300 group-hover:h-1/2 text-white bg-black bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
          <div className="region text-sea-blue text-05 uppercase tracking-wider	">
            VN
          </div>
          <div className="name pt-1 font-bold">
            {user.firstName + " " + user.lastName}
          </div>
          <div className="flex w-full justify-between py-1 text-08">
            <div className="age  ">
              <Age date={new Date(user.age)} />
            </div>
            <div className="sub">Sub:{user.total_subscriptions}</div>
          </div>
          <div className=" flex -mb-8 justify-around opacity-0 duration-300  group-hover:opacity-100 group-hover:mb-0">
            <span>{user.top_category_1}</span>
            <span>{user.top_category_2}</span>
            <span>{user.top_category_3}</span>
          </div>
        </div>
      </article>
    </motion.li>
  );
}

export default UserCard;
