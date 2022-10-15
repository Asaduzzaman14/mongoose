const express = require('express');
const storeController = require('../controllers/store.controller');


const router = express.Router();


router.route("/")
    .post(storeController.createStore)
    .get(storeController.getStores)

router.route("/:id")
    .get(storeController.getStoreById)



module.exports = router;