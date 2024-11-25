import axios from 'axios'
import React, { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { generateRandomCode } from '../components/features/generateCodeRandom'
import { useDispatch } from 'react-redux'
import { setLoading } from '../store/PageSlice'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import SummaryApi from '../common'

const ForgotPassowrd = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate(); // this is from react-router-dom
  const dispatch = useDispatch();
  const [error, setError] = useState('')
  const ChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const handleSendEmail = async(e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault()
    var generateCode = generateRandomCode(12);
    const data = {
      email: email,
      code: generateCode,
    }
    dispatch(setLoading(true))
    try {
      const response = await axios.post(SummaryApi.forget_password.url, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      if (response.status === 200) {
        toast.success(response.data.cuccess )
        dispatch(setLoading(false))
        Cookies.set("code", generateCode, { expires: 5 / (60 * 24) })
        //clear state
        setEmail('')
      }
    } catch (error: any) {
      dispatch(setLoading(false))
      console.log(error)
      if (error.response) {
        toast.error(
          error.response?.data?.error?.password?.[0] ||
            error.response?.data?.error ||
            "gửi email thất bại",
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
    <section className='bg-gray-50 '>
      <div className='flex flex-col items-center relative justify-center  mx-auto md:h-screen lg:py-0'>
        <div className='flex relative'>
          <Link
            to='/login'
            className='no-underline hover:bg-red-600  right-[11.5rem] whitespace-nowrap absolute text-left flex h-9  items-center px-1.5 py-1 text-white bg-red-500 rounded-md shadow'
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 48 48'>
              <path
                fill='currentColor'
                fillRule='evenodd'
                stroke='currentColor'
                strokeLinejoin='round'
                strokeWidth='4'
                d='M44 40.836q-7.34-8.96-13.036-10.168t-10.846-.365V41L4 23.545L20.118 7v10.167q9.523.075 16.192 6.833q6.668 6.758 7.69 16.836Z'
                clipRule='evenodd'
              />
            </svg>
            <p className='px-2 underline-none my-auto no-underline'>Đăng Nhập</p>
          </Link>
          <h2 className=' mb-6  text-2xl font-semibold text-gray-800'>Quên Mật Khẩu</h2>
        </div>
        <div className='w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md  sm:p-8'>
          <span className='text-red-500 leading-50'></span>
          <form
            onSubmit={handleSendEmail}
            className='mt-4 space-y-4 lg:mt-5 md:space-y-5'
            method='post'
          >
            <div>
              <label htmlFor='email' className=' block mb-2 text-base font-medium text-gray-900'>
                Email
              </label>
              <input
                name='email'
                value={email}
                onChange={ChangeEmail}
                type='email'
                required
                className='w-full text-gray-800 text-sm border border-gray-300 px-3 py-2.5 rounded-md outline-blue-600'
                placeholder='Nhập Email..'
              />
            </div>
            <button
              type='submit'
              id='login'
              className='w-full py-3 px-3 text-sm tracking-wide rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none'
            >
              Xác nhận email
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassowrd