import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan());

// Routes
import bookingController from "./controllers/bookingController.js";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/bookingImplementasi", bookingController.bookingImplementation);
app.post("/checkBooking", bookingController.checkBooking);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
