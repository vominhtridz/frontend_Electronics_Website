import axios from "axios"
import SummaryApi from "../../common"
import { FormEvent } from "react"
import { FaEye } from "react-icons/fa"
import { FaEyeSlash } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FormSignupType } from "../../typescript/signuptype"
import uploadImage from "../../helpers/uploadImage"
import { useDispatch } from "react-redux"
import { setLoading } from "../../store/PageSlice"
const FormSignup = ({
  image,
  handleShowPwd,
  handleShowConfirmPwd,
  data,
  handleOnChange,
  showConfirmPassword,
  showPassword,
}: FormSignupType) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (data.password === data.password1) {
      const URLPicture = await uploadImage(image)
      data.image = URLPicture
      dispatch(setLoading(true))
      try {
        const response = await axios.post(SummaryApi.signUP.url, data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            credentials: true
          },
        })
        console.log(response)
        if (response.status === 201) {
          toast.success(response.data.message || "Đăng kí thành công")
          dispatch(setLoading(false))
          navigate("/login")
        }
      } catch (error: any) {
        dispatch(setLoading(false))
        if (error.response) {
          toast.error(error.response.data.data.message || error.response.data || "Đăng kí thất bại")
        } else if (error.request) {
          // Request was made but no response was received
          toast.error("server không phản hồi.")
        } else {
          // Something else happened
          toast.error("có lỗi xảy ra.")
        }
      }
    } else {
      toast.error("Mật khẩu không trùng khớp.")
    }
  }
  return (
    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSignup}>
      <div className='grid'>
        <label>Tên : </label>
        <div className='bg-slate-100 p-2'>
          <input
            type='text'
            placeholder='Nhập tên...'
            name='name'
            value={data.name}
            onChange={handleOnChange}
            required
            className='w-full h-full outline-none bg-transparent'
          />
        </div>
      </div>
      <div className='grid'>
        <label>Email : </label>
        <div className='bg-slate-100 p-2'>
          <input
            type='email'
            placeholder='Nhập email...'
            name='email'
            value={data.email}
            onChange={handleOnChange}
            required
            autoComplete='email'
            className='w-full h-full outline-none bg-transparent'
          />
        </div>
      </div>

      <div>
        <label>Mật khẩu : </label>
        <div className='bg-slate-100 p-2 flex'>
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Nhập Mật Khẩu...'
            value={data.password}
            name='password'
            onChange={handleOnChange}
            required
            autoComplete='true'
            className='w-full h-full outline-none bg-transparent'
          />
          <div className='cursor-pointer text-xl' onClick={handleShowPwd}>
            <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
          </div>
        </div>
      </div>

      <div>
        <label>Xác thực mật khẩu : </label>
        <div className='bg-slate-100 p-2 flex'>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder='Nhập Xác thực mật khẩu'
            value={data.password1}
            name='password1'
            onChange={handleOnChange}
            required
            autoComplete='true'
            className='w-full h-full outline-none bg-transparent'
          />

          <div className='cursor-pointer text-xl' onClick={handleShowConfirmPwd}>
            <span>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
          </div>
        </div>
      </div>

      <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full  rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
        Đăng kí
      </button>
    </form>
  )
}

export default FormSignup
