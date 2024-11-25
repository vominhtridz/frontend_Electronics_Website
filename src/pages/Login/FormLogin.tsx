import { FormEvent, useContext } from "react"
import { FaEye } from "react-icons/fa"
import { FaEyeSlash } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import SummaryApi from "../../common"
import { toast } from "react-toastify"
import Context from "../../context"
import axios from "axios"
import { SignInType } from "../../typescript/signInType"
import Cookies from "js-cookie"
import { useDispatch } from "react-redux"
import { setLoading } from "../../store/PageSlice"
import { setUserDetails } from "../../store/userSlice"
const FormLogin = ({ data, setData, handleOnChange, showPassword, handleShowPwd }: SignInType) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { fetchUserDetails, fetchUserAddToCart }:any = useContext(Context)
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!data.email || !data.password) {
      return toast.error("Email hoặc mật khẩu không bỏ trống.")
    }
    dispatch(setLoading(true))
    try {
      const response = await axios.post(SummaryApi.signIn.url, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          credentials: true,
        },
      })
      if (response.status === 200) {
        toast.success(response.data.cuccess || "Đăng Nhập thành công")
        Cookies.set("token", response.data.access_token, { expires: 1 })
        Cookies.set("id", response.data.id, { expires: 1 })
        //clear state
        setData({
          email: "",
          password: "",
        })
        fetchUserDetails()
        fetchUserAddToCart()
        navigate("/")
        setTimeout(() => {
          dispatch(setLoading(false))
        }, 2000);
      }
    } catch (error: any) {
      dispatch(setLoading(false))
      console.log(error)
      if (error.response) {
       toast.error(
         error.response?.data?.error?.password?.[0] ||
           error.response?.data?.error ||
           "Đăng Nhập thất bại",
       )
      } else if (error.request) {
        // Request was made but no response was received
        toast.error("server không phản hồi.")
      } else {
        // Something else happened
        toast.error("có lỗi xảy ra.")
      }
    }
  }
  return (
    <form className='pt-6 flex flex-col gap-2' onSubmit={handleLogin}>
      <div className='grid'>
        <label>Email : </label>
        <div className='bg-slate-100 p-2'>
          <input
            type='email'
            placeholder='Nhập Email...'
            name='email'
            value={data.email}
            autoComplete='email'
            onChange={handleOnChange}
            className='w-full h-full outline-none bg-transparent'
          />
        </div>
      </div>

      <div>
        <label>Mật khẩu : </label>
        <div className='bg-slate-100 p-2 flex'>
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Nhập Mật khẩu'
            value={data.password}
            name='password'
            onChange={handleOnChange}
            autoComplete='true'
            className='w-full h-full outline-none bg-transparent'
          />
          <div className='cursor-pointer text-xl' onClick={handleShowPwd}>
            <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
          </div>
        </div>
        <Link
          to={"/forgot-password"}
          className='block w-fit ml-auto hover:underline hover:text-red-600'
        >
          Quên mật khẩu ?
        </Link>
      </div>

      <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
        Đăng nhập
      </button>
    </form>
  )
}

export default FormLogin
