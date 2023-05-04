import React from "react";
import Home from "../pages/Home/Home";
import News from "../pages/News/New";
import User from "../pages/User/User";
import Category from "../pages/Categories/Category";
import Event from "../pages/Events/Event";
import Public from "./Layout/Public";

import SideBar from "../component/SideBar";
import Index from "../pages/Admin/Index";

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
        <Route path="/" element={<Public />}>
          <Route key="home" index element={<Home />} />
          <Route key="news" path="News" element={<News />} />
          <Route
            key="categories"
            path="/Categories/:id"
            element={<Category />}
          />
          <Route key="event" path="Event" element={<Event />} />
          <Route key="user" path="User" element={<User />} />
        </Route>
        <Route path="/Admin" element={<SideBar />}>
          <Route key="overview" index element={<Index />} />
        </Route>
      </Routes>
      {/* </Suspense> */}
    </AnimatePresence>
  );
}

export default AnimateRoute;
