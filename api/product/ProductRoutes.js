
// Required modules
const express = require("express");
const app = express();

const productModel = require("../../models/productSchema")

//Create a product
app.post("/create", async (req, res) => {
    try {
        const { name, description, price, photo, active } = req.body
        const newProduct = new productModel({
            name, description, price, photo, active
        })
        const result = await newProduct.save()
        return res.json(result)
    } catch (error) {
        console.error(error.message)
    }
})

//get all products
app.get("/", async (req, res) => {
    try {
        const product = await productModel.find()
        res.json(product)
    } catch (error) {
        console.error(error.message)
    }
})

//get a single product
app.get("/:id", async (req, res) => {
    try {
        const product = await productModel.findOne({ _id: id })
        res.json(product)
    } catch (error) {
        console.error(error.message)
    }
})

//update a product
app.put("/update/:id", async (req, res) => {
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
app.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deleteProduct = await productModel.deleteOne({ _id: id })
        res.json(deleteProduct)
    } catch (error) {
        console.error(error.message)
    }
})

module.exports = app