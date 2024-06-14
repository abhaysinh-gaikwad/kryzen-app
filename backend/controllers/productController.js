const { Op } = require('sequelize');
const Product = require('../models/Product');
const User = require('../models/User');
const scheduleAddProduct = require('../utils/scheduleAddProduct');

// Controller to fetch all products
exports.getProducts = async (req, res) => {
  try {
    // Extract query parameters
    const { minPrice, maxPrice, sortBy } = req.query;
    let { type } = req.query;

    // Build the filter object based on query parameters
    const filter = {};
    if (minPrice && !isNaN(minPrice)) {
      filter.price = { [Op.gte]: parseFloat(minPrice) };
    }
    if (maxPrice && !isNaN(maxPrice)) {
      if (filter.price) {
        filter.price[Op.lte] = parseFloat(maxPrice);
      } else {
        filter.price = { [Op.lte]: parseFloat(maxPrice) };
      }
    }
    if (type) {
      type = type.toLowerCase(); // ensure case insensitivity
      filter.type = type;
    }

    // Build the sorting options based on sortBy parameter
    let sortOptions = [['createdAt', 'ASC']]; // Default sort by createdAt ascending
    if (sortBy === 'createdAt-desc') {
      sortOptions = [['createdAt', 'DESC']];
    } else if (sortBy === 'price-asc') {
      sortOptions = [['price', 'ASC']];
    } else if (sortBy === 'price-desc') {
      sortOptions = [['price', 'DESC']];
    }

    // Fetch products with applied filters and sorting
    const products = await Product.findAll({
      where: filter,
      order: sortOptions,
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products', details: error.message });
  }
};

// Controller to add a new product (Admin only)
exports.addProduct = async (req, res) => {
  const { name, image, price, type } = req.body;
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized. Only admins can add products.' });
    }
    const product = await Product.create({
      name,
      image,
      price,
      type,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error adding product', details: error.message });
  }
};

// Controller to update a product by ID (Admin only)
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, image, price, type } = req.body;
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized. Only admins can update products.' });
    }
    const product = await Product.findByPk(id);
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

// Controller to delete a product by ID (Admin only)
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized. Only admins can delete products.' });
    }
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await product.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product', details: error.message });
  }
};

// Controller to add a product to user's cart (User only)

exports.addToCart = async (req, res) => {
  const { productId } = req.params;
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await user.addProduct(product);

    res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Error adding product to cart', details: error.message });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { include: Product });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const cartItems = user.Products; // Assuming 'Products' is the alias for the association

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cart items', details: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.removeProduct(id);

    res.status(200).json({ message: 'Product removed from cart successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing product from cart', details: error.message });
  }
};

// Controller to schedule addition of a new product (Admin only)
exports.scheduleProductAddition = async (req, res) => {
  const { name, image, price, type, delay } = req.body;
  const { username } = req.params;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized. Only admins can schedule product additions.' });
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

exports.scheduleAddToCart = async (req, res) => {
  const { productId } = req.params;
  const { delay } = req.body; // Delay in minutes

  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const delayInMinutes = parseInt(delay, 10);
    if (isNaN(delayInMinutes) || delayInMinutes <= 0) {
      return res.status(400).json({ error: 'Invalid delay value. It should be a positive integer.' });
    }

    // Schedule the product to be added to the user's cart
    scheduleAddProduct(delayInMinutes, {
      productId: product.id,
      userId: user.id,
      action: 'addToCart'
    });

    res.status(200).json({ message: 'Product addition to cart scheduled', scheduledFor: `In ${delayInMinutes} minutes` });
  } catch (error) {
    console.error('Error scheduling product addition to cart:', error);
    res.status(500).json({ error: 'Error scheduling product addition to cart', details: error.message });
  }
};