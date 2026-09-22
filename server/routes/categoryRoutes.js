const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/categoryContoller')

router.get('/', ctrl.getCategories);

module.exports = router;