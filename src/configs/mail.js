const nodemailer = require('nodemailer');

const {MAIL, PASSEMAIL} = require('./setting')

const mailService = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MAIL,
    pass: PASSEMAIL
  }
});

module.exports = mailService