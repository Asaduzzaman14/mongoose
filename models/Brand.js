const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types


const brandSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: [true, "Please Provide a Brand name"],
        maxlangth: 20,
        unique: true,
        lowercase: true
    },
    desctiption: String,
    email: {
        type: String,
        lowercase: true,
        validator: [validator.isEmail, "Please provide a valid email"]
    },
    website: {
        type: String,
        validator: [validator.isURL, " Please Provie av valid URL"]
    },
    location: String,
    product: [{
        type: ObjectId,
        ref: "Product"
    }],

    supplier: [{
        name: String,
        contancNumber: String,
        id: {
            type: ObjectId,
            ref: "Supplier"
        }
    }],

    status: {
        type: String,
        enum: ["active", "Inactive"],
        default: "active"
    }

}, {
    timestamps: true
})

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;