const connectDB = require("../config/db");
const Product = require("../models/Product");
const products = require("./products");

async function seedProducts() {
  try {
    await connectDB();

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:");
    console.error(error.message);

    process.exit(1);
  }
}

seedProducts();