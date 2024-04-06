import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/conn.js";
import router from "./routes/route.js";

const app = express();

const port = 3000;

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

app.route("/").get((req, res) => {
  res.send("hello");
});

app.use("/api", router);

//connect when we have valid connection
connect().then(() => {
  try {
    app.listen(port, () => {
      console.log(`"running on port: ${port}`);
    });
  } catch (error) {
    console.log("cannot connect to the server");
  }
});
// .catch((error)=>{
//     console.log("Invalid database connection....!");
// })
