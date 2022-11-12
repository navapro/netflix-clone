import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import AuthRoute from "./routes/auth";
import UserRoute from "./routes/users";
import MovieRoute from "./routes/movies";
import ListRoute from "./routes/lists";

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URL as string, () =>
  console.log("Mongoose is connected")
);

app.use(express.json());

app.use("/api/auth", AuthRoute);
app.use("/api/users", UserRoute);
app.use("/api/movies", MovieRoute);
app.use("/api/lists", ListRoute);

app.listen(8000, () => {
  console.log("Backend server is running");
});
