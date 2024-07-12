const backendDomain = "http://localhost:5000"
const summaryApi = {
    signUp:{
        url:`${backendDomain}/api/signUp`,
        method : "post"
    },
    signIn:{
        url:`${backendDomain}/api/signin`,
        method : "post"
    },
    userData : {
        url:`${backendDomain}/api/user-details`,
        method : "get"
    },
    logouts : {
        url:`${backendDomain}/api/logout`,
        method : "get"
    },
    alluser:{
        url:`${backendDomain}/api/allUser`,
        method : "get"
    },
    updatedata:{
        url:`${backendDomain}/api/update-user`,
        method : "post"
    },
    uplodeProduct:{
        url:`${backendDomain}/api/uplode-Product`,
        method : "post"
    },
    getProduct : {
        url:`${backendDomain}/api/get-product`,
        method : "get"
    },
    updateDetails : {
        url:`${backendDomain}/api/update-product-details`,
        method : "post"
    },
    catagery : {
        url:`${backendDomain}/api/get-CategryProduct`,
        method : "get"
    },
    wishcatagery : {
        url:`${backendDomain}/api/wish-CategeryProduct`,
        method : "post"
    },
     productDetails : {
        url:`${backendDomain}/api/get-Product-Details`,
        method : "post"
    },
    getaddcart :{
        url:`${backendDomain}/api/add-to-cart`,
        method : "post"
    },
    countAddToCartProduct :{
        url:`${backendDomain}/api/countAddToCartProduct`,
        method : "get"
    },
    viewCartProduct :{
        url:`${backendDomain}/api/view-CartProduct`,
        method : "get"
    },
    UpdateAddCartProduct :{
        url:`${backendDomain}/api/update-AddCartProduct`,
        method : "post"
    },DeleteCartItems :{
        url:`${backendDomain}/api/Delete-Cart-Items`,
        method : "post"
    },search:{
        url:`${backendDomain}/api/search`,
        method : "get"
    },filterProduct:{
        url:`${backendDomain}/api/filterProduct`,
        method : "post"
    }
}

export default summaryApi
