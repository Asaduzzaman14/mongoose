const { createStoreService, getStoresService, getStoreIdService } = require("../services/storeService");


// create a new store

exports.createStore = async (req, res) => {
    try {
        const result = await createStoreService(req.body);
        res.status(200).json({
            status: "success",
            message: "Successfuly created Store",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Could't create store",
            error: error.message
        })
    }
}


// get all stores from database
exports.getStores = async (req, res, next) => {
    try {
        const brands = await getStoresService();
        res.status(200).json({
            status: "success",
            message: "Successfuly get stores",
            data: brands
        })

    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Could't create store",
            error: error.message
        })
    }
}

// get  store By Id from database
exports.getStoreById = async (req, res, next) => {
    try {

        const { id } = req.params
        const store = await getStoreIdService(id);
        if (!store) {
            res.status(400).json({
                status: false,
                message: "Could't found store by this id",
                error: error.message
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfuly get Store",
            data: store
        })

    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Could't found store",
            error: error.message
        })
    }
}
