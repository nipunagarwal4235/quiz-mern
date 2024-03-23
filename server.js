import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import router from "./router/route.js";
import connect from "./database/connection.js";
const app = express();
import path from "path";
import { fileURLToPath } from 'url';

/** app middlewares */
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, 'build')));
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, 'build', 'index.html')));
/** appliation port */
const port = process.env.PORT || 8080;

/** routes */
app.use("/api", router); /** apis */


/** start server only when we have valid connection */
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log("Server Connected");
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid Database Connection");
  });
