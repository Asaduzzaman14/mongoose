const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types

const storeSchema = mongoose.Schema({
    name: {
        type: string,
        trim: true,
        require: [true, "Please Provide a Brand name"],
        lowercase: true,
        enum: {
            values: ["dhaka", "chittagong", "khulna", "barishal", "sylhet", "rangpur", "mymenshigh"],
            message: "{VALUE} is not valid name"
        },

    },
    desctiption: String,
    status: {
        type: String,
        enum: ["active", "Inactive"],
        default: "active"
    },
    manager: {
        name: String,
    }

}, {
    timestamps: true
})

const Store = mongoose.Model("Store", storeSchema);

exports = Store;