import React from "react";
import Avatar from"../../images/profile.jpg"
import {Toaster} from 'react-hot-toast';
import {usernameValidate} from '../helper/validate';
import {passwordvalidate} from '../helper/validate';


export default function recovery() {

    return (
        <div className="container">
            <Toaster position="top-center" reverseOrder={false}/>
            <h1 className="centeralize heading">Recovery</h1>
            <p className="centeralize">Enter 6 digit OTP to recover password</p>
            <form action="#" method="post">
                <div className="centeralize">
                    <input type="text" id="OTP" name="OTP" placeholder="OTP"/>
                </div>
                <div className="centeralize">
                    <button type="submit" className="button">Recover</button>
                </div>
            </form>
            <div className="register-link">Can't get OTP : 
                <a href="/recovery">Resent</a>
            </div>
        </div>
    );
}

