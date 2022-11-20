const express = require('express');
const router = express.Router()
const productController = require('../controllers/products.controller');
const uploder = require('../middleware/uploder');
const verifyToken = require('../middleware/verifyToken,');
const authorization = require('../middleware/authorization')


// router.use(verifyToken); // all route Authorization


router.post("/file-uplode", uploder.single('image'), productController.fileUplode)

router.route('/bulkUpdate')
    .patch(productController.bulkUpdateProduct)

router.route("/bulk-product-delete")
    .delete(productController.bulkDeleteProduct)


router.route('/')
    .get(productController.getProductds)
    .post(verifyToken, authorization('admin', "store-manager"), productController.createProduct)  // single route authentic

router.route('/:id')
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct)





module.exports = router;