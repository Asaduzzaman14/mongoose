
const Supplier = require("../models/Supplier")

exports.createSupplierService = async (data) => {
    console.log(data);
    const result = await Supplier.create(data)
    return result
}

exports.getSupplierService = async () => {
    const brands = await Supplier.find({})
    return brands
}
//  get a Supplier
exports.getSupplierIdService = async (id) => {
    const supplier = await Supplier.findOne({ _id: id });
    return supplier
}


// update a Supplier
exports.updateSupplierIdService = async (id, data) => {
    const result = await Supplier.updateOne({ _id: id }, data, { runValidators: true });
    return result
}
