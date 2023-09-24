import express from "express";
import "express-async-errors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

import dbConnect from "./db/connect.js";
import authRouter from "./routes/authRoutes.js";
import infoRouter from "./routes/infoRoutes.js";
import notFoundMiddleware from "./middlewares/notFound.js";
import errorHandlerMiddleware from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/info", infoRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = 4000 || process.env.PORT;
const startServer = () => {
  try {
    dbConnect(process.env.MONGO_URI);
    console.log("Connected to database successfully.");
    app.listen(4000, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
