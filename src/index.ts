import cors from "cors";
import express, { Application } from "express";
import router from "./routes/index";

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(router);
app.use(cors());
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", "*");
  next();
});

app.get("/health", (req, res) => {
  res.status(200).json("Todo backend app is running");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
