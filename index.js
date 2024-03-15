require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
const colors = require("colors");

const port = process.env.PORT || 5000;

const Product = require("./models/product");
const Category = require("./models/category");
const Brand = require("./models/brand");
// const Order = require("./models/brand");

// ssl commerz
const SSLCommerzPayment = require("sslcommerz-lts");
const Order = require("./models/order");
const User = require("./models/user");
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false; //true for live, false for sandbox

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

// post brands data to mongodb database
app.post("/api/v1/brands", async (req, res, next) => {
  try {
    const result = await Brand.insertMany(req.body);
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
// post order data
app.post("/api/v1/order", async (req, res, next) => {
  try {
    const result = await Order.insertMany(req.body);
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

// post user information
app.post("/api/v1/user", async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    await User.insertMany({ email });
    res.status(201).json({ message: "user inserted  successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get products by category and when there is no category get all products
app.get("/api/v1/products", async (req, res) => {
  try {
    const { category, brand } = req.query;

    // Apply filtering based on query parameters

    if (category && brand) {
      // both category and brand filters are applied
      const filteredItems = await Product.find({ category, brand });
      res.status(200).json({
        status: "success",
        message: "Get data successfully",
        data: filteredItems,
      });
    } else if (category) {
      //  category  filters are applied
      const filteredItems = await Product.find({ category });
      res.status(200).json({
        status: "success",
        message: "Get data successfully",
        data: filteredItems,
      });
    } else if (brand) {
      //  brands  filters are applied
      const filteredItems = await Product.find({ brand });
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

// get all brands
app.get("/api/v1/brands", async (req, res) => {
  try {
    const query = {};
    const brands = await Brand.find(query);
    // .where("name")
    //   .equals(/\w/)
    //   .where("quantity")
    //   .gt(100);
    res.status(200).json({
      status: "success",
      message: "Get data successfully",
      data: brands,
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

// payment with SSLCommerz

app.get("/", (req, res) => {
  res.send("e-commerce website is working");
});

// start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`.blue);
});
