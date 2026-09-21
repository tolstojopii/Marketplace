const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/', ctrl.getProducts);
router.get('/:id', ctrl.getProductById);

router.post('/', authMiddleware, adminMiddleware, ctrl.createProduct);

module.exports = router;