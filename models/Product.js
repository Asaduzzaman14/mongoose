const { mongoose } = require("mongoose");

// SCHEMA > MODEL > QUERY 


// Schema design
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide a name for this producr"],
        trim: true,
        unique: [true, "Name Must be unique"],
        minLength: [3, "Name must be at least 3 chearacters."],
        maxLength: [20, " Name is too large"],
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price Can't be negative"],
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "Littre", "pcs"],
            message: "unit value can't be {VALUE}, must be kg/litre/pcs"
        }
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Quantity can't be nagative"],
        validate: {
            validator: (value) => {
                const isIntegr = Number.isInteger(value)
                if (isIntegr) {
                    return true
                } else {
                    return false
                }
            }
        },
        message: "Quantity must be an integer"
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["In-stock", "out-of-stock", "discontinued"],
            message: "status can't be {VALUE}"
        }
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
    // updateAt: {
    //     type: Date,
    //     default: Date.now
    // },

    // supplier: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "supplier"
    // },
    // catagories: [{
    //     name: {
    //         type: String,
    //         required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId
    // }]



}, {
    timestamps: true,
});


//mongoose middleware for saving data: pre/post

productSchema.pre("save", function (next) {
    console.log("Before saving data");
    if (this.quantity == 0) {
        this.status = "out-of-stock"
    }


    next()
})

// producrSchema.post("save", function (doc, next) {
//     console.log("before saving data");

//     next()
// })

productSchema.methods.logger = function () {
    console.log(`Data save for ${this.name}`);
}




// model

const Product = mongoose.model("product", productSchema)


module.exports = Product
