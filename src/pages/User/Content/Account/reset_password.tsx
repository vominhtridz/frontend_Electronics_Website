import { ChangeEvent, FormEvent, useState } from "react"
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { setLoading } from "../../../../store/PageSlice";
import SummaryApi from "../../../../common";

export const UserChangePassword = () => {
    const [password, setPassword] = useState<string>("")
    const [showPwd, setshowPwd] = useState<boolean>(false)
    const [showPwd1, setshowPwd1] = useState<boolean>(false)
    const [password1, setPassword1] = useState<string>("")
    const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = Cookies.get('token')
  const user_id = Cookies.get('id')
    // Handle Reset Password
    const handleResetPassword =async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setLoading(true))
        try {
            const data = {
              password,
              password1,
            }
          const response = await axios.post(SummaryApi.change_password.url + "/" + user_id, data, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          if (response.status === 200) {
            toast.success(response.data.cuccess || "Thay đổi mật khẩu thành công.")
            dispatch(setLoading(false))
            //clear state
            setPassword("")
            setPassword1("")
            navigate("/")
          }
        } catch (error: any) {
          dispatch(setLoading(false))
          console.log(error)
          if (error.response) {
            toast.error(
              error.response?.data?.error?.password1?.[0] ||
                error.response?.data?.error ||
                "Lỗi ",
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
    // navigator when code incorect

    // Change Event Handler
const ChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
const ShowPwd = () => setshowPwd(!showPwd)
const ShowPwd1 = () => setshowPwd1(!showPwd1)
const ChangePassword1 = (e: ChangeEvent<HTMLInputElement>) => setPassword1(e.target.value)
        return (
          <section className='bg-gray-50 '>
            <div className='flex flex-col items-center relative justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
              <h2 className=' mb-6  text-2xl font-semibold text-gray-800'>Thay Đổi Mật Khẩu</h2>
              <div className='w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md  sm:p-8'>
                <form action='#' onSubmit={handleResetPassword} method='post'>
                  <div className='relative'>
                    <label className='text-gray-800 text-sm font-medium mb-2 block pt-1'>
                      Mật khẩu
                    </label>
                    <input
                      required
                      value={password}
                      id='password'
                      name='password'
                      type={showPwd ? "text" : "password"}
                      onChange={ChangePassword}
                      className='border text-gray-800  outline-blue-500 bg-white w-full text-sm px-3 py-2.5 rounded-md'
                      placeholder='Nhập Mật khẩu'
                    />
                    <div
                      className='cursor-pointer text-xl absolute top-11 right-4'
                      onClick={ShowPwd}
                    >
                      <span>{showPwd ? <FaEyeSlash /> : <FaEye />}</span>
                    </div>
                  </div>
                  <div className='relative'>
                    <label className='text-gray-800 text-sm font-medium mb-2 block pt-1'>
                      Xác Thực Mật khẩu
                    </label>
                    <input
                      required
                      value={password1}
                      onChange={ChangePassword1}
                      id='password1'
                      name='password1'
                      type={showPwd1 ? "text" : "password"}
                      className='border text-gray-800 outline-blue-500 bg-white w-full text-sm px-3 py-2.5 rounded-md'
                      placeholder='Nhập Mật khẩu'
                    />
                    <div
                      className='cursor-pointer text-xl absolute top-11 right-4'
                      onClick={ShowPwd1}
                    >
                      <span>{showPwd1 ? <FaEyeSlash /> : <FaEye />}</span>
                    </div>
                  </div>
                  <button
                    type='submit'
                    id='login'
                    className='mt-4 w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-red-500 hover:bg-red-600 focus:outline-none'
                  >
                    Đổi Mật Khẩu
                  </button>
                </form>
              </div>
            </div>
          </section>
        )
}
