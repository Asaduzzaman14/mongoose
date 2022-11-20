const jwt = require('jsonwebtoken');

const { promisify } = require("util")

/**
 * 1 check if token exist 
 * 2 if token not found on browser (localstorage or others) send res
 * 3 if token found now decode the token
 * 4 if token valid then call next()
 */


module.exports = async (req, res, next) => {

    try {
        //* 1 check if token exist 

        const token = req?.headers?.authorization?.splite(' ')?.[1]


        // * 2 if token not found on browser (localstorage or others) send res

        if (!token) {
            return res.status(401).json({
                status: 'fail',
                error: 'you are not loged in'
            })
        }

        // const decoded = await jwt.varify(()=>{})
        // * 3 if token found now decode the token

        const decoded = await promisify(jwt.varify)(token, process.env.SECRET_TOKEN)

        // const user = User.findOne({ email: decoded.email })

        // * 4 if token valid then call next()
        req.user = decoded;
        next()

    } catch (error) {
        res.status(403).json({
            status: "fail",
            error: "Invalid Token"
        })

    }

}