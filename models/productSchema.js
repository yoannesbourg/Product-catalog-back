const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    photo: String,
    active: Boolean
})

const productModel = mongoose.model('product', productSchema)

module.exports = productModel