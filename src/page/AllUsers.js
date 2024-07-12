import React , {useEffect, useState} from 'react'
import summaryApi from '../common/index'
import { toast } from 'react-toastify'
import moment from 'moment'
import { CiEdit } from "react-icons/ci";
import ChangeUserRole from '../component/ChangeUserRole';



const AllUsers = () => {
  const[allUser , setAllUser] = useState([])
  const [openUpdateUser , setOpenUpdateUser ] = useState(false)
  const[updateDetails , setUpdateDetails] = useState({
    email : "",
    name : "",
    role : "",
    _id : ""
  })

  const fetchAllUser = async() => {
    try {
      const fetchData = await fetch(summaryApi.alluser.url, {
        method: summaryApi.alluser.method,
        credentials: 'include'
      });
  
      const dataResponse = await fetchData.json();
  
      if (dataResponse.success) {
        setAllUser(dataResponse.data); 
      } else {
        toast.error(dataResponse.message); 
      }
    } catch (error) {
      
    }
  };
  useEffect(()=>{
    fetchAllUser()
  },[])

  return (
    <div className = 'bg-white'>
        <table className='w-full userTable'>
          <thead>
          <tr className=' bg-black text-white'>
              <th>Sr.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Data</th>
              <th>action</th>
          </tr>
          </thead>

          
          <tbody className='pb-4 bg-white'>
                       {
                        allUser.map((el,index) =>{
                          return(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td>{el?.name}</td>
                              <td>{el?.email}</td>
                              <td>{el?.role}</td>
                              <td>{moment(el?.date).format('ll')}</td>
                              <td>  <button className='br-white cursor-pointer' onClick={()=>{setUpdateDetails(el)
                               setOpenUpdateUser(true)}}>
                                    <CiEdit />
                                    </button></td>
                            </tr>
                          )
                        })
                       }
          </tbody>
        </table>
        {
          openUpdateUser &&(
            <ChangeUserRole onClose={()=>setOpenUpdateUser(false)} name = {updateDetails.name} email={updateDetails.email} role={updateDetails.role}  userId={updateDetails._id} callFunction={fetchAllUser}/>
          )
        }
      
    </div>
  )
}

export default AllUsers
