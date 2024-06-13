// routes/productRoutes.js
const express = require('express');
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  scheduleProductAddition
} = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Add a user-specific endpoint
router.get('/:username', authMiddleware, getProducts);
router.post('/:username', authMiddleware, addProduct);
router.put('/:username/:id', authMiddleware, updateProduct);
router.delete('/:username/:id', authMiddleware, deleteProduct);

router.post('/:username/schedule', authMiddleware, scheduleProductAddition);

module.exports = router;
