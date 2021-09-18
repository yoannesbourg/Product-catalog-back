require('dotenv').config()
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")

//middleware
app.use(cors())
app.use(express.json())

//connect to db
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

//model
const productSchema = mongoose.Schema({
    description: String
})

const productModel = mongoose.model('product', productSchema)

//ROUTES

//Create a product
app.post("/product", async (req, res) => {
    try {
        const { description } = req.body
        const newProduct = new productModel({
            description: description
        })
        const result = await newProduct.save()
        return res.json(result)
    } catch (error) {
        console.error(error.message)
    }
})

//get all products
app.get("/products", async (req, res) => {
    try {
        const product = await productModel.find()
        res.json(product)
    } catch (error) {
        console.error(error.message)
    }
})

//get a single product
app.get("/product/:id", async (req, res) => {
    try {
        const product = await productModel.findOne({ _id: id })
        res.json(product)
    } catch (error) {
        console.error(error.message)
    }
})

//update a product
app.put("/product/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body
        const updateProduct = await productModel.updateOne({ _id: id }, {
            $set: {
                description
            }
        })
        return res.json(updateProduct)
    } catch (error) {
        console.error(error.message)
    }
})

//delete a product
app.delete("/product/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deleteProduct = await productModel.updateOne({ _id: id })
        res.json(deleteProduct)
    } catch (error) {
        console.error(error.message)
    }
})

app.listen(5000, () => {
    console.log(`server has started on port ${process.env.PORT}`)
})
