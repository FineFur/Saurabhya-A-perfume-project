const express = require("express");

const Order = require("../models/Order");
const Product = require("../models/Product");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new order
router.post("/", protect, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    // Check that cart items were provided
    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Your cart is empty",
      });
    }

    // Check shipping information
    if (!shippingAddress) {
      return res.status(400).json({
        message: "Please provide shipping information",
      });
    }

    // Get product IDs from the request
    const productIds = items.map((item) => item.product);

    // Get the real products from MongoDB
    const products = await Product.find({
      _id: { $in: productIds },
    });

    // Make sure every product exists
    if (products.length !== items.length) {
      return res.status(400).json({
        message: "One or more products could not be found",
      });
    }

    // Build the order items using database prices
    const orderItems = items.map((item) => {
      const product = products.find(
        (product) => product._id.toString() === item.product
      );

      if (!product) {
        throw new Error("Product not found");
      }

      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity < 1) {
        throw new Error("Invalid product quantity");
      }

      return {
        product: product._id,
        name: product.name,
        price: product.price,
        quantity,
      };
    });

    // Calculate the total using MongoDB product prices
    const totalAmount = orderItems.reduce(
      (total, item) => {
        return total + item.price * item.quantity;
      },
      0
    );

    // Create the order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      shippingAddress,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to place order",
      error: error.message,
    });
  }
});

// Get logged-in user's orders
router.get("/my-orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});

module.exports = router;