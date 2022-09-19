const { getProductService, createProductService, updateProductService } = require("../services/product.sevices")

exports.createProduct = async (req, res, next) => {
    try {
        // save or post


        const result = await createProductService(req.body)
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

}





exports.getProductds = async (req, res, next) => {

    try {
        // const product = await Product.find({ status: { $ne: "out-of-stock" } })
        // const product = await Product.find({ quantity: { $gt: 100 } })
        // const product = await Product.find({ quantity: { $gte: 100 } })
        // const product = await Product.find({ name: { $in: ["bag", "keyboard"] } })
        // const product = await Product.find({}, 'name quantity') // projection
        // const product = await Product.find({}, '-name -quantity') // projection
        // const product = await Product.find({}).sort({ quantity: -1 }) // projection

        const products = await getProductService()
        res.status(200).json({
            status: true,
            message: "Successfully get data",
            data: products

        })



    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Can't get the data",
            error: error.message
        })
    }

}



exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await updateProductService(id, req.body);

        res.status(200).json({
            status: true,
            message: "Successfully product updated",
            result: result
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Cant't  update product",
            error: error.message
        })

    }
}