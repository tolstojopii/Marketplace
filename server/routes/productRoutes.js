const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productController');

router.get('/', ctrl.getProducts);
router.get('/:id', ctrl.getProductById);

module.exports = router;