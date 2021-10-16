const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobOrderSchema = new Schema({
    karyawan: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, { timestamps: true, versionKey: false })

exports.JobOrder = mongoose.model("JobOrder", jobOrderSchema)