const { User } = require("../../models/hrd/employee")
const { encrypt, decrypt } = require("../../helpers/bcrypt")
const { tokenGenerator, tokenVerifier } = require("../../helpers/jwt")
const mailService = require("../../configs/mail")

class Form {
    //CRUD Form
    // 1. Form Visit dan Entertain Client
    // 2. Form Izin & Sakit & Lembur & Tidak Kembali ke Kantor & Permohonan Cuti
}

module.exports = { Form }