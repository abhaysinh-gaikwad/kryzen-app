// utils/scheduleAddProduct.js
const schedule = require('node-schedule');
const Product = require('../models/Product');

// Function to schedule adding a product after a delay
const scheduleAddProduct = (delayInMinutes, productDetails) => {
  const date = new Date(Date.now() + delayInMinutes * 60000);
  schedule.scheduleJob(date, async () => {
    try {
      await Product.create(productDetails);
      console.log('Scheduled product added:', productDetails);
    } catch (error) {
      console.error('Error adding scheduled product:', error.message);
    }
  });
};

module.exports = scheduleAddProduct;
