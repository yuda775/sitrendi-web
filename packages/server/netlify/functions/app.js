import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import serverless from "serverless-http";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan());

// Routes
import bookingController from "../../controllers/bookingController.js";

app.get("/", (req, res) => {
  res.send("SiTrendi API!");
});

app.post("/bookingImplementasi", bookingController.bookingImplementation);
app.post("/checkBooking", bookingController.checkBooking);

export const handler = serverless(app);
