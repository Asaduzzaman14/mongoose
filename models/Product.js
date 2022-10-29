const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types


// SCHEMA > MODEL > QUERY 


// Schema design
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide a name for this producr"],
        trim: true,
        unique: [true, "Name Must be unique"],
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
            values: ["kg", "litre", "pcs", "bag"],
            message: "unit value can't be {VALUE}, must be kg/litre/pcs/bag"
        }
    },
    imageURLs: [{
        type: String,
        require: true,
        // validate: {
        //     validator: (value) => {
        //         if (!Array.isArray(value)) {
        //             return false
        //         }
        //         let isValid = true;
        //         value.forEach((url) => {
        //             if (validator.isURL(url)) {
        //                 isValid = false
        //             }
        //         })
        //         return isValid;
        //     },
        //     message: "Please Provie valid image urls"
        // }
    }],

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
    }



    // quantity: {
    //     type: Number,
    //     required: true,
    //     min: [0, "Quantity can't be nagative"],
    //     validate: {
    //         validator: (value) => {
    //             const isIntegr = Number.isInteger(value)
    //             if (isIntegr) {
    //                 return true
    //             } else {
    //                 return false
    //             }
    //         }
    //     },
    //     message: "Quantity must be an integer"
    // },
    // status: {
    //     type: String,
    //     required: true,
    //     enum: {
    //         values: ["In-stock", "out-of-stock", "discontinued"],
    //         message: "status can't be {VALUE}"
    //     }
    // },
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

// productSchema.pre("save", function (next) {
//     console.log("Before saving data");
//     if (this.quantity == 0) {
//         this.status = "out-of-stock"
//     }


//     next()
// })

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
