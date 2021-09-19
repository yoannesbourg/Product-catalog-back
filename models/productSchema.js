const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    description: String
})

const productModel = mongoose.model('product', productSchema)

module.exports = productModel