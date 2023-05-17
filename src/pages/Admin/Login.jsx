import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import bg from "../../asses/LotusTower.jpg";
function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    //validations
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
        setLoading(false);
        console.log(response.data);
        localStorage.setItem("user-info", JSON.stringify(response.data));
        navigate("/Admin");
      } catch (error) {
        console.log("Error: " + error.message);
      }
    },
  });
  return (
    <div className=" bg-gradient-to-br from-teal-500 to-sky-500 w-screen h-screen grid place-content-center ">
      {loading ? <p>loading</p> : ""}
      <div className=" flex items-center justify-center rounded-lg shadow-2xl overflow-clip">
        <div className=" bg-white-blue w-[25rem] h-80 py-8 px-8 text-08 ">
          <div className=" font-semibold text-[1.2rem] ">
            Nha Trang Festival Beach
          </div>
          {/* <div className=" text-center mt-2">Admin Login</div> */}
          <form
            method="post"
            className=" flex flex-col mt-4 gap-2"
            onSubmit={formik.handleSubmit}
          >
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
              <br />
              <input
                className="bg-white-blue rounded-md border-2 border-gray-400 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none"
                type="text"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </label>
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
              <br />
              <input
                className="bg-white-blue rounded-md border-2 border-gray-400 px-2 py-1 mt-1 focus:border-light-blue focus:ring-light-blue outline-none "
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </label>
            <Link className="text-06 italic text-def-black/90">
              forgot password?
            </Link>
            <button type="submit" className="bg-sea-blue p-2 rounded-md mt-4">
              Login
            </button>
          </form>
        </div>
        <div className="h-80 w-60 overflow-clip rounded-tr-lg rounded-br-lg">
          <img src={bg} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export default Login;
