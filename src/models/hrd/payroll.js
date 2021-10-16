const mongoose = require('mongoose');
const { Schema } = mongoose;

const payrollSchema = new Schema({
    karyawan: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    jumlah: {
        type: String
    },
    gajiPokok: {
        type: String
    },
    bonusTahunan: {
        type: String
    },
    komisi: {
        type: String
    },
    lembur: {
        type: String
    },
    rapelGaji: {
        type: String
    },
    selisihLembur: {
        type: String
    },
    selisihPotonganGaji: {
        type: String
    },
    tambahanBonus: {
        type: String
    },
    thr: {
        type: String
    },
    tunjanganJabatan: {
        type: String
    },
    tunjanganMakan: {
        type: String
    },
    tunjanganOperasional: {
        type: String
    },
    tunjanganPerumahan: {
        type: String
    },
    tunjanganTransport: {
        type: String
    },
    uangShift: {
        type: String
    },
    uangTunggu: {
        type: String
    },
    bpjsKesehatan: {
        type: String
    },
    bpjsPensiun: {
        type: String
    },
    bpjsTK: {
        type: String
    },
    cicilanHP: {
        type: String
    },
    koperasi: {
        type: String
    }
}, { timestamps: true, versionKey: false })

exports.Payroll = mongoose.model("Payroll", payrollSchema)
