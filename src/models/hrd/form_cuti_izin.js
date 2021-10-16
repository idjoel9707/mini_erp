const mongoose = require('mongoose');
const { Schema } = mongoose;

const formCISchema = new Schema({
    tipePermintaan: {
        type: String,
        required: true
    },
    karyawan: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    jenisCuti: {
        type: String,
        required: true
    },
    tanggalMulaiCuti: {
        type: String,
        required: true
    },
    tanggalSelesaiCuti: {
        type: String,
        required: true
    },
    jumlahHari: {
        type: String,
        required: true
    },
    pesan: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: [
            "Menunggu Persetujuan Manager Divisi",
            "Menunggu Persetujuan HR",
            "Disetujui"
        ]
    }
}, { timestamps: true, versionKey: false })

exports.FormCI = mongoose.model("FormCI", formCISchema)
