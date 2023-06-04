import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

import {API_BASE_URL} from "../../Api/BaseUrl"
import EventCard from "../../component/EventCard";
import CardLoader from "../../component/CardLoader";

function Subcribed({ id, token }) {
  const [subs, setSubs] = useState([]);
  const [loadings, setLoadings] = useState(false);
  const getSubs = async (id, offset) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/subscribed/${id}?offset=${offset}&limit=6`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const newSub = response.data;
      setSubs(subs.concat(newSub));
      setLoadings(false);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };
  //APIs call
  useEffect(() => {
    getSubs(id, 0);
  }, [id, token]);
  const handleLoadMore = () => {
    getSubs(id, subs.length);
    console.log(subs);
  };
  if (loadings) {
    return (
      <div className="Subcribed">
        <ol>
          <CardLoader />
          <CardLoader />
          <CardLoader />
        </ol>
      </div>
    );
  }
  return (
    <>
      <motion.div
        className="Subcribed flex flex-wrap justify-around"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ol className="list-none">
          {!loadings &&
            (subs.length !== 0 ? (
              subs.map((sub, i) => (
                <Link key={i} to={`/Event/${sub.event.eventId}`}>
                  <EventCard
                    name={sub.event.eventName}
                    date={sub.event.dateStart}
                    category={sub.event.category.categoryName}
                    img={sub.event.imageUrl}
                    i={i}
                  />
                </Link>
              ))
            ) : (
              <div className="text-center">
                You have not subscribed any events.
                <br /> Let's subscribe some{" "}
                <Link to={"/Categories/1?event=true"} className="text-sea-blue font-semibold text-[1.2rem] "> awesome events!</Link>
              </div>
            ))}
        </ol>
        {subs.length !== 0 && (
          <button
            className="bg-light-blue mt-8 py-1 px-4 rounded-md duration-300 hover:bg-sea-blue hover:text-white"
            onClick={handleLoadMore}
          >
            Load more
          </button>
        )}
      </motion.div>
    </>
  );
}

export default Subcribed;
