import React, { useContext, useState } from 'react'
import User from '../image/User.png'
import {Link, useNavigate} from 'react-router-dom'
import summaryApi from '../common/index'
import { toast } from 'react-toastify'
import context from '../context'

const Login = () => {
    const history = useNavigate()
    const {fetchUserData , fetchUserAddCart } = useContext(context)

    const [data , setData] = useState({email:'' , password:''})
    const handleChange = (e) => {
        const { name, value } = e.target; 

        setData((preve) => {
            return {
                ...preve,
                [name]: value,
            };
        });
    };
    console.log(data)

     const handleSubmit= async (e) =>{
        e.preventDefault()
        try {
            const dataResponse = await fetch(summaryApi.signIn.url, {
                method: summaryApi.signIn.method,
                credentials : "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
    
            if (!dataResponse.ok) {
                throw new Error('Failed to Login. Please try again later.');
            }
    
            const dataApi = await dataResponse.json();
    
            if (dataApi.success) {
                toast.success(dataApi.message);
                history('/')
                fetchUserData()
                fetchUserAddCart()
            }

            if (dataApi.error) {
                toast.error(dataApi.message);
            }

        } catch (error) {
         
        }
     }
  return (
      <section id='login'>
           <div className='mx-auto container p-4'>
                <div className='bg-white p-8 w-full max-w-sm mx-auto'>
                     <div className='w-20 h-20  mx-auto'>
                          <img src={User} alt='login'/>
                     </div>

                     <form className='pt-6' onSubmit={handleSubmit}>
                        <div className = 'grid '>
                              <ladel>Email :</ladel>
                              <div className = 'bg-slate-100 p-2'>
                                    <input
                                     type='email' 
                                     placeholder='Email'
                                     name='email'
                                     value={data.email}
                                     onChange={handleChange}
                                     className='w-full h-full outline-none bg-transparent'/>
                              </div>
                        </div>
                        <div className = ''>
                              <ladel>Password :</ladel>
                              <div className = 'bg-slate-100 p-2 flex'>
                                    <input 
                                    type='password' 
                                    placeholder='Password'
                                    name= 'password' 
                                    value={data.password}
                                    onChange={handleChange}
                                    className='w-full h-full outline-none bg-transparent'/>
                                    
                              </div>
                        </div>
                          <Link to='/forgetPassword' className='block w-fit ml-auto hover:underline  hover:text-red-600  mt-2'> Forget password</Link>
                        <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full  hover:scale-110 transition-all mx-auto mt-6 block '>Login</button>
                     </form>
                     <p className='my-5'>Don't have account ?<Link to='/signin' className='text-red-600 hover:text-red-700 hover:underline'>Sign up</Link></p>
                </div>
           </div>
      </section>
  )
}

export default Login