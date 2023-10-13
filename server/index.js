require("dotenv").config()
const express = require('express')
const app = express()
const cors = require("cors")
const port = process.env.PORT
const url = process.env.URL
const mongoose = require("./DB")
const {router} = require("./routes/index")
const bodyParser = require("body-parser")
const multer = require("multer")
const upload = multer()
const path = require("path")
const fileUpload = require("express-fileupload")

app.use(fileUpload())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(cors())
app.use(express.urlencoded())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use("/api", router)
app.use(upload.array())
app.use(express.static("public"))

async function start(){
    try {
        await mongoose.connect(url)
        app.listen(port, () => console.log(`Started`))
    } catch (error) {
        console.log(error);
    }
    }
start()