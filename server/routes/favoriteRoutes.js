const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/favoriteController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);
router.get('/', ctrl.getFavorites)
router.post('/', ctrl.addFavorite)
router.delete('/', ctrl.clearFavorites)
router.delete('/:productKey', ctrl.removeFavorite);


module.exports = router
