const { decrypt } = require('../helpers/bcrypt');
const { tokenGenerator } = require('../helpers/jwt');
const { User } = require('../models/hrd/employee')

async function login(req, res, next){
    try {
        const {email, password} = req.body;
        if(!email || !password) return res.status(400).json({
            success: false,
            message: "Kolom email dan password tidak dapat kosong"
        })

        const found = await User.findOne({ email })
        if(!found) return res.status(404).json({
            success: false,
            message: "Akun tidak ditemukan. Apakah Anda memasukkan email yang benar?"
        })

        if(decrypt(password, found.password)) {
            return res.status(404).json({
                success: true,
                message: "Login berhasil.",
                token : tokenGenerator(found)
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "Password salah. Silahkan memasukkan password yang benar."
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { login }