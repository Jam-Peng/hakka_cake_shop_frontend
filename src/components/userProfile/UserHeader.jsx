import { Link } from 'react-router-dom'

function UserHeader() {
  return (
    <section className="border-b space-y-2 py-1">
      <div>
        <span className="text-lg">會員中心</span>
      </div>

      <div className="flex items-center space-x-10">
        <Link to={"/user_profile"} rel="noopener noreferrer" className="hover:text-teal-500">
          <span>個人資料</span>
        </Link>

        <Link to={"/user_profile/user_order"} rel="noopener noreferrer" className="hover:text-teal-500">
          <span>訂單查詢</span>
        </Link>
      </div>
    </section>
  )
}

export default UserHeader