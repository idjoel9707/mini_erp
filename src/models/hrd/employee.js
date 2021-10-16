const mongoose = require('mongoose');
const { encrypt } = require('../../helpers/bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema({
    nama: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    tanggalLahir: {
        type: String,
        required: true
    },
    nomorKaryawan: {
        type: String,
        uppercase: true,
        required: true
    },
    jenisKelamin: {
        type: String,
        required: true,
        enum: ['Laki-laki', 'Perempuan', 'Lainnya']
    },
    foto: {
        type: String
    },
    email: {
        type: String
    },
    alamat: {
        type: String,
        required: true
    },
    posisi: {
        type: String,
        required: true
    },
    supervisor: {
        type: String,
        required: true
    },
    tanggalBergabung: {
        type: String,
        required: true
    },
    nomorTelp: {
        type: Number,
        required: true
    },
    nomorSIM: {
        type: String
    },
    noKontakDarurat: {
        type: String,
        required: true
    },
    namaKontakDarurat: {
        type: String,
        required: true
    },
    statusKaryawan: {
        type: String,
        default: 'Aktif'
    },
    tanggalBerakhirKontrak: {
        type: String,
        required: true
    },
    divisi: {
        type: String,
        required: true
    },
    role : {
        type: Array
    }
}, { timestamps: true, versionKey: false })

userSchema.pre("save", async function(next) {
    let user = this;
    if(user.password && user.isModified("password")) {
        user.password = await encrypt(user.password)
    }
    next()
})

exports.User = mongoose.model("User", userSchema)
