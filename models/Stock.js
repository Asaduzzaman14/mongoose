const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types
const validator = require('validator');

// SCHEMA > MODEL > QUERY 


// Schema design
const stockSchema = mongoose.Schema({
    productId: {
        type: ObjectId,
        required: true,
        ref: "Product"
    },

    name: {
        type: String,
        required: [true, "please provide a name for this Stock"],
        trim: true,
        lowercase: true,
        minLength: [3, "Name must be at least 3 chearacters."],
        maxLength: [20, " Name is too large"],
    },
    description: {
        type: String,
        required: true,
    },

    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "Littre", "pcs", "bag"],
            message: "unit value can't be {VALUE}, must be kg/litre/pcs/bag"
        }
    },
    imageURL: [{
        type: String,
        require: true,
        validate: [validator.isURL, "pleaze provide a valid URl"]
    }],
    price: {
        type: Number,
        required: true,
        min: [0, "Product price cant't be negative"]
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Product quantity cant't be negative"]
    },

    catagory: {
        type: String,
        require: true
    },

    brand: {
        name: {
            type: String,
            required: true,
        },
        id: {
            type: ObjectId,
            ref: "Brand",
            required: true,
        }
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontiued"],
            message: "status can't be {VALUE}"
        },

    },
    store: {
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
        id: {
            type: ObjectId,
            required: true,
            ref: "Store"
        }
    },
    suppliedBy: {
        name: {
            type: String,
            trim: true,
            require: [true, "Please Provide a supplier name"],
        },
        id: {
            type: ObjectId,
            ref: "Supplier"
        }
    },
    selCount: {
        type: Number,
        default: 0,
        min: 0
    }





}, {
    timestamps: true,
});


// model

const Stock = mongoose.model("Stock", stockSchema)


module.exports = Stock
