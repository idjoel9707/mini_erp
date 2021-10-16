const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: "ProsClient",
        required: true
    },
    tanggalLahirClient: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, { timestamps: true, versionKey: false })

exports.Client = mongoose.model("Client", clientSchema)
