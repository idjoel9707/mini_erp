const mongoose = require('mongoose');
const { Schema } = mongoose;

const prospectClientSchema = new Schema({
    namaClient: {
        type: String,
        required: true
    },
    perusahaan: {
        type: String,
        required: true
    },
    jenisKelamin: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    alamat: {
        type: String,
        required: true
    },
    nomorTelp: {
        type: String,
        required: true
    },
    picInSales: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        required: true
    },
    isProspect: {
        type: String,
        required: true
    }
}, { timestamps: true, versionKey: false })

exports.ProsClient = mongoose.model("ProsClient", prospectClientSchema)
