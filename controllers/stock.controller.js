const {
    getStockService,
    createStockService,
    deleteStockService,
    updateStockService,
    getStockByIdService

} = require("../services/Stock.sevices")

exports.createStock = async (req, res, next) => {
    try {
        // save or post
        const result = await createStockService(req.body)
        result.logger()
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





exports.getStocks = async (req, res, next) => {

    try {

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


        const Stocks = await getStockService(filters, queries)
        res.status(200).json({
            status: true,
            message: "Successfully get data",
            data: Stocks

        })



    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Can't get the data",
            error: error.message
        })
    }

}
exports.getStockById = async (res, req) => {
    try {
        const { id } = req.params;
        const stock = await getStockByIdService(id)

        if (!stock) {
            return res.status(400).json({
                status: false,
                error: "Cant't  get Stock with this ID",
            })
        }

        res.status(200).json({
            status: true,
            message: "Successfully get Stock ",
            result: stock
        })
    }
    catch (error) {
        res.status(400).json({
            status: false,
            message: "Cant't  get Stock",
            error: error.message
        })
    }

}

exports.updateStock = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await updateStockService(id, req.body);

        res.status(200).json({
            status: true,
            message: "Successfully Stock updated",
            result: result
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Cant't  update Stock",
            error: error.message
        })

    }
};




exports.deleteStock = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await deleteStockService(id);
        if (!result.deletedCount) {
            return res.status(400).json({
                status: false,
                error: "Couldn't delete the Stock"
            })
        }

        res.status(200).json({
            status: true,
            message: "Successfully Stock deleted",
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




