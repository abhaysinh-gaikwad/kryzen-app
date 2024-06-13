// controllers/productController.js
const Product = require('../models/Product');
const User = require('../models/User');
const scheduleAddProduct = require('../utils/scheduleAddProduct');

exports.getProducts = async (req, res) => {
    const { username } = req.params;
    const { type, minPrice, maxPrice, sort } = req.query;
  
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const queryOptions = {
        where: { userId: user.id },
        order: []
      };
  
      // Filtering by type
      if (type) {
        queryOptions.where.type = type;
      }
  
      // Filtering by price range
      if (minPrice !== undefined || maxPrice !== undefined) {
        queryOptions.where.price = {};
        if (minPrice !== undefined) {
          queryOptions.where.price['$gte'] = parseFloat(minPrice);
        }
        if (maxPrice !== undefined) {
          queryOptions.where.price['$lte'] = parseFloat(maxPrice);
        }
      }
  
      // Sorting by creation time
      if (sort) {
        if (sort === 'asc' || sort === 'desc') {
          queryOptions.order.push(['createdAt', sort]);
        } else {
          return res.status(400).json({ error: 'Invalid sort value. Use "asc" or "desc".' });
        }
      }
  
      // Fetch filtered and sorted products for the specific user
      const products = await Product.findAll(queryOptions);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products', details: error.message });
    }
  };

exports.addProduct = async (req, res) => {
  const { username } = req.params;
  const { name, image, price, type } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const product = await Product.create({
      name,
      image,
      price,
      type,
      userId: user.id,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error adding product', details: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { username, id } = req.params;
  const { name, image, price, type } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const product = await Product.findOne({ where: { id, userId: user.id } });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.name = name;
    product.image = image;
    product.price = price;
    product.type = type;

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error updating product', details: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { username, id } = req.params;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const product = await Product.findOne({ where: { id, userId: user.id } });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product', details: error.message });
  }
};

exports.scheduleProductAddition = async (req, res) => {
  const { username } = req.params;
  const { name, image, price, type, delay } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const delayInMinutes = parseInt(delay, 10);
    if (isNaN(delayInMinutes) || delayInMinutes <= 0) {
      return res.status(400).json({ error: 'Invalid delay value. It should be a positive integer.' });
    }

    scheduleAddProduct(delayInMinutes, {
      name,
      image,
      price,
      type,
      userId: user.id,
    });

    res.status(200).json({ message: 'Product addition scheduled', scheduledFor: `In ${delayInMinutes} minutes` });
  } catch (error) {
    res.status(500).json({ error: 'Error scheduling product addition', details: error.message });
  }
};
