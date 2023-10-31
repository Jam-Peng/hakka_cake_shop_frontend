import { createContext, useCallback, useContext, useState } from 'react'
import { AuthContext } from './AuthContext'

export const UserProfileContext = createContext()

function UserProfileProvider({ children }) {
  const { currentUser } = useContext(AuthContext)
  const [userOrders, setUserOrders] = useState([])
  const [openOrderItem, setOpenOrderItem] = useState(null)
  const [productsForOrder, setProductsForOrder] = useState([])
  const [clientProfile, setClientProfile] = useState({})

  const [formAccount, setFormAccount] = useState({
    updatName: '',
    newPassword: '',
    image: null,
  });

  const [checkPassword, setCheckPassword] = useState('')
  const [accountMessage, setAccountMessage] = useState('')
  const [previewImage, setPreviewImage] = useState(null);

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

  // 取得會員資料
  const getClientProfile = useCallback(async () => {
    const response = await fetch(`${apiurl}/client_profile/${currentUser.user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setClientProfile(data)
    } 
  }, [currentUser]) 

  // 更新會員資料
  const sendUpdateClient = async (e) => {
    e.preventDefault()

    if (formAccount.newPassword !== checkPassword) {
      setAccountMessage('請確認密碼是否相同')
    } else if (formAccount.newPassword < 8) {
      setAccountMessage('密碼長度最少8碼英數字')
    } else {
      const submitData = new FormData();
      for (const key in formAccount) {
        submitData.append(key, formAccount[key]);
      }
      
      let response = await fetch(`${apiurl}/client_update/${currentUser.user_id}/`, {
        method: "PUT",
        body: submitData
      })
      const data = await response.json()
      if (response.status === 200) {
        setAccountMessage(data['message'])
        cancelFormData()
        removeImage()
        getClientProfile()
      } else {
        setAccountMessage(data['message'])
      }
    }

    setTimeout(() => {
      setAccountMessage('')
    }, 2000)
  }

  // 刪除預覽的圖片
  const removeImage = (index) => {
    setPreviewImage((prevPreviewImage) => {
      if (prevPreviewImage) {
        const newPreviewImage = [...prevPreviewImage];
        newPreviewImage.splice(index, 1);
        return newPreviewImage;
      }
    });
    // 刪除整個屬性
    delete formAccount.image
  };
  
  // 清空表單資料
  const cancelFormData = () => {
    setFormAccount({
      updatName: '',
      newPassword: '',
      image: null,
    });
    setCheckPassword('')
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = ''; 
    }
  }

  const contextData = {
    userOrders : userOrders,
    openOrderItem : openOrderItem,
    setOpenOrderItem : setOpenOrderItem,
    productsForOrder : productsForOrder,
    clientProfile : clientProfile,
    formAccount : formAccount, 
    setFormAccount : setFormAccount,
    checkPassword : checkPassword, 
    setCheckPassword : setCheckPassword,
    accountMessage : accountMessage, 
    previewImage : previewImage,
    setPreviewImage : setPreviewImage,

    getOrders : getOrders,
    getProductsForOrder: getProductsForOrder,
    getClientProfile : getClientProfile,
    sendUpdateClient: sendUpdateClient,
    removeImage : removeImage,
  }

  return (
    <UserProfileContext.Provider value={contextData}>
      { children }
    </UserProfileContext.Provider>
  )
}

export default UserProfileProvider