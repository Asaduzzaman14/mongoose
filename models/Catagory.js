const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types


const catagorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide a name"]
    },
    description: String,
    imageUrl: {
        type: String,
        validator: [validator.isURL, "Please provide a valid URL"]
    }
}, {
    timestampps: true
})


const Catagory = mongoose.model("Catagory", catagorySchema);

exports = Catagory;