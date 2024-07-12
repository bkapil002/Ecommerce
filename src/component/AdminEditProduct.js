import React,{useState} from 'react'
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { toast } from 'react-toastify'
import { FaCloudUploadAlt } from "react-icons/fa";
import summaryApi from "../common/index"
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import catagorys from '../helpers/catgory'




const AdminEditProduct = ({
    onClose,
    deltails,
    fetchdata
}) => {
    const [data, setData] = useState({
      ...deltails,
        productName: deltails?.productName,
        brandName: deltails?.brandName,
        productImage: deltails?.productImage,
        description: deltails?.description,
        price: deltails?.price,
        selling: deltails?.selling,
        catagory : deltails?.catagory,
      });
    
      const headerUpoade = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    
      const [fullOpenImage, setfullOpenImage] = useState(false);
      const [fullScreen, setFullScreen] = useState("");
    
      const headerUpoadeImage = async (e) => {
        const file = e.target.files[0];
        const uploadingColudeImage = await uploadImage(file);
    
        setData((prevData) => ({
          ...prevData,
          productImage: [...prevData.productImage, uploadingColudeImage.url],
        }));
      }
    
      const headerDeleteProduct = (index) => {
        const newDeleteProduct = [...data.productImage];
        newDeleteProduct.splice(index, 1);
        setData((prevData) => ({
          ...prevData,
          productImage: [...newDeleteProduct],
        }));
      }
    
      const headerSubmit = async (e) => {
        e.preventDefault();
        try {
          const dataResponse = await fetch(summaryApi.updateDetails.url, {
            method: summaryApi.updateDetails.method,
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });
          const dataJson = await dataResponse.json();
          if(dataJson.success){
            toast.success(dataJson?.message);
            onClose()
            fetchdata(0)
          }
    
    
          if(dataJson.error){
            toast.error(dataJson?.error);
          }
        } catch (error) {
          console.log(error);
        }
      }
  return (
    <div>
          <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-sliate-200 bg-opacity-10'>
      <div className='bg-white rounded p-4 w-full max-w-2xl h-full  max-h-[80%] overflow-hidden'>
        <div className='flex justify-between items-center'>
          <h2 className='font-bold text-lg'>Edit Product</h2>
          <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
            <IoClose />
          </div>
        </div>
        <form className='grid p-4 gap-1 overflow-y-scroll h-full pb-5'>
          <label htmlFor='productName'>Product Name</label>
          <input 
            className='p-2 bg-slate-100 border rounded'
            type='text' 
            id='productName' 
            name='productName'
            placeholder='Product Name'
            value={data.productName} 
            onChange={headerUpoade}
            required
             />

          <label htmlFor='brandName'>Brand Name :</label>
          <input 
            className='p-2 bg-slate-100 border rounded'
            type='text' 
            id='brandName' 
            name='brandName'
            placeholder='Brand Name '
            value={data.brandName} 
            onChange={headerUpoade}
            required />

          <label htmlFor='description'>Description :</label>
          <textarea 
            className='p-1 h-28 bg-slate-100 border rounded'
            rows={3}
            type='text' 
            id='description' 
            name='description'
            placeholder='Description'
            value={data.description} 
            onChange={headerUpoade} 
            required
            />
              <lavel htmlFor='catagory' className='mt-3'>Catagory :</lavel>
        
              <select 
                 value={data.catagory} 
                  className='p-2 bg-slate-100 border rounded'
                 id='catagory'
                 name='catagory'
                 onChange={(e) => headerUpoade(e)} 
                >
                {catagorys.map((el, index) => (
                 <option value={el.value} key={el.value + index}>{el.label}</option>
                     ))}
          </select>
 

          <label htmlFor='productImage'>Product Image</label>
          <label htmlFor='uploadImageInput'>
            <div className='p-2 bg-slate-100 border rounded h-48 w-full flex justify-center items-center'>
              <div className='text-slate-500 items-center flex flex-col gap-2 justify-center'>
                <span className='text-3xl cursor-pointer '><FaCloudUploadAlt /></span>
                <p className='text-sm'>Upload Product Image</p>
                <input type='file' id='uploadImageInput' className='hidden' onChange={headerUpoadeImage} />
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className='flex items-center gap-2'>
                {data.productImage.map((el, index) => (
                  <div key={index}>
                    <img
                      src={el}
                      alt='el'
                      width={80}
                      height={80}
                      className='bg-slate-100 border '
                      onClick={() => {
                        setfullOpenImage(true);
                        setFullScreen(el);
                      }}
                    />
                    <div className='right-0 bottom-0 flex justify-center text-white bg-red-600 rounded-full cursor-pointer hover:bg-red-800' onClick={()=>headerDeleteProduct(index)}>
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ):(
              <p className='text-red-600 text-xs'>* Please upload product image</p>
            )}
          </div>

          <label htmlFor='price'>Price :</label>
          <input 
            className='p-2 bg-slate-100 border rounded'
            type='number' 
            id='price' 
            name='price'
            placeholder='Price'
            value={data.price} 
            onChange={headerUpoade} required/>

          <label htmlFor='selling'>Selling</label>
          <input 
             className='p-2 bg-slate-100 border rounded'
            type='number' 
            id='selling' 
            name='selling'
            placeholder='selling'
            value={data.selling} 
            onChange={headerUpoade} required/>

          <button onClick={headerSubmit} className='px-2 py-3 bg-red-600 text-white mh-10 hover:bg-red-700 justify-center rounded flex'>Upload Product</button>
        </form>
      </div>
      {fullOpenImage && (
        <DisplayImage onClose={() => setfullOpenImage(false)} imgeUrl={fullScreen} />
      )}
    </div>
    </div>
  )
}

export default AdminEditProduct
