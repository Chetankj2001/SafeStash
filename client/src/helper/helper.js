import Axios from "axios";
Axios.defaults.baseURL = "http://localhost:3000";

import { jwtDecode } from "jwt-decode";

export function getUsername() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decode = jwtDecode(token);

    return decode.username;
  } catch (e) {
    console.warn(e);
  }

  return null;
}


export async function authenticate(username) {
  try {
    return await Axios.post("/api/authenticate", { username });
  } catch (err) {
    return { error: "Username doesn't exist....!" };
  }
}


export async function getuser({ username }) {
  try {
    const { data } = await Axios.get("/api/user/${username}");
    return { data };
  } catch (err) {
    return { error: "Password doesn't match!" };
  }
}
export async function registeruser(credentials) {
  try {
    const {
      data: { msg },
      status,
    } = await Axios.post("/api/register", credentials);
    let { username, email } = credentials;
    if (status === 201) {
      await Axios.post("api//registermail", {
        username,
        userEmail: email,
        text: msg,
      });
    }
    return Promise.resolve(msg);
  } catch (err) {
    return Promise.reject({ err });
  }
}
export async function verifypassword({ username, password }) {
  try {
    if (username) {
      const { data } = await Axios.post("api/login", { username, password });

      return Promise.resolve({ data });
    }
  } catch (err) {
    return Promise.reject({ error: "Password doesn't Match...!" });
  }
}
export async function updateuser(response) {
  try {
    const token = await localStorage.getItem("token");
    const data = await Axios.put("api/updateuser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject({ err });
  }
}
export async function generateotp(username) {
  try {
    const {
      data: { code },
      status,
    } = await Axios.get("api/generateOTP", username);
    if (status === 201) {
      let {
        data: { email },
      } = await getuser({ username });

      let text = `Your password recovery OTP is ${code}.`;
      await Axios.post("api/registermail", {
        username,
        userEmail: email,
        text,
        subject: "Password recovery OTP",
      });
    }
    return Promise.resolve(code);
  } catch (err) {
    return Promise.reject({ err });
  }
}
export async function verifyOTP({ username, code }) {
  try {
    const { data, status } = await Axios.get("api/verifyOTP", {
      params: { username, code },
    }); //params because we want parameters from query
    return { data, status };
  } catch (err) {
    Promise.reject({ err });
  }
}
export async function resetPassword({ username, password }) {
  try {
    const { data, status } = await Axios.put("api/resetpassword", {
      username,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (err) {
    Promise.reject({ err });
  }
}
