const Stock = require("../models/Stock")


exports.getStockService = async (filters, queries) => {

    const sotcks = await Stock.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select((queries.fields))
        .sort(queries.sortBy)

    const totalStock = await Stock.countDocuments(filters)
    const pageCount = Math.ceil(totalStock / queries.limit)

    return { totalStock, pageCount, sotcks }
};

exports.createStockService = async (data) => {
    const stock = await Stock.create(data);

    // step 1 get Brand
    const { _id: stockId, brand } = stock;

    console.log(stockId)
    console.log(brand)
    //  update brand modal
    const res = await Brand.updateOne(
        { _id: brand.id },
        { $push: { sotcks: stockId } }
    )
    return stock
};

exports.getStockByIdService = async (stockId) => {
    // const stock = await Stock.findOne({ _id: stockId })
    //     .populate('store.id')
    //     .populate('suppliedBy.id')
    //     .populate('brand.id');

    const stock = await Stock.aggregate([
        { $match: { _id: ObjectId(stockId) } },
        {
            $lookup: {
                from: "brand",
                localField: 'brand.name',
                foreignField: "name",
                as: "brandDetails"
            }
        }
    ])

    return stock;
}

exports.updateStockService = async (stockId, data) => {

    // update mathod 1
    const result = await Stock.updatene({ _id: stockId }, { $inc: data }, {
        runValidators: true
    })

    // update method 2
    // const product = await Product.findById(productId);
    // const result = await product.set(data).save();

    return result;
}


exports.deleStockService = async (id) => {
    console.log(id);
    const result = await Stock.deleteOne({ _id: id })
    return result
}

