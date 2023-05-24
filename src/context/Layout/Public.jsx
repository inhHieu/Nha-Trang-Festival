import React from "react";
import Header from "../../../src/component/Header/Header";
import Footer from "../../../src/component/Footer";
import Auth from "../../component/Auth.jsx";
import { Outlet } from "react-router-dom";
function Public() {
  return (
    <div>
      <Auth />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Public;
