import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../component/SideBar";
function Admin() {
  return (
    <div>
      <SideBar />
      <Outlet />
    </div>
  );
}

export default Admin;
