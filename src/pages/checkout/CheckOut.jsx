import { IoIosArrowDown } from "react-icons/io";
import { MdOutlinePayment } from "react-icons/md"
import { BsFillExclamationSquareFill } from "react-icons/bs";
import {
  PiNumberCircleOneLight, PiNumberCircleTwoLight, PiNumberCircleThreeLight
} from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext'
import { CheckOutContext } from '../../context/CheckOutContext';

function CheckOut() {
  document.title = '客家糕粿店 | 結帳'
  const navigate = useNavigate()
  const { cart, total } = useContext(CartContext)
  const { currentUser } = useContext(AuthContext)
  const { openCheckInfo, setOpenCheckInfo, orderFormData, setOrderFormData,
          sendCheckForm, check_Terms, setCheck_Terms, checkOutMessage} = useContext(CheckOutContext)


  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  },[currentUser, navigate])

  // 處理 onChange同步輸入資料
  const handleCheckFormChange = (e) => {
    const { name, value } = e.target;
    setOrderFormData({ ...orderFormData, [name]: value });
  };

  // 查閱訂單
  const checkOrder = (e) => {
    e.preventDefault()
    setOpenCheckInfo(!openCheckInfo)
  }


  return (
    <section className="container mx-auto">
      <div className="sm:px-28 space-y-4 mb-20">
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
            <div className="w-6/12 border-t-2 border-teal-400"></div>
          </div>
          <div className="flex flex-col items-center">
            <PiNumberCircleThreeLight size={25}/>
            <span>完成</span>
          </div>
        </div>

        <form action="" onSubmit={sendCheckForm}>
          <div className="p-4 h-full flex flex-col space-y-4">
            <div className="border rounded-md overflow-hidden ">
              <div className="flex items-center justify-between py-3 px-4 text-gray-50 bg-rose-500">
                <div className='tracking-wide'>訂單資訊</div>
                <div className='flex items-center space-x-2'>
                  <span className="text-sm">查閱訂單</span>
                  <button onClick={checkOrder}>
                    <IoIosArrowDown size={ 20 } className={`transform ${openCheckInfo ? 'rotate-180' : ''} hover:text-gray-200 cursor-pointer`}/>
                  </button>
                </div>
              </div>
              
              <div className={`${openCheckInfo ? 'h-full' : 'h-0'} bg-gray-50 overflow-hidden transition-all duration-100 z-20 space-y-2 px-4 pt-2 `}>
                {cart.length === 0 ?
                  <span className="p-4 text-[1rem] text-rose-500">尚未選購商品</span>
                :
                  cart.map(item => { 
                    return (
                      <div className='py-2 sm:px-4 flex items-center space-x-4' key={item.id}>
                        <div className='w-3/12 sm:w-1/12'>
                          <img src={item.image} alt={`${item.name}`} className='h-14 rounded-md' />
                        </div>
                        <div className='w-11/12'>
                          <div className='flex justify-between'>
                            <span>{item.name}</span>
                            <span className='text-end'>數量：{item.amount}</span>
                          </div>
                          <div className='flex justify-between'>
                            <span>單價 NT. { item.price }</span>
                            <span className='text-end'>NT. {`${parseInt(item.price * item.amount).toFixed(0)}`}</span>
                          </div>
                        </div>
                      </div>
                    )
                  }) 
                } 
                <div className="flex items-center justify-between p-4 border-t-2 font-medium">
                  <span>總金額</span>
                  <span className="text-lg">NT. {total}</span>
                </div>
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <div className="bg-rose-500 px-4 py-3">
                <span className="text-gray-50 tracking-wide">訂購單</span>
              </div>

              <div className="p-4 sm:p-8 grid sm:grid-cols-2 sm:grid-rows-2 gap-4">
                <div>
                  <input type="text" id="client_name" name="client_name"
                    value={orderFormData.client_name}       
                    onChange={handleCheckFormChange}
                    className="checkout_form"
                    placeholder="訂購人姓名"
                    required
                  />
                </div>
                <div>
                  <input type="text" id="email" name="email"
                    value={orderFormData.email}       
                    onChange={handleCheckFormChange}       
                    className="checkout_form"
                    placeholder="Email"
                    required
                  />
                </div>
                <div>
                  <input type="text" id="phone" name="phone"
                    value={orderFormData.phone}       
                    onChange={handleCheckFormChange}       
                    className="checkout_form"
                    placeholder="聯絡電話"
                    required
                  />
                </div>
                <div>
                  <input type="text" id="address" name="address"
                    value={orderFormData.address}       
                    onChange={handleCheckFormChange}
                    className="checkout_form"
                    placeholder='運送地址 (訂購人自取請填 "自取" )'
                    required
                  />
                </div>
                <div>
                  <select name="paid_type" id="paid_type" className="border rounded-lg w-full p-1"
                    value={orderFormData.paid_type} onChange={handleCheckFormChange} required>
                    <option value="" disabled>-- 請選擇付款方式 --</option>
                    <option value="信用卡">自取</option>
                    <option value="ATM轉帳">ATM轉帳</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border rounded-md p-4 space-y-2 bg-gray-50">
              <div className="border-b-2">
                <span>同意聲明</span>
              </div>
              <div className="text-[0.88rem] tracking-wide ">
                <div>
                  <span>※ 下單前請再次確認您的訂購商品及訂購單，訂單成立後無法異動訂單內容 </span>
                </div>
                <div className="text-rose-500 flex items-center space-x-2">
                  <input type="checkbox" id="check_terms" value={check_Terms}
                    checked={check_Terms} onChange={() => {setCheck_Terms(!check_Terms)}}/>
                  <label htmlFor="check_terms">
                    <span> 我同意接受 </span>
                    <span className="underline">服務條款</span>
                    <span> 和 </span>
                    <span className="underline">隱私權政策</span>
                  </label>
                </div>
              </div>
            </div>

            {checkOutMessage ?
              <div className="border rounded-md p-4 space-y-2 bg-gray-50">
                <div className="tracking-wide flex items-center space-x-2 text-rose-500">
                  <BsFillExclamationSquareFill size={20} />
                  <span>{checkOutMessage}</span>
                </div>
              </div>
              :
              null
            }

            <div className="pt-4">
              <div className="relative overflow-hidden w-full">
                <button className='add-car space-x-1'>
                  <MdOutlinePayment size={25}/>
                  <span>付款</span>
                </button>
                <Link to={'/product'} className={`${cart.length !== 0 ? 'hidden' : 'bg-rose-500 rounded-md'} text-gray-50 
                  w-full h-full absolute top-0  flex items-center justify-center`}>
                  <span>請先選購商品</span>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CheckOut