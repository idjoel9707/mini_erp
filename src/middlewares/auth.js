const { decode } = require("jsonwebtoken");
const { tokenVerifier } = require("../helpers/jwt")

class Access {
    static async authentication(req, res, next){
        const token = req.headers.token;
        if(!token){
            return res.status(400).json({
                success: false,
                message: "Token tidak ditemukan"
            })
        } else {
            try {
                const decoded = tokenVerifier(token)
                console.log(decoded, '--hasil decoded')
                req.userData = decoded
                next()
            } catch (error) {
                next(error)
            }
        }
    }
    static async authorization(req, res, next){
        const token = req.headers.token;
        if(!token){
            return res.status(400).json({
                success: false,
                message: "Token tidak ditemukan"
            })
        } else {
            try {
                const decoded = tokenVerifier(token)
                console.log(decoded, '--hasil decoded')
                // if(decoded.role)
                req.userData = decoded
                next()
            } catch (error) {
                next(error)
            }
        }
    }
}

module.exports = { Access }