import Aap from '../App' 
import { createBrowserRouter} from 'react-router-dom'
import Home from '../page/Home'
import Login from '../page/Login'
import ForgetPassword from '../page/ForgetPassword'
import SignIn from '../page/SignIn'
import AdminPanil from '../page/AdminPanil'
import AllUsers from '../page/AllUsers'
import AllProduct from '../page/AllProduct'
import ProductDetails from '../page/ProductDetails'
import CategeryOfProduct from '../component/categeryOfProduct'
import CartProduct from '../page/CartProduct'
import SearchBar from '../page/SearchBar'

const router = createBrowserRouter([
    {
        path : '/',
        element : <Aap/>,
        children :[{
            path : '',
            element:<Home/> 
        },{
            path:'login',
            element : <Login/>
        },{
            path:'forgetPassword',
            element:<ForgetPassword/>
        },{
            path:'signin',
            element:<SignIn/>
        },{
            path:'prouct-catgery/:categoryName',
            element:<CategeryOfProduct/>
        },
        {
            path : 'product-deatils/:id'  ,
            element: <ProductDetails/>
        },
        {
            path : 'Cart',
            element : <CartProduct/>
        },
        {
            path : 'search',
            element :<SearchBar/>
        },
        {
            path : 'admin-pannel',
            element : <AdminPanil/>,
            children: [
                {
                    path : 'all-user',
                    element : <AllUsers/>
                },{
                    path : 'all-product',
                    element : <AllProduct/>
                }
            ]
        }
     ]
    }
])

export default router