require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const SSLCommerzPayment = require("sslcommerz-lts");
// const jwt = require("jsonwebtoken");
const colors = require("colors");

// stripe sk key
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
console.log(stripe);

const port = process.env.PORT || 5000;

const Product = require("./models/product");
const Products = require("./models/newProducts");
const Category = require("./models/category");
const Brand = require("./models/brand");
const Order = require("./models/order");
const User = require("./models/user");
const Payment = require("./models/payment");
// const Order = require("./models/brand");

// ssl commerz payment gateway
// const store_id = process.env.STORE_ID;
// const store_passwd = process.env.STORE_PASSWORD;
// const is_live = false; //true for live, false for sandbox

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

// post MyOrder data
app.post("/api/v1/orders", async (req, res) => {
  try {
    // Access order data from request body
    const newOrders = new Order(req.body);
    console.log(newOrders);

    // Perform necessary validation and processing of order data
    if (!newOrders) {
      return res.status(400).json({ error: "Invalid order data" }); // Handle invalid data
    }

    if (newOrders.paymentOption === "COD") {
      newOrders.status = "confirmed";
    } else {
      newOrders.status = "pending";
    }

    // Integrate with a database or service to create the order
    const savedOrder = await newOrders.save();
    res.status(200).json({
      status: "success",
      message: "Order saved successfully",
      savedOrder,
    });

    // res.status(201).json(savedOrder); // Send successful response with new order information
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Failed to create order" }); // Handle errors gracefully
  }
});

app.patch("/api/v1/orders/:id", async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  try {
    const updateStatus = await Order.findByIdAndUpdate(
      id,
      {
        status: status,
      },
      {
        new: true,
      }
    );
    res.json(updateStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// get orders data by users email
app.get("/api/v1/orders/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const orders = await Order.find({
      email,
    }).sort({ _id: -1 });
    if (!orders?.length) {
      return res.status(404).json({
        message: "No orders found for this user",
      });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
});

// get order data by id
app.get("/api/v2/orders/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const order = await Order.findById(query);
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    res.send(order);
    // console.log(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// stripe payment intent
app.post("/api/v1/create-payment-intent", async (req, res) => {
  const order = req.body;
  const price = order.price;
  const amount = price * 100;

  try {
    // create a payment intent with stripe
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: amount,
      payment_method_types: ["card"],
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
    console.log(paymentIntent);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// when user click on pay button then  store payments information in  collection in database
app.post("/api/v1/payment", async (req, res) => {
  const payment = req.body;
  const result = new Payment(payment);

  try {
    await result.save();

    const updatedDoc = await Order.findByIdAndUpdate(
      payment.orderId,
      {
        $set: { status: "completed", paymentStatus: "paid" },
      },
      {
        new: true,
      }
    );

    if (!updatedDoc) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    res.status(201).json({
      message: "payment saved and order successfully",
      payment: updatedDoc,
    });
    console.log(result);
  } catch (error) {
    res.status(500).json({
      error: "Failed to save payment",
    });
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

app.get("/", (req, res) => {
  res.send("e-commerce website is working");
});

// start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`.blue);
});
