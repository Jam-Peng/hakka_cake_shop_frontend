import { Outlet } from "react-router-dom";
import UserHeader from "../../components/userProfile/UserHeader";

function UserDashboard() {
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