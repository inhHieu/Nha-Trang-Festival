import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../component/Admin/SideBar";
import AdminAuth from "../../component/Admin/AdminAuth";
function Admin() {
  return (
    <div>
      <AdminAuth />
      <SideBar />
    </div>
  );
}

export default Admin;
