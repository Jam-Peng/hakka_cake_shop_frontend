import logo from '../assets/logo.png'
import { BiLogOut } from "react-icons/bi"
import { BsFillPersonFill, BsPersonVcard, BsReceipt, BsFillGridFill } from "react-icons/bs";
import { MdOutlinePayment } from "react-icons/md"
import { useContext } from "react"
import { Link } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext"
import { HeaderContext } from '../context/HeaderContext';
import { CartContext } from '../context/CartContext';

function Header() {
  const { currentUser, logoutUser } = useContext(AuthContext)
  const{ accountSet, setAccountSet }=useContext(HeaderContext)
  const { itemAmount } = useContext(CartContext)

  return (
    <header className='border' onMouseLeave={()=>{setAccountSet(false)}}>
      <div className="container mx-auto py-2 px-4 flex items-center justify-between h-full">
        <div className="flex items-center space-x-4">
          <div>
            <Link to={'/'} rel="noopener noreferrer">
              <div className="flex items-center space-x-2">     
                <img src={logo} alt="Logo_Img" className="w-10 h-10"/>
                <div>
                  <span className="font-semibold text-lg">客家糕粿店</span>
                </div>
              </div>
            </Link>
          </div>
        
          <div>
            <Link to={'/product'} rel="noopener noreferrer" className='flex items-center space-x-1'>
              <BsFillGridFill size={20} color='#1f2937'/>
              <span className="text-base">所有商品</span>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center relative">
          {currentUser ? 
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-1" onMouseEnter={()=>{setAccountSet(true)}}>
                <BsFillPersonFill size={20}/>
                <span className="uppercase">{currentUser.name || currentUser.username}</span>
              </button>  
            </div>
            :
            <div>
              <Link to={'/login'} className="flex items-center space-x-1">
                <BsFillPersonFill size={20}/>
                <span>登入</span>
              </Link>
            </div>
          }
          <div className="header_btn px-2 py-0.3">
            <Link to={'/check_order'} rel="noopener noreferrer"
              className="flex items-center space-x-1">
                <MdOutlinePayment size={25} />
                <div className="bg-rose-500 absolute -right-2 -bottom-1 text-sm w-[19px] h-[19px] 
                    text-gray-50 rounded-full flex justify-center items-center">
                  <span>{ itemAmount }</span>
                </div>
              <span>結帳</span>
            </Link>
          </div>

          <div className={`${accountSet ? 'block top-10 right-1' : 'scale-0 top-10 right-1'} absolute w-[12vw] h-[18vh] 
              transition-all duration-500 z-20 bg-gray-200 border rounded-md hidden sm:block`} onMouseLeave={()=>{setAccountSet(false)}}>
            <div className="p-4 space-y-4">
              <button className="flex items-center space-x-2 hover:text-gray-500" onClick={logoutUser}> 
                <BiLogOut size={25}/>
                <span>登出</span>
              </button>
              <div className='grid gap-2 border-t border-gray-400 py-4'>
                <Link to={'/user_profile'}>
                  <button className='flex items-center space-x-2 hover:text-gray-500'>
                    <BsPersonVcard size={25}/>
                    <span>我的帳戶</span>
                  </button>
                </Link>
                <Link to={'/user_profile/user_order'}>
                  <button className='flex items-center space-x-2 hover:text-gray-500'>
                    <BsReceipt size={24}/>
                    <span>訂單查詢</span>
                  </button>
                </Link>
              </div>
            </div>
          </div> 

        </div>
      </div>
    </header>
  )
}

export default Header