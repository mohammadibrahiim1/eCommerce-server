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
// const Order = require("./models/brand");

// ssl commerz payment gateway
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

// app.post("/api/v1/newProducts", async (req, res, next) => {
//   try {
//     const result = await Products.insertMany(req.body);
//     // const result = await product.save();

//     // Check if result is an object with a logger function
//     if (typeof result === "object" && typeof result.logger === "function") {
//       // Call the logger function
//       result.logger();
//     } else {
//       console.error(
//         "result.logger is not a function or result is not an object with a logger function"
//       );
//     }

//     // await result.logger();
//     res.status(200).json({
//       status: "success",
//       message: "Data inserted successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "failed",
//       message: "Data is not inserted",
//       error: error.message,
//     });
//     console.log(error);
//   }
// });

// post brands data to mongodb database
app.post("/api/v1/brands", async (req, res, next) => {
  try {
    const result = await Brand.insertMany(req.body);
    // const result = await product.save();

    // Check if result is an object with a logger function
    // if (typeof result === "object" && typeof result.logger === "function") {
    //   // Call the logger function
    //   result.logger();
    // } else {
    //   console.error(
    //     "result.logger is not a function or result is not an object with a logger function"
    //   );
    // }

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

const trans_id = new ObjectId().toString();

// post order data
app.post("/api/v1/orders", async (req, res) => {
  try {
    // Access order data from request body
    const newOrders = new Order(req.body);
    console.log(newOrders);

    // Perform necessary validation and processing of order data
    if (!newOrders) {
      return res.status(400).json({ error: "Invalid order data" }); // Handle invalid data
    }

    // Integrate with a database or service to create the order
    const savedOrder = await newOrders.save();
    // console.log(savedOrder);
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

// post order data
// app.post("/api/v1/orders", async (req, res, next) => {
//   // console.log(req.body.price);

//   const orderData = req.body;

//   // COD OR CREDIT CARD
//   const { paymentMethod } = orderData;

//   try {
//     await new Order.insertMany(orderData);

//     if (paymentMethod === "COD") {
//       // no payment confirmation needed for cod
//       res.status(201).json({
//         message: "Order placed successfully",
//       });
//     } else {
//       // redirect to payment proccessing
//       const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
//       sslcz.init(data).then((apiResponse) => {
//         // Redirect the user to payment gateway
//         let GatewayPageURL = apiResponse.GatewayPageURL;
//         res.send({ url: GatewayPageURL });
//         // res.redirect(GatewayPageURL);
//         console.log("Redirecting to: ", GatewayPageURL);
//       });
//     }
//   } catch (error) {}

//   // const data = {
//   //   total_amount: order.price,
//   //   currency: "USD",
//   //   tran_id: trans_id, // use unique tran_id for each api call
//   //   success_url: "http://localhost:3030/success",
//   //   fail_url: "http://localhost:3030/fail",
//   //   cancel_url: "http://localhost:3030/cancel",
//   //   ipn_url: "http://localhost:3030/ipn",
//   //   shipping_method: "Courier",
//   //   product_name: "Computer.",
//   //   product_category: "Electronic",
//   //   product_profile: "general",
//   //   cus_name: order.userName,
//   //   cus_email: order.userEmail,
//   //   cus_add1: order.address,
//   //   cus_add2: "Dhaka",
//   //   cus_city: order.city,
//   //   cus_state: order.state,
//   //   cus_postcode: order.postalCode,
//   //   cus_country: "Bangladesh",
//   //   cus_phone: "01711111111",
//   //   cus_fax: "01711111111",
//   //   ship_name: "Customer Name",
//   //   ship_add1: "Dhaka",
//   //   ship_add2: "Dhaka",
//   //   ship_city: "Dhaka",
//   //   ship_state: "Dhaka",
//   //   ship_postcode: 1000,
//   //   ship_country: "Bangladesh",
//   // };

//   // console.log(data);

//   // const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
//   // sslcz.init(data).then((apiResponse) => {
//   //   // Redirect the user to payment gateway
//   //   let GatewayPageURL = apiResponse.GatewayPageURL;
//   //   res.send({ url: GatewayPageURL });
//   //   // res.redirect(GatewayPageURL);
//   //   console.log("Redirecting to: ", GatewayPageURL);
//   // });

//   // try {
//   //   const result = await Order.insertMany(req.body);
//   //   // const result = await product.save();

//   //   // Check if result is an object with a logger function
//   //   if (typeof result === "object" && typeof result.logger === "function") {
//   //     // Call the logger function
//   //     result.logger();
//   //   } else {
//   //     console.error(
//   //       "result.logger is not a function or result is not an object with a logger function"
//   //     );
//   //   }

//   //   // await result.logger();
//   //   res.status(200).json({
//   //     status: "success",
//   //     message: "Data inserted successfully",
//   //     data: result,
//   //   });
//   // } catch (error) {
//   //   res.status(400).json({
//   //     status: "failed",
//   //     message: "Data is not inserted",
//   //     error: error.message,
//   //   });
//   //   console.log(error);
//   // }
// });

// route for payment confirmation(if using credit card)
app.get("/api/v1/orders", async (req, res) => {
  try {
    const query = {};
    const myOrders = await Order.find(query);
    res.status(200).json({
      status: "success",
      message: "Get orders successfully",
      data: myOrders,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }

  // const orderId = req.params.orderId;
  // try {
  //   const order = await Order.findById(orderId);
  //   if (!order) {
  //     return res.status(404).send("Order no found");
  //   }
  //   res.json(order);
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send("Error retrieving order");
  // }
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

// payment with stripe
// app.post("/create-payment-intent", async (req, res) => {
//   const { price } = req.body;
//   const amount = parseInt(price * 100);
//   console.log(amount);

//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: amount,
//     currency: "usd",
//     payment_methods_types: ["card"]
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });

app.get("/", (req, res) => {
  res.send("e-commerce website is working");
});

// start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`.blue);
});
