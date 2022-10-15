const { createCatagoryService, getCatagoryService } = require("../services/catagory.services");


exports.createCatagory = async (req, res) => {
    try {
        const result = await createCatagoryService(req.body);
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


// get all catagory from database
exports.getCatagory = async (req, res, next) => {
    try {
        const brands = await getCatagoryService();
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
