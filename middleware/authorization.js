const middleware = (req, re, next) => {
    next()
}

module.exports = (...role) => {

    return (req, res, next) => {
        const userRole = req.user.role
        if (!role.includes(userRole)) {
            return res.status(403).json({
                status: 'fail',
                error: 'you are not authorize to access this'
            })
        }

        next()
    }

}