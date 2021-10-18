const { Attendance } = require("../../models/hrd/attendance")
const { encrypt, decrypt } = require("../../helpers/bcrypt")
const { tokenGenerator, tokenVerifier } = require("../../helpers/jwt")
const mailService = require("../../configs/mail")
const  { GEO_API } = require("../../configs/setting")
const axios = require("axios")

class Attend {
    static async masukKerja(req, res, next) {
        try {
            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth() + 1;
            let yyyy = today.getFullYear();
            let hh = today.getHours();
            let mn = today.getMinutes();
            let ss = today.getSeconds();
            if(dd<10) { dd='0'+dd } 
            if(mm<10) { mm='0'+mm } 
            if(hh<10) { hh='0'+hh } 
            if(mn<10) { mn='0'+mn }
            if(ss<10) { ss='0'+ss }
            const userId = req.userData._id
            const geoApi = await axios({
                method: 'post',
                url: `https://www.googleapis.com/geolocation/v1/geolocate?key=${GEO_API}`,
            })
            const attend = await Attendance.create({
                karyawan: userId,
                namaLokasiKerja: req.body.lokasi,
                geolokasiKerja: geoApi,
                tanggal: today.toLocaleString(undefined, {weekday: 'long'}) + ', ' + dd + ' ' + today.toLocaleString(undefined, {month: 'long'}) + ' ' + today.getFullYear() ,
                shiftCode: req.body.shift,
                jamMasukKerja: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
                status: req.body.status,
                statusLain: req.body.statusLain,
                pesan: req.body.pesan
            })
            if(!attend || !attend[0]) return res.status(400).json({ success: false, message: 'Gagal melakukan absensi.' })
            return res.status(200).json({
                success: true,
                message: 'Berhasil melakukan absensi. Semangat bekerja!',
                data: attend
            })
        } catch (error) {
            next(error)
        }
    }
    static async selesaiKerja(req, res, next) {
        try {
            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth() + 1;
            let yyyy = today.getFullYear();
            let hh = today.getHours();
            let mn = today.getMinutes();
            let ss = today.getSeconds();
            if(dd<10) { dd='0'+dd } 
            if(mm<10) { mm='0'+mm } 
            if(hh<10) { hh='0'+hh } 
            if(mn<10) { mn='0'+mn }
            if(ss<10) { ss='0'+ss }
            time = yyyy + "-" + mm + "-" + dd
            const userId = req.userData._id
            const foundAttendance = await Attendance.find({
                karyawan: userId,
                createdAt: (JSON.stringify(e.created_at).slice(1,11) === time)
            })

            if(!foundAttendance || !foundAttendance[0]) return res.status(404).json({ success : false, message: 'Tidak menemukan absensi untuk hari ini.' })
            const id = foundAttendance._id
            const doneForToday = await Attendance.findByIdAndUpdate( id, 
                { $set: { jamKeluarKerja: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()} }, 
                { new: true }
                )
            return res.status(200).json({
                success: true, 
                message: "Terima kasih atas kerja kerasnya hari ini. Selamat beristirahat!",
                data: doneForToday
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = { Attend }