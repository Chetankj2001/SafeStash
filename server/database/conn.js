import mongoose from "mongoose";
// import { MongoMemoryServer } from "mongodb-memory-server";

export default async function connect()
{
    // const mongod=await MongoMemoryServer.create();
    // const geturl=mongod.getUri();
    const localurl='mongodb://localhost:27017/mydatabase5'
    const db=await mongoose.connect(localurl)
    return db;
}