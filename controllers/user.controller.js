const { signupService, fiendEmailByEmail } = require("../services/userServices")
const bcrypt = require('bcryptjs');
const { generateToken } = require("../utils/token");

exports.signup = async (req, res) => {
    try {
        const user = await signupService(req.body)
        res.status(200).json({
            status: "Success",
            message: 'Successfully signed up'
        })

    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: error.message
        })
    }
}

/** 
 * check email and password are given
 * lode user with email
 * if not user  send response
 * compare password
 * if wrong password send response
 * check user active
 * if not active send res
 * genetate token
 * send user and token
*/



exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                error: 'please provide your credentials'
            })
        };


        const user = await fiendEmailByEmail(email)
        if (!user) {
            return res.status(401).json({
                status: 'fail',
                error: 'user Not found'
            })
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password)

        if (!isPasswordValid) {
            return res.status(403).json({
                status: 'fail',
                error: 'user is not valid'
            })
        }

        if (user.status != 'active') {
            return res.status(401).json({
                status: 'fail',
                error: 'you acount is not active'
            })
        }

        const token = generateToken(user)

        const { password: pass, ...others } = user.toObject();

        res.status(200).json({
            status: 'success',
            message: 'succesfully loged in',
            data: {
                user: others,
                token
            }
        })


    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: error.message
        })
    }
}