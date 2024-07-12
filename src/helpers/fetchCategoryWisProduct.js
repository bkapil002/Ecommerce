const {default : summaryApi }  = require("../common/index")

const fetchCategoryWisProduct = async(catagory)=>{
    const respons = await fetch(summaryApi.wishcatagery.url,{
        method:summaryApi.wishcatagery.method,
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({catagory : catagory}),
    })
    const dataResponse = await respons.json();
    return dataResponse
}

export default fetchCategoryWisProduct