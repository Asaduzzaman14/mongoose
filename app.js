const express = require('express');
const app = express();
const cors = require('cors');

// middleware
app.use(express.json());
app.use(cors())

// routes
const productRoutes = require('./routes/productRoutes');
const brandRoute = require('./routes/brand.route');
const storeRoute = require('./routes/store.route');
const catagoryRoute = require('./routes/catagoty.route');
const supplierRoute = require('./routes/suplier.route');

app.get("/", (req, res) => {
    res.send("Rouret is warking!")
})


// get data 
app.use("/api/v1/product", productRoutes)
app.use("/api/v1/brand", brandRoute)
app.use("/api/v1/store", storeRoute)
app.use("/api/v1/catagory", catagoryRoute)
app.use("/api/v1/supplier", supplierRoute)


module.exports = app