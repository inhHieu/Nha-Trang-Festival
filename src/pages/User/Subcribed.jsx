import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import EventCard from "../../component/EventCard";
import CardLoader from "../../component/CardLoader";

function Subcribed({ id, token }) {
  const [subs, setSubs] = useState([]);
  const [loadings, setLoadings] = useState(false);
  const getSubs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8008/api/subscribed/${id}?offset=0&limit=6`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSubs(response.data);
      setLoadings(false);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };
  //APIs call
  useEffect(() => {
    getSubs();
    // console.log(id,token)
  }, [id, token]);
  // console.log(sub[0].event.eventName)
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
    <motion.div
      className="Subcribed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ol className="list-none">
        {!loadings &&
        subs.map((sub, i) => (
          <EventCard
            name={sub.event.eventName}
            date={sub.event.dateStart}
            category={sub.event.category.categoryName}
            img={sub.event.imageUrl}
            i={i}
          />
        ))}
        {/*  */}
      </ol>
    </motion.div>
  );
}

export default Subcribed;
