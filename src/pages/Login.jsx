import { BsPersonCircle, BsKeyFill } from "react-icons/bs"
import { Link } from 'react-router-dom'
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Login() {
  document.title = '客家糕粿店 | 登入'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { loginUser } = useContext(AuthContext)

  return (
    <section>
      <div className="flex justify-center items-center p-4 sm:p-10 h-[600px]">
        <div className="w-full sm:w-5/12 border rounded-md overflow-hidden bg-gray-100">
          <div className="py-2 px-4 bg-rose-500 text-gray-50">
            <span>會員登入</span>
          </div>
          <div className="py-6 px-4">
            <form action="" className="space-y-6" onSubmit={loginUser}>
              <div className="flex items-center space-x-4">
                <label htmlFor="username">
                  <BsPersonCircle size={24} />
                </label>
                <div className="w-10/12">
                  <input id="username" name="username" type="text" autoComplete="username" required
                    placeholder="Account / 會員帳號"
                    value={username}
                    onChange={e => setUsername(e.target.value.trim())}
                    className="input_set"/>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <label htmlFor="password">
                  <BsKeyFill size={24}/>
                </label>
                <div className="w-10/12">
                  <input id="password" name="password" type="password" autoComplete="current-password" required
                    placeholder="Password / 會員密碼" 
                    value={password}
                    onChange={e => setPassword(e.target.value.trim())}
                    className="input_set"/>
                </div>
              </div>
              <div className="pt-4">
                <div className="flex flex-col text-center space-y-4">
                  <button className ="btn-md btn-in sm:w-11/12" type="submit">
                    <span>會員登入</span>
                  </button>
                  <Link to={'/register'} className="btn-md btn_register sm:w-11/12">
                    <span>加入會員</span>
                  </Link>
                </div>
              </div>
            </form>
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login