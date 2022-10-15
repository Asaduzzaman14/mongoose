const express = require('express');
const catagoryCotroller = require('../controllers/catagory.controller');

const router = express.Router();



router.route("/")
    .post(catagoryCotroller.createCatagory)
    .get(catagoryCotroller.getCatagory)


module.exports = router;