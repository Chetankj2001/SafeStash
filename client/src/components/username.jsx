import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../../images/profile.jpg";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { usernameValidate } from "../helper/validate";
import useStore from "../store/store.js";

function Username() {
  const navigate = useNavigate();

  const setUsername = useStore((state) => state.setUsername);

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      setUsername(values.username);
      navigate("/password"); //when clicked render this page
    },
  });

  return (
    <div className="container">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="centeralize heading">Hello Again!</h1>
      <img
        className="image"
        src={Avatar}
        alt="Placeholder Image"
        style={{ maxWidth: "100%", display: "block", margin: "0 auto 20px" }}
      />
      <form action="#" onSubmit={formik.handleSubmit} method="post">
        <div className="centeralize">
          <input
            {...formik.getFieldProps("username")}
            type="text"
            id="username"
            name="username"
            placeholder="Username"
          />
        </div>
        <div className="centeralize">
          <button type="submit" className="button">
            Let's Go
          </button>
        </div>
      </form>
      <div className="register-link">
        <p>
          Not a member? <a href="/register">Register Now</a>
        </p>
      </div>
    </div>
  );
}

export default Username;
