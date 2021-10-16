const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema({
    namaRole: {
        type: String,
        required: true
    },
    deskRole: {
        type: String,
        required: true
    }
}, { timestamps: true, versionKey: false })

exports.Role = mongoose.model("Role", roleSchema)
