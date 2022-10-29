const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types



const supplierSchema = mongoose.Schema({

    name: {
        type: String,
        require: [true, "Please Provide a Suplier name"],
        trim: true,
        maxlangth: 20,
        unique: true,
    },
    email: {
        type: String,
        validator: [validator.isEmail, "Please provide a valid email"],
        lowercase: true,
        trim: true,
        unique: true
    },

    brand: {
        name: {
            type: String,
            trim: true,
            required: true
        },
        id: {
            type: ObjectId,
            required: true,
            ref: "Brand"
        }
    },
    contractNumber: [{
        type: String,
        required: [true, " Please Provide acontract number"],
        validator: (value) => {
            return validator.isMibilePhone(value)
        },
        message: "please provide a valid phone number"
    }],
    emergencyContractNumber: {
        type: String,
        required: true,
        validator: (value) => {
            return validator.isMobilePhone(value)
        },
        message: "Please Provide a valid phone Number"
    },
    tradeLicenceNumber: {
        type: Number,
        required: [true, "Please provide your trade licence number"]
    },
    presentAddress: {
        type: String,
        required: [true, "Please provide your present Address"]
    },
    location: {
        type: String,
        required: true,
        lowercase: true,
        enum: {
            values: ["dhaka", "chittagong", "khulna", "barishal", "sylhet", "rangpur", "mymenshigh"],
            message: "{VALUE} is not valid name"
        },

    },
    imageURL: {
        type: String,
        validate: [validator.isURL, " Please Provide a valid url"]
    },

    nationalIDImageURL: {
        type: String,
        validate: [validator.isURL, " Please Provide a valid url"]
    },

    status: {
        type: String,
        default: "active",
        enum: ["active", "Inactive",],
    },

}, {
    timestamps: true
})

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;