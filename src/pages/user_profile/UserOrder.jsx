import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { UserProfileContext } from "../../context/UserProfileContext"
import { AuthContext } from "../../context/AuthContext"
import UserOrderList from "../../components/userProfile/UserOrderList";

function UserOrder() {
  document.title = '客家糕粿店 | 訂單查詢'
  const navigate = useNavigate();
  const { getOrders, userOrders, getProductsForOrder } = useContext(UserProfileContext)
  const { currentUser, authToken } = useContext(AuthContext)

  const user_id = currentUser.user_id

  useEffect(() => {
    if (!currentUser) {
      navigate('/')
    } else {
      getOrders(user_id, authToken)
      getProductsForOrder()
    }
  },[getOrders, authToken, currentUser, navigate, user_id, getProductsForOrder])

  return (
    <section className="space-y-6 text-slate-800 h-full">
      <div className="py-4">
        <div className="border rounded-lg overflow-auto">
          <div className="bg-rose-500 text-gray-50 px-4 py-3">  
            <span className="">所有訂單</span>
          </div>
          
          <div className="p-4 bg-gray-50 text-base space-y-4 h-[520px] overflow-y-auto">
            { userOrders.length === 0 ?
              <div className="text-rose-500">
                尚未購買商品
              </div>
              :
              userOrders.map((order) => {
                return (
                  <div key={order.id}>
                    <UserOrderList order={order} />
                  </div>
                )
              })
            }
          </div> 
        </div>
      </div>
    </section>
  )
}

export default UserOrder