require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const categoryController = require("./controllers/categoryController");

const app = express();
const port = process.env.PORT || 5000;

// connect to mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wuwpwwx.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.error(err));

//  middlewares
app.use(cors());
app.use(express.json());

// routes
app.post("/categories", categoryController.createCategory);

// error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal server error");
});

// start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
