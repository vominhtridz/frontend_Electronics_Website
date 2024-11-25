import { useState } from "react"
import { FaShoppingCart } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { FaRegCircleUser } from "react-icons/fa6"
import Cookies from "js-cookie"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { setUserDetails } from "../../store/userSlice"
import SummaryApi from "../../common"
import { server } from "../../common/path"
import displayINRCurrency from "../../helpers/displayCurrency"
import { CartType } from "../../typescript/CartType"

const UserHeader = () => {
  const user = useSelector((state: any) => state?.user?.user)
  const cart = useSelector((state: any) => state?.cart?.cart)
  const [menuDisplay, setMenuDisplay] = useState(false)
  const [showCartItems, setShowCartItems] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  var token = Cookies.get("token")

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    const responseData = await fetchData.json()

    if (responseData?.success) {
      toast.success(responseData?.success || "Đăng xuất thành công.")
      Cookies.remove("token", { path: "/" })
      Cookies.remove("id", { path: "/" })
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if (responseData?.error) {
      toast.error(responseData?.error)
    }
  }

  return (
    <div className='flex items-center gap-8'>
      {/* Giỏ hàng */}
      {user?.customer_id && (
        <div
          className='relative cursor-pointer'
          onMouseEnter={() => setShowCartItems(true)}
          onMouseLeave={() => setShowCartItems(false)}
        >
          <Link to={"/cart"} className='text-2xl relative'>
            <FaShoppingCart />
            {/* Đếm sản phẩm trong giỏ */}
            {cart?.length > 0 && (
              <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                <p className='text-sm'>{cart?.length}</p>
              </div>
            )}
          </Link>

          {/* Hiển thị danh sách sản phẩm trong giỏ */}
          {showCartItems && cart?.length > 0 && (
            <div className='absolute right-[-15px] top-6  w-72 bg-white shadow-lg rounded-md z-50 p-4 border border-gray-50'>
              <div className='max-h-60 overflow-y-auto'>
                <ul>
                  {cart.map((item: CartType, index: number) => (
                    <li key={index}>
                      <Link
                        to={`product/${item?.products.id}`}
                        className='flex items-center p-2 hover:bg-gray-100'
                      >
                        <img
                          src={server + item.products.image}
                          alt={item?.products?.name}
                          className='w-12 h-12 object-cover rounded-md'
                        />
                        <div className='ml-2'>
                          <p className='text-sm font-semibold leading-4'>{item?.products?.name}</p>
                          <p className='text-xs text-red-500'>
                            {displayINRCurrency(item.price)} VNĐ
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='px-4 py-2'>
                <Link to='/cart' className='text-sm text-blue-600'>
                  Xem tất cả
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Menu người dùng */}
      <div className='relative flex justify-center'>
        {user?.customer_id ? (
          <div
            className='text-3xl cursor-pointer items-center relative flex justify-center'
            onClick={() => setMenuDisplay(prev => !prev)}
          >
            {user?.image ? (
              <img
                className='w-12 h-12 p-0.5 rounded-full ring-1 ring-gray-300 dark:ring-gray-500'
                src={user.image}
                alt='Avatar'
              />
            ) : (
              <FaRegCircleUser />
            )}
            {/* Option User */}
            {menuDisplay && (
              <div className='absolute right-0 py-1.5 bg-white rounded-md shadow top-full border border-gray-50 text-left'>
                <div className='py-2.5 flex items-center justify-start hover:bg-gray-50 hover:text-red-400 whitespace-nowrap px-4'>
                  <Link to={"/user/account/profile"} className='text-sm'>
                    Thông Tin Cá Nhân
                  </Link>
                </div>
                <div className='py-2.5 flex items-center justify-start hover:bg-gray-50 hover:text-red-400 whitespace-nowrap px-4'>
                  <Link to={"/user/orders"} className='text-sm'>
                    Đơn Hàng
                  </Link>
                </div>
                <div className='py-2.5 flex items-center justify-start hover:bg-gray-50 hover:text-red-400 whitespace-nowrap px-4'>
                  <Link to={"/user/account/changepwd"} className='text-sm'>
                    Đổi Mật Khẩu
                  </Link>
                </div>
                <button
                  onClick={handleLogout}
                  className='py-2.5 text-sm w-full flex items-center justify-start hover:bg-gray-50 hover:text-red-400 whitespace-nowrap px-4'
                >
                  Đăng Xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to={"/login"}
            className='px-3 py-1 rounded-md text-white bg-red-600 hover:bg-red-700'
          >
            Đăng Nhập
          </Link>
        )}
      </div>
    </div>
  )
}

export default UserHeader
