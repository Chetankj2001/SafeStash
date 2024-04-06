import Users from "../model/username_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config.js";
import { response } from "express";
import OTP from "otp-generator";

const saltround = 10;

export async function register(req, res) {
  try {
    console.log("inside register function");
    const { username, password, profile, email } = req.body;

    const exitusername = new Promise((resolve, reject) => {
      Users.findOne({ username: username })
        .then((user) => {
          if (user) {
            reject(new Error("user already exist"));
          } else {
            resolve();
          }
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });

    const exitemail = new Promise((resolve, reject) => {
      Users.findOne({ email: email })
        .then((user) => {
          if (user) {
            reject(new Error("email already exist"));
          } else {
            resolve();
          }
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });

    Promise.all([exitusername, exitemail])
      .then((result) => {
        if (password) {
          bcrypt.hash(password, saltround, (err, hash) => {
            if (err) {
              res.status(500).send({ msg: "error in hashing" }, err);
            } else {
              const newuser = new Users({
                username: username,
                password: hash,
                email: email,
                profile: profile || "",
              });
              newuser
                .save()
                .then(() => {
                  res.status(201).send({ msg: "user succesfully registered " });
                })
                .catch((error) => {
                  res.status(500).send(error);
                });
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send(err);
      });
  } catch (error) {
    console.log("rejected");
    return res.status(500).send("try error");
  }
}
//....................................................................................................................
export async function verifyUser(req, res, next) {
  try {
    console.log("inside authentication folder");
    const { username } = req.method === "GET" ? req.query : req.body;

    await Users.findOne({ username: username }).then((user) => {
      if (user) {
        next();
      } else {
        return res.status(404).send({ error: "Can't find username" });
      }
    });
  } catch (err) {
    return res.status(400).send({ error: "Can't find Username" });
  }
}
//...................................................................................................................
export async function login(req, res) {
  const { username, password } = req.body;

  try {
    Users.findOne({ username: username })
      .then((user) => {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return res.status(500).send({ error: "enter password" });
          } else {
            if (result) {
              const token = jwt.sign(
                {
                  userID: user._id,
                  username: user.username,
                },
                ENV.JWT_SECRET,
                { expiresIn: "24h" }
              );

              return res.status(200).send({
                msg: "user found!",
                token,
              });
            } else {
              return res.status(400).send({ error: "password does not match" });
            }
          }
        });
      })
      .catch((err) => {
        return res.status(404).send(err);
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
}
//..............................................................................................................................
export async function getuser(req, res) {
  const { username } = req.params;
  try {
    if (!username) return res.send({ err: "invalid username" });

    Users.findOne({ username: username })

      .then((user) => {
        if (!user) return res.status(501).send("user not found");
        const { password, ...rest } = user.toJSON();
        return res.send(rest);
      })
      .catch((err) => {
        if (err) return res.status(502).send(err);
      });
  } catch (err) {
    res.status(500).send({ error: "Error in the try catch" });
  }
}
//............................................................................................................................................
export async function updateuser(req, res) {
  try {
    const { userID } = req.user;
    const body = req.body;
    if (userID) {
      Users.updateOne({ _id: userID }, body)
        .then((user) => {
          return res.status(200).send("User updated sucessfully!");
        })
        .catch((err) => {
          throw err;
        });
    } else {
      return res.status(500).send({ msg: "id not defined" });
    }
  } catch (err) {
    return res.status(500).send(err);
  }
}
//...............................................................................................................................
export async function generateOTP(req, res) {
  res.app.locals.OTP = await OTP.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).send(res.app.locals.OTP);
}
//...............................................................................................................................
export async function verifyOTP(req, res) {
  let { code } = req.query;
  if (parseInt(code) === parseInt(req.app.locals.OTP)) {
    res.app.locals.OTP = null;
    res.app.locals.resetSession = true;
    return res.status(200).send({ msg: "verify sucessfully" });
  }
  return res.status(400).send({ msg: "invalid OTP" });
}
//...............................................................................................................................
export async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false;
    return res.status(201).send({ msg: "access granted" });
  }
  return res.status(440).send({ error: "Session expired" });
}
//...............................................................................................................................
export async function resetPassword(req, res) {
  try {
    if (!req.app.locals.resetSession) {
      return res.status(440).send({ error: "Session expired" });
    }
    const { username, password } = req.body;
    try {
      Users.findOne({ username: username })
        .then((user) => {
          if (user) {
            bcrypt.hash(password, 10, (err, hashpass) => {
              if (hashpass) {
                Users.updateOne({ username: username }, { password: hashpass })
                  .then((data) => {
                    res.app.locals.resetSession = false;
                    return res
                      .status(201)
                      .send({ msg: "Password updated successfully" });
                  })
                  .catch((err) => {
                    return res.status(500).send({ err });
                  });
              } else {
                return res
                  .status(500)
                  .send({ err: "Couldn't hashed password" });
              }
            });
          } else {
            return res.status(404).send({ err: "User not found" });
          }
        })
        .catch((err) => {
          return res.status(500).send({ err });
        });
    } catch (err) {
      return res.status(500).send({ err });
    }
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send({ err });
  }
}
