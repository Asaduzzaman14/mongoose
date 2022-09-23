const express = require('express');
const router = express.Router()
const productController = require('../controllers/products.controller');



router.route('/bulkUpdate')
    .patch(productController.bulkUpdateProduct)

router.route("/bulk-product-delete")
    .delete(productController.bulkDeleteProduct)


router.route('/')
    .get(productController.getProductds)
    .post(productController.createProduct)

router.route('/:id')
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct)





module.exports = router;