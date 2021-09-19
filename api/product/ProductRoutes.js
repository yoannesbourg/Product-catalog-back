
// Required modules
const express = require("express");
const app = express();

const productModel = require("../../models/productSchema")

//Create a product
app.post("/create", async (req, res) => {
    try {
        const { name, description, price, photo, active } = req.body.newProduct
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

//get all products
app.get("/filter/:active", async (req, res) => {
    try {
        if (!req.params) {
            return res.json({
                status: 400,
                message: 'mising params'
            })
        }
        let active

        if (req.params === 'true') {
            active = true
        } else if (req.params === 'false') {
            active = false
        }
        console.log(req.params)
        const product = await productModel.find({active: {$eq: active}})
        res.json(product)
    } catch (error) {
        console.error(error.message)
    }
})

//get a single product
app.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
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
        const { name, description, price, photo, active } = req.body.newValues
        const updateProduct = await productModel.updateOne({ _id: id }, {
            $set: {
                name, description, price, photo, active
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