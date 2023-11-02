import { Outlet, useNavigate } from "react-router-dom";
import UserHeader from "../../components/userProfile/UserHeader";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";

function UserDashboard() {
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  },[currentUser, navigate])

  return (
    <section className="container mx-auto">
      <div className="p-4 sm:py-8 sm:px-40">
        <div className="space-y-4">
          <UserHeader />
          <Outlet/>
        </div>
      </div>
    </section>
  )
}

export default UserDashboard