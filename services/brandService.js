const Brand = require("../models/Brand")

exports.createBrandService = async (data) => {
    console.log(data);
    const result = await Brand.create(data)
    return result
}

exports.getBrandService = async () => {
    const brands = await Brand.find({}).select("-product -supplier")
    return brands
}
//  get a brand
exports.getBrandIdService = async (id) => {
    const brand = await Brand.findOne({ _id: id });
    return brand
}


// update a brand 
exports.updateBrandIdService = async (id, data) => {
    const result = await Brand.updateOne({ _id: id }, data, { runValidators: true });
    return result
}
