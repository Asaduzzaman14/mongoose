const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');



// middleware
app.use(express.json());
app.use(cors())


// SCHEMA > MODEL > QUERY 

// Schema design
const producrSchema = mongoose.Schema({
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

producrSchema.pre("save", function (next) {
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

producrSchema.methods.logger = function () {
    console.log(`Data save for ${this.name}`);
}




// model

const Product = mongoose.model("product", producrSchema)




app.get("/", (req, res) => {
    res.send("Rouret is warking!")
})


// post to database
app.post("/api/v1/product", async (req, res, next) => {

    try {
        // save or post



        //  post
        const result = await Product.create(req.body)

        result.logger()

        // save 
        // const product = new Product(req.body)

        // instance creation  > do something > save()

        // if (product.quantity == 0) {
        //     product.status = "out-of-stock"
        // }

        // const result = await product.save()
        res.status(200).json({
            status: true,
            message: "Data Insertade true",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: false,
            message: "data is not inseted",
            error: error.message,
        })
        console.log(error.message.name)
    }
})








module.exports = app