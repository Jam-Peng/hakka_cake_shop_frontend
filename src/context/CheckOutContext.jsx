import { createContext, useContext, useState } from 'react'
import { CartContext } from './CartContext'
import { AuthContext } from './AuthContext'
import { useNavigate } from "react-router-dom";

export const CheckOutContext = createContext()

function CheckOutProvider({ children }) {
  const navigate = useNavigate();
  const { cart, total, clearCart } = useContext(CartContext)
  const { authToken }  = useContext(AuthContext)
  const [openCheckInfo, setOpenCheckInfo] = useState(false)
  const [orderFormData, setOrderFormData] = useState({
    client_name: '',
    email: '',
    address: '',
    phone: '',
    paid_type: '',
    paid_amount: '',   /* 付款金額 */
    items: [],
  });
  const [orderDoneData, setOrderDoneData] = useState([])
  const [check_Terms, setCheck_Terms] = useState(true)
  const [checkOutMessage, setCheckOutMessage] =useState('')

  const apiurl = "http://127.0.0.1:8000/api/v1"

  // 處理付款訂單
  const sendCheckForm = async (e) => {
    e.preventDefault()
    orderFormData['paid_amount'] = total

    orderFormData['items'] = []
    if (cart.length !== 0) {
      cart.forEach(item => {
        const product = {
          id: item.id,
          price: item.price,
          quantity: item.amount,
        };
        orderFormData['items'].push(product) 
      });
    }

    const formatData = JSON.stringify(orderFormData);

    if (check_Terms !== true) {
      setCheckOutMessage('請確認勾選同意聲明')
    } else {
      let response = await fetch(`${apiurl}/front_order/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + String(authToken.access) 
        },
        body: formatData
      })
      const data = await response.json()
      if (response.status === 201) {
        setOrderDoneData(data.order)
        clearCart()
        cancelOrderFormData()
        setCheckOutMessage('')
        navigate('/check_done')
      }
    }
  }

  // 清空訂單表單
  const cancelOrderFormData = () => {
    setOrderFormData({
      client_name: '',
      email: '',
      address: '',
      phone: '',
      paid_type: '',
      paid_amount: '', 
      items: [],
    });
  }

  const contextData = {
    openCheckInfo : openCheckInfo,
    setOpenCheckInfo : setOpenCheckInfo,
    orderFormData : orderFormData,
    setOrderFormData : setOrderFormData,
    orderDoneData : orderDoneData,
    check_Terms : check_Terms,
    setCheck_Terms : setCheck_Terms,
    checkOutMessage: checkOutMessage,
    
    sendCheckForm : sendCheckForm,
    cancelOrderFormData : cancelOrderFormData,
  }

  return (
    <CheckOutContext.Provider value={contextData}>
      { children }
    </CheckOutContext.Provider>
  )
}

export default CheckOutProvider