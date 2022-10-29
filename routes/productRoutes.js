const express = require('express');
const router = express.Router()
const productController = require('../controllers/products.controller');
const uploder = require('../middleware/uploder');



router.post("/file-uplode", uploder.single('image'), productController.fileUplode)

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