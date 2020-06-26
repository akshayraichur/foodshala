const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
// Router Routes.
const CustomerRoutes = require("./routes/CustomerRoutes");
const RestaurantRoutes = require("./routes/RestaurantRoutes");

app.get("/", (req, res, next) => {
  res.send("Hi world");
});

// Routes config
app.use("/api/customer", CustomerRoutes);
app.use("/api/restaurant", RestaurantRoutes);

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("DB Connected."),
);

app.listen(
  process.env.PORT,
  () => console.log(`Server is up and running at port : ${process.env.PORT}`),
);
