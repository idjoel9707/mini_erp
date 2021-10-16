const mongoose = require('mongoose');
const { Schema } = mongoose;

const attendanceSchema = new Schema({
    karyawan: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    namaLokasiKerja: {
        type: String,
        required: true
    },
    geolokasiKerja: {
        type: String,
        required: true
    },
    tanggal: {
        type: String,
        required: true
    },
    shiftCode: {
        type: String
    },
    jamMasukKerja: {
        type: String,
        required: true
    },
    jamSelesaiKerja: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    statusLain: {
        type: String
    },
    pesan: {
        type: String,
        required: true
    }
}, { timestamps: true, versionKey: false })

exports.Attendance = mongoose.model("Attendance", attendanceSchema)
