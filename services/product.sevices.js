const Product = require("../models/Product")


exports.getProductService = async (filters, queries) => {

    const products = await Product.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select((queries.fields))
        .sort(queries.sortBy)
    const totalProduct = await Product.countDocuments(filters)
    const pageCount = Math.ceil(totalProduct / queries.limit)

    return { totalProduct, pageCount, products }
};

exports.createProductService = async (data) => {
    const result = await Product.create(data);
    return result
};

exports.updateProductService = async (productId, data) => {

    // update mathod 1
    const result = await Product.updatene({ _id: productId }, { $inc: data }, {
        runValidators: true
    })

    // update method 2
    // const product = await Product.findById(productId);
    // const result = await product.set(data).save();

    return result;
}


//  bulk update

exports.bulkupdateProductService = async (data) => {
    // console.log(data);
    // const result = await Product.updateMany({ _id: data.ids }, data.data, {
    //     runValidators: true
    // })
    // return result;

    const products = []
    data.ids.forEach(product => {
        console.log(product.id, product.data);
        products.push(Product.updateOne({ _id: product.id }, product.data));

    });

    const result = await Promise.all(products)

    return result


}


exports.deleteProductService = async (id) => {
    console.log(id);
    const result = await Product.deleteOne({ _id: id })
    return result
}


exports.bulkDeleteService = async (id) => {
    console.log(id);
    const result = await Product.deleteMany({ _id: id })
    return result
}