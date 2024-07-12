import Logo from './Logo';
import { FiSearch } from 'react-icons/fi';
import { FaRegCircleUser } from 'react-icons/fa6';
import { FaCartShopping } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import summaryApi from '../common/index';
import { setUserData } from '../store/userSlice';
import ROLE from '../common/role';
import Context  from '../context/index'
import { useContext } from 'react';

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const history = useNavigate()
  const dispatch = useDispatch();
  const context   = useContext(Context)
  const headerLogout = async () => {
    try {
      const fetchData = await fetch(summaryApi.logouts.url, {
        method: summaryApi.logouts.method,
        credentials: 'include',
      });
      const data = await fetchData.json();

      if (data.success) {
        toast.success(data.success);
        dispatch(setUserData(null));
      }
      if (data.error) {
        toast.error(data.error);
      }
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out. Please try again later.');
    }
    
  };
  const headerSearch = (e) =>{
    const {value} = e.target

    if(value){
      history(`/search?q=${value}`)
    }else{
      history('/search')
    }
  }
  console.log('header', context)
  
  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-1">
          <input type="text" placeholder="Search..." className="w-full outline-none" onChange={headerSearch} />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <FiSearch />
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative group flex justify-center">
            {user?._id && (
              <div className="text-3xl cursor-pointer relative flex justify-center ">
                {user?.profilepic ? (
                  <img src={user?.profilepic} alt={user?.name} className="h-10 w-10 rounded-full" />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}
            
              
              {user?.role === ROLE.ADMIN &&( 
                <div className="absolute top-full left-0 bg-white p-4 shadow-lg rounded hidden group-hover:block">
                <nav>
                <Link to={'admin-pannel'} className="block py-2 px-4 whitespace-nowrap hover:bg-slate-100">
                  Admin Panel
                </Link>
                </nav>
                </div>
                )}
                 
              
            
          </div>
          {
            user?._id && (
              <Link to ='/Cart' className="text-2xl cursor-pointer relative">
            <span className='cursor-pointer '>
              <FaCartShopping />
            </span>
            <div className="bg-red-600 w-4 h-4 rounded-full p-1 text-white flex items-center justify-center absolute -top-2 -right-2">
              <p className="text-sm cursor-pointer">{context?.CartProductCount}</p>
            </div>
          </Link>
            )
          }

          <div>
            {user?._id ? (
              <button onClick={headerLogout} className="px-2 py-1 bg-red-600 rounded-full text-white hover:bg-red-700">
                Logout
              </button>
            ) : (
              <Link to="/login" className="px-2 py-1 bg-red-600 rounded-full text-white hover:bg-red-700">
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
