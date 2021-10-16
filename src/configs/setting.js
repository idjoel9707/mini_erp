const dotenv = require('dotenv')
dotenv.config()
module.exports = {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT,
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  XENDIT: process.env.SECRET_API_KEY,
  XENDIT_PROD: process.env.XENDIT_PRODUCTION,
  MAIL: process.env.EMAIL,
  PASSEMAIL: process.env.PASSEMAIL,
  REDIS_PORT: process.env.REDIS_PORT,
  URL: process.env.URL,
  GEO_API: process.env.GOOGLE_API_GEO
}