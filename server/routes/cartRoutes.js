const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);
router.get('/', ctrl.getCart);
router.post('/', ctrl.addToCart);
router.delete('/', ctrl.clearCart);
router.patch('/:productKey', ctrl.setQuantity);
router.delete('/:productKey', ctrl.removeFromCart);

module.exports = router;