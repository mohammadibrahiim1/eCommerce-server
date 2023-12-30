require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const colors = require("colors");

const port = process.env.PORT || 5000;

const Product = require("./models/product");

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

// error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal server error");
});

// post product data to mongodb database
app.post("/api/v1/product", async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();

    result.logger();
    res.status(200).json({
      status: "success",
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Data is not inserted",
      error: error.message,
    });
    console.log(error);
  }
});

app.get("/api/v1/product", async (req, res) => {
  try {
    const products = await Product.where("name")
      .equals(/\w/)
      .where("quantity")
      .gt(100);
    res.status(200).json({
      status: "success",
      message: "Get data successfully",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Can't get data",
      error: error.message,
    });
    console.log(error);
  }
});

app.get("/", (req, res) => {
  res.send("e-commerce website is working");
});

// start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`.blue);
});
