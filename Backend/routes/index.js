const express = require('express');
const routes = express.Router();
const userSignUpController = require ("../controler/userSignUp.js")
const userSignInController = require("../controler/userSignin.js")
const userDataControler = require("../controler/userData.js")
const authToken = require("../middleware/authToken.js")
const userLogout = require("../controler/userLogout.js")
const allUser = require("../controler/allUsers.js")
const updateUser = require("../controler/updateUser.js")
const userUploadeControler = require('../controler/allProduct.js')
const getproductControler = require('../controler/getProduct.js')
const uploadProductControl = require('../controler/uploadProduct.js')
const getCategryProduct = require('../controler/categary/getChategaryProduct.js')
const getChatgeryWishProduct  = require('../controler/categary/ChatgeryWishProduct.js')
const getProductDetails = require('../controler/categary/getProductDetails.js')
const getAddToCart  = require("../controler/addToCart.js")
const countAddToCartProduct = require('../controler/countAddToCartProduct.js')
const getAddCartProduct = require('../controler/categary/getAddCartProduct.js')
const updateAddCartProduct = require('../controler/categary/updateAddCartProduct')
const DeleteCartItems = require('../controler/categary/DeleteCartItems.js')
const SearchProduct = require('../controler/categary/SearchProduct.js')
const FilterProduct = require('../controler/categary/FilterProduct.js')

routes.post('/signUp' , userSignUpController)
routes.post('/signin', userSignInController)
routes.get('/user-details',authToken , userDataControler )
routes.get('/logout' , userLogout)

routes.get('/allUser' ,authToken,allUser )
routes.post('/update-user',authToken  , updateUser )


routes.post('/uplode-Product',authToken,userUploadeControler)
routes.get('/get-product',getproductControler)
routes.post('/update-product-details',authToken,uploadProductControl)
routes.get('/get-CategryProduct',getCategryProduct)
routes.post('/wish-CategeryProduct',getChatgeryWishProduct)
routes.post('/get-Product-Details',getProductDetails)
routes.get('/search',SearchProduct)
routes.post('/filterProduct' , FilterProduct)



routes.post('/add-to-cart', getAddToCart)
routes.get('/countAddToCartProduct' , countAddToCartProduct)
routes.get('/view-CartProduct',getAddCartProduct)
routes.post('/update-AddCartProduct',updateAddCartProduct)
routes.post('/Delete-Cart-Items',DeleteCartItems)

module.exports = routes