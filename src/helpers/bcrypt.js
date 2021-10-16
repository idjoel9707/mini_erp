const bcrypt = require("bcrypt");
const saltRound = Number(process.env.SALT_ROUND)

const encrypt = data => bcrypt.hashSync(data, saltRound)
const decrypt = (data, userData) => bcrypt.compareSync(data, userData)

module.exports = {
    encrypt,
    decrypt
}