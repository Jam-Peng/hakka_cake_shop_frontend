import { useCallback, useContext, useEffect, useState } from "react";
import { BsReceipt } from "react-icons/bs";
import { FiCheckCircle } from 'react-icons/fi';
import { SlCalender } from "react-icons/sl";
import {
  PiNumberCircleOneLight, PiNumberCircleTwoLight, PiNumberCircleThreeLight
} from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom'
import { CheckOutContext } from "../../context/CheckOutContext";
import CheckDoneList from "../../components/checkout/CheckDoneList";

function CheckDone() {
  document.title = '客家糕粿店 | 完成結帳'
  const navigate = useNavigate()
  const { orderDoneData } = useContext(CheckOutContext)
  const[orderTime, setOrderTime] = useState('')

  const{ order_id, client_name, email, address, created_at, paid_amount, items } = orderDoneData
  
  // 轉換訂單時間
  const formatOrderTime = useCallback(async () => {
    const date = new Date(created_at);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formatOrderDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

    setOrderTime(formatOrderDateTime) 
  },[created_at]) 


  useEffect(() => {
    if (orderDoneData.length === 0) {
      navigate('/')
    }
    formatOrderTime()
  }, [navigate, formatOrderTime, orderDoneData.length])
  

  return (
    <section className="container mx-auto">
      <div className=" sm:px-28 space-y-4 mb-20">
        <div className="p-4 flex items-center justify-between">
          <div className="flex flex-col items-center text-teal-500">
            <PiNumberCircleOneLight size={25}/>
            <span>購物車</span>
          </div>
          <div className="w-4/12 bg-gray-400/40">
            <div className="border-t-2 border-teal-400"></div>
          </div>
          <div className="flex flex-col items-center text-teal-500">
            <PiNumberCircleTwoLight size={25}/>
            <span>結帳</span>
          </div>
          <div className="w-4/12 bg-gray-400/40">
            <div className="border-t-2 border-teal-400"></div>
          </div>
          <div className="flex flex-col items-center text-teal-500">
            <PiNumberCircleThreeLight size={25}/>
            <span>完成</span>
          </div>
        </div>

        <div className="p-4 h-full flex flex-col space-y-4">
          <div className="border rounded-md overflow-hidden">

            <div className="py-3 px-4 text-gray-50 bg-rose-500 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FiCheckCircle size={22} />
                <span className='tracking-wide'>訂單已完成</span>
              </div>
              <div className="flex items-center space-x-2">
                <SlCalender size={20} />
                <span>{orderTime}</span>
              </div>
            </div>
            
            
            <div className="bg-gray-50 overflow-hidden transition-all duration-100 z-20 space-y-2 px-4 pt-2">
              <div className="py-2 sm:px-4">
                <div className="space-x-4">
                  <span>訂單編號</span>
                  <span className="text-indigo-500">{order_id}</span>
                </div>
                
                <div className="space-x-4">
                  <span>訂購客戶</span>
                  <span>{client_name}</span>
                </div>
                <div className="space-x-10">
                  <span>Email</span>
                  <span>{email}</span>
                </div>
                <div className="space-x-4">
                  <span>運送地址</span>
                  <span>{address}</span>
                </div>
                
              </div>
              {items ?
                items.map(item => { 
                  return (
                    <CheckDoneList key={item.id} item={item}/>
                    )
                })
              :
                null
              }
              <div className="flex items-center justify-between p-4 border-t-2 font-medium">
                <span>付款金額</span>
                <span className="text-lg">NT. {paid_amount}</span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <div className="relative overflow-hidden w-full">
              <Link to={'/user_profile/user_order'} className='add-car flex items-center space-x-1'>
                <BsReceipt size={22}/>
                <span>訂單查詢</span>
              </Link> 
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CheckDone