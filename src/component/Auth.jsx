import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router";

function Auth() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      const data = JSON.parse(localStorage.getItem("user-info"));
      const decodeToken = jwt_decode(data.token);
      if (decodeToken.exp < Date.now() / 1000) {
        // change this
        localStorage.removeItem("user-info");
        setAuth(false);
      } else setAuth(true);
    } 
  });
  return auth;
}

export default Auth;
