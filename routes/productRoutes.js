const express = require('express');
const router = express.Router()
const productController = require('../controllers/products.controller');

router.route('/')
    .get(productController.getProductds)
    .post(productController.createProduct)


router.route('/:id').patch(productController.updateProduct)




module.exports = router;