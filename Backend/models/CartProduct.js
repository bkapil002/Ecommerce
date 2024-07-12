const mongoose  = require('mongoose')

const userSchema = new mongoose.Schema({
    productId: {
        ref : 'product',
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        autopopulate : true,
    },
    quantity: Number,    
    userId: String,

    date: { 
        type: Date, 
        default: Date.now },
})

const CartProduct = mongoose.model('cart' , userSchema)

module.exports = CartProduct
