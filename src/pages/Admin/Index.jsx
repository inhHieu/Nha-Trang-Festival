import React from "react";

function Index() {
  return (
    <div className="index h-screen">
      <p className="title">Overview</p>
      <main className="w-full h-5/6 ">
        <div className="box">
          <div className="box-title">
            <p className="name">Events</p>
            <p className="total">60</p>
          </div>
        </div>
        <div className="box">
          <div className="box-title">
            <p className="name">Users</p>
            <p className="total">79</p>
          </div>
        </div>
        <div className="box">
          <div className="box-title">
            <p className="name">News</p>
            <p className="total">131</p>
          </div>
        </div>
        <div className="box">
          <div className="box-title">
            <p className="name">Categories</p>
            <p className="total">5</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Index;
