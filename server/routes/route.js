import { Router } from "express";
const router = Router();
import * as controller from "../controller/appcontroller.js";
import auth, { localvariable } from "../middleware/auth.js";
import {registermail} from "../controller/mailer.js";

//post methods
router.post("/register", controller.register);
router.post("/registermail",registermail);
router.post("/authenticate",controller.verifyUser,(req, res)=>{console.log("valid user found"); return res.status(200).send("valid User")});
router.post("/login", controller.verifyUser, controller.login);

//get mehtods
router.get("/user/:username", controller.getuser);
router.get("/generateOTP",controller.verifyUser,localvariable,controller.generateOTP);
router.get("/verifyOTP", controller.verifyUser, controller.verifyOTP);
router.get("/createResetSession", controller.createResetSession);

//put methods
router.put("/updateuser", auth, controller.updateuser);
router.put("/resetpassword", controller.verifyUser, controller.resetPassword);

router.get("/doubt", (req, res) => {
  console.log(req.app.locals.resetSession);
});
export default router;
