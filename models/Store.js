const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const storeSchema = mongoose.Schema({
    name: {
        type: String,
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
        contactNumber: String,
        id: {
            type: ObjectId,
            ref: "User"
        }
    },
    name: {
        type: String,
        trim: true,
        require: [true, "Please Provide a Brand name"],
        lowercase: true,
        enum: {
            values: ["dhaka", "chittagong", "khulna", "barishal", "sylhet", "rangpur", "mymenshigh"],
            message: "{VALUE} is not valid name"
        },

    },
    suplieredBy: {
        name: {
            type: String,
            trim: true,
            require: [true, "Please Provide a suplier name"],

        },
        id: {
            type: ObjectId,
            ref: "Supplier"
        }
    }




}, {
    timestamps: true
})

const Store = mongoose.model("Store", storeSchema);

exports = Store;