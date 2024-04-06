import mongoose from "mongoose";

const Schema=new mongoose.Schema({
    username:{
        type:String,
        // required:true,
        // unique: true,
    },
    password:{
        type:String,
        // required:true,
        // unique: false,
    },
    email:{
        type:String,
        // required:true,
        // unique: true,
    },
    firstname:String,
    lastname:String,
    mobile:Number,
    address:String,
    profile:String,
})

export default mongoose.model.Users||new mongoose.model("User",Schema);