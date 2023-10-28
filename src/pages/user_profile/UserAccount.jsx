import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

function UserAccount() {
  document.title = '客家糕粿店 | 會員中心'
  const { currentUser, authToken } = useContext(AuthContext)
  console.log(currentUser)
  console.log(authToken)

  return (
    <div>會員資料</div>
  )
}

export default UserAccount