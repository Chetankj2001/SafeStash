import React from "react";
import Avatar from "../../images/profile.jpg";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordvalidate } from "../helper/validate";
import useFetch from "../hooks/fetch.hook.js";
import useStore from "../store/store.js";
import { verifypassword } from "../helper/helper.js";
import { useNavigate } from "react-router-dom";

export default function Password() {
  const navigate = useNavigate();
  const {
    auth: { username },
  } = useStore();

  const [{ isLoading, apiData, status, serverError }] = useFetch(
    `/user/${username}`
  );

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordvalidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      const data = {
        username: username,
        password: values.password,
      };
      const verify = verifypassword(data);

      toast.promise(verify, {
        loading: <b>Checking...</b>,
        success: <b>Login Successfully</b>,
        error: <b>Password Not Match!</b>,
      });

      verify.then((res) => {
        let { token } = res.data;
        // console.log(token);
        localStorage.setItem("token", token);
        navigate("/profile");
      });
    },
  });

  if (isLoading) return <h1>isLoading</h1>;
  if (serverError) return <h1>{serverError.message}</h1>;

  return (
    <div className="container">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="centeralize heading">
        Hello {apiData?.firstname || apiData?.username}
      </h1>
      <img
        className="image"
        src={apiData?.profile || Avatar}
        alt="Placeholder Image"
        style={{ maxWidth: "100%", display: "block", margin: "0 auto 20px" }}
      />
      <form action="#" onSubmit={formik.handleSubmit} method="post">
        <div className="centeralize">
          <input
            {...formik.getFieldProps("password")}
            type="text"
            id="password"
            name="password"
            placeholder="password"
          />
        </div>
        <div className="centeralize">
          <button type="submit" className="button">
            Sign Up
          </button>
        </div>
      </form>
      <div className="register-link">
        <a href="/recovery">Forgot password?</a>
      </div>
    </div>
  );
}
