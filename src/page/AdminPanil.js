import React ,{useEffect} from 'react'
import { useSelector } from 'react-redux';
import { FaRegCircleUser } from "react-icons/fa6";
import {Link ,Outlet, useNavigate} from 'react-router-dom'
import ROLE from '../common/role'

const AdminPanil = () => {
  const user = useSelector(state => state?.user?.user)

  const history = useNavigate()
  useEffect(()=>{
         if(user?.role === ROLE){
          history('/')
         }
  },[user,history])

  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
      <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
           <div className = "h-32 bg-slate-200	 flex justify-center items-center flex-col">
              <div className='text-5xl cursor-pointer relative flex justify-center '>
                   {
                    user?.profilepic?(
                      <img src={user?.profilepic} alt={user?.name} className='h-20 w-20 rounded-full'/>
                    ) :(
                      <FaRegCircleUser />
                    ) 
                   }
                     
               </div>
               <p className='capitalize text-lg font-semibold'>{user?.name}</p>
               <p className="text-1xl">{user?.role}</p>
            </div>  

             <div>
                 <nav className='grid p-4'>
                      <Link to={'all-user'} className='px-2 py-1 hover:bg-slate-100'>All User</Link>
                      <Link to={'all-product'} className='px-2 py-1 hover:bg-slate-100'>Product</Link>
                 </nav>
             </div>
      </aside>
      <main className='w-full h-full p-2'>
       <Outlet/>
      </main>
    </div>
  )
}

export default AdminPanil