const mongoose = require('mongoose');
const { Schema } = mongoose;

const formLemburSchema = new Schema({
    karyawan: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    jamMulaiLembur: {
        type: String,
        required: true
    },
    jamSelesaiLembur: {
        type: String,
        required: true
    },
    tanggalLembur: {
        type: String,
        required: true
    },
    shiftCode: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: [
            "Menunggu Persetujuan Manager Divisi",
            "Disetujui"
        ]
    }
}, { timestamps: true, versionKey: false })

exports.FormLembur = mongoose.model("FormLembur", formLemburSchema)
