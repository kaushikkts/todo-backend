import express, { Application } from "express";
import router from "./routes/index";
import cors from "cors";

const app: Application = express();
const port = process.env.PORT;

app.use(express.json());
app.use(router);
app.use(cors());


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});