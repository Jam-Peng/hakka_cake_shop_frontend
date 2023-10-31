import { createContext, useCallback, useContext, useEffect, useState } from "react"
import jwt_decode from 'jwt-decode'
import { useNavigate } from "react-router-dom"
import { HeaderContext } from "./HeaderContext"

export const AuthContext = createContext()

function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [authToken, setAuthToken] = useState(()=>localStorage.getItem("authToken") ? JSON.parse(localStorage.getItem("authToken")) : null)
  const [currentUser, SetCurrentUser] = useState(()=>localStorage.getItem("authToken") ? jwt_decode(localStorage.getItem("authToken")) : null)
  const [loading, setLoading] = useState(true)
  const { setAccountSet } = useContext(HeaderContext)

  const [clientMessage, setClientMessage] = useState('')
  const [userName, setUserName] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [clientName, setClientName] = useState('')
  const [email, setEmail] = useState('')

  const apiurl = "http://127.0.0.1:8000/api/v1"
  
  // 登入
  const loginUser = async (e) => {
    e.preventDefault()
    let response = await fetch(`${apiurl}/token/`, {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({"username": e.target.username.value, "password": e.target.password.value})
    })
    const data = await response.json()
    if (response.status === 200) {
      setAuthToken(data)                                          // 儲存 access 和 refresh token
      SetCurrentUser(jwt_decode(data.access))                     // 解碼 access token
      localStorage.setItem("authToken", JSON.stringify(data));    // 將 token儲存到 localStorage
      navigate('/')
      cleanForm()
    } else {
      // alert('無法取得連線')
      setClientMessage("帳號或密碼有誤")
    }
    setTimeout(() => {
      setClientMessage('')
    }, 1800)
  }

  // 註冊
  const registerUser = async (e) => {
    e.preventDefault()

    if (e.target.password1.value !== e.target.password2.value) {
      setClientMessage('請確認密碼是否相同')
    } else if (e.target.password1.value.length < 8) {
      setClientMessage('密碼長度最少8碼英數字')
    } else {
      let response = await fetch(`${apiurl}/client_set/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "username": e.target.userName.value,
          "password1": e.target.password1.value,
          "password2": e.target.password2.value,
          "name": e.target.clientName.value,
          "email": e.target.email.value,
        })
      })
      const data = await response.json()
      if (response.status === 201) {
        setClientMessage(data['message'])
        cleanForm()
        navigate('/login')
      } else {
        setClientMessage(data['message'])
      }
    }
    
    setTimeout(() => {
      setClientMessage('')
    }, 2000)
  }

  // 清除註冊表單
  const cleanForm = () => {
    setUserName('')
    setPassword1('')
    setPassword2('')
    setClientName('')
    setEmail('')
  }

  // 登出
  const logoutUser = useCallback(() => {
    setAuthToken(null)
    SetCurrentUser(null)
    localStorage.removeItem("authToken");
    navigate('/')
    setAccountSet(false)
  },[navigate, setAccountSet]) 
  

  // 更新 token
  const updateToken = useCallback(async () => {
    // console.log("更新token被觸發")
    let response = await fetch(`${apiurl}/token/refresh/`, {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({ "refresh": authToken?.refresh})
    })
    const data = await response.json()
    if (response.status === 200) { 
      setAuthToken(data)                                         
      SetCurrentUser(jwt_decode(data.access))                     
      localStorage.setItem("authToken", JSON.stringify(data)); 
    } else {
      logoutUser()
    }

    if (loading) {
      setLoading(false)
    }
  },[authToken?.refresh, loading, logoutUser]) 

  useEffect(() => {
    if (loading) {
      updateToken()
    }

    const fourMinutes = 4 * 60 * 1000      // 因為後端設定 token到期時間為 5分鐘，這裡設定 4分鐘後使用 refresh token重新取得新 token
    let interval = setInterval(() => {
      if (authToken) {
        updateToken()
      }
    }, fourMinutes)
    return () => clearInterval(interval)

  },[authToken, loading, updateToken])

  const contextData = {
    currentUser : currentUser,
    authToken : authToken,
    clientMessage: clientMessage,
    userName : userName,
    setUserName : setUserName,
    password1 : password1,
    setPassword1 : setPassword1,
    password2 : password2,
    setPassword2 : setPassword2,
    clientName : clientName, 
    setClientName : setClientName,
    email : email,
    setEmail : setEmail,

    loginUser : loginUser,
    logoutUser : logoutUser,
    registerUser : registerUser,
  }

  return (
    <AuthContext.Provider value={contextData}>
      { loading ? null : children }
    </AuthContext.Provider>
  )
}

export default AuthProvider