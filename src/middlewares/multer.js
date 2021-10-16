const multer = require("multer")
const path = require("path")

const storage =  multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../../assets/public")
    },
    filename: (req, file, cb) => {
        console.log(req, '-- di multer')
        cb(null, file.fieldname + '.' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

module.exports = { upload }