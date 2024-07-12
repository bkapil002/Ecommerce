import React, { useState } from 'react'
import User from '../image/User.png'
import {Link, useNavigate} from 'react-router-dom'
import imageTobase64 from '../helpers/imageTobase64'
import summaryApi from '../common/index'
import { toast } from 'react-toastify'


const SignIn = () => {
    const [datas , setData] = useState({email:'' , password:'' , name:'' , profilepic:''})
    const history = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target; 

        setData((preve) => {
            return {
                ...preve,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const dataResponse = await fetch(summaryApi.signUp.url, {
                method: summaryApi.signUp.method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datas)
            });
    
            if (!dataResponse.ok) {
                throw new Error('Failed to sign up. Please try again later.');
            }
    
            const data = await dataResponse.json();
    
            if (data.success) {
                toast.success('Sign up successful!');
                history('/login')
            } else {
                toast.error(data.message || 'Email is already register');
            }
        } catch (error) {
            console.error('Error signing up:', error);
            toast.error('Email is already register');
        }
    };

     const headleUploadPic = async(e) =>{
        const file = e.target.files[0]
        const imagePic = await imageTobase64(file)
        console.log("file", imagePic)
        setData((preve) => {
            return {
                ...preve,
                profilepic: imagePic
            };
        });
     }
  return (
    <section id='Sigin'>
           <div className='mx-auto container p-4'>
                <div className='bg-white p-8 w-full max-w-sm mx-auto'>
                     <div className='w-20 h-20  mx-auto relative overflow-hidden rounded-full cursor-pointer'>
                        <div>
                          <img src={datas.profilepic  || User} alt='login'/>
                        </div>  
                        <label>
                        <div className='text-xs bg-slate-200 py-2 text-center  absolute bottom-0 w-full bg-opacity-90'>
                                 Photo
                        </div>
                         <input type='file' className='hidden cursor-pointer' onChange={headleUploadPic}></input>
                        </label>
                     </div>

                     <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                     <div className = 'grid '>
                              <ladel>Name :</ladel>
                              <div className = 'bg-slate-100 p-2'>
                                    <input
                                     type='text' 
                                     placeholder='Name'
                                     name='name'
                                     value={datas.name}
                                     onChange={handleChange}
                                     required
                                     className='w-full h-full outline-none bg-transparent'/>
                                     
                              </div>
                        </div>
                        <div className = 'grid '>
                              <ladel>Email :</ladel>
                              <div className = 'bg-slate-100 p-2'>
                                    <input
                                     type='email' 
                                     placeholder='Email'
                                     name='email'
                                     value={datas.email}
                                     onChange={handleChange}
                                     required
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
                                    value={datas.password}
                                    onChange={handleChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'/>
                                    
                              </div>
                        </div>
                        <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full  hover:scale-110 transition-all mx-auto mt-6 block '>sign Up</button>
                     </form>
                     <p className='my-5'>You have account ?<Link to='/login' className='text-red-600 hover:text-red-700 hover:underline'>login</Link></p>
                </div>
           </div>
      </section>
  )
}

export default SignIn