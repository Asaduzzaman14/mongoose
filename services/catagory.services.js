const Catagory = require("../models/Catagory")


exports.createCatagoryService = async (data) => {
    console.log(data);
    const result = await Catagory.create(data)
    return result
}

// get all stores
exports.getCatagoryService = async () => {
    const stores = await Catagory.find({})
    return stores
}
