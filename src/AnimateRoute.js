import React  from "react";
import Home from "./Home/Home";
import News from "./Detail/New";
import User from "./Detail/User";
import Category from "./Detail/Category";
import Event from "./Detail/Event";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// const Home = lazy(() => import("./Home/Home"));
// const News = lazy(() => import("./Detail/New"));
// const User = lazy(() => import("./Detail/User"));

function AnimateRoute() {
  const location = useLocation();
  // const [isPending, startTransition] = useTransition();
  return (
    <AnimatePresence mode="wait">
      {/* <Suspense> */}
        <Routes location={location} key={location.pathname}>
          {/* <Route path="/" element={<Home to="/Home" />} /> */}
          <Route key="home" path="/Home" index element={<Home />} />
          <Route key="news" path="/News" element={<News />} />
          <Route key="categories" path="/Categories" element={<Category />} />
          <Route key="event" path="/Events/Event" element={<Event />} />
          <Route key="user" path="/User" element={<User />} />
        </Routes>
      {/* </Suspense> */}
    </AnimatePresence>
  );
}

export default AnimateRoute;
