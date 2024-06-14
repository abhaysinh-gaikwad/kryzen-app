const express = require('express');
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  addToCart,
  getCartItems,
  removeFromCart,
  scheduleAddToCart
} = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Admin endpoints for managing products
router.post('/:username', authMiddleware, addProduct);
router.put('/:username/:id', authMiddleware, updateProduct);
router.delete('/:username/:id', authMiddleware, deleteProduct);

// User endpoints for cart management

router.post('/:username/cart/add/:productId', authMiddleware, addToCart);
router.get('/:username/cart', authMiddleware, getCartItems);
router.delete('/:username/cart/remove/:id', authMiddleware, removeFromCart);

// User endpoints for scheduling cart additions
router.post('/:username/cart/schedule/add/:productId', authMiddleware, scheduleAddToCart);


// Public endpoint to fetch products by username
router.get('/:username', getProducts);

module.exports = router;