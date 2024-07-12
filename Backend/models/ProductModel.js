const mongoose  = require('mongoose')

const userSchema = new mongoose.Schema({
    productName: String,
    brandName: String,
    productImage: [],
    description: String,
    catagory: String,
    price: Number,
    selling: Number,
    date: { 
        type: Date, 
        default: Date.now },
})

const PeoductModel = mongoose.model('product' , userSchema)

module.exports = PeoductModel
