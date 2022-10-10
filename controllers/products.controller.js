const { getProductService, createProductService, updateProductService, bulkupdateProductService, deleteProductService, bulkDeleteService } = require("../services/product.sevices")

exports.createProduct = async (req, res, next) => {
    try {
        // save or post


        const result = await createProductService(req.body)
        result.logger()

        // save 
        // const product = new Product(req.body)

        // instance creation  > do something > save()

        // if (product.quantity == 0) {
        //     product.status = "out-of-stock"
        // }

        // const result = await product.save()
        res.status(200).json({
            status: true,
            message: "Data Insertade true",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: false,
            message: "data is not inseted",
            error: error.message,
        })
        console.log(error.message.name)
    }

}





exports.getProductds = async (req, res, next) => {

    try {
        // const product = await Product.find({ status: { $ne: "out-of-stock" } })
        // const product = await Product.find({ quantity: { $gt: 100 } })
        // const product = await Product.find({ quantity: { $gte: 100 } })
        // const product = await Product.find({ name: { $in: ["bag", "keyboard"] } })
        // const product = await Product.find({}, 'name quantity') // projection
        // const product = await Product.find({}, '-name -quantity') // projection
        // const product = await Product.find({}).sort({ quantity: -1 }) // projection


        let filters = { ...req.query };
        // console.log(filters);
        const exclidefildes = ["sort", "page", "limit"]
        exclidefildes.forEach(field => delete filters[field])


        // gt, lt, get, lte,
        let filtersString = JSON.stringify(filters);
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        filters = JSON.parse(filtersString)

        // 7-5
        const queries = {}

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ')
            queries.sortBy = sortBy;
            console.log(sortBy);
        }
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ')
            queries.fields = fields;
            console.log(fields);
        }
        if (req.query.page) {
            const { page = 1, limit = 2 } = req.query;
            const skip = (page - 1) * parseInt(limit)
            queries.skip = skip;
            queries.limit = parseInt(limit)
        }
        console.log(queries);


        const products = await getProductService(filters, queries)
        res.status(200).json({
            status: true,
            message: "Successfully get data",
            data: products

        })



    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Can't get the data",
            error: error.message
        })
    }

}



exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await updateProductService(id, req.body);

        res.status(200).json({
            status: true,
            message: "Successfully product updated",
            result: result
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Cant't  update product",
            error: error.message
        })

    }
};



exports.bulkUpdateProduct = async (req, res, next) => {
    try {
        console.log(req.body);
        const result = await bulkupdateProductService(req.body);

        res.status(200).json({
            status: true,
            message: "Successfully product updated",
            result: result
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Cant't  update bulk product",
            error: error.message
        })

    }
};



exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await deleteProductService(id);
        if (!result.deletedCount) {
            return res.status(400).json({
                status: false,
                error: "Couldn't delete the product"
            })
        }

        res.status(200).json({
            status: true,
            message: "Successfully product deleted",
            result: result
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "product Cant't  deleted",
            error: error.message
        })

    }
};





exports.bulkDeleteProduct = async (req, res, next) => {
    try {
        const result = await bulkDeleteService(req.body.ids);

        if (!result.deletedCount) {
            return res.status(400).json({
                status: false,
                error: "Couldn't delete the product"
            })
        }

        res.status(200).json({
            status: true,
            message: "Successfully deleted the given product product",
            result: result
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Couldn't  Deleted bulk product",
            error: error.message
        })

    }
};
