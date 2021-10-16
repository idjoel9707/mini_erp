const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../configs/setting")

const tokenGenerator = (users) => {
    console.log(users, '--user');
    const { email, _id, role } = users;

    return jwt.sign({ email, _id, role }, JWT_SECRET)
}

const tokenVerifier = (token) => {
    return jwt.verify(token, JWT_SECRET)
}

module.exports = {
    tokenGenerator,
    tokenVerifier
}