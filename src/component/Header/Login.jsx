import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { Signup } from "./Signup";

const Login = ({ setUser, setRegister }) => {
  // decoration
  const [signup, setSignup] = useState(true);
  const close = () => {
    setRegister(false);
  };
  const loginRef = useRef();
  const close2 = (e) => {
    if (loginRef.current === e.target) {
      setRegister(false);
    }
  };
  // keyhandler
  useEffect(() => {
    const keyDownHandler = (event) => {
      // console.log("User pressed: ", event.key);
      switch (event.key) {
        case "Escape":
          event.preventDefault();
          setRegister(false);
          break;
        default:
          return null;
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });
  //API login 
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [emailError, setEmailError] = useState(false);

  async function GetUserInfo(id, token) {
    try {
      const response = await axios.get(
        `http://localhost:8008/api/subscribed/subid/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      localStorage.setItem("user-sub", JSON.stringify(response.data));
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:8008/api/token",
          JSON.stringify({ email: values.email, password: values.password }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        localStorage.setItem("user-info", JSON.stringify(response.data));
        setUser(true);

        await GetUserInfo(response.data.user.user_ID, response.data.token);

        close();
        //---
        if (location.pathname != "/") {
          navigate(0);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setEmailError(true);
        }else {
          console.log("Error: " + error.message);
        }
      } finally{
        setLoading(false);
      }
    },
  });

  return (
    <div>
      <div className="login-wrapper" ref={loginRef} onClick={close2}>
        <div className="close" onClick={close}>
          <FontAwesomeIcon icon="fas fa-times" />
        </div>
        {/* signup */}
        {signup && <Signup setSignup={setSignup} setUser={setUser} />}
        {/* login */}
        {!signup && (
          <div className="login">
            <p>Log in</p>

            <form method="post" onSubmit={formik.handleSubmit}>
              <label
                htmlFor="email"
                className={
                  formik.touched.email && formik.errors.email
                    ? "text-red-500"
                    : ""
                }
              >
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : "Email"}
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="username"
                value={formik.values.email}
                onChange={formik.handleChange}
              ></input>
              <label
                htmlFor="password"
                className={
                  formik.touched.password && formik.errors.password
                    ? "text-red-500"
                    : ""
                }
              >
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : "Password"}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              ></input>
              <div className=" ml-[1.2rem] mt-2 text-07 text-red-500 " >{emailError? 'Email or password not correct' : ''}</div>
              <div className="forgot-pw">Forgot password</div>
              <div className="row">
                <div className="signin">
                  New here? 
                  <span onClick={(e) => setSignup((prev) => !prev)}>
                    Sign up
                  </span>
                </div>
                <button className="login-btn" type="submit">
                  Log in
                </button>
              </div> 
            </form>
            <div className="orther-login">
              <p>or log in with</p>
              <div className="options">
                <div className="option">
                  <FontAwesomeIcon icon="fab fa-google" />{" "}
                </div>
                <div className="option">
                  <FontAwesomeIcon icon="fab fa-facebook-f" />{" "}
                </div>
                <div className="option">
                  <FontAwesomeIcon icon="fab fa-twitter" />{" "}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
