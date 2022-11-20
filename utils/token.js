const jwt = require('jsonwebtoken');


exports.generateToken = (userInfo) => {
    const paylode = {
        email: userInfo.email,
        role: userInfo.role
    };

    const token = jwt.sign(paylode, process.env.SECRET_TOKEN, {
        expiresIn: '7days'
    })
    return token
}