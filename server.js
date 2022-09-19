const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const collors = require('colors');


//database connecton
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
    console.log("Database is connection is Succesfull".green.bold)
})

const app = require("./app");

//server
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`app is runing on port ${port}`.yellow.bold);
})