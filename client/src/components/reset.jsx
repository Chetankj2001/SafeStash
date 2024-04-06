import React from "react";
import Avatar from"../../images/profile.jpg"
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import {resetpasswordvalidate} from '../helper/validate';


export default function reset() {
    const formik = useFormik({
        initialValues: {
            password: "",
            cnfpassword: "",
        },
        validate :resetpasswordvalidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values)=> {
            console.log(values);
        }
    });
    
    return (
        <div className="container">
            <Toaster position="top-center" reverseOrder={false}/>
            <h1 className="centeralize heading">Reset</h1>
            <form action="#" onSubmit={formik.handleSubmit} method="post">
                <div className="centeralize">
                    <input {...formik.getFieldProps('password')} type="text" id="password" name="password" placeholder="New password"/>
                </div>
                <div className="centeralize">
                    <input {...formik.getFieldProps('cnfpassword')} type="text" id="cnfpassword" name="cnfpassword" placeholder="Repeat password"/>
                </div>
                <div className="centeralize">
                    <button type="submit" className="button">Reset</button>
                </div>
            </form>
        </div>
    );
}

