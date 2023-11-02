import user_img from "../../assets/user.png"
import { BsFillPersonVcardFill, BsLockFill } from "react-icons/bs"
import { LuShieldCheck } from "react-icons/lu"
import { BiSolidEditAlt } from "react-icons/bi";
import { useContext, useEffect } from "react"
import { UserProfileContext } from "../../context/UserProfileContext"
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function UserAccount() {
  document.title = '客家糕粿店 | 會員中心'
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const { getClientProfile, clientProfile, formAccount, setFormAccount, accountMessage, checkPassword, setCheckPassword,
          sendUpdateClient, previewImage, setPreviewImage, removeImage } = useContext(UserProfileContext)

  const { username, name, email, image } = clientProfile

  const imgHostUrl = "http://127.0.0.1:8000"

  // 處理 onChange同步輸入資料
  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setFormAccount({ ...formAccount, [name]: value  });
  };

  // onChange 照片同步
  const handleImage = (e) => {
    const { name, value, files } = e.target
    if (files) { 
      // 處理照片預覽
      const imageFiles = Array.from(files);
      // 儲存照片到 formAccount變數中
      setFormAccount({ ...formAccount, image: e.target.files[0] });
      
      // 即時預覽選擇的圖片
      const imagePreviews = imageFiles.map((file) => ({
        file,
        preview:URL.createObjectURL(file)
      }));
        setPreviewImage(imagePreviews);
    } else {
      setFormAccount((prevFormAccount) => ({
        ...prevFormAccount,
        [name]: value,
      }));
    }
  }

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    } else {
      getClientProfile()
    }
    
  },[getClientProfile, currentUser, navigate])

  return (
    <section>
      <div className="space-y-6 text-[0.9rem]">
        <div className="flex flex-col space-y-4 border-b py-4">
          <div> 
              {image ?
                <img src={`${imgHostUrl}${image}`} alt="大頭照" className="w-24 h-24 border rounded-md"/> 
              :
                <img src={user_img} alt="大頭照" className="w-24 h-24 border rounded-md"/> 
              }
          </div>

          <div className="flex flex-col space-y-1">
            <div>
              <span>帳號：</span> 
              <span>{username}</span>
            </div>
            <div>
              <span>姓名：</span> 
              <span>{name || "未提供" }</span>
            </div>
            <div>
              <span>Email：</span>
              <span>{email}</span>
            </div>
          </div>
        </div>

        <div>
          <form action="" onSubmit={sendUpdateClient}>
            <div >
              <div className="space-y-4">
                <div className="flex items-center space-x-10"> 
                  <span className="text-lg">修改資料</span>
                  <div className="flex items-center space-x-4">
                    <button type="submit" className="btn-md btn-in flex items-center space-x-1">
                      <BiSolidEditAlt size={18} />
                      <span>更新</span>
                    </button>
                    <div>
                      <span className="text-rose-500">{accountMessage}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-10 md:space-y-0 md:flex md:space-x-36">
                  <div className="space-y-4 w-6/12">
                    <div className="space-y-2">
                      <label className=" " htmlFor="avatar">更新照片</label>
                      <input className="upload_img_input  md:w-full" type="file"
                        id="avatar" name="avatar" accept="image/*"
                        onChange={ handleImage }
                        /> 
                    </div>

                    <div>
                      <div>
                        {previewImage ?
                          previewImage.map((item,index) => (
                            <div className="space-y-2" key={index}>
                              <img className="border rounded-lg h-32 w-32" src={item.preview} alt="預覽圖片" />
                              <input type="button" value="刪除"
                                className="btn-md btn-out cursor-pointer"
                                onClick={()=>{removeImage(index)}}
                              />  
                            </div> 
                          ))
                        :
                          null
                        } 
                      </div>
                    </div>  
                  </div>

                  <div className="space-y-2 w-6/12">
                    <div> 
                      <span>更新資料</span>
                    </div>
                    <div className="space-y-2">

                      <div className="flex items-center space-x-2">
                        <label htmlFor="updatName">
                          <BsFillPersonVcardFill size={24} color="#4b5563"/>
                        </label>
                        <input id="updatName" name="updatName" type="text" autoComplete="current-password"
                          placeholder="會員姓名"
                          value={formAccount.updatName}
                          onChange={ handleDataChange }
                          className="border-b focus:outline-none placeholder:text-sm"/>
                      </div>
                      <div className="flex items-center  space-x-2">
                        <label htmlFor="newPassword">
                          <BsLockFill size={24} color="#4b5563"/>
                        </label>
                        <input id="newPassword" name="newPassword" type="password" autoComplete="current-password"
                          placeholder="新密碼請設定8碼英數字"
                          value={formAccount.newPassword}
                          onChange={ handleDataChange }
                          className="border-b focus:outline-none placeholder:text-sm"/>
                      </div>
                      <div className="flex items-center  space-x-2">
                        <label htmlFor="checkPassword">
                          <LuShieldCheck size={24} color="#4b5563"/>
                        </label>
                        <input id="checkPassword" name="checkPassword" type="password" autoComplete="current-password"
                          placeholder="請確認新密碼"
                          value={checkPassword}
                          onChange={e => setCheckPassword(e.target.value)}
                          className="border-b focus:outline-none placeholder:text-sm"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

      </div>
    </section>
  )
}

export default UserAccount