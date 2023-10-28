import { BsFillPersonPlusFill, BsFillPersonVcardFill, BsFillEnvelopeFill,
        BsLockFill } from "react-icons/bs"
import { LuShieldCheck } from "react-icons/lu"
import { Link } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Register() {
  document.title = '客家糕粿店 | 註冊'
  const { registerUser, clientMessage, userName, setUserName, password1, setPassword1,
    password2, setPassword2, clientName, setClientName, email, setEmail } = useContext(AuthContext)

  return (
    <section>
      <div className="flex justify-center items-center p-4 sm:p-10 h-[600px]">
        <div className="w-full sm:w-5/12 border rounded-md overflow-hidden bg-gray-100">
          <div className="py-2 px-4 bg-rose-500 text-gray-50">
            <span>加入會員</span>
          </div>
          
          <div className="pb-6 px-4">
            <div className="py-4">
              {clientMessage ? 
                <span className="text-rose-500">{clientMessage}</span>
              :
                null
              }
            </div>

            <form action="" className="space-y-6" onSubmit={registerUser}>
              <div className="flex items-center space-x-4">
                <label htmlFor="userName">
                  <BsFillPersonPlusFill size={24} />
                </label>
                <div className="w-10/12">
                  <input id="userName" name="userName" type="text" autoComplete="userName" required
                    placeholder="Account / 會員帳號"
                    value={userName}
                    onChange={e => setUserName(e.target.value.trim())}
                    className="input_set"/>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <label htmlFor="clientName">
                  <BsFillPersonVcardFill size={24} />
                </label>
                <div className="w-10/12">
                  <input id="clientName" name="clientName" type="text" autoComplete="clientName"
                    placeholder="Account / 會員姓名"
                    value={clientName}
                    onChange={e => setClientName(e.target.value.trim())}
                    className="input_set"/>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <label htmlFor="email">
                  <BsFillEnvelopeFill size={24} />
                </label>
                <div className="w-10/12">
                  <input id="email" name="email" type="email" autoComplete="email" required
                    placeholder="Account / Email"
                    value={email}
                    onChange={e => setEmail(e.target.value.trim())}
                    className="input_set"/>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <label htmlFor="password1">
                  <BsLockFill size={24}/>
                </label>
                <div className="w-10/12">
                  <input id="password1" name="password1" type="password" autoComplete="password1" required
                    placeholder="Password1 / 會員密碼" 
                    value={password1}
                    onChange={e => setPassword1(e.target.value.trim())}
                    className="input_set"/>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <label htmlFor="password2">
                  <LuShieldCheck size={24}/>
                </label>
                <div className="w-10/12">
                  <input id="password2" name="password2" type="password" autoComplete="password2" required
                    placeholder="Check Password2 / 確認密碼" 
                    value={password2}
                    onChange={e => setPassword2(e.target.value.trim())}
                    className="input_set"/>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex flex-col text-center space-y-4">
                  <button className ="btn-md btn-in sm:w-11/12" type="submit">
                    <span>加入會員</span>
                  </button>
                  <Link to={'/login'} className="btn-md btn_register sm:w-11/12">
                    <span>會員登入</span>
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

export default Register