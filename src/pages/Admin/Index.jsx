import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import News from "../../component/Admin/Index/News";
import Users from "../../component/Admin/Index/Users";
import Events from "../../component/Admin/Index/Events";
import Categories from "../../component/Admin/Index/Categories";

function Index() {
  const [userInfo, setUserInfo] = useState();
  const [token, setToken] = useState();
  const [tokenDecode, setTokenDecode] = useState();
  const [role, setRole] = useState();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user-info"));
    setUserInfo(data);
  }, []);
  useEffect(() => {
    if (userInfo != null) {
      setToken(userInfo.token);
      localStorage.setItem("token", JSON.stringify(userInfo.token));
      setTokenDecode(jwt_decode(userInfo.token));
    }
  }, [userInfo]);

  useEffect(() => {
    if (tokenDecode) {
      setRole(
        tokenDecode[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ]
      );
    }
  }, [tokenDecode]);

  if ((role == 1, 2))
    return (
      <div className="index h-screen">
        <p className="title">Overview</p>
        <main className="w-full h-5/6 ">
          <Events token={token} />
          <Users token={token} />
          <News token={token} />
          <Categories token={token} />
        </main>
      </div>
    );
}

export default Index;
