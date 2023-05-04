import React from "react";
import News from "../../component/Admin/Index/News";
import Users from "../../component/Admin/Index/Users";
import Events from "../../component/Admin/Index/Events";
import Categories from "../../component/Admin/Index/Categories";
function Index() {
  return (
    <div className="index h-screen">
      <p className="title">Overview</p>
      <main className="w-full h-5/6 ">
        <Events />
        <Users />
        <News />
        <Categories />
      </main>
    </div>
  );
}

export default Index;
