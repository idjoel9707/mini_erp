const express = require("express")
const router = express.Router()
const { errHand } = require("../middlewares/errHandler")
const { Employee } = require("../controllers/hrd/employees")
const { login } = require("../controllers/login")
const { Access } = require("../middlewares/auth")
const { upload } = require("../middlewares/multer")
const { Attend } = require("../controllers/hrd/attendance")

function routes(app) {
    app.use(errHand)
    app.get("/", (req, res) => {
        return res.status(200).json({
            status: true,
            message: "Ini ada homepage"
        })
    })
    app.post("/register", Employee.addEmployee)
    app.post("/login", login)
    app.put("/ubah-data-diri", Access.authentication, Employee.editEmployee)
    app.get("/data-diri", Access.authentication, Employee.getEmployee)
    app.get("/karyawan", Access.authentication, Employee.getEmployees)
    //attendance
    app.post("/hadir", Access.authentication, Attend.masukKerja)
    app.put("/pulang", Access.authentication, Attend.selesaiKerja)
}

module.exports = routes;