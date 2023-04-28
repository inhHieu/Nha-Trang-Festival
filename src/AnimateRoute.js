import React from "react";
import Home from "./Home/Home";
import News from "./Detail/New";
import User from "./Detail/User";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
function AnimateRoute() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        {/* <Route path="/" element={<Home to="/Home" />} /> */}
        <Route key="home" path="/Home" element={<Home />} />
        <Route key="news" path="/News" element={<News />} />
        <Route key="user" path="/User" element={<User />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimateRoute;
