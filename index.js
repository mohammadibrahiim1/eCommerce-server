require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const colors = require("colors");

const port = process.env.PORT || 5000;

const Product = require("./models/product");
const Category = require("./models/category");

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
app.post("/api/v1/products", async (req, res, next) => {
  try {
    const result = await Product.insertMany(req.body);
    // const result = await product.save();

    // Check if result is an object with a logger function
    if (typeof result === "object" && typeof result.logger === "function") {
      // Call the logger function
      result.logger();
    } else {
      console.error(
        "result.logger is not a function or result is not an object with a logger function"
      );
    }

    // await result.logger();
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

// post categories data
app.post("/api/v1/categories", async (req, res, next) => {
  try {
    const result = await Category.insertMany(req.body);
    // const result = await product.save();

    // Check if result is an object with a logger function
    if (typeof result === "object" && typeof result.logger === "function") {
      // Call the logger function
      result.logger();
    } else {
      console.error(
        "result.logger is not a function or result is not an object with a logger function"
      );
    }

    // await result.logger();
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

// get products by category and when there is no category get all productsF
app.get("/api/v1/products", async (req, res) => {
  try {
    const { category } = req.query;

    if (category) {
      const filteredItems = await Product.find({ category });
      res.status(200).json({
        status: "success",
        message: "Get data successfully",
        data: filteredItems,
      });
    } else {
      const query = {};
      const products = await Product.find(query);
      // .where("name")
      //   .equals(/\w/)
      //   .where("quantity")
      //   .gt(100);
      res.status(200).json({
        status: "success",
        message: "Get data successfully",
        data: products,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Can't get data",
      error: error.message,
    });
    console.log(error);
  }
});

// get products by id
app.get("/api/v1/products/:id", async (req, res) => {
  const productId = req.params.id;
  const productById = await Product.findById(productId);
  res.send(productById);
  console.log(productById);
});

// get all categories
app.get("/api/v1/categories", async (req, res) => {
  try {
    const query = {};
    const products = await Category.find(query);
    // .where("name")
    //   .equals(/\w/)
    //   .where("quantity")
    //   .gt(100);
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
