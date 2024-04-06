import React, { useState } from "react";
import Avatar from "../../images/profile.jpg";
import toast,{ LoaderIcon, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { validateregister } from "../helper/validate";
import Convert from "../helper/convert";
import {registeruser} from"../helper/helper";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate=useNavigate();
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: validateregister,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      values.profile = file ?? "";
      const register=registeruser(values);
      toast.promise(register,{
        Loading:"Creating...",
        sucess:<b>Register Successfully</b>,
        error:<b>Couldn't Registered</b>
      })
      register.then(()=>{
        navigate("/");
      })
    },
  });

  //formik not supprot file upload so we use handler
  const onupload = async (value) => {
    const base64 = await Convert(value.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="container">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="centeralize heading">Register</h1>
      <label htmlFor="profile">
        <img
          className="image"
          src={file || Avatar}
          alt="sdgdfg Image"
          style={{ maxWidth: "100%", display: "block", margin: "0 auto 20px" }}
        />
      </label>
      <input
        type="file"
        onChange={onupload}
        id="profile"
        name="profile"
        accept="image/png, image/jpeg"
      />

      <form action="#" onSubmit={formik.handleSubmit} method="post">
        <div className="centeralize">
          <input
            {...formik.getFieldProps("email")}
            type="text"
            id="email"
            name="email"
            placeholder="email"
          />
          <input
            {...formik.getFieldProps("username")}
            type="text"
            id="username"
            name="username"
            placeholder="Username"
          />
          <input
            {...formik.getFieldProps("password")}
            type="text"
            id="password"
            name="password"
            placeholder="password"
          />{" "}
        </div>
        <div className="centeralize">
          <button type="submit" className="button">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
