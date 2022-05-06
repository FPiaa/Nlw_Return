import dotenv from "dotenv";
import express from "express";
import { routes } from "./routes";

dotenv.config()
const FRONTEND_SERVER = process.env.FRONTEND_SERVER;

const app = express();
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, () => {
    console.log("http server running");
});