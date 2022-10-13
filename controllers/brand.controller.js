const { createBrandService, getBrandService, getBrandIdService, updateBrandIdService } = require("../services/brandService")


// post a brnad to database

exports.createBrand = async (req, res) => {
    try {
        const result = await createBrandService(req.body);
        res.status(200).json({
            status: "success",
            message: "Successfuly created the Brand",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Could't create brand",
            error: error.message
        })
    }
}


// get all brands from database
exports.getBrands = async (req, res, next) => {
    try {
        const brands = await getBrandService(req.body);
        res.status(200).json({
            status: "success",
            message: "Successfuly get Brands",
            data: brands
        })

    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Could't create brand",
            error: error.message
        })
    }
}

// get  brands By Id from database
exports.getBrandById = async (req, res, next) => {
    try {

        const { id } = req.params
        const brand = await getBrandIdService(id);
        if (!brand) {
            res.status(400).json({
                status: false,
                message: "Could't found brand",
                error: error.message
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfuly get Brand",
            data: brand
        })

    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Could't found brand",
            error: error.message
        })
    }
}

// update brand By Id from database
exports.updateBrand = async (req, res, next) => {
    try {

        const { id } = req.params
        const result = await updateBrandIdService(id, req.body);
        console.log(result);
        if (!result.modifiedCount) {
            res.status(400).json({
                status: false,
                message: "Could't update the brand with this id",
                error: error.message
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfuly update the  Brand",
            data: brand
        })

    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Could't update tha brand",
            error: error.message
        })
    }
}