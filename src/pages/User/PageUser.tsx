
import Cookies from "js-cookie"
import SideBar from "./SideBar/SideBar"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
export const PageUsers = () => {
  const userid = Cookies.get('id')
  const navigate = useNavigate();
  const token = Cookies.get("token")
  useEffect(() => {
    if (!token || !userid) {
      navigate("/login")
    }
  },[])
  return (
    <section>
      <div className='flex min-h-screen  px-4 py-2'>
        <SideBar />
        <div className='border border-gray-200 ml-2 w-full shadow'>
          <Outlet />
        </div>
      </div>
    </section>
  )
}
export default PageUsers
