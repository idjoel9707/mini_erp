const mongoose = require('mongoose');
const { Schema } = mongoose;

const armadaSchema = new Schema({
    tipeArmada: {
        type: String
    },
    nomorPlatArmada: {
        type: String
    },
    nomorSTNK: {
        type: String
    },
    tanggalHabisSTNK: {
        type: String
    },
    terakhirService: {
        type: String
    },
    serviceSelanjutnya: {
        type: String
    },
    terakhirBeroperasi: {
        type: String
    },
    status: {
        type: String
    }
})

exports.Armada = mongoose.model("Armada", armadaSchema)
