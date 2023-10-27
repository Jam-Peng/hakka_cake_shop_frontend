import { createContext, useCallback, useState } from 'react'

export const UserProfileContext = createContext()

function UserProfileProvider({ children }) {
  const [userOrders, setUserOrders] = useState([])
  const [openOrderItem, setOpenOrderItem] = useState(null)
  const [productsForOrder, setProductsForOrder] = useState([])
  
  const apiurl = "http://127.0.0.1:8000/api/v1"
  
  // 取得所有訂單
  const getOrders = useCallback(async (user_id, authToken) => {
    const response = await fetch(`${apiurl}/user_orders/${user_id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + String(authToken.access) 
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setUserOrders(data)
    }
  },[]) 

  // 取得全部產品
  const getProductsForOrder = useCallback(async () => {
    const response = await fetch(`${apiurl}/front_products/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setProductsForOrder(data)
    } 
  }, []) 


  const contextData = {
    userOrders : userOrders,
    openOrderItem : openOrderItem,
    setOpenOrderItem : setOpenOrderItem,
    productsForOrder : productsForOrder,
    
    getOrders : getOrders,
    getProductsForOrder : getProductsForOrder,
  }

  return (
    <UserProfileContext.Provider value={contextData}>
      { children }
    </UserProfileContext.Provider>
  )
}

export default UserProfileProvider