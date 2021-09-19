require('dotenv').config()
const apiRoutes = require("./api");

const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const productModel = require("./models/productSchema")

//middleware
app.use(cors())
app.use(express.json())

//connect to db
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use("/api", apiRoutes);

app.listen(5000, () => {
    console.log(`server has started on port ${process.env.PORT}`)
})
