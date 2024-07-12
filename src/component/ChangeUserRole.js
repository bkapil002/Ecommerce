import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import ROLE from '../common/role';
import summaryApi from '../common/index';
import { toast } from 'react-toastify'

const ChangeUserRole = ({ name, email, role, onClose ,userId , callFunction}) => {
  const [userRole, setUserRole] = useState(role); 

  const handlOnchangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    try {
      const fetchResponse = await fetch(summaryApi.updatedata.url, {
        method: summaryApi.updatedata.method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          userId:  userId,
          role: userRole,
        }),
      });

      const responseData = await fetchResponse.json();
      if(responseData.success){
        toast.success(responseData.message)
        onClose()
        callFunction()
      }
      console.log( "role",responseData);
      
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <IoClose />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <select value={userRole} onChange={handlOnchangeSelect}>
         {
          Object.values(ROLE).map(el =>{
            return(
              <option value={el} key={el}>{el}</option>
            )
          })
         }
        </select>
        <button className="w-full mx-auto block border py-1 rounded-full bg-red-600 text-white mt-4 " onClick={updateUserRole}>
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
