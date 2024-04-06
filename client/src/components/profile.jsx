import React, { useState } from "react";
import Avatar from "../../images/profile.jpg";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { validateprofile } from "../helper/validate";
import Convert from "../helper/convert";
import useFetch from "../hooks/fetch.hook.js";
import useStore from "../store/store.js";
import { updateuser } from "../helper/helper.js";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [file, setFile] = useState();

  const [{ isLoading, apiData, status, serverError }] = useFetch();

  const formik = useFormik({
    initialValues: {
      firstname: apiData?.firstname || "",
      lastname: apiData?.lastname || "",
      mobile: apiData?.mobile || "",
      email: apiData?.email || "",
      address: apiData?.address || "",
    },
    enableReinitialize: true, // it is required to reinitialize just put it ;
    validate: validateprofile,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      values.profile = file || apiData?.profile || "";
      console.log(values);
      let updatePromise = updateuser(values);
      toast.promise(updatePromise, {
        loading: "Updating...",
        success: <b>Updated Successfully...</b>,
        error: <b>Can't Updated</b>,
      });
    },
  });

  //formik not supprot file upload so we use handler
  const onupload = async (value) => {
    const base64 = await Convert(value.target.files[0]);
    setFile(base64);
  };

  // logout function
  function logoutfun() {
    localStorage.removeItem("token");

    navigate("/");
  }

  if (isLoading) return <h1>isLoading</h1>;
  if (serverError) return <h1>{serverError.message}</h1>;
  return (
    <div className="container">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="centeralize heading">Profile</h1>
      <label htmlFor="profile">
        <img
          className="image"
          src={file || apiData?.profile || Avatar}
          alt="Placeholder Image"
          style={{ maxWidth: "100%", display: "block", margin: "0 auto 20px" }}
        />
      </label>
      <input type="file" onChange={onupload} id="profile" name="profile" />

      <form action="#" onSubmit={formik.handleSubmit} method="post">
        <div className="flex">
          <input
            className="datafield"
            {...formik.getFieldProps("firstname")}
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Firstname"
          />
          <input
            className="datafield"
            {...formik.getFieldProps("lastname")}
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Lastname"
          />
        </div>
        <div className="flex">
          <input
            className="datafield"
            {...formik.getFieldProps("mobile")}
            type="text"
            id="mobile"
            name="mobile"
            placeholder="Mobile No."
          />
          <input
            className="datafield"
            {...formik.getFieldProps("address")}
            type="text"
            id="address"
            name="address"
            placeholder="Address"
          />
        </div>
        <div className="flex">
          <input
            className="datafield"
            {...formik.getFieldProps("email")}
            type="text"
            id="email"
            name="email"
            placeholder="email"
          />
        </div>
        <div className="centeralize">
          <button type="submit" className="button">
            Update
          </button>
        </div>
      </form>
      <div className="register-link">
        <p>
          Come back later{" "}
          <a href="/" onClick={logoutfun}>
            Log out
          </a>
        </p>
      </div>
    </div>
  );
}
