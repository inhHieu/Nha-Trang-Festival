import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Login from "./Login";

export const Signup = ({ setUser, setSignup }) => {
  const passwordRegExp =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);

  function triggerEscapeKeyPress() {
    var event = new KeyboardEvent("keydown", {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      which: 27,
      charCode: 27,
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    document.dispatchEvent(event);
  }

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
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8008/api/token",
        JSON.stringify({ email, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("user-info", JSON.stringify(response.data));
      setUser(true);
      await GetUserInfo(response.data.user.user_ID, response.data.token);

      triggerEscapeKeyPress();
      //---
      if (location.pathname != "/") {
        navigate(0);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setEmailError(true);
      } else {
        console.log("Error: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    //validations
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must have at least 8 characters")
        .max(16, "Password cannot have more than 16 characters")
        .matches(
          passwordRegExp,
          "Password must contain Number, Uppercase adn Special characters"
        ),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), null], "Password must match "),
    }),
    onSubmit: async (values) => {
      setEmailError(false);
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:8008/api/users",
          JSON.stringify({
            email: values.email,
            password: values.password,
            age: "2023-05-22T00:00:00",
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        login(values.email, values.password);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setEmailError(true);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="signup">
      {loading ? <p>loading</p> : ""}
      <p>Sign Up</p>
      <form method="post" onSubmit={formik.handleSubmit}>
        <label
          htmlFor="email"
          className={
            (formik.touched.email && formik.errors.email
              ? "text-red-500"
              : "") + (emailError ? "text-red-500" : "")
          }
        >
          {formik.touched.email && formik.errors.email
            ? formik.errors.email
            : emailError
            ? "Email already used"
            : "Email Address"}
        </label>
        <input
          type="text"
          className="username"
          id="email"
          name="email"
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
          className="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        ></input>
        <label
          htmlFor="confirmPassword"
          className={
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? "text-red-500"
              : ""
          }
        >
          {formik.touched.confirmPassword && formik.errors.confirmPassword
            ? formik.errors.confirmPassword
            : "Confirm Password"}
        </label>
        <input
          type="password"
          className="confirmPassword"
          id="confirmPassword"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
        ></input>
        <div className="row">
          <div className="signed">
            Already have an account?{" "}
            <span onClick={(e) => setSignup((prev) => !prev)}>Log in</span>
          </div>
          <button className="login-btn" type="submit">
            Sign up
          </button>
        </div>
      </form>
      <div className="orther-login">
        <p>or sign up with</p>
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
  );
};
