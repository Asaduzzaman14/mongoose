const Store = require("../models/Store")

// create a new new store

exports.createStoreService = async (data) => {
    console.log(data);
    const result = await Store.create(data)
    return result
}

// get all stores
exports.getStoresService = async () => {
    const stores = await Store.find({})
    return stores
}

//  get a store by id

exports.getStoreIdService = async (id) => {
    const store = await Store.findOne({ _id: id });
    return store
}

