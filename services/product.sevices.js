const Product = require("../models/Product")


exports.getProductService = async () => {
    const products = await Product.find({})
    return products
};

exports.createProductService = async (data) => {
    const result = await Product.create(data);
    return result
};

exports.updateProductService = async (productId, data) => {

    // update mathod 1
    const result = await Product.updateOne({ _id: productId }, { $inc: data }, {
        runValidators: true
    })

    // update method 2
    // const product = await Product.findById(productId);
    // const result = await product.set(data).save();

    return result;
}
