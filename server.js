import express from "express";
import errorHandlerMiddleware from "./middleware/errorHandler.js";
import notFoundMiddleware from "./middleware/notFound.js";
import dotenv from "dotenv";
import connectDb from "./db/connect.js";
import authRouter from "./routes/authRoute.js";
import jobsRouter from "./routes/jobsRoutes.js";
import "express-async-errors";

dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome ......");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

console.log("server running");

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
