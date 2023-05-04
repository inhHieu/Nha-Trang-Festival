import React from "react";
import Header from "../../../src/component/Header/Header";
import Footer from "../../../src/component/Footer";
import { Outlet } from "react-router-dom";
function Public() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Public;
