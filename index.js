require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const colors = require("colors");

const port = process.env.PORT || 5000;

const categoryRouter = require("./routes/category");

// connect to mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wuwpwwx.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

mongoose
  .connect(uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("Mongodb database connected successfully".cyan.bold))
  .catch((err) => console.error(err));

//  middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1", categoryRouter);

// error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal server error");
});

app.get("/", (req, res) => {
  res.send("e-commerce website is working");
});

// start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`.blue);
});
