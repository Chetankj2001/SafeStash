import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import Env from "../config.js";

let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: Env.Mail,
        pass: Env.Password
    }
});

const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Mailgen',
        link: 'https://mailgen.js/'
    }
});

export const registermail=async (req,res)=>{
    const{username,userEmail,text,subject}=req.body;

    const email = {
        body: {
            name:username,
            intro:text,
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }}

        const emailBody = mailGenerator.generate(email);

        const mailOptions = {
            from: Env.Mail,
            to: userEmail,
            subject: subject||"Signup Successful",
            html: emailBody
        }

        transporter.sendMail(mailOptions)
        .then(()=>{
            return res.status(201).send({msg:"Check your Email"})
        })
        .catch(err=>{
            return res.status(500).send({Error:err})
        })
};