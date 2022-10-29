const { createSupplierService, getSupplierService, getSupplierIdService, updateSupplierIdService } = require("../services/supplier.services")


// post a brnad to database

exports.createSupplier = async (req, res) => {
    try {
        const result = await createSupplierService(req.body);
        res.status(200).json({
            status: "success",
            message: "Successfuly created the Supplier",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Could't create Supplier",
            error: error.message
        })
    }
}


// get all Supplier from database
exports.getSuppliers = async (req, res, next) => {
    try {
        const supplier = await getSupplierService(req.body);
        res.status(200).json({
            status: "success",
            message: "Successfuly get Supplier",
            data: supplier
        })

    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Could't create Supplier",
            error: error.message
        })
    }
}

// get  Supplier By Id from database
exports.getSupplierById = async (req, res, next) => {
    try {

        const { id } = req.params
        const supplier = await getSupplierIdService(id);
        if (!supplier) {
            res.status(400).json({
                status: false,
                message: "Could't found Supplier",
                error: error.message
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfuly get Supplier",
            data: supplier
        })

    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Could't found Supplier",
            error: error.message
        })
    }
}

// update Supplier By Id from database
exports.updateSupplier = async (req, res, next) => {
    try {

        const { id } = req.params
        const result = await updateSupplierIdService(id, req.body);
        console.log(result);
        if (!result.modifiedCount) {
            res.status(400).json({
                status: false,
                message: "Could't update the Supplier with this id",
                error: error.message
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfuly update the  Supplier",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Could't update tha result",
            error: error.message
        })
    }
}