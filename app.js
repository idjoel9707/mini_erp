const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const routes = require("./src/routes/index")
const mongoose = require('mongoose')
app.use(cors())
let swaggerDocument = require('./swagger.json')
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: 100000000000}))
app.use(express.static('public'))
const server = http.createServer(app)
const io = require('socket.io')(server)
const dotenv = require('dotenv')
dotenv.config()

routes(app)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const mongoURI = process.env.MONGOURI;

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, err => {
    if(err) throw err;
    console.log('Connected to MongoDB!')
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", () => console.log("Lets ROCK n ROLL Baby!!!"));

const PORT = process.env.PORT || 7000
server.listen(PORT)
console.log('ERP-be Run on port: ' + PORT);