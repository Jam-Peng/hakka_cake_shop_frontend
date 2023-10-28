import { SlCalender } from "react-icons/sl";
import { BsTags } from "react-icons/bs";
import { RiLineHeight } from "react-icons/ri";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserProfileContext } from "../../context/UserProfileContext";
import UserOrderItem from "./UserOrderItem";

function UserOrderList({ order }) {
  const { openOrderItem, setOpenOrderItem } = useContext(UserProfileContext)
  const [userOrderTime, setUserOrderTime] = useState('')
  
  const{ id, order_id, client_name, email, address, created_at, paid_amount, items } = order

  // 轉換訂單時間
  const formatUserOrderTime = useCallback(async () => {
    const date = new Date(created_at);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formatOrderDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

    setUserOrderTime(formatOrderDateTime) 
  }, [created_at]) 
  
  useEffect(() => {
    formatUserOrderTime()
  }, [formatUserOrderTime])
  
  // 開關訂單項目
  const openOderList = (id) => {
    if (openOrderItem === id) {
      setOpenOrderItem(null);    // 如果當前列表已經開啟，則關閉它
    } else {
      setOpenOrderItem(id);      // 否則開啟該列表
    }
  }

  return (
    <div className="sm:p-4 h-full w-full flex flex-col space-y-4">
      <div className="border rounded-lg overflow-hidden">

        <div className="py-2 px-4 text-gray-50 sm:flex items-center justify-between bg-teal-500">
          <div className="sm:flex items-center sm:space-x-2">
            <div className="flex items-center space-x-2">
              <BsTags size={20} />
              <span className='tracking-wide'>訂單編號</span>
            </div>
            <span>{order_id}</span>
          </div>
          <div className="flex items-center space-x-2">
            <SlCalender size={20} />
            <span>{userOrderTime}</span>
          </div>
        </div>
        
        <div>
          <div className="py-4 px-2 sm:px-4 sm:grid grid-cols-2 text-gray-800/80 
                    hover:text-teal-500 bg-gray-100 hover:bg-gray-50">
            <div>
              <div className="space-x-4">
                <span >訂購客戶</span>
                <span >{client_name}</span>
              </div>
              <div className="space-x-4">
                <span>運送地址</span>
                <span>{address}</span>
              </div>
            </div>
        
            <div>
              <div className="space-x-10">
                <span>Email</span>
                <span>{email}</span>
              </div>
              <div className="space-x-4">
                <span>付款金額</span>
                <span className="text-lg">NT. {paid_amount}</span>
              </div>
            </div>
          </div>

          <button className="bg-gray-100 border-t w-full flex items-center justify-center"
            onClick={()=>{openOderList(id)}}>
            <RiLineHeight size={20} color="#14b8a6"/>
          </button>

          {openOrderItem === id && (
            <div className="bg-gray-100">
              {items.map(item => { 
                  return (
                  <div key={item.id}>
                    <UserOrderItem  item={item}/>
                  </div>
                  )
                })
              }
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default UserOrderList