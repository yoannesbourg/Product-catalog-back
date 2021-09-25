const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    photo: String,
    active: Boolean
})

module.exports = mongoose.model('product', productSchema)