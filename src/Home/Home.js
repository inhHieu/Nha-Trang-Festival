import React from "react"
import Countdown from "./Countdown/Countdown";
import Hero from "./Hero/Hero";
import Main from "./main/main";

const Home = (props) => {
  return (
    <div>
      <Hero/>
      <Countdown/>
      <Main/>
    </div>
  )
};

export default Home;
