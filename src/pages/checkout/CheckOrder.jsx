import { Link } from 'react-router-dom'
import { MdOutlinePayment } from "react-icons/md"
import { PiNumberCircleOneLight, PiNumberCircleTwoLight, PiNumberCircleThreeLight } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import CheckOrderItem from '../../components/checkout/CheckOrderItem';

function CheckOrder() {
  document.title = '客家糕粿店 | 購物車'
  const { cart, clearCart, total } = useContext(CartContext)
  

  return (
    <section className="container mx-auto">
      <div className=" sm:px-28 space-y-4 mb-10">
        <div className="p-4 flex items-center justify-between">
          <div className="flex flex-col items-center text-teal-500">
            <PiNumberCircleOneLight size={25}/>
            <span>購物車</span>
          </div>
          <div className="w-4/12 bg-gray-400/40">
            <div className="w-6/12 border-t-2 border-teal-400"></div>
          </div>
          <div className="flex flex-col items-center">
            <PiNumberCircleTwoLight size={25}/>
            <span>結帳</span>
          </div>
          <div className="w-4/12">
            <div className="w-full border-t-2 border-gray-400/40"></div>
          </div>
          <div className="flex flex-col items-center">
            <PiNumberCircleThreeLight size={25}/>
            <span>完成</span>
          </div>
        </div>

        <div className="p-4 h-full sm:flex justify-between space-y-4 sm:space-y-0">
          <div className="border rounded-lg sm:w-8/12 overflow-hidden ">
            <div className="flex items-center justify-between py-3 px-4 text-gray-50 bg-rose-500">
              <div className='uppercase text-base  font-semibold '>Shopping Bag</div>
              <button className='hover:text-gray-200' onClick={ clearCart }>
                <IoMdClose size={ 20 }/>
              </button>
            </div>
            
            <div className="overflow-y-auto h-[500px] bg-gray-50 pt-2">
              {cart.length === 0 ?
                <span className="p-8 text-[1rem] text-rose-500">尚未選購商品</span>
              :
              cart.map(item => {
                return <CheckOrderItem key={item.id} item={item}/>
              })
              } 
            </div>
          </div>

          <div className="sm:w-3/12">
            <div className="border rounded-lg p-4 space-y-2 bg-gray-50 mb-8">
              <div className="border-b-2">
                <span className="text-[1.2rem]">訂單明細</span>
              </div>
              {
                cart.map(item => { 
                  return (
                    <div className='flex items-center justify-between' key={item.id}>
                      <span>{item.name}</span>
                      <span>{`${parseInt(item.price * item.amount).toFixed(0)}`}</span>
                    </div>
                  )
                })
              }
              <div className="flex items-center justify-between py-2 border-t-2">
                <span>總金額</span>
                <span className="text-[1.3rem] font-medium">NT. {total}</span>
              </div>

              <div className="pt-8">
                <div className="relative overflow-hidden w-full">
                  <Link to={"/check_out"} rel="noopener noreferre" className='add-car space-x-1'>
                    <MdOutlinePayment size={25}/>
                    <span>會員結帳</span>
                  </Link>
                  <Link to={'/product'} className={`${cart.length !== 0 ? 'hidden' : 'bg-rose-500 rounded-md'} text-gray-50 
                    w-full h-full absolute top-0  flex items-center justify-center`}>
                    <span>請先選購商品</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CheckOrder