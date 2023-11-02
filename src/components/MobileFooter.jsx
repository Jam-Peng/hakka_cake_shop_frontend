import {
  BsPersonVcard, BsReceipt, BsFillPersonFill, BsFillPersonPlusFill,
  BsGrid, BsCreditCard, BsBasket, BsThreeDots
} from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { useContext, useState } from 'react'
import { AuthContext } from "../context/AuthContext";

function MobileFooter() {
  const { itemAmount } = useContext(CartContext)
  const { currentUser, logoutUser } = useContext(AuthContext)
  const[isOpenSetting, setIsOpenSetting] = useState(false)

  return (
    <section onMouseLeave={()=>{setIsOpenSetting(false)}}>
      <div className={`${isOpenSetting ? 'h-[40px]' : 'h-0'} overflow-hidden transition-all duration-75 z-20 bg-gray-100`}>
        <div className="flex items-center justify-evenly py-2 text-sm">
          <Link to={'/user_profile'}>
            <div className='flex items-center space-x-1'>
              <BsPersonVcard size={24}/>
              <span>會員</span>
            </div>
          </Link>
          <Link to={'/user_profile/user_order'}>
            <div className='flex items-center space-x-1'>
              <BsReceipt size={24}/>
              <span>訂單</span>
            </div>
          </Link>

          {!currentUser ?
            <Link to={'/register'} >
              <div className='flex items-center space-x-1'>
                <BsFillPersonPlusFill size={24} />
                <span>註冊</span>
              </div>
            </Link>
            :
            <Link to={'/'} >
              <div className='flex items-center space-x-1'>
                <BsFillPersonPlusFill size={24} />
                <span>註冊</span>
              </div>
            </Link>
          }

          {currentUser?
            <Link>
              <button className="flex items-center space-x-1" onClick={logoutUser}> 
                <BiLogOut size={24}/>
                <span>登出</span>
              </button>
            </Link>
          :
          <Link to={'/login'} className="flex items-center space-x-1">
            <BsFillPersonFill size={24}/>
            <span>登入</span>
          </Link>
          }
        </div>
      </div>

      <div className='w-screen bg-gray-200'>
        <div className="flex items-center justify-evenly py-2 text-sm">
          <Link to={'/'}>
            <div className='flex items-center space-x-1'>
              <BsGrid size={22} />
              <span>主頁</span>
            </div>
          </Link>

          <Link to={'/product'}>
            <div className='flex items-center space-x-1'>
              <BsBasket size={22}/>
              <span>商品</span>
            </div>
          </Link>

          <div className="relative">
            <Link to={'/check_order'} className="flex items-center space-x-1">
              <BsCreditCard size={22} />
              <div className="bg-rose-500 absolute -right-4 -top-1 text-sm w-[19px] h-[19px] 
                  text-gray-50 rounded-full flex justify-center items-center">
                <span>{ itemAmount }</span>
              </div>
              <span>結帳</span>
            </Link>
          </div>

          <div>
            <div className='flex items-center space-x-1' onClick={() => { setIsOpenSetting(!isOpenSetting) }}> 
              <BsThreeDots size={22} />
              <span>設定</span> 
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MobileFooter