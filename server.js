const express = require("express");
const bodyParser = require("body-parser");
const connectdb = require("./config/connectDB");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

connectdb();

// Dummy database to store products
let products = [];

// Route to add a product
app.post("/products", (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res
      .status(400)
      .json({ message: "Please provide name and price for the product" });
  }

  const product = { id: products.length + 1, name, price };
  products.push(product);
  res.status(201).json(product);
});

// Route to get list of all products
app.get("/products", (req, res) => {
  res.json(products);
});

// Route to find product by name
app.get("/products/:name", (req, res) => {
  const { name } = req.params;
  const product = products.find(
    (product) => product.name.toLowerCase() === name.toLowerCase()
  );
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

const port = 6000;

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
