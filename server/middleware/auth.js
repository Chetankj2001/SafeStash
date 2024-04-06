import jwt from "jsonwebtoken";
import env from "../config.js";

export default async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodetoken = await jwt.verify(token, env.JWT_SECRET);
    req.user=decodetoken;
    
    next();
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function localvariable(req,res,next){
    req.app.locals={
        OTP:null,
        resetSession:false
    }
    next();
}
