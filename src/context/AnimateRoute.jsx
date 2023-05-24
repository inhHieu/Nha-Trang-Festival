import React from "react";
import Home from "../pages/Home/Home";
import News from "../pages/News/New";
import User from "../pages/User/User";
import Category from "../pages/Categories/Category";
import Event from "../pages/Events/Event";
import Public from "./Layout/Public";
import Admin from "./Layout/Admin";

import Login from "../pages/Admin/Login";
import Index from "../pages/Admin/Index";
import Trending from "../pages/Admin/News/Trending";
import TrendingDetail from "../pages/Admin/News/TrendingDetail.jsx";
import TrendingAdd from "../pages/Admin/News/TrendingAdd.jsx";
import Latest from "../pages/Admin/News/Latest.jsx";
import Upcoming from "../pages/Admin/News/Upcoming.jsx";
import Events from "../pages/Admin/Events.jsx";
import EventDetail from "../pages/Admin/EventDetail.jsx";
import EventAdd from "../pages/Admin/EventEventAdd.jsx";
import Users from "../pages/Admin/Users.jsx";
import UsersDetail from "../pages/Admin/UsersDetail.jsx";
import UsersAdd from "../pages/Admin/UsersAdd.jsx";
import Categories from "../pages/Admin/Categories";
import CategoriesDetail from "../pages/Admin/CategoriesDetail.jsx";
import CategoriesAdd from "../pages/Admin/CategoriesAdd.jsx";

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
          <Route key="news" path="News/:id" element={<News />} />
          <Route
            key="categories"
            path="/Categories/:id"
            element={<Category />}
          />
          <Route key="event" path="Event/:id" element={<Event />} />
          <Route key="user" path="User" element={<User />} />
        </Route>
        <Route path="/Admin" element={<Admin />}>
          <Route key="overview" index element={<Index />} />
          <Route
            key="news-trend"
            path="/Admin/News/Trending"
            element={<Trending />}
          />
          <Route
            key="news-trend-detail"
            path="/Admin/News/Trending/:id"
            element={<TrendingDetail />}
          />
          <Route
            key="news-trend-Add"
            path="/Admin/News/Trending/Add"
            element={<TrendingAdd />}
          />
          <Route
            key="news-latest"
            path="/Admin/News/Latest"
            element={<Latest />}
          />
          <Route
            key="news-upcoming"
            path="/Admin/News/Upcoming"
            element={<Upcoming />}
          />
          <Route key="events" path="/Admin/Events" element={<Events />} />
          <Route key="eventDetail" path="/Admin/Events/:id" element={<EventDetail />} />
          <Route key="eventAdd" path="/Admin/Events/Add" element={<EventAdd />} />
          <Route key="users" path="/Admin/Users" element={<Users />} />
          <Route key="usersDetail" path="/Admin/Users/:id" element={<UsersDetail />} />
          <Route key="usersAdd" path="/Admin/Users/Add" element={<UsersAdd />} />
          <Route key="Categories" path="/Admin/Categories" element={<Categories />} />
          <Route key="CategoriesDetaill" path="/Admin/Categories/:id" element={<CategoriesDetail />} />
          <Route key="CategoriesAdd" path="/Admin/Categories/add" element={<CategoriesAdd />} />

        </Route>
        <Route path="/Login" element={<Login />} />
      </Routes>
      {/* </Suspense> */}
    </AnimatePresence>
  );
}

export default AnimateRoute;
