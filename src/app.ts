import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clear-cluster.2zd4u.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 5000);
    console.log("Node server is listening on port " + process.env.PORT);
  })
  .catch((err) => console.log(err));

app.use((error: any, {}, res: express.Response, {}) => {
  const { statusCode, message } = error;
  return res
    .status(statusCode || 500)
    .send({ message: message || "Internal server error" });
});
