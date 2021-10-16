const { User } = require("../../models/hrd/employee")
const { encrypt, decrypt } = require("../../helpers/bcrypt")
const { tokenGenerator, tokenVerifier } = require("../../helpers/jwt")
const mailService = require("../../configs/mail")

class Employee {
    //CRUD Employee
    static async addEmployee(req, res, next) {
        try {
            let obj = req.body
            if(!obj) return res.status(400).json({ success: false, message: "Data tidak berhasil direkam." })
            
            const found = await User.find({
                nama : obj.nama,
                email: obj.email
            })
            console.log(found, '--addEmployee')

            if(found[0]) {
                return res.status(400).json({
                    success: false,
                    message: "Nama dan Email sudah terdaftar"
                })
            } else {
                const newEmployee = await User.create(obj)
                return res.status(200).json({
                    success: true,
                    message: "Berhasil menambahkan karyawan baru!",
                    data: newEmployee
                })
            }
        } catch (error) {
            next(error)
        }
    }
    static async getEmployee(req, res, next){
        try {
            const found = await User.findOne({ _id: req.userData._id })
            if (!found) {
                return res.status(404).json({
                    success: false,
                    message: "Data karyawan tidak ditemukan"
                })
            } else {
                return res.status(200).json({
                    success: true, 
                    message: "Berhasil mengambil data karyawan",
                    data: found
                })
            }
        } catch (error) {
            next(error)
        }
    }
    static async getEmployees(req, res, next){
        try {
            const found = await User.find(
                {
                    $or: [{ _id: req.params._id}, { _id: null || undefined }]
                },{
                    $or: [{ nama: req.params.nama}, { nama: null || undefined }]
                },{
                    $or: [{ divisi: req.params.divisi}, { divisi: null || undefined }]
                }
            )
            if (!found[0]) {
                return res.status(404).json({
                    success: false,
                    message: "Data karyawan tidak ditemukan"
                })
            } else {
                return res.status(200).json({
                    success: true, 
                    message: "Berhasil mengambil data karyawan",
                    data: found
                })
            }
        } catch (error) {
            next(error)
        }
    }
    static async editEmployee(req, res, next) {
        try {
            const { _id } = req.userData
            const updateEmployee =  await User.findByIdAndUpdate( _id, { $set: req.body }, { new: true })
            if(updateEmployee === null || undefined) return res.status(400).json({ success: false, message: "Gagal mengubah profil karyawan" })
            return res.status(200).json({
                success: true,
                message: "Data karyawan berhasil diupdate",
                data: updateEmployee
            })
        } catch (error) {
            next(error)
        }
    }
    static async deleteEmployee(req, res, next) {
        try {
            const { id } = req.params
            if(!id) return next({ message: "Param ID tidak ditemukan. Apakah Anda memasukkan id yang benar ?" })
            
            await User.findByIdAndRemove(id, (error, doc, result) => {
                if(error) throw "Gagal menghapus data!"
                if(!doc) return res.status(404).json({ 
                    success: false, 
                    message: "Data tidak ditemukan"
                })

                return res.status(200).json({
                    success: true, 
                    message: "Berhasil menghapus data",
                    data: doc
                })
            })
        } catch (error) {
            next(error)
        }
    }
    //Forgot Password
    static async forgotPassViaEmail(req, res, next){
        try {
            isExist = await User.find({ email })
            if(!isExist || !isExist[0]) return res.status(404).json({ success: false, message: "Akun karyawan tidak ditemukan!" })
            let data = {
                _id: isExist._id,
                email: isExist.email,
                nama: isExist.nama,
                nomorKaryawan: isExist.nomorKaryawan
            }
            const token = encrypt(data)

            //send email
            const link = URL + ':' + PORT + '/lupa-password/' + token;
            let email = {
                from : 'MING',
                to : data.email,
                subject: 'Mengubah Password',
                html: `Ketuk link untuk mengubah password
                <br />
                <a target="_blank" href="${link}">Ubah password saya</a>
                <br />
                <br />
                Terima kasih!
                <br />
                MING 2021
                `
            }
            mailService.sendMail(mailOptions)
            return res.status(200).json({
                success: true, 
                message: "Permintaan mengubah password diterima!"
            })
        } catch (error) {
            next(error)
        }
    }
    //Verify forgot password
    static async verifyForgotPass(req, res, next) {
        try {
            const { token } = req.params
            let data = tokenVerifier(token)
            console.log(data)
            return res.sendFile('forgotPass.html', { root: './src/views' })
        } catch (error) {
            next(error)
        }
    }
    //Change Password
    static async changePass(req, res, next) {
        try {
            let data = req.userData
            console.log(data)
            
            let password = null;
            if(req.body.password != null) {
                password = encrypt(req.body.password)
                console.log(password)
            }
            const updateEmployee =  await User.findByIdAndUpdate( _id, { $set: password }, { new: true })
            console.log(updateEmployee)
            return res.status(200).json({
                success: true,
                message: "Berhasil mengubah password. Silahkan login melalui halaman login.",
                data: updateEmployee
            })
        } catch (error) {
            next(error)
        }
    }
    //Paging list users
    static async paging(req, res, next) {
        try {
            const limit = req.query.limit;
            const page = req.query.page;
            const start = (page - 1) * limit;
            const end = page * limit;

            let found = await User.find()
            let result = found.slice(start, end)

            return res.status(200).json({
                success: true,
                message: "Menampilkan data",
                data: {
                    jumlah_karyawan: limit,
                    nomor_halaman: page,
                    total: result.length,
                    maks_halaman: Math.ceil(found.lenght/limit),
                    data: result
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = { Employee }