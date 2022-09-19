const express = require('express');
const app = express();
const cors = require('cors');

// middleware
app.use(express.json());
app.use(cors())

// routes
const productRoutes = require('./routes/productRoutes');

app.get("/", (req, res) => {
    res.send("Rouret is warking!")
})

// get data 
app.use("/api/v1/product", productRoutes)


module.exports = app